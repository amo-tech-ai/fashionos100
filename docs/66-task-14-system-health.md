
# 🪄 Task 14: System Health Dashboard

**Phase:** 4 (Infrastructure & QA)
**Dependencies:** Task 04 (Dashboard Layout)
**Output:** `SystemHealth.tsx`

---

## 1. Context
Admins need a place to verify that all external services (Database, Storage, AI, Realtime) are connected and functioning correctly.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a Full Stack Engineer.
Action: Build the System Health Dashboard.

=========================================
1. PAGE: `src/pages/admin/SystemHealth.tsx`
=========================================
- **Layout:** Use `DashboardLayout`.
- **UI:** A grid of "Status Cards" for each service.
- **Checks to Simulate:**
  - **Database:** "Querying `profiles` table..." (Success/Fail).
  - **Realtime:** "Connecting to WebSocket..." (Success/Fail).
  - **Storage:** "Listing buckets..." (Success/Fail).
  - **Edge Functions:** "Pinging `ai-copilot`..." (Success/Fail).
- **Implementation:**
  - Use `useEffect` on mount to trigger these checks asynchronously.
  - Use `setTimeout` to mock the network delay for visual feedback if actual calls aren't possible, but prefer real Supabase client calls if configured.
  - Display a Green Check (Online) or Red X (Offline) with latency ms.

=========================================
2. ROUTING & NAVIGATION
=========================================
- Update `src/App.tsx` to add `/dashboard/admin/health`.
- Update `src/components/dashboard/Sidebar.tsx` (or wherever the menu is defined) to add a "System Health" link (visible to Admins).

Output the code for `SystemHealth.tsx` and instructions for the router update.
```

---

## 3. Verification Checklist
- [ ] Page loads at `/dashboard/admin/health`.
- [ ] Checks run visually (spinners -> result).
- [ ] "System Status" summary updates based on individual checks.
