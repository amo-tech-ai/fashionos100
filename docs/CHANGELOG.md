
# Changelog

All notable changes to the **FashionOS** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Planned
- **Auth:** Login Page and real Supabase Auth integration.
- **Settings:** User profile and account settings dashboard.
- **Modal:** Reusable modal component.

---

## [0.8.0] - 2025-03-03
### ✨ Added
- **Sponsorship Management Module:**
  - **Sponsor Dashboard:** Implemented `DashboardSponsors.tsx` with Kanban "Pipeline" view and List view.
  - **KPIs:** Added StatCards for "Total Raised", "Active Partners", and "Avg Deal Value" with dynamic calculations.
  - **AI Agent:** Integrated "Suggest Activations" tool powered by Gemini 2.5 Flash via Edge Function.
- **Operations & Analytics:**
  - Added dedicated pages for `Contracts`, `Activations`, `Media`, `Leads`, `ROI`, and `SponsorPortal`.
- **UI Components:**
  - Added `Checkbox` and `Radio` form components to `components/forms/`.
  - Created `SponsorCard` and `SponsorList` components.

### ♻️ Refactored
- **Dashboard Architecture:** Split the monolithic `SponsorshipPages.tsx` into atomic page components for better maintainability.
- **Routing:** Updated `App.tsx` to point to the new granular dashboard route components.

---

## [0.7.1] - 2025-03-03
### ✨ UI/UX Polish
- **Mobile Navigation:** Implemented smooth slide-in menu with backdrop blur and scroll locking.
- **Loading States:** Replaced ad-hoc loading text with standardized `LoadingSpinner` and `SkeletonLoader` components.
- **Form Components:** Refactored `ContactPage`, `Wizard`, and Service pages to use shared `Input`, `Select`, and `Textarea` components.

## [0.7.0] - 2025-03-03
### ✨ Added
- **Web Design Page:** Dedicated service page with pricing tiers and portfolio grid.
- **Event Security:** Moved AI logic to Supabase Edge Functions.

### 🛠 Verified
- **Directory Profile:** Validated routing and data display.
- **Event Wizard:** Confirmed end-to-end flow with secure AI generation.

## [0.6.1] - 2025-03-03
### ✨ Added
- **About Page:** Mission statement, values, and team grid.

## [0.6.0] - 2025-03-03
### ✨ Added
- **Directory Profile Details:** Rich profile view for creatives.
- **Reusable Components:** `Input`, `Select`, `Textarea`, `LoadingSpinner`, `SkeletonLoader`.

### 🛡️ Security
- **Edge Functions:** Implemented `generate-media`, `resolve-venue`, and `sponsor-ai` for secure backend operations.

---

## [0.5.0] - 2025-03-02
### ✨ Added
- **Contact Page:** Full contact form with validation.
- **Start Project Wizard:** Multi-step booking wizard.

---

## [0.4.0] - 2025-03-02
### ✨ Added
- **Event Creation Wizard:** AI-powered event drafting.
- **Veo 3.1 Generator:** AI video trailer generation for events.

---

## [0.3.0] - 2025-03-01
### 🏗️ Architecture Refactor
- **Modularization:** Split App into `layouts`, `pages/public`, and `pages/dashboard`.
- **Routing:** Nested routing with `RequireAuth` protection.

---

## [0.2.0] - 2025-02-28
### Added
- **Events Page:** Event listing, calendar filtering, and search.

---

## [0.1.0] - 2025-02-24
### Added
- **Initial Release:** Home Page, Directory Page, Services Page.
