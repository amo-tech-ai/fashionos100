
# 🪄 Task 15: Multimodal Visual Analysis

**Phase:** 5 (Advanced AI)
**Dependencies:** Task 06 (AI Infra), Task 05 (Shoot Wizard)
**Output:** Visual Analyzer Component & Edge Function

---

## 1. Context
We need to extract structured metadata from images to reduce manual data entry for designers.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are an AI Engineer specializing in Computer Vision.
Action: Implement the "Visual DNA Extractor".

=========================================
1. EDGE FUNCTION (`supabase/functions/analyze-visuals/index.ts`)
=========================================
- **Input:** `imageBase64` (or file URL).
- **Model:** `gemini-3-pro` (or 1.5 Pro Vision).
- **Prompt:** "Analyze this fashion image. Extract the following JSON: { 'colors': ['#hex'], 'mood': string, 'lighting': string, 'garment_type': string }."
- **Validation:** Ensure strict JSON response.

=========================================
2. FRONTEND COMPONENT (`src/components/ai/VisualAnalyzer.tsx`)
=========================================
- **UI:** A dropzone area: "Drop moodboard image here to extract style."
- **Preview:** Show the uploaded image with a loading overlay.
- **Result:** Display color swatches and tags extracted by the AI.
- **Action:** "Apply to Project" button (updates `BookingContext` or `BrandProfile`).

=========================================
3. INTEGRATION
=========================================
- Add this component to `StartProjectPage` (Shoot Wizard) Step 1.
- Allow users to skip manual style selection if they upload an image.

Output the Edge Function code and the React Component.
```

---

## 3. Verification Checklist
- [ ] Uploading an image triggers the Edge Function.
- [ ] Gemini returns valid JSON with Hex codes.
- [ ] UI displays the color palette extracted from the image.
