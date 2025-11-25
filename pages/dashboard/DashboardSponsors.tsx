import React, { useState } from 'react';
import { 
  Search, Plus, Sparkles, Download, PieChart, 
  DollarSign, Users, ArrowRight, X 
} from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SponsorCard } from '../../components/sponsors/SponsorCard';
import { EventSponsor } from '../../types/sponsorship';
import { supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Input } from '../../components/forms/Input';
import { Textarea } from '../../components/forms/Textarea';

// Mock Data for MVP
const MOCK_SPONSORS: EventSponsor[] = [
  {
    id: '1', event_id: 'e1', sponsor_id: 's1', level: 'Gold', status: 'Signed', cash_value: 25000, created_at: '2025-01-01',
    sponsor: { id: 's1', name: 'Luxe Beauty', industry: 'Cosmetics', logo_url: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?w=100' }
  },
  {
    id: '2', event_id: 'e1', sponsor_id: 's2', level: 'Silver', status: 'Negotiating', cash_value: 10000, created_at: '2025-01-05',
    sponsor: { id: 's2', name: 'Hydra Water', industry: 'Beverage' }
  },
  {
    id: '3', event_id: 'e1', sponsor_id: 's3', level: 'Title', status: 'Paid', cash_value: 50000, created_at: '2025-01-10',
    sponsor: { id: 's3', name: 'TechFlow', industry: 'Technology', logo_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100' }
  },
  {
    id: '4', event_id: 'e1', sponsor_id: 's4', level: 'In-Kind', status: 'Lead', cash_value: 0, in_kind_value: 5000, created_at: '2025-02-01',
    sponsor: { id: 's4', name: 'Urban Florals', industry: 'Decor' }
  }
];

export const DashboardSponsors: React.FC = () => {
  const [view, setView] = useState<'Pipeline' | 'List'>('Pipeline');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiIdeas, setAiIdeas] = useState<any[] | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiParams, setAiParams] = useState({
    sponsorName: '',
    industry: '',
    eventDetails: ''
  });

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
      alert("AI Service Unavailable");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-20 relative">
      
      {/* AI Modal */}
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
              />
              <Input 
                label="Industry" 
                placeholder="e.g. Cosmetics" 
                value={aiParams.industry}
                onChange={(e) => setAiParams({...aiParams, industry: e.target.value})}
              />
              <Textarea 
                label="Event Context" 
                placeholder="e.g. Summer Runway Show in Miami, 500 VIP guests, sustainable theme." 
                className="h-24"
                value={aiParams.eventDetails}
                onChange={(e) => setAiParams({...aiParams, eventDetails: e.target.value})}
              />
              <div className="pt-2">
                <Button fullWidth variant="primary" onClick={handleAiIdeation} disabled={!aiParams.sponsorName || aiLoading}>
                  {aiLoading ? <LoadingSpinner size={16} className="mr-2" /> : null}
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
           <Button variant="primary" size="sm" className="gap-2 rounded-full shadow-lg shadow-purple-500/20">
             <Plus size={16} /> Add Sponsor
           </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
           <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign size={18} /></div>
              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">+12%</span>
           </div>
           <p className="text-2xl font-bold text-gray-900">$85,000</p>
           <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Raised</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
           <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users size={18} /></div>
           </div>
           <p className="text-2xl font-bold text-gray-900">14</p>
           <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Active Partners</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
           <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><PieChart size={18} /></div>
           </div>
           <p className="text-2xl font-bold text-gray-900">75%</p>
           <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Goal Reached</p>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-purple-300 transition-colors group" 
          onClick={() => setShowAiModal(true)}
        >
           <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow-md group-hover:scale-110 transition-transform">
                <Sparkles size={18} />
              </div>
           </div>
           <p className="text-sm font-bold text-gray-900 leading-tight mt-2">Suggest Activations</p>
           <p className="text-[10px] text-purple-500 font-bold uppercase tracking-wider mt-1">AI Agent Ready</p>
        </div>
      </div>

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
        {/* Main Content */}
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
            
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
               <input type="text" placeholder="Search partners..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-medium w-64 focus:outline-none focus:ring-2 focus:ring-purple-100" />
            </div>
          </div>

          {view === 'Pipeline' ? (
            <div className="flex gap-4 overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0">
              {['Lead', 'Contacted', 'Negotiating', 'Signed', 'Paid'].map((status) => (
                <div key={status} className="min-w-[280px] flex-1">
                  <div className="flex justify-between items-center mb-4 px-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">{status}</h4>
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {MOCK_SPONSORS.filter(s => s.status === status).length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {MOCK_SPONSORS.filter(s => s.status === status).map(sponsor => (
                      <SponsorCard key={sponsor.id} sponsor={sponsor} />
                    ))}
                    <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-xs font-bold hover:border-purple-300 hover:text-purple-500 transition-all flex items-center justify-center gap-2">
                      <Plus size={14} /> Add Deal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
               {/* Simplified List Table */}
               <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                     <tr>
                        <th className="px-6 py-4">Sponsor</th>
                        <th className="px-6 py-4">Level</th>
                        <th className="px-6 py-4">Value</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {MOCK_SPONSORS.map(s => (
                        <tr key={s.id} className="hover:bg-gray-50/50">
                           <td className="px-6 py-4 font-bold text-gray-900">{s.sponsor?.name}</td>
                           <td className="px-6 py-4 text-gray-600">{s.level}</td>
                           <td className="px-6 py-4 font-medium">${s.cash_value.toLocaleString()}</td>
                           <td className="px-6 py-4"><span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold">{s.status}</span></td>
                           <td className="px-6 py-4 text-purple-600 font-bold text-xs cursor-pointer hover:underline">Manage</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}