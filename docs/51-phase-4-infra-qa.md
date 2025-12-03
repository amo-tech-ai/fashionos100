
# 🛡️ Phase 4: Infrastructure, QA & Launch

**Status:** 🟢 Ready for Implementation
**Goal:** Ensure the "Minimum Viable Product" is shippable through testing configuration, security audits, documentation, and deployment verification.

**Constraint Note:** Since we are running in a browser-based WebContainer environment, we cannot *execute* server-side tests (Vitest/Playwright) or GitHub Actions pipelines directly. Instead, we will generate the **configuration files** and **static assets** so the project is "eject-ready" for a developer to run locally.

---

## Stage 18: Testing Infrastructure (Configuration)

**Objective:** Setup the testing harness configurations to prevent regression on critical paths when run in a proper Node environment.

**Strategy:**
1.  **Unit Testing (Vitest):** Generate `vitest.config.ts` configured for React/DOM. Create a sample test file for utility functions.
2.  **E2E Testing (Playwright):** Generate `playwright.config.ts`. Create a critical path test spec (`booking-flow.spec.ts`) that walks through the wizard.

---

## Stage 19: CI/CD Pipelines (Workflows)

**Objective:** Define the automation workflows for a future GitHub repository.

**Strategy:**
1.  **PR Checks:** Create `.github/workflows/pr-check.yml` to run linting, type checking, and tests on pull requests.
2.  **Deployment:** Create `.github/workflows/deploy.yml` to handle Supabase Edge Function deployment and database migrations on merge to main.

---

## Stage 20: Security Hardening

**Objective:** Audit data access rules and mock security logic for the frontend.

**Strategy:**
1.  **RLS Verification:** Generate a SQL script (`supabase/tests/security.sql`) using `pgTAP` syntax to conceptually verify row-level security policies.
2.  **Edge Function Security:** Ensure the mock service layer (`ai-service.ts`) includes logic to check for authentication tokens before "calling" the AI, simulating real API gateway security.

---

## Stage 21: Developer Documentation

**Objective:** Make the project maintainable and accessible for new developers.

**Strategy:**
1.  **README.md:** Comprehensive guide including project overview, architecture (ESM/CDN), setup instructions, and environment variable reference.
2.  **CONTRIBUTING.md:** Guidelines for code style, branching strategy, and commit messages.

---

## Stage 22: Production Verification (System Health)

**Objective:** Create a visual "Go/No-Go" dashboard to verify system integrity before launch.

**Strategy:**
1.  **System Health Dashboard:** Build `src/pages/admin/SystemHealth.tsx`.
2.  **Mock Diagnostics:** Since we lack backend connectivity in some areas, simulate checks for:
    - Database Connection (Latency check).
    - Storage Bucket Access.
    - AI Edge Function Availability.
    - Third-party Integrations (Stripe/Resend configs).
