import { useState, useEffect, useCallback } from 'react';
import { invoiceService, Payment } from '../lib/invoice-service';
import { useAuth } from '../context/AuthContext';
import { useRealtime } from './useRealtime';

export const useInvoices = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalRevenue: 0, pendingRevenue: 0, totalTransactions: 0 });

  const fetchInvoices = useCallback(async () => {
    // For admin view we might skip user check or check role
    try {
      setLoading(true);
      const data = await invoiceService.getInvoices(); // Fetch all for demo/admin view
      const statistics = await invoiceService.getInvoiceStats();
      setInvoices(data);
      setStats(statistics);
    } catch (error) {
      console.error('Failed to fetch invoices', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // Realtime Subscription
  useRealtime('payments', () => {
    fetchInvoices();
  });

  return { invoices, stats, loading, refetch: fetchInvoices };
};
