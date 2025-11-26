
# 📸 Service Booking System Plan (Ecommerce Photography)

## 📊 Progress Task Tracker

| Task Name | Short Description | Status | % Complete | ✅ Confirmed | ⚠️ Missing / Failing | 💡 Next Action |
| --------- | ----------------- | ------ | ---------- | ------------- | -------------------- | -------------- |
| **Route & Layout Setup** | Define routes and wrapper layout | 🔴 Not Started | 0% | — | — | Create `ServiceBookingLayout` |
| **State Management** | `useBookingStore` (Zustand/Context) | 🔴 Not Started | 0% | — | — | Setup global state for wizard |
| **Data Model & API Setup** | Supabase tables + API helpers | 🔴 Not Started | 0% | — | — | Run SQL migrations |
| **Pricing Engine** | Central calc function | 🔴 Not Started | 0% | — | — | Write `calculateBookingTotal.ts` |
| **Page: Landing** | Service selection & packages | 🔴 Not Started | 0% | — | — | Build `StartProjectPage.tsx` |
| **Page: Quantity** | Photo/Video count selector | 🔴 Not Started | 0% | — | — | Build `StepQuantity.tsx` |
| **Page: Scenes** | Scene selection grid | 🔴 Not Started | 0% | — | — | Build `StepScenes.tsx` |
| **Page: Models** | Model selection & details | 🔴 Not Started | 0% | — | — | Build `StepModels.tsx` |
| **Page: Upgrades** | Add-ons (styling, steaming) | 🔴 Not Started | 0% | — | — | Build `StepUpgrades.tsx` |
| **Page: Checkout** | Summary & Payment form | 🔴 Not Started | 0% | — | — | Build `StepCheckout.tsx` |
| **Page: Success** | Confirmation & Next Steps | 🔴 Not Started | 0% | — | — | Build `BookingSuccessPage.tsx` |
| **Admin View** | Internal dashboard for studio | 🔴 Not Started | 0% | — | — | Build `DashboardStudio.tsx` |
| **Mobile Responsiveness** | Sticky footers & touch targets | 🔴 Not Started | 0% | — | — | Test on mobile view |

---

# 🏗️ 1. Route Structure & Folder Map

We will refactor the existing `/start-project` into a dedicated sub-module structure.

```text
src/
  pages/
    public/
      booking/
        BookingLayout.tsx       # Wraps all steps with Progress Bar & Sidebar
        StartProjectPage.tsx    # Step 1: Service Selection (Home)
        StepQuantity.tsx        # Step 2: How many photos?
        StepScenes.tsx          # Step 3: Choose Scenes
        StepModels.tsx          # Step 4: Add Models
        StepUpgrades.tsx        # Step 5: Add Upgrades
        StepCheckout.tsx        # Step 6: Payment & Review
        BookingSuccessPage.tsx  # Step 7: Confirmation
  components/
    booking/
      BookingSidebar.tsx        # Sticky summary (Desktop) / Bottom Sheet (Mobile)
      SceneCard.tsx
      ModelCard.tsx
      UpgradeCard.tsx
      QuantitySelector.tsx
      PackageCard.tsx
  lib/
    pricing.ts                  # Central Pricing Engine
    validation.ts               # Guard functions
```

**Routes:**
*   `/start-project` (Landing)
*   `/start-project/quantity`
*   `/start-project/scenes`
*   `/start-project/models`
*   `/start-project/upgrades`
*   `/start-project/checkout`
*   `/start-project/success`

---

# 🎨 2. Design Style Guidelines

*   **Aesthetic:** Clean, minimal, fashion-inspired. Apple-store clarity meets Vogue editorial.
*   **Palette:**
    *   Backgrounds: `#FBF8F5` (Cream), `#FFFFFF` (White)
    *   Text: `#0A0A0A` (Black), `#525252` (Gray 600)
    *   Accent: `#C084FC` (Purple), `#E87C4D` (Orange)
*   **Typography:**
    *   Headings: *Playfair Display*
    *   Body/UI: *Inter*
*   **Components:**
    *   Cards: Rounded `xl` or `2xl`, soft shadows `shadow-sm`, hover lift.
    *   Buttons: Full rounded pills or slightly rounded rectangles. High contrast.
*   **Mobile-First:**
    *   Sidebar moves to **Bottom Collapsible Sheet**.
    *   Primary CTA fixed at bottom (`z-50`).
    *   Inputs 100% width.

---

# 🧱 3. Detailed Screen Specifications

## 🏠 Screen 1: Landing / Plan Your Shoot
**Route:** `/start-project`

**Header:**
*   Title: "Plan Your Ecommerce Shoot"
*   Subtitle: "Build your own custom shoot or choose a discounted pack."

**Core Components:**
1.  **Build Your Own Grid:**
    *   Photo Card: "From $39/photo". Image: Product on pastel. CTA: "Start Photo Shoot".
    *   Video Card: "From $93/clip". Image: Motion blur/camera. CTA: "Start Video Shoot".
2.  **Discounted Packs (Carousel):**
    *   Card: "Amazon A+ Pack ($999)", "Starter Pack ($837)".
    *   Details: Chip "🔥 Trending", List of deliverables.
