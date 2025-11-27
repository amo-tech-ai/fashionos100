
# Changelog

## [0.9.9] - 2025-03-03
### 🚀 Booking Wizard v3 (Complete)
- **Expanded Flow:** Implemented full 11-step booking process matching high-end studio workflows.
- **New Steps:** Added Product Size, Scene Selection, Shot Types, Sub-Categories, and Detailed Shot Builder.
- **Data Driven:** Created `wizardData.ts` to centralize configuration for categories, pricing, and assets.
- **Visual Upgrade:** Enhanced `StepScenes` and `StepStyle` with rich visual selectors and badge overlays.
- **Logic:** Updated pricing engine to account for product size fees and complex shot types.

## [0.9.8] - 2025-03-03
### 🚀 Data Connectivity
- **Studio Dashboard:** Now fetches real booking requests from the Supabase `shoots` table.
- **Client Bookings:** Updated `DashboardBookings` to display a real table of user's projects instead of hardcoded KPIs only.
- **Filtering:** Added logic to filter bookings by status (Requested, Production, Completed) in Studio view.

## [0.9.7] - 2025-03-03
### 🚀 Studio & Booking Polish
- **Dashboard:** Created `DashboardStudio` for admin management of bookings.
- **AI Assistant:** Integrated `AICopilotWidget` into Studio Dashboard for shoot planning support.
- **Checkout Flow:** Completed `StepCheckout` with success toast notifications and redirection logic.
- **Navigation:** Connected Dashboard "Add Booking" buttons to the public Booking Wizard.

## [0.9.6] - 2025-03-03
### 🚀 Booking Wizard v2
- **Architecture:** Refactored Booking Wizard from 3-step to 7-step fashion production workflow.
- **New Flow:** Category -> Style -> Shot List -> References -> Retouching -> Review -> Checkout.
- **State Management:** Updated `BookingContext` to track granular production details (retouching level, style type).
- **Pricing:** Implemented dynamic pricing engine based on style complexity and retouching tiers.
- **Visuals:** Added high-fidelity visual selectors for Ghost Mannequin vs On-Model styles.

## [0.9.5] - 2025-03-03
### 🚀 Sponsor System Upgrades
- **AI Lead Scoring:** Added "Score Lead" agent to analyze sponsor fit (High/Medium/Low) based on industry and budget.
- **Sponsor Types:** Added granular categorization (Luxury Brand, Tech Partner, etc.) to forms and filters.
- **Automation:** Implemented `automation-workflow` Edge Function triggered when deals are marked "Signed".
- **Analytics:** Added Visual Charts (Engagement Trend & ROI Breakdown) to `DashboardROI`.
- **UX Polish:** Added Loading Skeletons for smoother dashboard transitions.
