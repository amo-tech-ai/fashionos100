
# Task: Strategic Planning Agent (Search & Reasoning)

**Status:** Planned  
**Priority:** P2  
**Owner:** AI Engineering  
**References:**  
- [Thinking](https://ai.google.dev/gemini-api/docs/thinking)  
- [Google Search Grounding](https://ai.google.dev/gemini-api/docs/google-search)  
- [Thought Signatures](https://ai.google.dev/gemini-api/docs/thought-signatures)

## 1. Context Summary
FashionOS aims to be an *Operating System*, not just a database. The "Strategic Planner" uses AI to actively research venues, trends, and competitors, and then uses advanced reasoning to build logical schedules and budgets.

## 2. Multistep Development Prompt

### Iteration 1: Venue Scout (Search Grounding)
1.  **Component:** `VenueSearchWidget` in Event Wizard.
2.  **Input:** "Rooftop venues in Brooklyn under $5k".
3.  **Config:** Enable `tools: [{ googleSearch: {} }]` in the API call.
4.  **Output:** A list of real venues with current data (Ratings, Address, Links).
5.  **Requirement:** Extract and display the source URLs from `groundingMetadata` as mandated by the guidelines.

### Iteration 2: The "Planner" (Thinking Models)
1.  **Feature:** "Generate Run of Show".
2.  **Input:** "Fashion show starts at 7pm, 20 models, hair/makeup needed."
3.  **Config:** Use `gemini-3-pro-preview` with `thinkingConfig: { thinkingBudget: 2048 }`.
4.  **Prompt:** "Create a detailed minute-by-minute back-of-house schedule. Account for transition times, makeup rotation, and rehearsals. Reason through potential bottlenecks."
5.  **UI:** Display the thought process (if available/desired) or just the high-quality output.

### Iteration 3: Fact Verification (Thought Signatures)
1.  **Context:** When the AI suggests specific vendors or claims about regulations.
2.  **Usage:** Use Thought Signatures (if applicable/available in the specific model response headers) or explicit prompting to "Verify this info" to ensure the AI isn't hallucinating venue capacities or prices.

## 3. Success Criteria
- [ ] "Find Venues" returns real, clickable Google Maps links.
- [ ] Complex schedule generation accounts for logical constraints (e.g., "You need 3 hours for 20 models if you only have 2 makeup artists").
- [ ] UI clearly cites sources for any web-searched info.

## 4. Technical Constraints
- **Model:** Must use `gemini-3-pro-preview` for Thinking and Search tools.
- **Grounding:** MUST render `groundingChunks` links in the UI.

## 5. Code Snippet (Concept)
```typescript
// Search Grounding
const response = await ai.models.generateContent({
  model: 'gemini-3-pro-preview',
  contents: "Find top-rated videographers in London for fashion week events.",
  config: {
    tools: [{ googleSearch: {} }]
  }
});
// Render response.candidates[0].groundingMetadata.groundingChunks
```
