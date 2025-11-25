
import { Event } from '../../../data/mockEvents';

export enum Step {
  INTRO = 0,
  BASICS = 1,
  VENUE = 2,
  TICKETS = 3,
  SCHEDULE = 4,
  REVIEW = 5,
  SUCCESS = 6
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

export interface WizardState {
  title: string;
  titleSuggestions?: string[];
  description: string;
  category: string;
  targetAudience: string;
  location: string;
  // Google Maps Grounding Fields
  mapsPlaceId?: string;
  mapsUri?: string;
  mapsSources?: { title: string; uri: string }[];
  
  startDate: Date | null;
  endDate: Date | null;
  tickets: TicketTier[];
  schedule: ScheduleItem[];
  image: string;
}

export const CATEGORIES = ["Runway", "Party", "Workshop", "Exhibition", "Pop-up", "Conference"];
export const MOCK_PREVIEW_IMAGE = "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000";

export const transformToEventCard = (state: WizardState): Event => {
  // 1. Calculate Pricing Display
  let priceString = 'TBD';
  if (state.tickets.length > 0) {
    const prices = state.tickets.map(t => Number(t.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    if (minPrice === 0) {
      priceString = prices.length > 1 ? 'Free+' : 'Free';
    } else {
      priceString = `From $${minPrice}`;
    }
  }

  // 2. Calculate Capacity
  const capacity = state.tickets.reduce((acc, curr) => acc + Number(curr.quantity), 0);

  // 3. Generate Dynamic Tags
  // Combine Category + First 2 items from Target Audience
  const audienceTags = state.targetAudience
    ? state.targetAudience.split(',').map(s => s.trim()).filter(s => s.length > 0).slice(0, 2)
    : ['New'];
  
  const tags = [state.category, ...audienceTags].slice(0, 3);

  return {
    id: 999, // Temp ID for preview
    title: state.title || "Untitled Event",
    category: state.category || "Event",
    timing: "Upcoming",
    date: state.startDate ? state.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Date TBD",
    time: state.startDate ? state.startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "Time TBD",
    location: state.location || "Location TBD",
    image: state.image || MOCK_PREVIEW_IMAGE,
    tags: tags,
    price: priceString,
    capacity: capacity > 0 ? `${capacity} Seats` : 'Open'
  };
};
