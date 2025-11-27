
import { CategoryItem, StyleItem, ShotTypeItem, RetouchingItem, PricingRules, VisualReference } from '../types/booking';

// --- 1. Product Categories ---
export const MOCK_CATEGORIES: CategoryItem[] = [
  {
    id: 'ecomm',
    label: 'E-Commerce',
    description: 'Clean, white-background photography optimized for Shopify, Amazon, and marketplaces.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
    basePrice: 0,
    features: ['Pure White Background', 'Web Optimized', 'Color Corrected']
  },
  {
    id: 'lookbook',
    label: 'Lookbook',
    description: 'Editorial-style imagery shot on location or designed sets to showcase brand mood.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    basePrice: 500,
    features: ['Art Direction', 'Location/Set', 'Styling Support']
  },
  {
    id: 'social',
    label: 'Social Content',
    description: 'Vertical, high-engagement content designed specifically for Instagram and TikTok feeds.',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=600',
    basePrice: 300,
    features: ['9:16 Aspect Ratio', 'Lifestyle Vibes', 'Trend Focused']
  },
  {
    id: 'campaign',
    label: 'Campaign',
    description: 'High-concept production for seasonal launches, billboards, and hero banners.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600',
    basePrice: 1500,
    features: ['Full Production Team', 'Casting', 'High-End Retouching']
  },
  {
    id: 'accessories',
    label: 'Accessories (Macro)',
    description: 'Specialized macro photography for jewelry, watches, and small leather goods.',
    image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=600',
    basePrice: 200,
    features: ['Macro Lenses', 'Focus Stacking', 'Reflection Control']
  }
];

// --- 2. Photography Styles ---
export const MOCK_STYLES: StyleItem[] = [
  {
    id: 'ghost',
    label: 'Ghost Mannequin',
    description: 'Invisible mannequin effect giving products a 3D hollow shape. Essential for apparel fit.',
    pricePerShot: 45,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600',
    compatibleCategories: ['ecomm', 'lookbook']
  },
  {
    id: 'on-model',
    label: 'On-Model',
    description: 'Professional model wearing the garments. Provides context, fit reference, and aspiration.',
    pricePerShot: 65,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
    compatibleCategories: ['ecomm', 'lookbook', 'campaign', 'social']
  },
  {
    id: 'flatlay',
    label: 'Flat Lay',
    description: 'Items arranged on a flat surface, shot from directly above. Great for outfits and accessories.',
    pricePerShot: 35,
    image: 'https://images.unsplash.com/photo-1550614000-4b9519e02d48?w=600',
    compatibleCategories: ['ecomm', 'social']
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle / In-Situ',
    description: 'Products used in real-life environments. Less focus on product detail, more on vibe.',
    pricePerShot: 85,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
    compatibleCategories: ['social', 'lookbook', 'campaign', 'accessories']
  },
  {
    id: 'pin-up',
    label: 'Pin-Up / Hanger',
    description: 'Simple hanging shot. Casual, budget-friendly, often used for vintage or streetwear.',
    pricePerShot: 25,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    compatibleCategories: ['ecomm', 'social']
  }
];

// --- 3. Shot Types (Metadata) ---
export const MOCK_SHOT_TYPES: ShotTypeItem[] = [
  { id: 'front', label: 'Front View', description: 'Standard full frontal shot.', isStandard: true },
  { id: 'back', label: 'Back View', description: 'Rear view of the garment.', isStandard: true },
  { id: 'side', label: 'Side Profile', description: 'Profile view to show silhouette.', isStandard: true },
  { id: 'detail', label: 'Fabric/Trim Detail', description: 'Close-up of texture or buttons.', isStandard: true },
  { id: 'styling', label: 'Styling Detail', description: 'Focus on how the item is worn.', isStandard: false },
  { id: 'label', label: 'Tag/Label', description: 'Close up of the brand tag.', isStandard: false },
  { id: 'movement', label: 'Movement Shot', description: 'Fabric in motion (blur or freeze).', isStandard: false }
];

// --- 4. Retouching Levels ---
export const MOCK_RETOUCHING: RetouchingItem[] = [
  {
    id: 'basic',
    label: 'Standard (E-Comm)',
    description: 'Color correction, exposure balancing, background removal (pure white), and basic dust cleanup.',
    multiplier: 1.0,
    features: ['Color Match', 'White BG', 'Basic Clean']
  },
  {
    id: 'high-end',
    label: 'High-End (Editorial)',
    description: 'Includes skin retouching, garment reshaping (liquify), advanced color grading, and texture enhancement.',
    multiplier: 1.5,
    features: ['Skin Retouch', 'Garment Reshape', 'Color Grading', 'Compositing']
  }
];

// --- 5. Pricing Rules ---
export const PRICING_RULES: PricingRules = {
  taxRate: 0.08875, // NYC Sales Tax
  currency: 'USD',
  rushFeePercentage: 0.25, // +25% for <48h turnaround
  volumeDiscounts: [
    { threshold: 20, discountPercentage: 0.05 }, // 5% off 20+ shots
    { threshold: 50, discountPercentage: 0.10 }, // 10% off 50+ shots
    { threshold: 100, discountPercentage: 0.15 } // 15% off 100+ shots
  ]
};

// --- 6. Sample Visual References ---
export const MOCK_REFERENCES: VisualReference[] = [
  {
    id: 'ref-1',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    type: 'image',
    source: 'upload',
    tags: ['lighting:soft', 'angle:front', 'mood:minimal']
  },
  {
    id: 'ref-2',
    url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    type: 'image',
    source: 'upload',
    tags: ['lighting:natural', 'location:urban']
  },
  {
    id: 'ref-3',
    url: 'https://pinterest.com/pin/123456789',
    type: 'board',
    source: 'pinterest',
    tags: ['moodboard', 'styling']
  }
];
