# 🌍 Phase 3: Public Website & Marketing

**Status:** 🟢 Ready for Implementation
**Goal:** Build the public-facing "Storefront" of FashionOS to convert visitors into dashboard users.

---

## Stage 11: Brand & Content Strategy

**Objective:** Define the visual and verbal identity before coding pages.

**Prompt:**

```text
You are a Creative Director & SEO Strategist.
Task: Define the Content Strategy and Brand DNA for FashionOS.

CONTEXT:
We are building the public website. Tone: "Vogue meets Linear".

=========================================
1. DESIGN TOKENS REFINEMENT
=========================================
Update our design system specs for the Marketing Site:
- Typography: How to use `Playfair Display` (Headings) vs `Inter` (UI).
- Spacing: Define a "Luxury Spacing" scale.
- Imagery: Rules for photography style.

=========================================
2. URL STRUCTURE & SEO PLAN
=========================================
Define the URL map for SEO optimization:
- `/services/photography-production`
- `/fashion-directory/models/new-york`
- List top 10 keywords.

=========================================
3. CONTENT ARCHITECTURE
=========================================
Create a `docs/content-strategy.md`:
- Headline Formulas.
- CTA Strategy.
- Footer Map.

Output the markdown content for `docs/content-strategy.md`.
```

---

## Stage 12: Core Pages Structure

**Objective:** Build the primary landing pages.

**Prompt:**

```text
You are a Lead Frontend Developer.
Task: Architect the Core Public Pages.

=========================================
1. HOMEPAGE ARCHITECTURE (`src/pages/public/HomePage.tsx`)
=========================================
Define the sections:
- Hero: Full-screen video background with overlay text.
- Value Prop: 3-col grid.
- "How It Works": Scroll-triggered animation.
- Marquee: Client logos.
- CTA Band.

=========================================
2. ABOUT PAGE (`src/pages/public/AboutPage.tsx`)
=========================================
- Manifesto Section.
- Team Grid.
- Global Presence Map.

=========================================
3. CONTACT PAGE (`src/pages/public/ContactPage.tsx`)
=========================================
- Split Layout: Form vs Office Info.
- Component: `ContactForm.tsx` with validation.

Output the React code for these 3 pages + the ContactForm component.
```

---

## Stage 13: Service Page Templates

**Objective:** Create a reusable template for the 8+ service pages.

**Prompt:**

```text
You are a Component Architect.
Task: Build the Service Page Template System.

CONTEXT:
We have many services (Photography, Video, Web).

=========================================
1. TEMPLATE COMPONENT (`src/components/templates/ServicePageTemplate.tsx`)
=========================================
Props:
- `title`, `subtitle`, `heroImage`
- `benefits`, `process`, `pricing`, `gallery`, `faq`

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
- Filter Sidebar: Role, Location, Rate, Vibe.
- Results Grid: `TalentCard` component (Image 3:4, Name, Role, Tags).

=========================================
2. PROFILE DETAIL (`src/pages/public/ProfileDetailPage.tsx`)
=========================================
- Header: Cover Image + Avatar + Verified Badge.
- Stats Row: "50+ Shows", "4.9 Rating".
- Portfolio Grid: Masonry layout.
- "Hire Me" Modal.

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
When an event is published, it gets a public URL (`/events/:slug`).

=========================================
1. EVENT LISTING (`src/pages/public/EventsPage.tsx`)
=========================================
- Calendar View / List View toggle.
- Event Card: Date badge, Title, Location, "Get Tickets" button.

=========================================
2. SINGLE EVENT PAGE (`src/pages/public/EventDetailPage.tsx`)
=========================================
- Hero: Event Poster/Banner.
- Details: Date/Time, Map Embed, Description.
- Schedule: Public version of the Run-of-Show.
- Ticketing Widget: List Ticket Tiers, Quantity, Checkout button.

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
- Case Study Modal.

=========================================
2. TESTIMONIALS
=========================================
- Create a `TestimonialCarousel` component.
- Data: Quote, Client Name, Role, Brand Logo.

Output the Portfolio page code and the Testimonial component.
```

---

## Stage 17: SEO & Performance Strategy

**Objective:** Ensure the site is discoverable and fast.

**Prompt:**

```text
You are a Technical SEO Specialist.
Task: Implement SEO & Performance best practices.

=========================================
1. METADATA MANAGEMENT
=========================================
- Create a `SEOHead.tsx` component.
- Props: title, description, image (OG), type.
- Implement Schema.org JSON-LD.

=========================================
2. PERFORMANCE OPTIMIZATION
=========================================
- Implement Lazy Loading for all images below the fold.
- Create a `Image` wrapper component that handles loading states.

=========================================
3. SITEMAP
=========================================
- Create a dynamic `sitemap.xml` generator strategy.

Output the `SEOHead` component and the optimized `Image` component.
```
