
# 🪄 Task 01: Project Initialization & Scaffold

**Phase:** 1 (Core Setup)
**Dependencies:** None
**Output:** Working React 19 App Shell

---

## 1. Context
We need to establish a clean, error-free React 19 environment. We explicitly use `aistudiocdn` import maps to ensure compatibility with the environment and avoid "Duplicate React" errors (#31).

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a Senior Frontend Architect.
Action: Initialize the FashionOS 2.0 codebase with React 19.

=========================================
SPECIFICATIONS
=========================================
1.  **Stack:** React 19.2.0 (via aistudiocdn), Vite, Tailwind CSS.
2.  **Structure:**
    - `index.html`: Entry point with specific Import Map.
    - `src/main.tsx`: React Root.
    - `src/App.tsx`: Route definitions (react-router-dom v7).
    - `src/layouts/`: `DashboardLayout`, `WebsiteLayout`.
    - `src/pages/`: `dashboard/*`, `site/*`.
    - `src/components/ui/`: Shared atoms.

=========================================
STEPS TO EXECUTE
=========================================

1.  **Clean `index.html`**:
    - Remove all existing scripts.
    - Add this EXACT import map:
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
    - Add Tailwind CDN.

2.  **Directory Structure**:
    - Create folders: `src/layouts`, `src/pages/dashboard`, `src/pages/site`, `src/components/ui`.

3.  **Router (`src/App.tsx`)**:
    - Use `BrowserRouter`, `Routes`, `Route`.
    - Define routes for:
      - `/` -> `site/HomePage`
      - `/dashboard` -> `dashboard/OverviewPage`
    - **Important:** Use `element={<Component />}` syntax.

4.  **Layouts**:
    - `WebsiteLayout`: Header + Outlet + Footer.
    - `DashboardLayout`: Sidebar + Topbar + Outlet.

5.  **Placeholders**:
    - Create simple "Hello World" components for `HomePage` and `OverviewPage`.

=========================================
CONSTRAINTS
=========================================
- Do NOT use `esm.sh` for React; use the provided `aistudiocdn` links.
- Return the full content for `index.html`, `src/main.tsx`, and `src/App.tsx`.
```

---

## 3. Verification Checklist
- [ ] App loads without "Minified React error #31".
- [ ] Navigation between `/` and `/dashboard` works.
- [ ] Tailwind styles are applying.
