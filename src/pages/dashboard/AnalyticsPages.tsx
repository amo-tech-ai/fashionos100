
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Globe, Share2, Eye, MousePointerClick, 
  CheckCircle, Calendar, Plus, Package, Layout, Monitor, Zap, 
  Trash2, ChevronDown, ArrowRight, Heart, ArrowUpRight, Download,
  MoreHorizontal, PieChart, Upload, FileText, Image as ImageIcon, 
  Video, Lock, HelpCircle, Mail, Clock, MapPin, User, Sparkles, Loader2
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader, StatCard } from '../../components/dashboard/Shared';
import { Button } from '../../components/Button';
import { supabase, supabaseUrl, supabaseAnonKey } from '../../lib/supabase';

// --- CHART COMPONENTS (Simplistic Representations) ---
const SimpleBarChart = () => (
    <div className="h-64 flex items-end justify-between gap-4 pt-6 px-2 border-b border-gray-100">
        {[40, 65, 45, 80, 55].map((h, i) => (
            <div key={i} className="w-full bg-purple-100 rounded-t-md relative group hover:bg-purple-200 transition-colors" style={{height: `${h}%`}}></div>
        ))}
    </div>
);

// --- 1. ROI PAGE ---
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
          value={totalImpressions > 0 ? `${(totalImpressions / 1000000).toFixed(1)}M` : '0'} 
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
          value={metrics.length.toString()} 
          icon={BarChart3} 
          color="text-blue-600 bg-blue-50" 
        />
      </div>

      {/* 3. Recent Metrics Table */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-serif font-bold text-xl mb-6">Live Metric Feed</h3>
          {metrics.length > 0 ? (
              <div className="space-y-4">
                  {metrics.map(m => (
                      <div key={m.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl">
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
