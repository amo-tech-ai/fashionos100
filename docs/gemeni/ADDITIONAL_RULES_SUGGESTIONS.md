# Additional Gemini API Cursor Rules - Suggestions

Based on API documentation review and codebase analysis, here are recommended additional cursor rules to create:

## Priority 1: High Impact (Create First)

### 1. **structured-output.mdc** ⭐ CRITICAL
**Status:** Used extensively in codebase  
**Files Using:** `generate-event-draft`, `resolve-venue`, `sponsor-ai`, `search-events`, `schedule-optimizer`

**Why:** Your codebase heavily uses JSON Schema for structured responses. This rule would ensure:
- Correct `responseMimeType` and `responseSchema` usage
- Proper Type/Type.OBJECT patterns
- Schema definition best practices
- Error handling for schema validation

**Key Patterns to Document:**
- `responseMimeType: "application/json"`
- `responseSchema` vs `responseJsonSchema` (SDK differences)
- Type definitions with `Type.OBJECT`, `Type.ARRAY`, etc.
- Required fields and nested structures

### 2. **text-generation.mdc** ⭐ FOUNDATIONAL
**Status:** Basic API usage, used everywhere

**Why:** This is the foundation of all Gemini API calls. Documents:
- Basic `generateContent()` patterns
- Content structure (text, images, multimodal)
- Response parsing (`response.text`, `response.candidates`)
- Error handling
- Model selection

**Key Patterns to Document:**
- Simple text generation
- Multimodal inputs (text + image)
- Content parts structure
- Response parsing patterns

## Priority 2: Medium Impact (Create Next)

### 3. **google-search.mdc** 🔍 USEFUL
**Status:** Not currently used, but valuable for real-time data

**Why:** Would enable real-time information access for:
- Event venue verification
- Current pricing/trends
- Real-time event information
- Citation support

**Key Patterns to Document:**
- `tools: [{ googleSearch: {} }]`
- Grounding metadata parsing
- Citation extraction
- Search query optimization

### 4. **url-context.mdc** 🔗 POTENTIAL
**Status:** Not currently used, but could enhance event wizard

**Why:** Could be used for:
- Analyzing brand websites/Instagram URLs
- Extracting event details from URLs
- Multi-URL synthesis (already doing manually in generate-event-draft)

**Key Patterns to Document:**
- `tools: [{ urlContext: {} }]`
- URL metadata extraction
- Multi-URL processing
- Limitations and supported URL types

## Priority 3: Lower Priority (Future)

### 5. **code-execution.mdc** 💻 SPECIALIZED
**Status:** Not used, specialized use case

**Why:** Could be useful for:
- Data processing/calculations
- Complex computations
- Iterative problem solving

**Key Patterns to Document:**
- `tools: [{ codeExecution: {} }]`
- Executable code parsing
- Code execution result handling
- Python-only limitation

### 6. **file-search.mdc** 📁 SPECIALIZED
**Status:** Not used, specialized use case

**Why:** Could be useful for:
- Document search across uploaded files
- Knowledge base queries
- Large document analysis

**Key Patterns to Document:**
- File search store setup
- Search query patterns
- Result parsing

### 7. **thinking.mdc** 🧠 ALREADY COVERED
**Status:** Covered in `gemeni-3.mdc`

**Note:** Thinking patterns are already documented in the Gemini 3 rule. May want to extract if using with Gemini 2.5.

## Implementation Priority

1. ✅ **structured-output.mdc** - Create immediately (actively used)
2. ✅ **text-generation.mdc** - Create next (foundational)
3. ⚠️ **google-search.mdc** - Create when needed
4. ⚠️ **url-context.mdc** - Create when implementing URL analysis
5. ⏸️ **code-execution.mdc** - Create if needed for calculations
6. ⏸️ **file-search.mdc** - Create if implementing document search

## Current Rule Coverage

✅ **Complete:**
- `function-calling.mdc` - Comprehensive
- `gemeni-3.mdc` - Comprehensive
- `nano-banana.mdc` - Comprehensive

⚠️ **Missing:**
- Structured output patterns (CRITICAL - used in 5+ functions)
- Basic text generation patterns (FOUNDATIONAL)
- Google Search grounding
- URL context tool
- Code execution tool
- File search tool

## Recommended Next Steps

1. **Create `structured-output.mdc`** - Highest priority, actively used
2. **Create `text-generation.mdc`** - Foundational patterns
3. **Review edge functions** - Identify which tools would benefit from Google Search/URL Context
4. **Create tool-specific rules** - As features are implemented

