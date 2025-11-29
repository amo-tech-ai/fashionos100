
import React, { useState } from 'react';
import { 
  Plus, Sparkles, X, SlidersHorizontal
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SponsorCard } from '../../components/sponsors/SponsorCard';
import { SponsorList } from '../../components/sponsors/SponsorList';
import { SponsorKPIWidget } from '../../components/sponsors/SponsorKPIWidget';
import { SponsorCardSkeleton, KPICardSkeleton } from '../../components/sponsors/SponsorSkeleton';
import { SponsorStatus } from '../../types/sponsorship';
import { Input } from '../../components/forms/Input';
import { Textarea } from '../../components/forms/Textarea';
import { useSponsors } from '../../hooks/useSponsors';
import { aiService } from '../../lib/ai-service';

const PIPELINE_STAGES: SponsorStatus[] = ['Lead', 'Contacted', 'Negotiating', 'Signed', 'Activation Ready', 'Paid'];

export const DashboardSponsors: React.FC = () => {
  const navigate = useNavigate();
  const { sponsors, loading, updateSponsorStatus } = useSponsors();
  
  const [view, setView] = useState<'Pipeline' | 'List'>('Pipeline');
  
  // AI State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiIdeas, setAiIdeas] = useState<any[] | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiMode, setAiMode] = useState<'activation' | 'scoring'>('activation');
  const [aiParams, setAiParams] = useState({
    sponsorName: '',
    industry: '',
    eventDetails: ''
  });

  // DnD State
  const [draggedSponsorId, setDraggedSponsorId] = useState<string | null>(null);

  // AI Agent Handler
  const handleAiAction = async () => {
    if (!aiParams.sponsorName) return;
    
    setAiLoading(true);
    setAiIdeas(null);

    try {
        const action = aiMode === 'scoring' ? 'score-lead' : 'activation-ideas';
        const result = await aiService.sponsorAgent(action, {
            sponsorName: aiParams.sponsorName,
            sponsorIndustry: aiParams.industry,
            eventDetails: aiParams.eventDetails || 'Upcoming Fashion Event'
        });

        if (result.success && result.data) {
            if (aiMode === 'scoring') {
                setAiIdeas([{ 
                    title: `Lead Score: ${result.data.score}/100`, 
                    description: result.data.reasoning, 
                    category: result.data.category,
                    estimated_cost: 'Score' 
                }]);
            } else {
                setAiIdeas(result.data.ideas);
            }
            setShowAiModal(false);
        } else {
            console.error('AI Error:', result.error);
            alert("AI Analysis failed. " + (result.error || ''));
        }
    } catch (e) {
        console.error(e);
        alert("AI Service Unavailable.");
    } finally {
        setAiLoading(false);
    }
  };

  const openAiModal = (mode: 'activation' | 'scoring', sponsor?: any) => {
      setAiMode(mode);
      if (sponsor) {
          setAiParams({
              sponsorName: sponsor.sponsor?.name || '',
              industry: sponsor.sponsor?.industry || '',
              eventDetails: sponsor.event?.title || ''
          });
      } else {
          setAiParams({ sponsorName: '', industry: '', eventDetails: '' });
      }
      setShowAiModal(true);
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, sponsorId: string) => {
    setDraggedSponsorId(sponsorId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: SponsorStatus) => {
    e.preventDefault();
    if (!draggedSponsorId) return;
    
    // Don't update if dropping in same column
    const sponsor = sponsors.find(s => s.id === draggedSponsorId);
    if (sponsor && sponsor.status !== targetStatus) {
        updateSponsorStatus(draggedSponsorId, targetStatus);
    }
    setDraggedSponsorId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-20 relative">
      
      {/* AI Agent Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif font-bold flex items-center gap-2">
                <Sparkles className="text-purple-600" size={20} /> 
                {aiMode === 'scoring' ? 'Lead Scoring Agent' : 'Activation Ideator'}
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
                label="Context" 
                placeholder={aiMode === 'scoring' ? "Budget, History, Goals..." : "Event theme, audience size..."} 
                className="h-24 bg-gray-50"
                value={aiParams.eventDetails}
                onChange={(e) => setAiParams({...aiParams, eventDetails: e.target.value})}
              />
              <div className="pt-2">
                <Button fullWidth variant="primary" onClick={handleAiAction} disabled={!aiParams.sponsorName || aiLoading}>
                  {aiLoading ? 'Analyzing...' : (aiMode === 'scoring' ? 'Calculate Score' : 'Generate Ideas')}
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
           <Button variant="white" size="sm" className="gap-2 rounded-full border-gray-200 text-gray-600" onClick={() => openAiModal('scoring')}>
             <SlidersHorizontal size={14} /> Score Lead
           </Button>
           <Link to="/dashboard/sponsors/new-deal">
             <Button variant="primary" size="sm" className="gap-2 rounded-full shadow-lg shadow-purple-500/20">
               <Plus size={16} /> New Deal
             </Button>
           </Link>
        </div>
      </div>

      {/* KPI Widget */}
      {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <KPICardSkeleton />
              <KPICardSkeleton />
              <KPICardSkeleton />
              <KPICardSkeleton />
          </div>
      ) : (
          <SponsorKPIWidget 
            sponsors={sponsors} 
            loading={false} 
            onAiTrigger={() => openAiModal('activation')} 
          />
      )}

      {/* AI Suggestions Panel */}
      {aiIdeas && (
        <FadeIn>
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-purple-900 font-bold flex items-center gap-2">
                <Sparkles size={16} /> 
                AI Results for {aiParams.sponsorName}
              </h3>
              <button onClick={() => setAiIdeas(null)} className="text-purple-400 hover:text-purple-700"><X size={16} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiIdeas.map((idea, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-serif font-bold text-lg mb-2 text-gray-900">{idea.title}</h4>
                  {idea.category && (
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase mb-2 inline-block ${
                          idea.category === 'High' ? 'bg-green-100 text-green-700' : 
                          idea.category === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>
                          {idea.category} Priority
                      </span>
                  )}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{idea.description}</p>
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
            <div className="flex gap-4 overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 min-h-[500px]">
              {PIPELINE_STAGES.map((status) => (
                <div 
                  key={status} 
                  className="min-w-[280px] flex-1"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, status)}
                >
                  <div className="flex justify-between items-center mb-4 px-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">{status}</h4>
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {sponsors.filter(s => s.status === status).length}
                    </span>
                  </div>
                  <div className="space-y-3 bg-gray-50/50 p-2 rounded-xl min-h-[200px] transition-colors duration-200 hover:bg-gray-100/50">
                    {loading ? (
                        <>
                            <SponsorCardSkeleton />
                            <SponsorCardSkeleton />
                        </>
                    ) : (
                        sponsors.filter(s => s.status === status).map(sponsor => (
                            <div 
                                key={sponsor.id} 
                                draggable 
                                onDragStart={(e) => handleDragStart(e, sponsor.id)}
                                className="cursor-move"
                            >
                                <div onClick={(e) => { if(!draggedSponsorId) navigate(`/dashboard/sponsors/${sponsor.sponsor_id}`); }}>
                                    <SponsorCard sponsor={sponsor} />
                                </div>
                            </div>
                        ))
                    )}
                    <Link to="/dashboard/sponsors/new-deal">
                      <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-xs font-bold hover:border-purple-300 hover:text-purple-500 transition-all flex items-center justify-center gap-2 bg-white">
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
