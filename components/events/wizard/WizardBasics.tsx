
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Input } from '../../forms/Input';
import { Textarea } from '../../forms/Textarea';
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
        
        <Textarea 
          label="Description"
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
          placeholder="Tell guests what to expect..."
          className="h-32 resize-none"
        />

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
};
