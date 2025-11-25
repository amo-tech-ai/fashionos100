
import React, { useState } from 'react';
import { Sparkles, Building2, Calendar } from 'lucide-react';
import { Input } from '../../forms/Input';
import { Select } from '../../forms/Select';
import { Textarea } from '../../forms/Textarea';
import { Button } from '../../Button';
import { LoadingSpinner } from '../../LoadingSpinner';
import { DealState } from '../../../types/deal';
import { supabaseUrl, supabaseAnonKey } from '../../../lib/supabase';

interface Props {
  data: DealState;
  update: (data: Partial<DealState>) => void;
}

export const StepQualification: React.FC<Props> = ({ data, update }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock Options (In real app, fetch from Supabase)
  const sponsors = ["Luxe Beauty", "TechFlow", "Hydra Water", "Urban Florals"];
  const events = ["Paris Fashion Week SS25", "NY Designer Series", "Milan Digital Showcase"];

  const handleAnalyzeFit = async () => {
    if (!data.sponsorId || !data.eventId) return;
    setIsAnalyzing(true);
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/sponsor-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          action: 'lead-score',
          sponsorName: data.sponsorId,
          sponsorIndustry: 'Luxury Retail', // Mock context
          eventDetails: data.eventId
        })
      });
      const res = await response.json();
      // Parse AI response logic here
      update({ 
        leadScore: 85, // Mock result
        leadNotes: res.reasoning || "High brand alignment detected based on audience demographics."
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold mb-2">Lead Qualification</h2>
        <p className="text-gray-500">Connect a sponsor to an event and assess the fit.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Select Sponsor"
            options={sponsors}
            value={data.sponsorId}
            onChange={(e) => update({ sponsorId: e.target.value })}
            className="bg-gray-50"
          />
          <Select
            label="Select Event"
            options={events}
            value={data.eventId}
            onChange={(e) => update({ eventId: e.target.value })}
            className="bg-gray-50"
          />
        </div>

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
            <div className="mb-4 flex items-center gap-4 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
              <div className="flex flex-col items-center justify-center bg-white w-16 h-16 rounded-full shadow-sm border border-purple-100">
                <span className="text-xl font-bold text-purple-700">{data.leadScore}</span>
                <span className="text-[10px] text-gray-400 uppercase">Score</span>
              </div>
              <p className="text-sm text-gray-700 italic flex-1">"{data.leadNotes}"</p>
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
