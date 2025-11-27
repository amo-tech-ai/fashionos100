
# 📐 FashionOS Booking Wizard - UX Architecture

**Version:** 1.0
**Updated:** 2025-03-03

This document outlines the User Experience flows, System Architecture, and Logic Gates for the 7-step Booking Wizard.

---

## 1. 🗺️ Master Booking Flow

The booking wizard is a linear process with state persistence handled by `BookingContext`. Users can navigate backward to edit, but forward navigation is gated by validation.

```mermaid
flowchart TD
    %% Nodes
    Start((Start))
    Step1[1. Category]
    Step2[2. Style]
    Step3[3. Shot List]
    Step4[4. References]
    Step5[5. Retouching]
    Step6[6. Review]
    Step7[7. Checkout]
    Success((Success))
    
    %% Flow
    Start --> Step1
    
    Step1 -->|Select Category| Gate1{Valid?}
    Gate1 -- Yes --> Step2
    Gate1 -- No --> Step1
    
    Step2 -->|Select Style| Gate2{Valid?}
    Gate2 -- Yes --> Step3
    
    Step3 -->|Set Quantity| Step4
    
    Step4 -->|Input Links| Step5
    
    Step5 -->|Select Level| Step6
    
    Step6 -->|Confirm| Step7
    
    Step7 -->|Submit Payment| API{API Call}
    
    API -- Success --> Success
    API -- Fail --> Step7
    
    %% Sidebars
    subgraph Sidebar [Sticky Summary]
        Calc[Price Calculator]
    end
    
    Step1 -.-> Calc
    Step2 -.-> Calc
    Step3 -.-> Calc
    Step5 -.-> Calc
```

---

## 2. 🚦 Step Checkpoints & Validation

| Step | Component | Required Data | Validation Rule | Action on Fail |
| :--- | :--- | :--- | :--- | :--- |
| **1. Category** | `StepCategory` | `state.category` | Must be non-null string | "Next" button disabled |
| **2. Style** | `StepStyle` | `state.style` | Must be non-null string | "Next" button disabled |
| **3. Quantity** | `StepShotList` | `state.shotCount` | Integer > 0 | Slider min is 1 (Always valid) |
| **4. References** | `StepReferences` | `state.references` | Array (Optional) | None (Optional step) |
| **5. Retouching** | `StepRetouching` | `state.retouching` | 'basic' OR 'high-end' | Default is 'basic' |
| **6. Review** | `StepReview` | Full State | All previous valid | Redirect to error step if data missing |
| **7. Checkout** | `StepCheckout` | Contact Form | Email regex, Name > 2 chars | Shake animation + Red border |

---

## 3. 🛤️ User Journey & Emotion Map

```mermaid
journey
    title Fashion Brand Owner Booking Journey
    section Discovery
      Lands on "Start Project": 5: User
      Explores Categories: 4: User
    section Definition
      Chooses "E-commerce": 5: User
      Selects "Ghost Mannequin": 5: User
      Adjusts Quantity Slider: 4: User
    section Friction & Resolution
      Asked for Moodboard: 3: User
      Pastes Instagram Link: 4: User
      Asked for Brief: 2: User
      Uses "AI Polish": 5: User
    section Transaction
      Sees Final Price: 3: User
      Enters Card Details: 2: User
      Booking Confirmed: 5: User
```

---

## 4. ⚙️ System Sequence Diagram

This details the data exchange between the Client, Logic Layer, and Database.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant FE as Frontend (React)
    participant BC as BookingContext
    participant EF as Edge Function
    participant DB as Supabase
    participant PAY as Stripe

    User->>FE: Enters Wizard
    FE->>BC: Initialize Default State
    
    loop Configuration
        User->>FE: Updates Step (e.g. Style)
        FE->>BC: updateState({ style: 'ghost' })
        BC->>FE: Return new totals (base + shots)
    end

    opt AI Assistance
        User->>FE: Clicks "Polish Brief"
        FE->>EF: POST /booking-ai
        EF->>FE: Returns Polished JSON
        FE->>BC: updateState({ brief: ... })
    end

    User->>FE: Clicks "Pay & Book"
    FE->>PAY: Create Payment Intent
    PAY-->>FE: Success Token
    
    FE->>DB: INSERT into 'shoots'
    DB-->>FE: 201 Created (Shoot ID)
    
    FE->>User: Redirect to Dashboard
```

---

## 5. 📝 Analysis: Pain Points & Opportunities

### Current Pain Points
1.  **Visual Context:** Users might not know the difference between "Ghost Mannequin" and "Flat Lay" without seeing examples of *their specific product type*.
2.  **Price Shock:** Users might be surprised by the total at the end if they don't watch the sidebar closely.
3.  **Scheduling:** The current flow assumes open availability. A user might book a date that is actually full.

### Opportunities for V2
1.  **Visualizer:** When selecting "Ghost Mannequin", update the preview image to match the user's category (e.g., show a ghost mannequin *dress* if they selected Dresses).
2.  **Dynamic Bundles:** If user selects > 50 shots, offer a "Full Day Rate" discount popup automatically.
3.  **Real-time Calendar:** Integrate the `StepCheckout` with a real-time calendar check against the Studio's Google Calendar to prevent double-booking.

