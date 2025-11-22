# Changelog

All notable changes to the **FashionOS** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Planned
- **Auth:** Full integration with Supabase Auth / Clerk.
- **Backend:** Connecting UI forms (Booking, Contact) to Supabase tables.
- **Payments:** Stripe Connect integration for split payments between platform and creatives.
- **Messaging:** Real-time chat for `Dashboard/Inbox`.

---

## [0.4.0] - 2025-03-02
### ✨ Added
- **Veo 3.1 Video Generator:**
  - Implemented a new "AI Trailer Studio" section on the **Events Page**.
  - Users can generate 8-second cinematic event trailers using Gemini's `veo-3.1-fast-generate-preview` model.
  - Generation is context-aware, using the event's title, description, and hero image as source material.
  - Includes a polling mechanism to handle video generation status and real-time preview.
- **Event Creation Wizard (Dashboard):**
  - Added an AI-powered modal in `DashboardEvents` to generate draft event details from natural language or URL inputs.
  - Uses Gemini 2.5 Flash to structure unstructured text into JSON (Title, Schedule, Pricing).

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