3.  **FAQ Accordion:** "Can I combine photo + video?", "What's included?".

---

## 📸 Screen 2: Quantity
**Route:** `/start-project/quantity`

**Header:**
*   Title: "How many photos do you need?"

**UI Layout:**
*   **Pill Selector:** Horizontal list of options.
    *   [1-5] (1 hr)
    *   [6-10] (2 hr)
    *   [11-15] (Most Popular)
    *   [16-25]
*   **Visual Feedback:** Show estimated shoot duration based on selection.
*   **Sidebar:** Starts populating "Estimated Total".

---

## 🎬 Screen 3: Scene Selection
**Route:** `/start-project/scenes`

**Header:**
*   Title: "Choose Your Scenes"
*   Subtitle: "Pick 1-2 scenes. Customize details later."

**Components:**
1.  **Filter Tabs:** All, Flat Lay, Lifestyle, Kitchen, Bathroom.
2.  **Scene Grid:**
    *   Large Aspect Ratio Cards (4:3).
    *   Image: High-res example of the scene.
    *   Label: "White Cyclorama", "Modern Kitchen", "Pink Tile Bath".
    *   Action: "+ Add" toggle button (changes to "Added" with checkmark).

---

## 🧍 Screen 4: Model Selection
**Route:** `/start-project/models`

**Header:**
*   Title: "Add a Model"
*   Subtitle: "Elevate your product with human touch."

**Components:**
1.  **Model Type Cards:**
    *   Hand Model ($237) - Image of hand holding product.
    *   Full Body ($477) - Image of fashion fit.
    *   Pet Model ($297) - Image of dog/cat.
2.  **Configuration:**
    *   When a card is selected, expand a "Quantity" counter below it.

---

## 🎒 Screen 5: Upgrades
**Route:** `/start-project/upgrades`

**Header:**
*   Title: "Add Upgrades"

**Components:**
1.  **Upgrade Grid:**
    *   Styling ($447)
    *   Hair & Makeup ($299)
    *   Steaming ($39)
    *   BTS Video ($186)
2.  **Card Style:** Small icon + Title + Price. Simple toggle selection.

---

## 🧾 Screen 6: Checkout
**Route:** `/start-project/checkout`

**Header:**
*   Title: "Review & Book"

**Layout:**
*   **Left Column (Forms):**
    *   Contact Info (Name, Email, Company).
    *   Billing Address.
    *   Payment Details (Stripe Element).
*   **Right Column (Sticky Summary):**
    *   Itemized list (Photos, Scenes, Models, Upgrades).
    *   Subtotal, Tax, Total.
    *   Promo Code input.
*   **Bottom:** "How did you hear about us?"

---

## 🎉 Screen 7: Success
**Route:** `/start-project/success`

**Content:**
*   Hero: "You're booked! Order #12345"
*   Next Steps: "Ship your products to..."
*   Actions: "Download Invoice", "Go to Dashboard".

---

# 🗄️ 4. Database Schema & Data Model

To support robust booking, we need relational data, not just JSON blobs.

## Core Tables
*   **`bookings`**: Main transaction record.
    *   `id`, `user_id` (nullable for guest), `status` (draft, paid, shooting, completed), `total_amount`, `currency`.
*   **`booking_items`**: Line items for the invoice.
    *   `booking_id`, `type` (photo, scene, model, upgrade), `item_id` (ref), `quantity`, `price_at_booking`.
*   **`scenes`**: Inventory of available sets.
    *   `id`, `name`, `category`, `image_url`, `price`.
*   **`models`**: Inventory of model types.
    *   `id`, `type` (hand, full), `price`, `image_url`.
*   **`pricing_rules`**: For dynamic calculation (optional MVP, hardcode first).

---

# 💳 5. Business Logic & Pricing Engine

We will implement a central `calculateBookingTotal(state)` function in `lib/pricing.ts`.

**Inputs:**
*   `photoCount`: number
*   `scenes`: array of objects
*   `models`: array of objects (with quantity)
*   `upgrades`: array of strings

**Outputs:**
*   `subtotal`: number
*   `tax`: number
*   `total`: number
*   `lineItems`: array (for display in summary)

**Validation Guards:**
*   `canGoToScenes()`: Must have photo count > 0.
*   `canGoToCheckout()`: Must have contact info + at least 1 scene.

---

# 🧑‍🍳 6. Admin / Studio View

A new dashboard page for the internal team to manage incoming shoots.

**Route:** `/dashboard/studio`

**Features:**
*   **Kanban Board:** Columns for `Incoming`, `Products Received`, `Shooting`, `Editing`, `Delivered`.
*   **Booking Detail Modal:**
    *   See exact Scenes, Props, and Models requested.
    *   Checklist for the production team (e.g., "Steaming Required").
*   **Status Actions:** Buttons to move booking to next stage and trigger emails.

---

# 📱 7. Mobile-Specific Logic

1.  **Navigation:** Top bar shows "Back" arrow and "Step X/6".
2.  **Summary Sheet:**
    *   A bar at the bottom showing "Total: $1,240 ^".
    *   Clicking "^" expands a bottom sheet with the full itemized list.
3.  **CTA:** "Next Step" button is always visible above the bottom bar.
