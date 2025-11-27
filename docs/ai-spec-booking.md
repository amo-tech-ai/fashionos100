# 🧠 FashionOS AI Booking Specification

**Powered by Google Gemini 3 & Supabase Edge Functions**

## 1. Core AI Features

### A. Shot Count Recommender
**Goal:** Help inexperienced clients estimate volume.
*   **Model:** `gemini-2.5-flash`
*   **Trigger:** `useEffect` on `category` or `style` change.
*   **Prompt:** "Given a fashion shoot for [Category] in [Style], recommend a minimum and optimal shot count per product/look."
*   **Fallback:** Default static values (E-comm = 4, Lookbook = 2).

### B. Brief Polisher
**Goal:** Standardize creative inputs for the production team.
*   **Model:** `gemini-3-pro-preview` (High reasoning)
*   **Trigger:** User clicks "Polish" button.
*   **System Instruction:** "You are a Fashion Creative Director. Rewrite the user's rough notes into a structured production brief. Use industry terminology."
*   **Schema:**
    ```json
    {
      "title": "string",
      "concept": "string",
      "lighting": "string",
      "styling": "string",
      "tags": ["string"]
    }
    ```

### C. Retouching Advisor
**Goal:** Upsell appropriate post-production levels.
*   **Model:** `gemini-2.5-flash`
*   **Trigger:** Step 5 entry.
*   **Logic:** If `category` == 'campaign' OR `style` == 'lifestyle', recommend 'High-End'. Explain why based on the visual complexity.

---

## 2. Security & Infrastructure

*   **API Keys:** Stored in Supabase Vault / Secrets (`GEMINI_API_KEY`). Never exposed to client.
*   **Rate Limiting:** 10 requests per IP per minute via Edge Function middleware.
*   **Caching:** Responses for "Recommendations" (stateless) are cached for 24h in Edge Network/CDN to save tokens. "Polishing" (stateful) is never cached.

---

## 3. Error Handling Strategy

1.  **Timeout:** If Gemini takes >10s, return the original user text with a "Could not polish" toast.
2.  **Hallucination:** Use `responseSchema` strict mode to prevent invalid JSON structure.
3.  **Offline:** Fallback to hardcoded defaults in `lib/pricing.ts`.
