update service-plan.md doc 🎨 FashionOS Design Prompts & Visual Enhancement Guide  
add tasks to service plan multistep prompts success critieria production ready checklists add progress tracker to top pf file  
**Purpose:** Natural language prompts for AI-assisted UI/UX design using Google Studio (Gemini)  
**Target:** Beautiful, responsive, production-ready designs  
**Style:** Minimalist Luxury, Editorial, "Airbnb for Fashion"

---

## 📋 Sitemap Structure

### Public Routes

- / - Home
    
- /services - Services Overview
    
- /services/photography - Photography Service
    
- /services/video-production - Video Service
    
- /services/ecommerce - E-commerce Service
    
- /services/social - Social Media Service
    
- /directory - Designer Directory
    
- /designers/:id - Designer Profile
    
- /events - Events Listing
    
- /pricing - Pricing Page
    
- /about - About Page
    
- /contact - Contact Page
    
- /start-project - Booking Wizard Entry
    

### Dashboard Routes (Authenticated)

- /dashboard - Overview
    
- /dashboard/bookings - Bookings List
    
- /dashboard/calendar - Calendar View
    
- /dashboard/events - Events Manager
    
- /dashboard/financials - Financial Dashboard
    
- /dashboard/gallery - Media Gallery
    
- /dashboard/leads - Lead Management
    
- /dashboard/sponsors - Sponsor Management
    
- /dashboard/packages - Package Builder
    
- /dashboard/contracts - Contracts
    
- /dashboard/activations - Activations
    
- /dashboard/media - Media Deliverables
    
- /dashboard/roi - ROI Analytics
    
- /dashboard/portal - Sponsor Portal
    

---

## 🎨 Design System Tokens

### Colors

- **Primary:** #0A0A0A (Fashion Black)
    
- **Accent:** #C084FC (Fashion Purple)
    
- **Background:** #FBF8F5 (Fashion Cream)
    
- **Success:** #10B981 (Emerald)
    
- **Error:** #EF4444 (Red)
    

### Typography

- **Headings:** Playfair Display (Serif)
    
- **Body:** Inter (Sans-serif)
    
- **Sizes:** 12px (labels), 16px (body), 32px (H2), 48px (H1)
    

### Spacing

- **Container:** max-width 1600px, padding 24px (mobile) / 48px (desktop)
    
- **Cards:** 16px border-radius, 1px border, white background
    
- **Gaps:** 16px (small), 24px (medium), 48px (large)
    

---

## 1. 🏠 Home Page (/)

### Prompt 1: Hero Section Design

codeCode

```
Design a hero section for FashionOS homepage with:
- Split layout: Left side text, right side video/image
- Headline: "Book a fashion shoot in days, not weeks"
- Subheadline: "Editorial quality photo & video tailored to your collection"
- Primary CTA: "Start Your Shoot" button (black background, white text)
- Secondary CTA: "View Pricing" link
- Background: Warm cream (#FBF8F5)
- Typography: Playfair Display for headline, Inter for body
- Responsive: Stack on mobile, side-by-side on desktop
- Visual: Right side shows cinematic studio shoot video loop
```

### Prompt 2: Feature Cards Section

codeCode

```
Create a 3-column feature card grid:
- Card 1: "Unified Dashboard" with icon, title, description
- Card 2: "Global Directory" with icon, title, description
- Card 3: "AI-Powered Briefs" with icon, title, description
- Cards: White background, subtle shadow, hover effect (scale 1.01)
- Spacing: 48px gap between cards
- Icons: Minimalist line icons, purple accent color
- Responsive: 1 column mobile, 3 columns desktop
```

### Prompt 3: Testimonials Section

codeCode

```
Design testimonials section:
- 3 testimonial cards in a row
- Each card: Quote text, author name, role, company logo
- Background: White cards on cream background
- Typography: Italic serif for quotes, bold sans-serif for names
- Layout: Horizontal scroll on mobile, grid on desktop
- Visual: Subtle quote marks, elegant spacing
```

---

## 2. 📸 Services Pages (/services/*)

### Prompt 4: Service Overview Layout

codeCode

```
Design a service page template with:
- Hero section: Large title, short description, CTA button
- Service features: 4-column grid of feature cards
- Pricing preview: 3 pricing tiers (Basic, Pro, Enterprise)
- Portfolio gallery: Image grid (3 columns, aspect ratio 4:3)
- CTA section: "Ready to start?" with booking button
- Color scheme: Black text, purple accents, cream background
- Responsive: Single column mobile, multi-column desktop
```

### Prompt 5: Photography Service Page

codeCode

```
Create photography service page:
- Hero: "Editorial & E-commerce Photography" headline
- Service types: Cards for "Lookbook", "E-commerce", "Editorial"
- Process: 4-step visual timeline (1. Book, 2. Shoot, 3. Edit, 4. Deliver)
- Portfolio: Masonry grid of photography examples
- Pricing calculator: Interactive widget showing price based on looks
- Visual style: Clean, minimalist, high-fashion aesthetic
```

---

## 3. 📚 Directory Page (/directory)

### Prompt 6: Directory Grid Layout

codeCode

```
Design designer directory page:
- Search bar: Full-width search with filters (location, style, category)
- Grid layout: 4-column grid of designer cards (desktop), 2-column (tablet), 1-column (mobile)
- Designer cards: Image (3:4 aspect ratio), name, location, tags, "View Profile" button
- Filters sidebar: Collapsible on mobile, always visible on desktop
- Pagination: Bottom pagination controls
- Loading states: Skeleton cards while loading
- Empty state: "No designers found" message with illustration
```

### Prompt 7: Designer Profile Card

codeCode

```
Create designer profile card component:
- Image: 3:4 aspect ratio, rounded corners, hover zoom effect
- Overlay: Designer name, location, aesthetic tags
- Hover state: Slight scale (1.02), shadow increase
- Tags: Small pill badges with purple accent
- CTA: "View Profile" button (transparent with border)
- Responsive: Full width mobile, fixed width desktop
```

---

## 4. 🎯 Booking Wizard (/start-project)

### Prompt 8: Wizard Step Layout

codeCode

```
Design multi-step booking wizard:
- Progress indicator: Top progress bar showing "Step X of 13"
- Main content: Centered card (max-width 800px) with step content
- Navigation: "Back" and "Continue" buttons at bottom
- Sidebar: Price summary (sticky on desktop, collapsible on mobile)
- Visual: Clean white card on cream background
- Typography: Large headings (32px), readable body (16px)
- Responsive: Full width mobile, centered card desktop
```

### Prompt 9: Service Type Selection

codeCode

```
Create service type selection screen:
- 3 large cards in a row: "Photography", "Video", "Hybrid"
- Each card: Icon, title, description, "Best Value" badge (for Hybrid)
- Selected state: Purple border (2px), light purple background (#F3E8FF)
- Hover state: Subtle shadow, slight scale
- Toggle: "Virtual" vs "In-Person" pill toggle below cards
- Visual: Minimalist icons, elegant spacing
```

### Prompt 10: Quantity & Pricing Step

codeCode

```
Design quantity selection with real-time pricing:
- Segmented control: "1-3 Looks", "4-8 Looks", "9-15 Looks", "16+ Looks"
- Price display: Large price number (48px), breakdown below
- Visual feedback: Selected option highlighted in purple
- Sidebar: Live price calculator showing base + add-ons
- Animation: Smooth price update transition
- Responsive: Horizontal scroll on mobile, full width desktop
```

### Prompt 11: AI Brief Polisher UI

codeCode

```
Create AI brief polishing interface:
- Textarea: Large input field for user's rough brief
- "Polish with AI" button: Purple button with sparkle icon
- Loading state: Skeleton text, spinner, "AI is polishing your brief..."
- Result: Side-by-side comparison (Original | Polished)
- Actions: "Use This", "Edit", "Try Again"
- Visual: Clean typography, good contrast, readable
```

---

## 5. 📊 Dashboard Pages (/dashboard/*)

### Prompt 12: Dashboard Overview Layout

codeCode

```
Design dashboard overview page:
- Header: Welcome message, quick stats (4 KPI cards)
- Main grid: 2-column layout (desktop), 1-column (mobile)
- Left column: Recent bookings list, calendar widget
- Right column: Revenue chart, upcoming events
- Cards: White background, subtle shadow, rounded corners
- Typography: Clear hierarchy, readable numbers
- Responsive: Stack columns on mobile
```

### Prompt 13: Bookings List Page

codeCode

```
Create bookings list/table:
- Filters: Status, date range, search bar
- Table: Columns (Date, Client, Type, Status, Actions)
- Status badges: Color-coded (draft=gray, confirmed=green, etc.)
- Actions: View, Edit, Cancel buttons per row
- Empty state: "No bookings yet" with CTA
- Pagination: Bottom controls
- Responsive: Card view on mobile, table on desktop
```

### Prompt 14: Calendar View

codeCode

```
Design calendar dashboard:
- Month view: Large calendar grid with bookings marked
- Sidebar: List of bookings for selected date
- Booking cards: Color-coded by status, time, client name
- Navigation: Month/year selector, today button
- Click interaction: Click date to see bookings
- Responsive: Full-width calendar, sidebar below on mobile
```

### Prompt 15: Financial Dashboard

codeCode

```
Create financial overview:
- Revenue chart: Line chart showing revenue over time
- KPI cards: Total revenue, pending payments, completed shoots
- Transaction list: Recent payments with status
- Filters: Date range, payment status
- Export button: "Export to CSV"
- Visual: Clean charts, clear numbers, professional
```

---

## 6. 🎪 Event Management Pages

### Prompt 16: Events Listing Page

codeCode

```
Design events listing:
- Grid layout: 3-column grid of event cards
- Event cards: Featured image, title, date, location, status badge
- Filters: Event type, date range, status
- Create button: Floating action button (purple)
- Empty state: "Create your first event" with illustration
- Responsive: 1 column mobile, 3 columns desktop
```

### Prompt 17: Event Wizard

codeCode

```
Create event creation wizard:
- Multi-step form: 5 steps (Details, Venue, Sponsors, Schedule, Review)
- Progress indicator: Step dots at top
- Form fields: Large inputs, clear labels, validation
- Image upload: Drag-and-drop area for event image
- Preview: Live preview of event card
- Responsive: Full-width form on mobile
```

---

