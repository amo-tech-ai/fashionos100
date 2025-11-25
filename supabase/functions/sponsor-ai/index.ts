
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI } from "https://esm.sh/@google/genai@0.1.1"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY')

    const { action, sponsorName, sponsorIndustry, eventDetails, contractTerms } = await req.json()
    const ai = new GoogleGenAI({ apiKey })
    const model = ai.models.getGenerativeModel({ model: 'gemini-2.5-flash' })

    let prompt = "";
    
    if (action === 'activation-ideas') {
      prompt = `
        Act as a Creative Director for a high-end fashion event.
        
        Context:
        - Sponsor: ${sponsorName} (${sponsorIndustry})
        - Event: ${eventDetails}
        
        Task: Generate 3 creative, high-impact "Activation Ideas" for this sponsor at this event.
        Focus on experiential luxury, audience engagement, and social media shareability.
        
        Output JSON format:
        {
          "ideas": [
            { "title": "string", "description": "string", "estimated_cost": "string" }
          ]
        }
      `;
    } else if (action === 'draft-contract') {
      prompt = `
        Act as a Legal Assistant for a fashion production agency.
        
        Context:
        - Sponsor: ${sponsorName}
        - Terms: ${JSON.stringify(contractTerms)}
        
        Task: Draft a concise, professional sponsorship agreement summary. 
        Include sections for: Deliverables, Payment Terms, and Intellectual Property.
        
        Output format: Plain text with Markdown formatting.
      `;
    } else if (action === 'lead-score') {
      prompt = `
        Act as a Sales Analyst.
        Evaluate the fit of ${sponsorName} (${sponsorIndustry}) for a fashion event described as: ${eventDetails}.
        Return a JSON object with: "score" (0-100), "reasoning" (string), and "suggested_pitch_angle" (string).
      `;
    } else {
      throw new Error("Invalid action");
    }

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: action === 'draft-contract' ? 'text/plain' : 'application/json'
      }
    });

    return new Response(result.response.text(), {
      headers: { ...corsHeaders, 'Content-Type': action === 'draft-contract' ? 'text/plain' : 'application/json' },
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
