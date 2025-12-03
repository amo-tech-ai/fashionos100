# 🪄 Task 09: Public Site Architecture

**Phase:** 3 (Public Site)
**Dependencies:** Task 01, Task 02
**Output:** SEO Meta System, Brand Constants, Core Landing Pages

---

## 1. Context
We are building the public marketing face of FashionOS. This needs to be visually stunning ("Vogue meets Linear") but highly performant. We are adding SEO capabilities using `react-helmet-async` and defining global brand assets.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a Frontend Architect.
Action: Build the Core Public Site Architecture.

=========================================
1. DEPENDENCIES
=========================================
Update `index.html` importmap to include:
- `"react-helmet-async": "https://esm.sh/react-helmet-async@2.0.4"`

=========================================
2. CONSTANTS (`src/lib/constants.ts`)
=========================================
Create a central file for brand assets.
- `BRAND`: "FashionOS"
- `TAGLINE`: "The Operating System for Fashion"
- `IMAGES`: {
    hero: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1000&auto=format&fit=crop",
    studio: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1000&auto=format&fit=crop",
    runway: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop"
  }

=========================================
3. SEO HEAD (`src/components/seo/SEOHead.tsx`)
=========================================
Create a component wrapping `<Helmet>` from `react-helmet-async`.
- Props: `title`, `description`.
- Default behavior: `title="Page | FashionOS"`.
- Note: You must wrap the entire App in `<HelmetProvider>` in `src/main.tsx`.

=========================================
4. CORE PAGES (`src/pages/site/`)
=========================================
A. **`HomePage.tsx`**:
   - Hero Section: Full height, dark overlay on `IMAGES.hero`, large typography. CTA to `/start-project`.
   - Features: 3-col grid using `Card`.

B. **`AboutPage.tsx`**:
   - Editorial layout. Large serif text ("Our Manifesto").
   - Split screen image/text.

C. **`ContactPage.tsx`**:
   - Simple layout. Left side: "New Business", "Support" emails. Right side: Visual.

=========================================
5. APP INTEGRATION
=========================================
- Update `src/main.tsx` to include `HelmetProvider`.
- Update `src/App.tsx` (or router) to point `/`, `/about`, `/contact` to these new pages.

Output the code for `constants.ts`, `SEOHead.tsx`, `HomePage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`, and the updates to `main.tsx`.
```

---

## 3. Verification Checklist
- [ ] `importmap` contains `react-helmet-async`.
- [ ] Browser title changes when navigating between Home and About.
- [ ] Home page Hero uses the Unsplash constant.