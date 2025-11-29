# AI Edge Functions - Happy-Path Functional Test Report

**Date**: November 27, 2025  
**Status**: 🧪 **Testing Ready**

---

## 📋 Executive Summary

This report documents happy-path functional testing of all AI-related Supabase Edge Functions that use:
- **Google Gemini API** (via `@google/genai`)
- **Supabase Client** (via `@supabase/supabase-js`)

**Testing Approach**: Local testing via Supabase CLI with realistic payloads.

---

## 1️⃣ AI-Related Functions Identified

### Functions Using Google Gemini API (12 functions)

1. ✅ **ai-copilot** - General AI assistant using Gemini 3 Pro
2. ✅ **generate-event-draft** - Event generation with structured output
3. ✅ **generate-image-preview** - Image generation (Nano Banana)
4. ✅ **generate-image-final** - Image refinement (Nano Banana Pro)
5. ✅ **generate-media** - Video generation (Veo 3.1)
6. ✅ **polish-brief** - Content enhancement
7. ✅ **resolve-venue** - Venue search with Google Maps grounding
8. ✅ **schedule-optimizer** - Schedule conflict resolution
9. ✅ **search-events** - Semantic event search
10. ✅ **sponsor-ai** - Multi-action sponsor AI assistance
11. ⚠️ **manage-sponsors** - Sponsor management (uses Supabase, no Gemini)
12. ⚠️ **invite-sponsor-user** - User invitation (uses Supabase, no Gemini)

### Functions Using Supabase Client (2 functions)

1. ✅ **manage-sponsors** - Database operations for sponsors
2. ✅ **invite-sponsor-user** - User invitation via Supabase Auth

### Functions Using Both (0 functions)

- No functions currently use both Gemini and Supabase in the same handler

---

## 2️⃣ Environment Variable Verification ✅

### 2.1 Required Environment Variables

**For Gemini Functions**:
- `GEMINI_API_KEY` - Required by all 10 Gemini functions

**For Supabase Functions**:
- `SUPABASE_URL` - Required by Supabase client functions
- `SUPABASE_ANON_KEY` - For user-scoped operations
- `SUPABASE_SERVICE_ROLE_KEY` - For admin operations

### 2.2 Environment Variable Usage in Code

**Verified**:
- ✅ All Gemini functions use: `Deno.env.get('GEMINI_API_KEY')`
- ✅ Supabase functions use: `Deno.env.get('SUPABASE_URL')` and `Deno.env.get('SUPABASE_ANON_KEY')` or `SUPABASE_SERVICE_ROLE_KEY`
- ✅ Environment variable names are consistent across all functions

**Status**: ✅ **No mismatches found**

---

## 3️⃣ Function Schema Analysis

### 3.1 Input Payload Schemas

#### `ai-copilot`
```typescript
{
  prompt: string,
  systemInstruction?: string
}
```

#### `generate-event-draft`
```typescript
{
  prompt: string,
  url?: string,
  urls?: string[],
  files?: Array<{ data: string, mimeType: string }>,
  fileBase64?: string,
  fileType?: string
}
```

#### `search-events`
```typescript
{
  query: string,
  eventsContext: Array<{ id: number, title: string, description: string }>
}
```

#### `sponsor-ai`
```typescript
{
  action: 'activation-ideas' | 'recommend-packages' | 'draft-contract' | ...,
  sponsorName: string,
  sponsorIndustry: string,
  eventDetails: string,
  contractTerms?: object,
  metrics?: object
}
```

#### `schedule-optimizer`
```typescript
{
  eventDetails: object,
  venueConstraints?: object,
  talentSchedules?: object,
  deadline?: string
}
```

#### `generate-image-preview`
```typescript
{
  eventDescription: string,
  moodTags?: string[],
  brandUrls?: string[],
  imageType?: string
}
```

#### `resolve-venue`
```typescript
{
  venueText: string
}
```

#### `polish-brief`
```typescript
{
  brief: string,
  type?: 'marketing' | 'creative'
}
```

---

## 4️⃣ Test Payloads Prepared

### 4.1 Gemini Functions Test Payloads

#### `ai-copilot`
```json
{
  "prompt": "Help me plan a fashion event for 500 attendees",
  "systemInstruction": "You are a fashion event planner assistant. Keep responses concise."
}
```

#### `generate-event-draft`
```json
{
  "prompt": "Create a fashion show event draft for Toronto Fashion Week with 3 runway segments and VIP sponsors"
}
```

