
import { useState, useEffect, useCallback } from 'react';
import { shootService } from '../lib/shoot-service';
import { Shoot } from '../types/studio';
import { useAuth } from '../context/AuthContext';

export const useShoots = () => {
  const { user } = useAuth();
  const [shoots, setShoots] = useState<Shoot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShoots = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      // Pass user.id to filter by owner (RLS will also enforce this, but good for explicit filtering logic)
      const data = await shootService.getShoots(user.id);
      setShoots(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching shoots:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchShoots();
  }, [fetchShoots]);

  // KPI Calculations
  const kpis = {
    totalBookings: shoots.length,
    active: shoots.filter(s => ['confirmed', 'shooting', 'post_production'].includes(s.status)).length,
    completed: shoots.filter(s => s.status === 'completed').length,
    totalSpend: shoots.reduce((acc, curr) => acc + (curr.estimated_quote || 0), 0)
  };

  return {
    shoots,
    loading,
    error,
    refetch: fetchShoots,
    kpis
  };
};
