# 🌍 Phase 3: Public Website & Marketing

**Status:** 🟢 Ready for Implementation
**Goal:** Build the public-facing "Storefront" of FashionOS using a high-performance SPA architecture.

---

## Stage 11: Brand Identity & SEO Foundation

**Objective:** Define the visual constants and set up the metadata engine using `react-helmet-async`.

**Prompt:**

```text
You are a Frontend Architect.
Task: Set up the Brand constants and SEO infrastructure.

CONTEXT:
This is a Client-Side SPA. We cannot use server-side metadata. We use `react-helmet-async`.

=========================================
1. DEPENDENCIES
=========================================
Update `index.html` importmap to include:
- `"react-helmet-async": "https://esm.sh/react-helmet-async@2.0.4"`

=========================================
2. CONSTANTS (`src/lib/constants.ts`)
=========================================
Export constants for:
- `BRAND_NAME`: "FashionOS"
- `TAGLINE`: "The Operating System for Fashion"
- `ASSETS`: An object containing placeholder Unsplash URLs for:
  - `HERO_VIDEO`
  - `FASHION_EDITORIAL`
  - `RUNWAY_SHOT`
  - `PRODUCT_SHOT`

=========================================
3. SEO COMPONENT (`src/components/seo/SEOHead.tsx`)
=========================================
Create a component that wraps `<Helmet>`:
- Props: `title`, `description`, `image?`.
- Logic: Automatically appends ` | FashionOS` to titles.
- Tags: Open Graph (og:title, og:description, og:image) and Twitter Card tags.

Output the updated `index.html` (importmap only), `src/lib/constants.ts`, and `src/components/seo/SEOHead.tsx`.
```

---

## Stage 12: Core Pages Architecture

**Objective:** Build the primary entry points (Home, About, Contact) using the new Design System.

**Prompt:**

```text
You are a UI Engineer.
Task: Build the Core Public Pages.

CONTEXT:
Use `src/components/ui/*` primitives (Button, Card, FadeIn).
Use `WebsiteLayout`.

=========================================
1. HOMEPAGE (`src/pages/site/HomePage.tsx`)
=========================================
- **Hero:** Full height. Dark overlay. Headline: "The Operating System for Fashion". CTA: "Start Project" -> `/start-project`.
- **Features:** 3-column grid using `Card`. Icons for "Studio", "Events", "Intelligence".
- **Social Proof:** A simple marquee or grid of "Trusted By" brand names.

=========================================
2. CONTENT PAGES
=========================================
- **`src/pages/site/AboutPage.tsx`**:
  - Layout: Split screen (Text Left, Image Right).
  - Typography: Use `font-serif` for "Our Manifesto".
- **`src/pages/site/ContactPage.tsx`**:
  - Layout: Two columns.
  - Left: Contact Info (Email, Office Address).
  - Right: A visual placeholder for a map or a high-fashion image. (No functional form backend yet).

Output the code for these three pages.
```

---

## Stage 13: Service Templates

**Objective:** Create a reusable architecture for the various service offerings to avoid code duplication.

**Prompt:**

```text
You are a Component Architect.
Task: Build the Service Page Template.

CONTEXT:
We have 5+ service pages (Photography, Video, Web, etc.) that share the same layout.

=========================================
1. TEMPLATE (`src/components/templates/ServiceTemplate.tsx`)
=========================================
Props:
- `title` (string)
- `subtitle` (string)
- `heroImage` (string URL)
- `features` (Array of {title, description, icon})
- `pricing` (Array of {tier, price, features})

Layout:
- **Hero:** Parallax background image.
- **Intro:** Large typography.
- **Feature Grid:** 2x2 or 3x1 grid.
- **Pricing Cards:** Distinctive cards for packages.

=========================================
2. IMPLEMENTATION
=========================================
Create `src/pages/site/services/PhotographyPage.tsx`:
- Use `ServiceTemplate`.
- Data: "E-Commerce Photography", "Editorial Campaigns".
- Pricing: "Lookbook ($500)", "Campaign ($1500)".

Output the Template and the Photography Page.
```

---

## Stage 14: Directory & Talent Network

**Objective:** Build the public marketplace view for discovering talent.

**Prompt:**

```text
You are a Product Designer.
Task: Implement the Talent Directory UI.

=========================================
1. COMPONENT (`src/components/directory/TalentCard.tsx`)
=========================================
- Visual: High-end "Comp Card" style.
- Props: `name`, `role`, `image`, `rate`, `tags`.
- Layout: Aspect Ratio 3:4 image. Name and Role overlay or below.

=========================================
2. PAGE (`src/pages/site/DirectoryPage.tsx`)
=========================================
- **Sidebar:** Filters (Role: Model, Photographer; City: NYC, London). *Visual only for now.*
- **Grid:** Responsive masonry or simple grid (cols-1 md:cols-3).
- **Data:** Create a `MOCK_TALENT` array with 6 high-quality example profiles.

Output the Card component and the Directory page.
```

---

## Stage 17: Performance & Polish

**Objective:** Optimize the SPA for production loading speeds.

**Prompt:**

```text
You are a Performance Engineer.
Task: Optimize the application loading.

=========================================
1. LAZY IMAGE (`src/components/ui/LazyImage.tsx`)
=========================================
- Wrapper around `<img>`.
- Props: `src`, `alt`, `className`, `aspectRatio`.
- Logic: Use `loading="lazy"`.
- Visual: Show a gray `bg-gray-100` pulse skeleton until the image loads (onLoad event).

=========================================
2. ROUTE SPLITTING
=========================================
Update `src/router.tsx`:
- Implement `React.lazy()` for all major page routes (Dashboard, Public Pages).
- Wrap the router in `React.Suspense` with a full-screen `LoadingScreen` fallback.

Output the LazyImage component and the updated Router.
```