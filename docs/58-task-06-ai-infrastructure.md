
# 🪄 Task 06: AI Infrastructure (Edge Functions)

**Phase:** 2 (System Build)
**Dependencies:** Supabase CLI initialized
**Output:** Secure Gemini Proxy

---

## 1. Context
We cannot expose the `GEMINI_API_KEY` on the client. We need a Supabase Edge Function to act as a secure proxy. This function will handle the handshake with Google's API and enforce any necessary business logic (like prompt injection protection).

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a Backend Security Engineer.
Action: Set up the AI Infrastructure using Supabase Edge Functions.

CONTEXT:
We need to call Google Gemini 3 securely.
Stack: Deno (Supabase Functions), @google/genai SDK.

=========================================
1. EDGE FUNCTION (`supabase/functions/ai-copilot/index.ts`)
=========================================
Create a Deno function that:
1.  Accepts `POST` requests with `{ action, context }`.
2.  Retrieves `GEMINI_API_KEY` from environment variables.
3.  Initializes `GoogleGenAI` client.
4.  **Logic Branching:**
    - **Case 'polish_brief':**
      - Model: `gemini-2.5-flash`.
      - System Prompt: "You are a Creative Director. Rewrite this brief to be professional and structured (Concept, Lighting, Styling)."
      - Input: `context.brief`.
    - **Case 'generate_event_draft':**
      - Model: `gemini-3-pro`.
      - System Prompt: "You are an Event Producer. Extract event details (Title, Date, Venue, Budget) from this text/url into JSON."
      - Use `responseSchema` to force JSON output.
5.  Returns the text/JSON response.
6.  Includes CORS headers to allow calls from localhost and the production domain.

=========================================
2. FRONTEND SERVICE (`src/lib/ai-service.ts`)
=========================================
Create a TypeScript service wrapper:
- `const AI_ENDPOINT = '.../functions/v1/ai-copilot'`
- Implement `polishBrief(text: string)`: Calls the endpoint with the user's auth token (supabase.auth.session).
- Implement `generateEventDraft(text: string)`: Calls the endpoint.
- Handle errors gracefully (e.g., if the function times out).

=========================================
3. TYPE DEFINITIONS
=========================================
Create `src/types/ai.ts`:
- Interfaces for the expected JSON responses (e.g., `EventDraft`).

Output the TypeScript code for the Edge Function and the Frontend Service.
```

---

## 3. Verification Checklist
- [ ] Function deploys via `supabase functions deploy`.
- [ ] `curl` request to function returns Gemini output.
- [ ] Frontend `polishBrief` call works with a mock string.
- [ ] API Key is NOT present in any frontend file.
