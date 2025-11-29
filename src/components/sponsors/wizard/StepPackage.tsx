
import React, { useState } from 'react';
import { CheckCircle2, DollarSign, Sparkles } from 'lucide-react';
import { Input } from '../../forms/Input';
import { Button } from '../../Button';
import { LoadingSpinner } from '../../LoadingSpinner';
import { DealState } from '../../../types/deal';
import { supabaseUrl, supabaseAnonKey } from '../../../lib/supabase';

interface Props {
  data: DealState;
  update: (data: Partial<DealState>) => void;
}

const DEFAULT_PACKAGES = [
  { id: 'Title', price: 150000, features: ['Headline Branding', 'Runway Intro', 'All Media'] },
  { id: 'Gold', price: 75000, features: ['VIP Lounge', 'Backstage Access', 'Social Media'] },
  { id: 'Silver', price: 25000, features: ['Logo on Wall', 'Gift Bag Item', 'Website Link'] },
];

export const StepPackage: React.FC<Props> = ({ data, update }) => {
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleAiSuggest = async () => {
    setIsSuggesting(true);
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/sponsor-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          action: 'recommend-packages',
          sponsorName: data.sponsorName || 'Sponsor',
          sponsorIndustry: data.sponsorIndustry || 'General',
          eventDetails: data.eventName || 'Event'
        })
      });
      const res = await response.json();
      
      if (res.recommendations) {
        // Transform AI response to package format
        const aiPackages = res.recommendations.map((rec: any) => ({
          id: rec.tier_name,
          price: rec.price,
          features: rec.features,
          isAi: true
        }));
        setPackages(aiPackages);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col items-center text-center mb-8">
        <h2 className="text-3xl font-serif font-bold mb-2">Package Negotiation</h2>
        <p className="text-gray-500 mb-4">Select a tier and customize the valuation.</p>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleAiSuggest} 
          disabled={isSuggesting}
          className="text-purple-600 bg-purple-50 hover:bg-purple-100"
        >
          {isSuggesting ? <LoadingSpinner size={14} /> : <Sparkles size={14} className="mr-2" />}
          Get AI Recommendations
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {packages.map((pkg) => (
          <div 
            key={pkg.id}
            onClick={() => update({ packageTier: pkg.id as any, cashValue: pkg.price })}
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden ${
              data.packageTier === pkg.id 
                ? 'border-purple-500 bg-purple-50 shadow-lg' 
                : 'border-gray-100 bg-white hover:border-purple-200 hover:shadow-md'
            }`}
          >
            {data.packageTier === pkg.id && (
              <div className="absolute top-4 right-4 text-purple-600">
                <CheckCircle2 size={24} />
              </div>
            )}
            {(pkg as any).isAi && (
               <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-500 h-1" />
            )}
            <h3 className="text-xl font-serif font-bold mb-1">{pkg.id}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-4">${pkg.price.toLocaleString()}</p>
            <ul className="space-y-2">
              {pkg.features.map((f, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg mb-6">Deal Valuation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Cash Value ($)"
            type="number"
            value={data.cashValue}
            onChange={(e) => update({ cashValue: parseFloat(e.target.value) })}
            className="bg-gray-50"
          />
          <Input
            label="In-Kind Value ($)"
            type="number"
            placeholder="e.g. Product value"
            value={data.inKindValue}
            onChange={(e) => update({ inKindValue: parseFloat(e.target.value) })}
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};
