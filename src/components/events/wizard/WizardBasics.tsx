
import React, { useState } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import { Input } from '../../forms/Input';
import { WizardState, CATEGORIES } from './types';
import { supabaseUrl, supabaseAnonKey } from '../../../lib/supabase';
import { LoadingSpinner } from '../../LoadingSpinner';

interface WizardBasicsProps {
  data: WizardState;
  updateData: (updates: Partial<WizardState>) => void;
}

export const WizardBasics: React.FC<WizardBasicsProps> = ({ data, updateData }) => {
  const [isRefining, setIsRefining] = useState(false);

  const handleRefine = async () => {
    if (!data.description) return;
    setIsRefining(true);
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/polish-brief`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({ 
            brief: data.description,
            type: 'marketing'
        })
      });

      if (!response.ok) throw new Error('AI service unavailable');
      
      const resData = await response.json();
      if (resData.text) {
        updateData({ description: resData.text });
      }
    } catch (error) {
      console.error("Refine failed", error);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-serif font-bold mb-6">Event Basics</h2>
      <div className="space-y-6">
        <Input 
          label="Event Title"
          value={data.title}
          onChange={(e) => updateData({ title: e.target.value })}
          placeholder="e.g. Summer Collection Launch"
          className="font-serif text-lg"
        />
        
        {data.titleSuggestions && data.titleSuggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 -mt-4 mb-2 animate-in fade-in slide-in-from-top-2 pl-1">
            <div className="flex items-center gap-1 text-xs font-bold text-purple-600 uppercase tracking-wider mr-1">
              <Sparkles size={10} /> Ideas:
            </div>
            {data.titleSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => updateData({ title: suggestion })}
                className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs rounded-full border border-purple-100 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        
        <div className="space-y-1.5">
          <div className="flex justify-between items-end">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Description</label>
            <button 
              onClick={handleRefine}
              disabled={isRefining || !data.description}
              className="text-[10px] font-bold uppercase tracking-widest text-purple-600 flex items-center gap-1 hover:text-purple-800 transition-colors disabled:opacity-50"
            >
              {isRefining ? <LoadingSpinner size={12} /> : <Sparkles size={12} />}
              {isRefining ? 'Refining...' : 'Refine Description'}
            </button>
          </div>
          <textarea 
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            placeholder="Tell guests what to expect..."
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400 resize-none h-32"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => updateData({ category: cat })}
                className={`p-3 rounded-xl text-sm font-medium border transition-all ${data.category === cat ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <Input 
          label="Target Audience"
          value={data.targetAudience}
          onChange={(e) => updateData({ targetAudience: e.target.value })}
          placeholder="e.g. Industry Professionals, Buyers, Media"
        />
      </div>
    </div>
  );
}
