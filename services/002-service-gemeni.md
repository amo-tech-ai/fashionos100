# Gemini AI Integration Plan for FashionOS

**Status:** Strategic Planning  
**Version:** 1.1 (Updated 2025-01-27)  
**Target:** Maximize AI value across shoot booking, sponsor management, and event services  
**Revenue Impact:** $75K/month target (AMO SaaS + Medellín AI)

**⚠️ Note:** File name contains typo ("gemeni" should be "gemini") but kept for consistency with existing references.

---

## 🎯 Executive Summary

**Core Insight:** Gemini AI can automate 60% of manual work in shoot booking, sponsor matching, and content generation.

**Key Mechanism:** Strategic use of Gemini 2.5 Flash (fast, cost-effective) and Gemini 3 Pro (complex reasoning) across 20+ use cases.

**Strategic Advantage:** Reduces operational costs, increases conversion rates, enables self-service at scale.

**Implementation Priority:** Start with high-impact, low-complexity features (Brief Polisher, URL Analysis) → Add advanced features (Function Calling, Structured Outputs) → Scale with File Search and Code Execution.

---

## 📊 Feature Matrix & Scoring

### Scoring Criteria (out of 100)
- **Revenue Impact (40pts):** Direct impact on bookings, conversions, or subscription value
- **User Experience (30pts):** Reduces friction, saves time, improves satisfaction
- **Implementation Complexity (20pts):** Development effort and maintenance burden
- **Technical Feasibility (10pts):** Current Gemini capabilities and reliability

**Total Score = Revenue + UX + (100 - Complexity) + Feasibility**

---

## 🏆 Top 10 Gemini Features (Ranked by Score)

| Rank | Feature | Score | Gemini Tool | Use Case | Revenue Impact |
|------|---------|-------|-------------|----------|----------------|
| 1 | **Brief Polisher** | 92/100 | Text Generation | Convert messy user input to professional briefs | High - Reduces booking friction 80% |
| 2 | **Brand URL Analyzer** | 90/100 | URL Context + Structured Output | Extract brand style from website URLs | High - Personalizes onboarding instantly |
| 3 | **Shoot Price Calculator** | 88/100 | Structured Output + Function Calling | Generate pricing JSON from brief description | High - Enables self-service pricing |
| 4 | **Image Style Extraction** | 87/100 | Multimodal Vision | Analyze reference images for style parameters | High - Ensures brand consistency |
| 5 | **Event Draft Generator** | 85/100 | Text Generation + Structured Output | Create complete event plans from briefs | Medium - Saves 4+ hours per event |
| 6 | **Sponsor Matching** | 84/100 | Structured Output + Function Calling | Match sponsors to events based on criteria | High - Increases sponsor conversion |
| 7 | **Auto Tagging** | 82/100 | Multimodal Vision + Structured Output | Tag uploaded images with metadata | Medium - Improves asset discovery |
| 8 | **Venue Resolution** | 80/100 | Google Search + Structured Output | Find and validate venue information | Medium - Reduces manual research |
| 9 | **Schedule Optimizer** | 78/100 | Structured Output + Function Calling | Optimize shoot schedules for efficiency | Medium - Reduces studio downtime |
| 10 | **Content Generation** | 75/100 | Text Generation + Image Generation | Generate marketing content from event data | Low - Nice-to-have feature |

---

## 📋 Complete Feature Matrix

### Category 1: Shoot Booking System

#### 1.1 Brief Polisher ⭐ **SCORE: 92/100**
- **Gemini Tool:** Text Generation (`gemini-2.5-flash`)
- **Current Status:** ✅ Implemented (`polish-brief` edge function)
- **Use Case:** User types messy notes → AI converts to professional brief
- **Real-World Example:**
  - **Input:** "I want edgy vibes, kinda dark, like Balenciaga street style"
  - **Output:** "**Concept:** Edgy/Industrial streetwear aesthetic. **Mood:** Moody, high-contrast, urban. **Reference Style:** High-end streetwear (Balenciaga-inspired). **Lighting:** Low-key, dramatic shadows."
