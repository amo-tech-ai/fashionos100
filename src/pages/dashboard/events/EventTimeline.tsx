
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, Circle, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { PageHeader, StatCard } from '../../../components/dashboard/Shared';
import { FadeIn } from '../../../components/FadeIn';
import { supabase } from '../../../lib/supabase';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

// Hardcoded phases structure if DB is empty (fallback)
const DEFAULT_PHASES = [
  "Concept & Vision", "Budget & Stakeholders", "Collection & Accessories",
  "Casting & Fittings", "Venue & Runway", "Production & Lighting",
  "Sponsors & PR", "Marketing & Social", "Ticketing & Guests",
  "Backstage & HMU", "Rehearsals", "Showtime", "Content Capture", "Post-Event Review"
];

export const EventTimeline: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [phases, setPhases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchPhases();
  }, [id]);

  const fetchPhases = async () => {
    try {
      setLoading(true);
      // Try to fetch from DB
      const { data, error } = await supabase
        .from('event_phases')
        .select('*')
        .eq('event_id', id)
        .order('order_index', { ascending: true });

      if (data && data.length > 0) {
        setPhases(data);
      } else {
        // If no phases found (maybe created before phases table), show mock view
        setPhases(DEFAULT_PHASES.map((name, i) => ({
           id: i, name, status: i < 3 ? 'completed' : i === 3 ? 'in_progress' : 'not_started', order_index: i + 1
        })));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-500 border-green-500 text-white';
      case 'in_progress': return 'bg-white border-purple-500 text-purple-600 ring-4 ring-purple-50';
      case 'blocked': return 'bg-white border-red-500 text-red-500';
      default: return 'bg-white border-gray-300 text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle2 size={16} />;
      case 'in_progress': return <Clock size={16} />;
      case 'blocked': return <AlertCircle size={16} />;
      default: return <Circle size={16} />;
    }
  };

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner /></div>;

  const completedCount = phases.filter(p => p.status === 'completed').length;
  const progress = Math.round((completedCount / phases.length) * 100) || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Event Timeline" 
        subtitle="Track the 14-phase production lifecycle."
        breadcrumbs={['Dashboard', 'Events', 'Timeline']}
      />

      {/* Progress Header */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
        <div className="flex justify-between items-end mb-4">
           <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-1">Overall Progress</h2>
              <p className="text-gray-500 text-sm">{completedCount} of {phases.length} phases completed</p>
           </div>
           <span className="text-4xl font-bold text-purple-600">{progress}%</span>
        </div>
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
           <div className="h-full bg-purple-600 transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Timeline View */}
      <div className="relative max-w-3xl mx-auto">
         {/* Vertical Line */}
         <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gray-200" />

         <div className="space-y-8">
            {phases.map((phase, index) => {
               const isLast = index === phases.length - 1;
               return (
                  <FadeIn key={phase.id} delay={index * 50}>
                     <div className="relative flex gap-6">
                        {/* Marker */}
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 shrink-0 z-10 transition-all ${getStatusColor(phase.status)}`}>
                           {getStatusIcon(phase.status)}
                        </div>

                        {/* Card */}
                        <div className={`flex-1 p-6 rounded-2xl border transition-all hover:shadow-md ${phase.status === 'in_progress' ? 'bg-white border-purple-200 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-80 hover:opacity-100'}`}>
                           <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-gray-900 text-lg">{phase.name}</h3>
                              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Phase {phase.order_index}</span>
                           </div>
                           <p className="text-sm text-gray-500 mb-4">{phase.description || 'No details provided.'}</p>
                           
                           {phase.status === 'in_progress' && (
                              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                 <button className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1">
                                    View Tasks <ArrowRight size={12} />
                                 </button>
                              </div>
                           )}
                        </div>
                     </div>
                  </FadeIn>
               );
            })}
         </div>
      </div>
    </div>
  );
};
