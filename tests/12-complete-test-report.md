# Complete Event Wizard Test Report
**Date:** 2025-03-07  
**Test Type:** End-to-End Full Cycle  
**Wizard Steps:** 8 (including new VISUALS step)

---

## ✅ Pre-Test Status

### Environment
- ✅ Dev server running on port 3000
- ✅ Environment variables configured
- ✅ Supabase client configured
- ✅ Edge functions deployed: `resolve-venue`, `generate-media`

### Code Analysis
- ✅ All 8 wizard steps implemented
- ✅ AI generation code correct
- ✅ Event submission code correct
- ✅ New VISUALS step integrated
- ⚠️ New edge functions may need deployment

---

## 🧪 Complete Wizard Flow (8 Steps)

### Step 0: INTRO (AI Setup)
**Component:** `WizardIntro.tsx`

**Test Actions:**
1. Fill event description
2. Fill date and location
3. Navigate through 3 sub-screens
4. Select mood and audience tags
5. **CRITICAL:** Click "Generate Event Draft"
   - Calls: `/functions/v1/generate-event-draft`
   - Expected: 200 status, JSON with event data
   - Populates: title, description, dates, tickets, schedule

**Code Verification:**
- ✅ AI generation handler (EventWizard.tsx:77-168)
- ✅ Error handling with fallback
- ✅ File upload support
- ✅ URL input support
- ✅ Session token handling

**Potential Issues:**
- ⚠️ 401 if Supabase anon key invalid
- ⚠️ 500 if GEMINI_API_KEY missing in Supabase secrets
- ⚠️ Modal alert on failure (currently blocking browser)

---

### Step 1: BASICS
**Component:** `WizardBasics.tsx`

**Test Actions:**
1. Verify/complete title
2. Verify/complete description
3. Select category
4. Set start date/time
5. Set end date/time
6. Enter location

**Code Verification:**
- ✅ All form inputs functional
- ✅ Date picker component
- ✅ Category dropdown
- ✅ Validation in place

**Potential Issues:**
- ⚠️ Date validation (end before start)
- ⚠️ Required field validation

---

### Step 2: VISUALS (NEW)
**Component:** `WizardVisuals.tsx`

**Test Actions:**
1. Select image type (Hero Banner, Poster, etc.)
2. Optionally add custom prompt
3. **Click "Generate Previews"**
   - Calls: `/functions/v1/generate-image-preview`
   - Expected: 200 status, array of preview images
4. Select preview from grid
5. Optionally refine with "Pro Refinement"
   - Calls: `/functions/v1/generate-image-final`
   - Expected: 200 status, final image
6. Upload final image to storage
7. Click "Next Step"

**Code Verification:**
- ✅ Preview generation handler (WizardVisuals.tsx:41-110)
- ✅ Final image generation (ProRefinementPanel.tsx)
- ✅ Image upload to Supabase Storage (lib/storage.ts)
- ✅ Brand URL extraction
- ✅ Error handling

**Potential Issues:**
- ⚠️ **NEW FUNCTIONS NOT DEPLOYED** - `generate-image-preview` and `generate-image-final`
- ⚠️ CORS errors if functions not deployed
- ⚠️ Storage bucket `event-media` may not exist
- ⚠️ 401 if Supabase key invalid
- ⚠️ 500 if GEMINI_API_KEY missing

**Action Required:**
```bash
supabase functions deploy generate-image-preview
supabase functions deploy generate-image-final
```

---

### Step 3: VENUE
**Component:** `WizardVenue.tsx`

**Test Actions:**
1. Enter venue search text
2. Click search or "Q SEARCH"
3. **Monitor:** `/functions/v1/resolve-venue`
   - Expected: 200 status, venue candidates
4. Select venue from results
5. Verify venue details populate

**Code Verification:**
- ✅ Venue search handler
- ✅ Google Maps grounding support
- ✅ Candidate display
- ✅ Error handling

**Status:**
- ✅ CORS fixes deployed
- ✅ Function deployed

**Potential Issues:**
- ⚠️ 401 if Supabase key invalid
- ⚠️ 500 if GEMINI_API_KEY missing

---

### Step 4: TICKETS
**Component:** `WizardTickets.tsx`

**Test Actions:**
1. Verify default ticket tier
2. Edit ticket name, price, quantity
3. Add additional ticket tiers
4. Verify revenue calculation

**Code Verification:**
- ✅ Ticket management (add/remove)
- ✅ Price and quantity inputs
- ✅ Revenue calculation
- ✅ Validation

