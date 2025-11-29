# Fix: Module Resolution Error for BookingLayout

## Problem
The app failed to load in the browser with `404` errors for `main.tsx` and `Uncaught TypeError: Failed to resolve module specifier "@/layouts/BookingLayout"`.

## Root Causes
1.  **Cloud Run Serving Source:** The deployment is likely serving the root directory (containing `index.html` pointing to `/src/main.tsx`) instead of the built `dist` folder. Browsers cannot execute `.tsx` files.
2.  **Weak Alias Config:** `vite.config.ts` used `path.resolve()` in a way that could be fragile in ESM contexts, potentially causing build failures that lead to serving source files as fallback.

## Fixes Applied
1.  **Updated `vite.config.ts`**: switched to `fileURLToPath(import.meta.url)` to correctly derive `__dirname` in ESM modules. This ensures the `@` alias always resolves to the absolute `src` path.
2.  **Verified Imports**: Confirmed `BookingLayout.tsx` exports are clean.

## Next Steps (Ops)
- Ensure the deployment command runs `npm run build` and then serves the `dist` folder.
- If serving static files via a simple server (like `serve -s dist`), ensure the entry point is the built `index.html`.
