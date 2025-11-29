# Quick Action Guide - Fix Supabase Authentication

## 🎯 The Problem

Your `.env.local` has a **publishable key** (`sb_publishable_...`), but your Supabase client needs a **JWT anon key** (`eyJhbGci...`).

## ✅ Quick Fix (3 Steps)

### Step 1: Get the Anon Key
1. Go to: **https://app.supabase.com/project/nvdlhrodvevgwdsneplk/settings/api**
2. Scroll to **"Project API keys"** section
3. Copy the **"anon public"** key (starts with `eyJhbGci...`)

### Step 2: Update `.env.local`
```bash
# Open .env.local and replace this line:
VITE_SUPABASE_ANON_KEY=sb_publishable_NoKqTjk0ouIDD-0E8ERWqw_p_LVh33K

# With your actual JWT anon key:
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Restart Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

## ✅ Verify It Works

1. Open: http://localhost:3000
2. Press F12 (DevTools)
3. Check Console:
   - ✅ **SUCCESS:** No Supabase warnings
   - ❌ **FAILED:** Still see warnings → key format is wrong

## 🧪 Test the Wizard

After fixing, test the full flow:

1. Go to: `/dashboard/events/new`
2. Fill Step 0 (INTRO) → Click "Next"
3. Select tags in Step 1 (CONTEXT) → Click "Review"
4. **Click "Generate Event Draft"** → Should work now! ✅
5. Continue through all steps
6. Submit event → Should save to database ✅

## 📋 What Will Work After Fix

- ✅ AI event generation
- ✅ WebSocket connections
- ✅ Event submission to database
- ✅ All Supabase API calls
- ✅ Real-time features

---

**Current Status:** Environment variables added, but key format needs correction.  
**Time to Fix:** ~2 minutes

