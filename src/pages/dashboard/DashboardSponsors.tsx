
import React, { useState, useMemo } from 'react';
import { 
  Plus, Sparkles, X, SlidersHorizontal, DollarSign, Calendar, 
  Activity, Users, Search
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SponsorList } from '../../components/sponsors/SponsorList';
import { SponsorKanban } from '../../components/sponsors/SponsorKanban';
import { SponsorKPIWidget } from '../../components/sponsors/SponsorKPIWidget';
import { useSponsors } from '../../hooks/useSponsors';
import { Input } from '../../components/forms/Input';

export const DashboardSponsors: React.FC = () => {
  const navigate = useNavigate();
  // Get Event ID from URL if present (Context Awareness)
  const { id: eventId } = useParams<{ id: string }>();
  
  // Hook connecting to Supabase
  const { deals, loading, updateSponsorStatus } = useSponsors();
  
  const [view, setView] = useState<'Pipeline' | 'List'>('Pipeline');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter deals for pipeline view, also applying Event Context if active
  const filteredDeals = useMemo(() => {
    return deals.filter(d => {
      const matchesSearch = 
        d.sponsor?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.event?.title.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesEvent = eventId ? d.event_id === eventId : true;
      
      return matchesSearch && matchesEvent;
    });
  }, [deals, searchQuery, eventId]);

  return (
    <div className="space-y-8 animate-in fade-in pb-20 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
            <span>{eventId ? 'Event' : 'Dashboard'}</span> <span className="text-gray-300">/</span> <span className="text-fashion-purple">Sponsors</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1D2D]">
            {eventId ? 'Event Sponsorships' : 'Sponsorship Manager'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
           <Link to="/dashboard/sponsors/new-deal">
             <Button variant="primary" size="sm" className="gap-2 rounded-full shadow-lg shadow-purple-500/20">
               <Plus size={16} /> New Deal
             </Button>
           </Link>
        </div>
      </div>

      {/* KPI Widget (Scoped to filtered deals) */}
      <SponsorKPIWidget sponsors={filteredDeals} loading={loading} />

      {/* View Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-gray-200 w-fit">
          <button 
            onClick={() => setView('Pipeline')} 
            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${view === 'Pipeline' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Pipeline
          </button>
          <button 
            onClick={() => setView('List')} 
            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${view === 'List' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            List View
          </button>
        </div>
      </div>

      {/* --- PIPELINE VIEW --- */}
      {view === 'Pipeline' && (
        <FadeIn>
           {/* Pipeline Filter Bar */}
           <div className="flex gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                 <input 
                    type="text" 
                    placeholder="Search deals by sponsor..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                 />
              </div>
           </div>

           <SponsorKanban 
             sponsors={filteredDeals}
             loading={loading}
             onStatusChange={updateSponsorStatus}
             onSponsorClick={(id) => navigate(`/dashboard/sponsors/${id}`)}
           />
        </FadeIn>
      )}

      {/* --- LIST VIEW --- */}
      {view === 'List' && (
        <FadeIn>
            <SponsorList 
              sponsors={filteredDeals} 
              onSponsorClick={(s) => navigate(`/dashboard/sponsors/${s.sponsor_id}`)}
            />
        </FadeIn>
      )}
    </div>
  );
};
