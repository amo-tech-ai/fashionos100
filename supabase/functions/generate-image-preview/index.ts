
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

    const { eventDescription, moodTags, brandUrls, imageType } = await req.json()
    const ai = new GoogleGenAI({ apiKey })

    // 1. Extract Style from URLs (if provided)
    let brandStyleContext = "";
    if (brandUrls && brandUrls.length > 0) {
        const analysisPrompt = `
            Analyze these URLs to understand the visual identity of the brand.
            URLs: ${brandUrls.join(', ')}
            
            Output a concise visual description covering:
            - Color Palette (Hex codes if possible)
            - Lighting Style (e.g. high contrast, soft, neon)
            - Composition Style (e.g. minimalist, cluttered, centered)
            - Key Motifs or Textures
            
            Keep it under 50 words.
        `;
        
        const analysisResp = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text: analysisPrompt }] }],
        });
        brandStyleContext = analysisResp.text || "";
    }

    // 2. Construct Image Prompt for Nano Banana
    const finalPrompt = `
        Create a ${imageType || 'promotional event image'} for a fashion event.
        
        Event Concept: ${eventDescription}
        Mood/Vibe: ${moodTags ? moodTags.join(', ') : 'Modern, High Fashion'}
        
        ${brandStyleContext ? `Brand Visual Style (Strictly Adhere): ${brandStyleContext}` : ''}
        
        Requirements:
        - High fashion aesthetic
        - Professional lighting
        - Clean composition suitable for text overlay
        - No text in the image
    `.trim();

    // 3. Generate Images using Nano Banana (gemini-2.5-flash-image)
    // CORRECTION: Use generateContent for Nano models, not generateImages.
    
    // Since generateContent typically returns one candidate, we might need to make multiple requests 
    // or use the 'sampleCount' / 'candidateCount' config if supported, 
    // but for Nano/Flash Image, standard practice is single gen per request usually.
    // We will loop to generate 4 previews concurrently for speed.

    const generateSingleImage = async () => {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: [{ role: 'user', parts: [{ text: finalPrompt }] }],
            config: {
                // aspect ratio logic implies we might need specific config or prompt tuning
                // Nano models usually take prompt cues for aspect ratio or return square by default.
            }
        });
        
        // Extract image from parts
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

    const imagePromises = [1, 2, 3, 4].map(() => generateSingleImage());
    const results = await Promise.all(imagePromises);
    const images = results.filter(img => img !== null);

    if (images.length === 0) {
        throw new Error("Failed to generate any valid images.");
    }

    return new Response(JSON.stringify({ 
        images, 
        usedPrompt: finalPrompt,
        styleContext: brandStyleContext 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error: any) {
    console.error("Preview Gen Error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