**Potential Issues:**
- ⚠️ Minimum one ticket tier required
- ⚠️ Price validation

---

### Step 5: SCHEDULE
**Component:** `WizardSchedule.tsx`

**Test Actions:**
1. Verify default schedule item
2. Edit time and activity
3. Add additional schedule items

**Code Verification:**
- ✅ Schedule management
- ✅ Time and activity inputs
- ✅ Time format validation

**Potential Issues:**
- ⚠️ Time format (HH:MM required)

---

### Step 6: REVIEW
**Component:** `WizardReview.tsx`

**Test Actions:**
1. Verify live preview card displays
2. Review all event details
3. **Click "Publish Event"**
4. **Monitor Network:**
   - `POST /rest/v1/events` - Event insert
   - `POST /rest/v1/ticket_tiers` - Ticket inserts
   - `POST /rest/v1/event_schedules` - Schedule inserts
5. Wait for success/error

**Code Verification:**
- ✅ Preview card generation
- ✅ Event submission handler (EventWizard.tsx:226-320)
- ✅ Database inserts for all tables
- ✅ Error handling

**Database Operations:**
1. **Insert Event** → `events` table
   - organizer_id, title, slug, description, dates, location, status, featured_image_url
2. **Insert Tickets** → `ticket_tiers` table
   - event_id, name, price, quantity_total, type
3. **Insert Schedule** → `event_schedules` table
   - event_id, title, start_time, end_time

**Potential Issues:**
- ⚠️ RLS policies blocking inserts
- ⚠️ Foreign key constraints
- ⚠️ Required field validation
- ⚠️ Storage bucket permissions

---

### Step 7: SUCCESS
**Component:** `WizardSuccess.tsx`

**Test Actions:**
1. Verify success message displays
2. Verify event data shown
3. Test navigation options

**Code Verification:**
- ✅ Success page component
- ✅ Event data display
- ✅ Navigation handlers

---

## 🔍 Error Analysis

### 1. AI Generation Errors (Step 0)

**Error:** "AI Generation failed. Please try again or fill manually."

**Possible Causes:**
1. **401 Unauthorized**
   - **Root Cause:** Invalid/missing Supabase anon key
   - **Fix:** Verify `.env.local` has correct JWT anon key
   - **Check:** Console for Supabase warnings

2. **500 Internal Server Error**
   - **Root Cause:** Missing GEMINI_API_KEY in Supabase secrets
   - **Fix:** Set `GEMINI_API_KEY` in Supabase Dashboard → Edge Functions → Secrets
   - **Check:** Supabase edge function logs

3. **CORS Error**
   - **Root Cause:** Edge function not handling OPTIONS
   - **Fix:** Already fixed in code, verify deployment

**Files:**
- `components/events/EventWizard.tsx:77-168`
- `supabase/functions/generate-event-draft/index.ts`

---

### 2. Image Generation Errors (Step 2 - NEW)

**Error:** "Generation error" or CORS errors

**Possible Causes:**
1. **Function Not Deployed**
   - **Root Cause:** `generate-image-preview` and `generate-image-final` not deployed
   - **Fix:** Deploy both functions
   ```bash
   supabase functions deploy generate-image-preview
   supabase functions deploy generate-image-final
   ```

2. **CORS Error**
   - **Root Cause:** Functions not handling OPTIONS correctly
   - **Fix:** Add CORS headers (same pattern as other functions)

3. **401 Unauthorized**
   - **Root Cause:** Invalid Supabase key
   - **Fix:** Verify `.env.local` has correct key

4. **Storage Bucket Missing**
   - **Root Cause:** `event-media` bucket doesn't exist
   - **Fix:** Create bucket in Supabase Dashboard → Storage

**Files:**
- `components/events/wizard/WizardVisuals.tsx:41-110`
- `components/events/wizard/visuals/ProRefinementPanel.tsx`
- `supabase/functions/generate-image-preview/index.ts`
- `supabase/functions/generate-image-final/index.ts`
- `lib/storage.ts`

---

### 3. Venue Search Errors (Step 3)

**Error:** "Search service unavailable" or CORS errors

**Possible Causes:**
1. **CORS Error** (Should be fixed)
   - **Root Cause:** OPTIONS handler not returning 200
   - **Fix:** Already deployed with fix
   - **Verify:** Check deployment status

2. **401 Unauthorized**
   - **Root Cause:** Invalid Supabase key
   - **Fix:** Verify `.env.local`