- **Revenue Impact:** 40/40 (Reduces booking friction by 80%, increases conversion)
- **User Experience:** 30/30 (Saves time, improves clarity)
- **Implementation Complexity:** 8/20 (Simple text generation, already implemented)
- **Technical Feasibility:** 10/10 (Proven, reliable)
- **Improvements:**
  - Add structured output for consistent format
  - Support multiple brief types (shoot, event, marketing)
  - Add tone/style options (professional, creative, technical)

#### 1.2 Brand URL Analyzer ⭐ **SCORE: 90/100**
- **Gemini Tool:** URL Context + Structured Output (`gemini-2.5-flash`)
- **Current Status:** ⚠️ Partially implemented (manual URL inclusion in `generate-image-preview/index.ts`)
- **Edge Function:** `generate-image-preview` (needs enhancement to use URL Context tool)
- **Use Case:** Designer provides website URL → AI extracts brand style, suggests packages
- **Real-World Example:**
  - **Input:** `https://brand.com`
  - **Output:** 
    ```json
    {
      "colorPalette": ["#000000", "#FFFFFF", "#FF6B6B"],
      "lightingStyle": "High contrast, soft shadows",
      "compositionStyle": "Minimalist, centered",
      "recommendedPackages": ["E-commerce Pack", "Editorial Pack"],
      "targetAudience": "Luxury fashion consumers, 25-45"
    }
    ```
- **Revenue Impact:** 40/40 (Personalizes experience, increases conversion)
- **User Experience:** 30/30 (Instant personalization, zero effort)
- **Implementation Complexity:** 12/20 (URL Context tool + structured output)
- **Technical Feasibility:** 10/10 (Well-supported feature)
- **Implementation:**
  ```typescript
  // Edge function: analyze-brand-url
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [`Analyze brand style from: ${url}`],
    config: {
      tools: [{ urlContext: {} }],
      responseMimeType: 'application/json',
      responseSchema: brandStyleSchema
    }
  });
  ```

#### 1.3 Shoot Price Calculator ⭐ **SCORE: 88/100**
- **Gemini Tool:** Structured Output + Function Calling (`gemini-2.5-flash`)
- **Current Status:** ⚠️ Database function exists (`calculate_shoot_price()` in `03-shoot-schema.md`), but no Gemini integration yet
- **Edge Function:** Could create `calculate-shoot-price` edge function with Gemini for natural language pricing
- **Use Case:** User describes shoot needs → AI generates pricing breakdown
- **Real-World Example:**
  - **Input:** "10 looks, e-commerce, white background, need retouching"
  - **Output:**
    ```json
    {
      "basePrice": 2500,
      "looks": 10,
      "pricePerLook": 250,
      "addons": [
        { "name": "Advanced Retouching", "price": 500 },
        { "name": "Steaming", "price": 200 }
      ],
      "total": 3200,
      "breakdown": "10 looks × $250 = $2,500 base + $500 retouching + $200 steaming = $3,200"
    }
    ```
- **Revenue Impact:** 38/40 (Enables self-service, reduces sales time)
- **User Experience:** 28/30 (Transparent pricing, instant quotes)
- **Implementation Complexity:** 14/20 (Requires pricing logic + structured output)
- **Technical Feasibility:** 8/10 (Needs pricing rules engine)
- **Implementation:** Create `calculate-shoot-price` edge function with pricing rules

#### 1.4 Image Style Extraction ⭐ **SCORE: 87/100**
- **Gemini Tool:** Multimodal Vision (`gemini-2.5-flash` or `gemini-3-pro-preview`)
- **Current Status:** ⚠️ Partially implemented (image generation in `generate-image-preview`, not extraction)
- **Edge Function:** `generate-image-preview` (could add extraction feature)
- **Use Case:** User uploads reference image → AI extracts style parameters
- **Real-World Example:**
  - **Input:** Reference image of moody fashion shoot
  - **Output:**
    ```json
    {
      "lighting": "Low-key, dramatic shadows",
      "colorPalette": ["#1a1a1a", "#4a4a4a", "#ffffff"],
      "composition": "Centered, minimalist",
      "mood": "Moody, editorial",
      "styleTags": ["dark", "editorial", "high-fashion"]
    }
    ```
