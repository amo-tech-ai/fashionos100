
import React from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle, Paperclip, MoreHorizontal, Filter, User } from 'lucide-react';
import { SponsorDeliverable, DeliverableStatus } from '../../types/sponsorship';
import { StatusBadge } from '../StatusBadge';

interface DeliverablesTrackerProps {
  deliverables: SponsorDeliverable[];
  compact?: boolean;
}

export const DeliverablesTracker: React.FC<DeliverablesTrackerProps> = ({ deliverables, compact = false }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="text-green-500" size={16} />;
      case 'pending_review': return <Clock className="text-amber-500" size={16} />;
      case 'blocked': return <AlertCircle className="text-red-500" size={16} />;
      default: return <Circle className="text-gray-300" size={16} />;
    }
  };

  const statusColors: Record<DeliverableStatus, string> = {
    'not_started': 'bg-gray-100 text-gray-600',
    'in_progress': 'bg-blue-50 text-blue-700',
    'pending': 'bg-blue-50 text-blue-700',
    'uploaded': 'bg-purple-50 text-purple-700',
    'pending_review': 'bg-amber-50 text-amber-700',
    'approved': 'bg-green-50 text-green-700',
    'blocked': 'bg-red-50 text-red-700'
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      {!compact && (
        <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
          <h3 className="font-serif font-bold text-gray-900">Deliverables Tracker</h3>
          <div className="flex items-center gap-2">
             <button className="p-2 hover:bg-white rounded-lg text-gray-400 transition-colors">
                <Filter size={16} />
             </button>
             <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                {deliverables.length} Items
             </span>
          </div>
        </div>
      )}
      
      <div className="divide-y divide-gray-50">
        {deliverables.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No deliverables tracked yet.</div>
        ) : (
            deliverables.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="shrink-0 pt-1">
                    {getStatusIcon(item.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900 truncate">{item.title}</span>
                        {item.asset_url && <Paperclip size={12} className="text-gray-400" />}
                    </div>
                    {!compact && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="font-medium">{item.event_sponsor?.sponsor?.name}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span>{item.event_sponsor?.event?.title || 'General'}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4 shrink-0">
                    {/* Assignee Avatar (Mock) */}
                    {!compact && (
                         <div className="hidden sm:flex items-center -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-[10px] text-purple-600 font-bold" title="Assignee">
                                JD
                            </div>
                         </div>
                    )}
                    
                    <div className="text-right min-w-[80px]">
                        <div className={`text-xs font-medium ${new Date(item.due_date) < new Date() && item.status !== 'approved' ? 'text-red-500' : 'text-gray-500'}`}>
                            {new Date(item.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                    </div>

                    {!compact ? (
                         <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${statusColors[item.status] || 'bg-gray-100'}`}>
                            {item.status.replace('_', ' ')}
                         </span>
                    ) : (
                        <button className="text-gray-300 hover:text-gray-600">
                            <MoreHorizontal size={16} />
                        </button>
                    )}
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
};
