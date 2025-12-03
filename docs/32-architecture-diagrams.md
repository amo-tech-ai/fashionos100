# Architecture Diagrams

## Diagram 1 — Global Platform Architecture

```mermaid
graph TD
    User[User] --> Dashboard
    Dashboard --> Services
    Dashboard --> AI_Hub[AI Intelligence Hub]
    
    subgraph Services
        Photo[Photography]
        Video[Video Production]
        Web[Web & eCommerce]
        Social[Social & Marketing]
        Event[Event Planning]
    end

    subgraph AI_Hub
        Gen[Generative Engine]
        RAG[Document RAG]
        Maps[Maps Intelligence]
        Data[Data Analysis]
    end

    Services <--> AI_Hub
    Services --> DB[(Supabase DB)]
    AI_Hub --> Gemini[Gemini 3 Pro]
```

## Diagram 2 — AI Event Wizard Flow

```mermaid
sequenceDiagram
    participant User
    participant Wizard
    participant Gemini
    participant Maps
    participant DB

    User->>Wizard: Inputs Concept ("Summer Gala")
    Wizard->>Gemini: Prompt: "Structure this event"
    Gemini->>Maps: Search Venues (Grounding)
    Maps-->>Gemini: Real Venues
    Gemini-->>Wizard: JSON Draft (Venue, Schedule, Budget)
    Wizard->>User: Review & Confirm
    User->>Wizard: Selects Services (Photo, Video)
    Wizard->>DB: Create Event Record
```

## Diagram 3 — Multi-Service Production Pipeline

```mermaid
flowchart LR
    Brief[1. Creative Brief] --> Concept[2. Concept & AI Moodboard]
    Concept --> Production[3. Production]
    
    subgraph Production
        Photo[Photo Shoot]
        Video[Video Shoot]
    end
    
    Production --> Post[4. Post-Production]
    Post --> Digital[5. Digital Deployment]
    
    subgraph Digital
        Web[Web Design]
        Ecom[eCommerce Upload]
        Social[Social Content]
    end
    
    Digital --> Launch[6. Launch & Event]
```

## Diagram 4 — AI Integrations (Gemini 3 Pro)

```mermaid
graph TD
    Gemini[Gemini 3 Pro]
    
    Gemini --> Search[Search Grounding]
    Search --> Trends[Trend Research]
    Search --> Competitors[Competitor Analysis]
    
    Gemini --> Maps[Maps Grounding]
    Maps --> Venues[Venue Scouting]
    Maps --> Logistics[Logistics/Travel]
    
    Gemini --> Vision[Multimodal Vision]
    Vision --> Moodboards[Moodboard Gen]
    Vision --> AssetTag[Asset Tagging]
    
    Gemini --> Func[Function Calling]
    Func --> Booking[Book Resource]
    Func --> Schedule[Update Calendar]
    
    Gemini --> RAG[File Search / RAG]
    RAG --> Contracts[Contract Review]
    RAG --> BrandDNA[Brand Guidelines]
```
