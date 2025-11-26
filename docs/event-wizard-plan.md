
# Event Wizard – Progress & Verification Plan

## 1. High-Level Status Summary
- **UI/Logic Completion:** **95%** (Code is written and functional locally).
- **System Readiness:** **65%** (Infrastructure, Secrets, and Deployment Verification pending).
- **Verdict:** The wizard UI is "Gold Standard," but the system is **NOT production-ready** until specific backend infrastructure is validated.
- **Critical Risks:**
  - **Schema Mismatch:** Frontend assumes tables exist that may not be in production.
  - **Edge Function Deployment:** Code exists but deployment status is unverified.
  - **Missing Secrets:** API keys (`GEMINI_API_KEY`, `GOOGLE_MAPS_API_KEY`) must be set in Supabase Secrets.
  - **Image Generation Models:** Verification needed that `gemini-2.5-flash-image` (Nano Banana) and `gemini-3-pro-image-preview` are accessible via the API key.

---

## 2. Critical Red Flags (Must Fix Before Launch)

| Risk | Severity | Description | Fix Action |
| :--- | :---: | :--- | :--- |
| **Schema Verification** | 🟥 Critical | No proof that `events`, `ticket_tiers`, or `event_schedules` tables actually exist in the production DB. | Run SQL Verification Script (Sec 6). |
| **Function Health** | 🟥 Critical | `generate-event-draft` and others may fail cold starts or lack permissions. | Run Curl Health Checks (Sec 6). |
| **Missing Secrets** | 🟥 Critical | Gemini/Maps keys might be missing in production environment. | Run `supabase secrets list`. |
| **RLS Policies** | 🟥 Critical | `insert` policy for `events` table often defaults to false/none. | Verify RLS policies allow auth users to create. |
| **Image Model Access** | 🟥 Critical | Nano Banana (`gemini-2.5-flash-image`) requires specific API access. | Verify model availability in `generate-media` function. |

---

## 3. Progress Task Tracker

| Task Name | Status | % Complete | ✅ Proof in Code | ⚠️ Verification Needed |
| :--- | :--- | :--- | :--- | :--- |
| **Wizard UI Shell** | 🟢 Ready | 100% | `EventWizard.tsx` state machine | — |
| **AI Draft Generation** | 🟡 Risk | 90% | `supabase/functions/generate-event-draft` | Deployment & API Key |
| **Visuals & Media Step (UI Shell)** | 🟢 Ready | 100% | `EventWizard.tsx`, `VeoTrailerGenerator.tsx` | — |
| **Nano Banana Preview (Backend)** | 🟡 Risk | 80% | `supabase/functions/generate-media` | Validate `gemini-2.5-flash-image` calls |
| **Fusion Mode Refinement (Backend)** | 🟡 Risk | 80% | `supabase/functions/generate-media` | Validate `gemini-3-pro-image-preview` calls |
| **Venue Grounding** | 🟡 Risk | 90% | `supabase/functions/resolve-venue` | Google Maps API Quota |
| **AI Scheduler** | 🟡 Risk | 90% | `supabase/functions/schedule-optimizer` | Gemini 2.0 Flash Availability |
| **Database Writes** | 🟡 Risk | 80% | `handlePublish` logic | Schema & RLS existence |

---

## 4. Nano Banana Image Generation & Fusion Mode Step

This is the **"Visuals & Media"** step of the wizard, sitting between "Guide the AI" and "Venue". It allows organizers to generate professional-grade event assets instantly.

### A. The Workflow
1.  **Brand Discovery (URL Context + Search):**
    *   User inputs Brand URLs (Website/Instagram).
    *   AI scans URLs to extract **Brand DNA** (Palette, Lighting, Mood, Motifs).
    *   *Tools:* `urlContext`, `googleSearch`.
2.  **Fast Draft (Nano Banana):**
    *   User clicks **"Generate Preview"**.
    *   System calls `gemini-2.5-flash-image` (Nano Banana) with the extracted Brand DNA + Event Description.
    *   *Result:* 4 high-speed stylistic drafts appear in < 5 seconds.
3.  **Fusion Mode (Refinement):**
    *   User selects the best draft and clicks **"Refine to 4K"**.
    *   System calls `gemini-3-pro-image-preview` to upscale and hallucinate details (texture, lighting, faces) while keeping the composition.
    *   *Result:* 1 Production-ready asset.

### B. User-Facing Features
*   **Image Type Selector:** Hero Banner, Poster, Moodboard, Ticket Icon, Social Graphic.
*   **Style Toggle:** "Match My Brand" (uses URL Context) vs. "Creative Freedom" (pure prompt).
*   **Download/Save:** Save to `event-media` bucket for use in the event listing.

### C. Backend Implementation (`generate-media` Edge Function)
*   **Action:** `generate-image`
*   **Inputs:** `prompt`, `imageType`, `brandUrl`, `fusionMode` (boolean).
*   **Model Logic:**
    *   If `fusionMode == false`: Use `gemini-2.5-flash-image`.
    *   If `fusionMode == true`: Use `gemini-3-pro-image-preview` with `imageSize: '4K'`.

---

## 5. 💡 Required Improvements (Actionable Fixes)

### A. Migration Verification Script
Run this in Supabase SQL Editor to confirm the backend matches frontend expectations:

```sql
-- 1. Verify tables exist
select table_name from information_schema.tables 
where table_schema = 'public' 
and table_name in ('events','ticket_tiers','event_schedules', 'event_assets');

-- 2. Verify RLS Policies (Crucial for Insert)
select * from pg_policies 
where tablename in ('events','ticket_tiers');

-- 3. Check Foreign Keys (Cascades)
select constraint_name, table_name, constraint_type
from information_schema.table_constraints
where table_name = 'ticket_tiers';
```

### B. Edge Function Health Check
Test if functions are alive and responding:
```bash
# Test Draft Generation (Expect 200 OK or 400 Bad Request, NOT 404/500)
curl -i -X POST https://<project-ref>.supabase.co/functions/v1/generate-event-draft \
  -H "Authorization: Bearer <anon-key>" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "test"}'
```

### C. Fusion Mode UX Enhancements
To make the Image Generation step "Enterprise Grade":
1.  **Brand Scan Status:** Show "Scanning Website..." -> "Palette Extracted" visualization.
2.  **Energy Slider:** Allow users to tune image vibe (Calm <-> Energetic).
3.  **Refine CTA:** Make "Upgrade to 4K (Gemini Pro)" a prominent gold/gradient button.
4.  **Breadcrumbs:** Show "URL -> Nano Banana -> Gemini Pro" lineage for transparency.

---

## 6. Final Production-Ready Checklist
Copy this into your launch ticket. Do not launch until all checks pass.

### 🟦 Backend (Supabase)
- [ ] **Schema:** `events`, `ticket_tiers`, `event_schedules`, `event_assets` tables exist.
- [ ] **RLS:** `insert` allowed for `auth.uid()`. `select` allowed for owner.
- [ ] **Storage:** `event-media` bucket exists with public read access.
- [ ] **Migrations:** All SQL files from `docs/06-event-schema.md` applied.

### 🟧 Edge Functions
- [ ] `generate-event-draft` deployed.
- [ ] `resolve-venue` deployed.
- [ ] `schedule-optimizer` deployed.
- [ ] `generate-media` deployed (Handles Veo + Nano Banana + Gemini Pro Image).
- [ ] **Health Check:** All functions return 200 OK on test payloads.

### 🟩 Environment Secrets (Production)
- [ ] `GEMINI_API_KEY` set.
- [ ] `GOOGLE_MAPS_API_KEY` set (for grounding).
- [ ] `SUPABASE_URL` set.
- [ ] `SUPABASE_ANON_KEY` set.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set (for admin tasks).

### 🟨 Frontend Experience
- [ ] **Error Handling:** Wizard shows friendly error if AI fails.
- [ ] **Loading States:** "Generating..." overlays work on mobile.
- [ ] **Validation:** Form blocks "Next" if required fields missing.
- [ ] **Mobile:** Sticky footer does not overlap content on iOS Safari.

### 🟦 Performance & Quotas
- [ ] **Gemini:** Quota sufficient for launch traffic.
- [ ] **Image Gen:** Validated Nano Banana (`gemini-2.5-flash-image`) availability.
- [ ] **Maps:** Billing enabled for Places API.
- [ ] **Cold Starts:** Functions respond < 3s (keep warm if needed).

---

## 7. Conclusion
The Event Wizard is code-complete and architecturally sound. The remaining gap is DevOps verification. Once the SQL scripts and Curl tests pass, the feature is ready for release.

---

## 8. AI Prompt Engineering Assets

This section contains the exact Google AI Studio prompt blocks used to power the Image Intelligence Engine (See Section 4).

### Core Prompt (Brand Aligned)
*Use this for generating visuals that strictly adhere to a specific brand website or Instagram.*

```text
You are an AI image generator for the FashionOS Event Wizard.
Your job is to create brand-aligned event images using the user’s website or Instagram as style reference.

----------------------------
1. User Input (Variables)
----------------------------
User description: {{event_description}}
User location: {{city}}
User theme/mood: {{mood_tags}}
User URL(s): {{url_list}}
Image purpose: {{image_type}} // e.g., hero banner, moodboard, poster

----------------------------
2. Enable URL Context Tool
----------------------------
Use the URL Context tool to fetch and analyze all provided URLs.
tools: [{ urlContext: {} }]

----------------------------
3. Nano Banana Image Generation Instructions
----------------------------
Generate a brand-aligned image using Gemini Flash Image (“Nano Banana”):
- Match the style extracted from {{url_list}}.
- Include elements relevant to {{event_description}} and {{mood_tags}}.
- Maintain clean, fashion-focused aesthetic.
```

### Fusion Mode Orchestrator (Nano -> Pro)
*Use this logic in the `generate-media` Edge Function.*

```json
{
  "workflow": "Fusion Mode",
  "step_1": {
    "action": "Extract Style",
    "tools": ["urlContext", "googleSearch"],
    "input": "{{brand_urls}}"
  },
  "step_2": {
    "action": "Generate Draft",
    "model": "gemini-2.5-flash-image",
    "goal": "Fast composition preview"
  },
  "step_3": {
    "action": "Refine Asset",
    "model": "gemini-3-pro-image-preview",
    "goal": "4K resolution, realistic textures, cinematic lighting",
    "input_image": "{{draft_image_base64}}"
  }
}
```