- **Revenue Impact:** 38/40 (Ensures brand consistency, reduces revisions)
- **User Experience:** 28/30 (Visual input, instant style extraction)
- **Implementation Complexity:** 12/20 (Multimodal API + structured output)
- **Technical Feasibility:** 9/10 (Well-supported)
- **Implementation:** Add to `generate-image-preview` or create new `extract-style` function

#### 1.5 Auto Tagging ⭐ **SCORE: 82/100**
- **Gemini Tool:** Multimodal Vision + Structured Output (`gemini-2.5-flash`)
- **Current Status:** ❌ Not implemented
- **Use Case:** Upload final images → AI tags with metadata (garment type, color, style)
- **Real-World Example:**
  - **Input:** Uploaded image of red dress
  - **Output:**
    ```json
    {
      "tags": ["dress", "red", "silk", "v-neck", "midi-length"],
      "colors": ["#C41E3A", "#8B0000"],
      "garmentType": "dress",
      "style": "elegant",
      "suitableFor": ["e-commerce", "editorial"]
    }
    ```
- **Revenue Impact:** 30/40 (Improves asset discovery, reduces manual work)
- **User Experience:** 28/30 (Automatic tagging, better search)
- **Implementation Complexity:** 10/20 (Multimodal + structured output)
- **Technical Feasibility:** 9/10 (Straightforward)
- **Implementation:** Create `auto-tag-assets` edge function

---

### Category 2: Event & Sponsor Management

#### 2.1 Event Draft Generator ⭐ **SCORE: 85/100**
- **Gemini Tool:** Text Generation + Structured Output (`gemini-2.5-flash`)
- **Current Status:** ✅ Implemented (`generate-event-draft` edge function)
- **Edge Function:** `supabase/functions/generate-event-draft/index.ts`
- **Use Case:** User provides event concept → AI generates complete event plan
- **Real-World Example:**
  - **Input:** "Fashion week runway show, 200 attendees, luxury brands"
  - **Output:** Complete event plan with timeline, logistics, marketing plan
- **Revenue Impact:** 35/40 (Saves 4+ hours per event, increases value)
- **User Experience:** 28/30 (Instant comprehensive plans)
- **Implementation Complexity:** 8/20 (Already implemented, needs enhancement)
- **Technical Feasibility:** 10/10 (Proven)
- **Improvements:**
  - Add URL Context for venue research
  - Add Google Search for trend analysis
  - Enhance structured output format

#### 2.2 Sponsor Matching ⭐ **SCORE: 84/100**
- **Gemini Tool:** Structured Output + Function Calling (`gemini-2.5-flash`)
- **Current Status:** ✅ Implemented (`sponsor-ai` edge function)
- **Edge Function:** `supabase/functions/sponsor-ai/index.ts`
- **Use Case:** Event details → AI matches compatible sponsors
- **Real-World Example:**
  - **Input:** Event: "Sustainable fashion runway, eco-friendly brands, 500 attendees"
  - **Output:**
    ```json
    {
      "matchedSponsors": [
        {
          "id": "sponsor-123",
          "name": "EcoLux Brands",
          "matchScore": 95,
          "reasons": ["Eco-friendly focus", "Target audience match", "Budget alignment"]
        }
      ],
      "recommendations": "Focus on sustainability messaging, highlight eco credentials"
    }
    ```
- **Revenue Impact:** 38/40 (Increases sponsor conversion, reduces manual matching)
- **User Experience:** 28/30 (Intelligent matching, saves research time)
- **Implementation Complexity:** 14/20 (Requires sponsor database + matching logic)
- **Technical Feasibility:** 8/10 (Needs sponsor data structure)
- **Implementation:** Enhance `sponsor-ai` with structured output and function calling

