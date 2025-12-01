
import { useState, useEffect, useCallback } from 'react';
import { shootService, Shoot, ShootFilters } from '../lib/shoot-service';
import { useAuth } from '../context/AuthContext';
import { usePermissions } from './usePermissions';
import { useToast } from '../components/Toast';

export const useShoots = () => {
  const { user } = useAuth();
  const { isAdmin } = usePermissions();
  const { toast, error: toastError } = useToast();
  
  // Data State
  const [shoots, setShoots] = useState<Shoot[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Filter State
  const [filters, setFilters] = useState<ShootFilters>({
    page: 1,
    limit: 10,
    status: 'All',
    search: ''
  });

  const fetchShoots = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      
      // RBAC Logic: Admins see all, Users see their own
      const targetUserId = isAdmin ? undefined : user.id;
      
      const { data, count } = await shootService.getShoots(targetUserId, filters);
      setShoots(data);
      setTotalCount(count);
    } catch (err: any) {
      console.error('Error fetching shoots:', err);
      toastError(err.message || 'Failed to fetch shoots');
    } finally {
      setLoading(false);
    }
  }, [user, isAdmin, filters, toastError]);

  useEffect(() => {
    fetchShoots();
  }, [fetchShoots]);

  // Optimistic Update for Status
  const updateStatus = async (id: string, newStatus: string) => {
    // 1. Snapshot previous state
    const previousShoots = [...shoots];
    
    // 2. Optimistic UI Update
    setShoots(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    toast(`Updating status to ${newStatus}...`, 'info');

    try {
      // 3. API Call
      await shootService.updateShoot(id, { status: newStatus });
      toast('Status updated successfully', 'success');
    } catch (err: any) {
      // 4. Rollback on error
      setShoots(previousShoots);
      toastError('Failed to update status');
      console.error(err);
    }
  };

  // Filter Helpers
  const setPage = (page: number) => setFilters(prev => ({ ...prev, page }));
  const setStatusFilter = (status: string) => setFilters(prev => ({ ...prev, status, page: 1 }));
  const setSearchTerm = (search: string) => setFilters(prev => ({ ...prev, search, page: 1 }));

  // KPI Calculations (Local snapshot of fetched data)
  const kpis = {
    totalBookings: totalCount,
    active: shoots.filter(s => ['confirmed', 'shooting', 'post_production'].includes(s.status)).length,
    completed: shoots.filter(s => s.status === 'completed').length,
    totalSpend: shoots.reduce((acc, curr) => acc + (curr.estimated_quote || 0), 0)
  };

  return {
    shoots,
    loading,
    totalCount,
    currentPage: filters.page || 1,
    totalPages: Math.ceil(totalCount / (filters.limit || 10)),
    filters,
    setPage,
    setStatusFilter,
    setSearchTerm,
    updateStatus,
    refetch: fetchShoots,
    kpis
  };
};
