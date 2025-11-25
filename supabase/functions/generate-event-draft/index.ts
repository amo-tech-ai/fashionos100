import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai"

// Fix: Declare Deno to avoid TypeScript errors in environments that don't have Deno types globally available
declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY')

    const { prompt, url, fileBase64, fileType } = await req.json()

    const ai = new GoogleGenAI({ apiKey })

    // Define Schema
    const schema = {
      type: Type.OBJECT,
      properties: {
        eventTitle: { type: Type.STRING },
        eventTitleSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
        descriptionShort: { type: Type.STRING },
        descriptionLong: { type: Type.STRING },
        category: { type: Type.STRING },
        targetAudience: { type: Type.STRING },
        location: { type: Type.STRING },
        date: { type: Type.STRING, description: "YYYY-MM-DD format" },
        ticketTiers: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              price: { type: Type.NUMBER },
              quantity: { type: Type.NUMBER }
            }
          }
        },
        scheduleItems: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              time: { type: Type.STRING },
              activity: { type: Type.STRING }
            }
          }
        }
      },
      required: ["eventTitle", "category", "descriptionLong", "ticketTiers", "scheduleItems"]
    }

    const parts = []
    if (prompt) parts.push({ text: prompt })
    if (url) parts.push({ text: `Context URL to analyze: ${url}` })

    if (fileBase64 && fileType) {
      parts.push({
        inlineData: {
          data: fileBase64,
          mimeType: fileType
        }
      })
    }

    if (parts.length === 0) {
       return new Response(JSON.stringify({ error: "No input provided" }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: `You are the AI Event Architect for FashionOS.
        Task: Convert user input into a complete, structured fashion event plan.

        Context:
        - Year: 2025.
        - Event Types: Runway, Party, Workshop, Exhibition, Pop-up, Conference.

        Reasoning Steps:
        1. Analyze the input for explicit details (Date, Location, Theme, Target Audience).
        2. If details are missing, INFER reasonable defaults based on the event type (e.g., Runways usually happen in the evening, Workshops in the morning).
        3. Generate a professional description and catchy title suggestions.
        4. Structure ticket tiers (e.g., VIP vs General).
        5. Create a default schedule if one is not provided.
        6. Identify or INFER the 'targetAudience' if not explicitly provided.

        Output:
        - Return ONLY valid JSON matching the schema.`,
      }
    })

    const responseText = response.text || "{}"

    return new Response(responseText, {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error: any) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})