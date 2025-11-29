
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI } from "https://esm.sh/@google/genai@0.1.1"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY')

    const { prompt, style } = await req.json()
    const ai = new GoogleGenAI({ apiKey })

    const finalPrompt = `
      Create a visual fashion moodboard image.
      Concept: ${prompt}
      Style: ${style || 'High Fashion, Editorial, Abstract'}
      
      Requirements:
      - Artistic composition suitable for a photoshoot reference
      - Focus on lighting, texture, and color palette
      - No text overlays
      - High aesthetic quality
    `.trim();

    // Use generateContent for gemini-2.5-flash-image (Nano Banana)
    // We generate 3 images by calling it 3 times in parallel since generateContent usually returns one candidate
    const generateSingleImage = async () => {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: [{ role: 'user', parts: [{ text: finalPrompt }] }],
        });
        
        if (response.candidates && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    return {
                        base64: part.inlineData.data,
                        mimeType: part.inlineData.mimeType || 'image/png'
                    };
                }
            }
        }
        return null;
    };

    const promises = [1, 2, 3].map(() => generateSingleImage());
    const results = await Promise.all(promises);
    const images = results.filter(img => img !== null);

    if (images.length === 0) throw new Error("Failed to generate images");

    return new Response(JSON.stringify({ images }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error: any) {
    console.error("Moodboard Gen Error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
