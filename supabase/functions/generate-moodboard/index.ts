
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

    const response = await ai.models.generateImages({
      model: 'gemini-2.5-flash-image',
      prompt: finalPrompt,
      config: {
        numberOfImages: 3,
        aspectRatio: '1:1',
        outputMimeType: 'image/png'
      }
    });

    const images = response.generatedImages.map((img: any) => ({
        base64: img.image.imageBytes,
        mimeType: 'image/png'
    }));

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
