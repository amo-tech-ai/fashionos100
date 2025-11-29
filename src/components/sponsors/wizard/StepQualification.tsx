
import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Input } from '../../forms/Input';
import { Select, SelectOption } from '../../forms/Select';
import { Textarea } from '../../forms/Textarea';
import { Button } from '../../Button';
import { LoadingSpinner } from '../../LoadingSpinner';
import { DealState } from '../../../types/deal';
import { supabase } from '../../../lib/supabase';
import { aiService } from '../../../lib/ai-service';

interface Props {
  data: DealState;
  update: (data: Partial<DealState>) => void;
}

export const StepQualification: React.FC<Props> = ({ data, update }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sponsors, setSponsors] = useState<{id: string, name: string, industry?: string}[]>([]);
  const [events, setEvents] = useState<{id: string, title: string}[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      const { data: sData } = await supabase.from('sponsor_profiles').select('id, name, industry');
      const { data: eData } = await supabase.from('events').select('id, title');
      
      setSponsors(sData || []);
      setEvents(eData || []);
      setLoadingOptions(false);
    };
    fetchOptions();
  }, []);

  const handleSponsorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const sponsor = sponsors.find(s => s.id === selectedId);
    update({ 
      sponsorId: selectedId, 
      sponsorName: sponsor?.name,
      sponsorIndustry: sponsor?.industry || data.sponsorIndustry 
    });
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const event = events.find(e => e.id === selectedId);
    update({ 
      eventId: selectedId,
      eventName: event?.title
    });
  };

  const handleAnalyzeFit = async () => {
    if (!data.sponsorId || !data.eventId) return;
    setIsAnalyzing(true);
    try {
      const result = await aiService.sponsorAgent('score-lead', {
        sponsorName: data.sponsorName || 'Unknown',
        sponsorIndustry: data.sponsorIndustry || 'General',
        eventDetails: data.eventName || 'Unknown Event'
      });
      
      if (result.success && result.data) {
        update({ 
            leadScore: result.data.score || 0, 
            leadCategory: result.data.category,
            leadNotes: result.data.reasoning || "AI Analysis complete."
        });
      } else {
        throw new Error(result.error || 'AI analysis failed');
      }
    } catch (e) {
      console.error(e);
      alert("AI Analysis failed. Please check your connection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (loadingOptions) return <div className="p-12 text-center"><LoadingSpinner /></div>;

  const sponsorOptions: SelectOption[] = sponsors.map(s => ({ label: s.name, value: s.id }));
  const eventOptions: SelectOption[] = events.map(e => ({ label: e.title, value: e.id }));

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold mb-2">Lead Qualification</h2>
        <p className="text-gray-500">Connect a sponsor to an event and assess the fit.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Select
              label="Select Sponsor"
              options={sponsorOptions}
              value={data.sponsorId}
              onChange={handleSponsorChange}
              className="bg-gray-50"
            />
          </div>
          <Select
            label="Select Event"
            options={eventOptions}
            value={data.eventId}
            onChange={handleEventChange}
            className="bg-gray-50"
          />
        </div>

        <Input
          label="Sponsor Industry"
          placeholder="e.g. Cosmetics, Automotive, Fintech"
          value={data.sponsorIndustry}
          onChange={(e) => update({ sponsorIndustry: e.target.value })}
          className="bg-gray-50"
        />

        <div className="border-t border-gray-100 pt-6">
          <div className="flex justify-between items-center mb-4">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Fit Analysis</label>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={handleAnalyzeFit} 
              disabled={isAnalyzing || !data.sponsorId || !data.eventId}
              className="text-purple-600 hover:bg-purple-50"
            >
              {isAnalyzing ? <LoadingSpinner size={14} /> : <Sparkles size={14} className="mr-2" />}
              AI Lead Score
            </Button>
          </div>
          
          {data.leadScore > 0 && (
            <div className="mb-4 flex flex-col gap-3 bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-2xl border border-purple-100 animate-in fade-in">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center bg-white w-16 h-16 rounded-full shadow-sm border border-purple-100 shrink-0 relative">
                   <span className="text-xl font-bold text-purple-700">{data.leadScore}</span>
                   <span className="text-[9px] text-gray-400 uppercase tracking-wider">Score</span>
                </div>
                
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-purple-900 text-sm">AI Fit Analysis</h4>
                      {data.leadCategory && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                           data.leadCategory === 'High' ? 'bg-green-100 text-green-700' :
                           data.leadCategory === 'Medium' ? 'bg-amber-100 text-amber-700' :
                           'bg-red-100 text-red-700'
                        }`}>
                           {data.leadCategory} Potential
                        </span>
                      )}
                   </div>
                   <p className="text-sm text-gray-600 leading-relaxed">{data.leadNotes}</p>
                </div>
              </div>
            </div>
          )}

          <Textarea
            label="Qualification Notes"
            placeholder="e.g. Budget confirmed, key decision maker interested..."
            value={data.leadNotes}
            onChange={(e) => update({ leadNotes: e.target.value })}
            className="h-32 bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};
