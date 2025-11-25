
import React from 'react';
import { MoreHorizontal, DollarSign, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { EventSponsor } from '../../types/sponsorship';

interface SponsorCardProps {
  sponsor: EventSponsor;
  onClick?: () => void;
}

export const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, onClick }) => {
  const statusColors = {
    'Lead': 'bg-gray-100 text-gray-600',
    'Contacted': 'bg-blue-50 text-blue-600',
    'Negotiating': 'bg-amber-50 text-amber-600',
    'Signed': 'bg-purple-50 text-purple-600',
    'Paid': 'bg-green-50 text-green-600',
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden">
            {sponsor.sponsor?.logo_url ? (
              <img src={sponsor.sponsor.logo_url} alt={sponsor.sponsor.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-bold text-gray-400">{sponsor.sponsor?.name.substring(0, 2).toUpperCase()}</span>
            )}
          </div>
          <div>
            <h4 className="font-serif font-bold text-gray-900">{sponsor.sponsor?.name}</h4>
            <span className="text-xs text-gray-500">{sponsor.sponsor?.industry}</span>
          </div>
        </div>
        <button className="text-gray-300 hover:text-gray-600">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Level</span>
          <span className="font-bold text-fashion-black">{sponsor.level}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Value</span>
          <span className="font-bold text-green-600 flex items-center gap-1">
            <DollarSign size={12} />{sponsor.cash_value.toLocaleString()}
          </span>
        </div>

        <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${statusColors[sponsor.status]}`}>
            {sponsor.status}
          </span>
          {sponsor.status === 'Signed' && !sponsor.contract_url && (
             <span className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
               <AlertCircle size={10} /> Contract Pending
             </span>
          )}
        </div>
      </div>
    </div>
  );
};
