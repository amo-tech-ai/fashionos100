
import React from 'react';
import { MoreHorizontal, DollarSign, AlertCircle, CalendarDays, Clock, User, ArrowRight } from 'lucide-react';
import { EventSponsor } from '../../types/sponsorship';
import { StatusBadge } from '../StatusBadge';

interface SponsorCardProps {
  sponsor: EventSponsor;
  onClick?: () => void;
  compact?: boolean; // For Kanban view
}

export const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, onClick, compact = false }) => {
  const totalValue = sponsor.cash_value + (sponsor.in_kind_value || 0);
  const sponsorData = sponsor.sponsor;
  
  // Determine Fit Score Color
  const score = sponsorData?.lead_score || 0;
  const scoreColor = score >= 80 ? 'bg-green-100 text-green-700' : score >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600';

  return (
    <div 
      onClick={onClick}
      className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group flex flex-col gap-3 relative"
    >
      {/* Header: Logo & Name */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
            {sponsorData?.logo_url ? (
              <img src={sponsorData.logo_url} alt={sponsorData.name} className="w-full h-full object-contain" />
            ) : (
              <span className="text-sm font-bold text-gray-400">{sponsorData?.name?.substring(0, 2).toUpperCase()}</span>
            )}
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-gray-900 text-sm truncate leading-tight">{sponsorData?.name}</h4>
            <p className="text-xs text-gray-500 truncate">{sponsorData?.industry || 'Brand'}</p>
          </div>
        </div>
        <button className="text-gray-300 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Tags & Score */}
      <div className="flex items-center gap-2">
        {sponsorData?.lead_category && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                sponsorData.lead_category === 'High' ? 'bg-purple-50 text-purple-700' :
                sponsorData.lead_category === 'Medium' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'
            }`}>
                {sponsorData.lead_category} Priority
            </span>
        )}
        {score > 0 && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${scoreColor}`}>
                {score} Fit
            </span>
        )}
      </div>

      {/* Value & Event */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <div className="flex flex-col">
             <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Value</span>
             <span className="text-sm font-bold text-gray-900">${totalValue.toLocaleString()}</span>
        </div>
        <div className="text-right">
             {sponsor.active_events_count !== undefined && sponsor.active_events_count > 0 ? (
                 <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                    {sponsor.active_events_count} Events
                 </span>
             ) : (
                 <span className="text-xs text-gray-400 italic">No active events</span>
             )}
        </div>
      </div>

      {/* Next Action (Kanban Only) */}
      {compact && sponsorData?.next_action && (
          <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-100">
              <Clock size={12} />
              <span className="font-medium truncate">{sponsorData.next_action}</span>
          </div>
      )}

      {/* Footer: Owner & Status */}
      <div className="flex items-center justify-between pt-2">
         <div className="flex items-center gap-1.5">
             <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-black text-white text-[9px] flex items-center justify-center font-bold border border-white shadow-sm">
                 {sponsorData?.owner_id ? 'JD' : <User size={10} />}
             </div>
             <span className="text-[10px] text-gray-400">{sponsorData?.owner_id ? 'Owner' : 'Unassigned'}</span>
         </div>
         
         {/* Status Indicator if not grouped by column */}
         {!compact && <StatusBadge status={sponsor.status} />}
         
         {sponsor.status === 'Signed' && !sponsor.contract_url && (
            <span className="text-amber-500" title="Missing Contract">
                <AlertCircle size={14} />
            </span>
         )}
      </div>
    </div>
  );
};
