
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
    
    // Verify user from header to get their ID
    const authHeader = req.headers.get('Authorization')!;
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(authHeader.replace('Bearer ', ''));
    
    if (authError || !user) throw new Error('Unauthorized');

    const { companyName, websiteUrl, socialUrls, description } = await req.json();

    const ai = new GoogleGenAI({ apiKey: geminiApiKey });

    // 1. Construct Analysis Prompt
    const prompt = `
      Role: Expert Fashion Creative Director and Visual Forensics Analyst.
      
      Target Brand: "${companyName}"
      Context Sources:
      - Website: ${websiteUrl || 'N/A'}
      - Social Media: ${socialUrls?.join(', ') || 'N/A'}
      - User Description: ${description || 'N/A'}

      Objective: Reverse-engineer the brand's visual identity and production needs.

      Instructions:
      1. **Visual Forensics**: Analyze the brand's likely aesthetic based on their industry segment (e.g. High Street vs Luxury) and description. 
         - Extract/Infer specific **Hex Codes** (3-5 colors).
         - Define the **Mood** (e.g., 'Cyberpunk', 'Cottagecore', 'Minimalist', 'Y2K').
         - Identify **Lighting** style (e.g., 'High Key', 'Natural Window Light', 'Flash').
         - **Composition**: Guide on how they frame subjects (e.g. 'Centered', 'Rule of Thirds', 'Abstract').
      2. **Deep Dive Identity**: Infer the brand's core mission, target audience demographics, and tone of voice (e.g., 'Playful', 'Serious', 'Luxury').
      3. **Content Strategy**: Determine what kind of content they likely post (e.g. 'Reels', 'Flatlays', 'Street Style').
      4. **Production Recommendations**: Suggest photography scenes, shot types, and video formats that align with this visual identity.
      5. **Campaign Ideas**: Generate 3 distinct, creative campaign concepts.

      IMPORTANT: Be specific and actionable. If the brand is unknown, use the provided description and industry context to hallucinate a *plausible, high-quality* profile that fits their vibe.
    `;

    // 2. Define Schema
    const schema = {
      type: Type.OBJECT,
      properties: {
        visual_identity: {
          type: Type.OBJECT,
          properties: {
            colors: { type: Type.ARRAY, items: { type: Type.STRING } },
            mood: { type: Type.ARRAY, items: { type: Type.STRING } },
            lighting: { type: Type.STRING },
            composition: { type: Type.STRING }
          }
        },
        identity: {
            type: Type.OBJECT,
            properties: {
                core_description: { type: Type.STRING },
                target_audience: { type: Type.ARRAY, items: { type: Type.STRING } },
                brand_pillars: { type: Type.ARRAY, items: { type: Type.STRING } },
                tone_of_voice: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        },
        recommendations: {
            type: Type.OBJECT,
            properties: {
                photography: {
                    type: Type.OBJECT,
                    properties: {
                        shot_types: { type: Type.ARRAY, items: { type: Type.STRING } },
                        scenes: { type: Type.ARRAY, items: { type: Type.STRING } },
                        framing: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                },
                video: {
                    type: Type.OBJECT,
                    properties: {
                        formats: { type: Type.ARRAY, items: { type: Type.STRING } },
                        style_notes: { type: Type.ARRAY, items: { type: Type.STRING } },
                        platform_ideas: { 
                            type: Type.OBJECT,
                            properties: {
                                instagram: { type: Type.ARRAY, items: { type: Type.STRING } },
                                tiktok: { type: Type.ARRAY, items: { type: Type.STRING } }
                            }
                        }
                    }
                },
                campaigns: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            concept: { type: Type.STRING },
                            channel: { type: Type.STRING }
                        }
                    }
                }
            }
        }
      }
    };

    // 3. Call Gemini
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema
      }
    });

    // Clean up response text in case of markdown blocks
    const rawText = aiResponse.text || "{}";
    const cleanText = rawText.replace(/```json/g, '').replace(/```/g, '');
    const result = JSON.parse(cleanText);

    // 4. Transactional Insert
    // A. Company
    const { data: company, error: coError } = await supabaseAdmin
      .from('companies')
      .insert({
        owner_id: user.id,
        name: companyName,
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
            brand_pillars: result.identity.brand_pillars,
            tone_of_voice: result.identity.tone_of_voice
        });
    }

    // C. Visuals
    if (result.visual_identity) {
        await supabaseAdmin.from('brand_visuals').insert({
            company_id: company.id,
            colors: result.visual_identity.colors,
            moods: result.visual_identity.mood,
            lighting_style: result.visual_identity.lighting,
            composition_guide: result.visual_identity.composition
        });
    }

    // D. Recommendations
    if (result.recommendations) {
        await supabaseAdmin.from('production_recommendations').insert({
            company_id: company.id,
            recommended_photography: {
                shot_types: result.recommendations.photography?.shot_types,
                scenes: result.recommendations.photography?.scenes,
                framing_guidelines: result.recommendations.photography?.framing
            },
            recommended_video: {
                formats: result.recommendations.video?.formats,
                style_notes: result.recommendations.video?.style_notes,
                platform_specific_ideas: result.recommendations.video?.platform_ideas
            },
            campaign_ideas: result.recommendations.campaigns
        });
    }

    return new Response(JSON.stringify({ success: true, companyId: company.id }), {
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
