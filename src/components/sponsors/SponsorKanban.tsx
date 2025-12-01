
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SponsorCard } from './SponsorCard';
import { SponsorCardSkeleton } from './SponsorSkeleton';
import { EventSponsor, SponsorStatus } from '../../types/sponsorship';

interface SponsorKanbanProps {
  sponsors: EventSponsor[]; // Real data type
  loading: boolean;
  onStatusChange: (id: string, newStatus: SponsorStatus) => void;
  onSponsorClick: (sponsorId: string) => void;
}

// Define columns mapping to DB Enum
const COLUMNS: { id: SponsorStatus; label: string; color: string }[] = [
    { id: 'Lead', label: 'New Leads', color: 'bg-blue-500' },
    { id: 'Qualified', label: 'Qualified', color: 'bg-purple-500' },
    { id: 'Proposal', label: 'Proposal Sent', color: 'bg-indigo-500' },
    { id: 'Negotiating', label: 'Negotiating', color: 'bg-amber-500' },
    { id: 'Signed', label: 'Closed Won', color: 'bg-green-500' }
];

export const SponsorKanban: React.FC<SponsorKanbanProps> = ({ 
  sponsors, 
  loading, 
  onStatusChange,
  onSponsorClick 
}) => {
  const [draggedSponsorId, setDraggedSponsorId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, sponsorId: string) => {
    setDraggedSponsorId(sponsorId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== columnId) setDragOverColumn(columnId);
  };

  const handleDrop = (e: React.DragEvent, targetStatus: SponsorStatus) => {
    e.preventDefault();
    setDragOverColumn(null);
    if (!draggedSponsorId) return;
    
    // Find and update
    const sponsor = sponsors.find(s => s.id === draggedSponsorId);
    if (sponsor && sponsor.status !== targetStatus) {
      onStatusChange(draggedSponsorId, targetStatus);
    }
    setDraggedSponsorId(null);
  };

  // Helper to calculate column total value
  const getColumnTotal = (items: EventSponsor[]) => {
    return items.reduce((sum, item) => sum + (item.cash_value || 0), 0);
  };

  return (
    <>
        {/* Mobile Warning / Tip */}
        <div className="md:hidden mb-4 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 text-center">
            Tip: Switch to <strong>List View</strong> for easier management on mobile.
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 min-h-[calc(100vh-300px)] snap-x snap-mandatory px-4 md:px-0">
        {COLUMNS.map((col) => {
            // Filter deals for this column
            const stageSponsors = sponsors.filter(s => s.status === col.id);
            const stageValue = getColumnTotal(stageSponsors);
            
            return (
            <div 
                key={col.id} 
                className="min-w-[280px] w-[300px] flex flex-col h-full snap-center"
                onDragOver={(e) => handleDragOver(e, col.id)}
                onDrop={(e) => handleDrop(e, col.id)}
            >
                {/* Header */}
                <div className="mb-4 px-1">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${col.color}`} />
                            <h4 className="font-bold text-gray-900">{col.label}</h4>
                            <span className="bg-gray-100 text-xs font-bold px-2 py-0.5 rounded-full">{stageSponsors.length}</span>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 font-medium pl-5">
                        ${stageValue.toLocaleString()} Pipeline
                    </div>
                </div>

                {/* Drop Zone */}
                <div className={`flex-1 flex flex-col gap-3 p-2 rounded-2xl transition-colors ${dragOverColumn === col.id ? 'bg-purple-50 border-2 border-dashed border-purple-300' : 'bg-gray-50/50'}`}>
                
                {/* Quick Add Button for Lead Column */}
                {col.id === 'Lead' && !loading && (
                    <Link to="/dashboard/sponsors/new-deal">
                        <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-xs font-bold hover:border-purple-300 hover:text-purple-500 hover:bg-white transition-all flex items-center justify-center gap-2 bg-gray-50">
                        <Plus size={14} /> New Deal
                        </button>
                    </Link>
                )}

                {loading ? (
                    <SponsorCardSkeleton />
                ) : (
                    stageSponsors.map(sponsor => (
                        <div 
                        key={sponsor.id} 
                        draggable 
                        onDragStart={(e) => handleDragStart(e, sponsor.id)}
                        className="cursor-grab active:cursor-grabbing"
                        >
                        <SponsorCard 
                            sponsor={sponsor} 
                            onClick={() => onSponsorClick(sponsor.sponsor_id)} 
                            compact={true}
                        />
                        </div>
                    ))
                )}
                
                {!loading && stageSponsors.length === 0 && col.id !== 'Lead' && (
                    <div className="h-24 flex items-center justify-center text-gray-300 text-sm italic">
                        Drop here
                    </div>
                )}
                </div>
            </div>
            );
        })}
        </div>
    </>
  );
};
