
# 🎨 FashionOS Design System: "Atelier"

**Version:** 1.0
**Status:** 🟢 Standardized
**Tech Stack:** Tailwind CSS, Lucide React, Framer Motion

---

## 1. Core Philosophy
The "Atelier" design system is built on **Semantic Minimalism**. It prioritizes content (images/video) over UI chrome.
*   **Principles:**
    1.  **Whitespace is Luxury:** Generous padding (`p-8`, `gap-6`) is the default.
    2.  **Typography as UI:** Heavy reliance on *Playfair Display* sizes to denote hierarchy rather than background colors.
    3.  **Micro-Interactions:** Subtle hover lifts and scale effects (`scale-[1.02]`) replace loud button colors.

---

## 2. Design Tokens

### 2.1 Color Palette (Tailwind Extensions)
We do not use raw hex codes in components. Use these semantic names.

| Token Name | Tailwind Class | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas** | `bg-fashion-cream` | `#FBF8F5` | Global app background. |
| **Surface** | `bg-white` | `#FFFFFF` | Cards, Modals, Sidebars. |
| **Ink** | `text-fashion-black` | `#1A1D2D` | Primary headings and body. |
| **Muted** | `text-gray-500` | `#6B7280` | Secondary text, labels. |
| **Brand** | `text-fashion-purple` | `#C084FC` | Primary actions, active states. |
| **Success** | `text-green-600` | `#059669` | Completed, Paid, Signed. |
| **Warning** | `text-amber-600` | `#D97706` | Pending, Review. |
| **Error** | `text-red-600` | `#DC2626` | Failed, Cancelled. |

### 2.2 Typography Scale
*   **Display:** `font-serif text-5xl md:text-7xl font-bold tracking-tight` (Heroes)
*   **Heading 1:** `font-serif text-3xl font-bold` (Page Titles)
*   **Heading 2:** `font-serif text-2xl font-bold` (Card Titles)
*   **Heading 3:** `font-sans text-sm font-bold uppercase tracking-widest` (Section Tags)
*   **Body:** `font-sans text-base md:text-sm leading-relaxed` (Readability)
*   **Caption:** `font-sans text-xs font-medium text-gray-400` (Metadata)

### 2.3 Elevation & Borders
*   **Border:** `border border-gray-100` (Default card border).
*   **Shadow:** `shadow-sm` (Resting), `shadow-xl` (Hover/Modal).
*   **Radius:** `rounded-2xl` (Cards), `rounded-full` (Buttons/Pills).

---

## 3. Component Specifications

### 3.1 Buttons
Buttons must handle `loading`, `disabled`, and `icon` states consistently.

```tsx
// Base Class
"inline-flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"

// Variants
primary: "bg-fashion-black text-white hover:bg-gray-800 rounded-full uppercase tracking-widest font-bold text-xs px-8 py-3"
secondary: "bg-white border border-gray-200 text-fashion-black hover:border-fashion-black rounded-full uppercase tracking-widest font-bold text-xs px-8 py-3"
ghost: "text-gray-500 hover:text-fashion-black hover:bg-gray-50 rounded-lg px-4 py-2"
```

### 3.2 Cards
Cards are the primary container for dashboard data.
*   **Wrapper:** `bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all`
*   **Header:** Flex row, title left, actions right (`MoreHorizontal`).
*   **Empty State:** Dashed border `border-2 border-dashed border-gray-200`, centered icon, clear CTA.

### 3.3 Data Visualization
*   **Charts:** Minimal axes. Pastel fills (`bg-purple-100`, `bg-pink-100`).
*   **Status Badges:** Pill shape (`rounded-full`), `px-3 py-1`, `text-[10px] uppercase font-bold`.

---

## 4. Responsive Behavior
1.  **Mobile First:** All grids start as `grid-cols-1`.
2.  **Breakpoints:**
    *   `md`: Unstack forms to 2 columns.
    *   `lg`: Show sidebar navigation.
    *   `xl`: Expand dashboard grids to 4 columns.
3.  **Touch Targets:** Minimum `44px` height on mobile inputs and buttons.
4.  **Safe Areas:** `pb-safe` utility class for bottom sheets on iPhone X+.

---

## 5. Accessibility (A11y) Guidelines
*   **Contrast:** Ensure `text-gray-400` is only used for non-critical text. Use `text-gray-500` for readable metadata.
*   **Focus:** Never suppress `focus:ring`. Use `focus:ring-fashion-purple`.
*   **Semantics:** Use `<main>`, `<nav>`, `<aside>`, and `<header>` regions.
*   **Forms:** All inputs must have `<label>` (visible or `sr-only`).

