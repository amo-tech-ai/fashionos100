
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@0.1.1"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  // 1. Handle CORS Preflight Request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY')

    const { prompt, url, files } = await req.json() // files is Array<{ data: string, mimeType: string }>

    const ai = new GoogleGenAI({ apiKey })

    const schema = {
      type: Type.OBJECT,
      properties: {
        eventTitle: { type: Type.STRING },
        eventTitleSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
        descriptionShort: { type: Type.STRING },
        descriptionLong: { type: Type.STRING },
        category: { type: Type.STRING },
        targetAudience: { type: Type.STRING },
        location: { type: Type.STRING },
        date: { type: Type.STRING, description: "YYYY-MM-DD format" },
        ticketTiers: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              price: { type: Type.NUMBER },
              quantity: { type: Type.NUMBER }
            }
          }
        },
        scheduleItems: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              time: { type: Type.STRING },
              activity: { type: Type.STRING }
            }
          }
        }
      },
      required: ["eventTitle", "category", "descriptionLong", "ticketTiers", "scheduleItems"]
    }

    const parts = []
    if (prompt) parts.push({ text: prompt })
    if (url) parts.push({ text: `Context URL to analyze: ${url}` })

    // Handle multiple files
    if (files && Array.isArray(files)) {
      files.forEach((file: { data: string, mimeType: string }) => {
        if (file.data && file.mimeType) {
          parts.push({
            inlineData: {
              data: file.data,
              mimeType: file.mimeType
            }
          });
        }
      });
    } else if (req.body?.fileBase64 && req.body?.fileType) {
        // Backward compatibility if needed (though we updated frontend)
        parts.push({
            inlineData: {
                data: req.body.fileBase64,
                mimeType: req.body.fileType
            }
        })
    }

    if (parts.length === 0) {
       throw new Error("No prompt, URL, or files provided.")
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Use 2.5 Flash for robust multimodal reasoning
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: `You are the AI Event Architect for FashionOS.
        Task: Convert user input into a complete, structured fashion event plan.
        
        Capabilities:
        - Analyze text, URLs, images (moodboards, flyers), and documents (contracts, schedules).
        - Extract event details like Date, Time, Venue, and Schedule from images/PDFs.
        - If multiple inputs are provided, synthesize them into one coherent plan.

        Context:
        - Year: 2025.
        - Event Types: Runway, Party, Workshop, Exhibition, Pop-up, Conference.

        Reasoning Steps:
        1. Analyze the input for explicit details (Date, Location, Theme, Target Audience).
        2. If details are missing, INFER reasonable defaults based on the event type.
           - Runways typically happen in the evening. Workshops in the morning.
        3. Infer 'targetAudience' based on category if not provided:
           - 'Runway' -> 'Industry Professionals, Buyers'
           - 'Pop-up' -> 'General Public'
           - 'Workshop' -> 'Aspiring Designers, Students'
           - 'Party' -> 'Influencers, VIPs'
        4. Generate a professional description and catchy title suggestions.
        5. Structure ticket tiers if not provided:
           - Suggest 'General Admission' and 'VIP' with reasonable prices based on the vibe.
        6. Create a default schedule if one is not provided:
           - E.g. 'Doors Open', 'Main Event', 'Networking'.

        Output:
        - Return ONLY valid JSON matching the schema.`,
      }
    })

    const responseText = response.text || "{}"

    return new Response(responseText, {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error: any) {
    console.error("Error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
