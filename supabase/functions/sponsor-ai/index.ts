
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@0.1.1"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY')

    const requestData = await req.json()
    const { action, sponsorName, sponsorIndustry, eventDetails, contractTerms, metrics, mediaBase64 } = requestData
    
    const ai = new GoogleGenAI({ apiKey })
    
    let prompt = "";
    let responseMimeType = 'application/json';
    let responseSchema = undefined;
    let tools: any[] = [];
    let thinkingConfig = undefined;
    let modelName = 'gemini-2.5-flash'; // Default model
    let contents: any[] = [];
    
    let systemInstruction = "You are a helpful AI assistant for fashion event production.";
    
    if (action === 'activation-ideas') {
      // Enable Search to find current trends
      tools = [{ googleSearch: {} }];
      
      systemInstruction = `You are a Creative Director for a high-end fashion event agency.
      Your goal is to generate innovative, luxury-focused, and shareable brand activation ideas.
      Focus on experiential luxury, audience engagement, and social media impact.
      Use Google Search to find recent successful activations by this brand or competitors.`;

      prompt = `
        Sponsor: ${sponsorName} (${sponsorIndustry})
        Event Context: ${eventDetails}
        
        Task: Generate 3 creative, high-impact activation ideas for this sponsor at this event.
        Research the sponsor's recent marketing campaigns to ensure brand alignment.
        If industry is 'Tech', suggest VR/AR or digital displays.
        If 'Beauty', suggest sampling or makeover stations.
        If 'Beverage', suggest branded bars or lounges.
      `;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          ideas: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                estimated_cost: { type: Type.STRING }
              },
              required: ["title", "description", "estimated_cost"]
            }
          }
        }
      };

    } else if (action === 'score-lead') {
      // Enable Thinking for deep analysis and Search for verification
      tools = [{ googleSearch: {} }];
      thinkingConfig = { thinkingBudget: 1024 }; // Enable reasoning
      
      systemInstruction = "Act as a Sponsorship Sales Analyst. Scoring rules: Industry Fit (40%), Brand Power (30%), Budget Potential (30%). Verify brand details online.";
      
      prompt = `
        Evaluate the sponsor lead: ${sponsorName}
        Industry: ${sponsorIndustry}
        Event Context: ${eventDetails}
        
        Task: Calculate a Lead Score (0-100) based on the fit between the sponsor and a fashion event.
        1. Use Google Search to verify the brand's current market positioning and revenue tier.
        2. Analyze recent sponsorships they have done.
        3. Provide a score and reasoning.
      `;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          category: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
          reasoning: { type: Type.STRING }
        },
        required: ["score", "category", "reasoning"]
      };

    } else if (action === 'generate-social-plan') {
      // Search for trending hashtags and formats
      tools = [{ googleSearch: {} }];

      systemInstruction = `You are a Social Media Strategist for luxury fashion events.
      Create a 5-post content calendar for a sponsor leading up to and during the event.
      Use Google Search to find current trending audio or formats for fashion week.`;

      prompt = `
        Sponsor: ${sponsorName} (${sponsorIndustry})
        Event: ${eventDetails}
        
        Task: Create 5 social media posts (mix of Instagram, TikTok, LinkedIn) to maximize sponsor visibility.
        Include visual direction and caption.
      `;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          posts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                platform: { type: Type.STRING, enum: ["Instagram", "TikTok", "LinkedIn", "Twitter"] },
                content_type: { type: Type.STRING },
                caption: { type: Type.STRING },
                visual_idea: { type: Type.STRING }
              },
              required: ["day", "platform", "content_type", "caption", "visual_idea"]
            }
          }
        }
      };

    } else if (action === 'generate-roi-report') {
      // Text output, no search needed usually, but good for context
      systemInstruction = `You are a Senior Account Manager at a fashion PR agency. 
      Your goal is to write a persuasive, professional post-event executive summary for a sponsor.
      Highlight key wins, contextualize the data, and subtly suggest renewal.`;
      
      prompt = `
        Sponsor: ${sponsorName}
        Event: ${eventDetails}
        
        Performance Metrics:
        ${JSON.stringify(metrics, null, 2)}
        
        Task: Write a 150-200 word executive summary of their sponsorship performance.
        Tone: Professional, celebratory, data-driven.
        Format: Plain text (Markdown allowed for bolding).
      `;
      responseMimeType = 'text/plain';

    } else if (action === 'generate-pitch') {
      // Search to personalize the pitch
      tools = [{ googleSearch: {} }];
      
      systemInstruction = "You are a Senior Sponsorship Sales Executive.";
      prompt = `
        Draft a high-converting outbound email to ${sponsorName} (${sponsorIndustry}).
        Context: We are organizing ${eventDetails}.
        Goal: Secure a meeting to discuss partnership.
        
        Research ${sponsorName} to find their latest campaign or press release. Mention it in the email to show research.
        
        Output requirements:
        - Subject Line: Catchy and relevant.
        - Body: Personalized value proposition connecting ${sponsorIndustry} audience to our fashion event.
        - Tone: Professional, exclusive, confident.
        - Length: Under 150 words.
        - Format: Plain text.
      `;
      responseMimeType = 'text/plain';

    } else if (action === 'generate-brand-story') {
       // Search to find real brand mission
      tools = [{ googleSearch: {} }];
      
      systemInstruction = "You are a Brand Storyteller for high-fashion clients.";
      prompt = `
        Brand: ${sponsorName}
        Industry: ${sponsorIndustry}
        
        Task: Write a short, engaging brand story (max 100 words).
        Use Google Search to find their actual mission statement or "About Us" to ensure accuracy.
        Tone: Professional, aspirational, luxury.
      `;
      responseMimeType = 'text/plain';

    } else if (action === 'recommend-packages') {
        // Suggest sponsorship packages
        systemInstruction = "You are a Sponsorship Strategist. Create tailored packages.";
        prompt = `
            Sponsor: ${sponsorName} (${sponsorIndustry})
            Event: ${eventDetails}
            
            Task: Recommend 3 sponsorship tiers (Title, Gold, Silver) that would appeal to this specific sponsor.
            For example, if they are a tech brand, suggest digital activations. If beauty, suggest backstage access.
        `;
        
        responseSchema = {
            type: Type.OBJECT,
            properties: {
                recommendations: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            tier_name: { type: Type.STRING },
                            price: { type: Type.NUMBER },
                            features: { type: Type.ARRAY, items: { type: Type.STRING } }
                        },
                        required: ["tier_name", "price", "features"]
                    }
                }
            }
        };

    } else if (action === 'draft-contract') {
        // Draft simple contract terms
        systemInstruction = "You are a Legal Assistant for events.";
        prompt = `
            Draft the key terms for a sponsorship agreement.
            Sponsor: ${sponsorName}
            Event: ${contractTerms?.event}
            Tier: ${contractTerms?.tier}
            Value: Cash $${contractTerms?.value}, In-Kind $${contractTerms?.inKind}
            
            Include standard clauses for:
            1. Deliverables
            2. Payment Schedule (50% deposit, 50% pre-event)
            3. Cancellation Policy
            4. Usage Rights
            
            Format: Plain text, clearly numbered sections.
        `;
        responseMimeType = 'text/plain';

    } else if (action === 'analyze-media') {
        // Vision analysis of uploaded asset
        modelName = 'gemini-2.5-flash'; // Multimodal
        systemInstruction = "You are a Design QA Specialist. Verify if the image is suitable for high-end print or digital use.";
        
        prompt = "Analyze this image. Is it a logo, a document, or a creative asset? Rate its quality for professional use.";
        
        if (mediaBase64) {
            contents = [{
                role: 'user',
                parts: [
                    { text: prompt },
                    { inlineData: { mimeType: 'image/png', data: mediaBase64 } }
                ]
            }];
        } else {
             // Fallback if no image provided
             return new Response(JSON.stringify({ error: "No image data provided for analysis" }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400
            });
        }
        responseMimeType = 'application/json';
        responseSchema = {
            type: Type.OBJECT,
            properties: {
                asset_type: { type: Type.STRING, enum: ['logo', 'document', 'photo', 'other'] },
                quality_score: { type: Type.NUMBER },
                feedback: { type: Type.STRING }
            }
        };
    }

    // Configure API call
    const config: any = {
      responseMimeType: responseMimeType,
      systemInstruction: systemInstruction
    };

    if (responseSchema) config.responseSchema = responseSchema;
    if (tools.length > 0) config.tools = tools;
    if (thinkingConfig) config.thinkingConfig = thinkingConfig;

    // Construct contents if not already set (for text-only prompts)
    if (contents.length === 0) {
        contents = [{ role: 'user', parts: [{ text: prompt }] }];
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: config
    });

    let outputText = response.text || "";
    
    // Robust JSON parsing for structured outputs
    if (responseMimeType === 'application/json') {
        try {
             outputText = outputText.trim();
             if (outputText.startsWith('```json')) {
                 outputText = outputText.replace(/^```json\n/, '').replace(/\n```$/, '');
             } else if (outputText.startsWith('```')) {
                 outputText = outputText.replace(/^```\n/, '').replace(/\n```$/, '');
             }
             // Validate it parses
             JSON.parse(outputText);
        } catch (e) {
            console.error("JSON Parse Error:", e, "Raw Output:", outputText);
            // Fallback or Error
            return new Response(JSON.stringify({ error: "AI generated invalid JSON. Please try again." }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 500
            });
        }
    }

    return new Response(outputText, {
      headers: { ...corsHeaders, 'Content-Type': responseMimeType },
    })

  } catch (error: any) {
    console.error("Edge Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
