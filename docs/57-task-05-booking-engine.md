
# 🪄 Task 05: Shoot Booking Engine (Wizard)

**Phase:** 2 (System Build)
**Dependencies:** Task 02 (UI Components), Task 04 (Dashboard Layout)
**Output:** Functional Multi-step Booking Form

---

## 1. Context
We need to implement the "Airbnb-style" booking flow for photoshoots at `/start-project`. This involves complex state management across multiple steps, real-time pricing calculation, and a responsive layout that handles the "Receipt" summary differently on mobile vs desktop.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a UX Engineer.
Action: Build the "Shoot Booking Wizard" logic and UI.

=========================================
1. STATE MANAGEMENT (`src/context/BookingContext.tsx`)
=========================================
Create a Context Provider to manage the wizard state.
- **State Object:**
  - `serviceType`: 'photography' | 'video'
  - `category`: string (e.g., 'ecomm', 'editorial')
  - `shotCount`: number (default 10)
  - `date`: Date | null
  - `creativeBrief`: string
- **Derived State (Pricing):**
  - Create a `calculateTotal(state)` function.
  - Logic: `Base Fee ($500) + (Shot Count * $50)`.
- **Export:** `useBooking` hook.

=========================================
2. WIZARD LAYOUT (`src/layouts/WizardLayout.tsx`)
=========================================
Create a specialized layout for the booking flow.
- **Desktop:** Split screen.
  - Left (60%): The Form Step (children).
  - Right (40%): Sticky "Receipt" Summary showing current selections and `estimatedPrice`.
- **Mobile:** Single column.
  - Sticky Bottom Bar: Shows "Total: $XXX" and "Next" button.
  - Summary is hidden behind a "View Details" toggle in the bottom bar.

=========================================
3. STEP COMPONENTS (`src/features/booking/`)
=========================================
Create the following step components using the Design System:

A. `StepCategory.tsx`
   - Grid of 3 cards: "E-Commerce", "Editorial", "Lookbook".
   - Each card has an icon and description.
   - Selecting one updates context and highlights the card.

B. `StepQuantity.tsx`
   - A styled range slider (1-100 looks).
   - Display the current count clearly.

C. `StepBrief.tsx`
   - A large `Textarea` for the creative brief.
   - Add a "✨ AI Polish" button (placeholder logic for now, just `console.log`).

D. `StepReview.tsx`
   - Read-only summary of all choices.
   - "Confirm Booking" button that redirects to `/dashboard`.

=========================================
4. PAGE INTEGRATION (`src/pages/public/StartProjectPage.tsx`)
=========================================
- Wrap the page in `BookingProvider`.
- Implement a simple step counter/progress bar.
- Render the current step component based on internal `step` state.
- Handle Back/Next navigation logic.

Output the code for the Context, Layout, and the Step components.
```

---

## 3. Verification Checklist
- [ ] `estimatedPrice` updates immediately when slider changes.
- [ ] Mobile layout shows the sticky bottom bar.
- [ ] Desktop layout shows the sticky sidebar.
- [ ] Data persists when navigating "Back".
