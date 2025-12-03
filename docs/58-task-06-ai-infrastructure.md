
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

=========================================
1. EDGE FUNCTION (`supabase/functions/ai-copilot/index.ts`)
=========================================
Create a Deno function that:
1.  Accepts `POST` requests with `{ prompt, task, context }`.
2.  Retrieves `GEMINI_API_KEY` from environment variables.
3.  Initializes `GoogleGenAI` client.
4.  **Logic Branching:**
    - If `task === 'polish_brief'`, use `gemini-2.5-flash`. System Prompt: "You are a Creative Director. Structure this messy brief."
    - If `task === 'generate_plan'`, use `gemini-3-pro`. System Prompt: "You are an Event Producer. Create a timeline."
5.  Returns the text response.
6.  Includes CORS headers to allow calls from localhost and the production domain.

=========================================
2. FRONTEND SERVICE (`src/lib/ai-service.ts`)
=========================================
Create a TypeScript service wrapper:
- `const AI_ENDPOINT = '.../functions/v1/ai-copilot'`
- Implement `polishBrief(text: string)`: Calls the endpoint with the user's auth token.
- Implement `generateEventDraft(description: string)`: Calls the endpoint.
- Handle errors gracefully (e.g., if the function times out).

Output the TypeScript code for the Edge Function and the Frontend Service.
```

---

## 3. Verification Checklist
- [ ] Function deploys via `supabase functions deploy`.
- [ ] `curl` request to function returns Gemini output.
- [ ] Frontend `polishBrief` call works with a mock string.
