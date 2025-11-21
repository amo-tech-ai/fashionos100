# 🏗️ Architecture Refactor Plan

## 1. Overview
This refactor separates the application into two distinct zones:
- **Public Zone**: Marketing pages accessible to everyone, wrapped in `PublicLayout`.
- **Private Zone**: Dashboard pages for authenticated users, wrapped in `DashboardLayout` and protected by `RequireAuth`.

## 2. Directory Structure
```
/src
  /components
    /auth
      RequireAuth.tsx       # Auth protection wrapper
    /dashboard
      Widgets.tsx           # Shared dashboard charts & AI widget
    Footer.tsx              # Extracted footer
    SectionTag.tsx          # Shared UI component
    ...
  /layouts
    PublicLayout.tsx        # Navigation + Outlet + Footer
    DashboardLayout.tsx     # Sidebar + Header + Outlet
  /pages
    /public
      HomePage.tsx
      ServicesPage.tsx
      DirectoryPage.tsx
      EventsPage.tsx
      SocialPage.tsx
    /dashboard
      DashboardOverview.tsx
      DashboardBookings.tsx
      DashboardCalendar.tsx
      DashboardPlaceholder.tsx
  App.tsx                   # Router configuration
```

## 3. Routing Logic
- `/` -> `PublicLayout` -> `HomePage`
- `/dashboard` -> `RequireAuth` -> `DashboardLayout` -> `DashboardOverview`
- `/dashboard/*` -> Protected sub-routes

## 4. Verification Checklist
- [ ] **Public Access**: 
    - Navigate to `/`, `/services`, `/directory` without login.
    - Verify Header/Footer appear correctly.
- [ ] **Auth Protection**:
    - Attempt to access `/dashboard` while logged out (mock `isAuthenticated = false` in `RequireAuth`).
    - Expect redirect to `/`.
- [ ] **Dashboard Access**:
    - Set `isAuthenticated = true`.
    - Access `/dashboard`. Verify Sidebar and Overview load.
    - Navigate to `/dashboard/calendar`. Verify specific view loads.
- [ ] **Visual Regression**:
    - Check styles are consistent after file splits.
    - Ensure imports (Button, FadeIn) resolve correctly.
