# 🤖 Master Prompts for FashionOS 2.0

This document contains the master prompts used to build the system from scratch, ensuring architectural integrity and avoiding common pitfalls.

---

## 1. Core Setup: Directory Structure & React Foundation

**Goal:** Establish a pristine, error-free frontend skeleton using a single React source and clean routing.

**Prompt:**

You are a senior full-stack React architect.
Your job: set up a **fresh, clean MVP** for FashionOS 2.0 with **zero React/version conflicts**, a clear **directory structure**, and a simple **dashboard + website skeleton**.

Very important:
- Do NOT repeat bad patterns like multiple React versions or conflicting import maps.
- Keep things minimal and production-friendly.

We are ONLY doing:
- Core setup
- Directory structure
- Basic routing
- Simple placeholder pages

❌ NO AI, NO Supabase, NO data modeling yet.

====================================================
1) CHOOSE A SINGLE STACK & REACT SOURCE
====================================================
Decide on ONE approach and stick to it:

**Preferred for this environment:**
- Use **ES modules + importmap** + **React 18.2.0 dev build** from `esm.sh`.
- Do NOT import React/ReactDOM from any other CDN (e.g. `aistudiocdn`).
- Do NOT mix multiple React versions.

Define a **single React instance**:

- `react` → `https://esm.sh/react@18.2.0`
- `react-dom` → `https://esm.sh/react-dom@18.2.0?deps=react@18.2.0`
- `react-dom/client` → `https://esm.sh/react-dom@18.2.0/client?deps=react@18.2.0`
- `react-router-dom` → version compatible with React 18, using the same deps.

Create a correct `<script type="importmap">` in `index.html` with these imports ONLY.
Explicitly avoid:
- Any `react/` or `react-dom/` wildcard mappings.
- Any duplicate React sources.

Explain briefly which versions and URLs you chose.

====================================================
2) DIRECTORY STRUCTURE FOR MVP
====================================================
Create a **simple, clean directory structure** for a minimum viable product:

- `index.html`
- `src/`
  - `main.tsx` (or `main.jsx`)
  - `router.tsx`
  - `layouts/`
    - `DashboardLayout.tsx`
    - `WebsiteLayout.tsx`
  - `pages/`
    - `dashboard/`
      - `DashboardHome.tsx`
      - `ProjectsPage.tsx`
      - `ServicesPage.tsx`
    - `site/`
      - `HomePage.tsx`
      - `AboutPage.tsx`
      - `ServicesPage.tsx`
      - `EventsPage.tsx`
      - `DirectoryPage.tsx`
  - `components/`
    - `ui/PlaceholderPage.tsx`

Goal:
- Enough structure to navigate between core screens.
- No over-engineering.

Output: a **tree view** of this structure with file names.

====================================================
3) INDEX.HTML – CLEAN, SAFE BOOTSTRAP
====================================================
Generate a full `index.html` that:

- Includes Tailwind via CDN.
- Sets up a **single importmap** for:
  - `react`
  - `react-dom`
  - `react-dom/client`
  - `react-router-dom`
- Mounts the app in `<div id="root"></div>`.

Important:
- Use ONLY **one React 18.2.0 source** via `esm.sh`.
- Do NOT add any `react/` or `react-dom/` wildcard mappings.
- Use dev-friendly builds (non-minified) if possible.

====================================================
4) MAIN ENTRY + ROUTER (MVP)
====================================================
Create:

### `src/main.tsx`
- Imports React, ReactDOM client, and the router.
- Calls `createRoot(document.getElementById("root")!)`.
- Wraps the app in `<BrowserRouter>` from `react-router-dom`.

### `src/router.tsx`
- Uses React Router v6+.
- Defines basic routes:

Dashboard:
- `/dashboard` → `DashboardHome`
- `/dashboard/projects` → `ProjectsPage`
- `/dashboard/services` → `ServicesPage`

Website:
- `/` → `HomePage`
- `/about` → `AboutPage`
- `/services` → `ServicesPage` (site)
- `/events` → `EventsPage`
- `/directory` → `DirectoryPage`