## 7. 🎨 Visual Components

### Prompt 18: Card Component Design

codeCode

```
Design reusable card component:
- Base: White background, 16px border-radius, 1px border (#E5E7EB)
- Padding: 24px internal padding
- Hover: Shadow increase, border color change
- Variants: Default, Highlighted (purple border), Clickable (cursor pointer)
- Content: Flexible content area, optional footer
- Responsive: Full width mobile, fixed width desktop
```

### Prompt 19: Button Components

codeCode

```
Create button system:
- Primary: Black background (#0A0A0A), white text, uppercase, 4px radius
- Secondary: White background, black border, black text
- Accent: Purple background (#C084FC), white text
- Sizes: Small (32px), Medium (40px), Large (56px)
- States: Default, Hover, Active, Disabled
- Icons: Optional left/right icons
```

### Prompt 20: Input Components

codeCode

```
Design form input system:
- Text input: 56px height, transparent/white background, bottom border
- Labels: 12px uppercase, letter-spacing, gray color
- Placeholder: Light gray, italic
- Focus: Purple border, subtle glow
- Error: Red border, error message below
- Success: Green border, checkmark icon
```

---

## 8. 📱 Responsive Design Patterns

### Prompt 21: Mobile-First Layout

codeCode

```
Design responsive layout system:
- Breakpoints: Mobile (320px), Tablet (768px), Desktop (1024px+)
- Mobile: Single column, full-width, stacked sections
- Tablet: 2-column grid, larger spacing
- Desktop: Multi-column, max-width container (1600px)
- Navigation: Hamburger menu mobile, full nav desktop
- Cards: Full width mobile, fixed width desktop
```

### Prompt 22: Responsive Typography

codeCode

```
Create responsive typography scale:
- Mobile H1: 32px
- Desktop H1: 48px
- Mobile Body: 14px
- Desktop Body: 16px
- Line heights: 1.2 (headings), 1.6 (body)
- Responsive: Use clamp() for fluid scaling
```

---

## 9. 🎭 Visual Enhancements

### Prompt 23: Loading States

codeCode

```
Design loading state components:
- Skeleton cards: Animated gray boxes matching content shape
- Spinner: Purple circular spinner, centered
- Progress bar: Purple bar with animation
- Text: "Loading..." with ellipsis animation
- Full-page: Centered spinner with message
```

### Prompt 24: Empty States

codeCode

```
Create empty state designs:
- Illustration: Simple, elegant line art
- Message: Friendly, actionable text
- CTA: Primary button to take action
- Examples: "No bookings yet", "No events found", "No results"
- Visual: Centered, spacious, inviting
```

### Prompt 25: Error States

codeCode

```
Design error handling UI:
- Error message: Red text, clear icon
- Error card: Red border, light red background
- Actions: "Try Again" button, "Go Back" link
- 404 page: Large "404", friendly message, home link
- Visual: Not alarming, helpful, actionable
```

---

## 10. 🎨 Figma Component Improvements

### Current Figma Screens Review

#### Screen: Sponsor Home Dashboard

**Current:** Basic dashboard layout  
**Improvements:**

codeCode

```
Enhance sponsor dashboard with:
- Hero section: Welcome message, quick stats (4 KPI cards in grid)
- Recent activity: Timeline of recent actions
- Quick actions: Large buttons for "Create Event", "Add Sponsor", "View Leads"
- Charts: Revenue trend, sponsor growth (line/bar charts)
- Visual: Clean cards, good spacing, professional
- Color: Purple accents, cream background
```

#### Screen: Booking System

**Current:** Basic booking interface  
**Improvements:**

codeCode

```
Redesign booking system with:
- Wizard steps: Clear progress indicator (Step X of 13)
- Step content: Large, readable form fields
- Price sidebar: Sticky price calculator on right
- Navigation: Clear "Back" and "Continue" buttons
- Visual feedback: Selected options highlighted
- Responsive: Mobile-optimized, touch-friendly
```

#### Screen: Lead Generation Inbox

**Current:** List of leads  
**Improvements:**

codeCode

```
Enhance lead inbox with:
- Filters: Status, date, source filters at top
- Lead cards: Avatar, name, company, status badge, actions
- Bulk actions: Select multiple, bulk update
- Search: Full-width search bar
- Empty state: "No leads yet" with CTA
- Visual: Clean list, easy to scan
```

#### Screen: Event Opportunities

**Current:** Event listing  
**Improvements:**

codeCode

```
Redesign event opportunities:
- Grid layout: 3-column grid of event cards
- Event cards: Image, title, date, location, match score
- Filters: Event type, date range, location
- Sort: By date, relevance, match score
- Visual: High-quality images, clear typography
```

#### Screen: Package Builder

**Current:** Package creation form  
**Improvements:**

codeCode

```
Enhance package builder:
- Visual builder: Drag-and-drop components
- Preview: Live preview of package card
- Pricing: Real-time price calculation
- Templates: Pre-built package templates
- Visual: Interactive, intuitive, visual
```

---

## 11. 🎯 Google Studio (Gemini) Design Prompts

### Prompt 26: Complete Page Design

codeCode

```
Using Google Studio, design a complete [PAGE_NAME] page for FashionOS:

Context: FashionOS is a premium fashion production booking platform. 
Style: Minimalist luxury, editorial aesthetic, "Airbnb for Fashion"

Requirements:
- Layout: [DESCRIBE LAYOUT STRUCTURE]
- Sections: [LIST SECTIONS]
- Components: [LIST COMPONENTS]
- Colors: Black (#0A0A0A), Purple (#C084FC), Cream (#FBF8F5)
- Typography: Playfair Display (headings), Inter (body)
- Responsive: Mobile-first, breakpoints at 768px and 1024px
- Visual style: Clean, spacious, high-fashion

Generate:
1. Wireframe layout
2. Component structure
3. Color application
4. Typography hierarchy
5. Spacing system
6. Responsive breakpoints
```

### Prompt 27: Component Design

codeCode

```
Design a [COMPONENT_NAME] component for FashionOS:

Purpose: [COMPONENT_PURPOSE]
Context: Used in [WHERE_IT_APPEARS]

Requirements:
- Visual: [DESCRIBE VISUAL STYLE]
- States: Default, Hover, Active, Disabled
- Variants: [LIST VARIANTS]
- Responsive: [MOBILE/DESKTOP BEHAVIOR]
- Accessibility: Proper contrast, keyboard navigation

Generate:
1. Component structure
2. Visual design
3. State variations
4. Responsive behavior
5. Accessibility features
```

### Prompt 28: Visual Enhancement

codeCode

```
Enhance the visual design of [PAGE/COMPONENT]:

Current: [DESCRIBE CURRENT STATE]
Goal: [DESCRIBE DESIRED IMPROVEMENT]

Improvements needed:
- [IMPROVEMENT 1]
- [IMPROVEMENT 2]
- [IMPROVEMENT 3]

Style guidelines:
- Maintain minimalist luxury aesthetic
- Use FashionOS color palette
- Follow typography system
- Ensure responsive design

Generate enhanced design with:
1. Improved visual hierarchy
2. Better spacing
3. Enhanced color usage
4. Refined typography
5. Better component composition
```

---

## 12. 📐 Wireframe & Mock Data Prompts

### Prompt 29: Wireframe Generation

codeCode

```
Create a wireframe for [PAGE_NAME]:

Structure:
- Header: [DESCRIBE HEADER]
- Main content: [DESCRIBE MAIN AREA]
- Sidebar: [DESCRIBE SIDEBAR IF ANY]
- Footer: [DESCRIBE FOOTER]

Components:
- [COMPONENT 1]: [DESCRIPTION]
- [COMPONENT 2]: [DESCRIPTION]
- [COMPONENT 3]: [DESCRIPTION]

Layout:
- Grid system: [DESCRIBE GRID]
- Spacing: [DESCRIBE SPACING]
- Responsive: [MOBILE/DESKTOP LAYOUTS]

Generate wireframe showing:
1. Layout structure
2. Component placement
3. Spacing relationships
4. Responsive breakpoints
```

### Prompt 30: Mock Data Structure

codeCode

```
Generate mock data structure for [COMPONENT/PAGE]:

Data needed:
- [DATA_TYPE_1]: [FIELDS]
- [DATA_TYPE_2]: [FIELDS]
- [DATA_TYPE_3]: [FIELDS]

Examples:
- Realistic fashion industry data
- Proper relationships between entities
- Varied states (active, pending, completed)
- Appropriate dates and timestamps

Generate:
1. Data structure (TypeScript interface)
2. 5-10 mock data examples
3. Edge cases (empty, loading, error)
4. Relationships between data
```

---

## 13. 🎨 Visual Flow & Diagram Suggestions

### For Booking Flow

codeCode

```
Create a visual flowchart showing:
- 13-step booking wizard flow
- Decision points (payment required?)
- State transitions (draft → confirmed)
- User actions at each step
- System responses
- Visual: Clean arrows, clear labels, color-coded states
```

### For User Journey

codeCode

```
Design user journey visualization:
- Entry point: How user arrives
- Steps: Each major action
- Emotions: How user feels at each step
- Pain points: Where friction occurs
- Opportunities: Where to improve
- Visual: Timeline with icons, color-coded emotions
```

### For Component Hierarchy

codeCode

```
Create component tree diagram:
- Page level: Main page component
- Section level: Major sections
- Component level: Reusable components
- Element level: Basic UI elements
- Visual: Tree structure, color-coded by level
```

---

## 14. 🚀 Quick Design Prompt Templates

### Template 1: Page Design

codeCode

```
Design [PAGE_NAME] page:
- Purpose: [PAGE_PURPOSE]
- Users: [TARGET_USERS]
- Layout: [LAYOUT_TYPE]
- Sections: [LIST SECTIONS]
- Components: [LIST COMPONENTS]
- Responsive: [MOBILE/DESKTOP]
- Style: Minimalist luxury, FashionOS brand
```

### Template 2: Component Design

codeCode

```
Create [COMPONENT_NAME]:
- Purpose: [COMPONENT_PURPOSE]
- Props: [PROPS_LIST]
- States: [STATES_LIST]
- Variants: [VARIANTS_LIST]
- Responsive: [BEHAVIOR]
- Style: [STYLE_GUIDELINES]
```

### Template 3: Enhancement

codeCode

