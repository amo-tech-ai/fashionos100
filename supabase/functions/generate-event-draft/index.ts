
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

    const requestBody = await req.json();
    const { prompt, url, urls, files } = requestBody;

    // Backend Validation: Check if at least one input is provided
    if (!prompt && !url && (!urls || urls.length === 0) && (!files || files.length === 0) && (!requestBody.fileBase64)) {
        return new Response(JSON.stringify({ error: "No input provided. Please provide a prompt, URL, or file." }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
        });
    }

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
    
    // Handle Single URL (Legacy)
    if (url) parts.push({ text: `Context URL to analyze: ${url}` })

    // Handle Multiple URLs (New)
    if (urls && Array.isArray(urls) && urls.length > 0) {
        parts.push({ text: `Context URLs to analyze and synthesize:\n${urls.map((u: string) => `- ${u}`).join('\n')}` })
    }

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
    } else if (requestBody.fileBase64 && requestBody.fileType) {
        // Backward compatibility if needed
        parts.push({
            inlineData: {
                data: requestBody.fileBase64,
                mimeType: requestBody.fileType
            }
        })
    }

    if (parts.length === 0) {
        throw new Error("No valid content parts to generate from.")
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: { parts },
      config: {
        tools: [{ googleSearch: {} }], // Enable Google Search Grounding
        responseMimeType: "application/json",
        responseSchema: schema,
        thinkingConfig: { thinkingBudget: 2048 }, // Activate Thinking for reasoning about defaults
        systemInstruction: `You are the AI Event Architect for FashionOS.
        Task: Convert user input into a complete, structured fashion event plan.
        
        Capabilities:
        - Analyze text, URLs, images, and documents.
        - Use Google Search to verify venue locations, check calendar dates, and understand current fashion trends related to the event theme.
        
        Context:
        - Year: 2025.
        - Event Types: Runway, Party, Workshop, Exhibition, Pop-up, Conference.

        Reasoning Steps:
        1. Analyze the input for explicit details.
        2. If a venue name is provided, use Google Search to find its real address and capacity if possible.
        3. If details are missing, INFER reasonable defaults based on the event type (e.g. Gala = high price, Pop-up = low price).
        4. Generate a professional description and catchy title suggestions.
        5. Structure ticket tiers and schedule logically.

        Output:
        - Return ONLY valid JSON matching the schema.`,
      }
    })

    let responseText = response.text || "{}"

    // Robust JSON Parsing: Remove Markdown code blocks if present
    responseText = responseText.trim();
    if (responseText.startsWith('```json')) {
        responseText = responseText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (responseText.startsWith('```')) {
        responseText = responseText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    // Safe parse verification
    try {
        JSON.parse(responseText);
    } catch (e) {
        console.error("Invalid JSON output from AI:", responseText);
        throw new Error("AI failed to generate a valid event draft (JSON Parse Error).");
    }

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
