
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

    const { brief, type, brandContext } = await req.json()

    if (!brief) throw new Error('No brief provided')

    const ai = new GoogleGenAI({ apiKey })
    
    // Define schema for structured output
    const schema = {
      type: Type.OBJECT,
      properties: {
        polished_text: { 
          type: Type.STRING, 
          description: "The rewritten, professional version of the brief using industry terminology." 
        },
        keywords: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "5-7 key visual terms extracted from the concept (e.g. 'High Contrast', 'Neon', 'Minimalist')." 
        },
        mood: { 
          type: Type.STRING, 
          description: "A 2-3 word summary of the overall aesthetic vibe (e.g. 'Urban Noir', 'Ethereal Softness')." 
        },
        visual_style: {
          type: Type.STRING,
          description: "A specific photography or cinematic style reference (e.g. 'Film Noir', 'High Key Commercial', 'Vintage 90s', 'Clean Girl Aesthetic')."
        }
      },
      required: ["polished_text", "keywords", "mood", "visual_style"]
    };

    let prompt = `
      Act as a high-end Fashion Creative Director. 
      Analyze the following rough brief from a client. 
      
      Input Brief: "${brief}"
      ${brandContext ? `Brand Context: Align tone with ${JSON.stringify(brandContext)}` : ''}
      
      Your tasks:
      1. Rewrite the brief to be professional, structured (using headings like 'Concept', 'Lighting', 'Styling'), and clear for a production crew. 
      2. Extract key visual tags useful for search.
      3. Identify the overall mood.
      4. Suggest a specific Visual Style reference that matches their description.
    `;

    if (type === 'marketing') {
        prompt = `
        Act as a Senior Fashion Copywriter.
        Rewrite this event description to be engaging, high-converting, and exciting for attendees.
        Input Description: "${brief}"
        
        1. Rewrite the description to be punchy and aspirational.
        2. Extract key marketing tags.
        3. Identify the event vibe.
        4. Suggest a visual style for the marketing assets.`;
    }
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { 
          role: 'user', 
          parts: [{ text: prompt }] 
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    })

    const responseText = response.text || "{}"

    // Validate JSON
    try {
        JSON.parse(responseText);
    } catch (e) {
        throw new Error("Failed to generate valid JSON response.");
    }

    return new Response(responseText, {
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
