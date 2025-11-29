# Live Event Wizard Test Report
**Date:** 2025-03-07  
**Test Type:** End-to-End Full Cycle  
**Environment:** Local Development (http://localhost:3000)

---

## 🎯 Test Objectives

1. ✅ Verify app loads without fatal errors
2. ✅ Complete full event creation cycle (all 7 steps)
3. ✅ Test AI generation functionality
4. ✅ Verify event submission to database
5. ✅ Identify and document all errors

---

## 📋 Test Execution Plan

### Phase 1: Application Startup
- [x] Dev server running on port 3000
- [ ] Home page loads without errors
- [ ] Console shows no critical errors
- [ ] Navigation works

### Phase 2: Event Wizard - Step 0 (INTRO)
- [ ] Navigate to `/dashboard/events/new`
- [ ] Fill event description
- [ ] Fill date and location
- [ ] Click "Next: Add Context"
- [ ] Select mood tags
- [ ] Select audience tags
- [ ] Click "Review"
- [ ] **Test AI Generation:** Click "Generate Event Draft"
  - Watch Network tab for `/functions/v1/generate-event-draft`
  - Check console for errors
  - Verify response status (200 = success, 401 = auth issue, 500 = server error)

### Phase 3: Event Wizard - Step 1 (BASICS)
- [ ] Verify/complete title
- [ ] Verify/complete description
- [ ] Select category
- [ ] Set start date/time
- [ ] Set end date/time
- [ ] Enter location
- [ ] Test "Polish Brief" button (optional)
- [ ] Click "Next Step"

### Phase 4: Event Wizard - Step 2 (VENUE)
- [ ] Search for venue
- [ ] Verify venue resolution works
- [ ] Select venue
- [ ] Click "Next Step"

### Phase 5: Event Wizard - Step 3 (TICKETS)
- [ ] Verify default ticket tier
- [ ] Edit ticket name, price, quantity
- [ ] Add additional ticket tier
- [ ] Verify revenue calculation
- [ ] Click "Next Step"

### Phase 6: Event Wizard - Step 4 (SCHEDULE)
- [ ] Verify default schedule item
- [ ] Edit time and activity
- [ ] Add additional schedule items
- [ ] Click "Next Step"

### Phase 7: Event Wizard - Step 5 (REVIEW)
- [ ] Verify live preview card displays
- [ ] Review all event details
- [ ] Click "Publish Event"
- [ ] Verify loading state
- [ ] Wait for success/error

### Phase 8: Event Wizard - Step 6 (SUCCESS)
- [ ] Verify success message displays
- [ ] Verify event data shown
- [ ] Test navigation options

---

## 🔍 Error Monitoring

### Console Errors to Watch For
- Supabase authentication warnings
- WebSocket connection failures
- JavaScript runtime errors
- React component errors

### Network Errors to Watch For
- `401 Unauthorized` - Authentication issue
- `403 Forbidden` - Permission issue
- `500 Internal Server Error` - Server/edge function issue
- `404 Not Found` - Missing endpoint

### Edge Functions to Monitor
1. `generate-event-draft` - AI event generation
2. `polish-brief` - Description enhancement
3. `resolve-venue` - Venue search
4. `generate-media` - Video generation (optional)

---

## 📊 Expected Results

### ✅ Success Indicators
- No Supabase warnings in console
- AI generation returns 200 status
- All form inputs work smoothly
- Navigation between steps works
- Event submission succeeds
- Data persists to database
- Success page displays

### ⚠️ Known Issues to Verify
- Supabase anon key format (JWT vs publishable)
- WebSocket connection status
- Edge function authentication
- Database RLS policies

---

## 🛠️ Troubleshooting Guide

### If AI Generation Fails (401)
**Root Cause:** Invalid or missing Supabase anon key
**Fix:** 
1. Check `.env.local` has `VITE_SUPABASE_ANON_KEY` in JWT format
2. Verify key starts with `eyJhbGci...`
3. Restart dev server

### If WebSocket Fails
**Root Cause:** Same as above - authentication issue
**Impact:** Real-time features won't work, but basic functionality should
**Fix:** Same as AI generation fix

### If Event Submission Fails
**Root Cause:** Database RLS policies or authentication
**Fix:**
1. Check Supabase RLS policies allow inserts
2. Verify user authentication (or mock user ID works)
3. Check table schemas match code expectations

### If Edge Function Returns 500
**Root Cause:** Edge function error or missing secrets
**Fix:**
1. Check Supabase edge function logs
2. Verify `GEMINI_API_KEY` is set in Supabase secrets
3. Check edge function code for errors

---

## 📝 Test Results

### Application Startup
**Status:** ⏳ Pending
**Notes:** 

### Step 0 (INTRO) - AI Generation
**Status:** ⏳ Pending
**AI Generation Test:**
- Network Status: ⏳
- Console Errors: ⏳
- Response Time: ⏳
- Data Population: ⏳

### Step 1 (BASICS)
**Status:** ⏳ Pending
**Notes:** 

### Step 2 (VENUE)
**Status:** ⏳ Pending
**Notes:** 

### Step 3 (TICKETS)
**Status:** ⏳ Pending
**Notes:** 

### Step 4 (SCHEDULE)
**Status:** ⏳ Pending
**Notes:** 

### Step 5 (REVIEW) - Event Submission
**Status:** ⏳ Pending
**Submission Test:**
- Network Status: ⏳
- Database Insert: ⏳
- Success Response: ⏳

### Step 6 (SUCCESS)
**Status:** ⏳ Pending
**Notes:** 

---

## 🎯 Summary

**Test Status:** ⏳ Ready to Execute
**Environment:** ✅ Configured
**Code:** ✅ Analyzed

**Next Steps:**
1. Execute test plan above
2. Document all errors encountered
3. Verify fixes work
4. Update this report with results

---

**Report Created:** 2025-03-07  
**Ready for:** Manual testing execution

