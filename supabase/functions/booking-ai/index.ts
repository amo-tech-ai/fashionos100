
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
          title: { type: Type.STRING, description: "A catchy 3-5 word title for the shoot concept" },
          concept: { type: Type.STRING, description: "High level summary of the visual direction" },
          mood: { type: Type.STRING, description: "Adjectives describing the feeling (e.g. Moody, Ethereal)" },
          lighting: { type: Type.STRING, description: "Technical lighting notes (e.g. Hard Flash, Golden Hour)" },
          styling: { type: Type.STRING, description: "Wardrobe and prop direction" },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "concept", "mood", "lighting", "styling", "tags"]
      };

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview', // Use Pro for creative writing
        contents: [{ role: 'user', parts: [{ text: `Rewrite this fashion shoot brief to be professional, actionable, and industry-standard. Input: "${context.rawText}"` }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
          temperature: 0.7
        }
      });

      return new Response(response.text || "{}", { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // --- 2. SHOT RECOMMENDER ---
    if (action === 'recommend-shots') {
      const schema = {
        type: Type.OBJECT,
        properties: {
          min: { type: Type.NUMBER },
          optimal: { type: Type.NUMBER },
          reasoning: { type: Type.STRING },
          suggestedAngles: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["min", "optimal", "reasoning", "suggestedAngles"]
      };

      const prompt = `
        Context: Fashion Shoot. 
        Category: ${context.category}. 
        Style: ${context.style}.
        
        Task: Recommend the optimal number of shots per look/product.
        Example: E-commerce usually needs Front, Back, Side, Detail (4 shots).
        Provide specific angles.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash', // Faster model
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
