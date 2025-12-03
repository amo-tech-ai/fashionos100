
# 👩‍💻 Developer Onboarding Guide

**Welcome to FashionOS Engineering!**
This guide will get you from `git clone` to "Hello World" in 15 minutes.

---

## 1. Prerequisites
Install these tools before starting:
1.  **Node.js 20+** & **npm**
2.  **Docker Desktop** (For local Supabase)
3.  **Supabase CLI** (`brew install supabase/tap/supabase`)
4.  **VS Code** (Recommended extensions: Tailwind CSS, ES7 React snippets, Prettier)

---

## 2. Setup Steps

### Step 1: Clone & Install
```bash
git clone https://github.com/your-org/fashionos.git
cd fashionos
npm install
```

### Step 2: Configure Environment
Copy the example env file:
```bash
cp .env.example .env
```
*Note: You will need the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Ask the Tech Lead for the **Staging** keys for local dev, or spin up a local instance.*

### Step 3: Start Local Backend (Recommended)
Instead of connecting to a remote dev DB, run Supabase locally for speed.
```bash
supabase start
```
This will:
*   Spin up Postgres, Auth, Storage, Edge Functions locally.
*   Run migrations (`supabase/migrations`).
*   Seed data (`supabase/seed.sql`).
*   Output your local API URL and Keys. **Update your `.env` with these.**

### Step 4: Set Secrets
For AI features to work locally, you need to set secrets in your local Supabase instance:
```bash
supabase secrets set GEMINI_API_KEY="your_key"
```

### Step 5: Run Frontend
```bash
npm run dev
```
Open `http://localhost:3000`.

---

## 3. Project Structure

```text
src/
├── components/       # Shared UI (Button, Inputs)
├── context/          # Global State (Auth, Booking)
├── hooks/            # Data fetching & Logic
├── layouts/          # Page wrappers (Dashboard, Public)
├── lib/              # Service layers (api wrappers)
├── pages/            # Route views
└── types/            # TypeScript definitions
supabase/
├── functions/        # Edge Functions (Deno)
├── migrations/       # SQL Schema history
└── seed.sql          # Dummy data
```

---

## 4. Common Workflows

### Adding a Database Table
1.  `supabase migration new create_my_table`
2.  Edit the SQL file in `supabase/migrations`.
3.  `supabase db reset` (Applies migration + seed).
4.  `supabase gen types typescript --local > src/types/database.ts` (Update TS types).

### Creating a New Page
1.  Create `src/pages/dashboard/MyNewPage.tsx`.
2.  Add route to `src/App.tsx`.
3.  Add navigation item in `src/layouts/DashboardLayout.tsx`.

### Debugging Edge Functions
1.  `supabase functions serve`
2.  Logs will appear in your terminal.

---

## 5. Code Standards

*   **Strict TypeScript:** No `any`. Define interfaces in `src/types`.
*   **Component Composition:** Avoid prop drilling. Use Context or Compound Components.
*   **Styling:** Tailwind only. No CSS modules. Follow `docs/41-design-system-tokens.md`.
*   **Commits:** Use Conventional Commits (e.g., `feat: add sponsor scoring`).

