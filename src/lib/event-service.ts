
import { supabase } from './supabase';
import { Database } from '../types/supabase'; // Assuming you might generate types later, but using 'any' or explicit interfaces for now is fine if types aren't generated yet.

// Define shape based on Schema
export interface Event {
  id: string;
  title: string;
  organizer_id: string;
  venue_id?: string;
  description?: string;
  short_description?: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed' | 'live';
  is_public: boolean;
  start_time: string;
  end_time?: string;
  capacity_limit?: number;
  featured_image_url?: string;
  created_at: string;
  // Joins
  venue?: { name: string; city: string };
  ticket_tiers?: any[];
  registrations?: any[];
}

export const eventService = {
  /**
   * Fetch events with optional filtering
   */
  async getEvents(filters?: { organizerId?: string; status?: string; limit?: number }) {
    let query = supabase
      .from('events')
      .select(`
        *,
        venue:venues(name, city),
        ticket_tiers(count),
        registrations(count)
      `)
      .order('start_time', { ascending: true });

    if (filters?.organizerId) {
      query = query.eq('organizer_id', filters.organizerId);
    }
    
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Event[];
  },

  /**
   * Get a single event by ID
   */
  async getEventById(id: string) {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        venue:venues(*),
        ticket_tiers(*),
        event_schedules(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create a new event
   */
  async createEvent(eventData: Partial<Event>) {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update an existing event
   */
  async updateEvent(id: string, updates: Partial<Event>) {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete event
   */
  async deleteEvent(id: string) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
