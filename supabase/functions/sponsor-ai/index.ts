
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@0.1.1"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY')

    const { action, sponsorName, sponsorIndustry, eventDetails, contractTerms, metrics } = await req.json()
    const ai = new GoogleGenAI({ apiKey })
    
    let prompt = "";
    let responseMimeType = 'application/json';
    let responseSchema = undefined;
    let systemInstruction = "You are a helpful AI assistant for fashion event production.";
    
    if (action === 'activation-ideas') {
      systemInstruction = `You are a Creative Director for a high-end fashion event agency.
      Your goal is to generate innovative, luxury-focused, and shareable brand activation ideas.
      Focus on experiential luxury, audience engagement, and social media impact.
      Tailor ideas specifically to the sponsor's industry (${sponsorIndustry}).`;

      prompt = `
        Sponsor: ${sponsorName} (${sponsorIndustry})
        Event Context: ${eventDetails}
        
        Task: Generate 3 creative, high-impact activation ideas for this sponsor at this event.
        If industry is 'Tech', suggest VR/AR or digital displays.
        If 'Beauty', suggest sampling or makeover stations.
        If 'Beverage', suggest branded bars or lounges.
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

    } else if (action === 'recommend-packages') {
      systemInstruction = "Act as a Sponsorship Sales Strategist.";
      prompt = `
        Analyze the fit for ${sponsorName} (${sponsorIndustry}) for event: ${eventDetails}.
        Suggest 3 sponsorship tiers (Title, Gold, Silver) with prices and features tailored to their industry goals.
        For example, if they are a Tech company, emphasize 'Digital Integration' or 'Data Access' in the Title package.
      `;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                tier_name: { type: Type.STRING },
                price: { type: Type.NUMBER },
                features: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          }
        }
      };

    } else if (action === 'draft-contract') {
      systemInstruction = "Act as a Legal Assistant for a fashion production agency.";
      prompt = `
        Context:
        - Sponsor: ${sponsorName}
        - Industry: ${sponsorIndustry}
        - Terms: ${JSON.stringify(contractTerms)}
        
        Task: Draft a concise, professional sponsorship agreement summary. 
        Include specific clauses relevant to the industry (e.g. Exclusivity in ${sponsorIndustry} category).
        Sections: Deliverables, Payment Terms, Exclusivity, Intellectual Property.
        
        Output format: Plain text with Markdown formatting.
      `;
      responseMimeType = 'text/plain';

    } else if (action === 'lead-score') {
      systemInstruction = "Act as a Sales Analyst for event sponsorships.";
      prompt = `
        Evaluate the fit of ${sponsorName} (${sponsorIndustry}) for a fashion event described as: ${eventDetails}.
        Return a JSON object with: "score" (0-100), "reasoning" (string), and "suggested_pitch_angle" (string).
      `;
      
    } else if (action === 'generate-roi-report') {
      systemInstruction = `You are a Senior Account Manager at a fashion PR agency. 
      Your goal is to write a persuasive, professional post-event executive summary for a sponsor.
      Highlight key wins, contextualize the data, and subtly suggest renewal.`;
      
      prompt = `
        Sponsor: ${sponsorName}
        Event: ${eventDetails}
        
        Performance Metrics:
        ${JSON.stringify(metrics, null, 2)}
        
        Task: Write a 150-200 word executive summary of their sponsorship performance.
        Tone: Professional, celebratory, data-driven.
        Format: Plain text (Markdown allowed for bolding).
      `;
      responseMimeType = 'text/plain';

    } else if (action === 'ops-planning') {
         // Ops Agent Logic (Preserved)
         systemInstruction = "Act as an Event Operations Manager.";
         const { floorplanBase64 } = await req.json(); // Assuming input logic handles this if needed
         prompt = `Analyze the logistical requirements for the venue.`;
         if (floorplanBase64) prompt += ` See attached floorplan.`;

    } else if (action === 'analyze-media') {
         // Media Agent Logic (Preserved)
         systemInstruction = "Act as a Digital Asset Manager.";
         prompt = `Analyze this media asset for brand consistency and specs.`;
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
