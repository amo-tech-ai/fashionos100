# Fix FashionOS Site - Simple Prompt

## Current Issues

1. **Layout broken** - Site layout not rendering correctly on production (https://fashionos100.vercel.app)
2. **Bundle too large** - 869KB main.js (should be <500KB)
3. **No error boundaries** - App crashes on component errors
4. **Missing TypeScript types** - No Supabase types generated
5. **Performance** - Needs optimization

---

## Fix 0: Fix Broken Layout (PRIORITY)

**Problem:** Site layout broken on production - navigation text rendering incorrectly ("Fa hionOS ." instead of "FashionOS ."), layout elements not displaying properly.

**Solution:**
- Check Tailwind CSS v4 configuration in production
- Verify `@import "tailwindcss"` is working in production build
- Check if PostCSS config is being applied correctly
- Verify container classes and responsive utilities
- Check for CSS conflicts or missing styles
- Ensure `index.css` is imported in `main.tsx`
- Verify Vite build output includes CSS correctly

**Common Issues:**
- Tailwind CSS not processing in production build
- PostCSS config not applied
- CSS not included in build output
- Missing base styles or reset
- Container classes not working

**Success:**
- [ ] Navigation text renders correctly ("FashionOS .")
- [ ] Layout elements display properly
- [ ] Responsive design works on mobile/desktop
- [ ] All Tailwind classes apply correctly
- [ ] CSS loads in production build

**Files to Check:**
- `src/index.css` - Tailwind import
- `postcss.config.js` - PostCSS config
- `vite.config.ts` - Build configuration
- `src/main.tsx` - CSS import
- `package.json` - Dependencies

**Commands:**
```bash
# Build and check CSS
npm run build
ls -lh dist/assets/*.css

# Test production build locally
npm run preview

# Check if CSS is in HTML
curl https://fashionos100.vercel.app | grep -i "\.css"
```

---

## Fix 1: Reduce Bundle Size

**Problem:** Main bundle is 869KB, causing slow loads.

**Solution:**
- Add React.lazy() to dashboard routes in `App.tsx`
- Improve chunking in `vite.config.ts`
- Lazy load heavy components (EventWizard, charts)

**Success:**
- [ ] Main bundle <500KB
- [ ] Routes lazy loaded
- [ ] Build completes without warnings

**Files:**
- `App.tsx` - Add lazy loading
- `vite.config.ts` - Better chunking

---

## Fix 2: Add Error Boundaries

**Problem:** Component errors crash entire app.

**Solution:**
- Create `src/components/ErrorBoundary.tsx`
- Wrap App with error boundary
- Show user-friendly error message

**Success:**
- [ ] Error boundary component created
- [ ] App wrapped with boundary
- [ ] Errors don't crash app

**Files:**
- `src/components/ErrorBoundary.tsx` - New file
- `App.tsx` - Wrap routes

---

## Fix 3: Generate TypeScript Types

**Problem:** Missing Supabase types cause potential runtime errors.

**Solution:**
- Run `supabase gen types typescript`
- Save to `src/types/supabase.ts`
- Use types in Supabase queries

**Success:**
- [ ] Types generated
- [ ] Types used in code
- [ ] No TypeScript errors

**Command:**
```bash
supabase gen types typescript --local > src/types/supabase.ts
```

---

## Fix 4: Performance

**Problem:** Slow page loads and interactions.

**Solution:**
- Add React.memo() to expensive components
- Use useMemo() for calculations
- Lazy load images

**Success:**
- [ ] Lighthouse score >90
- [ ] Page load <2s
- [ ] Smooth interactions

---

## Quick Start

1. **Layout fix** - Fix broken layout on production (PRIORITY)
2. **Bundle size** - Add lazy loading to routes
3. **Error boundaries** - Create ErrorBoundary component
4. **Types** - Generate Supabase types
5. **Performance** - Add memoization

**Test:**
```bash
npm run build  # Check bundle size and CSS
npm run preview # Test production build locally
npm run dev     # Test in browser
```

---

**Start with Fix 0: Layout Fix - critical for production site.**