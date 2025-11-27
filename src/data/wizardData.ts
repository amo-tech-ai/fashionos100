
import { ShoppingBag, Camera, Watch, Footprints, Glasses, Utensils, Zap, User, Box, Layers, Scan, Sparkles, Home, Scissors, Users } from 'lucide-react';

export const WIZARD_DATA = {
  categories: [
    { id: 'fashion', label: 'Fashion Apparel', icon: ShoppingBag, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500', desc: 'Clothing, Lingerie, Swimwear' },
    { id: 'beauty', label: 'Beauty & Cosmetics', icon: Sparkles, image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=500', desc: 'Skincare, Makeup, Haircare' },
    { id: 'jewelry', label: 'Jewelry', icon: Watch, image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=500', desc: 'Rings, Necklaces, Watches' },
    { id: 'footwear', label: 'Footwear', icon: Footprints, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', desc: 'Sneakers, Heels, Boots' },
    { id: 'eyewear', label: 'Eyewear', icon: Glasses, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500', desc: 'Sunglasses, Optical' },
    { id: 'food', label: 'Food & Beverage', icon: Utensils, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500', desc: 'Bottles, Packaged Goods' },
  ],
  styles: [
    { id: 'editorial', label: 'Editorial', desc: 'Magazine-quality storytelling.', price: 85 },
    { id: 'high-fashion', label: 'High Fashion', desc: 'Avant-garde and artistic.', price: 120 },
    { id: 'street', label: 'Street', desc: 'Urban, candid, raw.', price: 65 },
    { id: 'catalog', label: 'Catalog / E-com', desc: 'Clean, crisp, sales-focused.', price: 45 },
    { id: 'runway', label: 'Runway', desc: 'Motion and movement focused.', price: 95 },
  ],
  sizes: [
    { id: 'small', label: 'Small', desc: '< 6 inches (Jewelry, Cosmetics)', price: 0, icon: Sparkles },
    { id: 'standard', label: 'Standard', desc: '6 - 24 inches (Apparel, Shoes)', price: 0, icon: Box },
    { id: 'large', label: 'Large', desc: '24 - 48 inches (Luggage, Coats)', price: 25, icon: Layers },
    { id: 'oversized', label: 'Oversized', desc: '> 48 inches (Furniture, Equipment)', price: 100, icon: Home },
  ],
  scenes: [
    { id: 'white', label: 'White Backdrop', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=400' },
    { id: 'color', label: 'Color Block', image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400' },
    { id: 'texture', label: 'Textured Surface', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400' },
    { id: 'lifestyle-bath', label: 'Bathroom', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400', badge: 'Stylist Required' },
    { id: 'lifestyle-kitchen', label: 'Kitchen', image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=400', badge: 'Stylist Required' },
    { id: 'lifestyle-living', label: 'Living Room', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400' },
  ],
  shotTypes: [
    { id: 'packshot', label: 'Packshot', desc: 'Standard product on white.', icon: Box },
    { id: 'on-model', label: 'On Model', desc: 'Worn by professional talent.', icon: User },
    { id: 'flatlay', label: 'Flat Lay', desc: 'Arranged on a surface.', icon: Layers },
    { id: 'detail', label: 'Detail / Macro', desc: 'Close-up features.', icon: Scan },
    { id: 'creative', label: 'Creative Splash', desc: 'Dynamic styling and props.', icon: Zap },
    { id: 'scale', label: 'Scale Shot', desc: 'Shows size context.', icon: Box },
  ],
  subCategories: {
    fashion: ['Ready-to-wear', 'Swimwear', 'Lingerie', 'Formalwear', 'Activewear'],
    beauty: ['Skincare', 'Makeup', 'Fragrance', 'Haircare', 'Tools'],
    jewelry: ['Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Watches'],
    footwear: ['Sneakers', 'Boots', 'Sandals', 'Formal'],
    eyewear: ['Sunglasses', 'Optical', 'Goggles'],
    food: ['Beverages', 'Packaged Food', 'Ingredients', 'Plated'],
  },
  models: [
    { id: 'hand', name: 'Hand Model', price: 250, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400', icon: User },
    { id: 'full', name: 'Full Body Model', price: 450, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', icon: User },
    { id: 'pair', name: 'Couple/Pair', price: 800, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400', icon: Users },
    { id: 'hmu', name: 'Hair & Makeup', price: 299, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', icon: Scissors },
  ]
};
