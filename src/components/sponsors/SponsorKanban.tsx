
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

  return (
    <div className="flex gap-6 overflow-x-auto pb-8 min-h-[calc(100vh-300px)]">
      {COLUMNS.map((col) => {
        // Filter deals for this column
        const stageSponsors = sponsors.filter(s => s.status === col.id);
        
        return (
          <div 
            key={col.id} 
            className="min-w-[300px] w-[300px] flex flex-col h-full"
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${col.color}`} />
                    <h4 className="font-bold text-gray-900">{col.label}</h4>
                    <span className="bg-gray-100 text-xs font-bold px-2 py-0.5 rounded-full">{stageSponsors.length}</span>
                </div>
            </div>

            {/* Drop Zone */}
            <div className={`flex-1 flex flex-col gap-3 p-2 rounded-2xl transition-colors ${dragOverColumn === col.id ? 'bg-purple-50 border-2 border-dashed border-purple-300' : 'bg-gray-50/50'}`}>
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
                      />
                    </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
