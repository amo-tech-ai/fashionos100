# 🛡️ Phase 4: Infrastructure, QA & Launch

**Status:** 🟢 Ready for Implementation
**Goal:** Ensure the "Minimum Viable Product" is shippable through testing, security, and deployment workflows.

---

## Stage 18: Testing Infrastructure

**Objective:** Setup the testing harness to prevent regression on critical paths.

**Prompt:**

```text
You are a QA Architect.
Task: Setup the Testing Infrastructure for FashionOS.

CONTEXT:
We need to ensure the Booking Wizard and Auth flows work reliably.

=========================================
1. VITEST SETUP
=========================================
- Configure `vitest` for Unit Testing.
- Create `src/utils/format.test.ts` to test currency/date formatters.
- Create `src/lib/pricing.test.ts` to verify booking calculator logic.

=========================================
2. PLAYWRIGHT E2E
=========================================
- Setup `playwright` config.
- Write a critical path test: `tests/e2e/booking-flow.spec.ts` (Visit page -> Select Service -> Reach Checkout).

Output the configuration files and the two test files.
```

---

## Stage 19: CI/CD Pipelines

**Objective:** Automate quality checks and deployment.

**Prompt:**

```text
You are a DevOps Engineer.
Task: Create GitHub Actions workflows.

CONTEXT:
We deploy to Vercel (Frontend) and Supabase (Backend).

=========================================
1. PULL REQUEST CHECK (`.github/workflows/pr-check.yml`)
=========================================
- Trigger: Push to `main` or PR.
- Steps: Install deps, Lint, Type Check, Run Unit Tests.

=========================================
2. PRODUCTION DEPLOY (`.github/workflows/deploy.yml`)
=========================================
- Trigger: Push to `main`.
- Steps:
  - Run `supabase functions deploy` (if changes detected).
  - Run `supabase db push` (migrations).

Output the YAML content for both workflows.
```

---

## Stage 20: Security Hardening

**Objective:** Ensure tenant isolation and secure API usage.

**Prompt:**

```text
You are a Security Engineer.
Task: Audit and harden the application security.

CONTEXT:
FashionOS is multi-tenant. Data leaks between organizations are critical failures.

=========================================
1. RLS AUDIT SCRIPT
=========================================
Write a SQL script (`supabase/tests/security.sql`) using `pgTAP` to verify:
- User A cannot read User B's `projects`.
- Anon users can ONLY read public `events`.

=========================================
2. EDGE FUNCTION SECURITY
=========================================
Update `ai-copilot` and other functions to:
- Verify the `Authorization` header (JWT).
- Ensure `GEMINI_API_KEY` is only accessed via `Deno.env.get()`.

Output the SQL verification script and the secured Edge Function snippet.
```

---

## Stage 21: Developer Documentation

**Objective:** Make the project maintainable.

**Prompt:**

```text
You are a Technical Writer.
Task: Create the `README.md` and `CONTRIBUTING.md`.

=========================================
1. README.MD
=========================================
Sections:
- Project Overview & Tech Stack.
- **Quick Start:** `npm install`, `cp .env.example`, `supabase start`.
- Environment Variables Table.
- Deployment Guide.

=========================================
2. CONTRIBUTING.MD
=========================================
- Branching strategy.
- Commit message convention.
- Code style guide.

Output the markdown content for both files.
```

---

## Stage 22: Production Verification

**Objective:** The final "Go / No-Go" check before public release.

**Prompt:**

```text
You are a Product Owner.
Task: Create the Pre-Launch Verification Checklist.

=========================================
1. SYSTEM HEALTH PAGE
=========================================
Create `src/pages/admin/SystemHealth.tsx` (Admin only).
- Check DB Connection.
- Check Storage Access.
- Check Edge Function latency.
- Display Green/Red indicators.

=========================================
2. MANUAL SMOKE TEST PLAN
=========================================
List 5 manual scenarios to test on Production:
- "The Guest Checkout"
- "The Sponsor Invite"
- "The Event Build"
- "The Mobile Check"
- "The 404"

Output the React code for the Health Page and the Markdown list for the Smoke Test.
```
