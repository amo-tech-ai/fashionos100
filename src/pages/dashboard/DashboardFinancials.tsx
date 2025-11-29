
import React, { useState } from 'react';
import { 
  Wallet, TrendingUp, TrendingDown, MoreHorizontal, Search, Filter, 
  ArrowUpRight, ArrowDownRight, DollarSign, PieChart, ShoppingBag, 
  Camera, Sparkles, Download, ChevronDown, Bell, Calendar, CreditCard
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';

// --- Components ---

const KPICard = ({ 
  title, 
  amount, 
  trend, 
  trendValue, 
  icon: Icon, 
  colorClass 
}: { 
  title: string, 
  amount: string, 
  trend: 'up' | 'down', 
  trendValue: string, 
  icon: any, 
  colorClass: string 
}) => (
  <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden">
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} />
      </div>
      <button className="text-gray-300 hover:text-gray-600 transition-colors"><MoreHorizontal size={20} /></button>
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

const TransactionRow = ({ date, title, type, amount, status, image }: any) => (
  <tr className="hover:bg-gray-50/80 transition-colors group">
    <td className="px-6 py-4 text-sm text-gray-500 font-medium">{date}</td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden shrink-0">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400"><ShoppingBag size={16} /></div>
          )}
        </div>
        <div>
          <p className="font-bold text-[#1A1D2D] text-sm">{title}</p>
          <p className="text-xs text-gray-400">{type}</p>
        </div>
      </div>
    </td>
    <td className={`px-6 py-4 font-bold text-sm ${amount.startsWith('+') ? 'text-green-600' : 'text-[#1A1D2D]'}`}>
      {amount}
    </td>
    <td className="px-6 py-4 text-sm text-gray-500">
      {amount.startsWith('+') ? 'Payment' : 'Withdrawal'}
    </td>
    <td className="px-6 py-4">
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
        status === 'Completed' ? 'bg-green-50 text-green-600' : 
        status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'
      }`}>
        {status}
      </span>
    </td>
  </tr>
);

const CashflowBar = ({ heightIncome, heightExpense, month }: { heightIncome: string, heightExpense: string, month: string }) => (
  <div className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
    <div className="relative w-full h-48 flex items-end justify-center gap-1.5 px-1">
      <div className="w-full bg-[#F4B7D3] rounded-t-md opacity-80 group-hover:opacity-100 transition-all duration-300 relative" style={{ height: heightIncome }}>
         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1A1D2D] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            In: {heightIncome}
         </div>
      </div>
      <div className="w-full bg-[#C9A7F5] rounded-t-md opacity-80 group-hover:opacity-100 transition-all duration-300 relative" style={{ height: heightExpense }}>
         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1A1D2D] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            Out: {heightExpense}
         </div>
      </div>
    </div>
    <span className="text-[10px] font-bold text-gray-400 uppercase">{month}</span>
  </div>
);

const PieChartSegment = ({ color, percent, label, value }: { color: string, percent: number, label: string, value: string }) => (
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

export const DashboardFinancials = () => {
  const [timeRange, setTimeRange] = useState('Last 10 Months');

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
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 w-64"
              />
           </div>
           <Button variant="white" size="sm" className="gap-2 rounded-full"><Download size={16} /> Export</Button>
           <Button variant="primary" size="sm" className="gap-2 rounded-full"><Sparkles size={16} /> AI Insights</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard 
          title="Total Balance" 
          amount="$75,000" 
          trend="up" 
          trendValue="3.65%" 
          icon={Wallet} 
          colorClass="bg-purple-100 text-purple-600" 
        />
        <KPICard 
          title="Total Income" 
          amount="$150,000" 
          trend="up" 
          trendValue="2.08%" 
          icon={TrendingUp} 
          colorClass="bg-pink-100 text-pink-600" 
        />
        <KPICard 
          title="Total Expenses" 
          amount="$45,000" 
          trend="down" 
          trendValue="0.84%" 
          icon={CreditCard} 
          colorClass="bg-orange-100 text-orange-600" 
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
                    {timeRange} <ChevronDown size={14} />
                 </button>
              </div>
           </div>
           
           {/* Bar Chart Container */}
           <div className="flex justify-between gap-2 md:gap-4 px-2">
              <CashflowBar month="Jan" heightIncome="40%" heightExpense="30%" />
              <CashflowBar month="Feb" heightIncome="55%" heightExpense="45%" />
              <CashflowBar month="Mar" heightIncome="45%" heightExpense="35%" />
              <CashflowBar month="Apr" heightIncome="70%" heightExpense="50%" />
              <CashflowBar month="May" heightIncome="85%" heightExpense="40%" />
              <CashflowBar month="Jun" heightIncome="60%" heightExpense="55%" />
              <CashflowBar month="Jul" heightIncome="75%" heightExpense="45%" />
              <CashflowBar month="Aug" heightIncome="90%" heightExpense="30%" />
              <CashflowBar month="Sep" heightIncome="65%" heightExpense="50%" />
              <CashflowBar month="Oct" heightIncome="80%" heightExpense="60%" />
           </div>
        </div>

        {/* Sales Revenue Pie */}
        <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm flex flex-col">
           <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif font-bold text-xl text-[#1A1D2D]">Sales Revenue</h2>
              <button className="text-gray-300 hover:text-gray-600"><MoreHorizontal size={20} /></button>
           </div>
           
           <div className="flex-1 flex flex-col items-center justify-center mb-8 relative">
              {/* SVG Doughnut */}
              <svg viewBox="0 0 100 100" className="w-48 h-48 transform -rotate-90">
                 <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="12" />
                 {/* Segments - manual calc for demo */}
                 <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="12" strokeDasharray="60 251" className="hover:opacity-80 transition-opacity cursor-pointer" />
                 <circle cx="50" cy="50" r="40" fill="none" stroke="#ec4899" strokeWidth="12" strokeDasharray="50 251" strokeDashoffset="-65" className="hover:opacity-80 transition-opacity cursor-pointer" />
                 <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="40 251" strokeDashoffset="-120" className="hover:opacity-80 transition-opacity cursor-pointer" />
                 <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="30 251" strokeDashoffset="-165" className="hover:opacity-80 transition-opacity cursor-pointer" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total</span>
                 <span className="text-2xl font-serif font-bold text-[#1A1D2D]">$150k</span>
              </div>
           </div>

           <div className="space-y-1">
              <PieChartSegment color="bg-indigo-500" percent={30} label="Music Events" value="$45,000" />
              <PieChartSegment color="bg-pink-500" percent={20} label="Fashion" value="$30,000" />
              <PieChartSegment color="bg-purple-500" percent={16} label="Sports" value="$24,000" />
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
                        <th className="px-6 py-4">Event</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Note</th>
                        <th className="px-6 py-4">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     <TransactionRow 
                        date="2025/05/01" 
                        title="Sunset Park Booking" 
                        type="Vendor" 
                        amount="- $7,000" 
                        status="Completed" 
                        image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=100"
                     />
                     <TransactionRow 
                        date="2025/05/02" 
                        title="Ticket Sales" 
                        type="Event Revenue" 
                        amount="+ $15,000" 
                        status="Completed"
                        image="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=100" 
                     />
                     <TransactionRow 
                        date="2025/05/03" 
                        title="Festival Promotion" 
                        type="Marketing" 
                        amount="- $8,000" 
                        status="Pending"
                        image="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100" 
                     />
                     <TransactionRow 
                        date="2025/05/04" 
                        title="Harmony Audio Deposit" 
                        type="Sponsorship" 
                        amount="+ $10,000" 
                        status="Completed"
                        image="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100" 
                     />
                     <TransactionRow 
                        date="2025/05/05" 
                        title="Lighting Rental" 
                        type="Equipment" 
                        amount="- $3,000" 
                        status="Pending"
                        image="https://images.unsplash.com/photo-1563089145-599997674d42?w=100" 
                     />
                  </tbody>
               </table>
            </div>
            <div className="p-4 border-t border-gray-50 text-center">
               <button className="text-xs font-bold text-gray-400 hover:text-fashion-purple transition-colors uppercase tracking-widest">View All History</button>
            </div>
         </div>

         {/* Expense Breakdown & AI Insights */}
         <div className="space-y-6">
            
            {/* Expense Donut */}
            <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="font-serif font-bold text-xl text-[#1A1D2D]">Expense Breakdown</h2>
                  <button className="text-gray-300 hover:text-gray-600"><MoreHorizontal size={20} /></button>
               </div>
               <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                     <svg viewBox="0 0 100 100" className="w-40 h-40 transform -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="8" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#f472b6" strokeWidth="8" strokeDasharray="80 251" className="drop-shadow-sm" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" strokeDasharray="60 251" strokeDashoffset="-90" className="drop-shadow-sm" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#94a3b8" strokeWidth="8" strokeDasharray="40 251" strokeDashoffset="-160" className="drop-shadow-sm" />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-[#1A1D2D]">$45k</span>
                     </div>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-xs items-center">
                     <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-pink-400" /> Marketing</span>
                     <span className="font-bold text-gray-700">$13,846</span>
                  </div>
                  <div className="flex justify-between text-xs items-center">
                     <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800" /> Venue</span>
                     <span className="font-bold text-gray-700">$12,115</span>
                  </div>
                  <div className="flex justify-between text-xs items-center">
                     <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-400" /> Staffing</span>
                     <span className="font-bold text-gray-700">$8,653</span>
                  </div>
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
                  Your fashion reels content is converting <span className="text-white font-bold">12% higher</span> than last month. Consider increasing ad spend on video assets.
               </p>
               
               <div className="flex items-center justify-between relative z-10 border-t border-white/10 pt-4 mt-2">
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Growth Opportunity</span>
                  <ArrowUpRight size={16} className="text-purple-300" />
               </div>
            </div>

         </div>
      </div>

    </div>
  );
};
