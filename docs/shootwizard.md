
# 📸 Shoot Wizard Redesign Plan (FashionOS)

**Status:** 🟢 Master Plan  
**Objective:** Redesign the 13-step linear wizard into a 2-stage "Smart Wizard + Dashboard" flow.

---

## 1. Goals

*   **Reduce Time-to-Value:** Get users to a "Draft Project" state in < 45 seconds.
*   **Leverage Brand Intelligence:** Use URL Context to eliminate manual data entry for brand aesthetic.
*   **Enable Non-Linear Planning:** Allow users to work on "Casting" and "Shot List" in parallel via a dashboard.
*   **Increase Conversion:** Reduce drop-off by deferring complex decisions (like Retouching nuances) until after the project structure is set.

## 2. Current Problems (The 13-Step Friction)

1.  **Linear Lock-in:** Users cannot skip ahead to see pricing without filling out previous steps.
2.  **Redundant Input:** Users manually type brand descriptions that could be scraped from their website.
3.  **Decision Fatigue:** Asking for "Retouching Level" (Step 11) before "Shot Count" (Step 8) creates cognitive dissonance.
4.  **Mobile Difficulty:** Long multi-step forms are tedious on mobile devices.

---

## 3. Final 2-Stage Flow

### Stage 1 — Smart Wizard (Entry)
*Goal: Seed the project context and create a Draft record.*

1.  **Step 1: Brand DNA (The Hook)**
    *   **Input:** Website URL or Instagram Link.
    *   **AI Action:** `generate-brand-profile` (URL Context). Extracts: Logo, Colors, Tone, Industry.
    *   **Fallback:** Manual "Brand Name" input if no URL.
2.  **Step 2: Category & Scope**
    *   **Input:** Service (Photo/Video) + Category (E-comm, Editorial).
    *   **AI Action:** Auto-selects category based on Step 1 analysis (e.g., if URL detects "Skincare", auto-select "Beauty").
3.  **Step 3: Aesthetic / Vibe**
    *   **Input:** Visual Style selection (Grid of images).
    *   **AI Action:** Re-orders styles to match Brand DNA.
4.  **Step 4: Volume Estimate**
    *   **Input:** Slider (1-100 looks).
    *   **Action:** "Create Project" button (Auth Gate -> DB Insert -> Redirect).

### Stage 2 — Project Dashboard (Configuration)
*Goal: Advanced configuration in a modular workspace.*

The user lands on `/dashboard/shoots/[id]`. The view is a **Kanban-style board** or **Grid of Cards**:

*   **Card 1: Shot List (AI Powered)**
    *   Auto-populated with standard shots for the category (e.g., "Front, Back, Detail" for E-comm).
    *   "Magic Suggest" button to add creative shots.
*   **Card 2: Talent Casting**
    *   Shows recommended models based on Brand Vibe.
*   **Card 3: Logistics**
    *   Date/Time picker + Shipping address.
*   **Card 4: Creative Brief**
    *   Pre-filled with Brand DNA. User refines it.
*   **Sidebar: Live Quote**
    *   Updates instantly as cards are modified.

---

## 4. AI & Data Strategy

### URL Context Extraction
*   **Trigger:** Step 1 of Wizard.
*   **Model:** `gemini-2.5-flash` (Speed is priority).
*   **Schema:**
    ```json
    {
      "brand_name": "String",
      "industry": "Enum",
      "visual_style": "String",
      "primary_color": "Hex"
    }
    ```

### Google Search Grounding
*   **Trigger:** Background validation.
*   **Usage:** Verify brand existence and check for recent PR/Campaigns to inform the "Vibe" selection.

### Gemini 3 Thinking (Reasoning)
*   **Trigger:** "Suggest Shots" button in Dashboard.
*   **Logic:** "Given [Brand is Sustainable] and [Product is Swimwear], suggest shots."
*   **Output:** "1. Flatlay on sand texture. 2. Underwater detail shot. 3. Model walking away on beach."

---

## 5. Implementation Phases

### Phase 1 — Wizard MVP
*   [x] Build `WizardLayout` (Progress bar, fluid container).
*   [x] Implement `BrandUrlInput` with Gemini hook.
*   [x] Create `DraftCreation` logic (Insert to Supabase `shoots` table).

### Phase 2 — Dashboard Foundation
*   [ ] Create `/dashboard/shoots/[id]` page.
*   [ ] Implement `ShotListModule` (Editable table).
*   [ ] Implement `PricingSidebar` (Real-time calc).

### Phase 3 — AI Enhancements
*   [x] Wire up "Auto-Fill Brief" using Brand Profile data.
*   [x] Implement "Suggest Shots" using Gemini Thinking.

---

## 6. Task Checklist

- [ ] Refactor `StartProjectPage` to use new Wizard flow.
- [ ] Create `useBrandAnalysis` hook.
- [ ] Update `shoots` table to support `status: 'draft'`.
- [ ] Build `ProjectDashboard` component.

---

## 7. Cursor Implementation Plan

### File Structure
*   `src/features/booking/wizard/*` (New wizard components)
*   `src/features/booking/dashboard/*` (New dashboard modules)
*   `supabase/functions/analyze-brand/*` (New Edge Function)

### Required Components
1.  **`BrandAnalyzer`**: Input field + Loading State + Result Preview.
2.  **`ShotListEditor`**: Data grid with "Add Row" and "AI Suggest" actions.
3.  **`DashboardLayout`**: Specific layout for the project view.

### AI Calls
*   **`polish-brief`**: Existing function, reuse.
*   **`recommend-shots`**: New action in `booking-ai` function.

### State Machine
*   Move from `useBookingContext` (Global) to `useProject` (Scoped to ID) once in Dashboard.
*   Wizard uses local state; Dashboard uses React Query + Supabase.
