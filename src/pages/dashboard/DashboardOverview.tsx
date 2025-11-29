import React from 'react';
import { Calendar, CheckCircle, Wallet, TrendingUp, RefreshCcw } from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { DashboardKPI } from '../../types';
import { DonutChart, CustomBarChart, AICopilotWidget } from '../../components/dashboard/Widgets';

export const DashboardOverview = () => {
  const kpiCards: DashboardKPI[] = [
    { label: 'Upcoming Events', val: '345', sub: 'This Month', icon: Calendar, color: 'bg-pink-100 text-pink-600' },
    { label: 'Total Bookings', val: '1798', sub: '+12% vs last month', icon: CheckCircle, color: 'bg-purple-100 text-purple-600' },
    { label: 'Revenue', val: '$56,320', sub: 'This Month', icon: Wallet, color: 'bg-green-100 text-green-600' },
    { label: 'Social Growth', val: '+18%', sub: 'New Followers', icon: TrendingUp, color: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <section>
          <div className="flex justify-between items-end mb-6">
             <div><h2 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h2><p className="text-gray-500">Hello Orlando, here's what's happening today.</p></div>
             <div className="text-sm text-gray-400 flex items-center gap-2">Last updated: <span className="font-bold text-gray-600">Just now</span> <RefreshCcw size={14} /></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {kpiCards.map((card, i) => (
                <FadeIn key={i} delay={i * 50} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100/50 group">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${card.color} group-hover:scale-110 transition-transform`}><card.icon size={20} /></div>
                   <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{card.label}</p>
                   <p className="text-2xl font-bold text-gray-900 mb-1">{card.val}</p>
                </FadeIn>
             ))}
          </div>
       </section>
       <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"><DonutChart /></div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"><CustomBarChart /></div>
             </div>
          </div>
          <div className="space-y-8">
             <div className="h-64"><AICopilotWidget /></div>
          </div>
       </section>
    </div>
  );
};