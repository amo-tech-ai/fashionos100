
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { EventSponsor } from '../types/sponsorship';
import { aiService } from '../lib/ai-service';
import { useToast } from '../components/Toast';

export const useSponsors = () => {
  const [sponsors, setSponsors] = useState<EventSponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast, error: toastError } = useToast();

  // Fetch Sponsors
  const fetchSponsors = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('event_sponsors')
        .select(`
          *,
          sponsor:sponsor_profiles(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSponsors(data || []);
    } catch (err: any) {
      console.error('Error fetching sponsors:', err);
      toastError('Failed to load sponsors');
    } finally {
      setLoading(false);
    }
  }, [toastError]);

  useEffect(() => {
    fetchSponsors();
  }, [fetchSponsors]);

  // Update Sponsor Status (Kanban Drag & Drop)
  const updateSponsorStatus = async (dealId: string, newStatus: string) => {
    // Optimistic Update
    const previousSponsors = [...sponsors];
    setSponsors(prev => prev.map(s => s.id === dealId ? { ...s, status: newStatus } as any : s));

    try {
      const { error } = await supabase
        .from('event_sponsors')
        .update({ status: newStatus })
        .eq('id', dealId);

      if (error) throw error;
      toast(`Deal moved to ${newStatus}`, 'success');
    } catch (err: any) {
      setSponsors(previousSponsors); // Rollback
      toastError('Failed to update status');
    }
  };

  // AI Actions
  const generateAiInsights = async (mode: 'activation' | 'scoring', params: { sponsorName: string, industry: string, eventDetails: string }) => {
    const action = mode === 'scoring' ? 'score-lead' : 'activation-ideas';
    
    const result = await aiService.sponsorAgent(action, {
      sponsorName: params.sponsorName,
      sponsorIndustry: params.industry,
      eventDetails: params.eventDetails
    });

    if (!result.success) {
      toastError('AI Analysis failed');
      return null;
    }

    return result.data;
  };

  return {
    sponsors,
    loading,
    refetch: fetchSponsors,
    updateSponsorStatus,
    generateAiInsights
  };
};
