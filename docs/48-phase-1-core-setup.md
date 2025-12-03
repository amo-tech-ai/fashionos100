
# 🏗️ Phase 1: Core Setup & React Foundation

**Status:** 🟢 Ready for Implementation
**Goal:** Establish a pristine, error-free frontend skeleton using the environment's native React 19 stack.

---

## Stage 1: The Skeleton

**Objective:** Set up the project structure, dependencies, and basic routing without business logic.

**Master Prompt:**

```text
You are a senior full-stack React architect.
Your job: set up a **fresh, clean MVP** for FashionOS 2.0.

**CRITICAL:** You must fix the "Minified React error #31" by ensuring we use a **SINGLE** React version.
The environment is pre-configured for **React 19**. Do NOT downgrade to React 18. Do NOT use esm.sh.

We are ONLY doing:
- Core setup
- Directory structure
- Basic routing
- Simple placeholder pages

❌ NO AI, NO Supabase, NO data modeling yet.

====================================================
1) CHOOSE A SINGLE STACK & REACT SOURCE
====================================================
Use the **Exact Import Map** below. Do not deviate. This matches the environment defaults to prevent duplicate React instances.

```html
<script type="importmap">
{
  "imports": {
    "react": "https://aistudiocdn.com/react@^19.2.0",
    "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/",
    "react-router-dom": "https://aistudiocdn.com/react-router-dom@^7.1.5",
    "react/": "https://aistudiocdn.com/react@^19.2.0/",
    "clsx": "https://aistudiocdn.com/clsx@^2.1.1",
    "tailwind-merge": "https://aistudiocdn.com/tailwind-merge@^3.4.0",
    "lucide-react": "https://aistudiocdn.com/lucide-react@^0.555.0"
  }
}
</script>
```

- Use **React 19**.
- Use **React Router v7** (via `react-router-dom`).

====================================================
2) DIRECTORY STRUCTURE FOR MVP
====================================================
Create a **simple, clean directory structure**:

- `index.html`
- `src/`
  - `main.tsx`
  - `App.tsx` (Router definitions)
  - `layouts/`
    - `DashboardLayout.tsx`
    - `WebsiteLayout.tsx`
  - `pages/`
    - `dashboard/`
      - `DashboardHome.tsx`
      - `ProjectsPage.tsx`
      - `ServicesPage.tsx`
    - `site/`
      - `HomePage.tsx`
      - `AboutPage.tsx`
      - `ServicesPage.tsx`
      - `EventsPage.tsx`
      - `DirectoryPage.tsx`
  - `components/`
    - `ui/PlaceholderPage.tsx`

====================================================
3) INDEX.HTML – CLEAN, SAFE BOOTSTRAP
====================================================
Generate a full `index.html` that:
- Includes Tailwind via CDN.
- Uses the **Import Map** defined above.
- Mounts the app in `<div id="root"></div>`.

====================================================
4) MAIN ENTRY & ROUTER (React 19 + Router v7)
====================================================
Create:

### `src/main.tsx`
- Import `createRoot` from `react-dom/client`.
- Import `App`.
- Mount `App` into the root element.

### `src/App.tsx`
- Use `BrowserRouter`, `Routes`, and `Route` from `react-router-dom`.
- **CRITICAL:** When defining routes, pass the component as a JSX element, NOT a reference.
  - ✅ Correct: `element={<DashboardHome />}`
  - ❌ Wrong: `element={DashboardHome}` (This causes Error #31)

Define basic routes:
- **Website (Public):**
  - Layout: `WebsiteLayout`
  - `/` → `HomePage`
  - `/about` → `AboutPage`
  - `/services` → `ServicesPage`
  - `/events` → `EventsPage`
  - `/directory` → `DirectoryPage`

- **Dashboard (Private):**
  - Layout: `DashboardLayout`
  - `/dashboard` → `DashboardHome`
  - `/dashboard/projects` → `ProjectsPage`
  - `/dashboard/services` → `ServicesPage` (Dashboard version)

====================================================
5) LAYOUTS + PLACEHOLDER PAGES
====================================================
Implement:

### `layouts/DashboardLayout.tsx`
- Simple sidebar (fixed width) + top bar layout.
- Use `<Outlet />` from `react-router-dom` for content.

### `layouts/WebsiteLayout.tsx`
- Simple header navigation + footer.
- Use `<Outlet />` for content.

### `components/ui/PlaceholderPage.tsx`
- Props: `title: string`, `description?: string`.
- Renders a clean center-aligned placeholder with a title and description.

### Page Components
For every page listed in the directory structure:
- Export a component that renders `<PlaceholderPage title="..." />`.

====================================================
6) OUTPUT FORMAT
====================================================
Return your answer in this order:

1. Final `index.html`.
2. Directory tree.
3. `src/main.tsx`.
4. `src/App.tsx`.
5. Basic implementations for layouts and placeholders.

Ensure all code is compatible with **React 19**.
```
