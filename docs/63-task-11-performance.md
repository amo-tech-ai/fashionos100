# 🪄 Task 11: Performance & Polish

**Phase:** 3 (Public Site)
**Dependencies:** Task 09, Task 10
**Output:** Optimized Router and Image Components

---

## 1. Context
To ensure a "Premium" feel, the app must load fast and handle images gracefully. We implement **Code Splitting** (Lazy Loading routes) and a **Lazy Image** component with a skeleton state to prevent layout shifts.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a Performance Engineer.
Action: Optimize the FashionOS Frontend.

=========================================
1. LAZY IMAGE COMPONENT (`src/components/ui/LazyImage.tsx`)
=========================================
Create a wrapper around the standard `<img>` tag.
- **Props:** `src`, `alt`, `className`.
- **State:** `isLoaded` (boolean).
- **Behavior:**
  - Render a gray `div` (skeleton) with `animate-pulse` while `!isLoaded`.
  - Render the `<img>` with `opacity-0` initially, then `opacity-100` on `onLoad`.
  - Use `loading="lazy"` attribute.
  - Ensure the skeleton has the same aspect ratio/dimensions as the container.

=========================================
2. ROUTE SPLITTING (`src/router.tsx`)
=========================================
Refactor the router to use `React.lazy` and `Suspense`.
- **Loading Screen:** Create a simple full-screen loading component (`<div className="h-screen flex items-center justify-center">...</div>`).
- **Lazy Imports:**
  ```tsx
  const DashboardHome = React.lazy(() => import('./pages/dashboard/DashboardHome'));
  const DirectoryPage = React.lazy(() => import('./pages/site/DirectoryPage'));
  // ... apply to all major pages
  ```
- **Suspense:** Wrap the main `Routes` or Layout outlets in `<Suspense fallback={<LoadingScreen />}>`.

=========================================
3. REFACTOR
=========================================
- Update `TalentCard.tsx` (from Task 10) to use `<LazyImage />`.
- Update `ServiceTemplate.tsx` (from Task 10) to use `<LazyImage />`.

Output the code for `LazyImage.tsx`, `LoadingScreen.tsx`, the updated `router.tsx`, and the refactored `TalentCard`.
```

---

## 3. Verification Checklist
- [ ] Navigate to a new route: "Loading..." screen appears briefly.
- [ ] Network Tab: JS bundles are loaded in chunks, not one massive file.
- [ ] Directory: Images fade in smoothly instead of popping in.
- [ ] No layout shifts (CLS) when images load.