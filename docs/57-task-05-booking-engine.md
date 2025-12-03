
# 🪄 Task 05: Shoot Booking Engine (Wizard)

**Phase:** 2 (System Build)
**Dependencies:** Task 02 (UI Components), Task 04 (Dashboard Layout)
**Output:** Functional Multi-step Booking Form with Pricing Engine

---

## 1. Context
We need to implement the "Airbnb-style" booking flow for photoshoots at `/start-project`. This involves complex state management across 13 potential steps, real-time pricing calculation, and a responsive layout that handles the "Receipt" summary differently on mobile vs desktop.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a UX Engineer and React Expert.
Action: Build the "Shoot Booking Wizard" logic and UI.

=========================================
1. PRICING ENGINE (`src/lib/pricing.ts`)
=========================================
Create a pure function utility for calculating costs.
- Define constants:
  - `BASE_FEES`: { fashion: 0, beauty: 200, food: 500 }
  - `STYLE_PRICES`: { editorial: 85, catalog: 45, street: 65 }
  - `SIZE_FEES`: { standard: 0, large: 25 }
- Function `calculateTotal(state: BookingState)`:
  - Returns `{ subtotal, serviceFee, tax, total, breakdown }`.
  - Logic: Base + (ShotCount * StylePrice) + (ShotCount * SizeFee).

=========================================
2. STATE MANAGEMENT (`src/context/BookingContext.tsx`)
=========================================
Create a Context Provider to manage the wizard state.
- **State Object:**
  - `service`: 'photography' | 'video'
  - `category`: string
  - `style`: string
  - `shotCount`: number (default 10)
  - `productSize`: string
  - `brief`: string
  - `date`: Date | null
- **Exports:** `state`, `totals` (calculated via pricing.ts), `updateState`, `reset`.

=========================================
3. WIZARD LAYOUT (`src/layouts/BookingLayout.tsx`)
=========================================
Create a specialized layout wrapper (different from DashboardLayout).
- **Top Bar:** "Step X of Y" progress bar. "Save & Exit" button.
- **Desktop Grid:**
  - Left (65%): Main content `<Outlet />`.
  - Right (35%): Sticky Sidebar `<BookingSummary />` showing live totals.
- **Mobile:**
  - Main content takes full width.
  - **Sticky Bottom Bar:** Shows "Total: $XXX" and "Next" button. Clicking "Total" expands a bottom sheet summary.

=========================================
4. KEY STEP COMPONENTS (`src/pages/public/booking/`)
=========================================
Build these specific step pages (use the UI primitives from Task 02):

A. `StepCategory.tsx`
   - Grid of cards (E-Commerce, Beauty, Jewelry).
   - Hover effects: border color change, subtle scale.

B. `StepStyle.tsx`
   - Visual grid showing examples of "Ghost Mannequin", "On-Model", "Flat Lay".
   - Each card includes a "Starting at $X" badge.

C. `StepQuantity.tsx`
   - Large, styled Range Slider (1-100).
   - Dynamic text: "20 Looks = Professional Package".

D. `StepBrief.tsx`
   - Textarea for "Creative Direction".
   - **Placeholder:** "Describe your vision... e.g. 'Minimalist, high contrast, harsh shadows'."
   - **AI Button:** "✨ Polish with AI" (just console.log for now).

E. `StepReview.tsx`
   - Read-only summary of all choices.
   - "Confirm & Pay" button.

=========================================
5. ROUTING
=========================================
Update `src/App.tsx` to include the `/start-project` nest routes:
- `/start-project` (BookingLayout)
  - `index` -> Redirect to `category`
  - `category`, `style`, `quantity`, `brief`, `review`

Output the code for `pricing.ts`, `BookingContext.tsx`, `BookingLayout.tsx`, and `StepQuantity.tsx` (as a representative step).
```

---

## 3. Verification Checklist
- [ ] `estimatedPrice` updates immediately when slider changes.
- [ ] Mobile layout shows the sticky bottom bar with "Next" button.
- [ ] Desktop layout shows the sticky sidebar summary.
- [ ] State persists when navigating "Back" to previous steps.
