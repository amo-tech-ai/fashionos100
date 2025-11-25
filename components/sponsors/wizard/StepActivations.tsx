
import React, { useState } from 'react';
import { Plus, X, MapPin, Sparkles } from 'lucide-react';
import { Input } from '../../forms/Input';
import { Button } from '../../Button';
import { DealState, ActivationItem } from '../../../types/deal';
import { supabaseUrl, supabaseAnonKey } from '../../../lib/supabase';
import { LoadingSpinner } from '../../LoadingSpinner';

interface Props {
  data: DealState;
  update: (data: Partial<DealState>) => void;
}

export const StepActivations: React.FC<Props> = ({ data, update }) => {
  const [newItem, setNewItem] = useState<ActivationItem>({ type: '', description: '', location: '' });
  const [isGenerating, setIsGenerating] = useState(false);

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
    try {
        const response = await fetch(`${supabaseUrl}/functions/v1/sponsor-ai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${supabaseAnonKey}`
            },
            body: JSON.stringify({
                action: 'activation-ideas',
                sponsorName: data.sponsorId,
                sponsorIndustry: 'Fashion',
                eventDetails: data.eventId
            })
        });
        const res = await response.json();
        if (res.ideas) {
            const aiActivations = res.ideas.map((idea: any) => ({
                type: idea.title,
                description: idea.description,
                location: 'TBD'
            }));
            update({ activations: [...data.activations, ...aiActivations] });
        }
    } catch(e) {
        console.error(e);
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold mb-2">Activation Planning</h2>
        <p className="text-gray-500">Define physical and digital brand moments.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Planned Activations</h3>
            <Button variant="ghost" size="sm" onClick={handleAiSuggest} disabled={isGenerating} className="text-purple-600">
                {isGenerating ? <LoadingSpinner size={14} /> : <Sparkles size={14} className="mr-2" />}
                AI Suggestions
            </Button>
        </div>

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
