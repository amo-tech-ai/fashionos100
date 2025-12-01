
import { useState, useEffect, useCallback } from 'react';
import { invoiceService, Payment } from '../lib/invoice-service';
import { useAuth } from '../context/AuthContext';
import { usePermissions } from './usePermissions';
import { useRealtime } from './useRealtime';

export const useInvoices = () => {
  const { user } = useAuth();
  const { isAdmin } = usePermissions();
  const [invoices, setInvoices] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalRevenue: 0, pendingRevenue: 0, totalTransactions: 0 });

  const fetchInvoices = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // RBAC: Admins fetch all, Users fetch own
      const targetUserId = isAdmin ? undefined : user.id;
      
      const data = await invoiceService.getInvoices(targetUserId);
      const statistics = await invoiceService.getInvoiceStats(targetUserId);
      
      setInvoices(data);
      setStats(statistics);
    } catch (error) {
      console.error('Failed to fetch invoices', error);
    } finally {
      setLoading(false);
    }
  }, [user, isAdmin]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // Realtime Subscription
  useRealtime('payments', () => {
    fetchInvoices();
  });

  return { invoices, stats, loading, refetch: fetchInvoices };
};