#### 2.3 Venue Resolution ⭐ **SCORE: 80/100**
- **Gemini Tool:** Google Search + Structured Output (`gemini-2.5-flash`)
- **Current Status:** ✅ Implemented (`resolve-venue` edge function)
- **Edge Function:** `supabase/functions/resolve-venue/index.ts`
- **Use Case:** Venue name → AI finds address, capacity, contact info
- **Real-World Example:**
  - **Input:** "The Ritz-Carlton New York"
  - **Output:**
    ```json
    {
      "name": "The Ritz-Carlton New York",
      "address": "50 Central Park South, New York, NY 10019",
      "capacity": 500,
      "contact": "+1-212-308-9100",
      "verified": true
    }
    ```
- **Revenue Impact:** 32/40 (Reduces manual research, improves accuracy)
- **User Experience:** 26/30 (Instant venue info, saves time)
- **Implementation Complexity:** 10/20 (Google Search + structured output)
- **Technical Feasibility:** 9/10 (Well-supported)
- **Improvements:** Add URL Context for venue websites, enhance data extraction

#### 2.4 Schedule Optimizer ⭐ **SCORE: 78/100**
- **Gemini Tool:** Structured Output + Function Calling (`gemini-2.5-flash`)
- **Current Status:** ✅ Implemented (`schedule-optimizer` edge function)
- **Edge Function:** `supabase/functions/schedule-optimizer/index.ts`
- **Use Case:** Multiple shoot requests → AI optimizes schedule for efficiency
- **Real-World Example:**
  - **Input:** 5 shoots, different locations, different requirements
  - **Output:** Optimized schedule minimizing travel time, maximizing studio usage
- **Revenue Impact:** 30/40 (Reduces studio downtime, increases capacity)
- **User Experience:** 26/30 (Efficient scheduling, better resource use)
- **Implementation Complexity:** 14/20 (Requires optimization logic)
- **Technical Feasibility:** 8/10 (Complex but feasible)
- **Improvements:** Add real-time calendar integration, enhance optimization algorithm

---

### Category 3: Content Generation

#### 3.1 Image Generation (Nano Banana) ⭐ **SCORE: 75/100**
- **Gemini Tool:** Image Generation (`gemini-2.5-flash-image` or `gemini-3-pro-image-preview`)
- **Current Status:** ✅ Implemented (two edge functions)
- **Edge Functions:** 
  - `supabase/functions/generate-image-preview/index.ts`
  - `supabase/functions/generate-image-final/index.ts`
- **Use Case:** Event description → AI generates promotional images
- **Real-World Example:**
  - **Input:** "Fashion week runway show, luxury brands, elegant atmosphere"
  - **Output:** 4 high-quality promotional images in different styles
- **Revenue Impact:** 28/40 (Nice-to-have, reduces design costs)
- **User Experience:** 25/30 (Instant visuals, saves design time)
- **Implementation Complexity:** 6/20 (Already implemented)
- **Technical Feasibility:** 10/10 (Proven)
- **Improvements:**
  - Add Google Search grounding for trend-aware images
  - Enhance prompt engineering for better results
  - Add image editing capabilities

#### 3.2 Marketing Content Generator ⭐ **SCORE: 72/100**
- **Gemini Tool:** Text Generation + Structured Output (`gemini-2.5-flash`)
- **Current Status:** ❌ Not implemented
- **Use Case:** Event details → AI generates social media posts, emails, press releases
- **Real-World Example:**
  - **Input:** Event data
  - **Output:** Instagram post, email campaign, press release
- **Revenue Impact:** 25/40 (Saves time, not core revenue driver)
- **User Experience:** 25/30 (Instant content, saves writing time)
- **Implementation Complexity:** 10/20 (Text generation + templates)
- **Technical Feasibility:** 9/10 (Straightforward)
- **Implementation:** Create `generate-marketing-content` edge function

