
import { supabase } from './supabase';
import { SponsorProfile, EventSponsor, SponsorInteraction, SponsorshipPackage, SponsorContact } from '../types/sponsorship';

export const sponsorService = {
  /**
   * Get all sponsors for the current user/org
   */
  async getSponsors() {
    const { data, error } = await supabase
      .from('sponsor_profiles')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data as SponsorProfile[];
  },

  /**
   * Get all active deals/pipeline items
   */
  async getDeals() {
    const { data, error } = await supabase
      .from('event_sponsors')
      .select(`
        *,
        sponsor:sponsor_profiles(*),
        event:events(title, start_time)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as EventSponsor[];
  },

  /**
   * Update a deal status (Kanban move)
   */
  async updateDealStatus(dealId: string, status: string) {
    const { data, error } = await supabase
      .from('event_sponsors')
      .update({ status })
      .eq('id', dealId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get full details for a single sponsor
   */
  async getSponsorDetails(id: string) {
    const { data: profile, error: pErr } = await supabase
      .from('sponsor_profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (pErr) throw pErr;

    const { data: deals, error: dErr } = await supabase
      .from('event_sponsors')
      .select('*, event:events(*)')
      .eq('sponsor_id', id);

    if (dErr) throw dErr;

    return { profile, deals };
  },

  /**
   * Get interactions timeline
   */
  async getInteractions(sponsorId: string) {
    const { data, error } = await supabase
      .from('sponsor_interactions')
      .select('*, author:profiles(full_name)')
      .eq('sponsor_id', sponsorId)
      .order('date', { ascending: false });

    if (error) throw error;
    
    return data.map((i: any) => ({
      ...i,
      author_name: i.author?.full_name || 'Unknown'
    })) as SponsorInteraction[];
  },

  /**
   * Add a new interaction
   */
  async addInteraction(interaction: Partial<SponsorInteraction>) {
     const { data: { user } } = await supabase.auth.getUser();
     
     const { data, error } = await supabase
       .from('sponsor_interactions')
       .insert([{
          ...interaction,
          created_by: user?.id,
          date: new Date().toISOString()
       }])
       .select()
       .single();

     if (error) throw error;
     return data;
  },

  // --- Contacts ---
  
  async getContacts(sponsorId: string) {
      const { data, error } = await supabase
        .from('sponsor_contacts')
        .select('*')
        .eq('sponsor_id', sponsorId)
        .order('is_primary', { ascending: false });
        
      if (error) throw error;
      return data as SponsorContact[];
  },

  async saveContact(contact: Partial<SponsorContact>) {
      const { data, error } = await supabase
        .from('sponsor_contacts')
        .upsert([contact])
        .select()
        .single();
        
      if (error) throw error;
      return data;
  },

  async deleteContact(id: string) {
      const { error } = await supabase
        .from('sponsor_contacts')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
  },

  // --- Packages ---

  async getPackages() {
      const { data, error } = await supabase
        .from('sponsorship_packages')
        .select('*')
        .order('default_price', { ascending: false });
        
      if (error) throw error;
      return data as SponsorshipPackage[];
  },

  async savePackage(pkg: Partial<SponsorshipPackage>) {
      // If updating, use ID. If creating, remove ID if undefined.
      const { id, ...payload } = pkg;
      let query;
      
      if (id) {
          query = supabase.from('sponsorship_packages').update(payload).eq('id', id);
      } else {
          query = supabase.from('sponsorship_packages').insert([payload]);
      }
      
      const { data, error } = await query.select().single();
      if (error) throw error;
      return data;
  },

  async deletePackage(id: string) {
      const { error } = await supabase
        .from('sponsorship_packages')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
  }
};
