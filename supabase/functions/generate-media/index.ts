
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI } from "https://esm.sh/@google/genai"

declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY')

    const { action, prompt, imageBase64, imageType, operationName, downloadUri } = await req.json()
    const ai = new GoogleGenAI({ apiKey })

    // 1. START GENERATION
    if (action === 'start') {
      let imagePart = undefined;
      if (imageBase64) {
        imagePart = {
          inlineData: {
            data: imageBase64,
            mimeType: imageType || 'image/jpeg'
          }
        };
      }

      const operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: imagePart,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9' // 9:16 not supported in preview yet, strictly 16:9 for Veo 3.1 Preview
        }
      });
      
      return new Response(JSON.stringify({ operationName: operation.name }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 2. POLL STATUS
    if (action === 'poll') {
      if (!operationName) throw new Error("Missing operationName");
      
      // Reconstruct operation object structure expected by SDK
      const operation = { name: operationName };
      const updatedOp = await ai.operations.getVideosOperation({ operation });
      
      const isDone = updatedOp.done;
      let uri = null;
      
      if (isDone && updatedOp.response?.generatedVideos?.[0]?.video?.uri) {
        uri = updatedOp.response.generatedVideos[0].video.uri;
      }

      return new Response(JSON.stringify({ done: isDone, uri }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 3. DOWNLOAD PROXY
    // The URI from Gemini requires the API Key appended. We do this here so the client never sees the key.
    if (action === 'download') {
      if (!downloadUri) throw new Error("Missing downloadUri");
      
      const secureUrl = `${downloadUri}&key=${apiKey}`;
      const videoResp = await fetch(secureUrl);
      
      if (!videoResp.ok) throw new Error("Failed to fetch video from Google");

      // Stream the video back to the client
      return new Response(videoResp.body, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'video/mp4',
          'Content-Disposition': 'attachment; filename="trailer.mp4"'
        }
      });
    }

    throw new Error("Invalid action");

  } catch (error: any) {
    console.error("Edge Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
