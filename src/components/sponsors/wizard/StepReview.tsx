
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { DealState } from '../../../types/deal';

interface Props {
  data: DealState;
}

export const StepReview: React.FC<Props> = ({ data }) => {
  const totalValue = (data.cashValue || 0) + (data.inKindValue || 0);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="text-3xl font-serif font-bold mb-2">Ready to Finalize?</h2>
        <p className="text-gray-500">Review the deal terms before saving.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Partnership</p>
              <h3 className="text-2xl font-serif font-bold">{data.sponsorName || data.sponsorId} x {data.eventName || data.eventId}</h3>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Total Value</p>
              <p className="text-2xl font-bold text-green-600">${totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Package Details</h4>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tier</span>
              <span className="font-bold">{data.packageTier}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Cash</span>
              <span className="font-bold">${data.cashValue?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">In-Kind</span>
              <span className="font-bold">${data.inKindValue?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Contract</span>
              <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-bold uppercase">{data.contractStatus}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Activations ({data.activations.length})</h4>
            <ul className="space-y-2">
              {data.activations.map((act, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  {act.type} <span className="text-gray-400 text-xs">({act.location})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="p-8 bg-gray-50 border-t border-gray-100">
           <h4 className="font-bold text-gray-900 mb-2 text-sm">Goals</h4>
           <div className="flex gap-8 text-sm">
              <div><span className="text-gray-500">Impressions:</span> <span className="font-bold">{data.targetImpressions.toLocaleString()}</span></div>
              <div><span className="text-gray-500">Leads:</span> <span className="font-bold">{data.targetLeads.toLocaleString()}</span></div>
           </div>
        </div>
      </div>
    </div>
  );
};
