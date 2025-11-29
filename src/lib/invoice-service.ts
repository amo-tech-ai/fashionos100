import { supabase } from './supabase';
import { Database } from '../types/database';

export type Payment = Database['public']['Tables']['payments']['Row'] & {
  shoot?: {
    fashion_category: string;
    shoot_type: string;
  };
  user?: {
    email: string;
  };
};

export const invoiceService = {
  /**
   * Get payments/invoices for a user
   */
  async getInvoices(userId?: string) {
    let query = supabase
      .from('payments')
      .select('*, shoot:shoots(fashion_category, shoot_type)')
      .order('created_at', { ascending: false });

    if (userId) {
      // Filter by user if RLS allows seeing others (admin) or restrict to own
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Payment[];
  },

  /**
   * Get aggregate stats
   */
  async getInvoiceStats(userId?: string) {
    const invoices = await this.getInvoices(userId);
    
    return {
      totalRevenue: invoices.filter(p => p.status === 'succeeded').reduce((acc, p) => acc + p.amount, 0),
      pendingRevenue: invoices.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.amount, 0),
      totalTransactions: invoices.length
    };
  }
};
