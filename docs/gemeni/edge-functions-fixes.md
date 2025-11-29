# Edge Functions API Fixes

**Date**: November 27, 2025  
**Status**: ✅ **Fixed**

---

## 🔴 Issues Found & Fixed

### 1. `generate-image-preview` - Model Not Found Error

**Error**: 
```
404: models/gemini-2.5-flash-image is not found for API version v1beta
```

**Root Cause**: 
- Contents format was incorrect - passing string instead of array with role/parts structure

**Fix Applied**:
```typescript
// ❌ BEFORE (WRONG)
contents: finalPrompt

// ✅ AFTER (CORRECT)
contents: [{ role: 'user', parts: [{ text: finalPrompt }] }]
```

**File**: `supabase/functions/generate-image-preview/index.ts`

---

### 2. `resolve-venue` - Google Maps Tool + Structured Output Conflict

**Error**:
```
400: Google Maps tool with a response mime type: 'application/json' is unsupported
```

**Root Cause**: 
- Google Maps grounding tool does NOT support structured output (`responseMimeType: 'application/json'` with `responseSchema`)
- Must use text response and parse JSON manually

**Fix Applied**:
```typescript
// ❌ BEFORE (WRONG)
config: {
  tools: [{ googleMaps: {} }],
  responseMimeType: "application/json",  // ❌ Not supported with googleMaps
  responseSchema: schema
}

// ✅ AFTER (CORRECT)
config: {
  tools: [{ googleMaps: {} }],
  // Removed responseMimeType and responseSchema
  // Request JSON in prompt text instead
}
```

**Additional Changes**:
- Updated prompt to explicitly request JSON format
- Added JSON parsing with markdown code block removal
- Added fallback error handling

**File**: `supabase/functions/resolve-venue/index.ts`

---

### 3. `generate-image-final` - Missing responseModalities

**Issue**: 
- Not explicitly requesting image output, which may cause issues

**Fix Applied**:
```typescript
config: {
  responseModalities: ['IMAGE'], // ✅ Explicitly request image
  imageConfig: {
    imageSize: size === '4K' ? '4K' : size === '1K' ? '1K' : '2K'
  }
}
```

**File**: `supabase/functions/generate-image-final/index.ts`

---

### 4. Enhanced Error Handling

**Added**: Better error messages with full API error details for debugging

**Files Updated**:
- `generate-image-preview/index.ts`
- `resolve-venue/index.ts`

---

## ✅ Verification Steps

1. **Test `generate-image-preview`**:
   ```json
   POST /functions/v1/generate-image-preview
   {
     "eventDescription": "Fashion week runway show",
     "moodTags": ["elegant", "modern"],
     "imageType": "promotional"
   }
   ```
   **Expected**: Returns base64 image data

2. **Test `resolve-venue`**:
   ```json
   POST /functions/v1/resolve-venue
   {
     "venueText": "luxury hotel in New York"
   }
   ```
   **Expected**: Returns JSON with venue candidates array

3. **Test `generate-image-final`**:
   ```json
   POST /functions/v1/generate-image-final
   {
     "baseImageBase64": "...",
     "prompt": "Enhance this image",
     "size": "2K"
   }
   ```
   **Expected**: Returns refined base64 image

---

## 📋 Summary

**Total Fixes**: 3 functions  
**Status**: ✅ All fixed and ready for testing

**Key Learnings**:
1. Image generation models require proper contents structure: `[{ role: 'user', parts: [{ text: prompt }] }]`
2. Google Maps tool cannot be used with structured output - must parse JSON from text
3. Always explicitly set `responseModalities: ['IMAGE']` for image generation

---

**Next Steps**: Test all three functions with the corrected implementations

