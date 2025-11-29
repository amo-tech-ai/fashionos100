
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@0.1.1"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!apiKey || !supabaseUrl || !supabaseKey) throw new Error('Configuration missing')

    const supabase = createClient(supabaseUrl, supabaseKey)
    const ai = new GoogleGenAI({ apiKey })

    const { shootId, message, context } = await req.json()

    // 1. Define Tools
    const tools = [{
      functionDeclarations: [
        {
          name: "add_shot",
          description: "Add a new item to the photography/video shot list.",
          parameters: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Short title of the shot (e.g. Hero Shot)" },
              instructions: { type: Type.STRING, description: "Detailed visual instructions" }
            },
            required: ["name"]
          }
        },
        {
          name: "update_brief",
          description: "Rewrite or update the creative brief text.",
          parameters: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING, description: "The new full content of the creative brief" }
            },
            required: ["text"]
          }
        }
      ]
    }]

    // 2. Initialize Model with Tools
    const model = ai.getGenerativeModel({ 
        model: "gemini-2.5-flash", 
        tools: tools,
        systemInstruction: `You are an expert Fashion Producer Assistant. 
        You are helping a user manage their photoshoot (ID: ${shootId}).
        Current Context: 
        - Category: ${context?.category}
        - Shot Count: ${context?.shotList?.length || 0}
        
        Your goal is to be helpful, concise, and execute changes when asked.
        If the user asks to add shots, use the 'add_shot' tool.
        If the user wants to change the brief, use 'update_brief'.
        Always confirm what you did.`
    })

    // 3. Generate Content (Single Turn for simplicity in this implementation)
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }]
    })

    const response = result.response;
    const functionCalls = response.functionCalls();
    const actionResults: string[] = [];

    // 4. Execute Tools
    if (functionCalls && functionCalls.length > 0) {
      // Fetch current data first
      const { data: shoot, error: fetchError } = await supabase
        .from('shoots')
        .select('brief_data')
        .eq('id', shootId)
        .single();

      if (fetchError) throw new Error("Failed to fetch shoot data");

      let briefData = shoot.brief_data || {};
      
      for (const call of functionCalls) {
        if (call.name === "add_shot") {
           const { name, instructions } = call.args as any;
           const currentList = briefData.shot_list || [];
           const newItem = { 
               id: crypto.randomUUID(), 
               name, 
               instructions: instructions || "Standard setup",
               referenceImage: ""
           };
           briefData = { ...briefData, shot_list: [...currentList, newItem] };
           actionResults.push(`Added shot: "${name}"`);
        } 
        else if (call.name === "update_brief") {
           const { text } = call.args as any;
           briefData = { ...briefData, brief: text };
           actionResults.push("Updated creative brief.");
        }
      }

      // Save changes to DB
      const { error: updateError } = await supabase
        .from('shoots')
        .update({ brief_data: briefData })
        .eq('id', shootId);

      if (updateError) throw new Error("Database update failed");
    }

    // 5. Return Response
    const replyText = response.text() || (actionResults.length > 0 ? `Done! ${actionResults.join(' ')}` : "I processed that.");

    return new Response(JSON.stringify({ 
      text: replyText,
      actions: actionResults
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })
  }
})