Wrap:
- All `/dashboard/*` routes with `DashboardLayout`.
- All public routes with `WebsiteLayout`.

Make sure:
- All route `element` props use JSX, e.g. `element: <DashboardHome />`, not raw objects.

====================================================
5) LAYOUTS + PLACEHOLDER PAGES
====================================================
Implement:

### `layouts/DashboardLayout.tsx`
- Simple sidebar + top bar layout.
- Area for `<Outlet />` from React Router.

### `layouts/WebsiteLayout.tsx`
- Simple header navigation: Home, About, Services, Events, Directory.
- Area for `<Outlet />`.

### `components/ui/PlaceholderPage.tsx`
- Props: `title: string`, `description?: string`.
- Renders a clean center-aligned placeholder.

### Each page component:
For each of:

- `DashboardHome`
- `ProjectsPage`
- `ServicesPage` (dashboard)
- `HomePage`
- `AboutPage`
- `ServicesPage` (site)
- `EventsPage`
- `DirectoryPage`

Do:

- Export a functional component that:
  - Renders `<PlaceholderPage title="PageName" description="Short TODO description" />`.

Keep content minimal and consistent.

====================================================
6) BEST PRACTICES – AVOIDING PAST MISTAKES
====================================================
Add a short section called **“MVP Frontend Best Practices”** with 8–10 bullets, including:

- Use a **single React source** and version across the app.
- Do not mix multiple CDNs or import patterns for React.
- Keep imports simple: `import React from "react";` (resolved via importmap).
- Avoid path aliases like `"@/..."` unless you also configure resolution (not needed for this MVP).
- Keep components small and focused.
- Use consistent naming: `XxxLayout`, `XxxPage`.
- Treat this stage as **static scaffolding only** (no data, no AI, no Supabase yet).
- Later stages can safely add:
  - Supabase client
  - Gemini 3 Pro features
  - Real data flows

====================================================
7) OUTPUT FORMAT
====================================================
Return your answer in this order:

1. Final `index.html` content (with clean importmap).
2. Directory tree.
3. `main.tsx` and `router.tsx`.
4. Basic implementations for:
   - `DashboardLayout`
   - `WebsiteLayout`
   - `PlaceholderPage`
   - One example page component from dashboard and one from site.
5. “MVP Frontend Best Practices” bullet section.

All code must:
- Use a single React 18.2.0 instance from `esm.sh`.
- Compile and run without React hook errors or “multiple React” issues.

---

# 🚀 Phase 2: Systematic Build & Expansion

Following the successful scaffold (Stage 1), execute these stages in order. Do NOT skip stages.

**Roadmap Overview:**
2.  **Design System & UI Primitives:** Define tokens and build reusable atoms.
3.  **Database Schema & Auth:** Define the Supabase SQL and RLS.
4.  **Dashboard Architecture:** Implement the "Event Context" sidebar and layout logic.
5.  **Shoot Booking Engine:** The core revenue flow (Wizard + Pricing).
6.  **AI Infrastructure:** Edge Function setup for secure Gemini calls.
7.  **Sponsor CRM:** Deal pipeline and tracking.
8.  **Event Management:** AI Event Wizard and Logistics.
9.  **Public Website Content:** High-fidelity marketing pages.
10. **Polish & Reliability:** Error handling, loading states, toast notifications.

---

## Stage 2: Design System & UI Primitives

**Objective:** Create the visual language (Tailwind tokens) and core React components (Button, Input, Card) to ensure consistency before building complex features.

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
Update `tailwind.config.js` (or create a style tag in index.html if using CDN) to include:
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
   - Primary: Black bg, white text.
   - Secondary: White bg, black border.

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

Output the file contents for `tailwind.config.js` (or CSS equivalent), `index.html` (head updates), and the components listed above.
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
Users can be Organizers, Designers, or Sponsors.

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
2. Event Context: When managing a specific event (ID), the sidebar changes to show Event Tools (Run of Show, Casting, Floorplan).

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

