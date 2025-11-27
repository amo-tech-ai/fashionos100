
import React, { useState, useMemo } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, RefreshCw, ChevronLeft, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../components/FadeIn';
import { QACard } from '../../components/studio/QACard';
import { QAImage, QAStatus } from '../../types/qa';
import { Button } from '../../components/Button';

// Mock Data generated "by Gemini"
const MOCK_RESULTS: QAImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600',
    name: 'Look 01 - Portrait',
    overall_score: 98,
    grade: 'A',
    metrics: { sharpness: 99, lighting: 95, framing: 100, cleanliness: 98, color_accuracy: 97 },
    detected_issues: [],
    status: 'pending'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=600',
    name: 'Look 01 - Detail',
    overall_score: 85,
    grade: 'B',
    metrics: { sharpness: 92, lighting: 75, framing: 90, cleanliness: 88, color_accuracy: 80 },
    detected_issues: ['Uneven Lighting', 'Mild Color Cast'],
    status: 'pending'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600',
    name: 'Look 02 - Full Body',
    overall_score: 65,
    grade: 'C',
    metrics: { sharpness: 60, lighting: 70, framing: 85, cleanliness: 60, color_accuracy: 70 },
    detected_issues: ['Soft Focus', 'Background Clutter', 'Wrinkles'],
    status: 'pending'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600',
    name: 'Look 03 - Studio',
    overall_score: 92,
    grade: 'A',
    metrics: { sharpness: 95, lighting: 90, framing: 95, cleanliness: 90, color_accuracy: 90 },
    detected_issues: ['Minor Dust'],
    status: 'pending'
  }
];

export const VisualQAPage: React.FC = () => {
  const [items, setItems] = useState<QAImage[]>(MOCK_RESULTS);

  const handleAction = (id: string, action: 'approve' | 'retouch' | 'pending') => {
    let status: QAStatus = 'pending';
    if (action === 'approve') status = 'approved';
    else if (action === 'retouch') status = 'retouch';
    else if (action === 'pending') status = 'pending';

    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  };

  // Derived Stats
  const stats = useMemo(() => {
    const total = items.length;
    const approved = items.filter(i => i.status === 'approved').length;
    const retouch = items.filter(i => i.status === 'retouch').length;
    const avgScore = Math.round(items.reduce((acc, i) => acc + i.overall_score, 0) / total);
    
    // AI Insight logic
    const issues = items.flatMap(i => i.detected_issues);
    const mostCommonIssue = issues.sort((a,b) => 
        issues.filter(v => v===a).length - issues.filter(v => v===b).length
    ).pop();

    return { total, approved, retouch, avgScore, mostCommonIssue };
  }, [items]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-20 font-sans">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
                <Link to="/dashboard/studio" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <ChevronLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
                        AI Quality Check <Sparkles size={18} className="text-purple-500" />
                    </h1>
                    <p className="text-xs text-gray-500">Gemini Vision Analysis • Batch #2025-SHOOT-A</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Timeline Impact</p>
                    <p className={`text-sm font-bold ${stats.retouch > 2 ? 'text-amber-600' : 'text-green-600'}`}>
                        {stats.retouch > 2 ? '+2 Days Delivery' : 'On Schedule'}
                    </p>
                </div>
                <Button variant="primary" size="sm">Export Report</Button>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8">
        
        {/* Summary HUD */}
        <FadeIn>
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-10 flex flex-col md:flex-row justify-between items-center gap-8">
            
            <div className="flex gap-8 text-center md:text-left">
                <div>
                    <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Avg Score</p>
                    <div className="text-5xl font-serif font-bold">{stats.avgScore}</div>
                </div>
                <div className="w-px bg-white/10 h-16 hidden md:block" />
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    <div className="text-left">
                        <p className="text-gray-400 text-[10px] uppercase font-bold">Ready</p>
                        <p className="text-2xl font-bold text-green-400">{stats.approved}</p>
                    </div>
                    <div className="text-left">
                        <p className="text-gray-400 text-[10px] uppercase font-bold">Retouch</p>
                        <p className="text-2xl font-bold text-yellow-400">{stats.retouch}</p>
                    </div>
                    <div className="text-left">
                        <p className="text-gray-400 text-[10px] uppercase font-bold">Pending</p>
                        <p className="text-2xl font-bold text-white">{stats.total - stats.approved - stats.retouch}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 max-w-md w-full flex items-start gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-300 shrink-0">
                    <Zap size={18} />
                </div>
                <div>
                    <p className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-1">AI Insight</p>
                    <p className="text-sm text-gray-200 leading-relaxed">
                        {stats.mostCommonIssue 
                            ? `High frequency of "${stats.mostCommonIssue}" detected. Recommend adjusting lighting setup for next batch.` 
                            : "Quality looks consistent across the board. Ready for client review."}
                    </p>
                </div>
            </div>

          </div>
        </FadeIn>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, i) => (
                <FadeIn key={item.id} delay={i * 50}>
                    <QACard item={item} onAction={(id, action) => handleAction(id, action)} />
                </FadeIn>
            ))}
        </div>

      </div>
    </div>
  );
};
