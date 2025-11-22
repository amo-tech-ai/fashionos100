
import { Mic2, Camera, ShoppingBag, Map, Users } from 'lucide-react';

export interface Event {
  id: number;
  title: string;
  category: string;
  timing: string;
  date: string;
  time: string;
  location: string;
  image: string;
  tags: string[];
  price: string;
  capacity: string;
}

export interface FeaturedEvent {
  id: number;
  title: string;
  desc: string;
  image: string;
  date: string;
  location: string;
  tags: string[];
  price: string;
}

export const FEATURED_EVENT: FeaturedEvent = {
  id: 0,
  title: "Milan Fashion Week: Spring/Summer Finale",
  desc: "Experience the culmination of global fashion as top designers showcase their SS26 collections. Featuring exclusive runway access and backstage passes.",
  image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1000&auto=format&fit=crop",
  date: "Sept 24-28, 2025",
  location: "Milan, Italy",
  tags: ["Runway", "High Fashion", "Exclusive"],
  price: "From $450"
};

export const EVENTS_DATA: Event[] = [
  {
    id: 1,
    title: "Sustainable Fashion Week 2025",
    category: "Runway",
    timing: "Upcoming",
    date: "March 15, 2025",
    time: "19:00 PM",
    location: "Centro Cultural, Medellín",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800&auto=format&fit=crop",
    tags: ["AI", "Sustainable", "Designer"],
    price: "From $50",
    capacity: "85% Sold"
  },
  {
    id: 2,
    title: "Editorial Photography Workshop",
    category: "Workshop",
    timing: "Upcoming",
    date: "March 18, 2025",
    time: "10:00 AM",
    location: "Studio Loft, Bogotá",
    image: "https://images.unsplash.com/photo-1520986606214-8b456906c813?q=80&w=800&auto=format&fit=crop",
    tags: ["Photography", "Education"],
    price: "Free",
    capacity: "Open"
  },
  {
    id: 3,
    title: "Emerging Designers Showcase",
    category: "Exhibition",
    timing: "Live",
    date: "March 22, 2025",
    time: "14:00 PM",
    location: "Galería Arte, Cali",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
    tags: ["Emerging", "Designer"],
    price: "From $30",
    capacity: "Limited"
  },
  {
    id: 4,
    title: "Street Style Pop-Up Market",
    category: "Pop-up",
    timing: "Upcoming",
    date: "March 25, 2025",
    time: "11:00 AM",
    location: "Plaza Central, Cartagena",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    tags: ["Streetwear", "Market"],
    price: "Free Entry",
    capacity: "Open"
  },
  {
    id: 5,
    title: "Haute Couture Gala Evening",
    category: "Runway",
    timing: "Upcoming",
    date: "April 1, 2025",
    time: "20:00 PM",
    location: "Grand Hotel, Medellín",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop",
    tags: ["Couture", "VIP", "Gala"],
    price: "From $200",
    capacity: "Sold Out"
  },
  {
    id: 6,
    title: "Fashion Tech Summit",
    category: "Conference",
    timing: "Past",
    date: "Feb 10, 2025",
    time: "09:00 AM",
    location: "Innovation Hub, Bogotá",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop",
    tags: ["AI", "Technology", "Future"],
    price: "From $75",
    capacity: "Closed"
  }
];

export const CATEGORIES = [
  { icon: Mic2, label: "Runway Shows", desc: "Live collections" },
  { icon: Camera, label: "Workshops", desc: "Learn skills" },
  { icon: ShoppingBag, label: "Pop-ups", desc: "Shop local" },
  { icon: Map, label: "Exhibitions", desc: "Art & Style" },
  { icon: Users, label: "Meetups", desc: "Network" },
];
