
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@0.1.1"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY')

    const { action, context } = await req.json()
    const ai = new GoogleGenAI({ apiKey })

    // --- 1. BRIEF POLISHER ---
    if (action === 'polish-brief') {
      const schema = {
        type: Type.OBJECT,
        properties: {
          polished_text: { type: Type.STRING, description: "The rewritten, professional brief." },
          keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
          mood: { type: Type.STRING },
          visual_style: { type: Type.STRING }
        },
        required: ["polished_text", "keywords", "mood", "visual_style"]
      };

      let systemPrompt = `You are a Fashion Creative Director. Rewrite the user's brief to be professional and structured.`;
      
      // Add brand voice if available
      if (context.brandContext) {
          systemPrompt += `
            Align the tone with this brand identity:
            - Mood: ${context.brandContext.mood?.join(', ') || 'Modern'}
            - Voice: ${context.brandContext.voice?.join(', ') || 'Professional'}
          `;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash', 
        contents: [{ role: 'user', parts: [{ text: `Input Brief: "${context.rawText}"` }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
          systemInstruction: systemPrompt
        }
      });

      return new Response(response.text || "{}", { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // --- 2. SHOT RECOMMENDER (Enhanced) ---
    if (action === 'recommend-shots') {
      const schema = {
        type: Type.OBJECT,
        properties: {
          min: { type: Type.NUMBER },
          optimal: { type: Type.NUMBER },
          reasoning: { type: Type.STRING, description: "Explanation of why these shots are needed based on the brand vibe." },
          suggestedAngles: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["min", "optimal", "reasoning", "suggestedAngles"]
      };

      // Construct a rich prompt that encourages reasoning (Thinking Simulation)
      let brandDetails = "Standard Fashion Brand";
      if (context.brandContext) {
         brandDetails = `
            Brand Description: ${context.brandContext.description || ''}
            Moods: ${context.brandContext.mood?.join(', ') || ''}
            Audience: ${context.brandContext.target_audience?.join(', ') || ''}
         `;
      }

      const prompt = `
        Task: Recommend specific photography shots for a fashion campaign.
        
        Context:
        - Category: ${context.category}
        - Visual Style: ${context.style}
        - Brand DNA: ${brandDetails}

        Think step-by-step:
        1. Analyze the Brand DNA to understand if they need abstract, detail-oriented, or lifestyle shots.
        2. Consider the 'Category' requirements (e.g. E-comm needs front/back, Editorial needs mood).
        3. Generate a list of 4-8 specific shot angles/compositions that blend the Category requirements with the Brand Vibe.
        
        Output JSON matching the schema.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: schema
        }
      });

      return new Response(response.text || "{}", { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    throw new Error('Invalid Action')

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
