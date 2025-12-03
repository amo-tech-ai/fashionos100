
# 🪄 Task 16: Reasoning Scheduler (Thinking Mode)

**Phase:** 5 (Advanced AI)
**Dependencies:** Task 08 (Event Logistics)
**Output:** Conflict Detection System

---

## 1. Context
Fashion shows have complex dependencies. We need Gemini's "Thinking" capabilities to detect logical conflicts in a schedule (e.g., Model A cannot be in two places).

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a Logic Engineer.
Action: Implement the "Smart Schedule Optimizer".

=========================================
1. EDGE FUNCTION (`supabase/functions/optimize-schedule/index.ts`)
=========================================
- **Input:** JSON object containing:
  - `schedule_items`: [{ time, duration, activity, location }]
  - `constraints`: [{ person, cannot_overlap: true }]
- **Model:** `gemini-2.0-flash-thinking-exp` (or model supporting reasoning).
- **System Prompt:** "You are a Logistics Manager. Analyze the schedule for overlaps or impossible transitions (e.g. 0 minutes travel time between locations). Return a list of 'conflicts' and a 'suggested_schedule'."

=========================================
2. FRONTEND UI (`src/components/events/ScheduleOptimizer.tsx`)
=========================================
- **Props:** `currentSchedule`.
- **UI:**
  - "Analyze Schedule" button.
  - **Conflict Alert:** Red banner showing issues found (e.g., "Sarah J is double booked at 14:00").
  - **Diff View:** Show "Current" vs "Suggested" schedule.
  - "Apply Fix" button.

=========================================
3. INTEGRATION
=========================================
- Add this to `EventRunOfShow.tsx`.

Output the Edge Function and the React Component.
```

---

## 3. Verification Checklist
- [ ] Sending a conflicting schedule returns a specific error message from AI.
- [ ] The "Thinking" process (if exposed) shows reasoning steps.
- [ ] Clicking "Apply Fix" updates the local state of the schedule.
