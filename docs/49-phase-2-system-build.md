# 🚀 Phase 2: Systematic Build & Expansion

**Status:** 🟢 Ready for Implementation
**Goal:** Implement the business logic, data layer, and core functional modules (Bookings, Events, CRM).

---

## Stage 2: Design System & UI Primitives

**Objective:** Create the visual language (Tailwind tokens) and core React components (Button, Input, Card).

**Prompt:**

```text
You are a Senior UI Engineer.
Task: Implement the "Atelier" Design System for FashionOS 2.0.

CONTEXT:
We have a basic React scaffold. Now we need the visual foundation.
Style: "High-Fashion Tech" (Vogue meets Linear). Minimalist, serif headers, plenty of whitespace.

=========================================
1. TAILWIND CONFIGURATION
=========================================
Update `tailwind.config.js` to include:
- Fonts: 'Playfair Display' (Serif), 'Inter' (Sans).
- Colors:
  - Cream: #FBF8F5 (Background)
  - Black: #1A1D2D (Text)
  - Purple: #C084FC (Accent/AI)
  - Success: #059669
  - Warning: #D97706

=========================================
2. UI PRIMITIVES (src/components/ui/)
=========================================
Create the following reusable components. Use standard HTML/CSS classes via Tailwind.

A. `Button.tsx`
   - Props: variant (primary, secondary, ghost, outline), size (sm, md, lg), icon, isLoading.
   - Style: Rounded-full, uppercase tracking-widest font-bold.

B. `Input.tsx` / `Textarea.tsx`
   - Props: label, error, icon.
   - Style: Large touch targets (56px), bg-white, subtle border.

C. `Card.tsx`
   - Props: children, className.
   - Style: bg-white, rounded-3xl, border-gray-100, shadow-sm, hover:shadow-md transition.

D. `FadeIn.tsx`
   - A wrapper component using simple CSS transitions to fade content in on mount.

E. `Badge.tsx` / `StatusPill.tsx`
   - For status display (Pending, Active, Paid).

=========================================
3. UPDATE GLOBAL CSS
=========================================
- Set body background to #FBF8F5.
- Set default text color to #1A1D2D.
- Import Google Fonts in `index.html`.

Output the file contents for `tailwind.config.js`, `index.html` (head updates), and the components listed above.
```

---

## Stage 3: Database Schema & Auth

**Objective:** Define the data model in Supabase to support multi-tenancy, bookings, and events.

**Prompt:**

```text
You are a Database Architect.
Task: Design the Supabase SQL Schema for FashionOS.

CONTEXT:
We need a multi-tenant system for a fashion production platform.

=========================================
1. CORE TABLES
=========================================
Generate the SQL to create these tables (enable RLS on all):

- `profiles`: Extends auth.users (id, email, full_name, avatar_url, role).
- `organizations`: Tenant container (name, slug, logo).
- `projects`: Work container (title, status, client_id).
- `shoots`: Production booking (type, date, look_count, status).
- `events`: Runway/Party (title, date, venue_id, capacity).
- `sponsors`: CRM profiles (brand_name, industry, contact_info).
- `event_sponsors`: Join table (event_id, sponsor_id, tier, status).

=========================================
2. ENUMS & TYPES
=========================================
Define Postgres Enums for:
- `user_role`: 'admin', 'member', 'client'.
- `project_status`: 'draft', 'active', 'completed'.
- `shoot_type`: 'photography', 'video', 'hybrid'.
- `sponsor_status`: 'lead', 'negotiating', 'signed'.

=========================================
3. RLS POLICIES
=========================================
Write Row Level Security policies:
- Users can read/write their own `profiles`.
- Organization members can read/write `projects` and `shoots` belonging to their org.
- Public can read `events` if `is_public` is true.

=========================================
4. TRIGGERS
=========================================
- Auto-update `updated_at` timestamp.
- Create a `profile` row when a new User signs up (trigger on auth.users).

Output a single clean `.sql` file content that I can run in the Supabase SQL Editor.
```

---

## Stage 4: Dashboard Architecture

**Objective:** Build the "Command Center" layout that switches between Global view and Event-Specific context.

**Prompt:**

