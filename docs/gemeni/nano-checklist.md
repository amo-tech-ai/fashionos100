# Gemini Image Generation (Nano Banana) - Production Checklist
**Based on:** [Gemini Image Generation Documentation](https://ai.google.dev/gemini-api/docs/image-generation)  
**Date:** 2025-03-07  
**Status:** ⚠️ Implementation Needs Fixes

---

## ✅ Core Setup

### SDK Import & Initialization
- [x] **SDK Import:** `import { GoogleGenAI } from "https://esm.sh/@google/genai"`
- [x] **Client Initialization:** `new GoogleGenAI({ apiKey })`
- [x] **API Key:** Retrieved from `Deno.env.get('GEMINI_API_KEY')`
- [x] **Error Handling:** Missing API key throws error

**File:** `supabase/functions/generate-image-preview/index.ts:3,21`  
**Status:** ✅ Correct

---

## ❌ Image Generation Method (CRITICAL FIX NEEDED)

### Current Implementation (INCORRECT)
```typescript
// ❌ WRONG - This method doesn't exist
const imageResp = await ai.models.generateImages({
    model: 'gemini-2.5-flash-image', 
    prompt: finalPrompt,
    config: {
        numberOfImages: 4,
        aspectRatio: '1:1',
        outputMimeType: 'image/png'
    }
});
```

**File:** `supabase/functions/generate-image-preview/index.ts:79-87`  
**Status:** ❌ **INCORRECT** - `generateImages()` doesn't exist

### Correct Implementation (REQUIRED)
```typescript
// ✅ CORRECT - Use generateContent with responseModalities
const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: finalPrompt, // or [{ role: 'user', parts: [{ text: finalPrompt }] }]
    config: {
        responseModalities: ['TEXT', 'IMAGE'], // or ['IMAGE'] for images only
        imageConfig: {
            aspectRatio: '1:1', // Options: "1:1","2:3","3:2","3:4","4:3","4:5","5:4","9:16","16:9","21:9"
        }
    }
});

// ✅ CORRECT - Parse response from parts
for (const part of response.candidates[0].content.parts) {
    if (part.text) {
        console.log(part.text);
    } else if (part.inlineData) {
        const imageData = part.inlineData.data; // Base64 string
        // Process image...
    }
}
```

**Reference:** Documentation lines 51-64 (JavaScript example)  
**Status:** ❌ **NEEDS FIX**

---

## ✅ Model Selection

### Preview Generation (Nano Banana - Fast)
- [x] **Model Name:** `'gemini-2.5-flash-image'` ✅ Correct
- [x] **Use Case:** Fast preview generation, multiple variants
- [x] **Resolution:** 1024x1024 (1:1 aspect ratio)
- [ ] **Multiple Images:** Need to handle multiple image parts in response

**File:** `supabase/functions/generate-image-preview/index.ts:80`  
**Status:** ✅ Model name correct, but implementation wrong

### Final Image Generation (Nano Banana Pro - High Quality)
- [x] **Model Name:** `'gemini-3-pro-image-preview'` ✅ Correct
- [x] **Use Case:** High-resolution refinement
- [x] **Resolution Support:** 1K, 2K, 4K
- [ ] **Image Config:** Need to add `imageConfig` with `imageSize`

**File:** `supabase/functions/generate-image-final/index.ts:49`  
**Status:** ⚠️ Partially correct - missing imageConfig

---

## ✅ CORS Configuration

- [x] **OPTIONS Handler:** Returns 200 status ✅
- [x] **CORS Headers:** Properly configured ✅
- [x] **Headers in Response:** Included in all responses ✅

**File:** `supabase/functions/generate-image-preview/index.ts:9-14`  
**Status:** ✅ Complete

---

## ❌ Response Parsing (CRITICAL FIX NEEDED)

### Current Implementation (INCORRECT)
```typescript
// ❌ WRONG - generateImages doesn't exist, so this won't work
const images = imageResp.generatedImages.map((img: any) => ({
    base64: img.image.imageBytes,
    mimeType: 'image/png'
}));
```

**File:** `supabase/functions/generate-image-preview/index.ts:90-93`  
**Status:** ❌ **INCORRECT**

### Correct Implementation (REQUIRED)
```typescript
// ✅ CORRECT - Parse from response.candidates[0].content.parts
const images = [];
for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
        images.push({
            base64: part.inlineData.data, // Already base64 string
            mimeType: part.inlineData.mimeType || 'image/png'
        });
    }
}
```

**Reference:** Documentation lines 55-64 (JavaScript example)  
**Status:** ❌ **NEEDS FIX**

---

## ⚠️ Configuration Options

### Response Modalities
- [ ] **Configured:** Should use `responseModalities: ['TEXT', 'IMAGE']` or `['IMAGE']`
- [ ] **Current:** Not configured in preview function
- [x] **Final Function:** Uses `generateContent` correctly but missing config

**Status:** ⚠️ **NEEDS ADDITION**

### Aspect Ratio Configuration
- [ ] **Preview Function:** Not configured (should use `imageConfig.aspectRatio`)
- [ ] **Final Function:** Not configured (should use `imageConfig.aspectRatio` and `imageSize`)
- [ ] **Supported Ratios:** "1:1","2:3","3:2","3:4","4:3","4:5","5:4","9:16","16:9","21:9"

**Status:** ⚠️ **NEEDS ADDITION**

### Image Size (Gemini 3 Pro Only)
- [ ] **Preview Function:** N/A (2.5 Flash is fixed at 1024x1024)
- [ ] **Final Function:** Should configure `imageSize: '1K' | '2K' | '4K'`
- [ ] **Current:** Size passed in prompt but not in config

**File:** `supabase/functions/generate-image-final/index.ts:38,55`  
**Status:** ⚠️ **NEEDS FIX**

---

## ✅ Error Handling

- [x] **Try-Catch:** Wrapped in try-catch ✅
- [x] **Error Logging:** `console.error()` used ✅
- [x] **Error Response:** Returns 500 with error message ✅
- [x] **Missing API Key:** Handled ✅

**File:** `supabase/functions/generate-image-preview/index.ts:104-109`  
**Status:** ✅ Complete

---

## ✅ Brand Style Extraction

- [x] **URL Analysis:** Uses Gemini 2.5 Flash for text analysis ✅
- [x] **Model:** `'gemini-2.5-flash'` ✅
- [x] **Prompt:** Constructs analysis prompt ✅
- [x] **Response Parsing:** `analysisResp.text` ✅
- [x] **Integration:** Included in final image prompt ✅

**File:** `supabase/functions/generate-image-preview/index.ts:24-50`  
**Status:** ✅ Complete

---

## ⚠️ Prompt Engineering

### Current Prompt Structure
- [x] **Event Description:** Included ✅
- [x] **Mood Tags:** Included ✅
- [x] **Brand Style:** Included when available ✅
- [x] **Requirements:** Listed ✅
- [ ] **Best Practices:** Could be improved with more specific details

**File:** `supabase/functions/generate-image-preview/index.ts:53-66`  
**Status:** ⚠️ **GOOD** but could be enhanced

### Recommended Improvements
- [ ] Add aspect ratio specification in prompt
- [ ] Add style descriptors (photorealistic, minimalist, etc.)
- [ ] Add lighting descriptions
- [ ] Add composition guidance
- [ ] Use descriptive paragraphs instead of bullet lists (per documentation)

**Reference:** Documentation lines 1448-1450 (Best Practices)

---

## ✅ Frontend Integration

### Request Payload
- [x] **Payload Structure:** Correct fields sent ✅
- [x] **Auth Token:** Included in headers ✅
- [x] **Content-Type:** application/json ✅

**File:** `components/events/wizard/WizardVisuals.tsx:65-84`  
**Status:** ✅ Complete

### Response Handling
- [x] **Error Handling:** Try-catch with user-friendly alerts ✅
- [x] **Response Parsing:** Maps response to component state ✅
- [x] **State Management:** Updates previews and style context ✅

**File:** `components/events/wizard/WizardVisuals.tsx:86-102`  
**Status:** ✅ Complete

---

## ❌ Multiple Image Generation

### Current Implementation
- [ ] **Multiple Images:** Code expects 4 images but method is wrong
- [ ] **Response Handling:** Can't parse multiple images from incorrect method

**Status:** ❌ **NEEDS FIX**

### Correct Implementation
```typescript
// Generate multiple images by making multiple calls OR
// Parse all image parts from single response
// Note: Gemini may return 1-3 images per call, not always 4
const images = [];
for (const part of response.candidates[0].content.parts) {
    if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
        images.push({
            base64: part.inlineData.data,
            mimeType: part.inlineData.mimeType
        });
    }
}
```

**Reference:** Documentation - model may not return exact number requested

---

## ✅ Image Editing (Final Function)

### Current Implementation
- [x] **Method:** Uses `generateContent` correctly ✅
- [x] **Multimodal Input:** Image + text prompt ✅
- [x] **Model:** `'gemini-3-pro-image-preview'` ✅
- [x] **Response Parsing:** Checks for `inlineData` ✅
- [ ] **Image Config:** Missing `imageConfig` for resolution

**File:** `supabase/functions/generate-image-final/index.ts:48-69`  
**Status:** ⚠️ **MOSTLY CORRECT** - needs imageConfig

---

## 🔧 Required Fixes

### Priority 1: Fix Preview Generation (CRITICAL)
**File:** `supabase/functions/generate-image-preview/index.ts`

**Change Line 79-93:**
```typescript
// ❌ REMOVE THIS:
const imageResp = await ai.models.generateImages({...});

// ✅ REPLACE WITH:
const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: finalPrompt,
    config: {
        responseModalities: ['TEXT', 'IMAGE'],
        imageConfig: {
            aspectRatio: '1:1', // or get from request
        }
    }
});

// ✅ FIX RESPONSE PARSING:
const images = [];
if (response.candidates && response.candidates[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
            images.push({
                base64: part.inlineData.data,
                mimeType: part.inlineData.mimeType || 'image/png'
            });
        }
    }
}
```

**Status:** ❌ **MUST FIX**

---

### Priority 2: Add Image Config to Final Function
**File:** `supabase/functions/generate-image-final/index.ts`

**Change Line 48-57:**
```typescript
// ✅ ADD imageConfig:
const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: [{ role: 'user', parts }],
    config: {
        responseModalities: ['TEXT', 'IMAGE'],
        imageConfig: {
            aspectRatio: '16:9', // or get from request
            imageSize: size || '2K', // '1K', '2K', or '4K'
        }
    }
});
```

**Status:** ⚠️ **SHOULD FIX**

---

### Priority 3: Improve Prompt Engineering
**File:** `supabase/functions/generate-image-preview/index.ts`

**Enhance Line 53-66:**
```typescript
// ✅ IMPROVED PROMPT (descriptive paragraph style):
const finalPrompt = `
    Create a high-fashion promotional image for a runway event.
    
    Event: ${eventDescription}
    
    Visual Style: ${moodTags ? moodTags.join(', ') : 'Modern, High Fashion'}
    ${brandStyleContext ? `Brand Guidelines: ${brandStyleContext}` : ''}
    
    Composition Requirements:
    - Professional studio lighting with soft, diffused highlights
    - Clean, minimalist composition with ample negative space for text overlay
    - High-fashion aesthetic with attention to texture and detail
    - No text or typography in the image itself
    - Square format (1:1 aspect ratio)
    
    The image should convey the elegance and sophistication of the event while
    maintaining a modern, editorial quality suitable for marketing materials.
`.trim();
```

**Status:** ⚠️ **RECOMMENDED**

---

## 📋 Production Readiness Checklist

### Core Functionality
- [ ] ✅ SDK imported correctly
- [ ] ✅ API key configured
- [ ] ❌ **Image generation method fixed** (CRITICAL)
- [ ] ❌ **Response parsing fixed** (CRITICAL)
- [ ] ⚠️ Image config added
- [ ] ✅ Error handling complete
- [ ] ✅ CORS configured

### Configuration
- [ ] ⚠️ Response modalities configured
- [ ] ⚠️ Aspect ratio configured
- [ ] ⚠️ Image size configured (final function)
- [ ] ⚠️ Prompt engineering improved

### Testing
- [ ] ❌ Preview generation tested
- [ ] ⚠️ Final image generation tested
- [ ] ❌ Multiple images handling tested
- [ ] ❌ Error scenarios tested
- [ ] ❌ Edge cases tested (no brand URLs, empty prompts, etc.)

### Deployment
- [ ] ✅ Functions deployed
- [ ] ✅ Environment variables set
- [ ] ❌ **Functions tested after fix**
- [ ] ❌ **Production monitoring set up**

---

## 🎯 Implementation Status Summary

### ✅ Complete
- SDK setup and initialization
- CORS configuration
- Error handling structure
- Brand style extraction
- Frontend integration
- Final function (mostly correct)

### ❌ Critical Issues
- **Preview generation uses wrong method** (`generateImages` doesn't exist)
- **Response parsing incorrect** (expects wrong structure)
- **Multiple images not handled correctly**

### ⚠️ Needs Improvement
- Image configuration (aspect ratio, size)
- Response modalities configuration
- Prompt engineering (more descriptive)
- Testing after fixes

---

## 🚀 Quick Fix Guide

### Step 1: Fix Preview Generation
1. Replace `generateImages()` with `generateContent()`
2. Add `responseModalities` and `imageConfig` to config
3. Fix response parsing to use `candidates[0].content.parts`
4. Test with single image first

### Step 2: Enhance Final Function
1. Add `imageConfig` with `aspectRatio` and `imageSize`
2. Test with different resolutions (1K, 2K, 4K)
3. Verify response parsing

### Step 3: Test & Deploy
1. Test preview generation
2. Test final image generation
3. Test error scenarios
4. Deploy updated functions
5. Verify in production

---

## 📚 Reference Documentation

**Key Sections:**
- **Text-to-Image:** Lines 13-68 (JavaScript example)
- **Response Parsing:** Lines 55-64 (JavaScript example)
- **Configuration:** Lines 4160-4289 (responseModalities, aspectRatio, imageSize)
- **Best Practices:** Lines 1448-1450 (descriptive prompts)

**Model Selection:**
- **Gemini 2.5 Flash Image:** Fast, 1024x1024, multiple variants
- **Gemini 3 Pro Image Preview:** High quality, 1K/2K/4K, advanced features

---

**Last Updated:** 2025-03-07  
**Priority:** HIGH (Critical fixes needed for production)  
**Estimated Fix Time:** 1-2 hours

