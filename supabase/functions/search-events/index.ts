
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@0.1.1"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY')

    const { query, eventsContext } = await req.json()

    if (!query || !eventsContext) throw new Error('Missing query or context')

    const ai = new GoogleGenAI({ apiKey })

    const schema = {
      type: Type.OBJECT,
      properties: {
        matchIds: {
          type: Type.ARRAY,
          items: { type: Type.NUMBER },
          description: "List of event IDs that match the user query."
        }
      },
      required: ["matchIds"]
    }

    const prompt = `
    Act as an event search engine. 
    Query: "${query}"
    Data: ${JSON.stringify(eventsContext)}
    
    Task: Return a JSON object containing 'matchIds' of events that are semantically relevant to the query.
    `

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    })

    const responseText = response.text || "{}"

    return new Response(responseText, {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error: any) {
    console.error("Search Events Error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