```text
You are a React Frontend Architect.
Task: Implement the Advanced Dashboard Layout logic.

CONTEXT:
FashionOS has two dashboard modes:
1. Global Context: Viewing all projects, financial overview, settings.
2. Event Context: When managing a specific event (ID), the sidebar changes to show Event Tools.

=========================================
1. ROUTING UPDATE
=========================================
Update `src/router.tsx`:
- `/dashboard` (Global)
- `/dashboard/events/:id/*` (Event Context)

=========================================
2. COMPONENT: `Sidebar.tsx`
=========================================
- Logic: Check URL params. If `:id` exists and is not 'new', render the "Event Menu". Otherwise, render "Global Menu".
- Global Menu: Overview, Projects, Calendar, CRM, Finance.
- Event Menu: < Back to Global, Command Center, Timeline, Casting, Logistics, Sponsors.

=========================================
3. COMPONENT: `DashboardLayout.tsx`
=========================================
- Integrate the smart Sidebar.
- Add a `TopBar` with Breadcrumbs (dynamic based on route) and User Profile dropdown.

Output the code for `Sidebar.tsx`, `DashboardLayout.tsx`, and the updated `router.tsx`.
```

---

## Stage 5: Shoot Booking Engine (Wizard)

**Objective:** Implement the 13-step "Airbnb-style" booking flow for photoshoots.

**Prompt:**

```text
You are a UX Engineer.
Task: Build the "Shoot Booking Wizard" at `/start-project`.

CONTEXT:
A multi-step form where users configure a photoshoot.
Steps: Category -> Style -> Quantity -> Logistics -> Brief -> Review.

=========================================
1. STATE MANAGEMENT
=========================================
Create `BookingContext.tsx`:
- Store: serviceType, category, shotCount, date, creativeBrief.
- Logic: Calculate `estimatedPrice` in real-time based on shotCount * styleRate.

=========================================
2. WIZARD LAYOUT
=========================================
Create `src/layouts/WizardLayout.tsx`:
- Left col: Form Step.
- Right col (Desktop): Sticky "Receipt" summary (Live price update).
- Bottom (Mobile): Sticky "Next" button and Total Price.

=========================================
3. STEPS IMPLEMENTATION
=========================================
Build components in `src/features/booking/`:
- `StepCategory.tsx`: Grid of cards.
- `StepQuantity.tsx`: Slider input.
- `StepBrief.tsx`: Textarea with a placeholder for AI polishing.
- `StepReview.tsx`: Read-only summary.

=========================================
4. PAGE INTEGRATION
=========================================
- Update `src/pages/public/StartProjectPage.tsx` to manage the step progression.

Ensure all components use the UI Primitives from Stage 2.
```

---

## Stage 6: AI Infrastructure (Edge Functions)

**Objective:** Set up the secure backend proxy for Gemini 3 API calls.

**Prompt:**

```text
You are a Backend Security Engineer.
Task: Create Supabase Edge Functions to handle AI requests securely.

CONTEXT:
We cannot expose `GEMINI_API_KEY` on the client. All AI calls must go through a proxy.

=========================================
1. FUNCTION: `ai-copilot`
=========================================
Create `supabase/functions/ai-copilot/index.ts`:
- Input: `{ prompt, context, task }`
- Logic:
  - Initialize GoogleGenAI with server-side key.
  - Select model: `gemini-2.5-flash` (for text) or `gemini-3-pro` (for reasoning).
  - If task is 'polish_brief', use a specific System Instruction.
- Output: JSON response.
- CORS: Handle Options and Origin.

=========================================
2. FRONTEND SDK
=========================================
Create `src/lib/ai-service.ts`:
- `polishBrief(text)`: Calls the edge function.
- `generateEventDraft(text)`: Calls edge function.
- Handle auth headers (pass Supabase session token).

Output the TypeScript code for the Edge Function and the Frontend Service.
```

---

## Stage 7: Sponsor CRM System

**Objective:** Build the Kanban board and deal management system.

**Prompt:**

```text
You are a Product Engineer.
Task: Build the Sponsor CRM Module.

CONTEXT:
Organizers need to track sponsorship deals (Leads -> Negotiating -> Signed).

=========================================
1. TYPES & MOCK DATA
=========================================
Define `Sponsor` interface: name, industry, tier, status, value.
Create mock data for 10 sponsors.

=========================================
2. VIEW: `SponsorPipeline.tsx`
=========================================
- Implement a Kanban Board (Horizontal scrolling columns).
- Columns: Lead, Contacted, Proposal, Signed.
- Cards: Draggable. Show Logo + Value.

=========================================
3. VIEW: `SponsorProfile.tsx`
=========================================
- Detail view for a single sponsor.
- Tabs: Overview, Deliverables, Activations.
- "AI Action": Button to "Generate Pitch Email".

Integrate these into `/dashboard/sponsors`.
```

---

## Stage 8: Event Management & Logistics

**Objective:** The core event planning tools (Timeline, Venue Map).

**Prompt:**

```text
You are a Frontend Specialist.
Task: Build the Event Logistics UI.

CONTEXT:
Inside `/dashboard/events/:id/`, users manage the physical aspects of the show.

=========================================
1. TIMELINE COMPONENT
=========================================
Create `EventTimeline.tsx`:
- Vertical list of 14 standard phases.
- Visual progress bar.
- Status pills (Not Started, In Progress, Done).

=========================================
2. VENUE & MAP COMPONENT
=========================================
Create `EventVenue.tsx`:
- Display Venue Name & Address.
- Embed a Google Map.
- "AI Scout" input.

=========================================
3. RUN OF SHOW
=========================================
Create `RunOfShow.tsx`:
- Minute-by-minute schedule builder.
- Add/Remove Time Blocks.

Integrate these into the Event Context routes.
```
