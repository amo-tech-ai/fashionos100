
# Task: Autonomous Actions (Tools & Functions)

**Status:** Planned  
**Priority:** P2  
**Owner:** Backend / AI  
**References:**  
- [Function Calling](https://ai.google.dev/gemini-api/docs/function-calling)  
- [Code Execution](https://ai.google.dev/gemini-api/docs/code-execution)  
- [Structured Output](https://ai.google.dev/gemini-api/docs/structured-output)

## 1. Context Summary
To make FashionOS truly autonomous, the AI needs to *do* things, not just talk about them. This task wires the chat interface to the backend database and enables complex calculations.

## 2. Multistep Development Prompt

### Iteration 1: Structured Data Entry (Structured Output)
1.  **Feature:** "Chat to Booking".
2.  **Input:** User describes a shoot in chat.
3.  **Config:** `responseMimeType: "application/json"`, `responseSchema`: { type: OBJECT, properties: { ...bookingFields } }.
4.  **Result:** Chat output is guaranteed valid JSON that can be passed directly to the `createBooking` frontend function without parsing errors.

### Iteration 2: Database Actions (Function Calling)
1.  **Tools Definition:** Define functions like `checkAvailability(date)`, `createDraftBooking(details)`, `searchDirectory(query)`.
2.  **Flow:**
    *   User: "Book Elena for next Tuesday."
    *   Model: Returns `FunctionCall` for `checkAvailability`.
    *   App: Executes logic against Supabase.
    *   App: Sends result back to Model.
    *   Model: "Tuesday is free. Shall I confirm?"
3.  **Safety:** Implement a "Human in the loop" confirmation button before writing to the DB.

### Iteration 3: Budget Calculator (Code Execution)
1.  **Feature:** "Project Estimator".
2.  **Input:** "I have $5k. I need a photographer, 3 models, and a studio in NY. Can I afford it?"
3.  **Config:** Enable `tools: [{ codeExecution: {} }]`.
4.  **Behavior:** The model writes and runs Python code to perform the math, handling currency conversions or tax rates accurately rather than guessing next-token probabilities for numbers.

## 3. Success Criteria
- [ ] Chat interface can successfully create a "Draft Booking" in Supabase.
- [ ] Budget queries use Code Execution for math accuracy.
- [ ] All JSON outputs validate against the Zod/Supabase schema.

## 4. Technical Constraints
- **Security:** Function calls should be executed server-side (Edge Functions) or with strict validation if client-side.
- **Schema:** Use strict type definitions for `responseSchema`.

## 5. Code Snippet (Concept)
```typescript
// Function Calling
const tools = [{
  functionDeclarations: [{
    name: "check_availability",
    description: "Check if a studio is available on a date",
    parameters: {
      type: "OBJECT",
      properties: { date: { type: "STRING" } },
      required: ["date"]
    }
  }]
}];

const response = await ai.models.generateContent({
  model: 'gemini-3-pro-preview',
  contents: "Is the studio free on Oct 12th?",
  config: { tools }
});
// Handle response.functionCalls
```
