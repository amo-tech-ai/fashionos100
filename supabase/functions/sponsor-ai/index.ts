
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@0.1.1"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY')

    const { action, sponsorName, sponsorIndustry, eventDetails, contractTerms } = await req.json()
    const ai = new GoogleGenAI({ apiKey })
    
    let prompt = "";
    let responseMimeType = 'application/json';
    let responseSchema = undefined;
    let systemInstruction = "You are a helpful AI assistant for fashion event production.";
    
    if (action === 'activation-ideas') {
      systemInstruction = `You are a Creative Director for a high-end fashion event agency.
      Your goal is to generate innovative, luxury-focused, and shareable brand activation ideas.
      Focus on experiential luxury, audience engagement, and social media impact.`;

      prompt = `
        Sponsor: ${sponsorName} (${sponsorIndustry})
        Event Context: ${eventDetails}
        
        Task: Generate 3 creative, high-impact activation ideas for this sponsor at this event.
      `;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          ideas: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                estimated_cost: { type: Type.STRING }
              },
              required: ["title", "description", "estimated_cost"]
            }
          }
        }
      };

    } else if (action === 'draft-contract') {
      systemInstruction = "Act as a Legal Assistant for a fashion production agency.";
      prompt = `
        Context:
        - Sponsor: ${sponsorName}
        - Terms: ${JSON.stringify(contractTerms)}
        
        Task: Draft a concise, professional sponsorship agreement summary. 
        Include sections for: Deliverables, Payment Terms, and Intellectual Property.
        
        Output format: Plain text with Markdown formatting.
      `;
      responseMimeType = 'text/plain';

    } else if (action === 'lead-score') {
      systemInstruction = "Act as a Sales Analyst for event sponsorships.";
      prompt = `
        Evaluate the fit of ${sponsorName} (${sponsorIndustry}) for a fashion event described as: ${eventDetails}.
        Return a JSON object with: "score" (0-100), "reasoning" (string), and "suggested_pitch_angle" (string).
      `;
    } else {
      throw new Error("Invalid action");
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: responseMimeType,
        responseSchema: responseSchema,
        systemInstruction: systemInstruction
      }
    });

    return new Response(response.text || "", {
      headers: { ...corsHeaders, 'Content-Type': responseMimeType },
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
