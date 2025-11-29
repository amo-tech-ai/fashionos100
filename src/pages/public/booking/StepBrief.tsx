
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight, Wand2, Loader2 } from 'lucide-react';
import { Textarea } from '../../../components/forms/Textarea';
import { supabaseUrl, supabaseAnonKey } from '../../../lib/supabase';

export const StepBrief: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();
  const [isPolishing, setIsPolishing] = useState(false);

  const handlePolish = async () => {
    if (!state.brief || state.brief.length < 10) return;
    setIsPolishing(true);
    
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/polish-brief`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({ 
            brief: state.brief,
            type: 'creative' 
        })
      });

      if (!response.ok) throw new Error('AI service unavailable');
      
      const data = await response.json();
      if (data.text) {
        updateState({ brief: data.text });
      }
    } catch (error) {
      console.error("Polish failed", error);
      // Optional: Show error toast
    } finally {
      setIsPolishing(false);
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
                <button 
                    onClick={handlePolish}
                    disabled={isPolishing || !state.brief}
                    className="text-[10px] font-bold uppercase tracking-widest text-purple-600 flex items-center gap-1 hover:text-purple-800 transition-colors disabled:opacity-50"
                >
                    {isPolishing ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                    {isPolishing ? 'Polishing...' : 'AI Polish'}
                </button>
            </div>

            <Textarea 
                value={state.brief}
                onChange={(e) => updateState({ brief: e.target.value })}
                className="h-64 bg-gray-50 text-base leading-relaxed"
                placeholder="e.g. I want a dark, moody aesthetic similar to Balenciaga's latest campaign. High contrast lighting, neon accents, and focus on the texture of the fabrics."
            />
            
            <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
                <span>Min 10 characters for AI Polish</span>
                <span>{state.brief.length} chars</span>
            </div>
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
