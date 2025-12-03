# AI Event Wizard Specification

A conversational interface that builds complex event plans.

## 1. Brand & Concept
*   **Input:** URL or Text ("Launch of SS25 Collection").
*   **AI Action:** Analyzes brand tone (URL Context) to suggest themes.

## 2. Event Type
*   **Options:** Fashion Show, Photoshoot, Product Launch, Corporate, Party.
*   **AI Action:** Sets template structures (e.g., Runway needs "Backstage", "FOH").

## 3. Venue Scouting
*   **Input:** "Industrial vibe, London, 300 pax."
*   **AI Action:** Uses **Google Maps Grounding** to find real venues matching criteria. Returns capacity, rating, and address.

## 4. Talent & Casting
*   **Input:** "Need 20 diverse models and a DJ."
*   **AI Action:** Filters Talent Directory, checks availability, estimates budget.

## 5. Service Selection
*   **Input:** "Need photos for Vogue and Reels for TikTok."
*   **AI Action:** Adds "Editorial Photography" and "Social Video" packages.

## 6. Budget & Summary
*   **AI Action:** Calculates total estimated cost using **Code Execution** for accuracy. Generates a JSON summary.

## 7. Output (JSON)
```json
{
  "event": {
    "title": "SS25 Launch",
    "type": "Runway",
    "venue": { "name": "Printworks", "place_id": "..." },
    "services": ["photo_editorial", "video_social"],
    "budget_estimate": 45000,
    "timeline": [...]
  }
}
```
