
import { supabase } from './supabase';
import { Company } from '../types/brand';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role?: string;
  company_name?: string; // Legacy field, moving to companies table
  updated_at?: string;
}

export interface TeamMember {
  id: string;
  user_id: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'invited';
  email: string;
}

export const profileService = {
  /**
   * Get current user profile and associated company
   */
  async getProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Fetch Profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) console.error('Error fetching profile:', profileError);

    // Fetch Company (owned by user)
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('*')
      .eq('owner_id', user.id)
      .maybeSingle();

    if (companyError) console.error('Error fetching company:', companyError);

    return {
      user: user,
      profile: profile as UserProfile | null,
      company: company as Company | null
    };
  },

  /**
   * Update user profile details
   */
  async updateProfile(updates: Partial<UserProfile>) {
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
   * Update or Create company details
   */
  async updateCompany(name: string, website?: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Check if exists
    const { data: existing } = await supabase
      .from('companies')
      .select('id')
      .eq('owner_id', user.id)
      .maybeSingle();

    if (existing) {
      const { data, error } = await supabase
        .from('companies')
        .update({ name, website_url: website })
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('companies')
        .insert({ owner_id: user.id, name, website_url: website })
        .select()
        .single();
      if (error) throw error;
      return data;
    }
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
      .from('avatars') // Ensure this bucket exists in Supabase
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    
    // Update profile with new URL
    await this.updateProfile({ avatar_url: data.publicUrl });

    return data.publicUrl;
  }
};