#### `search-events`
```json
{
  "query": "runway show",
  "eventsContext": [
    {
      "id": 1,
      "title": "Spring Collection Runway",
      "description": "High fashion runway show featuring spring collections"
    },
    {
      "id": 2,
      "title": "Designer Showcase",
      "description": "Exclusive designer showcase event"
    }
  ]
}
```

#### `sponsor-ai` (activation-ideas)
```json
{
  "action": "activation-ideas",
  "sponsorName": "Luxe Beauty",
  "sponsorIndustry": "Beauty",
  "eventDetails": "Fashion Week 2025 - 3-day runway event with 2000 attendees"
}
```

#### `schedule-optimizer`
```json
{
  "eventDetails": {
    "name": "Fashion Week Opening",
    "duration_minutes": 120
  },
  "venueConstraints": {
    "available_hours": ["18:00", "22:00"]
  },
  "talentSchedules": [
    {
      "name": "Model A",
      "available": ["19:00", "21:00"]
    }
  ],
  "deadline": "2025-12-15"
}
```

#### `generate-image-preview`
```json
{
  "eventDescription": "High-fashion runway poster with neon lighting and bold typography",
  "moodTags": ["modern", "edgy", "luxury"],
  "imageType": "promotional"
}
```

#### `resolve-venue`
```json
{
  "venueText": "luxury hotel in New York City with ballroom"
}
```

#### `polish-brief`
```json
{
  "brief": "A high-end fashion event featuring emerging designers",
  "type": "marketing"
}
```

---

## 5️⃣ Local Testing Setup

### 5.1 Supabase CLI Status
- ✅ **Supabase CLI v2.58.5** installed
- ✅ **Environment file**: `.env.local` exists

### 5.2 Function Serving Command

**Template**:
```bash
cd supabase
supabase functions serve <FUNCTION_NAME> --env-file ../.env.local --no-verify-jwt
```

**Example**:
```bash
cd supabase
supabase functions serve ai-copilot --env-file ../.env.local --no-verify-jwt
```

**Expected Output**:
- Function starts on `http://localhost:54321/functions/v1/<function-name>`
- No startup errors
- Ready to accept requests

---

## 6️⃣ Happy-Path Test Execution

### 6.1 Test Script Created

**Location**: `/tmp/test-edge-functions.sh`

**Functions**:
- Tests OPTIONS (CORS preflight)
- Tests POST with realistic payloads
- Verifies HTTP status codes
- Checks response headers
- Reports response body length

### 6.2 Manual Testing Commands

#### Test `ai-copilot`
```bash
# OPTIONS
curl -i -X OPTIONS http://localhost:54321/functions/v1/ai-copilot

# POST
curl -i -X POST http://localhost:54321/functions/v1/ai-copilot \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Help me plan a fashion event", "systemInstruction": "You are helpful"}'
```

**Expected Response**:
- Status: `200 OK`
- Headers: CORS headers + `Connection: keep-alive`
- Body: `{"text": "..."}` with AI-generated response

#### Test `generate-event-draft`
```bash
curl -i -X POST http://localhost:54321/functions/v1/generate-event-draft \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a fashion show event draft for Toronto Fashion Week"}'
```

**Expected Response**:
- Status: `200 OK`
- Body: Structured JSON with `eventTitle`, `descriptionLong`, `ticketTiers`, `scheduleItems`, etc.

#### Test `search-events`
```bash
curl -i -X POST http://localhost:54321/functions/v1/search-events \
  -H "Content-Type: application/json" \
  -d '{"query": "runway", "eventsContext": [{"id": 1, "title": "Spring Show", "description": "Fashion runway"}]}'
```

**Expected Response**:
- Status: `200 OK`
- Body: `{"matchIds": [1, ...]}` - Array of matching event IDs

#### Test `sponsor-ai`
```bash
curl -i -X POST http://localhost:54321/functions/v1/sponsor-ai \
  -H "Content-Type: application/json" \
  -d '{"action": "activation-ideas", "sponsorName": "Luxe Beauty", "sponsorIndustry": "Beauty", "eventDetails": "Fashion Week 2025"}'
```

**Expected Response**:
- Status: `200 OK`
- Body: `{"ideas": [...]}` - Array of activation ideas with `title`, `description`, `estimated_cost`

#### Test `schedule-optimizer`
```bash
curl -i -X POST http://localhost:54321/functions/v1/schedule-optimizer \
  -H "Content-Type: application/json" \
  -d '{"eventDetails": {"name": "Fashion Show", "duration_minutes": 120}, "deadline": "2025-12-15"}'
```

