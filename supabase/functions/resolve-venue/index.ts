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
    
    // Define schema for multiple candidates with extended details
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
              type: { type: Type.STRING, description: "Type of venue (e.g. Hotel, Warehouse, Gallery)" },
              estimated_capacity: { type: Type.STRING, description: "Estimated capacity (e.g. '500 people'). Guess if unknown based on type." },
              contact_email: { type: Type.STRING, description: "Public contact email or generic placeholder." },
              contact_phone: { type: Type.STRING, description: "Public contact phone or generic placeholder." },
              contact_name: { type: Type.STRING, description: "Name of a contact person or 'Events Team'." }
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
            { text: `Search for real-world venues matching "${venueText}". Return a list of up to 5 distinct, real venues with their names, addresses, and types. 
            Also, use your knowledge to infer or estimate the capacity, and provide public contact details (email/phone) if available or suggest generic ones like 'events@venue.com'. 
            Use Google Maps grounding to verify existence.` }
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
    const text = response.text;
    let candidates = [];
    try {
      const json = JSON.parse(text || "{}");
      candidates = json.candidates || [];
    } catch (e) {
      console.error("JSON parse error", e);
    }

    return new Response(
      JSON.stringify({ success: true, candidates }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});