```
Improve [ELEMENT]:
- Current: [CURRENT_STATE]
- Issues: [ISSUES_LIST]
- Goals: [IMPROVEMENT_GOALS]
- Constraints: [CONSTRAINTS]
- Style: Maintain FashionOS aesthetic
```

---

## 15. ✅ Design Checklist

### Before Design

Understand page purpose and user goals

Review existing design system tokens

Check responsive requirements

Identify key components needed

### During Design

Follow color palette and typography

Maintain consistent spacing

Ensure accessibility (contrast, keyboard nav)

Design mobile-first, then desktop

Include loading and error states

### After Design

Test responsive breakpoints

Verify accessibility

Check visual hierarchy

Ensure consistency with other pages

Get feedback and iterate

---

## 16. 🎯 Multistep Design Process

### Step 1: Wireframe

codeCode

```
Create wireframe for [PAGE]:
- Layout structure
- Component placement
- Content hierarchy
- No colors, just structure
```

### Step 2: Visual Design

codeCode

```
Apply visual design to wireframe:
- Color palette
- Typography
- Spacing system
- Component styling
```

### Step 3: Responsive Design

codeCode

```
Create responsive versions:
- Mobile layout (320px+)
- Tablet layout (768px+)
- Desktop layout (1024px+)
```

### Step 4: Component Details

codeCode

```
Design component states:
- Default state
- Hover state
- Active state
- Disabled state
- Error state
```

### Step 5: Polish & Refine

codeCode

```
Final refinements:
- Micro-interactions
- Animations
- Loading states
- Empty states
- Error handling
```

---

## 17. 🚀 Google AI Studio: Phase 1 Implementation Plan Prompts

**Purpose:** Simple multistep prompts to paste into Google AI Studio (Gemini) to generate Phase 1 implementation plan  
**Usage:** Copy and paste prompts in order, one at a time

---

### 🟢 Prompt 1: High-Level Phase 1 Plan

codeCode

```
You are a senior full-stack architect helping me design Phase 1 of a new feature inside my existing app.

Project: FashionOS – Fashion Event Management & Shoot Booking Platform
Tech Stack: React 19 + TypeScript + Vite + Supabase + Stripe + Gemini API
Repo: https://github.com/amo-tech-ai/fashionos100.git

I want you to create a clear, step-by-step Phase 1 implementation plan for the Shoot Booking System.

Focus only on the most important, realistic work for Phase 1 (MVP that can take real bookings):

- Database schema & security
- Core Edge Functions (briefs, pricing, payments)
- Basic booking wizard (13 phases, but simple versions)
- Stripe payment flow (test mode only)
- Minimal testing & QA

For Phase 1, do not design final UX polish or complex automation.

Output format:
1. Overview (what Phase 1 delivers)
2. Week-by-week breakdown (4 weeks total)
3. Key deliverables per week
4. Success criteria
5. Technical requirements
```

### 🟢 Prompt 2: Database Schema Details

codeCode

```
Based on the Phase 1 plan, create detailed database schema requirements:

Focus on:
- Core tables needed for MVP (shoots, payments, briefs)
- Essential columns only (no nice-to-haves)
- RLS policies for security
- Indexes for performance
- Migration file structure

Reference the existing schema at docs/services/03-shoot-schema.md for context.

Output:
1. List of tables with key columns
2. Relationships between tables
3. RLS policy requirements
4. Essential indexes
5. Migration file naming convention
```

### 🟢 Prompt 3: Edge Functions Specification

codeCode

```
Define the Edge Functions needed for Phase 1:

Required functions:
1. polish-brief (enhance user brief with Gemini AI)
2. calculate-shoot-price (real-time pricing)
3. create-shoot-payment (Stripe integration)

For each function, specify:
- Input parameters (TypeScript interface)
- Output format (response structure)
- Error handling
- Gemini AI integration (if applicable)
- Database operations

Output:
1. Function signatures
2. Request/response types
3. Integration points (Gemini, Stripe, Supabase)
4. Error scenarios
5. Testing approach
```

### 🟢 Prompt 4: Frontend Component Structure

codeCode

```
Design the frontend component structure for Phase 1 booking wizard:

Requirements:
- 13-phase wizard (simplified versions for MVP)
- Real-time price updates
- AI brief polishing UI
- Stripe checkout integration
- Basic form validation

Component structure:
- BookingWizard (main container)
- WizardStep (reusable step component)
- PriceSummary (sidebar component)
- BriefPolisher (AI integration component)

Output:
1. Component hierarchy
2. Props interfaces
3. State management approach
4. Routing structure
5. Key user interactions
```

### 🟢 Prompt 5: Stripe Payment Flow

codeCode

```
Design the Stripe payment integration for Phase 1:

Requirements:
- Test mode only (no live payments)
- Payment intent creation
- Webhook handling
- Payment status updates
- Error handling

Flow:
1. User completes wizard
2. Create payment intent
3. Redirect to Stripe Checkout
4. Handle webhook
5. Update booking status

Output:
1. Payment flow diagram
2. Edge function for payment creation
3. Webhook handler structure
4. Database updates needed
5. Error handling strategy
```

### 🟢 Prompt 6: Testing & QA Checklist

codeCode

```
Create a Phase 1 testing checklist:

Focus on:
- Critical path testing (happy path)
- Payment flow testing
- AI integration testing
- Basic error handling
- Responsive design (mobile/desktop)

Skip for Phase 1:
- Comprehensive edge cases
- Performance testing
- Security audit
- Accessibility audit

Output:
1. Test scenarios list
2. Manual testing checklist
3. Key metrics to verify
4. Known limitations
5. Phase 2 testing priorities
```

### 🟢 Prompt 7: Implementation Timeline

codeCode

```
Create a realistic 4-week Phase 1 timeline:

Week 1: Database & Core Setup
Week 2: Edge Functions & API
Week 3: Frontend Wizard
Week 4: Payment Integration & Testing

For each week, specify:
- Daily tasks (if possible)
- Dependencies
- Blockers to watch for
- Deliverables
- Success criteria

Output:
1. Week-by-week breakdown
2. Daily task list (if detailed)
3. Dependency graph
4. Risk factors
5. Buffer time recommendations
```

### 🟢 Prompt 8: Code Generation - Database Migration

codeCode

```
Generate the Phase 1 database migration file:

Based on the schema requirements, create a complete Supabase migration file:

File format: YYYYMMDDHHmmss_shoot_booking_phase1.sql

Include:
- Enums (shoot_service_type, shoot_status, payment_status)
- Core tables (shoots, payments, briefs)
- RLS policies (one per operation per role)
- Essential indexes
- Comments explaining each section

Follow Postgres best practices:
- snake_case naming
- Proper foreign keys
- Constraints where needed
- Comments for clarity

Output complete SQL migration file ready to use.
```

### 🟢 Prompt 9: Code Generation - Edge Functions

codeCode

```
Generate the three core Edge Functions for Phase 1:

1. polish-brief/index.ts
2. calculate-shoot-price/index.ts
3. create-shoot-payment/index.ts

For each function:
- Use Deno + TypeScript
- Include CORS headers
- Proper error handling
- TypeScript types
- Comments explaining logic

Reference existing functions in supabase/functions/ for patterns.

Output complete, production-ready code for all three functions.
```

### 🟢 Prompt 10: Code Generation - React Components

codeCode

```
Generate the core React components for Phase 1 booking wizard:

Components needed:
1. BookingWizard.tsx (main container)
2. WizardStep.tsx (reusable step wrapper)
3. PriceSummary.tsx (sidebar price display)
4. BriefPolisher.tsx (AI brief enhancement)

Requirements:
- TypeScript with proper types
- React hooks for state
- Responsive design (mobile-first)
- Loading and error states
- Integration with Edge Functions

Use existing components in src/components/ as reference.

Output complete, production-ready React components.
```

---

## 18. 📋 Quick Start: Using These Prompts

### Step-by-Step Process

