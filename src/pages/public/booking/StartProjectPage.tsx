
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Video, Layers, Sparkles, Globe, Loader2, Search, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { supabaseUrl, supabaseAnonKey } from '../../../lib/supabase';
import { ServiceType } from '../../../lib/pricing';
import { FullBrandProfile } from '../../../types/brand';

const SERVICES: { id: ServiceType; title: string; desc: string; icon: any }[] = [
  { 
    id: 'photography', 
    title: 'Photography', 
    desc: 'High-end still life and on-model.',
    icon: Camera
  },
  { 
    id: 'video', 
    title: 'Video', 
    desc: 'Cinematic 4K and social reels.',
    icon: Video
  },
  { 
    id: 'hybrid', 
    title: 'Hybrid', 
    desc: 'Photo + Video package.',
    icon: Layers
  }
];

export const StartProjectPage: React.FC = () => {
  const { updateState } = useBooking();
  const navigate = useNavigate();
  
  // AI State
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!websiteUrl) return;
    setIsAnalyzing(true);
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/generate-brand-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          websiteUrl,
          mode: 'wizard_analysis'
        })
      });

      const result = await response.json();
      if (result.success && result.data) {
        setAnalysisResult(result.data);
        
        // 1. Construct Full Brand Profile for context
        // (We mock the ID/Company structure since this is a guest flow)
        const brandProfile: FullBrandProfile = {
           company: { id: 'guest', name: result.data.brand_name || 'My Brand', owner_id: 'guest', created_at: new Date().toISOString() },
           identity: result.data.identity,
           visuals: result.data.visual_identity,
           recommendations: null // Recommendations generated later
        };

        // 2. Pre-fill context with Smart Defaults
        updateState({
            category: result.data.detected_category,
            style: result.data.recommended_style,
            brandProfile: brandProfile, // Save to context
            // Pre-inject brief with AI findings
            brief: `Brand Identity: ${result.data.identity?.core_description}\nVisual Mood: ${result.data.visual_identity?.mood?.join(', ')}`
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectService = (service: ServiceType) => {
    updateState({ service });
    navigate('/start-project/category');
  };

  return (
    <FadeIn>
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-purple-100">
                <Sparkles size={12} /> AI-Powered Booking
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-gray-900">
                Let's build your shoot.
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                We can analyze your brand to recommend the perfect creative direction, or you can build a custom package from scratch.
            </p>
        </div>

        {/* Smart Input Section */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-xl shadow-purple-900/5 mb-16 relative overflow-hidden">
            {/* Decorative Blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-60 pointer-events-none" />

            {!analysisResult ? (
                <div className="relative z-10">
                    <label className="text-sm font-bold text-gray-900 mb-3 block flex items-center gap-2">
                        <Globe size={16} className="text-purple-600" /> Import Brand DNA (Optional)
                    </label>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="url" 
                                placeholder="e.g. www.yourbrand.com or instagram.com/brand"
                                value={websiteUrl}
                                onChange={(e) => setWebsiteUrl(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                            />
                        </div>
                        <Button 
                            size="lg" 
                            className="h-[58px] px-8 shrink-0 bg-gray-900 hover:bg-black text-white shadow-lg shadow-gray-900/20"
                            onClick={handleAnalyze}
                            disabled={!websiteUrl || isAnalyzing}
                        >
                            {isAnalyzing ? <Loader2 className="animate-spin" /> : <Sparkles size={18} className="mr-2" />}
                            {isAnalyzing ? 'Scanning...' : 'Analyze Brand'}
                        </Button>
                    </div>
                    <p className="text-xs text-gray-400 mt-3 ml-1">
                        We use Google Search to find your visual style, product types, and audience.
                    </p>
                </div>
            ) : (
                <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1">Analysis Complete</h3>
                            <p className="text-green-600 font-medium flex items-center gap-2 text-sm">
                                <CheckCircle2 size={16} /> Brand DNA Extracted
                            </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setAnalysisResult(null)} className="text-gray-400">Reset</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                            <span className="text-[10px] font-bold uppercase text-purple-400 tracking-wider">Category</span>
                            <p className="text-lg font-bold text-purple-900 capitalize">{analysisResult.detected_category}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <span className="text-[10px] font-bold uppercase text-blue-400 tracking-wider">Style</span>
                            <p className="text-lg font-bold text-blue-900 capitalize">{analysisResult.recommended_style}</p>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
                            <span className="text-[10px] font-bold uppercase text-pink-400 tracking-wider">Vibe</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {analysisResult.visual_identity?.mood?.slice(0,2).map((m: string) => (
                                    <span key={m} className="text-xs font-medium text-pink-800 bg-white/50 px-2 py-0.5 rounded">{m}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <Sparkles size={16} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Recommendations Applied</p>
                            <p className="text-xs text-gray-500">We've pre-configured the wizard based on your brand.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Service Selection */}
        <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 text-center">Or Select a Service Manually</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SERVICES.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => handleSelectService(s.id)}
                        className="group flex flex-col items-center text-center p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl hover:-translate-y-1 transition-all bg-white"
                    >
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                            <s.icon size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-2 text-gray-900 group-hover:text-purple-700 transition-colors">{s.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                    </button>
                ))}
            </div>
        </div>

      </div>
    </FadeIn>
  );
};
