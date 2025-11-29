
import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, RefreshCw, ChevronLeft, Zap, Filter, Download, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../components/FadeIn';
import { QACard } from '../../components/studio/QACard';
import { QAImage, QAStatus } from '../../types/qa';
import { Button } from '../../components/Button';
import { supabase } from '../../lib/supabase';
import { ShootAsset } from '../../types/studio';

export const VisualQAPage: React.FC = () => {
  const [items, setItems] = useState<QAImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<QAStatus | 'all'>('all');

  useEffect(() => {
    fetchQAData();
  }, []);

  const fetchQAData = async () => {
    try {
        setLoading(true);
        // Fetch assets that have QA reviews
        // In a real scenario, we might filter by a specific active shoot or 'pending' status
        const { data, error } = await supabase
            .from('shoot_assets')
            .select(`
                *,
                qa_reviews (*)
            `)
            .not('qa_reviews', 'is', null) // Only get items with reviews
            .limit(50);

        if (error) throw error;

        // Map DB types to UI types
        const mappedItems: QAImage[] = (data as any[]).map(asset => {
            const review = asset.qa_reviews?.[0] || {};
            
            // Map asset status to QA Status
            let qaStatus: QAStatus = 'pending';
            if (asset.status === 'approved') qaStatus = 'approved';
            if (asset.status === 'revision_requested') qaStatus = 'retouch';
            
            return {
                id: asset.id,
                url: asset.url,
                name: asset.filename || 'Untitled Asset',
                overall_score: review.overall_score || 0,
                grade: review.grade || 'C',
                metrics: review.metrics || { sharpness: 0, lighting: 0, framing: 0, cleanliness: 0, color_accuracy: 0 },
                detected_issues: review.detected_issues || [],
                status: qaStatus,
                ai_reasoning: review.ai_reasoning
            };
        });
        
        setItems(mappedItems);
    } catch (err) {
        console.error("Error fetching QA data:", err);
    } finally {
        setLoading(false);
    }
  };

  const handleAction = async (id: string, action: 'approve' | 'retouch' | 'pending') => {
    // Optimistic Update
    let status: QAStatus = 'pending';
    let dbStatus = 'review';

    if (action === 'approve') {
        status = 'approved';
        dbStatus = 'approved';
    } else if (action === 'retouch') {
        status = 'retouch';
        dbStatus = 'revision_requested';
    }

    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, status } : item
    ));

    // Database Update
    await supabase
        .from('shoot_assets')
        .update({ status: dbStatus })
        .eq('id', id);
  };

  // Derived Stats
  const stats = useMemo(() => {
    const total = items.length;
    const approved = items.filter(i => i.status === 'approved').length;
    const retouch = items.filter(i => i.status === 'retouch').length;
    const pending = items.filter(i => i.status === 'pending').length;
    const avgScore = total > 0 ? Math.round(items.reduce((acc, i) => acc + i.overall_score, 0) / total) : 0;
    
    // AI Insight logic
    const allIssues = items.flatMap(i => i.detected_issues);
    const issueCounts = allIssues.reduce((acc, issue) => {
        acc[issue] = (acc[issue] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    
    const mostCommonIssue = Object.entries(issueCounts).sort((a,b) => (b[1] as number) - (a[1] as number))[0];

    return { total, approved, retouch, pending, avgScore, mostCommonIssue };
  }, [items]);

  const filteredItems = items.filter(i => filter === 'all' || i.status === filter);

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-20 font-sans">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 px-6 py-4 shadow-sm">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <Link to="/dashboard/studio" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <ChevronLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
                        AI Quality Check <Sparkles size={18} className="text-purple-500" />
                    </h1>
                    <p className="text-xs text-gray-500">Gemini Vision Analysis • Recent Uploads</p>
                </div>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                 <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border ${stats.retouch > 2 ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-green-50 border-green-200 text-green-700'}`}>
                    {stats.retouch > 2 ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
                    <div className="text-xs">
                        <p className="font-bold uppercase tracking-wider">Impact</p>
                        <p>{stats.retouch > 2 ? 'Review Required' : 'On Track'}</p>
                    </div>
                 </div>

                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Download size={16} /> Export Report
                    </Button>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 pt-8">
        
        {/* Summary HUD */}
        <FadeIn>
          <div className="bg-gray-900 rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-10 relative overflow-hidden">
            {/* Abstract BG */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-16">
                
                {/* Stats Column */}
                <div className="flex flex-wrap gap-8 items-center">
                    <div className="text-center">
                        <div className="relative inline-flex items-center justify-center">
                             <svg className="w-24 h-24 transform -rotate-90">
                                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-800" />
                                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-purple-500" strokeDasharray={251.2} strokeDashoffset={251.2 - (251.2 * stats.avgScore) / 100} />
                             </svg>
                             <span className="absolute text-3xl font-bold">{stats.avgScore}</span>
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase mt-2 tracking-wider">Avg Score</p>
                    </div>

                    <div className="h-16 w-px bg-gray-800 hidden sm:block" />

                    <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Ready</p>
                            <p className="text-3xl font-bold text-green-400">{stats.approved}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Retouch</p>
                            <p className="text-3xl font-bold text-yellow-400">{stats.retouch}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Pending</p>
                            <p className="text-3xl font-bold text-white">{stats.pending}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Total</p>
                            <p className="text-3xl font-bold text-gray-500">{stats.total}</p>
                        </div>
                    </div>
                </div>

                {/* AI Insight Column */}
                <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-xl text-purple-300 shrink-0">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-2">Gemini Insight</h3>
                        <p className="text-gray-200 leading-relaxed text-sm">
                            {stats.mostCommonIssue && stats.total > 0
                                ? (
                                    <>
                                        <strong>Alert:</strong> {Math.round(((stats.mostCommonIssue[1] as number) / stats.total) * 100)}% of images have been flagged with <strong>"{stats.mostCommonIssue[0]}"</strong>. 
                                        Consider checking your lighting setup or lens calibration for the next batch to reduce post-production time.
                                    </>
                                )
                                : "Quality looks consistent across the board. Sharpness and color accuracy are performing well above baseline. Ready for client review."}
                        </p>
                    </div>
                </div>

            </div>
          </div>
        </FadeIn>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 hide-scrollbar">
             <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${filter === 'all' ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
             >
                All Images
             </button>
             <button 
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
             >
                Pending <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">{stats.pending}</span>
             </button>
             <button 
                onClick={() => setFilter('retouch')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${filter === 'retouch' ? 'bg-yellow-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
             >
                Needs Retouch <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">{stats.retouch}</span>
             </button>
             <button 
                onClick={() => setFilter('approved')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${filter === 'approved' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
             >
                Approved <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">{stats.approved}</span>
             </button>
        </div>

        {/* Image Grid */}
        {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gray-300" size={32}/></div>
        ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item, i) => (
                    <FadeIn key={item.id} delay={i * 50}>
                        <QACard item={item} onAction={handleAction} />
                    </FadeIn>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No images found</h3>
                <p className="text-gray-500 text-sm">Try changing the filter or upload more images.</p>
                <button onClick={() => setFilter('all')} className="mt-4 text-purple-600 font-bold text-xs hover:underline">Clear Filters</button>
            </div>
        )}

      </div>
    </div>
  );
};
