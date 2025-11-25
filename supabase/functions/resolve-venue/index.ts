import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI } from "https://esm.sh/@google/genai@0.1.1";

// Fix: Declare Deno to avoid TypeScript errors in environments that don't have Deno types globally available
declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { venueText } = await req.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY');

    const client = new GoogleGenAI({ apiKey });
    
    // Use Gemini 2.5 Flash for speed and grounding support
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: `Find the specific real-world venue or location matching: "${venueText}". Return the specific place details using Google Maps grounding.` }
          ]
        }
      ],
      config: {
        tools: [{ googleMaps: {} }], // Enable Maps Grounding
        temperature: 0, // Deterministic output
      }
    });

    // Extract Grounding Data
    const candidate = response.candidates?.[0];
    const chunks = candidate?.groundingMetadata?.groundingChunks || [];
    
    // Find the first valid map chunk
    const mapChunk = chunks.find(c => c.web?.uri?.includes('google.com/maps'));
    
    if (!mapChunk || !mapChunk.web) {
      return new Response(
        JSON.stringify({ success: false, message: "Location not found." }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Construct structured response
    const data = {
      location: mapChunk.web.title, // The canonical name from Maps
      googleMapsUri: mapChunk.web.uri,
      // Note: Actual placeId/lat/lng usually require the Places API directly or parsing the deep link,
      // but grounding often returns the URI. For strict placeId, use the Places API directly.
      // Here we rely on the grounded response.
      sources: chunks.map(c => ({
        title: c.web?.title || "Google Maps",
        uri: c.web?.uri || "#"
      }))
    };

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});