3. **500 Internal Server Error**
   - **Root Cause:** Missing GEMINI_API_KEY
   - **Fix:** Set in Supabase secrets

**Files:**
- `components/events/wizard/WizardVenue.tsx:67-103`
- `supabase/functions/resolve-venue/index.ts` (✅ Deployed)

---

### 4. Event Submission Errors (Step 6)

**Error:** "Failed to publish event" or 403/500 errors

**Possible Causes:**
1. **403 Forbidden**
   - **Root Cause:** RLS policies blocking inserts
   - **Fix:** Check Supabase Dashboard → Database → Policies
   - **Location:** Allow inserts for authenticated users or adjust for mock user ID

2. **401 Unauthorized**
   - **Root Cause:** Invalid Supabase key
   - **Fix:** Verify `.env.local`

3. **Validation Errors**
   - **Root Cause:** Missing required fields or invalid data
   - **Fix:** Check form validation, ensure all required fields filled

4. **Storage Upload Errors**
   - **Root Cause:** Storage bucket permissions or missing bucket
   - **Fix:** Create `event-media` bucket and set permissions

**Files:**
- `components/events/EventWizard.tsx:226-320`
- `lib/storage.ts`

---

## 🛠️ Fixes Required

### Immediate Actions

1. **Deploy New Edge Functions** (Required for VISUALS step)
   ```bash
   supabase functions deploy generate-image-preview
   supabase functions deploy generate-image-final
   ```

2. **Add CORS Headers to New Functions**
   - Check if `generate-image-preview` has CORS headers
   - Check if `generate-image-final` has CORS headers
   - Add if missing (same pattern as other functions)

3. **Create Storage Bucket** (If missing)
   - Go to: Supabase Dashboard → Storage
   - Create bucket: `event-media`
   - Set permissions: Public read, authenticated write

4. **Verify Environment Variables**
   - Check `.env.local` has correct Supabase keys
   - Verify `GEMINI_API_KEY` set in Supabase secrets

---

## 📋 Test Execution Checklist

### Pre-Test Setup
- [x] Dev server running
- [x] Environment variables configured
- [ ] New edge functions deployed
- [ ] Storage bucket created
- [ ] Browser DevTools open (Console + Network tabs)

### Step-by-Step Test

**Step 0: INTRO**
- [ ] Navigate to `/dashboard/events/new`
- [ ] Fill description, date, location
- [ ] Navigate through sub-screens
- [ ] Select moods and audiences
- [ ] **Click "Generate Event Draft"**
  - [ ] Monitor Network: `/functions/v1/generate-event-draft`
  - [ ] Check status: [200/401/500]
  - [ ] Verify form populated: [YES/NO]
  - [ ] Check console errors: [NONE/LIST]

**Step 1: BASICS**
- [ ] Verify/complete title
- [ ] Verify/complete description
- [ ] Select category
- [ ] Set dates and times
- [ ] Enter location
- [ ] Click "Next Step"

**Step 2: VISUALS (NEW)**
- [ ] Select image type
- [ ] Optionally add custom prompt
- [ ] **Click "Generate Previews"**
  - [ ] Monitor Network: `/functions/v1/generate-image-preview`
  - [ ] Check status: [200/401/500/CORS]
  - [ ] Verify previews shown: [YES/NO]
- [ ] Select preview
- [ ] Optionally refine
- [ ] Click "Next Step"

**Step 3: VENUE**
- [ ] Enter venue search
- [ ] Click search
- [ ] **Monitor Network:** `/functions/v1/resolve-venue`
  - [ ] Check status: [200/401/500/CORS]
  - [ ] Verify venues shown: [YES/NO]
- [ ] Select venue
- [ ] Click "Next Step"

**Step 4: TICKETS**
- [ ] Edit ticket tiers
- [ ] Add/remove tickets
- [ ] Verify revenue
- [ ] Click "Next Step"

**Step 5: SCHEDULE**
- [ ] Edit schedule items
- [ ] Add/remove items
- [ ] Click "Next Step"

**Step 6: REVIEW**
- [ ] Verify preview card
- [ ] Review all details
- [ ] **Click "Publish Event"**
  - [ ] Monitor Network: `/rest/v1/events`
  - [ ] Check status: [201/401/403/500]
  - [ ] Monitor: `/rest/v1/ticket_tiers`
  - [ ] Monitor: `/rest/v1/event_schedules`
  - [ ] Verify success page: [YES/NO]

