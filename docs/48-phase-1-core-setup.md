
# 🏗️ Phase 1: Core Setup & React Foundation

**Status:** 🟢 Ready for Implementation
**Goal:** Establish a pristine, error-free frontend skeleton using the environment's native React 19 stack.

---

## Stage 1: The Skeleton

**Objective:** Set up the project structure, dependencies, and basic routing without business logic.

**Master Prompt:**

```text
You are a Senior Frontend Architect.
Action: Initialize the FashionOS 2.0 codebase with a strict **React 19** stack.

**CRITICAL FIX:** To prevent "Minified React error #31", we must use the environment's native CDN for React.
Do NOT use `esm.sh` for React/ReactDOM.
Do NOT use React 18.

====================================================
1) DEPENDENCY CONFIGURATION (Import Map)
====================================================
Configure `index.html` with this EXACT import map:

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

====================================================
2) DIRECTORY STRUCTURE
====================================================
Create a clean structure:

- `index.html`
- `src/`
  - `main.tsx` (Entry point)
  - `App.tsx` (Router definition)
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
3) ROUTING ARCHITECTURE
====================================================
Use `react-router-dom` v7 patterns in `src/App.tsx`:

import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { WebsiteLayout } from './layouts/WebsiteLayout';
// ... imports

export default function App() {
  return (
    <Routes>
      {/* Public Site */}
      <Route element={<WebsiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* ... other public routes */}
      </Route>

      {/* Dashboard (Protected) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="projects" element={<ProjectsPage />} />
        {/* ... other dashboard routes */}
      </Route>
    </Routes>
  );
}

**Constraints:**
- Use `BrowserRouter` in `main.tsx`.
- Ensure all components are functional.
- Verify Tailwind CSS is included via CDN in `index.html`.

Output the full content for: `index.html`, `src/main.tsx`, `src/App.tsx`, and the Layouts.
```
