#!/usr/bin/env bash

# Test runner for generate-image-final Edge Function
# Usage: ./run-all-tests.sh [local|deployed]
# Default: local

MODE=${1:-local}
BASE_URL=""

if [ "$MODE" = "deployed" ]; then
  echo "Using deployed Supabase functions..."
  # Get from Supabase project URL or environment variable
  BASE_URL="${SUPABASE_URL:-https://nvdlhrodvevgwdsneplk.supabase.co}/functions/v1"
else
  echo "Using local functions (requires Docker + supabase functions serve)..."
  BASE_URL="http://localhost:54321/functions/v1"
fi

echo "Base URL: $BASE_URL"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

test_function() {
  local test_name=$1
  local payload=$2
  local description=$3
  
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🧪 TEST: $test_name"
  echo "   Description: $description"
  echo ""
  
  # Test OPTIONS (CORS preflight)
  echo "   [1/2] OPTIONS (CORS preflight):"
  OPTIONS_RESPONSE=$(curl -s -i -X OPTIONS "$BASE_URL/generate-image-final" 2>&1)
  HTTP_STATUS=$(echo "$OPTIONS_RESPONSE" | grep "HTTP" | head -1 | awk '{print $2}')
  
  if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "204" ]; then
    echo -e "      ${GREEN}✅ Status: $HTTP_STATUS${NC}"
  else
    echo -e "      ${RED}❌ Status: $HTTP_STATUS${NC}"
  fi
  
  CORS_HEADERS=$(echo "$OPTIONS_RESPONSE" | grep -iE "access-control|connection" | head -3)
  if [ -n "$CORS_HEADERS" ]; then
    echo "      ✅ CORS headers present"
  else
    echo -e "      ${YELLOW}⚠️  CORS headers missing${NC}"
  fi
  echo ""
  
  # Test POST
  echo "   [2/2] POST (happy path):"
  POST_RESPONSE=$(curl -s -i -X POST "$BASE_URL/generate-image-final" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY:-}" \
    -d "$payload" 2>&1)
  
  HTTP_STATUS=$(echo "$POST_RESPONSE" | grep "HTTP" | head -1 | awk '{print $2}')
  echo "      Status: $HTTP_STATUS"
  
  if echo "$HTTP_STATUS" | grep -qE "200|201"; then
    echo -e "      ${GREEN}✅ Success${NC}"
  elif echo "$HTTP_STATUS" | grep -qE "400|401|403|404|500"; then
    echo -e "      ${RED}❌ Error: $HTTP_STATUS${NC}"
  else
    echo -e "      ${YELLOW}⚠️  Unexpected status${NC}"
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
    echo -e "      ${GREEN}✅ Valid JSON${NC}"
    
    # Check for error field
    if echo "$BODY" | jq -e '.error' > /dev/null 2>&1; then
      ERROR_MSG=$(echo "$BODY" | jq -r '.error' | head -c 100)
      echo -e "      ${YELLOW}⚠️  Error in response: $ERROR_MSG${NC}"
    fi
    
    # Check for success indicators
    if echo "$BODY" | jq -e '.ok == true' > /dev/null 2>&1; then
      echo -e "      ${GREEN}✅ Response indicates success${NC}"
    fi
    
    if echo "$BODY" | jq -e '.image' > /dev/null 2>&1; then
      IMAGE_LENGTH=$(echo "$BODY" | jq -r '.image' | wc -c)
      echo -e "      ${GREEN}✅ Image data present (${IMAGE_LENGTH} chars)${NC}"
    fi
    
    # Show first 200 chars of response
    echo "      Response preview:"
    echo "$BODY" | head -c 200
    echo "..."
  else
    echo -e "      ${RED}❌ Invalid JSON or empty${NC}"
    echo "$BODY" | head -c 200
  fi
  
  echo ""
  echo ""
}

# Run tests
echo "=== TESTING generate-image-final EDGE FUNCTION ==="
echo ""

# Test 1: Prompt-only (should return 400)
test_function "Prompt-only (no image)" \
  '{"prompt": "Test image preview"}' \
  "Should return 400 error with clear message about missing image input"

# Test 2: PNG base64
test_function "PNG base64" \
  '{"prompt": "Fashion show stage preview", "baseImageBase64": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="}' \
  "Should process base64 PNG and return refined image"

# Test 3: Remote URL
test_function "Remote image URL" \
  '{"prompt": "Enhance this image", "image_url": "https://picsum.photos/600/600"}' \
  "Should download image from URL and process it"

echo "=== TESTING COMPLETE ==="
echo ""
echo "Summary:"
echo "  - All tests executed"
echo "  - Check output above for success/error indicators"
echo ""
echo "Note: Image generation functions require GEMINI_API_KEY"
echo "      and may take 10-30 seconds to respond."

