import { useState, useEffect, useCallback } from 'react';
import { sponsorService } from '../lib/sponsor-service';
import { SponsorProfile, EventSponsor } from '../types/sponsorship';
import { useToast } from '../components/Toast';
import { useRealtime } from './useRealtime';

export const useSponsors = () => {
  const [sponsors, setSponsors] = useState<SponsorProfile[]>([]);
  const [deals, setDeals] = useState<EventSponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const { error: toastError, success: toastSuccess } = useToast();

  const fetchAll = useCallback(async () => {
    // Don't set loading to true here to avoid flickering on real-time updates
    try {
      const [sData, dData] = await Promise.all([
        sponsorService.getSponsors(),
        sponsorService.getDeals()
      ]);
      setSponsors(sData || []);
      setDeals(dData || []);
    } catch (e: any) {
      console.error(e);
      toastError('Failed to load sponsor data');
    } finally {
      setLoading(false);
    }
  }, [toastError]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Real-time subscriptions
  useRealtime('event_sponsors', () => {
    fetchAll();
  });

  useRealtime('sponsor_profiles', () => {
    fetchAll();
  });

  // Optimistic Update for Kanban Drag & Drop
  const updateSponsorStatus = async (dealId: string, newStatus: string) => {
    // 1. Snapshot previous state
    const previousDeals = [...deals];
    
    // 2. Optimistic Update
    setDeals(curr => curr.map(d => d.id === dealId ? { ...d, status: newStatus as any } : d));

    try {
      // 3. API Call
      await sponsorService.updateDealStatus(dealId, newStatus);
      toastSuccess('Deal updated');
    } catch (e) {
      // 4. Rollback on error
      console.error(e);
      setDeals(previousDeals);
      toastError('Failed to update status');
    }
  };

  return {
    sponsors,
    deals,
    loading,
    updateSponsorStatus,
    refetch: fetchAll
  };
};