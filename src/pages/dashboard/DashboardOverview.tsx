
import React from 'react';
import { Calendar, CheckCircle, Wallet, TrendingUp, RefreshCcw, Loader2 } from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { DashboardKPI } from '../../types';
import { DonutChart, CustomBarChart, AICopilotWidget } from '../../components/dashboard/Widgets';
import { useDashboardKPIs } from '../../hooks/useDashboardKPIs';
import { useProfile } from '../../hooks/useProfile';

export const DashboardOverview = () => {
  const { stats, loading: kpiLoading } = useDashboardKPIs();
  const { profile } = useProfile();
  
  const kpiCards: DashboardKPI[] = [
    { 
      label: 'Upcoming Events', 
      val: stats.upcomingEvents.toString(), 
      sub: 'This Month', 
      icon: Calendar, 
      color: 'bg-pink-100 text-pink-600' 
    },
    { 
      label: 'Total Bookings', 
      val: stats.totalBookings.toString(), 
      sub: `${stats.activeShoots} Active`, 
      icon: CheckCircle, 
      color: 'bg-purple-100 text-purple-600' 
    },
    { 
      label: 'Revenue', 
      val: `$${stats.totalRevenue.toLocaleString()}`, 
      sub: 'Lifetime', 
      icon: Wallet, 
      color: 'bg-green-100 text-green-600' 
    },
    { 
      label: 'Social Growth', 
      val: `+${stats.socialGrowth}%`, 
      sub: 'New Followers', 
      icon: TrendingUp, 
      color: 'bg-blue-100 text-blue-600' 
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <section>
          <div className="flex justify-between items-end mb-6">
             <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h2>
                <p className="text-gray-500">Hello {profile?.full_name ? profile.full_name.split(' ')[0] : 'Creator'}, here's what's happening today.</p>
             </div>
             <div className="text-sm text-gray-400 flex items-center gap-2">Last updated: <span className="font-bold text-gray-600">Just now</span> <RefreshCcw size={14} /></div>
          </div>
          
          {kpiLoading ? (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100/50 h-32 flex items-center justify-center">
                    <Loader2 className="animate-spin text-gray-300" />
                  </div>
                ))}
             </div>
          ) : (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {kpiCards.map((card, i) => (
                    <FadeIn key={i} delay={i * 50} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100/50 group">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${card.color} group-hover:scale-110 transition-transform`}><card.icon size={20} /></div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{card.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{card.val}</p>
                    </FadeIn>
                ))}
             </div>
          )}
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
