# Quick Test Guide - Event Wizard
**Status:** ✅ Ready for Manual Testing

---

## 🚀 Quick Start

1. **Open Browser:** http://localhost:3000/dashboard/events/new
2. **Open DevTools:** Press F12 (Console + Network tabs)
3. **Follow Steps Below**

---

## 📋 Test Flow (5 Minutes)

### Step 0: INTRO
1. Fill: "Sustainable fashion runway in Brooklyn, March 15, 2025"
2. Date: "March 15, 2025"
3. Location: "Brooklyn, NY"
4. Click "Next: Add Context"
5. Select: Sustainable, Luxurious (moods)
6. Select: Industry, VIPs, Press (audiences)
7. Click "Review"
8. **Click "Generate Event Draft"** → Watch Network tab
   - ✅ **SUCCESS:** Status 200, form populated
   - ❌ **FAIL:** Status 401 → Check Supabase key
   - ❌ **FAIL:** Status 500 → Check edge function logs

### Step 1: BASICS
1. Verify/complete title
2. Select category: "Runway"
3. Set dates: March 15, 2025, 7PM-10PM
4. Click "Next Step"

### Step 2: VENUE
1. Enter: "Brooklyn, NY" or "Liberty Grand"
2. Click search → Watch Network tab
   - ✅ **SUCCESS:** Status 200, venues shown
   - ❌ **CORS ERROR:** Deploy edge function (see Fix #1)
3. Select venue
4. Click "Next Step"

### Step 3: TICKETS
1. Edit: "General Admission" - $50 - 100
2. Add: "VIP" - $150 - 50
3. Click "Next Step"

### Step 4: SCHEDULE
1. Edit: "18:00" - "Doors Open"
2. Add: "19:00" - "Runway Show"
3. Click "Next Step"

### Step 5: REVIEW
1. Review preview
2. **Click "Publish Event"** → Watch Network tab
   - ✅ **SUCCESS:** All 201 Created
   - ❌ **FAIL:** 401 → Auth issue
   - ❌ **FAIL:** 403 → RLS policy issue

### Step 6: SUCCESS
1. Verify success message
2. ✅ Done!

---

## 🔍 What to Watch For

### Console Tab
- ✅ **Good:** No Supabase warnings
- ❌ **Bad:** 401 errors → Auth issue
- ❌ **Bad:** CORS errors → Deploy edge functions

### Network Tab
- ✅ **Good:** All requests return 200/201
- ❌ **Bad:** 401 → Invalid Supabase key
- ❌ **Bad:** 403 → RLS policy blocking
- ❌ **Bad:** 500 → Edge function error

---

## 🛠️ Quick Fixes

### Fix 1: CORS Errors (Venue Search)
**Error:** "CORS policy: Response to preflight request doesn't pass"

**Fix:**
```bash
supabase functions deploy resolve-venue
supabase functions deploy generate-media
```

### Fix 2: 401 Errors (AI Generation)
**Error:** "401 Unauthorized"

**Fix:**
1. Check `.env.local` has `VITE_SUPABASE_ANON_KEY`
2. Verify key is JWT format (starts with `eyJhbGci...`)
3. Restart dev server

### Fix 3: 403 Errors (Event Submission)
**Error:** "403 Forbidden"

**Fix:**
1. Go to Supabase Dashboard → Database → Policies
2. Check RLS policies allow inserts
3. Or adjust policies for mock user ID

---

## ✅ Success Checklist

- [ ] AI generation works (200 response)
- [ ] Form populated with event data
- [ ] All steps navigate smoothly
- [ ] Venue search works (after deployment)
- [ ] Event submission succeeds (201 responses)
- [ ] Success page displays
- [ ] Event appears in Supabase database

---

## 📊 Expected Results

**Console:** Clean (no critical errors)  
**Network:** All 200/201 responses  
**Database:** Event + tickets + schedules saved  
**UI:** Smooth flow, no crashes

---

**Time to Complete:** ~5-10 minutes  
**Status:** ✅ Ready to Test


