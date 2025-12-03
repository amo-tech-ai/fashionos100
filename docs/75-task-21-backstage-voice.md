
# 🪄 Task 21: Backstage Voice Assistant

**Phase:** 6 (Commercial & Real-Time)
**Dependencies:** Task 08 (Events)
**Output:** Mobile Voice Interface

---

## 1. Context
Backstage is hectic. Producers can't type. They need to ask questions via voice.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a Mobile Interaction Designer.
Action: Build the "Show Caller" Voice Interface.

=========================================
1. FRONTEND: SPEECH-TO-TEXT
=========================================
- Use the Web Speech API (`window.SpeechRecognition`) or a lightweight library.
- UI: A large microphone button in the `MobileLayout` (Backstage Mode).

=========================================
2. EDGE FUNCTION (`supabase/functions/voice-command/index.ts`)
=========================================
- **Input:** Transcribed text.
- **Tools (Function Calling):**
  - `getCallTime(personName)`
  - `getScheduleStatus()`
  - `getVenueWifi()`
- **Model:** `gemini-2.5-flash`.
- **System Prompt:** "You are a concise backstage assistant. Answer in 1 sentence."

=========================================
3. FRONTEND: TEXT-TO-SPEECH
=========================================
- Use `window.speechSynthesis` to read the AI response back to the user.

Output the Voice Component and the Edge Function logic.
```

---

## 3. Verification Checklist
- [ ] Microphone button captures audio.
- [ ] Backend correctly identifies the intent (Function Call).
- [ ] App speaks the answer back.
