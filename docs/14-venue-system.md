
# 🗺️ **3. Floorplan Tab (Interactive)**

### Component Architecture
*   `FloorplanEditor` (Canvas Stage)
    *   `DraggableZone` (Runway, Seating Block, Backstage, DJ Booth)
    *   `GridOverlay` (Snapping & Measurement)
    *   `ZonePropertiesPanel` (Edit dimensions, capacity, label)
*   `FloorplanToolbar` (Tools: Select, Draw Wall, Add Zone, Ruler)
*   `AILayoutPanel` (Sidebar for Gemini Prompts)

### Interactive Logic (UI Behavior)
1.  **Drag-and-Drop:** Users can drag predefined "Zone" objects from the sidebar onto the canvas.
2.  **Smart Snapping:** Zones snap to the grid and align with adjacent zones (Runway snaps to center).
3.  **Collision Detection:** Visual warning (red outline) if "Seating" overlaps with "Runway".
4.  **Auto-Capacity:** Resizing a "Seating Block" automatically recalculates its capacity based on `density` rules (e.g., 0.5m² per person).

### Gemini AI Capabilities

| Task | Gemini Tool | Implementation Detail |
| :--- | :--- | :--- |
| **Generative Layout** | **Image Gen + Structured Output** | User prompts: "Industrial warehouse layout, 300 seats, U-shaped runway". Gemini creates a background ref image AND a JSON layout. |
| **CAD Conversion** | **Vision / Doc Understanding** | User uploads PDF/PNG floorplan. Gemini extracts walls/pillars and returns vector coordinates. |
| **Flow Optimization** | **Gemini Thinking** | "Analyze this layout for bottlenecks." AI simulates crowd flow and suggests widening aisles. |
| **Safety Check** | **Code Execution** | Validates layout against local fire codes (width of exits vs. capacity). |

### Wiring Map & Data Flow

1.  **Frontend State:** React Flow or Konva.js manages the `nodes` array.
2.  **AI Action:**
    *   User clicks "Magic Arrange".
    *   Frontend sends current `venue_shape` and `guest_count` to Edge Function `generate-layout`.
    *   Gemini returns `JSON { zones: [{ type: 'runway', x: 100, y: 100, w: 50, h: 200 }, ...] }`.
    *   Canvas updates instantly.
3.  **Persistence:**
    *   Auto-save triggers `sync_floorplan` Edge Function.
    *   Data stored in `venue_floorplans` table (column `layout_data` as JSONB).

---

# 🔌 **4. Tech Specs Tab**

*   **Tech Riders:** List of Audio, Lighting, Video requirements.
*   **Power Plot:** AI calculates total wattage based on equipment list.
