
import { supabase } from './supabase';
import { Database } from '../types/database';

export type Event = Database['public']['Tables']['events']['Row'] & {
  venue?: { name: string; city: string } | null;
  registrations?: any[];
};

export const eventService = {
  /**
   * Fetch events with optional filtering
   */
  async getEvents(filters?: { organizerId?: string; status?: string; limit?: number }) {
    let query = supabase
      .from('events')
      .select(`
        *,
        venue:venues(name, city)
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
        venue:venues(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create a new event
   */
  async createEvent(eventData: Database['public']['Tables']['events']['Insert']) {
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
  async updateEvent(id: string, updates: Database['public']['Tables']['events']['Update']) {
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
