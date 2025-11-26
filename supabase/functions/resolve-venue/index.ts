import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@0.1.1";
import { corsHeaders } from "../_shared/cors.ts";

declare const Deno: any;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { venueText } = await req.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY');

    const client = new GoogleGenAI({ apiKey });
    
    // Define schema for multiple candidates
    const schema = {
      type: Type.OBJECT,
      properties: {
        candidates: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Name of the venue" },
              address: { type: Type.STRING, description: "Full address" },
              type: { type: Type.STRING, description: "Type of venue (e.g. Hotel, Warehouse, Gallery)" }
            },
            required: ["name", "address"]
          }
        }
      }
    };

    // Use Gemini 2.5 Flash for speed and grounding support
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: `Search for real-world venues matching "${venueText}". Return a list of up to 5 distinct, real venues with their names and addresses. Use Google Maps grounding to verify existence.` }
          ]
        }
      ],
      config: {
        tools: [{ googleMaps: {} }], // Enable Maps Grounding
        temperature: 0, // Deterministic output
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    // Parse the structured JSON response
    const text = response.text();
    let candidates = [];
    try {
      const json = JSON.parse(text || "{}");
      candidates = json.candidates || [];
    } catch (e) {
      console.error("JSON parse error", e);
    }

    // Extract Grounding Metadata to enrich (optional, mostly for URIs if available)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Attempt to match candidates with grounding URIs if possible, 
    // or just return the structured candidates and let frontend use them.
    // The structured output from Gemini usually incorporates the grounded info directly into the text fields.

    return new Response(
      JSON.stringify({ success: true, candidates, groundingChunks }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});