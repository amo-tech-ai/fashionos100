
# 🪄 Task 19: Talent Matchmaker (Embeddings)

**Phase:** 6 (Commercial & Real-Time)
**Dependencies:** Task 07 (CRM), Task 14 (Directory)
**Output:** Semantic Search Engine

---

## 1. Context
Keyword search ("Photographer") is not enough. Users want to find talent based on *style* ("Dark moody cyberpunk"). We will use Vector Embeddings.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are an AI Search Engineer.
Action: Implement Semantic Search for the Talent Directory.

=========================================
1. DATABASE SETUP (Vector Store)
=========================================
- Enable `vector` extension in Supabase.
- Add `embedding vector(768)` column to `model_profiles` and `designer_profiles`.
- Create a function `match_talent` to perform similarity search (cosine distance).

=========================================
2. EDGE FUNCTION (`supabase/functions/embed-profile/index.ts`)
=========================================
- **Trigger:** Database Webhook on Profile Insert/Update OR Manual "Sync" button.
- **Logic:**
  - Concatenate `bio`, `tags`, `specialty`.
  - Call `ai.models.embedContent` (model: `text-embedding-004`).
  - Save vector to database.

=========================================
3. SEARCH FUNCTION (`supabase/functions/semantic-search/index.ts`)
=========================================
- **Input:** User query ("Edgy streetwear model").
- **Logic:** Embed query -> Call RPC `match_talent` -> Return ranked rows.

=========================================
4. UI INTEGRATION
=========================================
- Update `TalentNetwork.tsx` with a "AI Match" toggle.
- When enabled, use the semantic search endpoint instead of text filter.

Output the SQL for vectors, the Embedding Function, and the Search Logic.
```

---

## 3. Verification Checklist
- [ ] Profile text is successfully vectorized.
- [ ] Searching "Summer vibes" returns profiles with "Beach", "Swimwear" tags even if they don't say "Summer".
