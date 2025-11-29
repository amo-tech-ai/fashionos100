# 📊 FashionOS Mermaid Diagrams & AI Development Guide

**Purpose:** Visual documentation to assist AI models in understanding system architecture, data flow, and user journeys  
**Reference:** [Cursor Mermaid Diagrams Cookbook](https://cursor.com/docs/cookbook/mermaid-diagrams)  
**Mermaid Docs:** [Official Mermaid Documentation](https://mermaid.js.org/)

---

## 🎯 How Mermaid Diagrams Assist AI Development

### Why Diagrams Matter for AI

Diagrams help AI models:
- **Understand System Architecture:** See how components connect and interact
- **Trace Data Flow:** Follow data from input to output across systems
- **Map User Journeys:** Understand complete user workflows
- **Identify Dependencies:** See relationships between components
- **Debug Issues:** Visualize where problems might occur
- **Generate Code:** Create implementations that match the intended architecture

### Best Practices for AI-Assisted Development

1. **Start Small:** Begin with low-level component diagrams, then abstract upward
2. **Be Specific:** Include actual table names, function names, and data structures
3. **Show Relationships:** Connect components with clear labels
4. **Document States:** Show state transitions and lifecycle flows
5. **Include Context:** Add notes about business logic and constraints

---

## 1. 📈 Flowchart Diagrams

### 1.0 Ecommerce Photography Booking Flow (7 Steps)

```mermaid
flowchart TD
    Start([User Clicks Start Project]) --> Landing[Landing: Service Selection]
    Landing --> Quantity[Step 1: Quantity Selection]
    Quantity --> Scenes[Step 2: Scene Selection]
    Scenes --> Models[Step 3: Model Selection]
    Models --> Upgrades[Step 4: Upgrades]
    Upgrades --> Checkout[Step 5: Checkout & Payment]
    Checkout --> Success[Step 6: Success & Confirmation]
    Success --> End([Booking Complete])
    
    Checkout --> Stripe[Stripe Payment]
    Stripe -->|Success| Success
    Stripe -->|Cancel| Checkout
    
    style Landing fill:#F3E8FF
    style Checkout fill:#C084FC,stroke:#9333EA,stroke-width:2px
    style Stripe fill:#10B981,stroke:#059669,stroke-width:2px
```

**Note:** This is the simplified 7-step ecommerce booking flow. For the full 13-phase wizard, see diagram 1.1 below.

### 1.1 Shoot Booking Flow (High-Level Process - 13 Phases)

```mermaid
flowchart TD
    Start([User Clicks Book a Shoot]) --> Auth{Authenticated?}
    Auth -->|No| Login[Login/Sign Up]
    Auth -->|Yes| Phase0[Phase 0: Company Profile]
    
    Login --> Phase0
    Phase0 --> Phase1[Phase 1: Service Type]
    Phase1 --> Phase2[Phase 2: Distribution Channels]
    Phase2 --> Phase3[Phase 3: Quantity & Pricing]
    Phase3 --> Phase4[Phase 4: Shot Styles]
    Phase4 --> Phase5[Phase 5: References]
    Phase5 --> Phase6[Phase 6: Talent]
    Phase6 --> Phase7[Phase 7: Add-ons]
    Phase7 --> Phase8[Phase 8: Location & Time]
    Phase8 --> Phase9[Phase 9: Brief Polish AI]
    Phase9 --> Phase10[Phase 10: Review & Confirm]
    Phase10 --> Payment{Payment Required?}
    Payment -->|Yes| Stripe[Stripe Checkout]
    Payment -->|No| Confirm[Booking Confirmed]
    Stripe --> Confirm
    Confirm --> Notify[Notify Studio]
    Notify --> End([Shoot Scheduled])
    
    style Phase9 fill:#C084FC,stroke:#9333EA,stroke-width:2px
    style Stripe fill:#10B981,stroke:#059669,stroke-width:2px
```

### 1.2 Pricing Calculation Flow

```mermaid
flowchart LR
    Start([User Selects Options]) --> Base[Calculate Base Price]
    Base --> Looks[Apply Looks Multiplier]
    Looks --> Location[Apply Location Multiplier]
    Location --> Channels[Apply Channel Multiplier]
    Channels --> Addons[Add Add-on Costs]
    Addons --> Discount{Discounts?}
    Discount -->|Yes| Apply[Apply Discounts]
    Discount -->|No| Final[Final Price]
    Apply --> Final
    Final --> Display[Display to User]
    Display --> Update[Update in Real-Time]
    
    style Base fill:#F3E8FF
    style Final fill:#C084FC,stroke:#9333EA,stroke-width:2px
```

### 1.3 AI Brief Polishing Flow

```mermaid
flowchart TD
    UserInput[User Types Brief] --> Validate{Valid Input?}
    Validate -->|No| Error[Show Error]
    Validate -->|Yes| Send[Send to polish-brief Edge Function]
    Send --> Gemini[Gemini 2.5 Flash API]
    Gemini --> Process[Process & Structure]
    Process --> Return[Return Polished Brief]
    Return --> Display[Display to User]
    Display --> Accept{User Accepts?}
    Accept -->|Yes| Save[Save to Database]
    Accept -->|No| Edit[Allow Manual Edit]
    Edit --> Save
    Save --> Next[Continue to Next Phase]
    
    style Gemini fill:#C084FC,stroke:#9333EA,stroke-width:2px
    style Process fill:#F3E8FF
```

### 1.4 Payment Processing Flow

```mermaid
flowchart TD
    Review[User Reviews Booking] --> Confirm[Click Confirm & Pay]
    Confirm --> CreatePayment[Create Payment Intent]
    CreatePayment --> StripeAPI[Stripe API]
    StripeAPI --> Checkout[Redirect to Stripe Checkout]
    Checkout --> UserPay{User Pays?}
    UserPay -->|Success| Webhook[Stripe Webhook]
    UserPay -->|Cancel| Cancel[Return to Review]
    Webhook --> Verify[Verify Payment]
    Verify --> UpdateDB[Update Payment Status]
    UpdateDB --> UpdateShoot[Update Shoot Status]
    UpdateShoot --> Notify[Send Confirmation Email]
    Notify --> Complete([Payment Complete])
    
    style StripeAPI fill:#10B981,stroke:#059669,stroke-width:2px
    style Webhook fill:#F3E8FF
```

---

## 2. 🔄 Sequence Diagrams

### 2.1 Complete Shoot Booking Sequence (13-Phase Wizard)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API as Edge Functions
    participant DB as Supabase DB
    participant AI as Gemini AI
    participant Stripe

    User->>Frontend: Start Booking Wizard
    Frontend->>DB: Check Authentication
    DB-->>Frontend: User Profile
    
    loop 13 Phases
        User->>Frontend: Fill Phase Data
        Frontend->>Frontend: Validate Input
        Frontend->>DB: Save Draft (shoots table)
        DB-->>Frontend: Updated Shoot
    end
    
    User->>Frontend: Request Brief Polish
    Frontend->>API: POST /polish-brief
    API->>AI: Generate Polished Brief
    AI-->>API: Structured Brief
    API->>DB: Update shoots.polished_brief_text
    API-->>Frontend: Polished Brief
    Frontend-->>User: Display Polished Brief
    
    User->>Frontend: Confirm & Pay
    Frontend->>API: POST /create-checkout
    API->>Stripe: Create Payment Intent
    Stripe-->>API: Checkout URL
    API-->>Frontend: Redirect URL
    Frontend-->>User: Redirect to Stripe
    
    User->>Stripe: Complete Payment
    Stripe->>API: Webhook: payment.succeeded
    API->>DB: Update payments.status
    API->>DB: Update shoots.status
    API->>Frontend: Send Confirmation
    Frontend-->>User: Booking Confirmed
```

### 2.1b Ecommerce Booking Sequence (7 Steps)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Pricing as Pricing Engine
    participant DB as Supabase DB
    participant Stripe

    User->>Frontend: Start Ecommerce Booking
    Frontend->>Frontend: Initialize Booking State
    
    User->>Frontend: Select Quantity
    Frontend->>Pricing: Calculate Price
    Pricing->>DB: Query pricing rules
    DB-->>Pricing: Base prices
    Pricing-->>Frontend: Updated Price
    
    User->>Frontend: Select Scenes
    User->>Frontend: Select Models
    User->>Frontend: Select Upgrades
    Frontend->>Pricing: Recalculate Total
    Pricing-->>Frontend: Final Price
    
    User->>Frontend: Enter Contact Info
    User->>Frontend: Review & Checkout
    Frontend->>Stripe: Create Payment Intent
    Stripe-->>Frontend: Checkout Session
    Frontend-->>User: Redirect to Stripe
    
    User->>Stripe: Complete Payment
    Stripe->>DB: Webhook: payment.succeeded
    DB->>DB: Create booking record
    DB->>Frontend: Confirmation
    Frontend-->>User: Success Page
```

### 2.2 Real-Time Pricing Update Sequence

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API as calculate-shoot-price
    participant DB as Supabase DB
    participant Function as calculate_shoot_price()

    User->>Frontend: Select Options (Service, Looks, etc.)
    Frontend->>Frontend: Debounce Input (300ms)
    Frontend->>API: POST /calculate-shoot-price
    Note over API: { shoot_type, looks_count,<br/>location_mode, channels }
    API->>DB: Call calculate_shoot_price() function
    DB->>Function: Execute Function
    Function-->>DB: Calculated Price (integer)
    DB-->>API: Price Result
    API->>DB: Update shoots.estimated_price
    API-->>Frontend: { estimated_price, breakdown }
    Frontend->>Frontend: Update UI in Real-Time
    Frontend-->>User: Display Updated Price
```

**Note:** The `calculate_shoot_price()` database function is defined in `03-shoot-schema.md` Section VIII.

### 2.3 Brand URL Analysis Sequence

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API as analyze-brand-url
    participant AI as Gemini AI
    participant DB as Supabase DB

    User->>Frontend: Enter Brand Website URL
    Frontend->>API: POST /analyze-brand-url
    Note over API: { url: "https://brand.com" }
    API->>AI: URL Context + Structured Output
    Note over AI: Extract: colors, lighting,<br/>composition, style
    AI-->>API: Brand Style JSON
    API->>DB: Save to brand_guidelines
    API-->>Frontend: Brand Style Data
    Frontend->>Frontend: Pre-fill Form Fields
    Frontend->>Frontend: Suggest Packages
    Frontend-->>User: Personalized Experience
```

---

## 3. 🏛️ Class Diagrams

### 3.1 Database Schema Class Diagram

```mermaid
classDiagram
    class Profiles {
        +uuid id PK
        +text email
        +text full_name
        +user_role role
        +text avatar_url
        +timestamptz created_at
        +timestamptz updated_at
    }
    
    class DesignerProfiles {
        +uuid id PK
        +uuid owner_profile_id FK
        +text display_name
        +text slug
        +text bio
        +text[] aesthetic_tags
        +bool is_public
    }
    
    class Shoots {
        +uuid id PK
        +uuid designer_id FK
        +uuid studio_id FK
        +shoot_service_type shoot_type
        +shoot_status status
        +integer looks_count
        +integer estimated_price
        +integer final_price
        +timestamptz scheduled_start
        +text brief_text
        +text polished_brief_text
        +distribution_channel[] distribution_channels
        +location_mode location_mode
    }
    
    class ShootItems {
        +uuid id PK
        +uuid shoot_id FK
        +integer item_number
        +text description
        +shot_style_type[] shot_styles
    }
    
    class Payments {
        +uuid id PK
        +uuid shoot_id FK
        +uuid designer_id FK
        +integer amount
        +text currency
        +payment_status status
        +text provider
        +text provider_payment_id
        +timestamptz paid_at
    }
    
    class Assets {
        +uuid id PK
        +uuid shoot_id FK
        +text url
        +asset_type asset_type
        +text[] tags
    }
    
    class Studios {
        +uuid id PK
        +text name
        +text slug
        +text city
        +bool is_active
    }
    
    class Events {
        +uuid id PK
        +uuid organizer_id FK
        +uuid venue_id FK
        +text title
        +event_type event_type
        +event_status status
        +timestamptz start_time
    }
    
    Profiles "1" --> "*" DesignerProfiles : owns
    Profiles "1" --> "*" Shoots : books
    Shoots "1" --> "*" ShootItems : contains
    Shoots "1" --> "*" Payments : requires
    Shoots "1" --> "*" Assets : produces
    Studios "1" --> "*" Shoots : hosts
    Profiles "1" --> "*" Events : organizes
```

### 3.2 Edge Functions Class Diagram

```mermaid
classDiagram
    class EdgeFunction {
        <<interface>>
        +handleRequest(req)
        +validateInput(data)
        +handleError(error)
    }
    
    class PolishBrief {
        +apiKey: string
        +model: gemini-2.5-flash
        +polishBrief(brief, type)
        +edgeFunction: polish-brief
    }
    
    class CalculatePrice {
        +calculatePrice(params)
        +uses: calculate_shoot_price() DB function
        +edgeFunction: calculate-shoot-price (if needed)
    }
    
    class CreateCheckout {
        +stripeClient: Stripe
        +createPaymentIntent(shootId, amount)
        +handleWebhook(event)
        +edgeFunction: create-checkout
    }
    
    class GenerateImagePreview {
        +model: gemini-2.5-flash-image
        +analyzeBrandUrls(urls)
        +generateImages(prompt)
    }
    
    class ResolveVenue {
        +googleSearchTool: Tool
        +extractVenueData(url)
        +validateVenueInfo(data)
    }
    
    EdgeFunction <|.. PolishBrief
    EdgeFunction <|.. CalculatePrice
    EdgeFunction <|.. CreateCheckout
    EdgeFunction <|.. GenerateImagePreview
    EdgeFunction <|.. ResolveVenue
```

---

## 4. 🔀 State Diagrams

### 4.1 Shoot Status Lifecycle

```mermaid
stateDiagram-v2
    [*] --> draft: User Creates Booking
    draft --> ready_for_payment: User Completes Wizard
    ready_for_payment --> confirmed: Payment Successful
    ready_for_payment --> draft: Payment Failed/Cancelled
    confirmed --> shooting: Shoot Day Arrives
    shooting --> editing: Shoot Completed
    editing --> delivered: Assets Ready
    delivered --> [*]
    
    draft --> cancelled: User Cancels
    ready_for_payment --> cancelled: User Cancels
    confirmed --> cancelled: User Cancels (with refund)
    cancelled --> [*]
    
    note right of draft
        User can edit all details
        No payment required
    end note
    
    note right of ready_for_payment
        Payment intent created
        Awaiting Stripe confirmation
    end note
    
    note right of confirmed
        Payment received
        Studio notified
        Shoot scheduled
    end note
```

### 4.2 Payment Status Lifecycle

```mermaid
stateDiagram-v2
    [*] --> pending: Payment Intent Created
    pending --> paid: Stripe Webhook Success
    pending --> failed: Payment Failed
    pending --> refunded: Refund Initiated
    paid --> refunded: Refund Requested
    failed --> [*]
    refunded --> [*]
    
    note right of pending
        Awaiting user payment
        Checkout session active
    end note
    
    note right of paid
        Payment confirmed
        Shoot status updated
        Confirmation sent
    end note
```

### 4.3 Event Status Lifecycle

```mermaid
stateDiagram-v2
    [*] --> draft: Organizer Creates Event
    draft --> published: Organizer Publishes
    published --> live: Event Start Time
    live --> completed: Event End Time
    completed --> [*]
    
    draft --> cancelled: Organizer Cancels
    published --> cancelled: Organizer Cancels
    live --> cancelled: Emergency Cancellation
    cancelled --> [*]
    
    note right of published
        Visible to public
        Accepting registrations
    end note
    
    note right of live
        Event in progress
        Check-ins enabled
    end note
```

---

## 5. 🗄️ Enhanced Entity Relationship Diagram

```mermaid
erDiagram
    %% CORE IDENTITY
    auth_users ||--|| profiles : "authenticates"
    profiles ||--o{ organizations : "belongs_to"
    
    %% FASHION DIRECTORY
    profiles ||--o{ designer_profiles : "owns"
    designer_profiles ||--o{ collections : "has"
    collections ||--o{ looks : "contains"
    
    %% SHOOT BOOKING
    profiles ||--o{ shoots : "books"
    studios ||--o{ shoots : "hosts"
    shoots ||--o{ shoot_items : "contains"
    shoots ||--|{ payments : "requires"
    shoots ||--o{ assets : "produces"
    
    %% EVENT MANAGEMENT
    profiles ||--o{ events : "organizes"
    venues ||--o{ events : "hosts"
    events ||--o{ event_registrations : "has"
    profiles ||--o{ event_registrations : "attends"
    events ||--o{ event_designers : "features"
    designer_profiles ||--o{ event_designers : "showcases"
    
    %% ATTRIBUTES
    profiles {
        uuid id PK
        text email
        user_role role
        timestamptz created_at
    }
    
    shoots {
        uuid id PK
        uuid designer_id FK
        uuid studio_id FK
        shoot_service_type shoot_type
        shoot_status status
        integer looks_count
        integer estimated_price
    }
    
    events {
        uuid id PK
        uuid organizer_id FK
        uuid venue_id FK
        text title
        event_type event_type
        event_status status
    }
    
    payments {
        uuid id PK
        uuid shoot_id FK
        integer amount
        payment_status status
    }
```

---

## 6. 👤 User Journey Diagrams

### 6.1 First-Time User Booking Journey

```mermaid
journey
    title First-Time Designer Books a Shoot
    section Discovery
      Visits Website: 5: User
      Views Pricing: 4: User
      Clicks "Book a Shoot": 5: User
    section Onboarding
      Signs Up: 3: User
      Creates Profile: 3: User
      Enters Company Info: 4: User
    section Booking Wizard
      Selects Service Type: 5: User
      Chooses Distribution: 4: User
      Sets Quantity: 5: User
      Selects Shot Styles: 4: User
      Uploads References: 3: User
      Uses AI Brief Polish: 5: User, AI
      Reviews & Confirms: 4: User
    section Payment
      Enters Payment Info: 3: User
      Completes Payment: 5: User
      Receives Confirmation: 5: System
    section Post-Booking
      Waits for Shoot: 2: User
      Receives Assets: 5: User
```

### 6.2 Returning User Quick Booking

```mermaid
journey
    title Returning User Quick Booking
    section Quick Start
      Logs In: 5: User
      Clicks "New Booking": 5: User
      System Pre-fills: 5: System
    section Customization
      Adjusts Quantity: 4: User
      Updates Brief: 4: User
      AI Polishes Brief: 5: User, AI
    section Payment
      Uses Saved Payment: 5: User
      Confirms Booking: 5: User
    section Confirmation
      Receives Email: 5: System
      Views in Dashboard: 5: User
```

---

## 7. 🏗️ C4 Architecture Diagrams

### 7.1 System Context (Level 1)

```mermaid
C4Context
    title System Context - FashionOS Platform
    
    Person(designer, "Fashion Designer", "Books shoots for brand content")
    Person(studio, "Studio Admin", "Manages bookings and schedules")
    Person(organizer, "Event Organizer", "Creates and manages fashion events")
    
    System(fashionos, "FashionOS Platform", "Fashion production booking and event management platform")
    
    System_Ext(stripe, "Stripe", "Payment processing")
    System_Ext(gemini, "Google Gemini AI", "AI-powered brief polishing and content generation")
    System_Ext(supabase, "Supabase", "Database and authentication")
    
    Rel(designer, fashionos, "Books shoots, manages portfolio")
    Rel(studio, fashionos, "Views bookings, manages schedule")
    Rel(organizer, fashionos, "Creates events, manages registrations")
    
    Rel(fashionos, stripe, "Processes payments")
    Rel(fashionos, gemini, "Polishes briefs, generates content")
    Rel(fashionos, supabase, "Stores data, authenticates users")
```

### 7.2 Container Diagram (Level 2)

```mermaid
C4Container
    title Container Diagram - FashionOS
    
    Person(designer, "Fashion Designer")
    
    System_Boundary(fashionos, "FashionOS Platform") {
        Container(webapp, "React Web App", "TypeScript, Vite, Tailwind", "User interface for booking and management")
        Container(api, "Supabase Edge Functions", "Deno, TypeScript", "API endpoints for business logic")
        Container(db, "PostgreSQL Database", "Supabase", "Stores all application data")
        Container(auth, "Supabase Auth", "Supabase", "Handles user authentication")
        Container(storage, "Supabase Storage", "Supabase", "Stores images and assets")
    }
    
    System_Ext(stripe, "Stripe API", "Payment processing")
    System_Ext(gemini, "Gemini AI API", "AI services")
    
    Rel(designer, webapp, "Uses")
    Rel(webapp, api, "Makes API calls")
    Rel(webapp, auth, "Authenticates")
    Rel(api, db, "Reads from and writes to")
    Rel(api, storage, "Stores assets")
    Rel(api, stripe, "Processes payments")
    Rel(api, gemini, "AI processing")
    Rel(webapp, storage, "Uploads/downloads assets")
```

### 7.3 Component Diagram - Booking System (Level 3)

```mermaid
C4Component
    title Component Diagram - Shoot Booking System
    
    Container_Boundary(webapp, "React Web App") {
        Component(bookingwizard, "Booking Wizard", "React Component", "13-phase booking form")
        Component(pricingcalc, "Pricing Calculator", "React Hook", "Real-time price updates")
        Component(briefpolish, "Brief Polisher UI", "React Component", "AI brief enhancement")
    }
    
    Container_Boundary(api, "Edge Functions") {
        Component(polishbrief, "polish-brief", "Edge Function", "Calls Gemini AI")
        Component(calculateprice, "calculate-shoot-price", "Edge Function", "Calculates pricing")
        Component(createcheckout, "create-checkout", "Edge Function", "Stripe integration")
    }
    
    Container_Boundary(db, "Database") {
        ComponentDb(shootstable, "shoots table", "PostgreSQL", "Stores shoot bookings")
        ComponentDb(paymentstable, "payments table", "PostgreSQL", "Stores payment records")
        ComponentDb(pricefunction, "calculate_shoot_price()", "PostgreSQL Function", "Pricing logic")
    }
    
    System_Ext(gemini, "Gemini AI")
    System_Ext(stripe, "Stripe")
    
    Rel(bookingwizard, pricingcalc, "Uses")
    Rel(bookingwizard, briefpolish, "Uses")
    Rel(briefpolish, polishbrief, "Calls")
    Rel(pricingcalc, calculateprice, "Calls")
    Rel(calculateprice, pricefunction, "Executes")
    Rel(bookingwizard, createcheckout, "Calls")
    Rel(polishbrief, gemini, "API calls")
    Rel(createcheckout, stripe, "API calls")
    Rel(calculateprice, shootstable, "Reads")
    Rel(createcheckout, paymentstable, "Writes")
```

---

## 8. 🔧 How to Use These Diagrams for AI Development

### 8.1 Prompting Strategies

#### For Understanding Architecture
```
"Using the C4 container diagram, explain how data flows from the React web app 
to the database when a user creates a shoot booking."
```

#### For Implementing Features
```
"Based on the sequence diagram for shoot booking, implement the polish-brief 
edge function that calls Gemini AI and updates the database."
```

#### For Debugging
```
"Using the state diagram for shoot status, identify where a booking might get 
stuck if payment succeeds but status doesn't update to 'confirmed'."
```

#### For Code Generation
```
"Generate TypeScript types for the Shoots table based on the class diagram, 
including all relationships and enums."
```

### 8.2 Step-by-Step Development Workflow

1. **Start with Low-Level Diagrams**
   - Begin with sequence diagrams for specific features
   - Use class diagrams to understand data structures
   - Reference state diagrams for business logic

2. **Build Upward**
   - Combine multiple sequence diagrams into flowcharts
   - Use C4 diagrams to understand system boundaries
   - Reference ERD for database relationships

3. **Validate Implementation**
   - Compare generated code to sequence diagrams
   - Verify state transitions match state diagrams
   - Check data flow matches flowcharts

### 8.3 Example AI Prompts

#### Prompt 1: Implement Brief Polishing
```
"Using the AI Brief Polishing Flow diagram and the polish-brief sequence diagram, 
implement the edge function that:
1. Receives a brief text from the frontend
2. Calls Gemini 2.5 Flash API with structured output
3. Returns a polished, professional brief
4. Updates the shoots table with polished_brief_text

Follow the exact flow shown in the diagrams."
```

#### Prompt 2: Create Pricing Component
```
"Based on the Real-Time Pricing Update sequence diagram, create a React hook 
that:
1. Debounces user input (300ms)
2. Calls the calculate-shoot-price edge function
3. Updates the UI with estimated price and breakdown
4. Handles loading and error states

Use the flowchart to understand the pricing calculation logic."
```

#### Prompt 3: Implement Payment Flow
```
"Using the Payment Processing Flow diagram and sequence diagram, implement:
1. Frontend component that calls create-checkout
2. Edge function that creates Stripe payment intent
3. Webhook handler that updates payment and shoot status
4. Error handling for failed payments

Follow the exact state transitions shown in the Payment Status Lifecycle."
```

### 8.4 Diagram Maintenance

- **Update diagrams when code changes:** Keep diagrams in sync with implementation
- **Add new diagrams for new features:** Create diagrams before implementing
- **Use diagrams for code reviews:** Visualize changes before merging
- **Document edge cases:** Add notes to diagrams for special scenarios

---

## 9. 📚 Quick Reference

### Diagram Types by Use Case

| Use Case | Recommended Diagram | Example |
|----------|-------------------|---------|
| **Process Flow** | Flowchart | Booking wizard steps |
| **API Interactions** | Sequence Diagram | Payment processing |
| **Data Structure** | Class Diagram | Database schema |
| **State Management** | State Diagram | Shoot status lifecycle |
| **Database Design** | ERD | Table relationships |
| **User Experience** | User Journey | First-time booking |
| **System Architecture** | C4 Diagrams | Overall system design |
| **Component Design** | Class Diagram | Edge functions structure |

### Mermaid Syntax Quick Reference

- **Flowchart:** `flowchart TD` (top-down) or `flowchart LR` (left-right)
- **Sequence:** `sequenceDiagram` with `participant` and arrows `->>`
- **Class:** `classDiagram` with `class` and relationships
- **State:** `stateDiagram-v2` with states and transitions
- **ERD:** `erDiagram` with entities and relationships
- **Journey:** `journey` with sections and steps
- **C4:** `C4Context`, `C4Container`, `C4Component`

### Tools & Extensions

- **Cursor Extension:** [Markdown Mermaid](https://marketplace.cursorapi.com/items?itemName=bierner.markdown-mermaid)
- **Online Editor:** [Mermaid Live Editor](https://mermaid.live/)
- **Documentation:** [Mermaid.js.org](https://mermaid.js.org/)

---

## 10. 🎨 Visual Style Guide for Diagrams

### Color Coding
- **Purple (#C084FC):** AI/ML operations
- **Green (#10B981):** Success states, payments
- **Blue (#3B82F6):** Data operations, database
- **Orange (#F59E0B):** Warnings, pending states
- **Red (#EF4444):** Errors, cancelled states
- **Gray (#6B7280):** Neutral operations

### Best Practices
- Use consistent naming across all diagrams
- Include actual table/function names from codebase
- Add notes for complex business logic
- Show error paths and edge cases
- Keep diagrams focused (one diagram = one concern)

---

**Last Updated:** 2025-01-27  
**Version:** 1.1  
**Status:** Production-Ready Documentation

**Recent Updates:**
- Added ecommerce booking flow diagram (7 steps)
- Updated edge function references to match actual codebase
- Fixed table/function names to match `03-shoot-schema.md`
- Added note about two booking systems (full wizard vs ecommerce)
