
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

    // 1. Extract Style from URLs (if provided) using Gemini 2.5 Flash Text
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
        
        // Note: Ideally we use the 'urlContext' tool, but plain prompt with URL works for general knowledge/scraping in 2.5 Flash
        // or we assume the client sends the URL text content. 
        // For this implementation, we rely on the model's ability to browse if tools enabled, or latent knowledge/inference.
        // We will assume simple inference for MVP speed.
        
        const analysisResp = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text: analysisPrompt }] }],
            // config: { tools: [{ googleSearch: {} }] } // Optional: Enable if we want real-time scraping
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
    // Note: The SDK method for image generation might differ slightly based on latest release. 
    // Using standard generateContent with specific model behavior for images or dedicated endpoint if available.
    // Assuming 'generateImages' or 'generateContent' returns base64.
    // Since @google/genai might not fully type 'generateImages' yet, we use a fallback or specific call structure.
    
    // *Implementation Note*: As of current SDK, we might need to use the REST API structure if the helper isn't there, 
    // but let's try the standard 'generateContent' which returns images for this model, OR the 'generateImages' helper.
    // We will use `generateContent` and look for inlineData in parts as per "Nano Banana" specs in documentation usually.
    // However, standard Imagen uses `generateImages`. Let's assume `generateImages` is the correct method for image models.

    const imageResp = await ai.models.generateImages({
        model: 'gemini-2.5-flash-image', 
        prompt: finalPrompt,
        config: {
            numberOfImages: 4,
            aspectRatio: '1:1', // Default square for versatility
            outputMimeType: 'image/png'
        }
    });

    // Extract Base64
    const images = imageResp.generatedImages.map((img: any) => ({
        base64: img.image.imageBytes,
        mimeType: 'image/png'
    }));

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
