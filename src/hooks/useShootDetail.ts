
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Shoot } from '../lib/shoot-service';
import { useToast } from '../components/Toast';

export const useShootDetail = (id: string) => {
  const [shoot, setShoot] = useState<Shoot | null>(null);
  const [loading, setLoading] = useState(true);
  const { error: toastError } = useToast();

  const fetchShoot = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('shoots')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setShoot(data);
    } catch (err: any) {
      console.error('Error fetching shoot details:', err);
      toastError('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchShoot();
  }, [id]);

  const updateBrief = async (briefData: any) => {
    if (!shoot) return;
    // Optimistic update
    const updatedShoot = { ...shoot, brief_data: briefData };
    setShoot(updatedShoot);

    const { error } = await supabase
        .from('shoots')
        .update({ brief_data: briefData })
        .eq('id', shoot.id);
        
    if (error) {
        toastError("Failed to save changes");
        fetchShoot(); // Revert
    }
  };

  const updateLogistics = async (updates: Partial<Shoot>) => {
      if (!shoot) return;
      const updatedShoot = { ...shoot, ...updates };
      setShoot(updatedShoot);
      
      const { error } = await supabase
        .from('shoots')
        .update(updates)
        .eq('id', shoot.id);

      if (error) {
          toastError("Failed to save changes");
          fetchShoot();
      }
  };

  return { shoot, loading, updateBrief, updateLogistics, refetch: fetchShoot };
};
