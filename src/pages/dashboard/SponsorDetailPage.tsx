
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Building2, Globe, 
  Loader2, Send, Lock, Sparkles, Copy, Check, X,
  User
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { supabase, supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { SponsorProfile, EventSponsor, SponsorActivation, SponsorRoiMetric, SponsorDeliverable } from '../../types/sponsorship';
import { SponsorForm } from '../../components/sponsors/SponsorForm';
import { aiService } from '../../lib/ai-service';
import { DeliverablesTracker } from '../../components/sponsors/DeliverablesTracker';
import { StatusBadge } from '../../components/StatusBadge';
import { SponsorInteractionFeed } from '../../components/sponsors/SponsorInteractionFeed';
import { SponsorContactList } from '../../components/sponsors/SponsorContactList';
import { SponsorFileManager } from '../../components/sponsors/SponsorFileManager';
import { useRealtime } from '../../hooks/useRealtime';

export const SponsorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'activity' | 'deliverables' | 'files'>('overview');
  
  const [sponsor, setSponsor] = useState<SponsorProfile | null>(null);
  const [deals, setDeals] = useState<EventSponsor[]>([]); 
  const [activations, setActivations] = useState<SponsorActivation[]>([]);
  const [deliverables, setDeliverables] = useState<SponsorDeliverable[]>([]);
  const [metrics, setMetrics] = useState<SponsorRoiMetric[]>([]);
  const [loading, setLoading] = useState(true);

  // UI States
  const [showEditForm, setShowEditForm] = useState(false);
  const [pitchDraft, setPitchDraft] = useState<string | null>(null);
  const [generatingPitch, setGeneratingPitch] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);

  // Invite State
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);

  const fetchData = useCallback(async () => {
    // Don't show full loading spinner on refetch if we already have data
    if (!sponsor) setLoading(true);
    
    try {
        const { data: profile, error: profileError } = await supabase
            .from('sponsor_profiles')
            .select('*')
            .eq('id', id)
            .single();
        
        if (profileError) throw profileError;
        setSponsor(profile);
        setInviteEmail(profile.contact_email || '');

        const { data: eventSponsors, error: dealsError } = await supabase
            .from('event_sponsors')
            .select('*, event:events(title, start_time)')
            .eq('sponsor_id', id)
            .order('created_at', { ascending: false });

        if (dealsError) throw dealsError;
        setDeals(eventSponsors || []);

        const dealIds = eventSponsors?.map(d => d.id) || [];
        if (dealIds.length > 0) {
            // Parallel fetch for sub-data
            const [actsRes, delsRes, metricsRes] = await Promise.all([
                supabase.from('sponsor_activations').select('*, event_sponsor:event_sponsors(event:events(title))').in('event_sponsor_id', dealIds),
                supabase.from('sponsor_deliverables').select('*, event_sponsor:event_sponsors(event:events(title))').in('event_sponsor_id', dealIds),
                supabase.from('sponsor_roi_metrics').select('*').in('event_sponsor_id', dealIds)
            ]);

            setActivations(actsRes.data || []);
            setDeliverables(delsRes.data || []);
            setMetrics(metricsRes.data || []);
        }
        
    } catch (error) {
        console.error("Error loading details:", error);
    } finally {
        setLoading(false);
    }
  }, [id]); // Removed sponsor dependency to avoid loop

  useEffect(() => {
    if (id) fetchData();
  }, [id, fetchData]);

  // Subscribe to changes relevant to this sponsor
  useRealtime('sponsor_deliverables', () => fetchData());
  useRealtime('sponsor_activations', () => fetchData());
  useRealtime('sponsor_roi_metrics', () => fetchData());
  useRealtime('event_sponsors', () => fetchData());
  useRealtime('sponsor_profiles', () => fetchData());

  const handleGeneratePitch = async () => {
    if (!sponsor) return;
    setGeneratingPitch(true);
    setPitchDraft(null);
    
    const eventContext = deals.length > 0 && deals[0].event 
      ? (deals[0].event as any).title 
      : 'Upcoming Fashion Events';

    try {
      const result = await aiService.sponsorAgent('generate-pitch', {
          sponsorName: sponsor.name,
          sponsorIndustry: sponsor.industry || 'Luxury',
          eventDetails: eventContext
      });

      if (result.success && typeof result.data === 'string') {
          setPitchDraft(result.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingPitch(false);
    }
  };

  const handleCopyPitch = () => {
    if (pitchDraft) {
      navigator.clipboard.writeText(pitchDraft);
      setCopiedPitch(true);
      setTimeout(() => setCopiedPitch(false), 2000);
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail) return;
    setInviting(true);
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/invite-sponsor-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          email: inviteEmail,
          sponsorProfileId: sponsor?.id
        })
      });
      
      if (!response.ok) throw new Error('Failed to invite');
      
      alert(`Invitation sent to ${inviteEmail}`);
      setShowInvite(false);
      fetchData();
    } catch (e) {
      console.error(e);
      alert("Failed to send invitation. Please check permissions.");
    } finally {
      setInviting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-purple-600" size={48} /></div>;
  if (!sponsor) return <div className="p-12 text-center">Sponsor Not Found</div>;

  const totalSpent = deals.reduce((acc, deal) => acc + (deal.cash_value || 0), 0);
  const activeDealsCount = deals.filter(d => d.status === 'Signed' || d.status === 'Paid').length;
  const lastDeal = deals[0];
  const leadScore = sponsor.lead_score || 0;
  const leadCategory = sponsor.lead_category || 'New';
  const scoreColor = leadScore >= 80 ? 'bg-green-500' : leadScore >= 50 ? 'bg-amber-500' : 'bg-gray-300';

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans">
      <div className="mb-6">
        <Link to="/dashboard/sponsors" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to List
        </Link>
      </div>

      {/* 1. Hero Profile Header */}
      <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-50 to-pink-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-70 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Logo */}
          <div className="w-24 h-24 md:w-28 md:h-28 bg-white border border-gray-200 rounded-3xl p-2 shadow-sm shrink-0 flex items-center justify-center overflow-hidden">
            {sponsor.logo_url ? (
                <img src={sponsor.logo_url} alt={sponsor.name} className="w-full h-full object-contain rounded-xl" />
            ) : (
                <span className="text-3xl font-bold text-gray-300">{sponsor.name.charAt(0)}</span>
            )}
          </div>
          
          <div className="flex-1 w-full">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">{sponsor.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-full text-xs font-medium"><Building2 size={12} /> {sponsor.industry || 'N/A'}</span>
                  {sponsor.website_url && (
                      <a href={sponsor.website_url} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 flex items-center gap-1">
                          <Globe size={14} /> Website
                      </a>
                  )}
                </div>
                
                {/* Fit Score Bar */}
                {leadScore > 0 && (
                    <div className="flex items-center gap-3 mt-2">
                        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${scoreColor}`} style={{ width: `${leadScore}%` }} />
                        </div>
                        <span className="text-xs font-bold text-gray-600">{leadScore}/100 Fit Score</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-gray-100 text-gray-500`}>
                            {leadCategory}
                        </span>
                    </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                <Button variant="white" size="sm" onClick={handleGeneratePitch} disabled={generatingPitch} className="flex-1 md:flex-none">
                  {generatingPitch ? <Loader2 size={14} className="animate-spin mr-2" /> : <Sparkles size={14} className="mr-2 text-purple-600" />}
                  {generatingPitch ? 'Drafting...' : 'Draft Pitch'}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowEditForm(true)} className="flex-1 md:flex-none">Edit</Button>
                <Link to="/dashboard/sponsors/new-deal" className="flex-1 md:flex-none"><Button variant="primary" size="sm" className="w-full">Create Deal</Button></Link>
              </div>
            </div>

            {/* Key Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-100">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Lifetime Value</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">${totalSpent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Active Deals</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">{activeDealsCount}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Status</p>
                {lastDeal ? (
                    <StatusBadge status={lastDeal.status} />
                ) : (
                    <span className="text-sm text-gray-400">No deals yet</span>
                )}
              </div>
              <div>
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-white shadow-sm">
                        <User size={14} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Owner</p>
                        <p className="text-sm font-bold text-gray-900">Assign</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pitch Generated Area */}
      {pitchDraft && (
        <FadeIn>
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 mb-8 shadow-sm relative group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-serif font-bold text-purple-900 flex items-center gap-2">
                <Sparkles size={16} /> AI Sponsorship Pitch
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={handleCopyPitch} 
                  className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-purple-600 hover:text-purple-800 bg-white px-3 py-1.5 rounded-full shadow-sm transition-all hover:shadow-md"
                >
                  {copiedPitch ? <Check size={14} /> : <Copy size={14} />}
                  {copiedPitch ? 'Copied' : 'Copy Text'}
                </button>
                <button onClick={() => setPitchDraft(null)} className="text-purple-400 hover:text-purple-600 p-1">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-purple-100 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-medium">
              {pitchDraft}
            </div>
          </div>
        </FadeIn>
      )}

      {/* 2. Tabs Navigation */}
      <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-gray-200 w-full md:w-fit mb-8 overflow-x-auto hide-scrollbar">
        {['overview', 'activity', 'contacts', 'deliverables', 'files'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 md:flex-initial px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Main Content (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
            
            {activeTab === 'overview' && (
                <FadeIn>
                    <div className="space-y-8">
                        {/* AI Summary */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-serif font-bold text-lg mb-3 flex items-center gap-2">
                                <Sparkles size={16} className="text-purple-500" /> Brand Intelligence
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {sponsor.brand_story || `${sponsor.name} is a leading player in the ${sponsor.industry} space. They have a history of sponsoring high-profile events and focus on luxury, sustainability, and innovation.`}
                            </p>
                            {sponsor.social_links && sponsor.social_links.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-50 flex flex-wrap gap-2">
                                    {sponsor.social_links.map((link, i) => (
                                        <a key={i} href={link} target="_blank" className="text-xs bg-gray-50 px-3 py-1.5 rounded-full text-gray-500 border border-gray-200 hover:text-purple-600 hover:border-purple-200 transition-colors">
                                            {new URL(link).hostname.replace('www.', '')}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Recent Deals */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-serif font-bold text-lg mb-4">Recent Deals</h3>
                            <div className="space-y-4">
                                {deals.slice(0,3).map(deal => (
                                    <div key={deal.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div>
                                            <p className="font-bold text-gray-900">{(deal.event as any)?.title}</p>
                                            <p className="text-xs text-gray-500">{new Date(deal.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <StatusBadge status={deal.status} />
                                            <p className="text-sm font-bold mt-1">${deal.cash_value.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                                {deals.length === 0 && <p className="text-gray-400 text-sm text-center py-4">No deals yet.</p>}
                            </div>
                        </div>
                    </div>
                </FadeIn>
            )}

            {activeTab === 'activity' && (
                <FadeIn>
                    <SponsorInteractionFeed sponsorId={sponsor.id} />
                </FadeIn>
            )}

            {activeTab === 'deliverables' && (
                <FadeIn>
                    <DeliverablesTracker deliverables={deliverables} />
                </FadeIn>
            )}

            {activeTab === 'contacts' && (
                <FadeIn>
                    <SponsorContactList sponsorId={sponsor.id} />
                </FadeIn>
            )}

             {activeTab === 'files' && (
                <FadeIn>
                    <SponsorFileManager sponsorId={sponsor.id} />
                </FadeIn>
            )}

        </div>

        {/* Right Sidebar (Quick Actions) */}
        <div className="space-y-6">
            
            {/* Portal Status */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl text-white shadow-lg">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-bold text-lg">Sponsor Portal</h3>
                        <p className="text-xs text-gray-400 mt-1">External access status</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${sponsor.owner_id ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'bg-red-500'}`} />
                </div>
                
                {sponsor.owner_id ? (
                    <div className="space-y-4">
                         <div className="bg-white/10 rounded-lg p-3 text-xs">
                             <p className="text-gray-300 mb-1">Last Active</p>
                             <p className="font-mono">Today, 10:42 AM</p>
                         </div>
                         <Button size="sm" variant="white" fullWidth>View As Sponsor</Button>
                    </div>
                ) : (
                    <div>
                        <p className="text-sm text-gray-400 mb-4">Invite the sponsor to track their ROI and upload assets directly.</p>
                        {!showInvite ? (
                            <Button size="sm" variant="white" fullWidth onClick={() => setShowInvite(true)}>
                                Send Invite
                            </Button>
                        ) : (
                            <div className="space-y-2">
                                <input 
                                    value={inviteEmail} 
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white"
                                    placeholder="Email address"
                                />
                                <div className="flex gap-2">
                                    <Button size="sm" variant="white" fullWidth onClick={handleInvite} disabled={inviting}>
                                        {inviting ? 'Sending...' : 'Send Access'}
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={() => setShowInvite(false)} className="text-gray-300 hover:text-white">Cancel</Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </div>
      </div>

      {/* Edit Modal */}
      {showEditForm && (
        <SponsorForm 
          sponsor={sponsor}
          onClose={() => setShowEditForm(false)}
          onSave={fetchData}
        />
      )}
    </div>
  );
};