1. **Open Google AI Studio:** [https://aistudio.google.com/](https://www.google.com/url?sa=E&q=https%3A%2F%2Faistudio.google.com%2F)
    
2. **Select Model:** Gemini 2.5 Flash or Gemini 3 Pro
    
3. **Start with Prompt 1:** Get high-level plan
    
4. **Continue sequentially:** Use prompts 2-10 in order
    
5. **Refine as needed:** Adjust based on outputs
    

### Tips for Best Results

- **Be specific:** Include context from existing codebase
    
- **Reference docs:** Mention relevant documentation files
    
- **Iterate:** Refine prompts based on previous outputs
    
- **Combine:** Use outputs from earlier prompts in later ones
    
- **Validate:** Check generated code against existing patterns
    

### Example Workflow

codeCode

```
1. Paste Prompt 1 → Get Phase 1 overview
2. Paste Prompt 2 → Get database schema details
3. Paste Prompt 8 → Generate migration file
4. Paste Prompt 3 → Get Edge Function specs
5. Paste Prompt 9 → Generate Edge Function code
6. Paste Prompt 4 → Get component structure
7. Paste Prompt 10 → Generate React components
8. Paste Prompt 5 → Get payment flow
9. Paste Prompt 6 → Get testing checklist
10. Paste Prompt 7 → Get final timeline
```

---

## 19. 📸 Ecommerce Photography Service Booking System

**Focus:** Simplified booking flow for ecommerce photography shoots  
**Target:** Fashion designers and brands needing product photography  
**Timeline:** Phase 1 MVP - 4 weeks

---

### 📊 Progress Task Tracker

|   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|
|Task Name|Short Description|Status|% Complete|✅ Confirmed|⚠️ Missing / Failing|💡 Next Action|
|**Route & Layout Setup**|Define routes and wrapper layout|🔴 Not Started|0%|—|—|Create ServiceBookingLayout|
|**State Management**|useBookingStore (Zustand/Context)|🔴 Not Started|0%|—|—|Setup global state for wizard|
|**Data Model & API Setup**|Supabase tables + API helpers|🔴 Not Started|0%|—|—|Run SQL migrations|
|**Pricing Engine**|Central calc function|🔴 Not Started|0%|—|—|Write calculateBookingTotal.ts|
|**Page: Landing**|Service selection & packages|🔴 Not Started|0%|—|—|Build StartProjectPage.tsx|
|**Page: Quantity**|Photo/Video count selector|🔴 Not Started|0%|—|—|Build StepQuantity.tsx|
|**Page: Scenes**|Scene selection grid|🔴 Not Started|0%|—|—|Build StepScenes.tsx|
|**Page: Models**|Model selection & details|🔴 Not Started|0%|—|—|Build StepModels.tsx|
|**Page: Upgrades**|Add-ons (styling, steaming)|🔴 Not Started|0%|—|—|Build StepUpgrades.tsx|
|**Page: Checkout**|Summary & Payment form|🔴 Not Started|0%|—|—|Build StepCheckout.tsx|
|**Page: Success**|Confirmation & Next Steps|🔴 Not Started|0%|—|—|Build BookingSuccessPage.tsx|
|**Admin View**|Internal dashboard for studio|🔴 Not Started|0%|—|—|Build DashboardStudio.tsx|
|**Mobile Responsiveness**|Sticky footers & touch targets|🔴 Not Started|0%|—|—|Test on mobile view|

---

### 🏗️ Route Structure & Folder Map

codeText

```
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

- /start-project (Landing)
    
- /start-project/quantity
    
- /start-project/scenes
    
- /start-project/models
    
- /start-project/upgrades
    
- /start-project/checkout
    
- /start-project/success
    

---

### 🎨 Design Style Guidelines

**Aesthetic:** Clean, minimal, fashion-inspired. Apple-store clarity meets Vogue editorial.

**Palette:**

- Backgrounds: #FBF8F5 (Cream), #FFFFFF (White)
    
- Text: #0A0A0A (Black), #525252 (Gray 600)
    
- Accent: #C084FC (Purple), #E87C4D (Orange)
    

**Typography:**

- Headings: Playfair Display
    
- Body/UI: Inter
    

**Components:**

- Cards: Rounded xl or 2xl, soft shadows shadow-sm, hover lift
    
- Buttons: Full rounded pills or slightly rounded rectangles. High contrast
    

**Mobile-First:**

- Sidebar moves to **Bottom Collapsible Sheet**
    
- Primary CTA fixed at bottom (z-50)
    
- Inputs 100% width
    

---

### 🧱 Detailed Screen Specifications

#### 🏠 Screen 1: Landing / Plan Your Shoot

**Route:** /start-project

**Design Prompt:**

codeCode

```
Design the landing page for ecommerce photography booking:

Header:
- Title: "Plan Your Ecommerce Shoot"
- Subtitle: "Build your own custom shoot or choose a discounted pack."

Main Content:
1. Build Your Own Grid (2 cards):
   - Photo Card: "From $39/photo"
     - Image: Product on pastel background
     - CTA: "Start Photo Shoot" button
   - Video Card: "From $93/clip"
     - Image: Motion blur/camera aesthetic
     - CTA: "Start Video Shoot" button

2. Discounted Packs Carousel:
   - Card: "Amazon A+ Pack ($999)"
   - Card: "Starter Pack ($837)"
   - Each card shows: Chip "🔥 Trending", List of deliverables
   - Horizontal scroll on mobile, grid on desktop

3. FAQ Accordion:
   - "Can I combine photo + video?"
   - "What's included?"
   - "How long does it take?"

Layout: Centered content, max-width 1200px, cream background
Visual: Clean cards, high-quality product images, clear CTAs
```

#### 📸 Screen 2: Quantity

**Route:** /start-project/quantity

**Design Prompt:**

codeCode

```
Design quantity selection screen:

Header:
- Title: "How many photos do you need?"

Main Content:
- Pill Selector (horizontal list):
  - [1-5] (1 hr) - Default
  - [6-10] (2 hr)
  - [11-15] (Most Popular) - Highlighted
  - [16-25] (3+ hr)

Visual Feedback:
- Show estimated shoot duration below selection
- Animate selection with purple highlight
- Update sidebar price in real-time

Sidebar (Desktop):
- "Estimated Total" section
- Breakdown: Base price × quantity
- Live price updates

Mobile:
- Quantity selector full-width
- Price summary in bottom sheet
- Continue button fixed at bottom
```

#### 🎬 Screen 3: Scene Selection

**Route:** /start-project/scenes

**Design Prompt:**

codeCode

```
Design scene selection screen:

Header:
- Title: "Choose Your Scenes"
- Subtitle: "Pick 1-2 scenes. Customize details later."

Main Content:
1. Filter Tabs (horizontal scroll on mobile):
   - All, Flat Lay, Lifestyle, Kitchen, Bathroom

2. Scene Grid (3 columns desktop, 2 tablet, 1 mobile):
   - Large Aspect Ratio Cards (4:3)
   - Image: High-res example of the scene
   - Label: "White Cyclorama", "Modern Kitchen", "Pink Tile Bath"
   - Action: "+ Add" toggle button
   - Selected: Changes to "Added" with checkmark, purple border

Visual:
- High-quality scene photos
- Clear selection states
- Smooth hover effects
- Selected count indicator
```

#### 🧍 Screen 4: Model Selection

**Route:** /start-project/models

**Design Prompt:**

codeCode

```
Design model selection screen:

Header:
- Title: "Add a Model"
- Subtitle: "Elevate your product with human touch."

Main Content:
1. Model Type Cards (3 cards in row):
   - Hand Model ($237)
     - Image: Hand holding product
     - Description: "Perfect for jewelry, accessories"
   - Full Body ($477)
     - Image: Fashion fit/model
     - Description: "Complete outfit styling"
   - Pet Model ($297)
     - Image: Dog/cat with product
     - Description: "Pet-friendly products"

2. Configuration (when card selected):
   - Expand quantity counter below
   - Show total price for model type
   - Option to remove

Visual:
- Professional model photography
- Clear pricing display
- Easy selection/deselection
```

#### 🎒 Screen 5: Upgrades

**Route:** /start-project/upgrades

**Design Prompt:**

codeCode

```
Design upgrades/add-ons screen:

Header:
- Title: "Add Upgrades"

Main Content:
- Upgrade Grid (2 columns desktop, 1 mobile):
  - Styling ($447) - Icon: Scissors/clothes
  - Hair & Makeup ($299) - Icon: Brush
  - Steaming ($39) - Icon: Steam
  - BTS Video ($186) - Icon: Camera

Card Style:
- Small icon + Title + Price
- Simple toggle selection
- Selected: Purple background, white text
- Unselected: White background, black text, border

Visual:
- Minimalist icons
- Clear pricing
- Easy toggling
```

#### 🧾 Screen 6: Checkout

**Route:** /start-project/checkout

**Design Prompt:**

codeCode

```
Design checkout/review screen:

Header:
- Title: "Review & Book"

Layout (2 columns desktop, stacked mobile):
- Left Column (Forms):
  - Contact Info Section:
    - Name, Email, Company (required)
    - Phone (optional)
  - Billing Address Section:
    - Street, City, State, ZIP, Country
  - Payment Details Section:
    - Stripe Element integration
    - Card number, expiry, CVC
  - "How did you hear about us?" dropdown

- Right Column (Sticky Summary):
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

Visual:
- Clean form layout
- Clear price breakdown
- Secure payment indicator
- Loading state during payment
```

#### 🎉 Screen 7: Success

**Route:** /start-project/success

**Design Prompt:**

codeCode

```
Design booking success/confirmation page:

Hero Section:
- Large checkmark icon (green)
- Title: "You're booked! Order #12345"
- Subtitle: "We've sent a confirmation email"

Next Steps Section:
- "Ship your products to:" with address
- Shipping instructions
- Expected delivery date
- Production timeline

Actions:
- "Download Invoice" button (secondary)
- "Go to Dashboard" button (primary)
- "Book Another Shoot" link

Visual:
- Celebration aesthetic
- Clear next steps
- Professional confirmation
```

---

### 🗄️ Database Schema & Data Model

**Design Prompt for Database:**

codeCode

```
Create database schema for ecommerce photography booking system:

Core Tables:
1. bookings:
   - id (uuid, primary key)
   - user_id (uuid, nullable for guests)
   - status (enum: draft, paid, shooting, completed, cancelled)
   - total_amount (integer, cents)
   - currency (text, default 'usd')
   - contact_name, contact_email, contact_phone
   - billing_address (jsonb)
   - created_at, updated_at

2. booking_items:
   - id (uuid, primary key)
   - booking_id (uuid, foreign key)
   - type (enum: photo, video, scene, model, upgrade)
   - item_id (uuid, references scenes/models/upgrades)
   - quantity (integer)
   - price_at_booking (integer, cents)
   - created_at

3. scenes:
   - id (uuid, primary key)
   - name (text)
   - category (text: flat_lay, lifestyle, kitchen, bathroom)
   - image_url (text)
   - price (integer, cents)
   - is_active (boolean)
   - created_at

4. models:
   - id (uuid, primary key)
   - type (enum: hand, full_body, pet)
   - name (text)
   - price (integer, cents)
   - image_url (text)
   - is_active (boolean)
   - created_at

5. upgrades:
   - id (uuid, primary key)
   - name (text)
   - description (text)
   - price (integer, cents)
   - icon (text)
   - is_active (boolean)
   - created_at

Include:
- Proper foreign keys
- RLS policies (users see own bookings)
- Indexes for performance
- Timestamps
```

---

### 💳 Business Logic & Pricing Engine

**Design Prompt for Pricing:**

codeCode

```
Create pricing calculation engine:

File: lib/pricing.ts

Function: calculateBookingTotal(state)

Inputs:
- photoCount: number
- videoCount: number (optional)
- scenes: array of scene objects
- models: array of model objects (with quantity)
- upgrades: array of upgrade objects

Pricing Rules:
- Base photo: $39 per photo
- Base video: $93 per clip
- Scenes: $0 (included, but can add premium scenes later)
- Models: Hand ($237), Full Body ($477), Pet ($297)
- Upgrades: Styling ($447), Hair & Makeup ($299), Steaming ($39), BTS ($186)

Outputs:
- subtotal: number
- tax: number (calculate based on location)
- total: number
- lineItems: array (for display in summary)
  - Each item: { type, name, quantity, unitPrice, total }

Validation:
- canGoToScenes(): Must have photoCount > 0 or videoCount > 0
- canGoToCheckout(): Must have at least 1 scene selected
- validateContactInfo(): All required fields filled

Include:
- TypeScript types
- Error handling
- Edge cases (zero quantities, etc.)
```

---

### 🧑‍🍳 Admin / Studio View

**Design Prompt:**

codeCode

```
Design studio admin dashboard for managing bookings:

Route: /dashboard/studio

Layout:
- Kanban Board (5 columns):
  - Incoming (new bookings)
  - Products Received (items shipped)
  - Shooting (in progress)
  - Editing (post-production)
  - Delivered (completed)

Features:
1. Booking Cards (draggable):
   - Order number
   - Client name
   - Photo count
   - Due date
   - Status badge

2. Booking Detail Modal (on click):
   - Full booking details
   - Scenes requested (with images)
   - Models requested
   - Upgrades checklist
   - Production notes
   - Status actions (move to next stage)

3. Status Actions:
   - "Mark Products Received" button
   - "Start Shooting" button
   - "Move to Editing" button
   - "Mark Delivered" button
   - Each action triggers email notification

Visual:
- Clean kanban interface
- Color-coded statuses
- Easy drag-and-drop
- Clear action buttons
```

---

### 🎯 Google Studio Prompts for This System

#### Prompt: Complete Booking Wizard Design

codeCode

```
Design a complete 7-step booking wizard for ecommerce photography:

Context: FashionOS booking system for product photography
Style: Minimalist luxury, Apple-store clarity

Steps:
1. Landing: Service selection (Photo/Video) + Package carousel
2. Quantity: Photo count selector with pricing
3. Scenes: Scene selection grid with filters
4. Models: Model type selection with quantity
5. Upgrades: Add-on selection grid
6. Checkout: Review + Payment form
7. Success: Confirmation page

Requirements:
- Progress indicator (Step X of 7)
- Sticky price sidebar (desktop) / Bottom sheet (mobile)
- Real-time price updates
- Clean, spacious layout
- Mobile-first responsive design
- FashionOS color palette (black, purple, cream)

Generate:
1. Complete wireframe for all 7 steps
2. Component structure
3. State management approach
4. Responsive breakpoints
5. User flow diagram
```

#### Prompt: Pricing Engine Implementation

codeCode

```
Create a pricing calculation system for ecommerce photography bookings:

Input: Booking state (photos, scenes, models, upgrades)
Output: Itemized pricing breakdown

Rules:
- Base pricing: $39/photo, $93/video
- Models: Hand ($237), Full Body ($477), Pet ($297)
- Upgrades: Various prices
- Tax calculation: Based on billing address

Generate:
1. TypeScript pricing function
2. Type definitions
3. Validation logic
4. Error handling
5. Test cases
```

--- update service-plan.md doc

Gemini 3 Pro PreviewRan for 50s

lightbulbThought for 50 seconds

specification  
The user wants to update docs/service-plan.md to become a comprehensive **FashionOS Design & Service Master Plan**.

**Changes:**

1. **Update docs/service-plan.md**:
    
    - Add a **Master Progress Tracker** at the very top.
        
    - Include the **Design System & Prompts** (Sitemap, Tokens, Page-specific design prompts for Google Studio).
        
    - Include **Implementation Prompts** (Multistep prompts for AI to generate code/db schemas).
        
    - Include the detailed **Ecommerce Photography Service Booking System** plan (routes, schema, pricing engine, admin view) which was previously the whole file, now integrated as a specific module.
        
    - Include **Success Criteria** and **Production Checklists** within the prompts and plan sections.
        

This effectively merges the visual design guide with the technical implementation plan into one source of truth.

# Updated files:

## docs/service-plan.md

<change>  
<file>docs/service-plan.md</file>  
<description>Updated service plan to include comprehensive Design System, AI Prompts, and detailed implementation steps for the Booking System.</description>  
<content><![CDATA[  
# 🎨 FashionOS Design & Service Master Plan  

**Status:** 🟡 In Progress  
**Priority:** High  
**Objective:** Implement the "Airbnb for Fashion" Service Booking System while establishing a premium, scalable Design System.

---

## 📊 Master Progress Tracker

|   |   |   |   |   |
|---|---|---|---|---|
|Module / Task|Status|% Complete|Priority|Owner|
|**1. Design System Foundation**|||||
|Design Tokens (Colors, Typo)|🟢 Completed|100%|P0|Design|
|Base Components (Button, Card)|🟢 Completed|100%|P0|Frontend|
|Layouts (Public, Dashboard)|🟢 Completed|100%|P0|Frontend|
|**2. Service Booking System (MVP)**|||||
|Database Schema (Shoots, Items)|🔴 Not Started|0%|P0|Backend|
|Edge Functions (Pricing, Briefs)|🔴 Not Started|0%|P0|Backend|
|Booking Wizard UI (7 Steps)|🔴 Not Started|0%|P0|Frontend|
|Stripe Integration (Test Mode)|🔴 Not Started|0%|P1|Backend|
|Studio Admin Dashboard|🔴 Not Started|0%|P2|Frontend|
|**3. Public Marketing Pages**|||||
|Services Landing Pages|🟡 In Progress|60%|P2|Frontend|
|Directory & Profiles|🟢 Completed|100%|P2|Frontend|
|Contact & About|🟢 Completed|100%|P3|Frontend|

---

## 📋 Sitemap Structure

### Public Routes

- / - Home
    
- /services - Services Overview
    
- /services/photography - Photography Service
    
- /services/video-production - Video Service
    
- /services/ecommerce - E-commerce Service
    
- /services/social - Social Media Service
    
- /directory - Designer Directory
    
- /designers/:id - Designer Profile
    
- /events - Events Listing
    
- /pricing - Pricing Page
    
- /about - About Page
    
- /contact - Contact Page
    
- /start-project - Booking Wizard Entry (The "Airbnb" Flow)
    

### Dashboard Routes (Authenticated)

- /dashboard - Overview
    
- /dashboard/bookings - Bookings List (Client View)
    
- /dashboard/calendar - Calendar View
    
- /dashboard/events - Events Manager
    
- /dashboard/financials - Financial Dashboard
    
- /dashboard/gallery - Media Gallery
    
- /dashboard/leads - Lead Management
    
- /dashboard/sponsors - Sponsor Management
    
- /dashboard/packages - Package Builder
    
- /dashboard/contracts - Contracts
    
- /dashboard/activations - Activations
    
- /dashboard/media - Media Deliverables
    
- /dashboard/roi - ROI Analytics
    
- /dashboard/portal - Sponsor Portal
    
- /dashboard/studio - Studio Admin View (Incoming Shoots)
    

---

## 🎨 Design System Tokens

### Colors

- **Primary:** #0A0A0A (Fashion Black)
    
- **Accent:** #C084FC (Fashion Purple)
    
- **Background:** #FBF8F5 (Fashion Cream)
    
- **Success:** #10B981 (Emerald)
    
- **Error:** #EF4444 (Red)
    

### Typography

- **Headings:** Playfair Display (Serif)
    
- **Body:** Inter (Sans-serif)
    
- **Sizes:** 12px (labels), 16px (body), 32px (H2), 48px (H1)
    

### Spacing

- **Container:** max-width 1600px, padding 24px (mobile) / 48px (desktop)
    
- **Cards:** 16px border-radius, 1px border, white background
    
- **Gaps:** 16px (small), 24px (medium), 48px (large)
    

---

## 1. 🏠 Home Page (/)

### Prompt 1: Hero Section Design

codeCode

```
Design a hero section for FashionOS homepage with:
- Split layout: Left side text, right side video/image
- Headline: "Book a fashion shoot in days, not weeks"
- Subheadline: "Editorial quality photo & video tailored to your collection"
- Primary CTA: "Start Your Shoot" button (black background, white text)
- Secondary CTA: "View Pricing" link
- Background: Warm cream (#FBF8F5)
- Typography: Playfair Display for headline, Inter for body
- Responsive: Stack on mobile, side-by-side on desktop
- Visual: Right side shows cinematic studio shoot video loop
```

### Prompt 2: Feature Cards Section

codeCode

```
Create a 3-column feature card grid:
- Card 1: "Unified Dashboard" with icon, title, description
- Card 2: "Global Directory" with icon, title, description
- Card 3: "AI-Powered Briefs" with icon, title, description
- Cards: White background, subtle shadow, hover effect (scale 1.01)
- Spacing: 48px gap between cards
- Icons: Minimalist line icons, purple accent color
- Responsive: 1 column mobile, 3 columns desktop
```

### Prompt 3: Testimonials Section

codeCode

```
Design testimonials section:
- 3 testimonial cards in a row
- Each card: Quote text, author name, role, company logo
- Background: White cards on cream background
- Typography: Italic serif for quotes, bold sans-serif for names
- Layout: Horizontal scroll on mobile, grid on desktop
- Visual: Subtle quote marks, elegant spacing
```

---

## 2. 📸 Services Pages (/services/*)

### Prompt 4: Service Overview Layout

codeCode

```
Design a service page template with:
- Hero section: Large title, short description, CTA button
- Service features: 4-column grid of feature cards
- Pricing preview: 3 pricing tiers (Basic, Pro, Enterprise)
- Portfolio gallery: Image grid (3 columns, aspect ratio 4:3)
- CTA section: "Ready to start?" with booking button
- Color scheme: Black text, purple accents, cream background
- Responsive: Single column mobile, multi-column desktop
```

### Prompt 5: Photography Service Page

codeCode

```
Create photography service page:
- Hero: "Editorial & E-commerce Photography" headline
- Service types: Cards for "Lookbook", "E-commerce", "Editorial"
- Process: 4-step visual timeline (1. Book, 2. Shoot, 3. Edit, 4. Deliver)
- Portfolio: Masonry grid of photography examples
- Pricing calculator: Interactive widget showing price based on looks
- Visual style: Clean, minimalist, high-fashion aesthetic
```

---

## 3. 📚 Directory Page (/directory)

### Prompt 6: Directory Grid Layout

codeCode

```
Design designer directory page:
- Search bar: Full-width search with filters (location, style, category)
- Grid layout: 4-column grid of designer cards (desktop), 2-column (tablet), 1-column (mobile)
- Designer cards: Image (3:4 aspect ratio), name, location, tags, "View Profile" button
- Filters sidebar: Collapsible on mobile, always visible on desktop
- Pagination: Bottom pagination controls
- Loading states: Skeleton cards while loading
- Empty state: "No designers found" message with illustration
```

### Prompt 7: Designer Profile Card

codeCode

```
Create designer profile card component:
- Image: 3:4 aspect ratio, rounded corners, hover zoom effect
- Overlay: Designer name, location, aesthetic tags
- Hover state: Slight scale (1.02), shadow increase
- Tags: Small pill badges with purple accent
- CTA: "View Profile" button (transparent with border)
- Responsive: Full width mobile, fixed width desktop
```

---

## 4. 🎯 Booking Wizard (/start-project)

### Prompt 8: Wizard Step Layout

codeCode

```
Design multi-step booking wizard:
- Progress indicator: Top progress bar showing "Step X of 13"
- Main content: Centered card (max-width 800px) with step content
- Navigation: "Back" and "Continue" buttons at bottom
- Sidebar: Price summary (sticky on desktop, collapsible on mobile)
- Visual: Clean white card on cream background
- Typography: Large headings (32px), readable body (16px)
- Responsive: Full width mobile, centered card desktop
```

### Prompt 9: Service Type Selection

codeCode

```
Create service type selection screen:
- 3 large cards in a row: "Photography", "Video", "Hybrid"
- Each card: Icon, title, description, "Best Value" badge (for Hybrid)
- Selected state: Purple border (2px), light purple background (#F3E8FF)
- Hover state: Subtle shadow, slight scale
- Toggle: "Virtual" vs "In-Person" pill toggle below cards
- Visual: Minimalist icons, elegant spacing
```

### Prompt 10: Quantity & Pricing Step

codeCode

```
Design quantity selection with real-time pricing:
- Segmented control: "1-3 Looks", "4-8 Looks", "9-15 Looks", "16+ Looks"
- Price display: Large price number (48px), breakdown below
- Visual feedback: Selected option highlighted in purple
- Sidebar: Live price calculator showing base + add-ons
- Animation: Smooth price update transition
- Responsive: Horizontal scroll on mobile, full width desktop
```

### Prompt 11: AI Brief Polisher UI

codeCode

```
Create AI brief polishing interface:
- Textarea: Large input field for user's rough brief
- "Polish with AI" button: Purple button with sparkle icon
- Loading state: Skeleton text, spinner, "AI is polishing your brief..."
- Result: Side-by-side comparison (Original | Polished)
- Actions: "Use This", "Edit", "Try Again"
- Visual: Clean typography, good contrast, readable
```

---

## 5. 📊 Dashboard Pages (/dashboard/*)

### Prompt 12: Dashboard Overview Layout

codeCode

```
Design dashboard overview page:
- Header: Welcome message, quick stats (4 KPI cards)
- Main grid: 2-column layout (desktop), 1-column (mobile)
- Left column: Recent bookings list, calendar widget
- Right column: Revenue chart, upcoming events
- Cards: White background, subtle shadow, rounded corners
- Typography: Clear hierarchy, readable numbers
- Responsive: Stack columns on mobile
```

### Prompt 13: Bookings List Page

codeCode

```
Create bookings list/table:
- Filters: Status, date range, search bar
- Table: Columns (Date, Client, Type, Status, Actions)
- Status badges: Color-coded (draft=gray, confirmed=green, etc.)
- Actions: View, Edit, Cancel buttons per row
- Empty state: "No bookings yet" with CTA
- Pagination: Bottom controls
- Responsive: Card view on mobile, table on desktop
```

### Prompt 14: Calendar View

codeCode

```
Design calendar dashboard:
- Month view: Large calendar grid with bookings marked
- Sidebar: List of bookings for selected date
- Booking cards: Color-coded by status, time, client name
- Navigation: Month/year selector, today button
- Click interaction: Click date to see bookings
- Responsive: Full-width calendar, sidebar below on mobile
```

### Prompt 15: Financial Dashboard

codeCode

```
Create financial overview:
- Revenue chart: Line chart showing revenue over time
- KPI cards: Total revenue, pending payments, completed shoots
- Transaction list: Recent payments with status
- Filters: Date range, payment status
- Export button: "Export to CSV"
- Visual: Clean charts, clear numbers, professional
```

---

## 6. 🎪 Event Management Pages

### Prompt 16: Events Listing Page

codeCode

```
Design events listing:
- Grid layout: 3-column grid of event cards
- Event cards: Featured image, title, date, location, status badge
- Filters: Event type, date range, status
- Create button: Floating action button (purple)
- Empty state: "Create your first event" with illustration
- Responsive: 1 column mobile, 3 columns desktop
```

### Prompt 17: Event Wizard

codeCode

```
Create event creation wizard:
- Multi-step form: 5 steps (Details, Venue, Sponsors, Schedule, Review)
- Progress indicator: Step dots at top
- Form fields: Large inputs, clear labels, validation
- Image upload: Drag-and-drop area for event image
- Preview: Live preview of event card
- Responsive: Full-width form on mobile
```

---

## 7. 🎨 Visual Components

### Prompt 18: Card Component Design

codeCode

```
Design reusable card component:
- Base: White background, 16px border-radius, 1px border (#E5E7EB)
- Padding: 24px internal padding
- Hover: Shadow increase, border color change
- Variants: Default, Highlighted (purple border), Clickable (cursor pointer)
- Content: Flexible content area, optional footer
- Responsive: Full width mobile, fixed width desktop
```

### Prompt 19: Button Components

codeCode

```
Create button system:
- Primary: Black background (#0A0A0A), white text, uppercase, 4px radius
- Secondary: White background, black border, black text
- Accent: Purple background (#C084FC), white text
- Sizes: Small (32px), Medium (40px), Large (56px)
- States: Default, Hover, Active, Disabled
- Icons: Optional left/right icons
```

### Prompt 20: Input Components

codeCode

```
Design form input system:
- Text input: 56px height, transparent/white background, bottom border
- Labels: 12px uppercase, letter-spacing, gray color
- Placeholder: Light gray, italic
- Focus: Purple border, subtle glow
- Error: Red border, error message below
- Success: Green border, checkmark icon
```

---

## 8. 📱 Responsive Design Patterns

### Prompt 21: Mobile-First Layout

codeCode

```
Design responsive layout system:
- Breakpoints: Mobile (320px), Tablet (768px), Desktop (1024px+)
- Mobile: Single column, full-width, stacked sections
- Tablet: 2-column grid, larger spacing
- Desktop: Multi-column, max-width container (1600px)
- Navigation: Hamburger menu mobile, full nav desktop
- Cards: Full width mobile, fixed width desktop
```

### Prompt 22: Responsive Typography

codeCode

```
Create responsive typography scale:
- Mobile H1: 32px
- Desktop H1: 48px
- Mobile Body: 14px
- Desktop Body: 16px
- Line heights: 1.2 (headings), 1.6 (body)
- Responsive: Use clamp() for fluid scaling
```

---

## 9. 🚀 Google AI Studio: Phase 1 Implementation Plan Prompts

**Purpose:** Simple multistep prompts to paste into Google AI Studio (Gemini) to generate code & plans.  
**Usage:** Copy and paste prompts in order, one at a time.

---

### 🟢 Prompt 1: High-Level Phase 1 Plan

codeCode

```
You are a senior full-stack architect helping me design Phase 1 of a new feature inside my existing app.

Project: FashionOS – Fashion Event Management & Shoot Booking Platform
Tech Stack: React 19 + TypeScript + Vite + Supabase + Stripe + Gemini API
Repo: https://github.com/amo-tech-ai/fashionos100.git

I want you to create a clear, step-by-step Phase 1 implementation plan for the Shoot Booking System.

Focus only on the most important, realistic work for Phase 1 (MVP that can take real bookings):

- Database schema & security
- Core Edge Functions (briefs, pricing, payments)
- Basic booking wizard (13 phases, but simple versions)
- Stripe payment flow (test mode only)
- Minimal testing & QA

For Phase 1, do not design final UX polish or complex automation.

Output format:
1. Overview (what Phase 1 delivers)
2. Week-by-week breakdown (4 weeks total)
3. Key deliverables per week
4. Success criteria
5. Technical requirements
```

### 🟢 Prompt 2: Database Schema Details

codeCode

```
Based on the Phase 1 plan, create detailed database schema requirements:

Focus on:
- Core tables needed for MVP (shoots, payments, briefs)
- Essential columns only (no nice-to-haves)
- RLS policies for security
- Indexes for performance
- Migration file structure

Reference the existing schema at docs/services/03-shoot-schema.md for context.

Output:
1. List of tables with key columns
2. Relationships between tables
3. RLS policy requirements
4. Essential indexes
5. Migration file naming convention
```

### 🟢 Prompt 3: Edge Functions Specification

codeCode

```
Define the Edge Functions needed for Phase 1:

Required functions:
1. polish-brief (enhance user brief with Gemini AI)
2. calculate-shoot-price (real-time pricing)
3. create-shoot-payment (Stripe integration)

For each function, specify:
- Input parameters (TypeScript interface)
- Output format (response structure)
- Error handling
- Gemini AI integration (if applicable)
- Database operations

Output:
1. Function signatures
2. Request/response types
3. Integration points (Gemini, Stripe, Supabase)
4. Error scenarios
5. Testing approach
```

### 🟢 Prompt 4: Frontend Component Structure

codeCode

```
Design the frontend component structure for Phase 1 booking wizard:

Requirements:
- 13-phase wizard (simplified versions for MVP)
- Real-time price updates
- AI brief polishing UI
- Stripe checkout integration
- Basic form validation

Component structure:
- BookingWizard (main container)
- WizardStep (reusable step component)
- PriceSummary (sidebar component)
- BriefPolisher (AI integration component)

Output:
1. Component hierarchy
2. Props interfaces
3. State management approach
4. Routing structure
5. Key user interactions
```

### 🟢 Prompt 5: Stripe Payment Flow

codeCode

```
Design the Stripe payment integration for Phase 1:

Requirements:
- Test mode only (no live payments)
- Payment intent creation
- Webhook handling
- Payment status updates
- Error handling

Flow:
1. User completes wizard
2. Create payment intent
3. Redirect to Stripe Checkout
4. Handle webhook
5. Update booking status

Output:
1. Payment flow diagram
2. Edge function for payment creation
3. Webhook handler structure
4. Database updates needed
5. Error handling strategy
```

### 🟢 Prompt 6: Testing & QA Checklist

codeCode

```
Create a Phase 1 testing checklist:

Focus on:
- Critical path testing (happy path)
- Payment flow testing
- AI integration testing
- Basic error handling
- Responsive design (mobile/desktop)

Skip for Phase 1:
- Comprehensive edge cases
- Performance testing
- Security audit
- Accessibility audit

Output:
1. Test scenarios list
2. Manual testing checklist
3. Key metrics to verify
4. Known limitations
5. Phase 2 testing priorities
```

---

## 10. 📸 Ecommerce Photography Service Booking System (Implementation Details)

**Focus:** Simplified booking flow for ecommerce photography shoots  
**Target:** Fashion designers and brands needing product photography  
**Timeline:** Phase 1 MVP - 4 weeks

---

### 📊 Module Progress Tracker

|   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|
|Task Name|Short Description|Status|% Complete|✅ Confirmed|⚠️ Missing / Failing|💡 Next Action|
|**Route & Layout Setup**|Define routes and wrapper layout|🔴 Not Started|0%|—|—|Create ServiceBookingLayout|
|**State Management**|useBookingStore (Zustand/Context)|🔴 Not Started|0%|—|—|Setup global state for wizard|
|**Data Model & API Setup**|Supabase tables + API helpers|🔴 Not Started|0%|—|—|Run SQL migrations|
|**Pricing Engine**|Central calc function|🔴 Not Started|0%|—|—|Write calculateBookingTotal.ts|
|**Page: Landing**|Service selection & packages|🔴 Not Started|0%|—|—|Build StartProjectPage.tsx|
|**Page: Quantity**|Photo/Video count selector|🔴 Not Started|0%|—|—|Build StepQuantity.tsx|
|**Page: Scenes**|Scene selection grid|🔴 Not Started|0%|—|—|Build StepScenes.tsx|
|**Page: Models**|Model selection & details|🔴 Not Started|0%|—|—|Build StepModels.tsx|
|**Page: Upgrades**|Add-ons (styling, steaming)|🔴 Not Started|0%|—|—|Build StepUpgrades.tsx|
|**Page: Checkout**|Summary & Payment form|🔴 Not Started|0%|—|—|Build StepCheckout.tsx|
|**Page: Success**|Confirmation & Next Steps|🔴 Not Started|0%|—|—|Build BookingSuccessPage.tsx|
|**Admin View**|Internal dashboard for studio|🔴 Not Started|0%|—|—|Build DashboardStudio.tsx|
|**Mobile Responsiveness**|Sticky footers & touch targets|🔴 Not Started|0%|—|—|Test on mobile view|

---

### 🏗️ Route Structure & Folder Map

codeText

```
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

- /start-project (Landing)
    
- /start-project/quantity
    
- /start-project/scenes
    
- /start-project/models
    
- /start-project/upgrades
    
- /start-project/checkout
    
- /start-project/success
    

---

### 🎨 Design Style Guidelines

**Aesthetic:** Clean, minimal, fashion-inspired. Apple-store clarity meets Vogue editorial.

**Palette:**

- Backgrounds: #FBF8F5 (Cream), #FFFFFF (White)
    
- Text: #0A0A0A (Black), #525252 (Gray 600)
    
- Accent: #C084FC (Purple), #E87C4D (Orange)
    

**Typography:**

- Headings: Playfair Display
    
- Body/UI: Inter
    

**Components:**

- Cards: Rounded xl or 2xl, soft shadows shadow-sm, hover lift
    
- Buttons: Full rounded pills or slightly rounded rectangles. High contrast
    

**Mobile-First:**

- Sidebar moves to **Bottom Collapsible Sheet**
    
- Primary CTA fixed at bottom (z-50)
    
- Inputs 100% width
    

---

### 🧱 Detailed Screen Specifications

#### 🏠 Screen 1: Landing / Plan Your Shoot

**Route:** /start-project

**Design Prompt:**

codeCode

```
Design the landing page for ecommerce photography booking:

Header:
- Title: "Plan Your Ecommerce Shoot"
- Subtitle: "Build your own custom shoot or choose a discounted pack."

Main Content:
1. Build Your Own Grid (2 cards):
   - Photo Card: "From $39/photo"
     - Image: Product on pastel background
     - CTA: "Start Photo Shoot" button
   - Video Card: "From $93/clip"
     - Image: Motion blur/camera aesthetic
     - CTA: "Start Video Shoot" button

2. Discounted Packs Carousel:
   - Card: "Amazon A+ Pack ($999)"
   - Card: "Starter Pack ($837)"
   - Each card shows: Chip "🔥 Trending", List of deliverables
   - Horizontal scroll on mobile, grid on desktop

3. FAQ Accordion:
   - "Can I combine photo + video?"
   - "What's included?"
   - "How long does it take?"

Layout: Centered content, max-width 1200px, cream background
Visual: Clean cards, high-quality product images, clear CTAs
```

#### 📸 Screen 2: Quantity

**Route:** /start-project/quantity

**Design Prompt:**

codeCode

```
Design quantity selection screen:

Header:
- Title: "How many photos do you need?"

Main Content:
- Pill Selector (horizontal list):
  - [1-5] (1 hr) - Default
  - [6-10] (2 hr)
  - [11-15] (Most Popular) - Highlighted
  - [16-25] (3+ hr)

Visual Feedback:
- Show estimated shoot duration below selection
- Animate selection with purple highlight
- Update sidebar price in real-time

Sidebar (Desktop):
- "Estimated Total" section
- Breakdown: Base price × quantity
- Live price updates

Mobile:
- Quantity selector full-width
- Price summary in bottom sheet
- Continue button fixed at bottom
```

#### 🎬 Screen 3: Scene Selection

**Route:** /start-project/scenes

**Design Prompt:**

codeCode

```
Design scene selection screen:

Header:
- Title: "Choose Your Scenes"
- Subtitle: "Pick 1-2 scenes. Customize details later."

Main Content:
1. Filter Tabs (horizontal scroll on mobile):
   - All, Flat Lay, Lifestyle, Kitchen, Bathroom

2. Scene Grid (3 columns desktop, 2 tablet, 1 mobile):
   - Large Aspect Ratio Cards (4:3)
   - Image: High-res example of the scene
   - Label: "White Cyclorama", "Modern Kitchen", "Pink Tile Bath"
   - Action: "+ Add" toggle button
   - Selected: Changes to "Added" with checkmark, purple border

Visual:
- High-quality scene photos
- Clear selection states
- Smooth hover effects
- Selected count indicator
```

#### 🧍 Screen 4: Model Selection

**Route:** /start-project/models

**Design Prompt:**

codeCode

```
Design model selection screen:

Header:
- Title: "Add a Model"
- Subtitle: "Elevate your product with human touch."

Main Content:
1. Model Type Cards (3 cards in row):
   - Hand Model ($237)
     - Image: Hand holding product
     - Description: "Perfect for jewelry, accessories"
   - Full Body ($477)
     - Image: Fashion fit/model
     - Description: "Complete outfit styling"
   - Pet Model ($297)
     - Image: Dog/cat with product
     - Description: "Pet-friendly products"

2. Configuration (when card selected):
   - Expand quantity counter below
   - Show total price for model type
   - Option to remove

Visual:
- Professional model photography
- Clear pricing display
- Easy selection/deselection
```

#### 🎒 Screen 5: Upgrades

**Route:** /start-project/upgrades

**Design Prompt:**

codeCode

```
Design upgrades/add-ons screen:

Header:
- Title: "Add Upgrades"

Main Content:
- Upgrade Grid (2 columns desktop, 1 mobile):
  - Styling ($447) - Icon: Scissors/clothes
  - Hair & Makeup ($299) - Icon: Brush
  - Steaming ($39) - Icon: Steam
  - BTS Video ($186) - Icon: Camera

Card Style:
- Small icon + Title + Price
- Simple toggle selection
- Selected: Purple background, white text
- Unselected: White background, black text, border

Visual:
- Minimalist icons
- Clear pricing
- Easy toggling
```

#### 🧾 Screen 6: Checkout

**Route:** /start-project/checkout

**Design Prompt:**

codeCode

```
Design checkout/review screen:

Header:
- Title: "Review & Book"

Layout (2 columns desktop, stacked mobile):
- Left Column (Forms):
  - Contact Info Section:
    - Name, Email, Company (required)
    - Phone (optional)
  - Billing Address Section:
    - Street, City, State, ZIP, Country
  - Payment Details Section:
    - Stripe Element integration
    - Card number, expiry, CVC
  - "How did you hear about us?" dropdown

- Right Column (Sticky Summary):
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

Visual:
- Clean form layout
- Clear price breakdown
- Secure payment indicator
- Loading state during payment
```

#### 🎉 Screen 7: Success

**Route:** /start-project/success

**Design Prompt:**

codeCode

```
Design booking success/confirmation page:

Hero Section:
- Large checkmark icon (green)
- Title: "You're booked! Order #12345"
- Subtitle: "We've sent a confirmation email"

Next Steps Section:
- "Ship your products to:" with address
- Shipping instructions
- Expected delivery date
- Production timeline

Actions:
- "Download Invoice" button (secondary)
- "Go to Dashboard" button (primary)
- "Book Another Shoot" link

Visual:
- Celebration aesthetic
- Clear next steps
- Professional confirmation
```

---

### 🗄️ Database Schema & Data Model

**Design Prompt for Database:**

codeCode

```
Create database schema for ecommerce photography booking system:

Core Tables:
1. bookings:
   - id (uuid, primary key)
   - user_id (uuid, nullable for guests)
   - status (enum: draft, paid, shooting, completed, cancelled)
   - total_amount (integer, cents)
   - currency (text, default 'usd')
   - contact_name, contact_email, contact_phone
   - billing_address (jsonb)
   - created_at, updated_at

2. booking_items:
   - id (uuid, primary key)
   - booking_id (uuid, foreign key)
   - type (enum: photo, video, scene, model, upgrade)
   - item_id (uuid, references scenes/models/upgrades)
   - quantity (integer)
   - price_at_booking (integer, cents)
   - created_at

3. scenes:
   - id (uuid, primary key)
   - name (text)
   - category (text: flat_lay, lifestyle, kitchen, bathroom)
   - image_url (text)
   - price (integer, cents)
   - is_active (boolean)
   - created_at

4. models:
   - id (uuid, primary key)
   - type (enum: hand, full_body, pet)
   - name (text)
   - price (integer, cents)
   - image_url (text)
   - is_active (boolean)
   - created_at

5. upgrades:
   - id (uuid, primary key)
   - name (text)
   - description (text)
   - price (integer, cents)
   - icon (text)
   - is_active (boolean)
   - created_at

Include:
- Proper foreign keys
- RLS policies (users see own bookings)
- Indexes for performance
- Timestamps
```

---

### 💳 Business Logic & Pricing Engine

**Design Prompt for Pricing:**

codeCode

```
Create pricing calculation engine:

File: lib/pricing.ts

Function: calculateBookingTotal(state)

Inputs:
- photoCount: number
- videoCount: number (optional)
- scenes: array of scene objects
- models: array of model objects (with quantity)
- upgrades: array of upgrade objects

Pricing Rules:
- Base photo: $39/photo
- Base video: $93 per clip
- Scenes: $0 (included, but can add premium scenes later)
- Models: Hand ($237), Full Body ($477), Pet ($297)
- Upgrades: Styling ($447), Hair & Makeup ($299), Steaming ($39), BTS ($186)

Outputs:
- subtotal: number
- tax: number (calculate based on location)
- total: number
- lineItems: array (for display in summary)
  - Each item: { type, name, quantity, unitPrice, total }

Validation:
- canGoToScenes(): Must have photoCount > 0 or videoCount > 0
- canGoToCheckout(): Must have at least 1 scene selected
- validateContactInfo(): All required fields filled

Include:
- TypeScript types
- Error handling
- Edge cases (zero quantities, etc.)
```

---

### 🧑‍🍳 Admin / Studio View

**Design Prompt:**

codeCode

```
Design studio admin dashboard for managing bookings:

Route: /dashboard/studio

Layout:
- Kanban Board (5 columns):
  - Incoming (new bookings)
  - Products Received (items shipped)
  - Shooting (in progress)
  - Editing (post-production)
  - Delivered (completed)

Features:
1. Booking Cards (draggable):
   - Order number
   - Client name
   - Photo count
   - Due date
   - Status badge

2. Booking Detail Modal (on click):
   - Full booking details
   - Scenes requested (with images)
   - Models requested
   - Upgrades checklist
   - Production notes
   - Status actions (move to next stage)

3. Status Actions:
   - "Mark Products Received" button
   - "Start Shooting" button
   - "Move to Editing" button
   - "Mark Delivered" button
   - Each action triggers email notification

Visual:
- Clean kanban interface
- Color-coded statuses
- Easy drag-and-drop
- Clear action buttons
```

]]></content>  
</change>  
</changes>

User

create docs/service-booking-plan.md add plan tasks multistep prompts success criteria add progress tracker to top of file

Gemini 3 Pro PreviewRan for 19s

lightbulbThought for 19 seconds

specification  
The user wants to create a dedicated plan for the **Service Booking System** (specifically focused on Ecommerce Photography as the MVP) in docs/service-booking-plan.md.

This plan will include:

1. **Progress Tracker**: A table tracking the status of each component (Layout, State, API, Individual Steps).
    
2. **Multistep Prompts**: Specific prompts to copy-paste into an AI coding assistant to build each part of the system.
    
3. **Success Criteria**: What defines "done" for each phase.
    
4. **Detailed Specs**: Routes, Schema, and Logic.
    

I will create this new file.

# Updated files:

## docs/service-booking-plan.md

<change>  
<file>docs/service-booking-plan.md</file>  
<description>Create detailed plan for Service Booking System with prompts and tracker.</description>  
<content><![CDATA[  
# 📸 Service Booking System Plan (Ecommerce Photography)  

**Status:** 🔴 Not Started  
**Priority:** High  
**Goal:** Build a linear, "Airbnb-style" booking wizard for ecommerce photography shoots.

---

## 📊 Progress Tracker

|   |   |   |   |
|---|---|---|---|
|Module / Component|Status|% Complete|Dependencies|
|**1. Foundation**||||
|Route Configuration (/start-project/*)|🔴|0%|None|
|BookingLayout (Wrapper + Sidebar)|🔴|0%|Routes|
|useBookingStore (Zustand State)|🔴|0%|None|
|**2. Database & API**||||
|Schema Migration (bookings, items)|🔴|0%|None|
|Edge Function: calculate-quote|🔴|0%|Schema|
|Edge Function: create-booking|🔴|0%|Schema|
|**3. Wizard Steps (UI)**||||
|Step 1: Landing (StartProjectPage)|🔴|0%|Layout|
|Step 2: Quantity (StepQuantity)|🔴|0%|Store|
|Step 3: Scenes (StepScenes)|🔴|0%|Store|
|Step 4: Models (StepModels)|🔴|0%|Store|
|Step 5: Upgrades (StepUpgrades)|🔴|0%|Store|
|Step 6: Checkout (StepCheckout)|🔴|0%|Pricing Engine|
|**4. Integration**||||
|Stripe Payment Intent|🔴|0%|Checkout UI|
|Success Page (BookingSuccessPage)|🔴|0%|Stripe|

---

## 🏗️ Architecture

### Route Structure

codeText

```
/start-project
  ├── / (Landing/Service Selection)
  ├── /quantity
  ├── /scenes
  ├── /models
  ├── /upgrades
  ├── /checkout
  └── /success
```

### State Management (useBookingStore)

- **Persist**: localStorage (to save progress)
    
- **State Shape**:
    
    codeTypeScript
    
    ```
    interface BookingState {
      serviceType: 'photo' | 'video';
      quantity: number; // photos or seconds
      scenes: string[]; // IDs
      models: { type: string; quantity: number }[];
      upgrades: string[]; // IDs
      contact: { name: '', email: '', brand: '' };
    }
    ```
    

---

## 🤖 Multistep Implementation Prompts

Use these prompts sequentially to build the system.

### 🟢 Prompt 1: Database Schema & Types

codeText

```
Create the Supabase schema for the Service Booking System.

1. Create a migration file `supabase/migrations/20250305_booking_system.sql`.
2. Define the following tables:
   - `bookings`: id, user_id (nullable), status (draft, pending_payment, paid), total_amount, currency, contact_info (jsonb), created_at.
   - `booking_items`: id, booking_id, item_type (photo, scene, model, upgrade), item_id (text), quantity, price, details (jsonb).
   - `service_catalog`: id, type, name, description, price_cents, image_url.
3. Insert seed data for `service_catalog` (Scenes, Models, Upgrades from the plan).
4. Generate TypeScript interfaces in `types/booking.ts` reflecting these tables.
```

### 🟢 Prompt 2: State Store & Pricing Logic

codeText

```
Implement the Booking State Management and Pricing Engine.

1. Install `zustand` if not present.
2. Create `stores/useBookingStore.ts`:
   - Store inputs: quantity, selectedScenes, selectedModels, selectedUpgrades.
   - Actions: setQuantity, toggleScene, updateModel, toggleUpgrade.
   - Persist state to localStorage.
3. Create `lib/pricing.ts`:
   - Function `calculateTotal(state)` that returns { subtotal, tax, total, lineItems }.
   - Logic: 
     - Base photo: $39.
     - Scenes: Free (included).
     - Models: Hand ($237), Full Body ($477).
     - Upgrades: Fixed prices.
```

### 🟢 Prompt 3: Layout & Step 1 (Landing)

codeText

```
Build the Booking Layout and Entry Page.

1. Create `pages/public/booking/BookingLayout.tsx`:
   - Left: Scrollable content area (`<Outlet />`).
   - Right: Sticky Sidebar (`BookingSummary.tsx`).
   - Top: Progress bar (Step X of 7).
   - Mobile: Sidebar becomes a bottom sheet/drawer.
2. Create `components/booking/BookingSummary.tsx`:
   - Read state from `useBookingStore`.
   - Use `calculateTotal` to show live price breakdown.
3. Update `pages/public/StartProjectPage.tsx` (Step 1):
   - Hero section "Plan Your Ecommerce Shoot".
   - 2 large cards: "Photography" vs "Video".
   - On click, update store `serviceType` and navigate to `/start-project/quantity`.
```

### 🟢 Prompt 4: Steps 2 (Quantity) & 3 (Scenes)

codeText

```
Implement Quantity and Scene selection steps.

1. Create `pages/public/booking/StepQuantity.tsx`:
   - Slider or Pill selector for Quantity (1-50).
   - Display estimated shoot duration.
   - "Next" button navigates to `/start-project/scenes`.
2. Create `pages/public/booking/StepScenes.tsx`:
   - Grid of selectable `SceneCard` components.
   - Filter tabs (Kitchen, Bathroom, Plain).
   - Validation: Must select at least 1 scene.
```

### 🟢 Prompt 5: Steps 4 (Models) & 5 (Upgrades)

codeText

```
Implement Model and Upgrade selection steps.

1. Create `pages/public/booking/StepModels.tsx`:
   - Cards for "Hand Model", "Full Body", "Pet".
   - Quantity counter for each model type.
   - "No Models Needed" skip option.
2. Create `pages/public/booking/StepUpgrades.tsx`:
   - Grid of `UpgradeCard` (Styling, Steaming, BTS Video).
   - Simple toggle selection.
```

### 🟢 Prompt 6: Checkout & Submission

codeText

```
Implement the Checkout Flow.

1. Create `pages/public/booking/StepCheckout.tsx`:
   - Form for Contact Info (Name, Email, Brand).
   - Read-only Review section of all selected items.
   - "Pay & Book" button.
2. Create `lib/api.ts` function `submitBooking(state)`:
   - Call Supabase to insert into `bookings` and `booking_items`.
   - Handle success/error states.
3. Create `pages/public/booking/BookingSuccessPage.tsx`:
   - Success message and "Next Steps" list.
```

---

## ✅ Success Criteria

### Functional

Users can navigate forward/backward without losing data.

Pricing sidebar updates instantly on every change.

Mobile users see a "Total: $X" bar that expands to show details.

Booking data is correctly saved to Supabase bookings table.

### Visual / UX

High-quality imagery for Scenes and Models.

"FashionOS" aesthetic: Clean whites, sharp borders, serif headings.

Smooth transitions between steps (framer-motion or CSS transitions).

### Technical

TypeScript fully typed (no any).

Pricing logic isolated in a pure function (testable).

Edge cases handled (e.g., deselecting a service resets dependent options).  
]]></content>

</change>  
</changes>