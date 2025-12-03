# 🛠️ Vercel Build Fix Checklist

**Status:** 🟢 Ready to Deploy
**Error:** `[vite:css] Failed to load PostCSS config: Cannot find module 'tailwindcss'`

This checklist tracks the necessary steps to resolve the dependency and configuration issues preventing the production build on Vercel.

## 1. Dependency Management
*   **Step:** Add `tailwindcss`, `postcss`, and `autoprefixer` to `devDependencies` in `package.json`.
*   **Why:** The build environment (Vercel) cannot find the Tailwind module because it wasn't explicitly listed as a dependency, even though the config files referenced it.
*   **Status:** **Done – correct** ✅
    *   *Verified:* `package.json` now contains these packages in `devDependencies`.

## 2. PostCSS Configuration
*   **Step:** Ensure `postcss.config.js` exists and uses ESM syntax (`export default`).
*   **Why:** The project is set to `"type": "module"`, so CommonJS `module.exports` would fail.
*   **Status:** **Done – correct** ✅
    *   *Verified:* `postcss.config.js` is present and uses valid ESM export.

## 3. TypeScript Configuration
*   **Step:** Restore `tsconfig.node.json`.
*   **Why:** The previous build failed with `ENOENT` for this file. It is required by Vite to type-check the build configuration scripts.
*   **Status:** **Done – correct** ✅
    *   *Verified:* File exists and extends `vite.config.ts` correctly.

## 4. Tailwind Configuration
*   **Step:** Create `tailwind.config.js`.
*   **Why:** Essential for telling Tailwind where to look for class names (`content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]`). Without this, styles may not generate or purge correctly.
*   **Status:** **Done – correct** ✅
    *   *Verified:* File created with FashionOS theme extensions.

## 5. CSS Entry Point
*   **Step:** Add `@tailwind` directives to `src/index.css`.
*   **Why:** Injects Tailwind's base, components, and utilities into the app.
*   **Status:** **Done – correct** ✅
    *   *Verified:* `src/index.css` includes the necessary directives.

## 6. Lockfile Consistency
*   **Step:** Run `npm install` locally and commit `package-lock.json`.
*   **Why:** Vercel relies on the lockfile to install the exact versions of the new dependencies.
*   **Status:** **Pending Action** ⚠️
    *   *Action:* You must run `npm install` locally and push the updated lockfile.

---

**Next Steps:**
1.  Run `npm install` locally to update your lockfile.
2.  Commit `tailwind.config.js`, `src/index.css`, `package.json`, and `package-lock.json`.
3.  Push to Vercel.