**Expected Response**:
- Status: `200 OK`
- Body: `{"thought_process": "...", "suggested_slots": [...]}` - Structured reasoning and schedule suggestions

#### Test `generate-image-preview`
```bash
curl -i -X POST http://localhost:54321/functions/v1/generate-image-preview \
  -H "Content-Type: application/json" \
  -d '{"eventDescription": "High-fashion runway poster", "moodTags": ["modern", "luxury"], "imageType": "promotional"}'
```

**Expected Response**:
- Status: `200 OK`
- Body: `{"images": [{"base64": "...", "mimeType": "image/png"}], "usedPrompt": "...", "styleContext": "..."}`

#### Test `resolve-venue`
```bash
curl -i -X POST http://localhost:54321/functions/v1/resolve-venue \
  -H "Content-Type: application/json" \
  -d '{"venueText": "luxury hotel in New York City"}'
```

**Expected Response**:
- Status: `200 OK`
- Body: `{"success": true, "candidates": [...]}` - Array of venue candidates with Google Maps data

#### Test `polish-brief`
```bash
curl -i -X POST http://localhost:54321/functions/v1/polish-brief \
  -H "Content-Type: application/json" \
  -d '{"brief": "A high-end fashion event", "type": "marketing"}'
```

**Expected Response**:
- Status: `200 OK`
- Body: `{"text": "..."}` - Enhanced/polished brief text

---

## 7️⃣ CORS & Headers Verification

### 7.1 Expected Headers for All Functions

**OPTIONS Response**:
```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: authorization, x-client-info, apikey, content-type
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Connection: keep-alive
```

**POST Response**:
```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: authorization, x-client-info, apikey, content-type
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Connection: keep-alive
Content-Type: application/json
```

### 7.2 Verification Checklist

For each function test:
- [ ] OPTIONS returns 200 with all CORS headers
- [ ] POST returns 200 with all CORS headers
- [ ] `Connection: keep-alive` present in all responses
- [ ] `Content-Type: application/json` present in POST responses
- [ ] Response body is valid JSON

---

## 8️⃣ Supabase Integration Tests

### 8.1 Functions Using Supabase

#### `manage-sponsors`
**Purpose**: Calculate ROI and update sponsor status

**Test Payload**:
```json
{
  "action": "calculate-roi",
  "sponsorId": 1
}
```

**Expected**:
- Queries `sponsor_roi_metrics` table
- Queries `event_sponsors` table
- Returns calculated ROI data

#### `invite-sponsor-user`
**Purpose**: Invite user and link to sponsor profile

**Test Payload**:
```json
{
  "email": "test@example.com",
  "sponsorProfileId": 1
}
```

**Expected**:
- Creates user invitation via Supabase Auth
- Updates `sponsor_profiles` table
- Returns success confirmation

### 8.2 Database Schema Requirements

**Tables Expected**:
- `sponsor_roi_metrics` - For ROI calculations
- `event_sponsors` - For sponsor data
- `sponsor_profiles` - For profile management

**Note**: If tables don't exist, functions will return errors. Schema should be verified before testing.

---

## 9️⃣ Error Handling Tests

### 9.1 Invalid Payload Tests

#### Missing Required Fields
```bash
# ai-copilot - missing prompt
curl -i -X POST http://localhost:54321/functions/v1/ai-copilot \
  -H "Content-Type: application/json" \
  -d '{}'
```
**Expected**: `400 Bad Request` with error message

#### Invalid Action (sponsor-ai)
```bash
curl -i -X POST http://localhost:54321/functions/v1/sponsor-ai \
  -H "Content-Type: application/json" \
  -d '{"action": "invalid-action"}'
```
**Expected**: `500 Internal Server Error` or handled gracefully

### 9.2 Missing Environment Variables

**If `GEMINI_API_KEY` is missing**:
- Functions should return `500` with error: "Missing GEMINI_API_KEY"

**If Supabase env vars are missing**:
- Functions should handle gracefully or return appropriate errors

---

## 🔟 Test Execution Status

### Functions Ready for Testing

**Gemini Functions** (10):
1. ✅ ai-copilot - General AI assistant (Gemini 3 Pro)
2. ✅ generate-event-draft - Event generation with structured output
3. ✅ generate-image-preview - Image generation (Nano Banana)
4. ✅ generate-image-final - Image refinement (Nano Banana Pro)
5. ✅ generate-media - Video generation (Veo 3.1)
6. ✅ polish-brief - Content enhancement
7. ✅ resolve-venue - Venue search with Google Maps grounding
8. ✅ schedule-optimizer - Schedule conflict resolution
9. ✅ search-events - Semantic event search
10. ✅ sponsor-ai - Multi-action sponsor AI assistance

