
# 🛡️ Production Readiness Audit: Brand Profile System

**Status:** Pre-Launch Review
**Module:** Brand Analysis & Profile Management

---

## 1. Security & RLS
- [x] **RLS Policies:** Implemented for all 6 tables. Owner-only access is enforced.
- [ ] **Service Role Protection:** Ensure Edge Functions using `service_role` key are not exposed to client-side calls.
- [ ] **Input Sanitization:** Ensure Zod schemas in `src/types/brand.ts` strictly validate AI outputs before DB insert to prevent injection of malformed JSON.

## 2. Database & Performance
- [x] **Normalization:** Schema is normalized (separate tables for Identity vs Visuals).
- [x] **Indexing:** Foreign keys (`company_id`, `owner_id`) are indexed.
- [ ] **JSONB Indexing:** If we query *inside* `production_recommendations` (e.g. "Find brands who need video"), add GIN indexes to the JSONB columns.
- [ ] **Cascades:** `ON DELETE CASCADE` is correctly set on all foreign keys.

## 3. Reliability & Error Handling
- [ ] **AI Fallback:** Logic needed in `brand-service.ts` to handle partial JSON or timeouts from Gemini.
- [ ] **Transaction Safety:** The `saveAIBrandProfile` function performs multiple inserts. Wrap this in a Supabase RPC (stored procedure) or ensure client-side error handling deletes the parent `company` if child inserts fail (Atomicity).

## 4. Scalability
- [ ] **Storage:** If brands upload brand bibles (PDFs), ensure a dedicated Storage Bucket (`brand-assets`) is configured with RLS.
- [ ] **Rate Limiting:** The `generate-brand-profile` Edge Function needs rate limiting to prevent API key abuse.

## 5. UX & Frontend
- [ ] **Loading States:** Skeleton screens for the Dashboard while fetching profile data.
- [ ] **Empty States:** UI for when a brand has no recommendations generated yet.
- [ ] **Mobile Optimization:** Ensure the 3-column grid collapses gracefully on mobile.

## 6. Monitoring
- [ ] **Logs:** Enable Supabase Database logs and Edge Function logs.
- [ ] **Alerts:** Set up alerts for failed AI generation requests.

---

**Verdict:** The schema and core logic are solid. Focus next on **Transaction Safety** (RPC) and **Mobile Polish**.
