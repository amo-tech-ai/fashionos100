
# 🪄 Task 17: Document Intelligence (RAG)

**Phase:** 5 (Advanced AI)
**Dependencies:** Task 06 (AI Infra)
**Output:** Chat Interface for Documents

---

## 1. Context
Users upload complex PDFs (Venue Contracts, Tech Riders). They need to query this data without reading 50 pages. We use Gemini's Long Context or Files API.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are an AI Architect.
Action: Implement the "Document Chat" feature.

=========================================
1. STORAGE & INGESTION
=========================================
- Ensure Supabase Storage bucket `documents` exists (Private).
- **Edge Function (`ingest-document`):**
  - Accepts file upload.
  - Uploads to Gemini Files API (`files.create`).
  - Stores `file_uri` in Supabase `media_assets` table.

=========================================
2. QUERY FUNCTION (`supabase/functions/query-document/index.ts`)
=========================================
- **Input:** `prompt`, `file_uri`.
- **Logic:**
  - Call `models.generateContent` referencing the `file_uri` in the request.
  - Model: `gemini-1.5-pro` (Long Context window).
  - Prompt: "Answer the user's question based strictly on the provided document."

=========================================
3. UI (`src/components/dashboard/DocumentChat.tsx`)
=========================================
- **Layout:** Split view. PDF Preview (Left) | Chat Window (Right).
- **Chat:** Message list + Input.
- **Context:** pass the active document's URI to the backend.

Output the Ingestion Logic, Query Function, and Chat UI.
```

---

## 3. Verification Checklist
- [ ] Uploading a PDF returns a success status and `file_uri`.
- [ ] Asking "What is the payment schedule?" returns an answer cited from the PDF.
- [ ] RLS prevents accessing other users' documents.