**Step 7: SUCCESS**
- [ ] Verify success message
- [ ] Verify event data
- [ ] Test navigation

### Post-Test Verification
- [ ] Check Supabase database for event
- [ ] Verify ticket tiers saved
- [ ] Verify schedule items saved
- [ ] Verify image uploaded to storage
- [ ] Check console for any remaining errors

---

## ✅ Expected Results

### Success Scenario

**Console:**
- No Supabase warnings
- No WebSocket errors (or graceful handling)
- No JavaScript errors
- Clean console

**Network:**
- `/functions/v1/generate-event-draft` → 200 ✅
- `/functions/v1/generate-image-preview` → 200 ✅
- `/functions/v1/generate-image-final` → 200 ✅ (if used)
- `/functions/v1/resolve-venue` → 200 ✅
- `/rest/v1/events` → 201 Created ✅
- `/rest/v1/ticket_tiers` → 201 Created ✅
- `/rest/v1/event_schedules` → 201 Created ✅

**UI:**
- Smooth navigation between all 8 steps
- Form inputs work correctly
- AI generation populates form
- Image previews display
- Event submission succeeds
- Success page displays

**Database:**
- Event appears in `events` table
- Ticket tiers linked to event
- Schedule items linked to event
- Image URL in `featured_image_url` field

---

## ⚠️ Known Issues

### 1. New Edge Functions Not Deployed
**Impact:** VISUALS step will fail
**Fix:** Deploy `generate-image-preview` and `generate-image-final`
**Priority:** HIGH

### 2. Storage Bucket May Not Exist
**Impact:** Image upload will fail
**Fix:** Create `event-media` bucket in Supabase
**Priority:** HIGH

### 3. Persistent Modal Alert
**Impact:** Blocks automated testing
**Fix:** Manual testing required, or clear browser state
**Priority:** MEDIUM

---

## 📝 Test Results Template

### Application Startup
**Status:** [PASS/FAIL/PENDING]
**Errors:** 
**Notes:** 

### Step 0: INTRO - AI Generation
**Status:** [PASS/FAIL/PENDING]
**Network Status:** [200/401/500/OTHER]
**Form Populated:** [YES/NO]
**Errors:** 
**Notes:** 

### Step 1: BASICS
**Status:** [PASS/FAIL/PENDING]
**Errors:** 
**Notes:** 

### Step 2: VISUALS (NEW)
**Status:** [PASS/FAIL/PENDING]
**Preview Generation:** [200/401/500/CORS]
**Previews Shown:** [YES/NO]
**Final Image:** [YES/NO]
**Errors:** 
**Notes:** 

### Step 3: VENUE
**Status:** [PASS/FAIL/PENDING]
**Network Status:** [200/401/500/CORS]
**Errors:** 
**Notes:** 

### Step 4: TICKETS
**Status:** [PASS/FAIL/PENDING]
**Errors:** 
**Notes:** 

### Step 5: SCHEDULE
**Status:** [PASS/FAIL/PENDING]
**Errors:** 
**Notes:** 

### Step 6: REVIEW - Event Submission
**Status:** [PASS/FAIL/PENDING]
**Event Insert:** [201/401/403/500]
**Ticket Inserts:** [201/401/403/500]
**Schedule Inserts:** [201/401/403/500]
**Errors:** 
**Notes:** 

### Step 7: SUCCESS
**Status:** [PASS/FAIL/PENDING]
**Errors:** 
**Notes:** 

### Database Verification
**Events Found:** [YES/NO]
**Count:** [NUMBER]
**Tickets Linked:** [YES/NO]
**Schedules Linked:** [YES/NO]
**Images Uploaded:** [YES/NO]

---

## 🎯 Action Items

### Before Testing
1. **Deploy new edge functions**
   ```bash
   supabase functions deploy generate-image-preview
   supabase functions deploy generate-image-final
   ```

2. **Create storage bucket**
   - Supabase Dashboard → Storage → Create `event-media`

3. **Verify environment**
   - Check `.env.local` has correct keys
   - Verify `GEMINI_API_KEY` in Supabase secrets

### During Testing
1. Monitor Console and Network tabs
2. Document all errors encountered
3. Test all 8 wizard steps
4. Verify database after submission

### After Testing
1. Document results in template above
2. Fix any issues found
3. Re-test to verify fixes

---

**Report Status:** ✅ Complete  
**Ready for Testing:** ⏳ After deploying new functions  
**Wizard Steps:** 8 (including new VISUALS step)


