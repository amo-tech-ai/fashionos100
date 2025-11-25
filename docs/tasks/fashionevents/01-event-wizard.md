
# 🪄 Task: Fix Event Wizard AI Integration

**Status:** 🟡 In Progress
**Priority:** P0 (Security/Functionality)
**Owner:** Full Stack Engineer

---

## 1. Problem Analysis

The previous implementation of `EventWizard.tsx` was **critically flawed** for production use:

1.  **Security Risk (Critical):** API keys were accessed client-side (`process.env.API_KEY` or `import.meta.env.VITE_GEMINI_API_KEY`). In a built React app, these keys are exposed to anyone inspecting the network or source code.
2.  **SDK Mismatch:** The code attempted to use `@google/genai` or `@google/generative-ai` in a browser context. While possible, it is unsafe for API keys.
3.  **Fragile Parsing:** Client-side text parsing is unreliable. Moving this to the backend allows us to enforce JSON schemas rigorously and handle errors gracefully.

---

## 2. Correct Architecture

To make this production-ready, we move the "Brain" to the server.

1.  **Frontend (`EventWizard.tsx`):**
    *   Collects user input (text, optional file/URL).
    *   Sends a `POST` request to a secure backend endpoint (Supabase Edge Function).
    *   Receives clean, validated JSON to populate the UI.
2.  **Backend (Supabase Edge Function):**
    *   Holds the `GEMINI_API_KEY` securely (server-side secret).
    *   Initializes `GoogleGenerativeAI` (official SDK).
    *   Uses `responseMimeType: "application/json"` to force structured output.
    *   Returns the data to the frontend.

---

## 3. Backend Implementation (Supabase Edge Function)

Create a new function: `supabase functions new generate-event-draft`

**File:** `supabase/functions/generate-event-draft/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI, SchemaType } from "https://esm.sh/@google/generative-ai@0.1.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY')

    const { prompt, url, fileBase64, fileType } = await req.json()

    const genAI = new GoogleGenerativeAI(apiKey)
    
    const schema = {
      type: SchemaType.OBJECT,
      properties: {
        eventTitle: { type: SchemaType.STRING },
        eventTitleSuggestions: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
        descriptionShort: { type: SchemaType.STRING },
        descriptionLong: { type: SchemaType.STRING },
        category: { type: SchemaType.STRING },
        location: { type: SchemaType.STRING },
        date: { type: SchemaType.STRING, description: "YYYY-MM-DD" },
        ticketTiers: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              name: { type: SchemaType.STRING },
              price: { type: SchemaType.NUMBER },
              quantity: { type: SchemaType.NUMBER }
            }
          }
        },
        scheduleItems: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              time: { type: SchemaType.STRING },
              activity: { type: SchemaType.STRING }
            }
          }
        }
      },
      required: ["eventTitle", "category", "descriptionShort"]
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
      systemInstruction: "You are an expert Event Planner. Extract event details from the user's input into the specified JSON structure. Infer reasonable defaults for missing fields based on the context (e.g. if it's a Gala, suggest high ticket prices).",
    })

    const parts = []
    if (prompt) parts.push({ text: prompt })
    if (url) parts.push({ text: `Context URL: ${url}` })
    
    // Handle file attachment if present
    if (fileBase64 && fileType) {
      parts.push({
        inlineData: {
          data: fileBase64,
          mimeType: fileType
        }
      })
    }

    const result = await model.generateContent(parts)
    const responseText = result.response.text()
    
    return new Response(responseText, {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
```

---

## 4. Success Criteria

1.  **Security:** No API keys in `EventWizard.tsx`.
2.  **Reliability:** Backend handles the JSON schema enforcement.
3.  **UX:** Frontend handles loading states and gracefully populates the wizard steps.
