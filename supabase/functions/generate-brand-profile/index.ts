
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@0.1.1"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiApiKey) throw new Error('Missing GEMINI_API_KEY');

    // Use Service Role to bypass RLS for complex insertions, but we will associate data with the user's ID
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // Verify user from header to get their ID (Optional for public wizard, required for saving)
    const authHeader = req.headers.get('Authorization');
    let userId = null;
    if (authHeader) {
        const { data: { user } } = await supabaseAdmin.auth.getUser(authHeader.replace('Bearer ', ''));
        userId = user?.id;
    }

    const { companyName, websiteUrl, socialUrls, description, mode } = await req.json();

    const ai = new GoogleGenAI({ apiKey: geminiApiKey });

    // 1. Construct Analysis Prompt
    const prompt = `
      Role: Expert Fashion Creative Director and Visual Forensics Analyst.
      
      Target: "${companyName || websiteUrl || 'Unknown Brand'}"
      Context Sources:
      - Website: ${websiteUrl || 'N/A'}
      - Social Media: ${socialUrls?.join(', ') || 'N/A'}
      - User Description: ${description || 'N/A'}

      Objective: Analyze the brand to provide production recommendations for a photoshoot.

      Tasks:
      1. **Grounding**: Use Google Search to verify the brand's existence, core product offering, and current visual style if URL is provided.
      2. **Categorization**: Map the brand to one of these specific categories: ['fashion', 'beauty', 'jewelry', 'footwear', 'eyewear', 'food'].
      3. **Style Matching**: Map to a visual style: ['editorial', 'high-fashion', 'street', 'catalog', 'runway'].
      4. **Visual Analysis**: Extract hex colors, mood keywords, and lighting preferences.
    `;

    // 2. Define Schema
    const schema = {
      type: Type.OBJECT,
      properties: {
        brand_name: { type: Type.STRING },
        detected_category: { type: Type.STRING, enum: ['fashion', 'beauty', 'jewelry', 'footwear', 'eyewear', 'food'] },
        recommended_style: { type: Type.STRING, enum: ['editorial', 'high-fashion', 'street', 'catalog', 'runway'] },
        visual_identity: {
          type: Type.OBJECT,
          properties: {
            colors: { type: Type.ARRAY, items: { type: Type.STRING } },
            mood: { type: Type.ARRAY, items: { type: Type.STRING } },
            lighting: { type: Type.STRING }
          }
        },
        identity: {
            type: Type.OBJECT,
            properties: {
                core_description: { type: Type.STRING },
                target_audience: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        }
      },
      required: ["detected_category", "recommended_style", "visual_identity", "identity"]
    };

    // 3. Call Gemini with Search Grounding
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        tools: [{ googleSearch: {} }], // Enable Search Grounding
        responseMimeType: 'application/json',
        responseSchema: schema
      }
    });

    const rawText = aiResponse.text || "{}";
    const result = JSON.parse(rawText);

    // If just analyzing for wizard, return early
    if (mode === 'wizard_analysis') {
        return new Response(JSON.stringify({ success: true, data: result }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
        });
    }

    // Otherwise, save to DB (Existing logic for Dashboard Brand Profile)
    if (userId) {
        // A. Company
        const { data: company, error: coError } = await supabaseAdmin
          .from('companies')
          .insert({
            owner_id: userId,
            name: result.brand_name || companyName || 'My Brand',
            website_url: websiteUrl,
            description: result.identity?.core_description
          })
          .select()
          .single();

        if (coError) throw coError;

        // B. Identity
        if (result.identity) {
            await supabaseAdmin.from('brand_identities').insert({
                company_id: company.id,
                core_description: result.identity.core_description,
                target_audience: result.identity.target_audience,
            });
        }

        // C. Visuals
        if (result.visual_identity) {
            await supabaseAdmin.from('brand_visuals').insert({
                company_id: company.id,
                colors: result.visual_identity.colors,
                moods: result.visual_identity.mood,
                lighting_style: result.visual_identity.lighting,
            });
        }

        return new Response(JSON.stringify({ success: true, companyId: company.id, data: result }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        });
    }

    return new Response(JSON.stringify({ success: true, data: result }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
    });

  } catch (error: any) {
    console.error("Error generating brand profile:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
})
