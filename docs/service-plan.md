
# 📸 Service Booking System Plan (Ecommerce Photography)

## 📊 Progress Task Tracker

| Task Name | Short Description | Status | % Complete | ✅ Confirmed | ⚠️ Missing / Failing | 💡 Next Action |
| --------- | ----------------- | ------ | ---------- | ------------- | -------------------- | -------------- |
| **Route & Layout Setup** | Define routes and wrapper layout | 🟢 Completed | 100% | `BookingLayout.tsx` | — | — |
| **State Management** | `useBooking` (Context) | 🟢 Completed | 100% | `BookingContext.tsx` | — | — |
| **Pricing Engine** | Central calc function | 🟢 Completed | 100% | `pricing.ts` | — | — |
| **Data Layer** | Wizard configuration data | 🟢 Completed | 100% | `wizardData.ts` | — | — |
| **Page: Category** | Step 1: Select Category | 🟢 Completed | 100% | `StepCategory.tsx` | — | — |
| **Page: Style** | Step 2: Select Style | 🟢 Completed | 100% | `StepStyle.tsx` | — | — |
| **Page: Size** | Step 3: Product Size | 🟢 Completed | 100% | `StepSize.tsx` | — | — |
| **Page: Scenes** | Step 4: Select Scenes | 🟢 Completed | 100% | `StepScenes.tsx` | — | — |
| **Page: Shot Type** | Step 5: Packshot vs Creative | 🟢 Completed | 100% | `StepShotType.tsx` | — | — |
| **Page: Sub-Category** | Step 6: Refine Selection | 🟢 Completed | 100% | `StepSubCategory.tsx` | — | — |
| **Page: Models** | Step 7: Add Talent | 🟢 Completed | 100% | `StepModels.tsx` | — | — |
| **Page: Shot Count** | Step 8: Quantity Slider | 🟢 Completed | 100% | `StepShotList.tsx` | — | — |
| **Page: References** | Step 9: Moodboard Links | 🟢 Completed | 100% | `StepReferences.tsx` | — | — |
| **Page: Builder** | Step 10: Detailed Item List | 🟢 Completed | 100% | `StepShotListBuilder.tsx` | — | — |
| **Page: Retouching** | Step 11: Post-Production | 🟢 Completed | 100% | `StepRetouching.tsx` | — | — |
| **Page: Schedule** | Step 12: Date & Time Picker | 🟢 Completed | 100% | `StepSchedule.tsx` | — | — |
| **Page: Review** | Step 13: Summary & Quote | 🟢 Completed | 100% | `StepReview.tsx` | — | — |
| **Page: Checkout** | Payment UI & Logic | 🟢 Completed | 100% | `StepCheckout.tsx` connects to DB | — | — |
| **Admin View** | Internal dashboard | 🟢 Completed | 100% | `DashboardStudio.tsx` reads DB | — | — |
| **AI Estimator** | Pricing breakdown modal | 🟢 Completed | 100% | `AIEstimator.tsx` | — | — |

## 🏁 Success Criteria Verification

*   [x] **User Flow:** Can navigate from `/start-project` to `/success` without errors.
*   [x] **Data Integrity:** `BookingContext` persists state across 13 steps.
*   [x] **Pricing:** Dynamic calculation updates immediately upon changing options.
*   [x] **Database:** `shoots` table insertion logic is present in `StepCheckout`.
*   [x] **Visuals:** All steps use the High-Fashion Premium design system.
*   [x] **Scheduling:** Integrated Calendar/Time picker with AI recommendations.

## 🚀 Next Phase
*   **Email Notifications:** Trigger Supabase Edge Function on new booking to email client/admin.
*   **Stripe Webhooks:** Replace mock payment delay with real Stripe webhook verification.
