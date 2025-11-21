# Changelog

All notable changes to the **FashionOS** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- **Auth:** Skeleton for Clerk/Supabase authentication provider.
- **Backend:** Initial Supabase schema definitions for `users`, `profiles`, and `events` tables.
- **AI:** Gemini API integration hooks for "Virtual Stylist" chat feature.
- **Events:** "Create Event" wizard with drag-and-drop media upload.

### Planned
- Stripe integration for ticket purchasing.
- WhatsApp notification system for booking confirmations.

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
