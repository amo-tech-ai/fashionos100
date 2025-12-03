
# 🪄 Task 08: Event Logistics & Timeline

**Phase:** 2 (System Build)
**Dependencies:** Task 04 (Dashboard Shell)
**Output:** Timeline & Venue Tools

---

## 1. Context
This is the core of the "Event Context" dashboard (`/dashboard/events/:id`). Users need to visualize the production schedule (Timeline) and manage venue details.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a Frontend Specialist.
Action: Build the Event Logistics UI Components.

=========================================
1. COMPONENT: `EventTimeline.tsx`
=========================================
- A vertical list of the 14 standard fashion show phases.
- Phases include: "Concept", "Casting", "Venue", "Production", "Sponsors", "Showtime".
- **Visuals:**
  - A vertical line connecting nodes.
  - Each node has a Status Pill (Not Started, In Progress, Done) and a Due Date.
  - "Active" phase is highlighted with a border/shadow.
- **Interaction:** Clicking a phase expands to show a brief description or sub-task count.

=========================================
2. COMPONENT: `VenueLogistics.tsx`
=========================================
- **Header:** Venue Name & Address inputs (Pre-filled if data exists).
- **Map Area:** A placeholder `div` (bg-gray-100) with "Google Maps Integration" text.
- **Load-In Info:** Inputs for "Load-in Time", "Load-out Time", "Delivery Access".
- **Capacity:** Inputs for "Seated", "Standing", "Backstage".

=========================================
3. COMPONENT: `RunOfShow.tsx`
=========================================
- A minute-by-minute schedule builder for Show Day.
- **Table Layout:** Time | Duration | Activity | Audio/Light Cue | Notes.
- **Add Row:** Button to append a new time slot.
- **Visuals:** Compact, dense table suitable for printing (Call Sheet style).

=========================================
4. PAGE: `EventLogisticsPage.tsx`
=========================================
- Create the page at `/dashboard/events/:id/logistics`.
- Layout:
  - Top: `EventTimeline` (Summary view).
  - Bottom Left: `VenueLogistics`.
  - Bottom Right: `RunOfShow` (Preview).

Output the code for the Timeline and RunOfShow components.
```

---

## 3. Verification Checklist
- [ ] Timeline renders vertically with connectors.
- [ ] Run of Show table allows adding new rows.
- [ ] Layout is responsive (Timeline moves to top on mobile).
- [ ] Components look consistent with the "Atelier" design system.
