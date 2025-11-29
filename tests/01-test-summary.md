# Event Wizard Test Summary

## ✅ Current Status

**Environment:** ✅ Configured
- `VITE_SUPABASE_URL` set
- `VITE_SUPABASE_ANON_KEY` set (JWT format)
- `GEMINI_API_KEY` set
- Dev server running on port 3000

**Code:** ✅ Ready
- All 7 wizard steps implemented
- Error handling in place
- Database operations configured

---

## 🧪 Quick Test Flow

### 1. Open Browser
```
http://localhost:3000/dashboard/events/new
```

### 2. Test Each Step

**Step 0 (INTRO):**
- Fill: "Sustainable fashion runway in Brooklyn, March 15, 2025"
- Click "Next: Add Context"
- Select: Sustainable, Luxurious (moods)
- Select: Industry, VIPs, Press (audiences)
- Click "Review"
- **Click "Generate Event Draft"** → Should work! ✅

**Step 1 (BASICS):**
- Verify/complete title, description
- Select category, dates, location
- Click "Next Step"

**Step 2 (VENUE):**
- Search venue, select
- Click "Next Step"

**Step 3 (TICKETS):**
- Edit/add ticket tiers
- Click "Next Step"

**Step 4 (SCHEDULE):**
- Edit/add schedule items
- Click "Next Step"

**Step 5 (REVIEW):**
- Review preview
- **Click "Publish Event"** → Should save! ✅

**Step 6 (SUCCESS):**
- Verify success message

---

## ⚠️ What to Watch For

### Console Errors
- ✅ **Good:** No Supabase warnings
- ❌ **Bad:** 401 errors → Check anon key
- ❌ **Bad:** 500 errors → Check edge function logs

### Network Tab
- ✅ **Good:** `/functions/v1/generate-event-draft` returns 200
- ❌ **Bad:** Returns 401 → Auth issue
- ❌ **Bad:** Returns 500 → Edge function issue

---

## 🛠️ If Issues Occur

### 401 Errors
**Fix:** Verify `.env.local` has JWT anon key (starts with `eyJhbGci...`), restart server

### 500 Errors
**Fix:** Check Supabase edge function logs, verify `GEMINI_API_KEY` set

### Database Errors
**Fix:** Check Supabase RLS policies, verify table schemas

---

## 📋 Success Criteria

✅ AI generation works (no 401)  
✅ All form inputs work  
✅ Navigation smooth  
✅ Event submits successfully  
✅ Data saves to database  
✅ Success page displays  

---

**Ready to test!** Follow the flow above and document any errors.

