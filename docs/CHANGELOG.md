
# Changelog

## [1.6.0] - 2025-03-09
### 🚀 Production Polish & Standardization
- **UI Standardization:** Implemented reusable `StatusBadge` and `EmptyState` components across all dashboards (Events, Financials, Sponsors) to ensure visual consistency.
- **Code Quality:** Refactored `ErrorBoundary` to a class component to resolve TypeScript strict mode issues.
- **Mobile Optimization:** Verified table responsiveness and safe-area handling for sticky navigation elements.
- **Verification:** Confirmed all AI Edge Functions are correctly wired to frontend services with proper error handling.

## [1.5.0] - 2025-03-04
### 🚀 Production Readiness & Integration
- **Studio Database Integration:** Connected `VisualQAPage` and `DeliveryPortal` to real Supabase tables (`shoot_assets`, `qa_reviews`).
- **Brand Intelligence:** Implemented `BrandProfilePage` with `generate-brand-profile` Edge Function.
- **Workflow Connection:** Integrated Brand DNA into the Booking Wizard's Creative Brief step for context-aware AI suggestions.
- **Settings Module:** Fully functional `DashboardSettings` connected to `profiles` and `companies` tables.
- **Schema:** Applied `brand_profile_schema.sql` and `studio_production.sql` migrations.

## [1.4.0] - 2025-03-04
### 🚀 Brand & Style Analysis
- **Brand Profile:** Added `BrandProfilePage` to analyze and store brand identity (Voice, Visuals, Recommendations).
- **AI Analysis:** New `generate-brand-profile` Edge Function analyzing brand websites and descriptions.
- **Type Definitions:** Added comprehensive types for Brand entities.

## [1.3.0] - 2025-03-03
### 🚀 Booking System Enhancements
- **AI Moodboard Generator:** Added a new tab in `StepReferences` allowing users to generate visual concepts using Gemini 2.5 Flash Image.
- **Shot List Builder:** Enhanced `StepShotListBuilder` to support reference image uploads per shot item.
- **Validation:** Added robust validation to `StepSchedule` ensuring date/time selection before proceeding.
- **Backend:** Deployed `generate-moodboard` Edge Function.

## [1.2.0] - 2025-03-03
### 🚀 MVP Feature Complete
- **Settings Module:** Added `DashboardSettings` with Profile, Notifications, Team management, and Billing portal mock.
- **Quality Assurance:** Implemented `VisualQAPage` with AI scoring visualization and retouching workflow.
- **Delivery Portal:** Added `DeliveryPortal` for clients to review, favorite, and download assets.
- **Booking Enhancements:** 
  - Added validation to `StepSchedule`.
  - Implemented detailed shot list builder with reference image uploads in `StepShotListBuilder`.
- **Security:** Verified all AI calls are routed through Supabase Edge Functions.

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
- **Architecture:** App is now "Code Complete" for MVP.
