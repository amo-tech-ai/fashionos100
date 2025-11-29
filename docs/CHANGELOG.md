
# Changelog

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