---

### Category 4: Advanced Features

#### 4.1 Function Calling for Booking ⭐ **SCORE: 86/100**
- **Gemini Tool:** Function Calling (`gemini-2.5-flash`)
- **Current Status:** ❌ Not implemented
- **Use Case:** Natural language booking: "Book a shoot for 10 looks next Tuesday"
- **Real-World Example:**
  - **User:** "Is Studio A available next Tuesday at 2pm?"
  - **AI:** Calls `checkAvailability(studio: "A", date: "2025-01-14", time: "14:00")`
  - **Response:** "Yes, Studio A is available. Would you like to book it?"
- **Revenue Impact:** 38/40 (Enables voice/chat booking, increases conversion)
- **User Experience:** 30/30 (Natural language, zero learning curve)
- **Implementation Complexity:** 16/20 (Requires function definitions + execution)
- **Technical Feasibility:** 8/10 (Well-supported, needs careful implementation)
- **Implementation:**
  ```typescript
  const bookingFunctions = [
    {
      name: 'check_availability',
      description: 'Check studio availability for a date and time',
      parameters: {
        type: Type.OBJECT,
        properties: {
          studio: { type: Type.STRING },
          date: { type: Type.STRING },
          time: { type: Type.STRING }
        }
      }
    },
    {
      name: 'calculate_price',
      description: 'Calculate shoot price based on requirements',
      parameters: { /* ... */ }
    }
  ];
  ```

#### 4.2 File Search (RAG) for Knowledge Base ⭐ **SCORE: 70/100**
- **Gemini Tool:** File Search (`gemini-2.5-flash`)
- **Current Status:** ❌ Not implemented
- **Use Case:** Store event guidelines, brand docs → AI answers questions from docs
- **Real-World Example:**
  - **User:** "What are the requirements for runway events?"
  - **AI:** Searches uploaded event guidelines PDF, returns specific requirements
- **Revenue Impact:** 20/40 (Support feature, reduces support costs)
- **User Experience:** 25/30 (Instant answers, 24/7 support)
- **Implementation Complexity:** 18/20 (Requires file upload, indexing, RAG setup)
- **Technical Feasibility:** 7/10 (Complex but possible)
- **Implementation:** Set up File Search store, upload documents, enable in chat

#### 4.3 Code Execution for Analytics ⭐ **SCORE: 65/100**
- **Gemini Tool:** Code Execution (`gemini-2.5-flash`)
- **Current Status:** ❌ Not implemented
- **Use Case:** "Analyze booking trends this month" → AI runs SQL queries, generates charts
- **Real-World Example:**
  - **User:** "Show me revenue by package type"
  - **AI:** Executes SQL, generates visualization
- **Revenue Impact:** 18/40 (Analytics feature, not core revenue)
- **User Experience:** 22/30 (Natural language analytics)
- **Implementation Complexity:** 20/20 (Requires secure code execution, sandboxing)
- **Technical Feasibility:** 5/10 (Security concerns, complex)
- **Implementation:** Low priority, consider for future

---

## 🎯 Implementation Roadmap

### Phase 1: Quick Wins (Week 1-2)
**Target:** High-impact, low-complexity features

1. **Enhance Brief Polisher** (2 days)
   - Add structured output for consistent format
   - Support multiple brief types
   - Score: 92/100

2. **Implement Brand URL Analyzer** (3 days)
   - Use URL Context tool
   - Add structured output
   - Score: 90/100

3. **Enhance Image Style Extraction** (2 days)
   - Add to existing image functions
   - Multimodal vision + structured output
   - Score: 87/100

**Total Effort:** 7 days  
**Revenue Impact:** High (3 features, all 85+ score)

### Phase 2: Core Features (Week 3-4)
**Target:** Essential booking functionality

4. **Implement Shoot Price Calculator** (4 days)
   - Structured output + pricing logic
   - Score: 88/100

