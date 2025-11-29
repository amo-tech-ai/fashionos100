
import { FullBrandProfile } from '../types/brand';

export type ServiceType = 'photography' | 'video' | 'hybrid';
export type RetouchingType = 'basic' | 'high-end';

export interface ShotListItem {
  id: string;
  name: string;
  instructions: string;
  referenceImage?: string;
}

export interface BookingState {
  // Core
  service: ServiceType;
  
  // AI Context
  brandProfile?: FullBrandProfile;

  // Step 1-6
  category: string;
  style: string;
  productSize: string;
  scenes: string[];
  shotType: string;
  subCategory: string;

  // Step 7-9
  shotCount: number;
  references: string[];
  
  // New Step: Brief
  brief: string;

  shotList: ShotListItem[];

  // Step 10
  retouching: RetouchingType;
  
  // Step 11 (Scheduling)
  fulfillmentType: 'virtual' | 'location';
  date: Date | null;
  time: string;
  
  // Legacy/Compat
  models: { type: string; count: number }[];
}

// Pricing Constants
export const BASE_FEES: Record<string, number> = {
  fashion: 0,
  beauty: 200,
  jewelry: 300,
  food: 500,
  default: 0
};

export const STYLE_PRICES: Record<string, number> = {
  editorial: 85,
  'high-fashion': 120,
  street: 65,
  catalog: 45,
  runway: 95,
  ghost: 45, // legacy mapping
  flatlay: 35, // legacy mapping
  'on-model': 65, // legacy mapping
  lifestyle: 85 // legacy mapping
};

export const SIZE_FEES: Record<string, number> = {
  small: 0,
  standard: 0,
  large: 25,
  oversized: 100
};

export const RETOUCHING_MULTIPLIER = {
  basic: 1,
  'high-end': 1.5
};

export function calculateTotal(state: BookingState) {
  // 1. Base Fee (Production setup based on category)
  const baseFee = BASE_FEES[state.category] || BASE_FEES.default;

  // 2. Shot Fee (Style Price * Count)
  const stylePrice = STYLE_PRICES[state.style] || 45;
  const shotFee = state.shotCount * stylePrice;

  // 3. Size Fee (Handling)
  const sizeFee = (SIZE_FEES[state.productSize] || 0) * state.shotCount;

  // 4. Retouching Markup
  const retouchingMultiplier = RETOUCHING_MULTIPLIER[state.retouching] || 1;
  const productionSubtotal = (baseFee + shotFee + sizeFee);
  const totalWithRetouching = productionSubtotal * retouchingMultiplier;
  
  const retouchingFee = totalWithRetouching - productionSubtotal;

  // 5. Tax
  const tax = totalWithRetouching * 0.08875; // NY Tax approx
  const total = totalWithRetouching + tax;

  return {
    baseFee,
    shotFee,
    sizeFee,
    retouchingFee,
    subtotal: totalWithRetouching,
    tax,
    total
  };
}
