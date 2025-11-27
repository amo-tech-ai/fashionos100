
// --- Core Entities ---

export type ServiceType = 'photography' | 'video' | 'hybrid';

export interface CategoryItem {
  id: string;
  label: string;
  description: string;
  image: string;
  basePrice: number; // Starting fee for this category
  features: string[];
}

export interface StyleItem {
  id: string;
  label: string;
  description: string;
  pricePerShot: number;
  image: string;
  compatibleCategories: string[]; // IDs of categories
}

export interface ShotTypeItem {
  id: string;
  label: string;
  description: string;
  isStandard: boolean; // Included in base packages usually
}

export interface RetouchingItem {
  id: string;
  label: string;
  description: string;
  multiplier: number; // e.g., 1.0, 1.5, 2.0
  features: string[];
}

export interface VisualReference {
  id: string;
  url: string;
  type: 'image' | 'video' | 'board';
  source: 'instagram' | 'pinterest' | 'upload' | 'website';
  tags: string[];
}

// --- Pricing Rules ---

export interface VolumeDiscount {
  threshold: number; // e.g., 20 shots
  discountPercentage: number; // e.g., 0.10 (10%)
}

export interface PricingRules {
  taxRate: number;
  currency: string;
  volumeDiscounts: VolumeDiscount[];
  rushFeePercentage: number;
}

// --- API Responses ---

export interface BookingSummary {
  subtotal: number;
  serviceFee: number;
  tax: number;
  total: number;
  breakdown: {
    baseRate: number;
    shotCount: number;
    shotRate: number;
    retouchingMultiplier: number;
    discounts: number;
  };
  estimatedDeliveryDate: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    timestamp: string;
    version: string;
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}
