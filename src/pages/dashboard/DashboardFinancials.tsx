
import React, { useMemo } from 'react';
import { 
  Wallet, TrendingUp, CreditCard, Search, Filter, 
  ArrowUpRight, ArrowDownRight, ShoppingBag, Sparkles, Download, ChevronDown, Loader2
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { useInvoices } from '../../hooks/useInvoices';
import { formatCurrency } from '../../utils/format';
import { StatusBadge } from '../../components/StatusBadge';
import { EmptyState } from '../../components/EmptyState';

// --- Components ---

interface KPICardProps {
  title: string;
  amount: string;
  trend: 'up' | 'down';
  trendValue: string;
  icon: any;
  colorClass: string;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  amount, 
  trend, 
  trendValue, 
  icon: Icon, 
  colorClass 
}) => (
  <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden">
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} />
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-3xl font-serif font-bold text-[#1A1D2D] mb-1">{amount}</h3>
      <div className="flex items-center gap-2">
        <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
          {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trendValue}
        </span>
        <span className="text-xs text-gray-400 font-medium">Month to date</span>
      </div>
    </div>
    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-4 relative z-10">{title}</p>
    
    {/* Decorative Blob */}
    <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10 ${colorClass}`} />
  </div>
);

interface TransactionRowProps {
  date: string;
  title: string;
  type: string;
  amount: number;
  status: string;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ date, title, type, amount, status }) => (
  <tr className="hover:bg-gray-50/80 transition-colors group">
    <td className="px-6 py-4 text-sm text-gray-500 font-medium">{date}</td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center text-gray-400">
           <ShoppingBag size={16} />
        </div>
        <div>
          <p className="font-bold text-[#1A1D2D] text-sm">{title}</p>
          <p className="text-xs text-gray-400">{type}</p>
        </div>
      </div>
    </td>
    <td className={`px-6 py-4 font-bold text-sm ${amount > 0 ? 'text-green-600' : 'text-[#1A1D2D]'}`}>
      {formatCurrency(Math.abs(amount))}
    </td>
    <td className="px-6 py-4 text-sm text-gray-500">
      {amount > 0 ? 'Payment' : 'Refund/Exp'}
    </td>
    <td className="px-6 py-4">
      <StatusBadge status={status} />
    </td>
  </tr>
);

interface CashflowBarProps {
  heightIncome: string;
  heightExpense: string;
  month: string;
}

const CashflowBar: React.FC<CashflowBarProps> = ({ heightIncome, heightExpense, month }) => (
  <div className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
    <div className="relative w-full h-48 flex items-end justify-center gap-1.5 px-1">
      <div className="w-full bg-[#F4B7D3] rounded-t-md opacity-80 group-hover:opacity-100 transition-all duration-300 relative" style={{ height: heightIncome }}>
      </div>
      <div className="w-full bg-[#C9A7F5] rounded-t-md opacity-80 group-hover:opacity-100 transition-all duration-300 relative" style={{ height: heightExpense }}>
      </div>
    </div>
    <span className="text-[10px] font-bold text-gray-400 uppercase">{month}</span>
  </div>
);

interface PieChartSegmentProps {
  color: string;
  percent: number;
  label: string;
  value: string;
}

const PieChartSegment: React.FC<PieChartSegmentProps> = ({ color, percent, label, value }) => (
  <div className="flex items-center justify-between text-sm mb-3 last:mb-0 group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
    <div className="flex items-center gap-3">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-gray-600 font-medium group-hover:text-[#1A1D2D]">{label}</span>
    </div>
    <div className="text-right">
       <span className="block font-bold text-[#1A1D2D]">{value}</span>
       <span className="text-[10px] text-gray-400">{percent}%</span>
    </div>
  </div>
);

// --- Main Page ---

export const DashboardFinancials: React.FC = () => {
  const { invoices, stats, loading } = useInvoices();

  // Calculate chart data from real invoices
  const chartData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    // Initialize last 6 months
    const data = Array.from({ length: 6 }, (_, i) => {
      const mIndex = (currentMonth - 5 + i + 12) % 12;
      return { month: months[mIndex], income: 0, expense: 0, hIncome: '0%', hExpense: '0%' };
    });

    invoices.forEach(inv => {
      const date = new Date(inv.created_at);
      const mIndex = date.getMonth();
      // Simplistic mapping for demo purposes
      const dataIndex = data.findIndex(d => d.month === months[mIndex]);
      if (dataIndex !== -1) {
        if (inv.amount > 0) data[dataIndex].income += inv.amount;
        else data[dataIndex].expense += Math.abs(inv.amount);
      }
    });

    // Normalize heights for display
    const maxVal = Math.max(...data.map(d => Math.max(d.income, d.expense)), 100);
    return data.map(d => ({
      ...d,
      hIncome: `${Math.max(5, (d.income / maxVal) * 100)}%`,
      hExpense: `${Math.max(5, (d.expense / maxVal) * 100)}%`
    }));
  }, [invoices]);

  if (loading) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-purple-600" /></div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
            <span>Dashboard</span> <span className="text-gray-300">/</span> <span className="text-fashion-purple">Financials</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1D2D]">Financials Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Track your agency's performance across shoots, bookings, and sales.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 w-64 shadow-sm"
              />
           </div>
           <Button variant="white" size="sm" className="gap-2 rounded-full text-gray-600 border-gray-200">
            <Download size={16} /> Export
           </Button>
           <Button variant="primary" size="sm" className="gap-2 rounded-full shadow-lg shadow-purple-500/20">
             <Sparkles size={16} /> AI Insights
           </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard 
          title="Total Revenue" 
          amount={formatCurrency(stats.totalRevenue)} 
          trend="up" 
          trendValue="12.5%" 
          icon={Wallet} 
          colorClass="bg-purple-100 text-purple-600" 
        />
        <KPICard 
          title="Pending Payments" 
          amount={formatCurrency(stats.pendingRevenue)} 
          trend="up" 
          trendValue="5 Active" 
          icon={TrendingUp} 
          colorClass="bg-amber-100 text-amber-600" 
        />
        <KPICard 
          title="Total Transactions" 
          amount={stats.totalTransactions.toString()}
          trend="down" 
          trendValue="0.84%" 
          icon={CreditCard} 
          colorClass="bg-blue-100 text-blue-600" 
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cashflow Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <div>
                 <h2 className="font-serif font-bold text-xl text-[#1A1D2D]">Cashflow</h2>
                 <div className="flex items-center gap-4 mt-1 text-xs font-medium">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#F4B7D3]" /> Income</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#C9A7F5]" /> Expense</div>
                 </div>
              </div>
              <div className="relative">
                 <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                    Last 6 Months <ChevronDown size={14} />
                 </button>
              </div>
           </div>
           
           {/* Bar Chart Container */}
           <div className="flex justify-between gap-2 md:gap-4 px-2">
              {chartData.map((d, i) => (
                <CashflowBar key={i} month={d.month} heightIncome={d.hIncome} heightExpense={d.hExpense} />
              ))}
           </div>
        </div>

        {/* Sales Revenue Pie */}
        <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm flex flex-col">
           <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif font-bold text-xl text-[#1A1D2D]">Revenue Sources</h2>
           </div>
           
           <div className="flex-1 flex flex-col items-center justify-center mb-8 relative">
              {/* SVG Doughnut Mock */}
              <svg viewBox="0 0 100 100" className="w-48 h-48 transform -rotate-90">
                 <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="12" />
                 <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="12" strokeDasharray="60 251" className="hover:opacity-80 transition-opacity cursor-pointer" />
                 <circle cx="50" cy="50" r="40" fill="none" stroke="#ec4899" strokeWidth="12" strokeDasharray="50 251" strokeDashoffset="-65" className="hover:opacity-80 transition-opacity cursor-pointer" />
                 <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="40 251" strokeDashoffset="-120" className="hover:opacity-80 transition-opacity cursor-pointer" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total</span>
                 <span className="text-2xl font-serif font-bold text-[#1A1D2D]">{formatCurrency(stats.totalRevenue)}</span>
              </div>
           </div>

           <div className="space-y-1">
              <PieChartSegment color="bg-indigo-500" percent={45} label="Shoots" value={formatCurrency(stats.totalRevenue * 0.45)} />
              <PieChartSegment color="bg-pink-500" percent={35} label="Events" value={formatCurrency(stats.totalRevenue * 0.35)} />
              <PieChartSegment color="bg-purple-500" percent={20} label="Retouching" value={formatCurrency(stats.totalRevenue * 0.20)} />
           </div>
        </div>
      </div>

      {/* Bottom Row: Table + Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Recent Transactions Table */}
         <div className="lg:col-span-2 bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
               <h2 className="font-serif font-bold text-xl text-[#1A1D2D]">Recent Transactions</h2>
               <div className="flex gap-2">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                     <input type="text" placeholder="Search..." className="bg-gray-50 border-none rounded-full pl-9 pr-4 py-2 text-xs font-bold focus:ring-2 focus:ring-purple-100 w-48" />
                  </div>
                  <button className="bg-gray-50 p-2 rounded-full text-gray-500 hover:bg-gray-100"><Filter size={16} /></button>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-gray-50/50 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                     <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {invoices.slice(0, 5).map((inv) => (
                        <TransactionRow 
                           key={inv.id}
                           date={new Date(inv.created_at).toLocaleDateString()} 
                           title={inv.shoot ? `${inv.shoot.shoot_type} Shoot` : 'Service Payment'}
                           type={inv.shoot?.fashion_category || 'General'}
                           amount={inv.amount}
                           status={inv.status}
                        />
                     ))}
                     {invoices.length === 0 && (
                        <tr>
                            <td colSpan={5}>
                                <EmptyState 
                                    title="No transactions found" 
                                    description="Your financial history will appear here." 
                                    className="border-none py-12"
                                />
                            </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
            <div className="p-4 border-t border-gray-50 text-center">
               <Button variant="ghost" size="sm">View All History</Button>
            </div>
         </div>

         {/* AI Insights Card */}
         <div className="bg-gradient-to-br from-[#1A1D2D] to-[#2D3142] p-6 rounded-[24px] text-white relative overflow-hidden shadow-lg group cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-500/30 transition-colors" />
            
            <div className="flex items-center gap-2 mb-4 relative z-10">
               <div className="bg-white/10 p-1.5 rounded-lg backdrop-blur-md">
                  <Sparkles size={16} className="text-yellow-300" />
               </div>
               <h3 className="font-bold text-sm uppercase tracking-wider">AI Insights</h3>
            </div>
            
            <p className="text-gray-300 text-sm mb-4 leading-relaxed relative z-10">
               Revenue is trending <span className="text-white font-bold">12.5% up</span> this month. 
               Consider offering a "Campaign Bundle" to close pending leads faster.
            </p>
            
            <div className="flex items-center justify-between relative z-10 border-t border-white/10 pt-4 mt-2">
               <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Growth Opportunity</span>
               <ArrowUpRight size={16} className="text-purple-300" />
            </div>
         </div>

      </div>
    </div>
  );
};
