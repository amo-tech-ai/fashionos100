
# 🏗️ DevOps & Infrastructure Architecture

**Version:** 1.0
**Target:** Supabase + Vercel
**CI/CD:** GitHub Actions

---

## 1. Environment Strategy

We utilize three strict environments to ensure stability.

| Environment | URL | Database | Usage |
| :--- | :--- | :--- | :--- |
| **Local** | `localhost:3000` | Local Docker | Development, prototyping, schema changes. |
| **Staging** | `stage.fashionos.dev` | Supabase Project A | QA, Integration Tests, Client Demos. |
| **Production** | `app.fashionos.dev` | Supabase Project B | Live Traffic, Real Payments. |

---

## 2. Database Management (Supabase)

### 2.1 Migrations
*   **Source of Truth:** `supabase/migrations/*.sql` files in Git.
*   **Workflow:**
    1.  Dev makes changes locally via Studio.
    2.  Run `supabase db diff -f name_of_change` to generate migration file.
    3.  Commit SQL file.
    4.  CI pipeline applies migration to Staging/Prod.
*   **Forbidden:** altering Staging/Prod schema via Dashboard UI.

### 2.2 Seeding
*   **File:** `supabase/seed.sql`
*   **Contents:** Static enums (`app_role`), test accounts (Admin, Designer), and dummy venue data for local dev.

---

## 3. Edge Functions Management

### 3.1 Secrets
Do not commit `.env` files. Secrets are managed via Supabase CLI.
Required Secrets:
*   `GEMINI_API_KEY`: For AI generation.
*   `STRIPE_SECRET_KEY`: For payments.
*   `RESEND_API_KEY`: For transactional emails.
*   `GOOGLE_MAPS_API_KEY`: For venue grounding.

**Setting Secrets:**
```bash
supabase secrets set GEMINI_API_KEY="xyz" --project-ref <PROJECT_ID>
```

### 3.2 Deployment
Functions are deployed individually to minimize cold starts.
```bash
supabase functions deploy generate-event-draft --no-verify-jwt
supabase functions deploy sponsor-ai --no-verify-jwt
```

---

## 4. CI/CD Pipeline (GitHub Actions)

### Workflow: `deploy-production.yml`

```yaml
name: Deploy Production
on:
  push:
    branches: [main]

jobs:
  # 1. Frontend Build & Deploy
  web-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}

  # 2. Database Migrations
  db-migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: supabase/setup-cli@v1
      - run: supabase db push --linked --project-ref ${{ secrets.PROD_PROJECT_ID }}

  # 3. Edge Functions
  functions-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: supabase/setup-cli@v1
      - run: supabase functions deploy --all --project-ref ${{ secrets.PROD_PROJECT_ID }}
```

---

## 5. Monitoring & Logging

### 5.1 Error Tracking
*   **Frontend:** Sentry (React SDK). Catches crash boundaries and API 4xx/5xx errors.
*   **Backend:** Supabase Logs -> Log Explorer.

### 5.2 Performance
*   **Frontend:** Vercel Analytics (Core Web Vitals).
*   **Database:** Supabase Performance Advisor (Index suggestions).

### 5.3 AI Cost Monitoring
*   Create a dashboard in Google Cloud Console to track Gemini API usage by model (`gemini-3-pro` vs `gemini-2.5-flash`).
*   Set budget alerts at $50/month thresholds.

