
# Changelog

## [1.1.0] - 2025-03-03
### 🚀 Booking System Complete
- **Scheduling Step:** Implemented `StepSchedule` with Calendar integration and AI-powered time slot recommendations (Best Lighting, Fastest Turnaround).
- **State Updates:** Added `fulfillmentType`, `date`, and `time` to `BookingContext` to support scheduling.
- **Workflow:** Connected Retouching -> Schedule -> Review flow.
- **Estimator:** Added `AIEstimator` component to transparency show pricing logic.

## [1.0.0] - 2025-03-03
### 🚀 Major Release: System Integration
- **Auth:** `LoginPage` fully implemented and connected to Supabase Auth.
- **Event Wizard:** Secured all AI endpoints (Text, Image, Video, Maps) behind Edge Functions.
- **Booking System:** Verified 12-step wizard data flow and DB insertion.
- **Sponsors:** Validated CRM, Portal, and Deal Wizard logic.
- **Architecture:** App is now "Code Complete" for MVP, with only Settings page pending.

## [0.9.9] - 2025-03-03
### 🚀 Booking Wizard v3 (Complete)
- **Expanded Flow:** Implemented full 12-step booking process matching high-end studio workflows.
- **New Steps:** Added Models & Talent step, and ensured detailed shot builder is integrated.
- **Data Driven:** Centralized `wizardData.ts` used across all steps for consistency.
- **Navigation:** Fixed linear flow between Sub-Categories -> Models -> Shot List -> References -> Builder.
- **Visual Upgrade:** Enhanced `StepScenes` and `StepStyle` with rich visual selectors and badge overlays.
- **Logic:** Updated pricing engine to account for product size fees, complex shot types, and talent costs.

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
