# Edge Functions Best Practices Audit

**Date**: November 27, 2025  
**Status**: 🔴 **Multiple Violations Found**

---

## 🔴 Critical Violations Found

### 1. Using Legacy `serve` Import (ALL 13 FUNCTIONS)
**Rule Violated**: Guideline #7 - "Do NOT use `import { serve } from "https://deno.land/std@0.168.0/http/server.ts"`. Instead use the built-in `Deno.serve`."

**Affected Functions**:
- ✅ ai-copilot
- ✅ create-checkout
- ✅ generate-event-draft
- ✅ generate-image-final
- ✅ generate-image-preview
- ✅ generate-media
- ✅ invite-sponsor-user
- ✅ manage-sponsors
- ✅ polish-brief
- ✅ resolve-venue
- ✅ schedule-optimizer
- ✅ search-events
- ✅ sponsor-ai

**Fix Required**: Replace `serve()` with `Deno.serve()`

---

### 2. Using CDN Imports Instead of npm: (ALL FUNCTIONS)
**Rule Violated**: Guideline #3, #5 - "Do NOT use bare specifiers... Minimize the use of imports from esm.sh"

**Current Pattern** (WRONG):
```typescript
import { GoogleGenAI } from "https://esm.sh/@google/genai@0.1.1"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
```

**Correct Pattern**:
```typescript
import { GoogleGenAI } from "npm:@google/genai@0.1.1"
import { createClient } from "npm:@supabase/supabase-js@2.39.0"
```

**Affected Functions**: All 13 functions

---

### 3. Missing Package Versions (3 FUNCTIONS)
**Rule Violated**: Guideline #4 - "For external imports, always define a version"

**Functions Missing Versions**:
- ❌ `generate-media/index.ts`: `@google/genai` (no version)
- ❌ `ai-copilot/index.ts`: `@google/genai` (no version)
- ❌ `schedule-optimizer/index.ts`: `@google/genai` (no version)

---

### 4. Missing Connection Header (ALL FUNCTIONS)
**Rule Violated**: Best Practice - Should include `Connection: 'keep-alive'` header

**Current Pattern** (MISSING):
```typescript
headers: { ...corsHeaders, 'Content-Type': 'application/json' }
```

**Correct Pattern**:
```typescript
headers: { ...corsHeaders, 'Content-Type': 'application/json', Connection: 'keep-alive' }
```

---

### 5. Duplicate CORS Headers (3 FUNCTIONS)
**Rule Violated**: Guideline #2 - Should use shared `_shared/cors.ts`

**Functions with Duplicate CORS**:
- ❌ `ai-copilot/index.ts` - Defines own corsHeaders
- ❌ `generate-media/index.ts` - Defines own corsHeaders
- ❌ `schedule-optimizer/index.ts` - Defines own corsHeaders

**Should Use**: `import { corsHeaders } from "../_shared/cors.ts"`

---

## 📋 Fix Priority

### 🔴 **PRIORITY 1: Critical (All Functions)**
1. Replace `serve()` with `Deno.serve()` - **13 functions**
2. Replace `esm.sh` imports with `npm:` - **13 functions**
3. Add `Connection: 'keep-alive'` headers - **13 functions**

### 🟡 **PRIORITY 2: High (3 Functions)**
4. Add missing package versions - **3 functions**
5. Use shared CORS headers - **3 functions**

---

## ✅ Functions Already Following Best Practices

- ✅ All functions use proper error handling
- ✅ All functions handle CORS preflight (OPTIONS)
- ✅ Most functions use shared `corsHeaders` from `_shared/cors.ts`
- ✅ All functions use `Deno.env.get()` for environment variables
- ✅ No cross-dependencies between functions

---

## 🔧 Fix Plan

**Total Functions to Fix**: 13  
**Estimated Time**: ~30 minutes

**Fix Order**:
1. Update `_shared/cors.ts` to include `Connection: 'keep-alive'`
2. Fix all 13 functions systematically:
   - Replace `serve()` → `Deno.serve()`
   - Replace `esm.sh` → `npm:` imports
   - Add `Connection: 'keep-alive'` header
   - Add missing versions
   - Use shared CORS where missing

---

**Next Step**: Apply fixes to all functions

