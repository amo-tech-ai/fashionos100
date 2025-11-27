
import { Event } from '../../../data/mockEvents';

export enum Step {
  INTRO = 0,          // Screen 1-3 (Inputs)
  DRAFT_PREVIEW = 1,  // Screen 4 (AI Output)
  BASICS = 2,         // Manual Editing starts here
  VISUALS = 3,
  VENUE = 4,
  TICKETS = 5,
  SCHEDULE = 6,
  REVIEW = 7,
  SUCCESS = 8
}

export interface TicketTier {
  name: string;
  price: number;
  quantity: number;
}

export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface GeneratedImage {
  id: string;
  base64: string;
  prompt?: string;
  model: 'nano' | 'pro';
  selected?: boolean;
}

export interface WizardState {
  title: string;
  titleSuggestions?: string[];
  description: string;
  category: string;
  targetAudience: string;
  location: string;
  
  // Extended Venue Details
  venueAddress?: string;
  venueCapacity?: string;
  venueContactName?: string;
  venueContactEmail?: string;
  venueContactPhone?: string;

  // Google Maps Grounding Fields
  mapsPlaceId?: string;
  mapsUri?: string;
  mapsSources?: { title: string; uri: string }[];
  
  // Visuals & Branding
  brandUrls: string[];
  brandMoods: string[];
  visualPrompt?: string;
  extractedBrandAnalysis?: string; 
  generatedPreviews?: GeneratedImage[];
  finalImage?: GeneratedImage | null;
  
  startDate: Date | null;
  endDate: Date | null;
  tickets: TicketTier[];
  schedule: ScheduleItem[];
  image: string; // Final URL for the event card
}

export const CATEGORIES = ["Runway", "Party", "Workshop", "Exhibition", "Pop-up", "Conference"];
export const MOCK_PREVIEW_IMAGE = "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000";

export const transformToEventCard = (state: WizardState): Event => {
  // 1. Calculate Pricing Display
  let priceString = 'TBD';
  if (state.tickets.length > 0) {
    const prices = state.tickets.map(t => Number(t.price));
    const minPrice = Math.min(...prices);
    
    if (minPrice === 0) {
      priceString = prices.length > 1 ? 'Free+' : 'Free';
    } else {
      priceString = `From $${minPrice}`;
    }
  }

  // 2. Calculate Capacity
  const capacity = state.tickets.reduce((acc, curr) => acc + Number(curr.quantity), 0);

  // 3. Generate Dynamic Tags
  const audienceTags = state.targetAudience
    ? state.targetAudience.split(',').map(s => s.trim()).filter(s => s.length > 0).slice(0, 2)
    : ['New'];
  
  const tags = [state.category, ...audienceTags].slice(0, 3);

  // 4. Determine Image Source (AI or Default)
  let displayImage = MOCK_PREVIEW_IMAGE;
  
  if (state.finalImage?.base64) {
    displayImage = `data:image/png;base64,${state.finalImage.base64}`;
  } else if (state.image && state.image.startsWith('http')) {
    displayImage = state.image;
  }

  return {
    id: 999, // Temp ID for preview
    title: state.title || "Untitled Event",
    category: state.category || "Event",
    timing: "Upcoming",
    date: state.startDate ? state.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Date TBD",
    time: state.startDate ? state.startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "Time TBD",
    location: state.location || "Location TBD",
    image: displayImage,
    tags: tags,
    price: priceString,
    capacity: capacity > 0 ? `${capacity} Seats` : 'Open'
  };
};
