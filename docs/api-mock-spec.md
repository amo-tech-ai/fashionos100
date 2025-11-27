
# 🔌 FashionOS Booking Wizard - Mock API Specification

**Base URL:** `/api/v1` (Simulated via Supabase Edge Functions or Local Mock)

---

## 1. GET `/booking/options`
Retrieves all configuration data for the wizard.

**Response (200 OK):**
```json
{
  "data": {
    "categories": [
      {
        "id": "ecomm",
        "label": "E-Commerce",
        "basePrice": 0,
        "image": "https://..."
      },
      // ... more categories
    ],
    "styles": [
      {
        "id": "on-model",
        "pricePerShot": 65,
        "compatibleCategories": ["ecomm", "lookbook", "campaign"]
      },
      // ... more styles
    ],
    "retouching": [
      { "id": "basic", "multiplier": 1.0 },
      { "id": "high-end", "multiplier": 1.5 }
    ],
    "pricingRules": {
      "taxRate": 0.08875,
      "volumeDiscounts": [
        { "threshold": 20, "discountPercentage": 0.05 }
      ]
    }
  }
}
```

---

## 2. POST `/booking/calculate`
Calculates the dynamic price based on wizard state.

**Request:**
```json
{
  "category": "lookbook",
  "style": "on-model",
  "shotCount": 25,
  "retouching": "high-end",
  "rush": false
}
```

**Response (200 OK):**
```json
{
  "data": {
    "subtotal": 2937.50,
    "serviceFee": 0,
    "tax": 260.70,
    "total": 3198.20,
    "breakdown": {
      "baseRate": 500,
      "shotCount": 25,
      "shotRate": 65,
      "productionTotal": 2125, 
      "retouchingMultiplier": 1.5,
      "discountApplied": 106.25, // 5% volume discount
      "deliveryDate": "2025-10-24"
    }
  }
}
```

---

## 3. POST `/ai/polish-brief`
Uses Gemini to structure a messy user brief.

**Request:**
```json
{
  "rawText": "i want it to look dark and moody like balenciaga, maybe some neon lights, street style vibe",
  "context": { "category": "campaign" }
}
```

**Response (200 OK):**
```json
{
  "data": {
    "polishedText": "Aesthetic Direction: High-contrast Urban Noir.\n\nMood: Moody, industrial, edgy.\nLighting: Low-key with neon accents (Cyberpunk influence).\nStyling: Streetwear focus, oversized silhouettes.\nReference: Balenciaga-inspired visual language.",
    "tags": ["Urban Noir", "Neon", "Streetwear", "High Contrast"]
  }
}
```

**Error Response (500 Server Error):**
```json
{
  "error": {
    "code": "ai_service_unavailable",
    "message": "AI Polish service is currently busy. Please try again or use manual entry."
  }
}
```

---

## 4. POST `/booking/create`
Finalizes the booking.

**Request:**
```json
{
  "userId": "user_123",
  "configuration": {
    "category": "ecomm",
    "style": "ghost",
    "shotCount": 10,
    "retouching": "basic"
  },
  "brief": "...",
  "paymentMethodId": "pm_12345"
}
```

**Response (201 Created):**
```json
{
  "data": {
    "bookingId": "bk_987654321",
    "status": "confirmed",
    "receiptUrl": "https://stripe.com/receipts/...",
    "dashboardUrl": "/dashboard/bookings/bk_987654321"
  }
}
```
