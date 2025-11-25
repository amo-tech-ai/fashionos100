
import React, { useState, useEffect } from 'react';
import { 
  Plus, Sparkles, Download, 
  ArrowRight, X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SponsorCard } from '../../components/sponsors/SponsorCard';
import { SponsorList } from '../../components/sponsors/SponsorList';
import { SponsorKPIWidget } from '../../components/sponsors/SponsorKPIWidget';
import { EventSponsor } from '../../types/sponsorship';
import { supabase, supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { Input } from '../../components/forms/Input';
import { Textarea } from '../../components/forms/Textarea';

export const DashboardSponsors: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'Pipeline' | 'List'>('Pipeline');
  const [sponsors, setSponsors] = useState<EventSponsor[]>([]);
  const [loading, setLoading] = useState(true);
  
  // AI State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiIdeas, setAiIdeas] = useState<any[] | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiParams, setAiParams] = useState({
    sponsorName: '',
    industry: '',
    eventDetails: ''
  });

  // Fetch Data from Supabase
  useEffect(() => {
    const fetchSponsors = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('event_sponsors')
          .select(`
            *,
            sponsor:sponsor_profiles(*)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSponsors(data || []);
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  // AI Agent: Ideation
  const handleAiIdeation = async () => {
    if (!aiParams.sponsorName || !aiParams.eventDetails) return;
    
    setAiLoading(true);
    setAiIdeas(null);

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/sponsor-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          action: 'activation-ideas',
          sponsorName: aiParams.sponsorName,
          sponsorIndustry: aiParams.industry,
          eventDetails: aiParams.eventDetails
        })
      });
      const data = await response.json();
      setAiIdeas(data.ideas);
      setShowAiModal(false);
    } catch (err) {
      console.error(err);
      alert("AI Service Unavailable. Please ensure Edge Functions are deployed.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-20 relative">
      
      {/* AI Agent Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif font-bold flex items-center gap-2">
                <Sparkles className="text-purple-600" size={20} /> Sponsor AI Agent
              </h3>
              <button onClick={() => setShowAiModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <Input 
                label="Sponsor Name" 
                placeholder="e.g. Luxe Beauty" 
                value={aiParams.sponsorName}
                onChange={(e) => setAiParams({...aiParams, sponsorName: e.target.value})}
                className="bg-gray-50"
              />
              <Input 
                label="Industry" 
                placeholder="e.g. Cosmetics" 
                value={aiParams.industry}
                onChange={(e) => setAiParams({...aiParams, industry: e.target.value})}
                className="bg-gray-50"
              />
              <Textarea 
                label="Event Context" 
                placeholder="e.g. Summer Runway Show in Miami, 500 VIP guests, sustainable theme." 
                className="h-24 bg-gray-50"
                value={aiParams.eventDetails}
                onChange={(e) => setAiParams({...aiParams, eventDetails: e.target.value})}
              />
              <div className="pt-2">
                <Button fullWidth variant="primary" onClick={handleAiIdeation} disabled={!aiParams.sponsorName || aiLoading}>
                  {aiLoading ? 'Generating Ideas...' : 'Suggest Activations'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
            <span>Dashboard</span> <span className="text-gray-300">/</span> <span className="text-fashion-purple">Sponsors</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1D2D]">Sponsorship Manager</h1>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="white" size="sm" className="gap-2 rounded-full border-gray-200 text-gray-600">
             <Download size={14} /> Report
           </Button>
           <Link to="/dashboard/sponsors/new-deal">
             <Button variant="primary" size="sm" className="gap-2 rounded-full shadow-lg shadow-purple-500/20">
               <Plus size={16} /> New Deal
             </Button>
           </Link>
        </div>
      </div>

      {/* KPI Widget */}
      <SponsorKPIWidget 
        sponsors={sponsors} 
        loading={loading} 
        onAiTrigger={() => setShowAiModal(true)} 
      />

      {/* AI Suggestions Panel */}
      {aiIdeas && (
        <FadeIn>
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-purple-900 font-bold flex items-center gap-2">
                <Sparkles size={16} /> 
                AI Concepts for {aiParams.sponsorName || 'Sponsor'}
              </h3>
              <button onClick={() => setAiIdeas(null)} className="text-purple-400 hover:text-purple-700"><X size={16} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiIdeas.map((idea, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-serif font-bold text-lg mb-2 text-gray-900">{idea.title}</h4>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{idea.description}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">Est: {idea.estimated_cost}</span>
                    <button className="text-purple-600 hover:bg-purple-50 p-1 rounded transition-colors"><ArrowRight size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {/* Kanban / List Toggle */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2 bg-white p-1 rounded-lg border border-gray-200">
              <button 
                onClick={() => setView('Pipeline')} 
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${view === 'Pipeline' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Pipeline
              </button>
              <button 
                onClick={() => setView('List')} 
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${view === 'List' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                List View
              </button>
            </div>
          </div>

          {view === 'Pipeline' ? (
            <div className="flex gap-4 overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0">
              {['Lead', 'Contacted', 'Negotiating', 'Signed', 'Paid'].map((status) => (
                <div key={status} className="min-w-[280px] flex-1">
                  <div className="flex justify-between items-center mb-4 px-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">{status}</h4>
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {sponsors.filter(s => s.status === status).length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {sponsors.filter(s => s.status === status).map(sponsor => (
                      <Link key={sponsor.id} to={`/dashboard/sponsors/${sponsor.sponsor_id}`} className="block">
                        <SponsorCard sponsor={sponsor} />
                      </Link>
                    ))}
                    <Link to="/dashboard/sponsors/new-deal">
                      <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-xs font-bold hover:border-purple-300 hover:text-purple-500 transition-all flex items-center justify-center gap-2">
                        <Plus size={14} /> Add Deal
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <SponsorList 
              sponsors={sponsors} 
              onSponsorClick={(s) => navigate(`/dashboard/sponsors/${s.sponsor_id}`)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