5. **Enhance Sponsor Matching** (3 days)
   - Improve `sponsor-ai` with structured output
   - Score: 84/100

6. **Add Auto Tagging** (2 days)
   - Multimodal vision for asset tagging
   - Score: 82/100

**Total Effort:** 9 days  
**Revenue Impact:** High (Core booking features)

### Phase 3: Advanced Features (Week 5-6)
**Target:** Differentiating capabilities

7. **Implement Function Calling for Booking** (5 days)
   - Natural language booking interface
   - Score: 86/100

8. **Enhance Event Draft Generator** (2 days)
   - Add URL Context, Google Search
   - Score: 85/100

9. **Improve Venue Resolution** (1 day)
   - Enhance with URL Context
   - Score: 80/100

**Total Effort:** 8 days  
**Revenue Impact:** Medium-High (Advanced features)

### Phase 4: Nice-to-Have (Week 7-8)
**Target:** Support features

10. **Marketing Content Generator** (3 days)
    - Text generation for social posts
    - Score: 72/100

11. **File Search Knowledge Base** (5 days)
    - RAG for event guidelines
    - Score: 70/100

**Total Effort:** 8 days  
**Revenue Impact:** Low-Medium (Support features)

---

## 📈 Success Metrics

### Technical Metrics
- **API Response Time:** <2s for all Gemini calls
- **Success Rate:** >95% for structured outputs
- **Error Rate:** <2% for all AI features
- **Cost per Request:** <$0.01 average (Gemini 2.5 Flash)

### Business Metrics
- **Booking Conversion:** +25% with AI features
- **Time Saved:** 4+ hours per event/shoot
- **User Satisfaction:** >4.5/5 for AI features
- **Revenue Impact:** $10K+ MRR from AI-enabled bookings

---

## 🔧 Technical Implementation Notes

### Model Selection Guide

| Use Case | Recommended Model | Reason |
|----------|------------------|--------|
| Text generation, brief polishing | `gemini-2.5-flash` | Fast, cost-effective, sufficient quality |
| Structured outputs | `gemini-2.5-flash` | Reliable JSON generation |
| Multimodal (images) | `gemini-2.5-flash` | Good balance of speed and quality |
| Complex reasoning | `gemini-3-pro-preview` | When deep analysis needed |
| Image generation | `gemini-2.5-flash-image` | Fast preview generation |
| High-quality images | `gemini-3-pro-image-preview` | Final production images |

### Edge Function Pattern

**⚠️ Best Practice:** Use `Deno.serve` (not `serve` from deno.land/std). See `.cursor/rules/writing-supabase-edge-functions.mdc` for complete guidelines.

```typescript
// Standard pattern for Gemini edge functions
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai"
import { corsHeaders } from "../_shared/cors.ts"

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) throw new Error('Missing GEMINI_API_KEY')

    const { input } = await req.json()
    const ai = new GoogleGenAI({ apiKey })

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: input }] }],
      config: {
        // Add tools, structured output, etc. as needed
        // tools: [{ urlContext: {} }],
        // responseMimeType: 'application/json',
        // responseSchema: schema
      }
    })

    return new Response(JSON.stringify({ result: response.text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
})
```

**Note:** Current edge functions may still use `serve` from deno.land/std. When updating, migrate to `Deno.serve`.

---

## 🚀 Next Steps

1. **Review this plan** with team
2. **Prioritize Phase 1 features** (Quick Wins)
3. **Set up Gemini API keys** in Supabase environment
4. **Start with Brief Polisher enhancement** (highest score, already implemented)
5. **Implement Brand URL Analyzer** (high impact, new feature)

---

## 📚 Reference

- **Gemini Documentation:** `/docs/gemeni/` folder
- **Current Edge Functions:** `/supabase/functions/`
- **Service Plans:** `/docs/services/001-service-plan.md`
- **Shoot Booking Schema:** `/docs/services/03-shoot-schema.md`

---

**Last Updated:** 2025-01-27  
**Version:** 1.0  
**Status:** Ready for Implementation
