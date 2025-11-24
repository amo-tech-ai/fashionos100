
# Task: AI Creative Director (Vision & Generation)

**Status:** Planned  
**Priority:** P1  
**Owner:** AI Engineering  
**References:**  
- [Image Generation](https://ai.google.dev/gemini-api/docs/image-generation)  
- [Video Understanding](https://ai.google.dev/gemini-api/docs/video-understanding)  
- [Media Resolution](https://ai.google.dev/gemini-api/docs/media-resolution)

## 1. Context Summary
FashionOS needs to move beyond simple text chat. The "AI Creative Director" module will allow designers to generate visual concepts (Moodboards) and analyze existing assets (Video/Image breakdowns) to streamline the creative briefing process.

## 2. Multistep Development Prompt

### Iteration 1: Moodboard Generator (Imagen / Gemini Image)
1.  **Component:** Create `components/creative/MoodboardGenerator.tsx`.
2.  **Input:** Text prompt area ("Cyberpunk street style, neon lighting, Tokyo night").
3.  **API Integration:** 
    *   Use `gemini-3-pro-image-preview` for high-fidelity previews.
    *   Implement `ai.models.generateContent` with `imageConfig` (1:1 aspect ratio for grid, 1K size).
    *   *Alternative:* If specific artistic control is needed, use `imagen-4.0-generate-001`.
4.  **UI:** Display a 2x2 grid of generated images. Allow users to "Select" images to attach to their Booking Brief.

### Iteration 2: Visual Style Analyzer (Video Understanding)
1.  **Feature:** "Analyze My Vibe" upload zone in `EventWizard`.
2.  **Input:** User uploads a reference video (mp4) or image.
3.  **API Integration:**
    *   Upload file via `Files API` (see Task 10).
    *   Call `gemini-3-pro-preview` with the file URI.
    *   **Prompt:** "Analyze the lighting, color palette, and camera movement in this video. Output a technical brief for a photographer."
4.  **Output:** Text description pre-filling the "Creative Brief" fields (e.g., "Lighting: High Contrast, Color: Cool Blues, Mood: Melancholic").

### Iteration 3: Media Optimization
1.  **Logic:** Implement client-side checks or server-side resizing.
2.  **Optimization:** Ensure images sent to Gemini for analysis are optimized according to [Media Resolution](https://ai.google.dev/gemini-api/docs/media-resolution) guidelines (e.g., resizing large detailed shots to preserve token usage while maintaining clarity).

## 3. Success Criteria
- [ ] User can generate 4 distinct images from a text prompt.
- [ ] User can upload a video reference and get a text summary of its "style".
- [ ] Generated images can be saved to the project/shoot state.

## 4. Technical Constraints
- **Model Selection:** Use `gemini-3-pro-image-preview` for images. Use `gemini-3-pro-preview` for video understanding.
- **Privacy:** Ensure uploaded reference files are handled securely via Supabase Storage before passing URIs to Gemini.

## 5. Code Snippet (Concept)
```typescript
// Image Generation
const response = await ai.models.generateContent({
  model: 'gemini-3-pro-image-preview',
  contents: { parts: [{ text: 'Avant-garde fashion runway, sustainable materials, forest setting' }] },
  config: {
    imageConfig: { numberOfImages: 4, aspectRatio: "1:1" }
  }
});
```
