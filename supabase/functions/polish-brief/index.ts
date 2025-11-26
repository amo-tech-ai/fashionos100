
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI } from "https://esm.sh/@google/genai@0.1.1"
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

    const { brief, type } = await req.json()

    if (!brief) throw new Error('No brief provided')

    const ai = new GoogleGenAI({ apiKey })
    
    let prompt = `Rewrite this creative brief to be more professional, structured, and clear for a fashion production team. Keep the original intent but organize it with headings like 'Concept', 'Mood', 'Lighting'. Input: "${brief}"`;

    if (type === 'marketing') {
        prompt = `Rewrite this event description to be engaging, clear, and have high marketing appeal for potential attendees. Use exciting language, highlight key value propositions, and ensure clarity. Keep the tone professional yet inviting. Return only the rewritten description text. Input: "${brief}"`;
    }
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { 
          role: 'user', 
          parts: [{ text: prompt }] 
        }
      ]
    })

    const text = response.text || ""

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error: any) {
    console.error("Polish Brief Error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
