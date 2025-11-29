
import React, { useMemo } from 'react';
import { DollarSign, Users, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import { StatCard } from '../dashboard/Shared';
import { EventSponsor } from '../../types/sponsorship';
import { FadeIn } from '../FadeIn';

interface SponsorKPIWidgetProps {
  sponsors: EventSponsor[];
  loading?: boolean;
  onAiTrigger?: () => void;
}

export const SponsorKPIWidget: React.FC<SponsorKPIWidgetProps> = ({ sponsors, loading, onAiTrigger }) => {
  const metrics = useMemo(() => {
    const totalDeals = sponsors.length;
    const totalValue = sponsors.reduce((acc, s) => acc + (s.cash_value || 0), 0);
    const avgValue = totalDeals > 0 ? totalValue / totalDeals : 0;
    
    // Pipeline Breakdown
    const pipelineCounts = sponsors.reduce((acc, s) => {
      const status = s.status || 'Unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const activePartners = new Set(
      sponsors
        .filter(s => ['Signed', 'Paid', 'Contacted', 'Negotiating', 'Activation Ready'].includes(s.status))
        .map(s => s.sponsor_id)
    ).size;

    return {
      totalDeals,
      totalValue,
      avgValue,
      activePartners,
      pipelineCounts
    };
  }, [sponsors]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-gray-100 rounded-2xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Deal Volume */}
      <StatCard 
        label="Total Pipeline Value" 
        value={`$${metrics.totalValue.toLocaleString()}`} 
        icon={DollarSign} 
        trend="+12%" 
        trendUp 
        color="text-green-600 bg-green-50" 
      />

      {/* Active Partners */}
      <StatCard 
        label="Active Partners" 
        value={metrics.activePartners.toString()} 
        icon={Users} 
        color="text-blue-600 bg-blue-50" 
      />

      {/* Average Deal Size */}
      <StatCard 
        label="Avg Deal Value" 
        value={`$${Math.round(metrics.avgValue).toLocaleString()}`} 
        icon={TrendingUp} 
        color="text-pink-600 bg-pink-50" 
        trend="+5%" 
        trendUp 
      />

      {/* Pipeline Status Mini-View */}
      <FadeIn delay={100} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group" onClick={onAiTrigger}>
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-lg shadow-md group-hover:scale-110 transition-transform">
            <BarChart3 size={18} />
          </div>
          <div className="text-right">
             <span className="text-xs font-bold text-gray-400 uppercase">Deals</span>
             <p className="text-xl font-bold text-gray-900">{metrics.totalDeals}</p>
          </div>
        </div>
        
        {/* Mini Pipeline Bar */}
        <div className="mt-3 space-y-2">
           <div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
              <div style={{ width: `${(metrics.pipelineCounts['Activation Ready'] || 0) / metrics.totalDeals * 100}%` }} className="bg-indigo-500" title="Ready" />
              <div style={{ width: `${(metrics.pipelineCounts['Signed'] || 0) / metrics.totalDeals * 100}%` }} className="bg-green-500" title="Signed" />
              <div style={{ width: `${(metrics.pipelineCounts['Negotiating'] || 0) / metrics.totalDeals * 100}%` }} className="bg-amber-500" title="Negotiating" />
           </div>
           <div className="flex justify-between text-[10px] text-gray-500 font-medium">
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"/> {(metrics.pipelineCounts['Activation Ready'] || 0) + (metrics.pipelineCounts['Paid'] || 0)} Ready</span>
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"/> {metrics.pipelineCounts['Signed'] || 0} Won</span>
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"/> {metrics.pipelineCounts['Negotiating'] || 0} Active</span>
           </div>
        </div>
      </FadeIn>
    </div>
  );
};
