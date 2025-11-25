
# Changelog

All notable changes to the **FashionOS** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Planned
- **Pricing Page:** Dedicated pricing comparison page (`pages/public/PricingPage.tsx`).
- **Portfolio Page:** Rich gallery of past work (`pages/public/PortfolioPage.tsx`).
- **Auth:** Full integration with Supabase Auth / Clerk.
- **Backend:** Connecting UI forms (Booking, Contact) to Supabase tables.
- **Payments:** Stripe Connect integration.

---

## [0.6.1] - 2025-03-03
### ✨ Added
- **About Page:**
  - Created `pages/public/AboutPage.tsx` with mission statement, core values, and team grid.
  - Fixed missing module error in `App.tsx`.

## [0.6.0] - 2025-03-03
### ✨ Added
- **Directory Profile Details:**
  - Implemented `/directory/:id` route.
  - Created `ProfileDetailPage.tsx` with rich metadata (Bio, Skills, Portfolio, Rates).
  - Centralized mock data in `data/mockDirectory.ts`.
- **Web Design Service Page:**
  - Created `pages/public/WebDesignPage.tsx` with "Digital Flagships" theme.
  - Added Portfolio, Tech Stack, and Pricing sections.
- **Reusable Components:**
  - Created `components/forms/` library with standardized `Input`, `Select`, `Textarea`.
  - Implemented `LoadingSpinner` and `SkeletonLoader` for better UX.

### 🛡️ Security & Architecture
- **Edge Functions:**
  - Moved all AI logic (Gemini, Veo) to server-side Supabase Edge Functions to secure API keys.
  - Implemented `generate-media` for secure Veo video generation.
  - Implemented `resolve-venue` for Google Maps grounding.
  - Implemented `sponsor-ai` for autonomous sponsorship agents.

### ♻️ Refactored
- **Event Wizard:** Updated to use secure Edge Functions for draft generation.
- **Code Quality:** Fixed module resolution errors in Wizard components.
- **Forms:** Refactored various pages (`ContactPage`, `PhotographyPage`) to use the new shared form components.

---

## [0.5.0] - 2025-03-02
### ✨ Added
- **Contact Page:** Full-featured contact page at `/contact` featuring:
  - Responsive Hero section with "Get in Touch" branding.
  - Multi-field contact form (Name, Email, Subject, Message) with validation states.
  - Contact Information Cards (Email, Phone, Office) using Lucide icons.
  - Map placeholder section.
  - FAQ section for common queries.
- **Start Project Wizard:** `StartProjectPage.tsx` completed.

### ♻️ Refactored
- **Type Safety:** Updated `RequireAuth.tsx` to use standard function component pattern instead of `React.FC` for better children prop handling.
- **Component Hygiene:** Refactored `DirectoryPage.tsx` and `DashboardGallery.tsx` sub-components to remove implicit `React.FC` usage, improving TypeScript strictness and React 18 compatibility.

---

## [0.4.0] - 2025-03-02
### ✨ Added
- **Event Creation Wizard (Dashboard):**
  - Fully implemented `EventWizard.tsx` with modular sub-components (`Intro`, `Basics`, `Venue`, `Tickets`, `Review`).
  - Integrated **Gemini 2.5 Flash** for AI-powered event draft generation from natural language prompts.
  - Added state management for complex event data (ticket tiers, schedules).
- **Veo 3.1 Video Generator:**
  - Implemented a new "AI Trailer Studio" section on the **Events Page**.
  - Users can generate 8-second cinematic event trailers using Gemini's `veo-3.1-fast-generate-preview` model.
  - Generation is context-aware, using the event's title, description, and hero image as source material.
  - Includes a polling mechanism to handle video generation status and real-time preview.

### 🏗️ Architecture
- **Supabase Edge Functions:** Documented architecture for `create-event` and `analyze-brief` functions in `docs/07-edge-functions.md`.

---

## [0.3.0] - 2025-03-01
### 🏗️ Architecture Refactor
- **Modularization:** Split monolithic `App.tsx` and `Page` files into a scalable directory structure:
  - `/layouts`: Dedicated `PublicLayout` and `DashboardLayout`.
  - `/pages/public`: Individual landing pages for Home, Services, Events, etc.
  - `/pages/dashboard`: Distinct components for each dashboard view.
- **Routing:** Updated `App.tsx` to use nested routes and protected route wrappers (`RequireAuth`).

### ✨ Added
- **Dashboard Modules:**
  - **Financials:** Cashflow charts, transaction tables, and expense breakdowns.
  - **Gallery:** Media asset management with folder structures and filtering.
  - **Events:** Organizer view for ticket sales, attendance tracking, and analytics.
- **Public Pages:**
  - **Photography:** Dedicated service page with portfolio strip and booking form.
  - **Video Production:** "Film. Fashion. Finish." landing page with process steps.
  - **Ecommerce:** Specialized page for product photography packs and AI studio tools.
- **Documentation:**
  - **Schema:** Complete `03-shoot-schema.md` specification for Supabase (Users, Shoots, Events, Directory).

### 💄 Improved
- **UI Components:** Added `KPICard`, `TransactionRow`, and `MediaCard` reusable components.
- **Navigation:** Enhanced Dashboard sidebar with sticky positioning and scroll handling.

---

## [0.2.0] - 2025-02-28
### Added
- **Events Page:** Full-featured events listing view.
  - Interactive **Calendar Picker** component for date filtering.
  - Filter bar for Categories, City, and Status.
  - Event cards with hover effects, gradient tags, and price indicators.
  - "Host Event" CTA section.
- **Components:** 
  - New `Button` variant (`accent`) for primary call-to-actions.
  - `CalendarPicker` component with month navigation and range selection logic.
- **Icons:** Integrated `Calendar`, `Sparkles`, `Clock`, `Ticket` icons from Lucide.

### Improved
- **Navigation:** Added "Events" to the main navbar and mobile menu.
- **Responsiveness:** Enhanced mobile layout for filter bars (horizontal scroll) and calendar dropdown positioning.
- **UI:** Refined shadows and spacing on card components to match the "Premium" design aesthetic.

### Fixed
- Fixed `z-index` issues where dropdowns were clipping behind hero sections.
- Corrected padding on mobile view for the "Directory" grid.

---

## [0.1.0] - 2025-02-24
### Added
- **Project Scaffolding:** Initial React + Vite + Tailwind CSS setup.
- **Design System:**
  - Color palette (`fashion-cream`, `fashion-black`, `fashion-purple`).
  - Typography (`Inter` sans-serif, `Playfair Display` serif).
  - Reusable components: `Button`, `FadeIn` (scroll animations).
- **Home Page:**
  - Hero section with animated background gradients.
  - Feature sections for Video, Photography, and Web services.
  - Testimonials and "Results" metrics section.
- **Directory Page:**
  - Mosaic grid layout for category discovery.
  - Profile cards with star ratings and location data.
  - Interactive category tab filtering (Designers, Photographers, Models, etc.).
- **Navigation:** Responsive navbar with backdrop blur on scroll.
- **Footer:** Comprehensive site map and social links.

### Security
- **Dependencies:** Audited initial npm packages for vulnerabilities.
