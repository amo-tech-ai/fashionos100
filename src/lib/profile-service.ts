
import { supabase } from './supabase';
import { Database } from '../types/database';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export const profileService = {
  /**
   * Get current user profile
   */
  async getProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    const { data: company } = await supabase
      .from('companies')
      .select('*')
      .eq('owner_id', user.id)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
       console.error('Error fetching profile:', error);
    }

    return {
      user,
      profile: profile as Profile | null,
      company: company as { name: string; website_url?: string } | null
    };
  },

  /**
   * Update user profile details
   */
  async updateProfile(updates: Database['public']['Tables']['profiles']['Update']) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update company details
   */
  async updateCompany(name: string, website?: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('companies')
      .upsert({ 
        owner_id: user.id,
        name, 
        website_url: website 
      }, { onConflict: 'owner_id' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
  
  /**
   * Upload Avatar
   */
  async uploadAvatar(file: File) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    
    // Update profile with new URL
    await this.updateProfile({ avatar_url: data.publicUrl });

    return data.publicUrl;
  }
};
