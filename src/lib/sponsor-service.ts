
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
   * Update a deal status (Kanban move) and trigger automation
   */
  async updateDealStatus(dealId: string, status: string) {
    // 1. Update Status
    const { data: updatedDeal, error } = await supabase
      .from('event_sponsors')
      .update({ status })
      .eq('id', dealId)
      .select('*, sponsor:sponsor_profiles(*)')
      .single();

    if (error) throw error;

    // 2. Automation: If Signed, create deliverables
    if (status === 'Signed') {
       await this.createInitialDeliverables(updatedDeal);
    }

    return updatedDeal;
  },

  /**
   * Helper: Create standard deliverables based on package level
   */
  async createInitialDeliverables(deal: EventSponsor) {
    // Fetch package template if possible, else use default
    let deliverables = [
        { title: 'High Res Logo', type: 'logo', due_offset: 7 },
        { title: 'Brand Guidelines', type: 'doc', due_offset: 7 },
        { title: 'Social Media Handles', type: 'doc', due_offset: 3 }
    ];

    if (deal.level) {
       const { data: pkg } = await supabase
          .from('sponsorship_packages')
          .select('deliverables_template')
          .ilike('name', deal.level)
          .maybeSingle();
       
       if (pkg?.deliverables_template && Array.isArray(pkg.deliverables_template)) {
           deliverables = pkg.deliverables_template.map((d: any) => ({
               title: d.title,
               type: d.type || 'generic',
               due_offset: d.due_offset_days || 14
           }));
       }
    }

    const inserts = deliverables.map(d => ({
        event_sponsor_id: deal.id,
        title: d.title,
        type: d.type,
        status: 'pending',
        due_date: new Date(Date.now() + (d.due_offset * 86400000)).toISOString()
    }));

    // Bulk insert
    await supabase.from('sponsor_deliverables').insert(inserts);
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
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data.map((i: any) => ({
      ...i,
      author_name: i.author?.full_name || 'Unknown',
      // Handle legacy 'date' column vs 'created_at'
      created_at: i.created_at || i.date
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
          date: new Date().toISOString() // For legacy support
       }])
       .select()
       .single();

     if (error) throw error;
     
     // Update last interaction on profile
     await supabase.from('sponsor_profiles')
       .update({ last_interaction_date: new Date().toISOString() })
       .eq('id', interaction.sponsor_id);

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