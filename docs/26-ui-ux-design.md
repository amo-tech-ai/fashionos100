# UI/UX Design

## Visual Language
*   **Aesthetic:** "Vogue meets Linear." High contrast, serif headers (*Playfair Display*), functional sans-serif body (*Inter*).
*   **Palette:** Stark Black/White base, with role-based accent colors (Purple=AI, Green=Money, Blue=Logistics).
*   **Layout:**
    *   **Desktop:** 3-pane layout (Nav | Main Content | AI Context Sidebar).
    *   **Mobile:** Stacked cards with bottom navigation.

## Key Components
*   **AI Insight Cards:** Floating glass-morphism cards that appear when the AI detects a risk.
*   **Runway Heatmap:** A visual overlay on the floorplan showing "VIP Value" of seats.
*   **Context Sidebar:** A right-hand panel that changes based on what you are looking at (e.g., showing Model details when clicking a name).

## Interactions
*   **"Ask AI" FAB:** A floating action button always present to trigger the Copilot.
*   **Drag-and-Drop:** For scheduling, seating, and Kanban boards.
*   **Optimistic UI:** Immediate updates when moving cards, background syncing with Supabase.