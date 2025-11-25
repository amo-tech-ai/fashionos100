
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai"

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

    const { 
      eventDetails, 
      venueConstraints, 
      talentSchedules, 
      deadline 
    } = await req.json()

    const ai = new GoogleGenAI({ apiKey })

    // Define the output schema for structured reasoning
    const schema = {
      type: Type.OBJECT,
      properties: {
        thought_process: {
          type: Type.STRING,
          description: "Step-by-step reasoning analyzing the conflicts between venue, talent, and deadlines."
        },
        suggested_slots: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              date: { type: Type.STRING, description: "YYYY-MM-DD" },
              start_time: { type: Type.STRING, description: "HH:MM" },
              end_time: { type: Type.STRING, description: "HH:MM" },
              confidence_score: { type: Type.NUMBER, description: "0 to 100" },
              reason: { type: Type.STRING, description: "Why this slot works best" }
            },
            required: ["date", "start_time", "end_time", "confidence_score", "reason"]
          }
        },
        unresolvable_conflicts: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of major blockers if no perfect slot exists."
        }
      },
      required: ["thought_process", "suggested_slots"]
    }

    const prompt = `
      You are the AI Logistics Director for a high-stakes fashion event.
      Your goal is to find the optimal time slot for an event by resolving conflicting schedules.

      INPUT CONTEXT:
      - Event Basic Info: ${JSON.stringify(eventDetails)}
      - Deadline: ${deadline || "None"}
      - Venue Availability Constraints: ${venueConstraints || "Assume standard business hours + evenings"}
      - Key Talent/Model Schedules: ${talentSchedules || "None provided, assume flexible"}

      INSTRUCTIONS:
      1. Analyze the Venue constraints first.
      2. Overlay the Talent schedules to find overlaps.
      3. Ensure the date is before the Deadline.
      4. If conflicts exist, prioritize the Venue availability but note the conflict.
      5. Provide a "thought_process" explaining your logic like a human scheduler.
      6. Return top 3 suggestions.
    `

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', // High reasoning capability model
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2 // Low temperature for logic/scheduling
      }
    });

    return new Response(response.text, {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error: any) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
