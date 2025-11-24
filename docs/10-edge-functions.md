
# 🌩️ FashionOS Edge Functions Design Document

**Version:** 1.0  
**Runtime:** Deno (Supabase Edge Functions)  
**Scope:** Backend Logic for Fashion Show Planner & AI Copilot

---

## 1. Overview & Context

### Summary
The **Fashion Show Planner** (a module of FashionOS) requires complex business logic that cannot be securely or efficiently handled solely by client-side code. We utilize **Supabase Edge Functions** to execute server-side logic, ensuring security (hiding API keys), data integrity (complex transactions), and performance (latency-sensitive aggregations).

### Why Edge Functions?
1.  **Security:** Keeps Gemini API keys (`GEMINI_API_KEY`) and Service Role keys server-side.
2.  **Performance:** Runs closer to the user (global distribution).
3.  **Logic:** Handles complex operations like "Create Event + 14 Default Phases + Assign Team" in a single transaction-like flow.

### Key Business Flows
*   **Event Initialization:** Creating an event and auto-populating standard fashion show timeline phases.
*   **Dashboard Aggregation:** Fetching a "Planner View" that joins Events, Tasks, Alerts, and KPIs in one request to reduce client waterfalls.
*   **AI Copilot:** Proxying requests to Google Gemini 3 for generating schedules, emails, and task lists.
*   **Logistics:** Checking availability conflicts across venues and models.

