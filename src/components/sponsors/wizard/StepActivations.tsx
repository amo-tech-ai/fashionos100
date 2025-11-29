
import React, { useState } from 'react';
import { Plus, X, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { Input } from '../../forms/Input';
import { Button } from '../../Button';
import { DealState, ActivationItem } from '../../../types/deal';
import { supabaseUrl, supabaseAnonKey } from '../../../lib/supabase';
import { LoadingSpinner } from '../../LoadingSpinner';
import { FadeIn } from '../../FadeIn';

interface Props {
  data: DealState;
  update: (data: Partial<DealState>) => void;
}

export const StepActivations: React.FC<Props> = ({ data, update }) => {
  const [newItem, setNewItem] = useState<ActivationItem>({ type: '', description: '', location: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleAdd = () => {
    if (!newItem.type) return;
    update({ activations: [...data.activations, newItem] });
    setNewItem({ type: '', description: '', location: '' });
  };

  const handleRemove = (idx: number) => {
    const next = [...data.activations];
    next.splice(idx, 1);
    update({ activations: next });
  };

  const handleAiSuggest = async () => {
    setIsGenerating(true);
    setSuggestions([]);
    try {
        const response = await fetch(`${supabaseUrl}/functions/v1/sponsor-ai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${supabaseAnonKey}`
            },
            body: JSON.stringify({
                action: 'activation-ideas',
                sponsorName: data.sponsorName || 'Sponsor',
                sponsorIndustry: data.sponsorIndustry || 'General',
                eventDetails: data.eventName || 'Event'
            })
        });
        const res = await response.json();
        if (res.ideas) {
            setSuggestions(res.ideas);
        }
    } catch(e) {
        console.error(e);
    } finally {
        setIsGenerating(false);
    }
  };

  const acceptSuggestion = (idea: any) => {
      update({ 
          activations: [...data.activations, {
              type: idea.title,
              description: idea.description,
              location: 'TBD'
          }] 
      });
      setSuggestions(suggestions.filter(s => s !== idea));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold mb-2">Activation Planning</h2>
        <p className="text-gray-500">Define physical and digital brand moments.</p>
      </div>

      {/* Main Card */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Planned Activations</h3>
            <Button variant="ghost" size="sm" onClick={handleAiSuggest} disabled={isGenerating} className="text-purple-600 bg-purple-50 hover:bg-purple-100">
                {isGenerating ? <LoadingSpinner size={14} /> : <Sparkles size={14} className="mr-2" />}
                Get AI Ideas
            </Button>
        </div>

        {/* Suggestion Panel */}
        {suggestions.length > 0 && (
            <FadeIn className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                {suggestions.map((idea, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group" onClick={() => acceptSuggestion(idea)}>
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-sm text-gray-900">{idea.title}</h4>
                            <Plus size={16} className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{idea.description}</p>
                    </div>
                ))}
            </FadeIn>
        )}

        <div className="space-y-4 mb-8">
          {data.activations.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 group">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-gray-900">{item.type}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin size={12} /> {item.location}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <button onClick={() => handleRemove(idx)} className="text-gray-400 hover:text-red-500 p-1">
                <X size={16} />
              </button>
            </div>
          ))}
          {data.activations.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
              No activations added yet.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <Input
            placeholder="Type (e.g. Booth)"
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            className="bg-white"
          />
          <Input
            placeholder="Location (e.g. Foyer)"
            value={newItem.location}
            onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
            className="bg-white"
          />
          <div className="flex gap-2">
             <Input
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="bg-white flex-1"
             />
             <Button onClick={handleAdd} className="mt-1.5 h-[46px] w-[46px] flex items-center justify-center p-0">
                <Plus size={20} />
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
