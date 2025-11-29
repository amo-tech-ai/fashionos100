#!/bin/bash
# AI Edge Functions Happy-Path Test Script
# Usage: ./test-ai-functions.sh [local|deployed]

MODE=${1:-local}
BASE_URL=""

if [ "$MODE" = "deployed" ]; then
  echo "Using deployed Supabase functions..."
  # Get from Supabase project URL
  BASE_URL="${SUPABASE_URL:-https://nvdlhrodvevgwdsneplk.supabase.co}/functions/v1"
else
  echo "Using local functions (requires Docker + supabase functions serve)..."
  BASE_URL="http://localhost:54321/functions/v1"
fi

echo "Base URL: $BASE_URL"
echo ""

test_function() {
  local func=$1
  local payload=$2
  local description=$3
  
  echo "🧪 Testing: $func"
  echo "   Description: $description"
  echo ""
  
  # Test OPTIONS
  echo "   [1/2] OPTIONS (CORS preflight):"
  OPTIONS_RESPONSE=$(curl -s -i -X OPTIONS "$BASE_URL/$func" 2>&1)
  HTTP_STATUS=$(echo "$OPTIONS_RESPONSE" | grep "HTTP" | head -1)
  echo "      Status: $HTTP_STATUS"
  
  CORS_HEADERS=$(echo "$OPTIONS_RESPONSE" | grep -iE "access-control|connection" | head -3)
  if [ -n "$CORS_HEADERS" ]; then
    echo "      ✅ CORS headers present"
    echo "$CORS_HEADERS" | sed 's/^/         /'
  else
    echo "      ⚠️ CORS headers missing"
  fi
  echo ""
  
  # Test POST
  echo "   [2/2] POST (happy path):"
  POST_RESPONSE=$(curl -s -i -X POST "$BASE_URL/$func" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY:-}" \
    -d "$payload" 2>&1)
  
  HTTP_STATUS=$(echo "$POST_RESPONSE" | grep "HTTP" | head -1)
  echo "      Status: $HTTP_STATUS"
  
  if echo "$HTTP_STATUS" | grep -q "200\|201"; then
    echo "      ✅ Success"
  else
    echo "      ⚠️ Non-200 status"
  fi
  
  HEADERS=$(echo "$POST_RESPONSE" | grep -iE "connection|access-control|content-type" | head -3)
  if [ -n "$HEADERS" ]; then
    echo "      Headers:"
    echo "$HEADERS" | sed 's/^/         /'
  fi
  
  BODY=$(echo "$POST_RESPONSE" | awk '/^\r?$/{p=1;next} p')
  BODY_LENGTH=$(echo "$BODY" | wc -c)
  echo "      Response body: $BODY_LENGTH bytes"
  
  # Try to parse JSON
  if echo "$BODY" | jq . > /dev/null 2>&1; then
    echo "      ✅ Valid JSON"
    # Show first 200 chars of response
    echo "$BODY" | head -c 200
    echo "..."
  else
    echo "      ⚠️ Invalid JSON or empty"
    echo "$BODY" | head -c 200
  fi
  
  echo ""
  echo "---"
  echo ""
}

# Test Gemini functions
echo "=== TESTING GEMINI FUNCTIONS ==="
echo ""

test_function "ai-copilot" \
  '{"prompt": "Help me plan a fashion event for 500 attendees", "systemInstruction": "You are a fashion event planner"}' \
  "AI Copilot - General assistance"

test_function "search-events" \
  '{"query": "runway show", "eventsContext": [{"id": 1, "title": "Spring Collection", "description": "Fashion runway event"}]}' \
  "Event Search - Semantic search"

test_function "polish-brief" \
  '{"brief": "A high-end fashion event featuring emerging designers", "type": "marketing"}' \
  "Polish Brief - Content enhancement"

test_function "resolve-venue" \
  '{"venueText": "luxury hotel in New York City with ballroom"}' \
  "Resolve Venue - Google Maps grounding"

test_function "sponsor-ai" \
  '{"action": "activation-ideas", "sponsorName": "Luxe Beauty", "sponsorIndustry": "Beauty", "eventDetails": "Fashion Week 2025"}' \
  "Sponsor AI - Activation ideas"

test_function "schedule-optimizer" \
  '{"eventDetails": {"name": "Fashion Show", "duration_minutes": 120}, "deadline": "2025-12-15"}' \
  "Schedule Optimizer - Conflict resolution"

echo "=== TESTING COMPLETE ==="
echo ""
echo "Note: Image generation functions (generate-image-preview, generate-image-final) require"
echo "      GEMINI_API_KEY and may take longer to respond."
echo ""
echo "To test image functions:"
echo "  test_function 'generate-image-preview' '{\"eventDescription\": \"Fashion event\", \"moodTags\": [\"modern\"]}' 'Image Preview'"
