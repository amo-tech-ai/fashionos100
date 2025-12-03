
# 🪄 Task 08: Event Logistics & Timeline

**Phase:** 2 (System Build)
**Dependencies:** Task 04 (Dashboard Shell)
**Output:** Timeline & Venue Tools

---

## 1. Context
This is the core of the "Event Context" dashboard. Users need to visualize the production schedule and manage venue details.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a Frontend Specialist.
Action: Build the Event Logistics UI Components.

=========================================
1. TIMELINE COMPONENT (`src/components/events/EventTimeline.tsx`)
=========================================
- A vertical list of the 14 standard fashion show phases (e.g., "Concept", "Casting", "Production", "Showtime").
- **Visuals:**
  - A vertical line connecting nodes.
  - Each node has a Status Pill (Not Started, In Progress, Done).
  - Active phase should be highlighted.
- **Interaction:** Clicking a phase expands to show 2-3 sub-tasks (dummy data).

=========================================
2. VENUE MAP COMPONENT (`src/components/events/EventVenue.tsx`)
=========================================
- **Header:** Venue Name & Address inputs.
- **Map Area:** A placeholder `div` with `bg-gray-200` and a "Map Loading..." text (replaces real Google Maps for now).
- **AI Scout:** An input field "Find venue..." and a button "Search".
  - Mock behavior: Clicking search displays a list of 3 dummy venue cards below.

=========================================
3. RUN OF SHOW (`src/components/events/RunOfShow.tsx`)
=========================================
- A minute-by-minute schedule builder.
- **Table Rows:** Time, Duration, Activity (e.g., "20:00 - Models Line Up").
- **Add Row:** Button to append a new time slot.
- **Style:** Clean, dense table suitable for printing.

=========================================
4. INTEGRATION
=========================================
- Create `src/pages/dashboard/events/EventLogisticsPage.tsx`.
- Render these components in a grid layout (Timeline left, Venue right).

Output the code for the Timeline, Venue, and RunOfShow components.
```

---

## 3. Verification Checklist
- [ ] Timeline renders vertically with connectors.
- [ ] Run of Show allows adding new rows.
- [ ] Venue input fields are accessible.
- [ ] Responsive check: Stacks vertically on mobile.