=========================================
4. MOCK DATA
=========================================
- Create a `useMockData` hook to populate the dashboard with dummy Events and Projects so we can visualize the layout without a backend connection yet.

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
Build these components in `src/features/booking/`:
- `StepCategory.tsx`: Grid of cards (E-comm, Editorial, Lookbook).
- `StepQuantity.tsx`: Slider input (1-100 looks).
- `StepBrief.tsx`: Textarea with a placeholder for AI polishing.
- `StepReview.tsx`: Read-only summary of all choices.

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
  - If task is 'polish_brief', use a specific System Instruction: "You are a Creative Director. Rewrite this brief..."
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
Define `Sponsor` interface: name, industry, tier (Gold/Silver), status, value.
Create mock data for 10 sponsors.

=========================================
2. VIEW: `SponsorPipeline.tsx`
=========================================
- Implement a Kanban Board (Horizontal scrolling columns).
- Columns: Lead, Contacted, Proposal, Signed.
- Cards: Draggable (or simple dropdown to change status for MVP). Show Logo + Value.

=========================================
3. VIEW: `SponsorProfile.tsx`
=========================================
- Detail view for a single sponsor.
- Tabs: Overview, Deliverables, Activations.
- "AI Action": Button to "Generate Pitch Email" (mocks the AI call for now).

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
- Vertical list of 14 standard phases (Concept ->...-> Post-Event).
- Visual progress bar.
- Status pills (Not Started, In Progress, Done).

=========================================
2. VENUE & MAP COMPONENT
=========================================
Create `EventVenue.tsx`:
- Display Venue Name & Address.
- Embed a Google Map (iframe or static image for MVP).
- "AI Scout" input: "Find me a rooftop in Brooklyn". (Mock the result: show a list of venue cards).

=========================================
3. RUN OF SHOW
=========================================
Create `RunOfShow.tsx`:
- Minute-by-minute schedule builder.
- Add/Remove Time Blocks.
- Fields: Time, Duration, Activity, Audio/Lighting Cue.

Integrate these into the Event Context routes.
```

---

# 🌍 Phase 3: Public Website & Marketing Architecture

This phase focuses on building the public-facing "Storefront" of FashionOS. This is essential for converting visitors into dashboard users. We move from "App Construction" to "Brand Experience".

**Roadmap Overview:**
11. **Brand & Content Strategy:** Defining the "Vogue Tech" voice and SEO structure.
12. **Core Pages Structure:** The main entry points (Home, About, Contact).
13. **Service Page Templates:** A reusable architecture for the 8+ service offerings.
14. **Directory & Talent Network:** The public marketplace view.
15. **Public Event Experience:** Guest-facing pages for ticketing and details.
16. **Trust & Portfolio:** Case studies and social proof.
17. **SEO & Performance:** Meta tags, schema, and speed optimization.

---

## Stage 11: Brand & Content Strategy

**Objective:** Define the visual and verbal identity before coding pages.

**Prompt:**

```text
You are a Creative Director & SEO Strategist.
Task: Define the Content Strategy and Brand DNA for FashionOS.

CONTEXT:
We are building the public website. It must feel like a high-end fashion magazine but function like a SaaS site.
Tone: "Vogue meets Linear" — Professional, Minimalist, Authoritative, yet Creative.

=========================================
1. DESIGN TOKENS REFINEMENT
=========================================
Update our design system specs for the Marketing Site:
- Typography: How to use `Playfair Display` (Headings) vs `Inter` (UI) effectively.
- Spacing: Define a "Luxury Spacing" scale (more whitespace than the dashboard).
- Imagery: Rules for photography style (High contrast, editorial, grain).

=========================================
2. URL STRUCTURE & SEO PLAN
=========================================
Define the URL map for SEO optimization:
- `/services/photography-production` instead of `/photo`
- `/fashion-directory/models/new-york` (Localized SEO)
- List the top 10 keywords we should target (e.g., "fashion show planner software", "ecommerce photography studio").

=========================================
3. CONTENT ARCHITECTURE
=========================================
Create a `docs/content-strategy.md`:
- Headline Formulas: "Verb + Value + Noun" (e.g., "Automate your Runway Production").
- CTA Strategy: Primary ("Start Project") vs Secondary ("View Lookbook").
- Footer Map: Organize links into "Platform", "Services", "Company", "Resources".

