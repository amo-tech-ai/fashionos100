# Architecture Diagrams

## Diagram 1 — Full Fashion Show Lifecycle

```mermaid
flowchart LR
    Concept[1. Concept & Vision] --> Plan[2. Planning & Budget]
    Plan --> Venue[3. Venue & Logistics]
    Venue --> Cast[4. Casting & Collections]
    Cast --> Spons[5. Sponsors & PR]
    Spons --> Prod[6. Production & Tech]
    Prod --> Show[7. Show Day Execution]
    Show --> Media[8. Media & Content]
    Media --> ROI[9. Analytics & ROI]

    subgraph "AI Acceleration (Gemini 3)"
    Direction[Creative Direction] -.-> Concept
    Search[Search Grounding] -.-> Plan
    Maps[Maps Grounding] -.-> Venue
    Vision[Computer Vision] -.-> Cast
    Agents[AI Agents] -.-> Spons
    Reasoning[Reasoning Engine] -.-> Prod
    Analytics[Data Analysis] -.-> ROI
    end
```

## Diagram 2 — Event Context Navigation

```mermaid
graph TD
    Root[FashionOS] --> Global[Global Dashboard]
    Global --> EventsList[Event List]
    EventsList -->|Select Event| EventContext[Event Context (ID:123)]
    
    subgraph "Event Workspace"
        EventContext --> Cmd[Command Center]
        EventContext --> TL[Timeline]
        EventContext --> RoS[Run of Show]
        EventContext --> Cast[Casting Board]
        EventContext --> Ven[Venue Map]
        EventContext --> Fin[Financials]
    end
    
    Ven --> Floor[Floorplan Editor]
    Cast --> Model[Model Details]
    Fin --> Budg[Budget Tracker]
```

## Diagram 3 — AI / Gemini Architecture

```mermaid
flowchart TD
    User[User Input] --> Front[React Frontend]
    Front --> Edge[Supabase Edge Functions]
    
    subgraph "AI Core (Gemini 3 Pro)"
        Edge --> Reasoning[Thinking Mode]
        Edge --> Search[Google Search Tool]
        Edge --> Maps[Google Maps Tool]
        Edge --> Vision[Multimodal Input]
        Edge --> Code[Code Execution]
    end
    
    Reasoning --> JSON[Structured JSON]
    Search --> Context[Real-world Data]
    Maps --> Geo[Venue Data]
    
    JSON --> DB[(Supabase Database)]
    Context --> DB
    Geo --> DB
    
    DB --> Front
    
    subgraph "RAG System"
        Docs[PDF Contracts] --> Embed[Embeddings]
        Embed --> VecDB[(Vector Store)]
        VecDB --> Reasoning
    end
```