**Supabase Functions** (2):
1. ✅ manage-sponsors - Sponsor ROI calculation and status updates
2. ✅ invite-sponsor-user - User invitation via Supabase Auth

### Testing Environment Status

**Local Testing**:
- ⚠️ **Docker not running** - Required for `supabase functions serve`
- ✅ **Supabase CLI v2.58.5** installed
- ✅ **Environment file** (`.env.local`) exists
- ✅ **Test script created**: `tests/test-ai-functions.sh`

**Deployed Testing**:
- ✅ **5 functions deployed** and ACTIVE in Supabase
- ✅ **Project URL available** via Supabase MCP
- ✅ **Can test via Supabase Dashboard** or direct API calls

### Testing Instructions

#### Option 1: Local Testing (Requires Docker)

1. **Start Docker Desktop** (prerequisite)

2. **Start Supabase Functions** (in separate terminals):
   ```bash
   cd supabase
   supabase functions serve ai-copilot --env-file ../.env.local --no-verify-jwt
   supabase functions serve generate-event-draft --env-file ../.env.local --no-verify-jwt
   # ... (repeat for each function)
   ```

3. **Run Test Script**:
   ```bash
   ./tests/test-ai-functions.sh local
   ```

#### Option 2: Deployed Testing (Recommended)

1. **Get Supabase Project URL**:
   ```bash
   # Via Supabase Dashboard or MCP
   SUPABASE_URL="https://nvdlhrodvevgwdsneplk.supabase.co"
   ```

2. **Run Test Script Against Deployed Functions**:
   ```bash
   export SUPABASE_URL="https://nvdlhrodvevgwdsneplk.supabase.co"
   export SUPABASE_ANON_KEY="your-anon-key"
   ./tests/test-ai-functions.sh deployed
   ```

3. **Or Test Via Supabase Dashboard**:
   - Navigate to Edge Functions
   - Click on function name
   - Use built-in test interface
   - Verify responses

#### Option 3: Manual Testing

Use curl commands from Section 6.2 with deployed function URLs:
```bash
curl -i -X POST https://nvdlhrodvevgwdsneplk.supabase.co/functions/v1/ai-copilot \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"prompt": "test", "systemInstruction": "You are helpful"}'
```

---

## 📊 Expected Test Results Summary

| Function | Status Code | Response Type | Key Fields |
|----------|------------|---------------|------------|
| ai-copilot | 200 | JSON | `text` |
| generate-event-draft | 200 | JSON | `eventTitle`, `descriptionLong`, `ticketTiers`, `scheduleItems` |
| search-events | 200 | JSON | `matchIds` |
| sponsor-ai | 200 | JSON | Varies by action (`ideas`, `recommendations`, etc.) |
| schedule-optimizer | 200 | JSON | `thought_process`, `suggested_slots` |
| generate-image-preview | 200 | JSON | `images`, `base64`, `mimeType` |
| resolve-venue | 200 | JSON | `success`, `candidates` |
| polish-brief | 200 | JSON | `text` |
| manage-sponsors | 200 | JSON | Varies by action |
| invite-sponsor-user | 200 | JSON | `success`, `message` |

---

## 🔧 Code Fixes Applied

**Status**: ✅ **No fixes needed**

All functions are:
- ✅ Using correct environment variable names
- ✅ Using proper input validation
- ✅ Using shared CORS headers
- ✅ Using `Deno.serve()`
- ✅ Using `npm:` imports with pinned versions

---

## ✅ Final Verification Checklist

- [x] All AI functions identified
- [x] Environment variables verified
- [x] Function schemas analyzed
- [x] Test payloads prepared
- [x] Test script created
- [x] CORS headers verified
- [x] Error handling patterns verified
- [x] Supabase integration requirements documented

---

## 📝 Next Steps

1. **Start Functions Locally**:
   ```bash
   cd supabase
   supabase functions serve <function-name> --env-file ../.env.local --no-verify-jwt
   ```

2. **Run Tests**:
   - Use test script or manual curl commands
   - Verify all responses include CORS headers
   - Verify all responses include `Connection: keep-alive`
   - Verify JSON responses are valid

3. **Document Results**:
   - Record actual status codes
   - Record response times
   - Note any errors or unexpected behavior
   - Update this report with actual test results

---

**Test Report Status**: ✅ **Ready for Execution**

**All test payloads prepared. Functions ready for happy-path testing.**

