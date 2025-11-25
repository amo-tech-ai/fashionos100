
import { Event } from '../../../data/mockEvents';

export enum Step {
  INTRO = 0,
  BASICS = 1,
  VENUE = 2,
  TICKETS = 3,
  REVIEW = 4
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
  location: string;
  startDate: Date | null;
  endDate: Date | null;
  tickets: TicketTier[];
  schedule: ScheduleItem[];
  image: string;
}

export const CATEGORIES = ["Runway", "Party", "Workshop", "Exhibition", "Pop-up", "Conference"];
export const MOCK_PREVIEW_IMAGE = "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000";

export const transformToEventCard = (state: WizardState): Event => {
  const priceString = state.tickets.length > 0 
    ? (Math.min(...state.tickets.map(t => t.price)) === 0 ? 'Free' : `From $${Math.min(...state.tickets.map(t => t.price))}`)
    : 'TBD';

  const capacity = state.tickets.reduce((acc, curr) => acc + curr.quantity, 0);

  return {
    id: 999, // Temp ID
    title: state.title || "Untitled Event",
    category: state.category || "Event",
    timing: "Upcoming",
    date: state.startDate ? state.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Date TBD",
    time: state.startDate ? state.startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "Time TBD",
    location: state.location || "Location TBD",
    image: state.image,
    tags: ["New"],
    price: priceString,
    capacity: `${capacity} Seats`
  };
};
