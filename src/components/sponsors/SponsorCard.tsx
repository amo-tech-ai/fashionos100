
import React from 'react';
import { MoreHorizontal, DollarSign, AlertCircle, CalendarDays } from 'lucide-react';
import { EventSponsor } from '../../types/sponsorship';
import { StatusBadge } from '../StatusBadge';

interface SponsorCardProps {
  sponsor: EventSponsor;
  onClick?: () => void;
}

export const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, onClick }) => {
  const totalValue = sponsor.cash_value + (sponsor.in_kind_value || 0);

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
            <h4 className="font-serif font-bold text-gray-900 line-clamp-1">{sponsor.sponsor?.name}</h4>
            <span className="text-xs text-gray-500">{sponsor.sponsor?.industry}</span>
          </div>
        </div>
        <button className="text-gray-300 hover:text-gray-600">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 p-2 rounded-lg">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Total Value</p>
          <p className="text-sm font-bold text-green-600 flex items-center gap-0.5">
            <DollarSign size={12} strokeWidth={3} />{totalValue.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Tier</p>
          <p className="text-sm font-bold text-gray-900">{sponsor.level}</p>
        </div>
      </div>

      {sponsor.active_events_count !== undefined && sponsor.active_events_count > 0 && (
        <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
          <CalendarDays size={14} />
          <span>{sponsor.active_events_count} Active Events</span>
        </div>
      )}

      <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
        <StatusBadge status={sponsor.status} />
        {sponsor.status === 'Signed' && !sponsor.contract_url && (
            <span className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
              <AlertCircle size={10} /> Contract Pending
            </span>
        )}
      </div>
    </div>
  );
};
