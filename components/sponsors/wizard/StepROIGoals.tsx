
import React from 'react';
import { Target, Users, Eye } from 'lucide-react';
import { Input } from '../../forms/Input';
import { DealState } from '../../../types/deal';

interface Props {
  data: DealState;
  update: (data: Partial<DealState>) => void;
}

export const StepROIGoals: React.FC<Props> = ({ data, update }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold mb-2">ROI Targets</h2>
        <p className="text-gray-500">Set measurable goals for this partnership.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
            <Eye size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">Brand Awareness</h3>
          <p className="text-sm text-gray-500 mb-6">Target total impressions across event, social, and web.</p>
          <Input
            label="Target Impressions"
            type="number"
            placeholder="e.g. 1,000,000"
            value={data.targetImpressions}
            onChange={(e) => update({ targetImpressions: parseInt(e.target.value) })}
            className="bg-gray-50"
          />
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
            <Target size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">Lead Generation</h3>
          <p className="text-sm text-gray-500 mb-6">Target number of qualified leads captured at event.</p>
          <Input
            label="Target Leads"
            type="number"
            placeholder="e.g. 500"
            value={data.targetLeads}
            onChange={(e) => update({ targetLeads: parseInt(e.target.value) })}
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};
