
import React from 'react';
import { CheckCircle2, DollarSign } from 'lucide-react';
import { Input } from '../../forms/Input';
import { DealState } from '../../../types/deal';

interface Props {
  data: DealState;
  update: (data: Partial<DealState>) => void;
}

const PACKAGES = [
  { id: 'Title', price: 150000, features: ['Headline Branding', 'Runway Intro', 'All Media'] },
  { id: 'Gold', price: 75000, features: ['VIP Lounge', 'Backstage Access', 'Social Media'] },
  { id: 'Silver', price: 25000, features: ['Logo on Wall', 'Gift Bag Item', 'Website Link'] },
];

export const StepPackage: React.FC<Props> = ({ data, update }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold mb-2">Package Negotiation</h2>
        <p className="text-gray-500">Select a tier and customize the valuation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {PACKAGES.map((pkg) => (
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
