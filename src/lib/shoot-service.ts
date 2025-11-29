import { supabase } from './supabase';
import { Database } from '../types/database';

export type Shoot = Database['public']['Tables']['shoots']['Row'];

export interface ShootFilters {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const shootService = {
  /**
   * Fetch shoots with pagination, filtering and search
   */
  async getShoots(userId?: string, filters: ShootFilters = {}) {
    const { status, search, page = 1, limit = 10 } = filters;
    
    let query = supabase
      .from('shoots')
      .select('*', { count: 'exact' });

    // User Filter
    if (userId) {
      query = query.eq('designer_id', userId);
    }

    // Status Filter
    if (status && status !== 'All') {
      query = query.eq('status', status.toLowerCase());
    }

    // Search (Client Name or ID)
    if (search) {
      // Note: brief_data is JSONB. Searching inside it depends on structure.
      // We search ID or brief_data->contact->firstName/lastName
      // For simplicity in this MVP, we search ID or create a text search column in DB.
      // Here we search ID for strictness or use an 'or' clause if 'brief_data' casts to text.
      query = query.or(`id.ilike.%${search}%, fashion_category.ilike.%${search}%`);
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to).order('created_at', { ascending: false });

    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return {
      data: data as Shoot[],
      count: count || 0
    };
  },

  /**
   * Get single shoot details
   */
  async getShootById(id: string) {
    const { data, error } = await supabase
      .from('shoots')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Shoot;
  },

  /**
   * Create a new shoot booking
   */
  async createShoot(shootData: Database['public']['Tables']['shoots']['Insert']) {
    const { data, error } = await supabase
      .from('shoots')
      .insert([shootData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update shoot status or details
   */
  async updateShoot(id: string, updates: Database['public']['Tables']['shoots']['Update']) {
    const { data, error } = await supabase
      .from('shoots')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Shoot;
  }
};
