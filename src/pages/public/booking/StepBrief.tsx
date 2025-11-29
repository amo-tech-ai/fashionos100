import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight, Wand2, Loader2, Sparkles, Tag, Palette, Lightbulb, BookOpen, RefreshCw } from 'lucide-react';
import { Textarea } from '../../../components/forms/Textarea';
import { getUserBrand, getBrandProfile } from '../../../lib/brand-service';
import { FullBrandProfile } from '../../../types/brand';
import { useToast } from '../../../components/Toast';
import { useBookingAI } from '../../../hooks/useBookingAI';

interface AIAnalysis {
  keywords: string[];
  mood: string;
  visual_style?: string;
}

export const StepBrief: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { polishBrief, loading: aiLoading } = useBookingAI();
  
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  
  // Brand Profile Integration
  const [brandProfile, setBrandProfile] = useState<FullBrandProfile | null>(null);
  const [loadingBrand, setLoadingBrand] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
        try {
            const brandId = await getUserBrand();
            if (brandId) {
                const profile = await getBrandProfile(brandId);
                setBrandProfile(profile);
            }
        } catch (e) {
            console.error("Error loading brand:", e);
        } finally {
            setLoadingBrand(false);
        }
    };
    fetchBrand();
  }, []);

  // Auto-fill logic: Use brand info if available, otherwise default
  useEffect(() => {
    if (loadingBrand) return;

    // Only auto-fill if brief is currently empty
    if (!state.brief || state.brief.trim() === '') {
        if (brandProfile) {
            const visualTone = brandProfile.visuals?.moods?.join(', ') || 'Modern';
            const identity = brandProfile.identity?.core_description || '';
            const suggestion = `Shoot Goal: Align with our brand identity. \n\nContext: "${identity}"\n\nVisual Direction: ${visualTone} aesthetics. We need high-quality assets for ${state.category} use.`;
            updateState({ brief: suggestion });
            toast("Brief pre-filled from your Brand DNA", "success");
        } else {
            // Default suggestion based on category/style
            const defaultSuggestion = `I need a professional ${state.category} shoot with a ${state.style} style.\n\nKey requirements:\n- Focus on product details and texture\n- Lighting should be clean and professional\n- We need around ${state.shotCount} final images`;
            updateState({ brief: defaultSuggestion });
        }
    }
  }, [loadingBrand, brandProfile, state.category, state.style]);

  const applyBrandVoice = () => {
      if (!brandProfile) return;
      
      const visualTone = brandProfile.visuals?.moods?.join(', ') || '';
      const identity = brandProfile.identity?.core_description || '';
      const colors = brandProfile.visuals?.colors?.join(', ') || '';
      
      // Construct a prompt-ready addition
      const brandContext = `\n\n[Brand Context]: Align with our brand identity: "${identity}". Visual Mood: ${visualTone}. Colors: ${colors}.`;
      
      updateState({ brief: (state.brief || '') + brandContext });
      toast("Brand DNA applied to brief!", "success");
  };

  const handlePolish = async () => {
    if (!state.brief || state.brief.length < 5) return;
    
    try {
      const result = await polishBrief(state.brief, brandProfile || undefined);
      
      if (result && result.polished_text) {
        updateState({ brief: result.polished_text });
        setAiAnalysis({
          keywords: result.keywords || [],
          mood: result.mood || '',
          visual_style: result.visual_style
        });
        toast("Brief polished for clarity and detail.", "success");
      } else {
        toast("Failed to polish brief. Please try again.", "error");
      }
    } catch (error) {
      console.error("Polish failed", error);
      toast("AI service error.", "error");
    }
  };

  return (
    <FadeIn>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-serif font-bold mb-4">Creative Brief</h1>
        <p className="text-gray-500 text-lg mb-10">
          Describe your vision, mood, lighting preference, and any specific details.
        </p>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
            <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
                   Instructions
                </label>
                <div className="flex gap-2">
                    {brandProfile ? (
                        <button 
                            onClick={applyBrandVoice}
                            className="text-[10px] font-bold uppercase tracking-widest text-gray-600 flex items-center gap-1 hover:text-black transition-colors bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200"
                            title="Re-inject Brand Profile settings"
                        >
                            <BookOpen size={12} /> Re-Apply DNA
                        </button>
                    ) : (
                        <button 
                            onClick={() => {
                                const defaultSuggestion = `I need a professional ${state.category} shoot with a ${state.style} style.\n\nKey requirements:\n- Focus on product details and texture\n- Lighting should be clean and professional\n- We need around ${state.shotCount} final images`;
                                updateState({ brief: defaultSuggestion });
                            }}
                             className="text-[10px] font-bold uppercase tracking-widest text-gray-600 flex items-center gap-1 hover:text-black transition-colors bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200"
                        >
                            <RefreshCw size={12} /> Use Template
                        </button>
                    )}
                    <button 
                        onClick={handlePolish}
                        disabled={aiLoading || !state.brief}
                        className="text-[10px] font-bold uppercase tracking-widest text-purple-600 flex items-center gap-1 hover:text-purple-800 transition-colors disabled:opacity-50 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100"
                    >
                        {aiLoading ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                        {aiLoading ? 'Improving...' : 'AI Improve Clarity'}
                    </button>
                </div>
            </div>

            <Textarea 
                value={state.brief}
                onChange={(e) => updateState({ brief: e.target.value })}
                className="h-64 bg-gray-50 text-base leading-relaxed"
                placeholder="e.g. I want a dark, moody aesthetic similar to Balenciaga's latest campaign. High contrast lighting, neon accents, and focus on the texture of the fabrics."
            />
            
            <div className="mt-4 flex justify-between items-center text-xs text-gray-400 border-b border-gray-100 pb-4 mb-4">
                <span>Min 5 characters for AI Polish</span>
                <span>{state.brief.length} chars</span>
            </div>

            {/* AI Suggestions Panel */}
            {aiAnalysis && (
              <div className="animate-in fade-in slide-in-from-top-2 bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={16} className="text-purple-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700">AI Creative Direction</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {aiAnalysis.mood && (
                    <div className="bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                      <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                         <Lightbulb size={10} /> Mood
                      </div>
                      <p className="text-sm font-medium text-gray-900">{aiAnalysis.mood}</p>
                    </div>
                  )}
                  {aiAnalysis.visual_style && (
                    <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                      <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                         <Palette size={10} /> Visual Style
                      </div>
                      <p className="text-sm font-medium text-gray-900">{aiAnalysis.visual_style}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {aiAnalysis.keywords.map((keyword, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-white text-gray-600 text-xs font-medium border border-gray-200 flex items-center gap-1 shadow-sm">
                      <Tag size={10} className="text-gray-400" /> {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>

        <div className="flex justify-end">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/start-project/shot-builder')}
            disabled={state.brief.length < 5}
          >
            Next: Shot List <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};