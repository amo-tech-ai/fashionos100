
# 🕵️‍♂️ Event Wizard & AI Feature Verification Tracker

**Audit Date:** 2025-03-02
**Scope:** Event Wizard, AI Integration, Veo, Database

---

## 🚨 Critical Findings (Blockers)

1.  **Database Disconnected:** The Event Wizard **does not save** to Supabase. `handlePublish` in `EventWizard.tsx` currently logs to console.
2.  **Missing Step:** The `Schedule` step is defined in requirements but missing from the code (`types.ts` Step enum only has 5 steps).
3.  **Security Risk:** Gemini API calls are made directly from the client (`EventWizard.tsx`, `VeoTrailerGenerator.tsx`) using `process.env.API_KEY`. This exposes the key. These must be moved to Edge Functions.

---

## 1️⃣ Task 01: Event Creation Wizard UI

**Status:** 🟡 **60% Complete**

| Feature | Status | Verification Proof (Codebase Audit) |
| :--- | :--- | :--- |
| **Wizard Shell** | ✅ **Pass** | `EventWizard.tsx` implements a stepper pattern with progress bar. |
| **Intro Step** | ✅ **Pass** | `WizardIntro.tsx` exists with textarea input. |
| **Basics Step** | ✅ **Pass** | `WizardBasics.tsx` captures Title, Desc, Category. |
| **Venue Step** | ⚠️ **Partial** | `WizardVenue.tsx` exists but uses a simple text input for location. **Missing:** Dropdown to select from `venues` DB table. |
| **Tickets Step** | ✅ **Pass** | `WizardTickets.tsx` allows adding/removing tiers and calculates revenue. |
| **Schedule Step** | ❌ **Fail** | **Missing File:** `WizardSchedule.tsx`. <br> **Proof:** `components/events/wizard/types.ts` -> `enum Step { INTRO, BASICS, VENUE, TICKETS, REVIEW }`. No SCHEDULE step exists. |
| **Review Step** | ✅ **Pass** | `WizardReview.tsx` renders the `EventCard` preview correctly. |
| **Publish Action** | ❌ **Fail** | **Proof:** `EventWizard.tsx` line 166: `const handlePublish = () => { console.log("Publishing Event:", state); ... }`. No Supabase `insert` call. |

---

## 2️⃣ Task 02: AI Integration (Gemini)

**Status:** 🟡 **40% Complete**

| Feature | Status | Verification Proof (Codebase Audit) |
| :--- | :--- | :--- |
| **Text Generation** | ✅ **Pass** | `EventWizard.tsx` uses `gemini-2.5-flash` to parse natural language. |
| **Structured Output** | ✅ **Pass** | **Proof:** `EventWizard.tsx` uses `responseSchema` with `Type.OBJECT` to force JSON output. |
| **URL Context** | ❌ **Fail** | **Missing:** No input field in `WizardIntro.tsx` for URLs. No logic to fetch/parse HTML. |
| **File Search** | ❌ **Fail** | **Missing:** No file upload button in `WizardIntro.tsx`. No integration with Gemini Files API. |
| **Smart Defaults** | ⚠️ **Partial** | AI infers details from prompt, but does not use "Thinking" models for complex logic (budgeting/pricing). |

---

## 3️⃣ Task 12: Veo Event Trailers

**Status:** 🟢 **90% Complete (Frontend)**

| Feature | Status | Verification Proof (Codebase Audit) |
| :--- | :--- | :--- |
| **UI Component** | ✅ **Pass** | `VeoTrailerGenerator.tsx` exists and is integrated into `EventsPage.tsx`. |
| **Generation Logic** | ✅ **Pass** | Calls `veo-3.1-fast-generate-preview`. |
| **Polling Mechanism** | ✅ **Pass** | **Proof:** `VeoTrailerGenerator.tsx` implements `while (!operation.done)` loop to wait for video. |
| **Security** | ❌ **Fail** | **Proof:** Line 42 `const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });`. Key is exposed in client bundle. |

---

## 4️⃣ Task 01: Database Schema

**Status:** 🟡 **Verified in Docs, Unverified in DB**

| Feature | Status | Verification Proof |
| :--- | :--- | :--- |
| **Schema Def** | ✅ **Pass** | `docs/06-event-schema.md` contains correct SQL for `events`, `tickets`, `schedules`. |
| **Migration** | ❓ **Unknown** | Cannot verify if SQL has been run on Supabase instance. |
| **Types** | ⚠️ **Partial** | `types.ts` has `Event` interface, but strict Supabase generated types are missing. |

---

## 📉 Burn Down Chart

- [x] **Scaffold UI** (Wizard, Cards, Layouts)
- [x] **Basic AI Logic** (Prompt -> JSON)
- [x] **Veo Generator** (Frontend Logic)
- [ ] **Connect Database** (Replace Mocks with Supabase Client)
- [ ] **Implement Schedule Step** (Create Component & Logic)
- [ ] **Secure API Keys** (Move AI calls to Edge Functions)
- [ ] **Advanced AI** (File/URL inputs)

## 🛠 Recommended Next Steps

1.  **Fix Data Layer:** Create `lib/supabase.ts` and replace `handlePublish` with actual `supabase.from('events').insert(...)`.
2.  **Add Schedule:** Create `WizardSchedule.tsx` and update `Step` enum.
3.  **Secure AI:** Move `VeoTrailerGenerator` logic to a Supabase Edge Function `generate-trailer`.
