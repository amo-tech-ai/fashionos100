# 🪄 Task 02: Design System & UI Primitives

**Phase:** 2 (System Build)
**Dependencies:** Task 01
**Output:** Reusable Component Library

---

## 1. Context
We implement the "Atelier" visual language. High contrast, serif headers (`Playfair Display`), functional sans-serif body (`Inter`), and specific accent colors.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a UI Engineer.
Action: Implement the FashionOS "Atelier" Design System.

=========================================
1. TAILWIND CONFIG
=========================================
Update `tailwind.config.js` (or the style block in index.html):
- **Colors:**
  - `fashion-cream`: '#FBF8F5'
  - `fashion-black`: '#1A1D2D'
  - `fashion-purple`: '#C084FC'
- **Fonts:**
  - Serif: 'Playfair Display'
  - Sans: 'Inter'

=========================================
2. CREATE PRIMITIVES
=========================================
Create the following files in `src/components/ui/`:

A. **`Button.tsx`**
   - Variants: `primary` (Black bg), `secondary` (White bg, black border), `ghost`.
   - Props: `isLoading`, `icon`, `fullWidth`.
   - Classes: `rounded-full uppercase tracking-widest font-bold`.

B. **`Input.tsx`**
   - Style: Large touch target (56px height), `bg-white`, `border-gray-100`.
   - Focus state: `ring-fashion-purple`.

C. **`Card.tsx`**
   - Style: `bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all`.

D. **`FadeIn.tsx`**
   - A wrapper that adds a simple CSS fade-in animation on mount.

=========================================
3. UPDATE APP
=========================================
- Apply `bg-fashion-cream` to the body tag in `index.css` or `index.html`.
- Update `HomePage` to use a `Button` and `Card` to verify the system.

Output code for the config and the 4 components.
```

---

## 3. Verification Checklist
- [ ] Buttons have the correct "pill" shape.
- [ ] Font family is `Playfair Display` for headings.
- [ ] Cards have the correct corner radius (approx 24px/1.5rem).
