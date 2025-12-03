# The AI Event Architect

A conversation-based wizard that builds the entire database structure.

## Prompt Flow
1.  **Concept:** "Describe your event."
    *   *User:* "Cyberpunk rave fashion show in Brooklyn for 500 pax."
    *   *AI:* Generates description, mood tags, and suggested title.
2.  **Visuals:** "Generating moodboard..." (Imagen 3).
3.  **Venue:** "Finding venues..." (Google Maps Grounding).
    *   *Output:* Returns 3 real warehouses in Brooklyn with capacity > 500.
4.  **Sponsors:** "Suggesting partners..." (Search Grounding).
    *   *Output:* Suggests 'Red Bull', 'Balenciaga', 'Tech start-ups'.
5.  **Timeline:** "Building schedule..." (Thinking Mode).
    *   *Output:* Back-calculates from show date to create a 12-week Gantt chart.
6.  **Run-of-Show:** "Drafting minute-by-minute..."
7.  **Budget:** "Estimating costs..." (Code Execution).
    *   *Output:* High/Low budget ranges based on NYC rates.

## Technical Output (JSON)

```json
{
  "event": {
    "title": "Neon Dystopia SS26",
    "type": "Runway",
    "date": "2025-09-12",
    "location": "Brooklyn Navy Yard",
    "estimated_budget": 150000
  },
  "phases": [
    { "name": "Concept", "due": "2025-06-01" },
    { "name": "Casting", "due": "2025-07-15" }
  ],
  "sponsors": [
    { "name": "CyberTech Inc", "tier": "Gold", "fit_score": 95 }
  ]
}
```