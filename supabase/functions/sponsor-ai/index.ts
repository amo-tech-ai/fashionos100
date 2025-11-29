
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@0.1.1"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY')

    const { action, sponsorName, sponsorIndustry, eventDetails, contractTerms, metrics } = await req.json()
    const ai = new GoogleGenAI({ apiKey })
    
    let prompt = "";
    let responseMimeType = 'application/json';
    let responseSchema = undefined;
    let systemInstruction = "You are a helpful AI assistant for fashion event production.";
    
    if (action === 'activation-ideas') {
      systemInstruction = `You are a Creative Director for a high-end fashion event agency.
      Your goal is to generate innovative, luxury-focused, and shareable brand activation ideas.
      Focus on experiential luxury, audience engagement, and social media impact.
      Tailor ideas specifically to the sponsor's industry (${sponsorIndustry || 'General'}).`;

      prompt = `
        Sponsor: ${sponsorName} (${sponsorIndustry})
        Event Context: ${eventDetails}
        
        Task: Generate 3 creative, high-impact activation ideas for this sponsor at this event.
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
      systemInstruction = "Act as a Sponsorship Sales Analyst. Scoring rules: Industry Fit (40%), Brand Power (30%), Budget Potential (30%).";
      
      prompt = `
        Evaluate the sponsor lead: ${sponsorName}
        Industry: ${sponsorIndustry}
        Event Context: ${eventDetails}
        
        Task: Calculate a Lead Score (0-100) based on the fit between the sponsor and a fashion event.
        Provide a Category (High/Medium/Low) and a brief reasoning.
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
      systemInstruction = `You are a Social Media Strategist for luxury fashion events.
      Create a 5-post content calendar for a sponsor leading up to and during the event.
      Focus on platform-specific best practices (IG vs TikTok).`;

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
      systemInstruction = "You are a Senior Sponsorship Sales Executive.";
      prompt = `
        Draft a high-converting outbound email to ${sponsorName} (${sponsorIndustry}).
        Context: We are organizing ${eventDetails}.
        Goal: Secure a meeting to discuss partnership.
        
        Output requirements:
        - Subject Line: Catchy and relevant.
        - Body: Personalized value proposition connecting ${sponsorIndustry} audience to our fashion event.
        - Tone: Professional, exclusive, confident.
        - Length: Under 150 words.
        - Format: Plain text.
      `;
      responseMimeType = 'text/plain';

    } else if (action === 'generate-brand-story') {
      systemInstruction = "You are a Brand Storyteller for high-fashion clients.";
      prompt = `
        Brand: ${sponsorName}
        Industry: ${sponsorIndustry}
        
        Task: Write a short, engaging brand story (max 100 words) that highlights their mission and potential synergy with a fashion event.
        Tone: Professional, aspirational, luxury.
      `;
      responseMimeType = 'text/plain';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: responseMimeType,
        responseSchema: responseSchema,
        systemInstruction: systemInstruction
      }
    });

    return new Response(response.text || "", {
      headers: { ...corsHeaders, 'Content-Type': responseMimeType },
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
