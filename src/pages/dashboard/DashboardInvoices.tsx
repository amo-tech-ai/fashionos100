
import React, { useEffect, useState } from 'react';
import { DollarSign, Download, FileText, Search, Filter, CheckCircle2, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { PageHeader, StatCard } from '../../components/dashboard/Shared';
import { Button } from '../../components/Button';
import { supabase } from '../../lib/supabase';
import { FadeIn } from '../../components/FadeIn';

interface Payment {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  shoot?: {
    fashion_category: string;
    shoot_type: string;
  };
  user?: {
    email: string;
  };
}

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    succeeded: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    failed: "bg-red-50 text-red-700 border-red-200",
    refunded: "bg-gray-100 text-gray-600 border-gray-200",
  };
  // @ts-ignore
  const style = styles[status.toLowerCase()] || styles.pending;
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${style}`}>
      {status}
    </span>
  );
};

export const DashboardInvoices: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      const { data, error } = await supabase
        .from('payments')
        .select('*, shoot:shoots(fashion_category, shoot_type)')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setPayments(data);
      }
      setLoading(false);
    };
    fetchPayments();
  }, []);

  const totalRevenue = payments.filter(p => p.status === 'succeeded').reduce((acc, p) => acc + p.amount, 0);
  const pendingRevenue = payments.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Invoices & Payments" 
        subtitle="Manage billing history and financial records."
        breadcrumbs={['Dashboard', 'Invoices']}
        actionLabel="Export CSV"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} color="bg-green-50 text-green-600" />
        <StatCard label="Pending" value={`$${pendingRevenue.toLocaleString()}`} icon={Clock} color="bg-amber-50 text-amber-600" />
        <StatCard label="Transactions" value={payments.length.toString()} icon={FileText} color="bg-blue-50 text-blue-600" />
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden min-h-[400px]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Search invoice ID..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm w-64" />
          </div>
          <Button variant="white" size="sm" className="gap-2">
             <Filter size={14} /> Filter
          </Button>
        </div>

        {loading ? (
           <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-gray-300" /></div>
        ) : payments.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <FileText size={48} className="mb-4 opacity-20" />
              <p>No invoices found.</p>
           </div>
        ) : (
           <table className="w-full text-left text-sm">
              <thead className="bg-white text-gray-400 text-[10px] font-bold uppercase tracking-wider border-b border-gray-50">
                 <tr>
                    <th className="px-6 py-4">Invoice ID</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                       <td className="px-6 py-4 font-mono text-xs text-gray-500">#{payment.id.substring(0, 8)}</td>
                       <td className="px-6 py-4">
                          <div className="font-bold text-gray-900 capitalize">{payment.shoot?.shoot_type || 'Service'}</div>
                          <div className="text-xs text-gray-500 capitalize">{payment.shoot?.fashion_category}</div>
                       </td>
                       <td className="px-6 py-4 text-gray-600">{new Date(payment.created_at).toLocaleDateString()}</td>
                       <td className="px-6 py-4 font-medium">${payment.amount.toLocaleString()}</td>
                       <td className="px-6 py-4"><StatusBadge status={payment.status} /></td>
                       <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-purple-600 transition-colors">
                             <Download size={16} />
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        )}
      </div>
    </div>
  );
};