Reference: [Supabase Edge Functions Documentation](https://supabase.com/docs/guides/functions)

---

## 2. Architecture & Environment

### Directory Structure
We follow a shared-resource pattern to keep code DRY.

```text
supabase/
  functions/
    _shared/                  # Shared utilities
      cors.ts                 # CORS headers configuration
      supabaseClient.ts       # Auth & Admin client initialization
      types.ts                # TS Interfaces (Event, Task, GeminiResponse)
      validation.ts           # Zod schemas for input validation
    
    create-event/             # POST: Init event + phases
      index.ts
    
    get-event-planner-view/   # GET: Aggregate dashboard data
      index.ts
    
    manage-tasks/             # POST/PATCH: Complex task logic
      index.ts
    
    check-availability/       # POST: Logistics conflict check
      index.ts
    
    ai-copilot/               # POST: Gemini Proxy
      index.ts
      
    generate-assets/          # POST: Veo/Imagen wrapper
      index.ts
```

### Development Flow
1.  **Run Locally:** `supabase functions serve` (Hot reloading).
2.  **Test:** `deno test` for unit logic.
3.  **Deploy:** `supabase functions deploy <function_name>` (Deploys to global edge network).

### Environment Variables
Managed via Supabase Dashboard or `.env.local`.
*   `SUPABASE_URL`: Auto-injected.
*   `SUPABASE_ANON_KEY`: Auto-injected.
*   `SUPABASE_SERVICE_ROLE_KEY`: Required for bypassing RLS (use carefully).
*   `GEMINI_API_KEY`: Required for `ai-copilot` and `generate-assets`.

---

## 3. Function List & Contracts

### A. `create-event`
*   **Method:** `POST`
*   **Description:** Creates an event record, assigns the creator as owner, and **automatically generates the 14 standard timeline phases** (Concept, Budget, Casting, etc.).
*   **Input Schema:**
    ```json
    {
      "title": "string",
      "date": "YYYY-MM-DD",
      "type": "runway" | "presentation",
      "venue_id": "uuid (optional)",
      "organizer_team_id": "uuid (optional)"
    }
    ```
*   **Output Schema:**
    ```json
    {
      "event_id": "uuid",
      "phases_created": 14,
      "status": "success"
    }
    ```

### B. `get-event-planner-view`
*   **Method:** `GET` (via query params) or `POST`
*   **Description:** Returns a composite object for the Mobile Dashboard to render instantly.
*   **Input:** `{ "event_id": "uuid" }`
*   **Output:**
    ```json
    {
      "event": { ...event_details },
      "progress": { "completed_phases": 4, "total_phases": 14 },
      "upcoming_tasks": [ ...top_5_due_soon ],
      "kpis": { "tickets_sold": 120, "budget_used": 4500 },
      "alerts": [ "Venue contract pending", "3 Model conflicts detected" ]
    }
    ```

### C. `ai-copilot`
*   **Method:** `POST`
*   **Description:** Secure proxy to Google Gemini 3.
*   **Input:**
    ```json
    {
      "event_id": "uuid",
      "context": "current_screen_name" (e.g., 'tasks', 'email'),
      "prompt": "Draft an invite for the VIP reception"
    }
    ```
*   **Output:**
    ```json
    {
      "text": "Here is a draft...",
      "structured_suggestions": [
        { "type": "task", "action": "Send Invites", "due": "2025-05-01" }
      ]
    }
    ```

---

## 4. TypeScript Skeletons

### `_shared/cors.ts`
```ts
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
```

### `create-event/index.ts`
```ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { corsHeaders } from "../_shared/cors.ts"

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Init Client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // 2. Get User
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) throw new Error('Unauthorized')

    // 3. Parse Body
    const { title, date, type } = await req.json()

    // 4. Create Event
    const { data: event, error: eventError } = await supabase
      .from('events')
      .insert({ title, event_date: date, event_type: type, created_by: user.id })
      .select()
      .single()

    if (eventError) throw eventError

    // 5. Create Default Phases (The "Magic" Part)
    const defaultPhases = [
      { name: "Concept & Vision", order_index: 1 },
      { name: "Budget & Stakeholders", order_index: 2 },
      // ... add all 14 phases
      { name: "Post-Event Review", order_index: 14 }
    ].map(p => ({ ...p, event_id: event.id, status: 'not_started' }))

    const { error: phaseError } = await supabase
      .from('event_phases')
      .insert(defaultPhases)

    if (phaseError) throw phaseError

    return new Response(
      JSON.stringify({ event_id: event.id, message: "Event initialized" }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
```

### `ai-copilot/index.ts`
```ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI } from "https://esm.run/@google/genai" // Check Deno compatible import
import { corsHeaders } from "../_shared/cors.ts"

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const { prompt, context } = await req.json()
  const apiKey = Deno.env.get('GEMINI_API_KEY')
  
  if (!apiKey) return new Response('Missing API Key', { status: 500 })

  const ai = new GoogleGenAI({ apiKey });
  
  // Construct System Prompt
  const systemInstruction = `You are a fashion event production assistant. Context: ${context}.`
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: { systemInstruction }
  });

  return new Response(
    JSON.stringify({ text: response.text }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
})
```

---

## 5. Security & RLS Integration

**Crucial Rule:** Edge Functions should **forward the user's JWT** to Supabase whenever possible to respect Row Level Security (RLS).

1.  **Forwarding Auth:**
    ```ts
    const supabase = createClient(url, key, {
      global: { headers: { Authorization: req.headers.get('Authorization')! } }
    })
    ```
    *   This ensures that `supabase.from('events').insert(...)` will fail if the user doesn't have permission via Postgres RLS policies.

2.  **Service Role (Bypassing RLS):**
    *   Use `Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')` **ONLY** for admin tasks (e.g., creating the default phases for a new user, sending system emails).
    *   *Best Practice:* Validate the user first using the Anon key, *then* switch to Service Role if necessary for specific operations.

---

## 6. Performance & Best Practices

1.  **Cold Starts:** Keep imports minimal. Use `esm.sh` for dependencies.
2.  **Database Connections:** Supabase Edge Functions utilize the **Data API** (REST) by default via `supabase-js`, which is connection-safe. If connecting directly via Postgres driver, use a connection pooler (Supavisor).
3.  **Parallelization:** Use `Promise.all` when fetching Dashboard data (e.g., fetching Tasks and Sponsors simultaneously).
4.  **Caching:** For `get-event-planner-view`, consider adding `Cache-Control` headers for 60s if data doesn't change instantly, or use Supabase Realtime on the frontend for critical updates.

---

## 7. Deployment & Versioning

*   **Deploy Command:** `supabase functions deploy`
*   **Secrets Management:** `supabase secrets set GEMINI_API_KEY=...`
*   **CI/CD:** Use GitHub Actions to auto-deploy on merge to `main`.

```yaml
name: Deploy Function
on:
  push:
    paths:
      - 'supabase/functions/**'
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: supabase/setup-cli@v1
      - run: supabase functions deploy create-event --project-ref $PROJECT_ID
```

---

## 8. Checklist for Implementation

- [ ] Run `supabase functions new create-event`
- [ ] Run `supabase functions new ai-copilot`
- [ ] Set `.env` with `GEMINI_API_KEY`
- [ ] Implement `_shared/cors.ts`
- [ ] Write `create-event` logic (Insert Event + 14 Phases)
- [ ] Write `ai-copilot` logic (Gemini Integration)
- [ ] Test locally via `curl` or Postman
- [ ] Deploy to staging project
