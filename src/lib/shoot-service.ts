
import { supabase } from './supabase';
import { Shoot } from '../types/studio';

export const shootService = {
  /**
   * Fetch shoots for a specific user (designer) or all if admin
   */
  async getShoots(userId?: string) {
    let query = supabase
      .from('shoots')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('designer_id', userId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Shoot[];
  },

  /**
   * Get single shoot details with assets
   */
  async getShootById(id: string) {
    const { data, error } = await supabase
      .from('shoots')
      .select(`
        *,
        shoot_assets(*),
        shoot_items(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create a new shoot booking
   */
  async createShoot(shootData: Partial<Shoot>) {
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
  async updateShoot(id: string, updates: Partial<Shoot>) {
    const { data, error } = await supabase
      .from('shoots')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
