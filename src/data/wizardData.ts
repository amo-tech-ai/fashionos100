
import { ShoppingBag, Camera, Watch, Footprints, Glasses, Utensils, Zap, User, Box, Layers, Scan, Sparkles, Home, Scissors, Users } from 'lucide-react';

export const WIZARD_DATA = {
  categories: [
    { 
      id: 'fashion', 
      label: 'Fashion Apparel', 
      icon: ShoppingBag, 
      image: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1764398514/5-fashionos_wc2p1c.jpg', 
      desc: 'Runway, Ghost Mannequin, Model' 
    },
    { 
      id: 'beauty', 
      label: 'Beauty & Cosmetics', 
      icon: Sparkles, 
      image: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1764398689/95-fashionos_fcp8nf.jpg', 
      desc: 'Skincare, Makeup, Texture' 
    },
    { 
      id: 'jewelry', 
      label: 'Jewelry', 
      icon: Watch, 
      image: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1764398625/104-fashionos_jwzopk.jpg', 
      desc: 'Rings, Necklaces, Macro' 
    },
    { 
      id: 'footwear', 
      label: 'Footwear', 
      icon: Footprints, 
      image: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1764398827/48-fashionos_qj0z9e.jpg', 
      desc: 'Sneakers, Heels, Boots' 
    },
    { 
      id: 'eyewear', 
      label: 'Eyewear', 
      icon: Glasses, 
      image: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1764398887/110-fashionos_k98ocv.jpg', 
      desc: 'Sunglasses, Optical, Detail' 
    },
    { 
      id: 'food', 
      label: 'Food & Beverage', 
      icon: Utensils, 
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=600&auto=format&fit=crop', 
      desc: 'Cocktails, Bottles, Plated' 
    },
  ],
  styles: [
    { 
      id: 'editorial', 
      label: 'Editorial', 
      desc: 'Magazine-quality storytelling with dramatic lighting.', 
      price: 85,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600' 
    },
    { 
      id: 'high-fashion', 
      label: 'High Fashion', 
      desc: 'Avant-garde and artistic composition.', 
      price: 120, 
      image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&q=80&w=600'
    },
    { 
      id: 'street', 
      label: 'Street', 
      desc: 'Urban, candid, and raw aesthetic.', 
      price: 65,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600'
    },
    { 
      id: 'catalog', 
      label: 'Catalog / E-com', 
      desc: 'Clean, crisp, sales-focused.', 
      price: 45,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600'
    },
    { 
      id: 'runway', 
      label: 'Runway', 
      desc: 'Motion and movement focused.', 
      price: 95,
      image: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&q=80&w=600'
    },
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
    { 
      id: 'packshot', 
      label: 'Packshot', 
      desc: 'Pure white background.', 
      icon: Box,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800'
    },
    { 
      id: 'on-model', 
      label: 'On Model', 
      desc: 'Worn by professional talent.', 
      icon: User,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800'
    },
    { 
      id: 'flatlay', 
      label: 'Flat Lay', 
      desc: 'Styled overhead arrangement.', 
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=800'
    },
    { 
      id: 'detail', 
      label: 'Detail / Macro', 
      desc: 'Texture and material close-ups.', 
      icon: Scan,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800'
    },
    { 
      id: 'creative', 
      label: 'Creative Splash', 
      desc: 'Dynamic motion and props.', 
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800'
    },
    { 
      id: 'scale', 
      label: 'Scale Shot', 
      desc: 'Context and sizing reference.', 
      icon: Box,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800'
    },
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
