# 🪄 Task 04: Context-Aware Dashboard

**Phase:** 2 (System Build)
**Dependencies:** Task 01, Task 02
**Output:** `DashboardLayout` with Context Switching

---

## 1. Context
The dashboard must switch between **Global Context** (All projects) and **Event Context** (Managing one specific show). The sidebar menu changes based on the URL.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a React Architect.
Action: Build the Context-Aware Dashboard Layout.

=========================================
1. MENU CONFIG
=========================================
Create a configuration object `MENU_ITEMS`:
- **Global**: Overview, Projects, Calendar, Settings.
- **Event**: Back to Global, Timeline, Run of Show, Casting, Logistics.

=========================================
2. SIDEBAR COMPONENT (`src/components/dashboard/Sidebar.tsx`)
=========================================
- Use `useLocation` or `useParams` from `react-router-dom`.
- Logic:
  - If URL contains `/events/:id` (and id is not 'new'), show **Event Menu**.
  - Else, show **Global Menu**.
- Visuals: Fixed left sidebar, 64px/250px width, using `bg-white` and `border-r`.

=========================================
3. LAYOUT (`src/layouts/DashboardLayout.tsx`)
=========================================
- Render `Sidebar`.
- Render `TopBar` (Breadcrumbs, User Avatar).
- Render `<Outlet />` in the main content area (`flex-1 bg-fashion-cream p-8`).

=========================================
4. MOCK PAGES
=========================================
- Create `EventDashboard.tsx` (The "Command Center").
- Create `GlobalDashboard.tsx`.
- Update `router.tsx` to wire these up.

Output the code for the Sidebar, Layout, and Router updates.
```

---

## 3. Verification Checklist
- [ ] Visiting `/dashboard` shows Global Menu.
- [ ] Visiting `/dashboard/events/123` shows Event Menu.
- [ ] "Back to Global" button works.
- [ ] Layout is responsive (Sidebar collapses on mobile).
