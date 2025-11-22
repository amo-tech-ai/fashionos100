
# Task: Intelligent Document Processing (Context & Files)

**Status:** Planned  
**Priority:** P1  
**Owner:** Backend / AI  
**References:**  
- [Document Processing](https://ai.google.dev/gemini-api/docs/document-processing)  
- [Files API](https://ai.google.dev/gemini-api/docs/files)  
- [URL Context](https://ai.google.dev/gemini-api/docs/url-context)  
- [File Search](https://ai.google.dev/gemini-api/docs/file-search)

## 1. Context Summary
Events and Shoots involve heavy documentation: venue contracts (PDF), guest lists (CSV), and brand guidelines (Websites). This task builds the pipeline to ingest these sources so the AI knows *exactly* what the user is talking about without manual copy-pasting.

## 2. Multistep Development Prompt

### Iteration 1: Files API Uploader
1.  **Backend:** Create an Edge Function `upload-context-file`.
2.  **Flow:** 
    *   Accept file from frontend.
    *   Upload to Google AI Studio via `File API` (`ai.files.create`).
    *   Store the returned `file.uri` in a Supabase table `project_context_files`.
3.  **Frontend:** Add a "Knowledge Base" section to the Dashboard settings or specific Project pages.

### Iteration 2: Contract Analyzer (PDF Processing)
1.  **Feature:** "Venue Contract Scanner".
2.  **Action:** User uploads a venue PDF.
3.  **AI:** Pass file URI to `gemini-3-pro-preview`.
4.  **Prompt:** "Extract the following keys from this contract: Total Cost, Deposit Due Date, Cancellation Policy, Capacity Limit."
5.  **UI:** Auto-populate the `Budget` and `Venue` fields in the Event Wizard.

### Iteration 3: Brand Voice (URL Context)
1.  **Feature:** "Brand Scanner".
2.  **Input:** User enters their website URL (e.g., `www.mybrand.com`).
3.  **AI:** Use `gemini-3-pro-preview` (which has 2M+ context) to process the URL content (requires retrieval tool or direct URL context if supported by the specific model version/tool configuration).
    *   *Note:* If direct URL context isn't native to the model text-input yet, use a fetching intermediary or the `googleSearch` tool to "Read the home page of [URL]".
4.  **Output:** A "Brand Persona" summary (Tone: Minimalist, Audience: Gen Z) saved to the user profile.

## 3. Success Criteria
- [ ] User can upload a PDF contract.
- [ ] System successfully extracts "Deposit Amount" from the PDF.
- [ ] Files are managed (uploaded/deleted) via the Files API to respect storage limits.

## 4. Technical Constraints
- **File Types:** PDF, CSV, HTML.
- **Latency:** File processing can take seconds. Implement polling or loading states.
- **Security:** Only allow the upload of relevant document types.

## 5. Code Snippet (Concept)
```typescript
// Document Q&A
const response = await ai.models.generateContent({
  model: 'gemini-3-pro-preview',
  contents: [
    { 
      role: 'user', 
      parts: [
        { fileData: { fileUri: uploadedFileUri, mimeType: 'application/pdf' } },
        { text: "What is the overtime fee per hour listed in this contract?" }
      ] 
    }
  ]
});
```