Output the markdown content for `docs/content-strategy.md`.
```

---

## Stage 12: Core Pages Structure

**Objective:** Build the primary landing pages (Home, About, Contact).

**Prompt:**

```text
You are a Lead Frontend Developer.
Task: Architect the Core Public Pages.

CONTEXT:
These pages are the face of the company. They must be responsive, fast, and visually stunning.

=========================================
1. HOMEPAGE ARCHITECTURE (`src/pages/public/HomePage.tsx`)
=========================================
Define the sections:
- Hero: Full-screen video background with overlay text.
- Value Prop: 3-col grid (Production, Logistics, Intelligence).
- "How It Works": Scroll-triggered animation steps.
- Marquee: Infinite scroll of client logos.
- CTA Band: "Ready to launch?".

=========================================
2. ABOUT PAGE (`src/pages/public/AboutPage.tsx`)
=========================================
- Manifesto Section: "Why we built FashionOS".
- Team Grid: Photos + Roles.
- Global Presence: Map graphic showing London, NYC, Milan hubs.

=========================================
3. CONTACT PAGE (`src/pages/public/ContactPage.tsx`)
=========================================
- Split Layout:
  - Left: "Start a Project" form (Name, Brand, Budget, Service Type).
  - Right: Office locations and direct email/phone.
- Component: `ContactForm.tsx` with validation.

Output the React code for these 3 pages + the ContactForm component.
```

---

## Stage 13: Service Page Templates

**Objective:** Create a reusable template for the 8+ service pages to ensure consistency and speed.

**Prompt:**

```text
You are a Component Architect.
Task: Build the Service Page Template System.

CONTEXT:
We have many services (Photography, Video, Web, Events). They all share a structure but have different content.

=========================================
1. TEMPLATE COMPONENT (`src/components/templates/ServicePageTemplate.tsx`)
=========================================
Props:
- `title`, `subtitle`, `heroImage`
- `benefits`: Array of { icon, title, desc }
- `process`: Array of steps
- `pricing`: Array of tiers
- `gallery`: Array of images
- `faq`: Array of questions

Layout:
- Hero (Parallax effect)
- "Why Us" Grid
- "Our Process" Horizontal Scroll
- Featured Work (Masonry Grid)
- Pricing Cards
- FAQ Accordion
- Sticky CTA Bottom Bar (Mobile only)

=========================================
2. IMPLEMENTATION EXAMPLES
=========================================
Use the template to create:
- `src/pages/public/services/PhotographyPage.tsx`
- `src/pages/public/services/WebDesignPage.tsx`

Output the Template component and one implementation example.
```

---

## Stage 14: Directory & Talent Network

**Objective:** Build the public-facing "LinkedIn for Fashion" interface.

**Prompt:**

```text
You are a UI/UX Designer.
Task: Design the Fashion Directory & Profile Pages.

CONTEXT:
A public marketplace where brands can find Models, Photographers, and Venues.

=========================================
1. DIRECTORY SEARCH (`src/pages/public/DirectoryPage.tsx`)
=========================================
- Filter Sidebar: Role (Model, Stylist), Location, Rate, Vibe.
- Results Grid: `TalentCard` component.
  - Image (Aspect ratio 3:4)
  - Name + Role
  - Tags (e.g. "Editorial", "Runway")
  - "Book Now" button.

=========================================
2. PROFILE DETAIL (`src/pages/public/ProfileDetailPage.tsx`)
=========================================
- Header: Cover Image + Avatar + Verified Badge.
- Stats Row: "50+ Shows", "4.9 Rating".
- Portfolio Grid: Masonry layout of their work.
- "Hire Me" Modal: Simple inquiry form pre-filled with their ID.

Output the React code for the Directory Listing and Profile Detail pages.
```

---

## Stage 15: Public Event Experience

**Objective:** Create the guest-facing pages for events (Ticketing & Info).

**Prompt:**

```text
You are a Full-Stack Developer.
Task: Build the Public Event View.

