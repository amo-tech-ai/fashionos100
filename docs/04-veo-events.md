# 🎬 Veo 3.1 Event Integration Plan

> **FashionOS = front-end for events**
> **Veo 3.1 (via Gemini API) = event trailer generator**

This document outlines the strategy to wire the Event page → backend → Veo 3.1 so a designer can click **“Generate Event Trailer”** and get a short 8s video with logo, vibe, and audio.

---

## 1. What Veo 3.1 gives you (for events)

From the official docs: Veo 3.1 generates **8-second, 720p/1080p videos with native audio** from **text prompts and up to 3 reference images** (logo, venue, outfit, etc.).

Perfect for:
*   **Event teasers** (Reels/TikTok/Shorts)
*   **Landing page hero video**
*   **Sponsor recap snippets**

---

## 2. MVP flow for your app (two modes)

### UI (Event page)

On the Event details / Media tab:
*   Button A: **“Generate from description”** (auto)
*   Button B: **“Generate from my own prompt”** (manual)
*   Optional: toggle aspect ratio `16:9` / `9:16` and style preset (*cinematic, social, minimal*).

### Mode 1 – From event description + branding (no prompt writing)

1.  User creates the event with your Event Wizard (title, date, venue, description, target audience, brand colors).
2.  They click **“Generate from description”**.
3.  Backend:
    *   Reads `events` row from Supabase (title, summary, city, date, audience, vibe).
    *   Loads **brand logo + 1–2 hero images** from Storage (Cloudinary or Supabase).
    *   Builds a **Veo prompt** text (see section 4).
    *   Calls Gemini API `generate_videos` with:
        *   `model: "veo-3.1-generate-preview"`
        *   `prompt: "...event teaser instructions..."`
        *   `image` or `images: [logo, venue, outfit]` as reference.
4.  When Veo finishes, you:
    *   Store the video file (URL) in `event_media` table.
    *   Show a preview + “Download MP4” + “Copy share link”.

**Real example**
Event: **“Medellín Night Runway – Sustainable Fashion”**
Veo output: 8s vertical clip showing neon city skyline → cut to runway → quick shots of eco outfits → final frame: logo + date.

---

### Mode 2 – From a free-form prompt

1.  User types:
    > “Create a 9:16 cinematic teaser of a streetwear fashion pop-up in Bogotá, with quick cuts of models, DJ, and audience. End with our logo and event date.”
2.  They also pick:
    *   Aspect ratio: `9:16`
    *   Duration: 8s
3.  Backend sends that text + logo/hero image through Veo 3.1 exactly the same way as Mode 1.

---

## 3. Backend: minimal code pattern (Node / TypeScript)

Based on the official Gemini video docs (JS example).

```ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateEventVideo({
  eventPrompt,
  imageParts, // up to 3 images: logo, venue, outfit
}: {
  eventPrompt: string;
  imageParts?: any[];
}) {
  // 1) Start Veo 3.1 long-running job
  let operation = await ai.models.generateVideos({
    model: "veo-3.1-generate-preview",
    prompt: eventPrompt,
    // If you have images, pass them here (depends on SDK version)
    image: imageParts?.[0],
  });

  // 2) Poll until it's done
  while (!operation.done) {
    await new Promise((r) => setTimeout(r, 10000));
    operation = await ai.operations.getVideosOperation({ operation });
  }

  // 3) Get video file + download URL
  const video = operation.response.generatedVideos[0];
  // Some SDKs let you download directly:
  // await ai.files.download({ file: video.video, downloadPath: "event_teaser.mp4" });

  return video.video; // store this file or uri in Supabase
}
```

Wrap this in a Supabase Edge Function or Cloud Run service that your frontend calls like:

```http
POST /api/events/:id/generate-video
```

---

## 4. “Event → Veo prompt” template

*(Use this as a function in your backend OR as a Gemini text prompt in AI Studio)*

When user chooses **Auto**, you convert the event row into a detailed Veo prompt:

```text
You are creating a short teaser video for a fashion event.

Goal:
Create a high-quality 8-second video trailer for this event, using Veo 3.1.

Event details:
- Title: {{event.title}}
- City: {{event.city}}, {{event.country}}
- Date: {{event.date}}
- Venue: {{event.venue_name}} ({{venue_type}} – e.g. rooftop, warehouse, gallery)
- Theme: {{event.theme}} (e.g. sustainable fashion, streetwear, haute couture)
- Audience: {{event.audience}} (e.g. young creatives, fashion buyers, influencers)
- Brand mood: {{brand.vibe}} (e.g. bold, elegant, minimal, urban)
- Main visuals: runway, models, crowd, venue environment

Instructions for the video:
- Duration: around 8 seconds.
- Aspect ratio: 9:16, optimized for Instagram Reels and TikTok.
- Opening shot: 1–2 seconds establishing the venue or city at night/day, matching the theme.
- Middle: 4–5 seconds of quick cuts of models walking, audience reactions, close-ups of fabrics and details.
- Ending: final 1–2 seconds with the brand logo centered and the event title + date below it.
- Style: cinematic, smooth camera motion, modern color grading that matches the brand colors: {{brand.colors}}.
- Audio: subtle background music that fits the theme (for example: deep house, afro beats, lo-fi electronic), plus light crowd ambience.

Output:
Return a single Veo-ready prompt in English, 4–8 sentences, describing exactly what the camera shows,
the motion, the pacing, and the audio, using present tense.
```

You can:
1.  Ask **Gemini 3 Pro / 2.5 Flash** to turn the raw `event` JSON into this final Veo prompt.
2.  Then pass that **string** into `generate_videos` with Veo 3.1.

---

## 5. Real-world usage inside FashionOS

**Core MVP**
*   1 click on Event page → generate **one 8s vertical teaser** with logo.
*   Store it in `event_media` and show it on:
    *   Event landing page hero
    *   “Share on social” panel
    *   Dashboard Media tab

**Advanced later**
*   Multiple variations (Style A/B: cinematic vs social).
*   Localized versions (Spanish / English overlays).
*   Auto-generate shorts for:
    *   **Designer profile page**
    *   **Photo / video shoot packages** (e.g. “Book a lookbook + Veo teaser”).