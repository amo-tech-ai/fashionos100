
export interface DirectoryItem {
  id: number;
  name: string;
  role: string;
  loc: string;
  country: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  featured: boolean;
  tags: string[];
  bio?: string;
  hourlyRate?: string;
  experience?: string;
  skills?: string[];
  portfolio?: string[];
  verified?: boolean;
}

export const DIRECTORY_ITEMS: DirectoryItem[] = [
  { 
    id: 1,
    name: 'Elena Rodriguez', 
    role: 'Photographer', 
    loc: 'Barcelona', 
    country: 'Spain', 
    specialty: 'Editorial & Campaign', 
    rating: 4.9, 
    reviews: 124, 
    image: 'https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    tags: ['Editorial', 'Film', 'Fashion Week'],
    bio: 'Elena is a visionary fashion photographer known for her cinematic lighting and storytelling approach. With over 10 years of experience shooting for Vogue Spain, Elle, and independent labels, she brings a unique editorial eye to every campaign. She specializes in film photography but is fully equipped for digital workflows.',
    hourlyRate: '$250/hr',
    experience: '10+ Years',
    skills: ['Art Direction', 'Film Photography', 'Studio Lighting', 'Retouching', 'Capture One'],
    verified: true,
    portfolio: [
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800',
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800',
        'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=800',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800'
    ]
  },
  { 
    id: 2,
    name: 'Marcus Chen', 
    role: 'Fashion Designer', 
    loc: 'New York', 
    country: 'USA', 
    specialty: 'Avant-Garde Runway', 
    rating: 4.8, 
    reviews: 89, 
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    tags: ['Sustainable', 'Couture', 'Menswear'],
    bio: 'Marcus Chen blends traditional tailoring with futuristic silhouettes. A graduate of Parsons, his work has been featured in NYFW and Hypebeast. He focuses on sustainable materials and zero-waste pattern making.',
    hourlyRate: '$150/hr',
    experience: '6 Years',
    skills: ['Pattern Making', '3D Design (CLO3D)', 'Textile Design', 'Draping'],
    verified: true,
    portfolio: [
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800',
        'https://images.unsplash.com/photo-1529139574466-a302d2052505?q=80&w=800'
    ]
  },
  { 
    id: 3,
    name: 'Studio 54', 
    role: 'Venue', 
    loc: 'Los Angeles', 
    country: 'USA', 
    specialty: 'Industrial Loft', 
    rating: 4.6, 
    reviews: 210, 
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    tags: ['Daylight', 'Cyclorama', 'Events'],
    bio: 'A premier daylight studio in downtown LA. Featuring 5000 sq ft of shooting space, a 3-wall cyclorama, and full blackout capabilities. Perfect for e-commerce, editorials, and music videos.',
    hourlyRate: '$200/hr',
    experience: 'Established 2015',
    skills: ['Equipment Rental', 'Catering', 'Set Building', 'Valet Parking'],
    verified: true,
    portfolio: [
        'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800',
        'https://images.unsplash.com/photo-1534595032350-92298174321c?q=80&w=800',
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800'
    ]
  },
  { 
    id: 4,
    name: 'Coco & Eve', 
    role: 'Brand', 
    loc: 'Sydney', 
    country: 'Australia', 
    specialty: 'Swimwear', 
    rating: 4.8, 
    reviews: 300, 
    image: 'https://images.unsplash.com/photo-1529139574466-a302d2052505?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    tags: ['DTC', 'Luxury', 'Resort'],
    bio: 'Coco & Eve is a luxury resort wear brand born in Bondi Beach. We collaborate with photographers and influencers worldwide to capture the spirit of endless summer.',
    hourlyRate: 'N/A',
    experience: 'Founded 2018',
    skills: ['Partnerships', 'Influencer Marketing', 'Product Seeding'],
    verified: true,
    portfolio: [
        'https://images.unsplash.com/photo-1544367563-12123d896889?q=80&w=800',
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800'
    ]
  },
  { 
    id: 5,
    name: 'Sarah Jenkins', 
    role: 'Model', 
    loc: 'London', 
    country: 'UK', 
    specialty: 'High Fashion', 
    rating: 5.0, 
    reviews: 42, 
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    tags: ['Runway', 'Print', 'Commercial'],
    bio: 'Professional model represented by Elite London. Sarah has walked for LFW and appeared in campaigns for Burberry and ASOS. Versatile look suitable for both commercial and high-fashion editorial.',
    hourlyRate: '$300/hr',
    experience: '4 Years',
    skills: ['Runway Walk', 'Posing', 'Commercial Acting', 'Lookbook'],
    verified: true,
    portfolio: [
        'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=800',
        'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=800',
        'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=800'
    ]
  },
  { 
    id: 6,
    name: 'David Kim', 
    role: 'Videographer', 
    loc: 'Seoul', 
    country: 'South Korea', 
    specialty: 'Documentary', 
    rating: 4.9, 
    reviews: 15, 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    tags: ['BTS', 'Drone', 'Music Video'],
    bio: 'David is a visual storyteller specializing in behind-the-scenes content and fashion films. He uses a mix of digital and analog formats to create nostalgic yet modern visuals.',
    hourlyRate: '$180/hr',
    experience: '5 Years',
    skills: ['Video Editing', 'Color Grading', 'Drone Operation', 'Sound Design'],
    verified: true,
    portfolio: [
        'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800',
        'https://images.unsplash.com/photo-1601506521937-244b01c92805?q=80&w=800'
    ]
  },
  { 
    id: 7,
    name: 'Lila Vossen', 
    role: 'Stylist', 
    loc: 'Berlin', 
    country: 'Germany', 
    specialty: 'Commercial', 
    rating: 4.7, 
    reviews: 67, 
    image: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    tags: ['Prop', 'Wardrobe', 'Set Design'],
    bio: 'Berlin-based stylist with a knack for minimalism and prop styling. Lila works with e-commerce brands to elevate their product imagery through thoughtful composition and set design.',
    hourlyRate: '$120/hr',
    experience: '8 Years',
    skills: ['Prop Sourcing', 'Wardrobe Styling', 'Set Construction', 'Trend Forecasting'],
    verified: false,
    portfolio: [
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800',
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800'
    ]
  },
  { 
    id: 8,
    name: 'The Warehouse', 
    role: 'Venue', 
    loc: 'Brooklyn', 
    country: 'USA', 
    specialty: 'Event Space', 
    rating: 4.5, 
    reviews: 110, 
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    tags: ['Event', 'Large Capacity', 'Runway'],
    bio: 'A converted industrial warehouse in Williamsburg. 10,000 sq ft of raw space, perfect for large-scale runway shows, trade events, and after-parties.',
    hourlyRate: '$500/hr',
    experience: 'Established 2010',
    skills: ['Security', 'Bar Service', 'Lighting Grid', 'Sound System'],
    verified: true,
    portfolio: [
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800',
        'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800'
    ]
  }
];
