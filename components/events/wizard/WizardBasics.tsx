
import React from 'react';
import { Sparkles } from 'lucide-react';
import { WizardState, CATEGORIES } from './types';

interface WizardBasicsProps {
  data: WizardState;
  updateData: (updates: Partial<WizardState>) => void;
}

export const WizardBasics: React.FC<WizardBasicsProps> = ({ data, updateData }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-serif font-bold mb-6">Event Basics</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Event Title</label>
          <input 
            type="text" 
            value={data.title}
            onChange={(e) => updateData({ title: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all font-serif text-lg"
            placeholder="e.g. Summer Collection Launch"
          />
          {data.titleSuggestions && data.titleSuggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 animate-in fade-in slide-in-from-top-2">
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
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Description</label>
          <textarea 
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all h-32 resize-none"
            placeholder="Tell guests what to expect..."
          />
        </div>

        <div className="space-y-2">
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

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Target Audience</label>
          <input 
            type="text" 
            value={data.targetAudience}
            onChange={(e) => updateData({ targetAudience: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
            placeholder="e.g. Industry Professionals, Buyers, Media"
          />
        </div>
      </div>
    </div>
  );
};
