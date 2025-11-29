# CORS Fix for Edge Functions

## ✅ Fixed

**Files Updated:**
1. `supabase/functions/generate-media/index.ts`
2. `supabase/functions/resolve-venue/index.ts`

**Changes:**
- Added `Access-Control-Allow-Methods` to CORS headers
- Changed OPTIONS response to return explicit `status: 200` instead of just 'ok'

## 🔄 Deployment Required

**These edge functions need to be redeployed to Supabase:**

```bash
# Deploy resolve-venue
supabase functions deploy resolve-venue

# Deploy generate-media  
supabase functions deploy generate-media
```

**Or via Supabase Dashboard:**
1. Go to: https://app.supabase.com/project/nvdlhrodvevgwdsneplk/functions
2. Redeploy both functions

## ✅ Verification

After redeployment, test:
- Venue search should work (no CORS errors)
- Video generation should work (no CORS errors)

---

**Status:** Code fixed, needs deployment

