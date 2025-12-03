
# 🪄 Task 12: Testing & CI/CD Configuration

**Phase:** 4 (Infrastructure & QA)
**Dependencies:** None (Files are standalone)
**Output:** Config files for Vitest, Playwright, and GitHub Actions

---

## 1. Context
We need to prepare the repository for professional development workflows. Even though we cannot run these in the browser environment, the files must exist for the project to be valid.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a DevOps & QA Architect.
Action: Generate the testing and CI/CD configuration files for FashionOS.

=========================================
1. VITEST CONFIGURATION
=========================================
Create `vitest.config.ts`:
- Use `defineConfig` from 'vitest/config'.
- Set environment to 'jsdom'.
- Configure alias resolution for '@/*' to './src/*'.

Create `src/utils/format.test.ts`:
- Write a simple unit test for `formatCurrency` (assume it exists in utils) to verify it formats numbers correctly (e.g., 1000 -> "$1,000.00").

=========================================
2. PLAYWRIGHT CONFIGURATION
=========================================
Create `playwright.config.ts`:
- Set `testDir` to './tests/e2e'.
- Configure `use` with `baseURL: 'http://localhost:3000'`.
- Define projects for Chrome, Firefox, and Mobile Safari.

Create `tests/e2e/booking-flow.spec.ts`:
- Write a test outline that:
  1. Navigates to '/start-project'.
  2. Checks for the presence of the "Select Service" header.
  3. Simulates clicking the "Photography" card.
  4. Verifies navigation to the next step.

=========================================
3. GITHUB ACTIONS WORKFLOWS
=========================================
Create `.github/workflows/pr-check.yml`:
- Triggers on `pull_request`.
- Jobs:
  - `lint`: Runs `npm run lint`.
  - `typecheck`: Runs `npx tsc --noEmit`.
  - `test`: Runs `npm run test` (Vitest).

Create `.github/workflows/deploy.yml`:
- Triggers on `push` to `main`.
- Jobs:
  - `deploy-functions`: Uses `supabase/setup-cli` to run `supabase functions deploy`.
  - `db-migration`: Runs `supabase db push`.

Output the content for these 6 files.
```

---

## 3. Verification Checklist
- [ ] `vitest.config.ts` exists.
- [ ] `playwright.config.ts` exists.
- [ ] `.github/workflows/` directory contains two YAML files.
- [ ] Test files are created in correct directories.
