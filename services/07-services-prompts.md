# 🎨 Google Studio Prompts: Service Booking Wizard (Photography/Video)

**Purpose:** Complete set of prompts for Google AI Studio (Gemini) to design the Photography/Video Shoot Booking System  
**Target:** Beautiful, production-ready booking wizard with 7 steps  
**Style:** Minimalist Luxury, Editorial, "Airbnb for Fashion"  
**Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4 + Supabase

---

## 📋 Quick Start Guide

**How to Use:**
1. Open [Google AI Studio](https://aistudio.google.com/)
2. Select model: **Gemini 2.5 Flash** or **Gemini 3 Pro**
3. Copy prompts **in order** (1 → 2 → 3 → ...)
4. Paste into Google Studio
5. Use generated outputs as reference for implementation

**Prompt Flow:**
- **Prompts 1-3:** Structure & Setup (routes, wireframes, layout)
- **Prompts 4-10:** Individual Page Designs (each step of wizard)
- **Prompts 11-12:** Components & Polish (reusable components, final touches)

---

## 🏗️ Phase 1: Structure & Setup

### 🟢 Prompt 1: Initial Setup & Route Structure

```
You are a senior full-stack architect helping me design a booking wizard for a fashion photography/video platform.

**Project:** FashionOS - Photography/Video Shoot Booking System
**Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4 + Supabase
**Repo:** https://github.com/amo-tech-ai/fashionos100.git

**Current State:**
- Entry point exists: `/start-project` (StartProjectPage.tsx)
- Need to refactor into a 7-step booking wizard
- Routes should be: `/start-project`, `/start-project/quantity`, `/start-project/scenes`, etc.

**Requirements:**
1. Create complete route structure for 7-step wizard
2. Define folder structure for pages and components
3. Specify layout wrapper (BookingLayout) with progress bar and sidebar
4. Define state management approach (Zustand store or React Context)
5. List all required components

**Output Format:**
1. Route structure (all 7 routes)
2. Folder/file organization
3. Layout component structure
4. State management setup
5. Component dependency tree
```

### 🟢 Prompt 2: Wireframe & Layout Structure

```
Based on the route structure, create detailed wireframes for the booking wizard layout.

**Layout Requirements:**
- Desktop: Left content area (70%) + Right sticky sidebar (30%) with price summary
- Mobile: Full-width content + Bottom collapsible sheet for price summary
- Top: Progress indicator showing "Step X of 7"
- Navigation: "Back" and "Continue" buttons at bottom

**Wireframe Elements:**
1. Main layout structure (desktop and mobile)
2. Progress bar component placement
3. Sidebar/price summary structure
4. Content area for each step
5. Navigation button placement
6. Mobile bottom sheet behavior

**Visual Style:**
- Clean, minimal, fashion-inspired
- Colors: #FBF8F5 (cream background), #0A0A0A (black text), #C084FC (purple accent)
- Typography: Playfair Display (headings), Inter (body)

**Output:**
1. Desktop wireframe layout
2. Mobile wireframe layout
3. Component hierarchy diagram
4. Responsive breakpoints (mobile: 320px+, tablet: 768px+, desktop: 1024px+)
```

### 🟢 Prompt 3: UI/UX Layout System

```
Design the complete UI/UX layout system for the booking wizard.

**Design System:**
- Colors: Primary #0A0A0A, Accent #C084FC, Background #FBF8F5, Success #10B981
- Typography: Playfair Display (headings), Inter (body)
- Spacing: 16px (small), 24px (medium), 48px (large)
- Border radius: 8px (small), 16px (cards), 24px (large)
- Shadows: Subtle elevation (shadow-sm, shadow-md)

**Layout Components:**
1. BookingLayout wrapper with:
   - Progress indicator (top)
   - Main content area (center)
   - Price summary sidebar (right, desktop)
   - Bottom sheet (mobile)
   - Navigation buttons (bottom)

2. Card components:
   - Service selection cards
   - Scene cards
   - Model cards
   - Upgrade cards

3. Form components:
   - Input fields
   - Select dropdowns
   - Quantity selectors
   - Checkboxes/toggles

**Output:**
1. Complete layout component structure
2. Card component designs (all variants)
3. Form component designs
4. Responsive behavior specifications
5. Animation/transition guidelines
```

---

## 📸 Phase 2: Individual Page Designs

### 🟢 Prompt 4: Landing Page (Service Selection)

```
Design the landing page for the booking wizard (Step 1).

**Route:** `/start-project`

**Requirements:**
- Hero section: "Plan Your Ecommerce Shoot" title
- Subtitle: "Build your own custom shoot or choose a discounted pack"
- Two large service cards:
  - **Photography Card:** "From $39/photo", image of product photography, "Start Photo Shoot" button
  - **Video Card:** "From $93/clip", image of video production, "Start Video Shoot" button
- Discounted packs carousel:
  - "Amazon A+ Pack ($999)" card
  - "Starter Pack ($837)" card
  - Each shows: Trending badge, list of deliverables
- FAQ accordion section (optional)

**Visual Design:**
- Centered layout, max-width 1200px
- Cream background (#FBF8F5)
- High-quality product images
- Clear CTAs with hover effects
- Mobile: Stack cards vertically, horizontal scroll for packs

**Output:**
1. Complete page layout
2. Service card component design
3. Pack card component design
4. Responsive layouts (mobile/tablet/desktop)
5. Interaction states (hover, active, selected)
```

### 🟢 Prompt 5: Quantity Selection Page

```
Design the quantity selection page (Step 2).

**Route:** `/start-project/quantity`

**Requirements:**
- Header: "How many photos do you need?" (or "How many video clips?")
- Pill selector with options:
  - [1-5] (1 hr) - Default
  - [6-10] (2 hr)
  - [11-15] (Most Popular) - Highlighted with badge
  - [16-25] (3+ hr)
- Visual feedback:
  - Show estimated shoot duration below selection
  - Animate selection with purple highlight (#C084FC)
  - Update sidebar price in real-time
- Sidebar (Desktop):
  - "Estimated Total" section
  - Breakdown: Base price × quantity
  - Live price updates
- Mobile:
  - Quantity selector full-width
  - Price summary in bottom sheet
  - Continue button fixed at bottom (z-50)

**Output:**
1. Page layout with pill selector
2. Selection state designs
3. Price sidebar component
4. Mobile bottom sheet design
5. Animation specifications
```

### 🟢 Prompt 6: Scene Selection Page

```
Design the scene selection page (Step 3).

**Route:** `/start-project/scenes`

**Requirements:**
- Header: "Choose Your Scenes"
- Subtitle: "Pick 1-2 scenes. Customize details later."
- Filter tabs (horizontal scroll on mobile):
  - All, Flat Lay, Lifestyle, Kitchen, Bathroom
- Scene grid:
  - 3 columns desktop, 2 tablet, 1 mobile
  - Large aspect ratio cards (4:3)
  - High-res example image of the scene
  - Label: "White Cyclorama", "Modern Kitchen", "Pink Tile Bath"
  - Action: "+ Add" toggle button
  - Selected: Changes to "Added" with checkmark, purple border
- Selected count indicator
- Validation: Must select at least 1 scene

**Visual Design:**
- High-quality scene photos
- Clear selection states
- Smooth hover effects
- Filter tabs with active state
- Grid layout with proper spacing

**Output:**
1. Scene grid layout
2. Scene card component (default, hover, selected states)
3. Filter tabs component
4. Selection indicator
5. Responsive grid behavior
```

### 🟢 Prompt 7: Model Selection Page

```
Design the model selection page (Step 4).

**Route:** `/start-project/models`

**Requirements:**
- Header: "Add a Model"
- Subtitle: "Elevate your product with human touch."
- Model type cards (3 cards in row, stack on mobile):
  - **Hand Model ($237):**
    - Image: Hand holding product
    - Description: "Perfect for jewelry, accessories"
    - Quantity counter (when selected)
  - **Full Body ($477):**
    - Image: Fashion fit/model
    - Description: "Complete outfit styling"
    - Quantity counter (when selected)
  - **Pet Model ($297):**
    - Image: Dog/cat with product
    - Description: "Pet-friendly products"
    - Quantity counter (when selected)
- "No Models Needed" skip option
- Configuration (when card selected):
  - Expand quantity counter below
  - Show total price for model type
  - Option to remove

**Visual Design:**
- Professional model photography
- Clear pricing display
- Easy selection/deselection
- Quantity counter with +/- buttons
- Optional skip button

**Output:**
1. Model card layout
2. Selection states (unselected, selected, expanded)
3. Quantity counter component
4. Skip option design
5. Price calculation display
```

### 🟢 Prompt 8: Upgrades Selection Page

```
Design the upgrades/add-ons selection page (Step 5).

**Route:** `/start-project/upgrades`

**Requirements:**
- Header: "Add Upgrades"
- Subtitle: "Enhance your shoot with professional services"
- Upgrade grid (2 columns desktop, 1 mobile):
  - **Styling ($447)** - Icon: Scissors/clothes
  - **Hair & Makeup ($299)** - Icon: Brush
  - **Steaming ($39)** - Icon: Steam
  - **BTS Video ($186)** - Icon: Camera
- Card style:
  - Small icon + Title + Price
  - Simple toggle selection
  - Selected: Purple background (#C084FC), white text
  - Unselected: White background, black text, border
- Optional: "Skip" button to proceed without upgrades

**Visual Design:**
- Minimalist icons
- Clear pricing
- Easy toggling
- Visual feedback on selection
- Grid layout with proper spacing

**Output:**
1. Upgrade grid layout
2. Upgrade card component (default, selected states)
3. Icon designs
4. Toggle interaction
5. Responsive grid behavior
```

### 🟢 Prompt 9: Checkout & Review Page

```
Design the checkout/review page (Step 6).

**Route:** `/start-project/checkout`

**Requirements:**
- Header: "Review & Book"
- Layout (2 columns desktop, stacked mobile):
  - **Left Column (Forms):**
    - Contact Info Section:
      - Name (required)
      - Email (required)
      - Company (optional)
      - Phone (optional)
    - Billing Address Section:
      - Street, City, State, ZIP, Country
    - Payment Details Section:
      - Stripe Element integration area
      - Card number, expiry, CVC
    - "How did you hear about us?" dropdown
  - **Right Column (Sticky Summary):**
    - Itemized list:
      - Photos (quantity × price)
      - Scenes (list selected)
      - Models (list selected)
      - Upgrades (list selected)
    - Subtotal
    - Tax calculation
    - Total (large, bold)
    - Promo Code input
    - "Book Now" button (primary, full-width)
- Bottom: "Back" button

**Visual Design:**
- Clean form layout
- Clear price breakdown
- Secure payment indicator
- Loading state during payment
- Error handling UI

**Output:**
1. Two-column layout (desktop)
2. Stacked layout (mobile)
3. Form component designs
4. Price summary component
5. Payment integration area
6. Loading and error states
```

### 🟢 Prompt 10: Success & Confirmation Page

```
Design the booking success/confirmation page (Step 7).

**Route:** `/start-project/success`

**Requirements:**
- Hero section:
  - Large checkmark icon (green #10B981)
  - Title: "You're booked! Order #12345"
  - Subtitle: "We've sent a confirmation email"
- Next Steps Section:
  - "Ship your products to:" with address
  - Shipping instructions
  - Expected delivery date
  - Production timeline
- Actions:
  - "Download Invoice" button (secondary)
  - "Go to Dashboard" button (primary)
  - "Book Another Shoot" link
- Optional: Order summary card (collapsible)

**Visual Design:**
- Celebration aesthetic
- Clear next steps
- Professional confirmation
- Easy access to actions
- Clean, spacious layout

**Output:**
1. Success page layout
2. Next steps component
3. Action buttons design
4. Order summary card
5. Celebration visual elements
```

---

## 🧩 Phase 3: Components & Polish

### 🟢 Prompt 11: Reusable Component Library

```
Design a complete component library for the booking wizard.

**Components Needed:**
1. **BookingSidebar.tsx:**
   - Sticky summary (desktop)
   - Bottom sheet (mobile)
   - Price breakdown
   - Live updates
   - Collapsible sections

2. **SceneCard.tsx:**
   - Image display
   - Title and description
   - Selection toggle
   - Hover effects

3. **ModelCard.tsx:**
   - Model image
   - Type and price
   - Quantity selector
   - Selection state

4. **UpgradeCard.tsx:**
   - Icon
   - Title and price
   - Toggle selection
   - Compact design

5. **QuantitySelector.tsx:**
   - Pill selector variant
   - Slider variant
   - Number input variant
   - Visual feedback

6. **PackageCard.tsx:**
   - Package image
   - Title and price
   - Feature list
   - CTA button

7. **ProgressIndicator.tsx:**
   - Step X of 7 display
   - Progress bar
   - Step markers
   - Mobile responsive

**Design Requirements:**
- Consistent styling across all components
- Proper TypeScript interfaces
- Accessibility (ARIA labels, keyboard nav)
- Loading and error states
- Responsive behavior

**Output:**
1. Component designs for each
2. Props interfaces
3. State variants
4. Responsive behavior
5. Accessibility features
```

### 🟢 Prompt 12: Final Polish & Animations

```
Add final polish and animations to the booking wizard.

**Animation Requirements:**
1. **Page Transitions:**
   - Smooth fade/slide between steps
   - Duration: 300ms
   - Easing: ease-in-out

2. **Component Animations:**
   - Card hover: Scale 1.02, shadow increase
   - Selection: Purple border fade-in
   - Price update: Number count-up animation
   - Loading: Skeleton screens

3. **Micro-interactions:**
   - Button press feedback
   - Form validation errors
   - Success checkmark animation
   - Progress bar fill animation

**Polish Elements:**
1. **Loading States:**
   - Skeleton cards while loading
   - Spinner for API calls
   - Progress indicators

2. **Empty States:**
   - "No scenes selected" message
   - "No models added" message
   - Helpful CTAs

3. **Error States:**
   - Form validation errors
   - Payment failure messages
   - Network error handling

4. **Success States:**
   - Confirmation animations
   - Success messages
   - Next step indicators

**Output:**
1. Animation specifications
2. Loading state designs
3. Empty state designs
4. Error state designs
5. Success state designs
6. Micro-interaction details
```

---

## 🎯 Complete Implementation Prompt

### 🟢 Prompt 13: Full Wizard Implementation Plan

```
Generate a complete implementation plan for the Photography/Video Booking Wizard.

**Based on all previous prompts, create:**

1. **File Structure:**
   - Complete folder organization
   - All required files with paths
   - Import dependencies

2. **State Management:**
   - Zustand store structure
   - Actions and reducers
   - Persistence strategy

3. **Route Configuration:**
   - React Router setup
   - Protected routes
   - Navigation guards

4. **Component Hierarchy:**
   - Parent-child relationships
   - Props flow
   - State lifting

5. **API Integration:**
   - Supabase queries
   - Edge function calls
   - Error handling

6. **Pricing Engine:**
   - Calculation logic
   - Real-time updates
   - Tax calculation

7. **Payment Integration:**
   - Stripe setup
   - Payment intent creation
   - Webhook handling

8. **Testing Strategy:**
   - Unit tests
   - Integration tests
   - E2E tests

**Output:**
1. Complete file structure
2. Implementation checklist
3. Code generation templates
4. Testing plan
5. Deployment checklist
```

---

## 📐 Wireframe Prompts

### 🟢 Prompt 14: Complete Wireframe Set

```
Create complete wireframes for all 7 booking wizard pages.

**For each page, provide:**
1. Desktop wireframe (1024px+)
2. Tablet wireframe (768px)
3. Mobile wireframe (320px)
4. Component placement
5. Spacing measurements
6. Breakpoint behavior

**Pages to wireframe:**
1. Landing (Service Selection)
2. Quantity Selection
3. Scene Selection
4. Model Selection
5. Upgrades Selection
6. Checkout & Review
7. Success & Confirmation

**Output:**
1. Wireframe for each page (3 breakpoints each = 21 wireframes)
2. Component annotations
3. Interaction notes
4. Responsive behavior specifications
```

---

## 🎨 Visual Design Prompts

### 🟢 Prompt 15: Complete Visual Design System

```
Design the complete visual design system for the booking wizard.

**Include:**
1. **Color Palette:**
   - Primary, secondary, accent colors
   - Background colors
   - Text colors
   - State colors (success, error, warning)

2. **Typography Scale:**
   - Heading sizes (H1-H6)
   - Body text sizes
   - Label sizes
   - Line heights
   - Letter spacing

3. **Spacing System:**
   - Base unit (4px or 8px)
   - Scale (xs, sm, md, lg, xl, 2xl)
   - Component spacing
   - Section spacing

4. **Component Styles:**
   - Button styles (primary, secondary, ghost)
   - Input styles (default, focus, error)
   - Card styles (default, hover, selected)
   - Badge styles

5. **Icon System:**
   - Icon library (Lucide React)
   - Icon sizes
   - Icon colors
   - Icon usage guidelines

**Output:**
1. Complete color palette with hex codes
2. Typography scale with examples
3. Spacing system with visual examples
4. Component style guide
5. Icon usage guide
```

---

## 🔄 State Management Prompts

### 🟢 Prompt 16: State Management Architecture

```
Design the state management architecture for the booking wizard.

**Requirements:**
1. **Booking State Store (Zustand):**
   - Service type (photography | video)
   - Quantity (number)
   - Selected scenes (array)
   - Selected models (array with quantities)
   - Selected upgrades (array)
   - Contact info (object)
   - Billing address (object)
   - Payment method (object)

2. **Actions:**
   - setServiceType(type)
   - setQuantity(qty)
   - toggleScene(sceneId)
   - addModel(modelType, quantity)
   - toggleUpgrade(upgradeId)
   - updateContactInfo(info)
   - updateBillingAddress(address)
   - resetBooking()

3. **Persistence:**
   - Save to localStorage
   - Restore on page load
   - Clear on success

4. **Derived State:**
   - Calculated price (from pricing engine)
   - Can proceed to next step (validation)
   - Is complete (all required fields)

**Output:**
1. Complete store structure
2. Action definitions
3. Selector functions
4. Persistence logic
5. Validation logic
```

---

## 🗄️ Database Integration Prompts

### 🟢 Prompt 17: Database Schema & API Design

```
Design the database schema and API integration for the booking system.

**Database Tables:**
1. `bookings`:
   - id, user_id, status, total_amount, currency
   - contact_info (jsonb), billing_address (jsonb)
   - created_at, updated_at

2. `booking_items`:
   - id, booking_id, item_type, item_id, quantity, price
   - details (jsonb)

3. `scenes` (catalog):
   - id, name, category, image_url, price

4. `models` (catalog):
   - id, type, name, price, image_url

5. `upgrades` (catalog):
   - id, name, description, price, icon

**API Functions:**
1. `createBooking(data)` - Create booking record
2. `updateBooking(id, data)` - Update booking
3. `calculatePrice(state)` - Calculate total price
4. `createPaymentIntent(bookingId)` - Stripe integration

**Output:**
1. Complete SQL schema
2. TypeScript interfaces
3. API function signatures
4. Error handling strategy
5. RLS policies
```

---

## 🧪 Testing & Quality Prompts

### 🟢 Prompt 18: Testing Strategy & Checklist

```
Create a comprehensive testing strategy for the booking wizard.

**Test Coverage:**
1. **Unit Tests:**
   - Pricing calculation logic
   - State management actions
   - Validation functions
   - Utility functions

2. **Component Tests:**
   - Each step component
   - Form validation
   - User interactions
   - State updates

3. **Integration Tests:**
   - Complete booking flow
   - API integration
   - Payment flow
   - Error handling

4. **E2E Tests:**
   - Full user journey
   - Mobile responsiveness
   - Payment success/failure
   - Data persistence

**Output:**
1. Test plan structure
2. Test cases for each component
3. Integration test scenarios
4. E2E test scripts
5. Coverage targets
```

---

## 📱 Mobile-First Design Prompts

### 🟢 Prompt 19: Mobile Optimization

```
Optimize the booking wizard for mobile devices (320px-768px).

**Mobile-Specific Requirements:**
1. **Layout:**
   - Single column layout
   - Full-width components
   - Bottom sheet for price summary
   - Fixed navigation buttons

2. **Interactions:**
   - Touch-friendly targets (min 44px)
   - Swipe gestures (optional)
   - Pull-to-refresh (optional)
   - Bottom sheet drag handle

3. **Performance:**
   - Lazy load images
   - Optimize bundle size
   - Fast initial load
   - Smooth scrolling

4. **UX:**
   - Clear progress indicator
   - Easy navigation
   - Quick price access
   - Simplified forms

**Output:**
1. Mobile layout designs
2. Touch interaction specs
3. Performance optimizations
4. Mobile UX guidelines
5. Responsive breakpoints
```

---

## 🎯 Quick Reference: All Prompts Summary

| # | Prompt | Purpose | Output |
|---|--------|---------|--------|
| 1 | Initial Setup | Route structure, folder organization | File structure, routes |
| 2 | Wireframes | Layout wireframes | Desktop/mobile wireframes |
| 3 | UI/UX Layout | Design system, components | Layout system |
| 4 | Landing Page | Service selection design | Page design |
| 5 | Quantity Page | Quantity selector design | Page design |
| 6 | Scenes Page | Scene selection design | Page design |
| 7 | Models Page | Model selection design | Page design |
| 8 | Upgrades Page | Upgrade selection design | Page design |
| 9 | Checkout Page | Payment form design | Page design |
| 10 | Success Page | Confirmation design | Page design |
| 11 | Components | Reusable component library | Component designs |
| 12 | Polish | Animations, states | Animation specs |
| 13 | Implementation | Complete implementation plan | Implementation guide |
| 14 | Wireframes | Complete wireframe set | All wireframes |
| 15 | Design System | Visual design system | Design tokens |
| 16 | State Management | State architecture | Store structure |
| 17 | Database | Schema & API design | Database schema |
| 18 | Testing | Testing strategy | Test plan |
| 19 | Mobile | Mobile optimization | Mobile designs |

---

## 🚀 Usage Instructions

### Step-by-Step Process

1. **Start with Structure (Prompts 1-3):**
   - Get route structure and layout
   - Understand component hierarchy
   - Set up design system

2. **Design Pages (Prompts 4-10):**
   - Design each step sequentially
   - Use outputs from previous prompts
   - Maintain consistency

3. **Build Components (Prompts 11-12):**
   - Create reusable components
   - Add animations and polish
   - Ensure accessibility

4. **Implement (Prompts 13-19):**
   - Follow implementation plan
   - Set up database
   - Add testing
   - Optimize for mobile

### Tips for Best Results

- **Be Specific:** Include context from existing codebase
- **Reference Docs:** Mention relevant documentation
- **Iterate:** Refine prompts based on outputs
- **Combine:** Use outputs from earlier prompts in later ones
- **Validate:** Check generated designs against requirements

---

## 📝 Example Workflow

```
1. Paste Prompt 1 → Get route structure
2. Paste Prompt 2 → Get wireframes
3. Paste Prompt 4 → Design landing page
4. Paste Prompt 5 → Design quantity page
5. Continue with prompts 6-10 for all pages
6. Paste Prompt 11 → Design components
7. Paste Prompt 13 → Get implementation plan
8. Use all outputs to build the system
```

---

**Last Updated:** 2025-01-27  
**Version:** 1.0  
**Status:** Ready for Google AI Studio