CONTEXT:
When an event is published, it gets a public URL (`/events/:slug`). Guests view details and buy tickets here.

=========================================
1. EVENT LISTING (`src/pages/public/EventsPage.tsx`)
=========================================
- Calendar View / List View toggle.
- Event Card: Date badge, Title, Location, "Get Tickets" button.
- Search: "Find events in [City]".

=========================================
2. SINGLE EVENT PAGE (`src/pages/public/EventDetailPage.tsx`)
=========================================
- Hero: Event Poster/Banner.
- Details: Date/Time, Map Embed, Description.
- Schedule: Public version of the Run-of-Show (High level).
- Ticketing Widget:
  - List Ticket Tiers (VIP, GA).
  - Quantity selector.
  - "Checkout" button (Integration point for Stripe).

Output the code for the Listing and Detail pages.
```

---

## Stage 16: Trust & Portfolio Engine

**Objective:** Build the pages that prove credibility.

**Prompt:**

```text
You are a Content Engineer.
Task: Implement the Trust & Proof pages.

=========================================
1. PORTFOLIO / WORK (`src/pages/public/PortfolioPage.tsx`)
=========================================
- Filterable Grid: "Show me [E-comm] projects for [Beauty] brands".
- Case Study Modal: Clicking a project opens a detailed view without leaving the page.
  - "The Challenge", "The Solution", "The Result".
  - Before/After sliders for retouching examples.

=========================================
2. TESTIMONIALS
=========================================
- Create a `TestimonialCarousel` component.
- Data: Quote, Client Name, Role, Brand Logo.
- Usage: Embed this on Home and Service pages.

Output the Portfolio page code and the Testimonial component.
```

---

## Stage 17: SEO & Performance Strategy

**Objective:** Ensure the site is discoverable and fast.

**Prompt:**

```text
You are a Technical SEO Specialist.
Task: Implement SEO & Performance best practices.

CONTEXT:
We need to rank for keywords and pass Core Web Vitals.

=========================================
1. METADATA MANAGEMENT
=========================================
- Create a `SEOHead.tsx` component (using `react-helmet` or similar).
- Props: title, description, image (OG), type.
- Implement Schema.org JSON-LD for:
  - `Organization` (Home)
  - `Service` (Service Pages)
  - `Event` (Event Pages)

=========================================
2. PERFORMANCE OPTIMIZATION
=========================================
- Implement Lazy Loading for all images below the fold.
- Create a `Image` wrapper component that handles:
  - `loading="lazy"`
  - `srcSet` for responsive sizing
  - Skeleton loading state

=========================================
3. SITEMAP
=========================================
- Create a dynamic `sitemap.xml` generator function (conceptually, or a route that renders it).

Output the `SEOHead` component, the optimized `Image` component, and the JSON-LD structures.
```

---

# 🛡️ Phase 4: Infrastructure, QA & Launch

This phase ensures the "Minimum Viable Product" is actually shippable. It covers testing, security, and deployment workflows.

**Roadmap Overview:**
18. **Testing Infrastructure:** Unit and Integration tests.
19. **CI/CD Pipelines:** Automated build and deploy workflows.
20. **Security Hardening:** RLS audits and Key protection.
21. **Developer Documentation:** README and setup guides.
22. **Production Verification:** Final smoke tests before launch.

---

## Stage 18: Testing Infrastructure

**Objective:** Setup the testing harness to prevent regression on critical paths (Booking, Auth).

**Prompt:**

```text
You are a QA Architect.
Task: Setup the Testing Infrastructure for FashionOS.

CONTEXT:
We need to ensure the Booking Wizard and Auth flows work reliably.

=========================================
1. VITEST SETUP
=========================================
- Configure `vitest` for Unit Testing.
- Create `src/utils/format.test.ts` to test currency/date formatters.
- Create `src/lib/pricing.test.ts` to verify the booking calculator logic.

