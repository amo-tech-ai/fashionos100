
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Eye, Heart, Zap, Trash2, Sparkles, Loader2, Calendar, DollarSign, ArrowDownRight, Target
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader, StatCard } from '../../components/dashboard/Shared';
import { Button } from '../../components/Button';
import { supabase, supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { SimpleLineChart, SimpleDonutChart } from '../../components/charts/SimpleCharts';
import { aiService } from '../../lib/ai-service';
import { ResponsiveBarChart } from '../../components/charts/DynamicCharts';

export const DashboardROI: React.FC = () => {
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Real Metrics
  useEffect(() => {
    const fetchMetrics = async () => {
        const { data } = await supabase
            .from('sponsor_roi_metrics')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);
        setMetrics(data || []);
        setLoading(false);
    };
    fetchMetrics();
  }, []);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setAiReport(null);
    try {
      // Summarize metrics for AI
      const summary = metrics.map(m => `${m.metric_name}: ${m.metric_value} ${m.unit}`).join(', ');
        
      const response = await fetch(`${supabaseUrl}/functions/v1/sponsor-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          action: 'generate-roi-report',
          sponsorName: 'All Sponsors', 
          eventDetails: 'Aggregate Performance',
          metrics: summary || 'No data available yet.'
        })
      });
      const text = await response.text();
      setAiReport(text);
    } catch (e) {
      console.error(e);
      alert("AI generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  const totalImpressions = metrics
    .filter(m => m.metric_name.toLowerCase().includes('impression'))
    .reduce((acc, curr) => acc + Number(curr.metric_value), 0);

  // Mock data for charts (to be replaced by real historical data aggregations)
  const trendData = [12, 15, 22, 18, 25, 30, 45, 40, 55, 60, 58, 75];
  const trendLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const breakdownData = [
      { label: 'Social', value: 45000, color: '#c084fc' }, // Purple
      { label: 'Events', value: 30000, color: '#ec4899' }, // Pink
      { label: 'Web', value: 15000, color: '#fbbf24' },    // Amber
  ];

  // Funnel Data
  const funnelData = [
      { label: 'Impressions', value: 120000 },
      { label: 'Engagements', value: 45000 },
      { label: 'Booth Visits', value: 3200 },
      { label: 'Leads', value: 850 }
  ];

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">ROI & Analytics Dashboard</h1>
          <p className="text-gray-500">Track sponsor performance and return on investment</p>
        </div>
        <div className="flex gap-3">
           <Button variant="white" className="gap-2 rounded-full text-gray-600 border-gray-200" onClick={handleGenerateReport} disabled={isGenerating}>
             {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} className="text-purple-600" />}
             {isGenerating ? 'Writing Report...' : 'Generate AI Summary'}
           </Button>
        </div>
      </div>

      {/* AI Report Card */}
      {aiReport && (
        <FadeIn>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-6 mb-8 shadow-sm relative group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                <Sparkles className="text-purple-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-purple-900 mb-2">Executive Summary (AI Generated)</h3>
                <p className="text-purple-800/80 text-sm leading-relaxed whitespace-pre-wrap">{aiReport}</p>
              </div>
              <button onClick={() => setAiReport(null)} className="text-purple-400 hover:text-purple-700 absolute top-4 right-4"><Trash2 size={16} /></button>
            </div>
          </div>
        </FadeIn>
      )}

      {/* 2. KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          label="Total Impressions" 
          value={totalImpressions > 0 ? `${(totalImpressions / 1000000).toFixed(1)}M` : '1.2M'} 
          icon={Eye} 
          color="text-purple-600 bg-purple-50" 
          trend="Live Data" 
          trendUp 
        />
        <StatCard 
          label="Avg Engagement" 
          value="4.8%" 
          icon={Heart} 
          color="text-pink-600 bg-pink-50" 
        />
        <StatCard 
          label="Estimated Media Value" 
          value="$342k" 
          icon={DollarSign} 
          color="text-green-600 bg-green-50" 
        />
        <StatCard 
          label="Conversions Influenced" 
          value="850" 
          icon={Target} 
          color="text-blue-600 bg-blue-50" 
        />
      </div>

      {/* 3. Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Reach Trend */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                  <h3 className="font-serif font-bold text-xl">Reach & Visibility</h3>
                  <div className="flex gap-2">
                      <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><div className="w-2 h-2 bg-purple-400 rounded-full"/> Impressions</span>
                  </div>
              </div>
              <SimpleLineChart data={trendData} labels={trendLabels} />
          </div>

          {/* Funnel */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
              <h3 className="font-serif font-bold text-xl mb-6">Sponsor Funnel</h3>
              <div className="space-y-6 flex-1 flex flex-col justify-center">
                  {funnelData.map((step, i) => {
                      const percent = Math.max((step.value / funnelData[0].value) * 100, 10);
                      return (
                          <div key={i} className="relative">
                              <div className="flex justify-between text-xs font-bold uppercase text-gray-500 mb-1">
                                  <span>{step.label}</span>
                                  <span className="text-gray-900">{step.value.toLocaleString()}</span>
                              </div>
                              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500" 
                                    style={{ width: `${percent}%`, opacity: 1 - (i * 0.2) }}
                                  />
                              </div>
                              {i < funnelData.length - 1 && (
                                  <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 text-gray-300">
                                      <ArrowDownRight size={12} />
                                  </div>
                              )}
                          </div>
                      );
                  })}
              </div>
          </div>
      </div>
      
      {/* 4. Bottom Row: Breakdown & Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Channel Breakdown */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
             <div className="flex-1">
                <h3 className="font-serif font-bold text-xl mb-2">Channel Attribution</h3>
                <p className="text-gray-500 text-sm mb-6">Breakdown of value by source.</p>
                <div className="space-y-3">
                    {breakdownData.map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">{item.value.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
             </div>
             <div className="shrink-0">
                <SimpleDonutChart data={breakdownData} size={200} />
             </div>
          </div>

          {/* Benchmarks */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
             <h3 className="font-serif font-bold text-xl mb-6">Benchmarks</h3>
             <div className="space-y-6">
                 <div className="p-4 border border-gray-100 rounded-2xl hover:border-purple-200 transition-colors group">
                     <div className="flex justify-between items-center mb-2">
                         <span className="text-sm font-bold text-gray-700">Your Events</span>
                         <span className="text-green-600 font-bold text-sm">+12% vs Avg</span>
                     </div>
                     <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                         <div className="h-full bg-green-500 w-[85%]" />
                     </div>
                     <p className="text-xs text-gray-400 mt-2">You outperform 85% of similar fashion events.</p>
                 </div>

                 <div className="p-4 border border-gray-100 rounded-2xl hover:border-purple-200 transition-colors group">
                     <div className="flex justify-between items-center mb-2">
                         <span className="text-sm font-bold text-gray-700">Industry Average</span>
                         <span className="text-gray-400 font-bold text-sm">Baseline</span>
                     </div>
                     <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                         <div className="h-full bg-gray-400 w-[60%]" />
                     </div>
                     <p className="text-xs text-gray-400 mt-2">Based on 400+ luxury fashion events.</p>
                 </div>
             </div>
             
             <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                <Button variant="outline" size="sm" className="gap-2">
                    <Target size={14} /> Compare Competitors
                </Button>
             </div>
          </div>
      </div>

    </div>
  );
};
