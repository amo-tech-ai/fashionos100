
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI } from "https://esm.sh/@google/genai@0.1.1"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY')

    const { baseImageBase64, prompt, size } = await req.json()
    const ai = new GoogleGenAI({ apiKey })

    // Gemini Pro Image (Fusion/Refinement)
    // We use generateContent with both image and text to guide the upscaling/refinement
    
    const parts = [
        {
            inlineData: {
                data: baseImageBase64,
                mimeType: 'image/png'
            }
        },
        {
            text: `
            Refine this image into a high-resolution, photorealistic production asset.
            Keep the exact composition and subject matter.
            Enhance lighting, texture details, and color grading.
            Resolution: ${size || '2K'}.
            Context: ${prompt}
            `
        }
    ];

    // Note: For pure upscaling/editing, we might use specific tasks, 
    // but 'generateContent' with multimodal input on Pro Vision/Image models is standard for "edit" or "variations".
    // However, for strictly generating a NEW high res image based on reference:
    
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview', // Pro Image model
        contents: [{ role: 'user', parts }],
        config: {
            // Some SDK versions expose 'imageConfig' here for resolution
            // If not available, the prompt drives quality.
            // Hypothetical config for resolution if supported:
            // imageConfig: { imageSize: size || '2K' } 
        }
    });

    // The response should contain the new image
    let refinedImageBase64 = null;
    
    if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                refinedImageBase64 = part.inlineData.data;
                break;
            }
        }
    }

    if (!refinedImageBase64) {
        // Fallback: If model returns text instead of image (sometimes happens), error out
        throw new Error("Model did not return an image. It might have refused the request.");
    }

    return new Response(JSON.stringify({ 
        image: refinedImageBase64,
        mimeType: 'image/png'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error: any) {
    console.error("Final Gen Error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