=========================================
2. PLAYWRIGHT E2E
=========================================
- Setup `playwright` config.
- Write a critical path test: `tests/e2e/booking-flow.spec.ts`.
  - Visit /start-project
  - Select Service
  - Fill Wizard
  - Verify Summary updates
  - Reach Checkout

Output the configuration files and the two test files.
```

---

## Stage 19: CI/CD Pipelines

**Objective:** Automate quality checks and deployment.

**Prompt:**

```text
You are a DevOps Engineer.
Task: Create GitHub Actions workflows.

CONTEXT:
We deploy to Vercel (Frontend) and Supabase (Backend).

=========================================
1. PULL REQUEST CHECK (`.github/workflows/pr-check.yml`)
=========================================
- Trigger: Push to `main` or PR.
- Steps:
  - Checkout code.
  - Install dependencies.
  - Run Linter (`npm run lint`).
  - Run Type Check (`tsc --noEmit`).
  - Run Unit Tests (`npm run test`).

=========================================
2. PRODUCTION DEPLOY (`.github/workflows/deploy.yml`)
=========================================
- Trigger: Push to `main`.
- Steps:
  - Run `supabase functions deploy` (if changes detected).
  - Run `supabase db push` (migrations).
  - (Vercel handles frontend automatically via git integration).

Output the YAML content for both workflows.
```

---

## Stage 20: Security Hardening

**Objective:** Ensure tenant isolation and secure API usage.

**Prompt:**

```text
You are a Security Engineer.
Task: Audit and harden the application security.

CONTEXT:
FashionOS is multi-tenant. Data leaks between organizations are critical failures.

=========================================
1. RLS AUDIT SCRIPT
=========================================
Write a SQL script (`supabase/tests/security.sql`) using `pgTAP` (or conceptual equivalent) to verify:
- User A cannot read User B's `projects`.
- User A cannot read User B's `sponsors`.
- Anon users can ONLY read public `events`.

=========================================
2. EDGE FUNCTION SECURITY
=========================================
Update `ai-copilot` and other functions to:
- Verify the `Authorization` header (JWT) before processing.
- Ensure `GEMINI_API_KEY` is only accessed via `Deno.env.get()`.

Output the SQL verification script and the secured Edge Function snippet.
```

---

## Stage 21: Developer Documentation

**Objective:** Make the project maintainable for new developers.

**Prompt:**

```text
You are a Technical Writer.
Task: Create the `README.md` and `CONTRIBUTING.md`.

CONTEXT:
A developer just cloned the repo. They need to run it locally.

=========================================
1. README.MD
=========================================
Sections:
- Project Overview & Tech Stack.
- **Quick Start:** 
  - `npm install`
  - `cp .env.example .env`
  - `supabase start`
  - `npm run dev`
- Environment Variables Table (VITE_SUPABASE_URL, etc).
- Deployment Guide.

=========================================
2. CONTRIBUTING.MD
=========================================
- Branching strategy (feature branches).
- Commit message convention (Conventional Commits).
- Code style guide (Tailwind ordering, React hooks rules).

Output the markdown content for both files.
```

---

## Stage 22: Production Verification

**Objective:** The final "Go / No-Go" check before public release.

**Prompt:**

```text
You are a Product Owner.
Task: Create the Pre-Launch Verification Checklist.

CONTEXT:
We are about to flip the switch.

=========================================
1. SYSTEM HEALTH PAGE
=========================================
Create `src/pages/admin/SystemHealth.tsx` (Admin only).
- Check DB Connection (Simple query).
- Check Storage Access (List buckets).
- Check Edge Function latency (Ping `ai-copilot`).
- Display Green/Red indicators for each service.

=========================================
2. MANUAL SMOKE TEST PLAN
=========================================
List 5 manual scenarios to test on the Production URL:
- "The Guest Checkout": Book a shoot without logging in.
- "The Sponsor Invite": Invite a sponsor via email and verify they can log in.
- "The Event Build": Create an event using AI and publish it.
- "The Mobile Check": Verify the Sticky Booking Footer on iPhone.
- "The 404": Visit a non-existent route.

Output the React code for the Health Page and the Markdown list for the Smoke Test.
```