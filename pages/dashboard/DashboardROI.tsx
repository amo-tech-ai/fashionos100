
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Eye, Heart, Zap, Trash2, Sparkles, Loader2, Calendar
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader, StatCard } from '../../components/dashboard/Shared';
import { Button } from '../../components/Button';
import { supabase, supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { SimpleLineChart, SimpleDonutChart } from '../../components/charts/SimpleCharts';

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
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-6 mb-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                <Sparkles className="text-purple-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-purple-900 mb-2">Executive Summary (AI Generated)</h3>
                <p className="text-purple-800/80 text-sm leading-relaxed whitespace-pre-wrap">{aiReport}</p>
              </div>
              <button onClick={() => setAiReport(null)} className="text-purple-400 hover:text-purple-700"><Trash2 size={16} /></button>
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
          label="Activations" 
          value="12" 
          icon={Zap} 
          color="text-amber-600 bg-amber-50" 
        />
        <StatCard 
          label="Data Points" 
          value={metrics.length > 0 ? metrics.length.toString() : '245'} 
          icon={BarChart3} 
          color="text-blue-600 bg-blue-50" 
        />
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Engagement Trend */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif font-bold text-xl">Engagement Trend</h3>
                  <div className="flex gap-2">
                      <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><div className="w-2 h-2 bg-purple-400 rounded-full"/> Impressions</span>
                  </div>
              </div>
              <SimpleLineChart data={trendData} labels={trendLabels} />
          </div>

          {/* ROI Breakdown */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
              <h3 className="font-serif font-bold text-xl mb-6">ROI Breakdown</h3>
              <div className="flex-1 flex items-center justify-center">
                  <SimpleDonutChart data={breakdownData} />
              </div>
              <div className="mt-6 space-y-3">
                  {breakdownData.map((item, i) => (
                      <div key={i} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-sm text-gray-600">{item.label}</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{item.value.toLocaleString()}</span>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* 4. Activation Timeline */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-8">
          <h3 className="font-serif font-bold text-xl mb-6">Activation Performance Timeline</h3>
          <div className="relative border-l-2 border-gray-100 ml-4 space-y-8 pl-8 py-2">
              {[
                  { title: "Campaign Launch", date: "Jan 15", status: "Completed" },
                  { title: "Influencer Unboxing", date: "Jan 22", status: "Completed" },
                  { title: "Runway Show Live", date: "Feb 01", status: "Upcoming" },
                  { title: "Post-Event Recap", date: "Feb 05", status: "Pending" }
              ].map((milestone, i) => (
                  <div key={i} className="relative">
                      <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-2 ${milestone.status === 'Completed' ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}></div>
                      <div className="flex justify-between items-start">
                          <div>
                              <h4 className="font-bold text-gray-900">{milestone.title}</h4>
                              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                  <Calendar size={12} /> {milestone.date}
                              </p>
                          </div>
                          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${milestone.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                              {milestone.status}
                          </span>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* 5. Recent Metrics Table */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-serif font-bold text-xl mb-6">Live Metric Feed</h3>
          {metrics.length > 0 ? (
              <div className="space-y-4">
                  {metrics.map(m => (
                      <div key={m.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                          <div>
                              <p className="font-bold text-gray-900">{m.metric_name}</p>
                              <p className="text-xs text-gray-500">{new Date(m.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                              <p className="text-lg font-bold text-purple-600">{m.metric_value.toLocaleString()}</p>
                              <p className="text-xs text-gray-400 uppercase tracking-wider">{m.unit}</p>
                          </div>
                      </div>
                  ))}
              </div>
          ) : (
              <div className="text-center py-12 text-gray-400">No metrics recorded yet.</div>
          )}
      </div>
    </div>
  );
};
