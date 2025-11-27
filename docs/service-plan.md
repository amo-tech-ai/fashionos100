
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
| **Page: Shot List** | Step 7: Quantity Slider | 🟢 Completed | 100% | `StepShotList.tsx` | — | — |
| **Page: References** | Step 8: Moodboard Links | 🟢 Completed | 100% | `StepReferences.tsx` | — | — |
| **Page: Builder** | Step 9: Detailed Item List | 🟢 Completed | 100% | `StepShotListBuilder.tsx` | — | — |
| **Page: Retouching** | Step 10: Post-Production | 🟢 Completed | 100% | `StepRetouching.tsx` | — | — |
| **Page: Review** | Step 11: Summary & Quote | 🟢 Completed | 100% | `StepReview.tsx` | — | — |
| **Page: Checkout** | Payment UI & Logic | 🟢 Completed | 100% | `StepCheckout.tsx` | — | — |
| **Admin View** | Internal dashboard | 🟢 Completed | 100% | `DashboardStudio.tsx` | — | — |

---

# 🏗️ 1. Route Structure (v3 - 11 Steps)

The flow has been expanded to capture high-fidelity production details:

**Routes:**
*   `/start-project/category`
*   `/start-project/style`
*   `/start-project/size`
*   `/start-project/scenes`
*   `/start-project/shot-type`
*   `/start-project/sub-category`
*   `/start-project/shot-list`
*   `/start-project/references`
*   `/start-project/shot-builder`
*   `/start-project/retouching`
*   `/start-project/review`
*   `/start-project/checkout`

---

# 🎨 2. Component Tree

*   **BookingProvider** (Context)
    *   **BookingLayout**
        *   **Header** (Back button, Progress Bar)
        *   **Sidebar** (Sticky Estimate)
        *   **Outlet** (Step Content)
