
# 🗺️ **3. Floorplan Tab (Interactive)**

### Component

✔ `FloorplanEditor`
✔ `FloorplanToolbar`
✔ `DraggableZone`

### Gemini Tools

| Task                                     | Tool                                                    | Usage                                                                 |
| ---------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------- |
| **Generate Layout from Scratch**         | **Image Generation (Imagen/Nano Banana)**               | User prompts "Runway layout for warehouse", AI generates background.  |
| **Analyze Uploaded CAD/Image**           | **Vision / Document Understanding**                     | Identifies walls, exits, pillars from user upload to define bounds.   |
| **Suggest Zone Placement**               | **Structured Output (JSON)**                            | AI suggests x,y coordinates for "Runway" and "VIP" based on capacity. |
| **Optimize Flow**                        | **Gemini Thinking**                                     | Analyzes drag-and-drop arrangement for bottlenecks.                   |
| **Convert coordinates to DB**            | **Structured Output**                                   | Formats canvas state into `venue_zones` JSONB metadata.               |

### Calls

* `analyze_venue_floorplan(image_base64)` → Returns JSON of detected zones/walls.
* `generate_layout_suggestion(capacity, venue_type)` → Returns JSON coordinates.
* `sync_floorplan(zones)` → Edge Function (Saves x,y,w,h,rotation to Supabase).
* Writes to: `venue_zones` (metadata column stores layout props), `venue_floorplans`.

---

# 🔌 **4. Tech Specs Tab**
