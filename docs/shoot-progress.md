# 🛡️ Shoot & Studio System: Production Readiness Audit

**Audit Date:** 2025-03-05
**Reviewer:** Senior Full-Stack Architect
**Scope:** Booking Wizard, Brand Intelligence, Studio Production, Settings, Infrastructure

## 📝 Executive Summary

The FashionOS platform has achieved **Code Complete** status for MVP features. The application successfully integrates complex flows involving Supabase Auth, Database, Storage, and Google Gemini AI.

However, the system is **NOT yet Production Ready**. While the logic exists, the *operational reliability* (Infrastructure-as-Code, Testing, Observability) is currently at a "Prototype" level. Critical manual configurations are required before live traffic can be handled safely.

---

## 📊 Progress Matrix (Refined)

Status Key:
*   🟢 **Green:** Production Ready (Tested & Optimized)
*   🟡 **Yellow:** Implemented (Needs Verification/Infra)
*   🔴 **Red:** Blocked / Missing / Critical Risk

| Module / Feature | Status | % Ready | Key Files | Critical Gaps / Next Actions |
| :--- | :---: | :---: | :--- | :--- |
| **Brand Intelligence** | 🟡 | 90% | `BrandProfilePage.tsx`<br>`generate-brand-profile` | **Risk:** Edge Function timeouts on large sites. **Action:** Add timeout handling & loading skeletons. |
| **Booking Wizard** | 🟡 | 90% | `pages/public/booking/*`<br>`shoots` table | **Risk:** Stripe integration is mocked. **Action:** Replace mock delay with Stripe Elements & Webhooks. |
| **UI Components** | 🟢 | 100% | `SceneCard.tsx`<br>`Button.tsx` | Responsive and stable. Ready for deploy. |
| **Studio: Visual QA** | 🟡 | 85% | `VisualQAPage.tsx`<br>`shoot_assets` table | **Risk:** RLS policies on `shoot_assets` are complex. **Action:** Negative testing (User A accessing User B's assets). |
| **Studio: Delivery** | 🔴 | 80% | `DeliveryPortal.tsx`<br>`Storage` | **Blocker:** Storage buckets (`production-assets`) do not exist in Prod. **Action:** Run init scripts. |
| **Settings & Profile** | 🟢 | 95% | `DashboardSettings.tsx` | Functional. **Note:** Avatar upload relies on `avatars` bucket existence. |
| **Database Schema** | 🟡 | 85% | `*.sql` migrations | **Risk:** Migrations are manual. **Action:** Set up CI/CD for migrations (GitHub Actions). |

---

## 🧪 Testing Status & Requirements

The codebase currently lacks automated testing. Manual verification is required until a test suite is established.

### 1. Critical Failure Paths (Must Verify)
- [ ] **AI Failure:** If `gemini-2.5-flash` errors (quota/timeout), does the UI show a graceful error or a white screen?
- [ ] **Auth Token Expiry:** If a user session expires while in the Booking Wizard, does it auto-save or lose data?
- [ ] **Large File Uploads:** Upload a 50MB video to `DeliveryPortal`. Verify chunking/timeout settings in Supabase Storage.
- [ ] **RLS Negative Test:** Manually attempt to fetch `SELECT * FROM shoots` as an anonymous user. Should return 0 rows.

### 2. Integration Scenarios
- [ ] **End-to-End Booking:** Wizard -> Payment (Mock) -> Dashboard Update -> Admin View.
- [ ] **Brand Profile Gen:** URL Input -> Edge Function -> DB Insert -> UI Update.

---

## 🔐 Security & RLS Verification

### 1. Database Security (RLS)
- **`shoots` Table:**
    *   ✅ Policy: `auth.uid() = designer_id` (Clients view own).
    *   ⚠️ **Gap:** Need specific policy for "Admin/Studio" role to view *all* shoots.
- **`brand_profiles` Table:**
    *   ✅ Policy: `owner_id = auth.uid()`.
    *   ⚠️ **Gap:** Ensure Edge Function bypasses RLS correctly using `Service Role` only when necessary, and never leaks it.

### 2. Storage Security
- **Buckets:** `avatars` (Public Read), `production-assets` (Private), `sponsor-assets` (Private).
- **Policies:**
    *   [ ] Verify: `(bucket_id = 'production-assets' AND auth.role() = 'authenticated')` is NOT enough. Must check `shoot_id` ownership.
    *   [ ] **Recommendation:** Use Signed URLs for all private assets in the Delivery Portal.

### 3. Edge Functions
- [ ] **Secret Management:** Ensure `GEMINI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are set in Production Secrets, NOT in code.
- [ ] **CORS:** Verify `_shared/cors.ts` whitelist. Currently set to `*` (wildcard). **Recommendation:** Lock down to your production domain.

---

## 🧱 Infrastructure & Deployment Plan

### 1. Environment Parity
- **Local:** Docker/Supabase CLI.
- **Staging:** (Missing) - Highly recommended before Prod.
- **Production:** Supabase Managed Project.

### 2. Storage Provisioning (Manual Step Required)
Edge Functions cannot create buckets. You **MUST** run this in Supabase Dashboard:
```bash
# Create buckets
avatars (Public)
brand-assets (Private)
production-assets (Private)
event-media (Public)
```

### 3. CI/CD Recommendations
- **GitHub Actions:**
    - On Push `main`: Run `supabase functions deploy`.
    - On PR: Run `supabase migration list` to check for drift.

---

## 👁️ Error Handling & Observability

### 1. Client-Side
- **Global Error Boundary:** `src/components/ErrorBoundary.tsx` is implemented.
- **Toasts:** `src/components/Toast.tsx` is implemented.
- **Gap:** No remote logging (e.g., Sentry). If a client crashes, we won't know.

### 2. Server-Side (Edge Functions)
- **Logging:** Current functions use `console.log`. These appear in Supabase Dashboard.
- **Recommendation:** Use structured logging (`console.log(JSON.stringify({ event: 'error', details: ... }))`) for better parsing.

---

## ⚡ Performance Optimization Checklist

- [ ] **Database Indexing:**
    - `shoots(designer_id)` - ✅ Included in migration.
    - `shoot_assets(shoot_id)` - ✅ Included in migration.
    - `events(slug)` - ✅ Included in migration.
- [ ] **Image Optimization:**
    - `src/lib/storage.ts` uploads raw base64.
    - **Optimization:** Resize images on the client (canvas/browser-image-compression) *before* upload to save bandwidth and storage costs.
- [ ] **Lazy Loading:**
    - React `lazy/Suspense` should be used for heavy dashboard widgets (Charts, Maps).

---

## 🚀 Final "Go-Live" Action Plan

1.  **Database:** Run `supabase migration up` against remote production.
2.  **Storage:** Manually create 4 buckets (`avatars`, `brand-assets`, `production-assets`, `event-media`) and set policies.
3.  **Secrets:** Run `supabase secrets set GEMINI_API_KEY=...` and `STRIPE_SECRET_KEY=...`.
4.  **Deploy:** Run `supabase functions deploy`.
5.  **Sanity Check:** Create 1 Test User and run the full Booking flow.
