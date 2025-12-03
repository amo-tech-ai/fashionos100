
# 🪄 Task 20: Trend Forecaster (Search Grounding)

**Phase:** 6 (Commercial & Real-Time)
**Dependencies:** Task 06 (AI Infra)
**Output:** Trend Analysis Dashboard

---

## 1. Context
Fashion moves fast. Designers need to know what's next. We use Gemini's connection to Google Search to generate grounded reports.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a Fashion Analyst.
Action: Build the "Trend Oracle" module.

=========================================
1. EDGE FUNCTION (`supabase/functions/trend-report/index.ts`)
=========================================
- **Input:** `season` (e.g., "SS26"), `category` (e.g., "Footwear").
- **Model:** `gemini-3-pro`.
- **Tools:** `googleSearch`.
- **Prompt:** "Research top fashion trends for [Season] [Category]. Look for color palettes, fabrics, and silhouettes. Cite sources. Summarize into JSON."
- **Output Schema:**
  ```json
  {
    "trends": [{ "name": "...", "description": "...", "sources": ["url"] }],
    "colors": ["#hex"],
    "summary": "..."
  }
  ```

=========================================
2. IMAGE GENERATION (Visuals)
=========================================
- Extend the function to call `imagen-3` using the extracted trend description to generate a "Mood Reference" image for the report.

=========================================
3. UI COMPONENT (`src/components/ai/TrendReport.tsx`)
=========================================
- Form: Select Season/Category.
- Display: A magazine-style layout showing the text report, color swatches, and the AI-generated visual.
- Save: Option to save report to `ai_insights` table.

Output the Edge Function and Component.
```

---

## 3. Verification Checklist
- [ ] Report includes real URLs (Grounding).
- [ ] Generated image matches the text description.
- [ ] Swatches are valid Hex codes.
