
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Building2, Mail, Phone, Globe, MapPin, 
  FileText, Zap, Calendar, DollarSign, Plus, History, Loader2, Send, Lock,
  TrendingUp, Eye, MousePointerClick, Target, Sparkles, Copy, Check, Upload, CheckCircle2, X
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { supabase, supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { SponsorProfile, EventSponsor, SponsorActivation, SponsorRoiMetric, SponsorDeliverable } from '../../types/sponsorship';
import { Input } from '../../components/forms/Input';
import { SponsorForm } from '../../components/sponsors/SponsorForm';

export const SponsorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'deliverables' | 'activations'>('overview');
  
  const [sponsor, setSponsor] = useState<SponsorProfile | null>(null);
  const [deals, setDeals] = useState<EventSponsor[]>([]); 
  const [activations, setActivations] = useState<SponsorActivation[]>([]);
  const [deliverables, setDeliverables] = useState<SponsorDeliverable[]>([]);
  const [metrics, setMetrics] = useState<SponsorRoiMetric[]>([]);
  const [loading, setLoading] = useState(true);

  // Invite State
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);

  // Edit State
  const [showEditForm, setShowEditForm] = useState(false);

  // Pitch Generation State
  const [pitchDraft, setPitchDraft] = useState<string | null>(null);
  const [generatingPitch, setGeneratingPitch] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);

  // File Upload State
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
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
            const { data: acts } = await supabase
                .from('sponsor_activations')
                .select('*, event_sponsor:event_sponsors(event:events(title))')
                .in('event_sponsor_id', dealIds);
            setActivations(acts || []);

            const { data: dels } = await supabase
                .from('sponsor_deliverables')
                .select('*, event_sponsor:event_sponsors(event:events(title))')
                .in('event_sponsor_id', dealIds);
            setDeliverables(dels || []);

            const { data: metricsData } = await supabase
                .from('sponsor_roi_metrics')
                .select('*')
                .in('event_sponsor_id', dealIds);
            setMetrics(metricsData || []);
        }

    } catch (error) {
        console.error("Error loading details:", error);
    } finally {
        setLoading(false);
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

  const handleGeneratePitch = async () => {
    if (!sponsor) return;
    setGeneratingPitch(true);
    setPitchDraft(null);
    
    const eventContext = deals.length > 0 && deals[0].event 
      ? deals[0].event.title 
      : 'Upcoming Fashion Events';

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/sponsor-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          action: 'generate-pitch',
          sponsorName: sponsor.name,
          sponsorIndustry: sponsor.industry || 'Luxury',
          eventDetails: eventContext
        })
      });
      const text = await response.text();
      setPitchDraft(text);
    } catch (e) {
      console.error(e);
      alert("Failed to generate pitch. Ensure AI service is active.");
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

  const handleFileUpload = async (deliverableId: string, file: File) => {
      setUploadingId(deliverableId);
      try {
          const filePath = `sponsor-assets/${id}/${deliverableId}/${file.name}`;
          const { error: uploadError } = await supabase.storage.from('documents').upload(filePath, file);
          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(filePath);

          await supabase
            .from('sponsor_deliverables')
            .update({ status: 'uploaded', asset_url: publicUrl })
            .eq('id', deliverableId);
          
          fetchData();
      } catch (e) {
          console.error(e);
          alert("Upload failed");
      } finally {
          setUploadingId(null);
      }
  };

  const handleUpdateStatus = async (deliverableId: string, status: string) => {
      await supabase.from('sponsor_deliverables').update({ status }).eq('id', deliverableId);
      fetchData();
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-purple-600" size={48} />
        </div>
    );
  }

  if (!sponsor) {
      return (
          <div className="p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Sponsor Not Found</h2>
              <Link to="/dashboard/sponsors"><Button>Back to List</Button></Link>
          </div>
      );
  }

  const totalSpent = deals.reduce((acc, deal) => acc + (deal.cash_value || 0), 0);
  const activeDealsCount = deals.filter(d => d.status === 'Signed' || d.status === 'Paid').length;
  const lastDeal = deals[0]; 

  // Calculate ROI Aggregates
  const totalImpressions = metrics
    .filter(m => m.metric_name.toLowerCase().includes('impression'))
    .reduce((acc, curr) => acc + Number(curr.metric_value), 0);

  const totalLeads = metrics
    .filter(m => m.metric_name.toLowerCase().includes('lead'))
    .reduce((acc, curr) => acc + Number(curr.metric_value), 0);

  const engagementMetrics = metrics.filter(m => m.metric_name.toLowerCase().includes('engagement'));
  const avgEngagement = engagementMetrics.length > 0 
    ? (engagementMetrics.reduce((acc, curr) => acc + Number(curr.metric_value), 0) / engagementMetrics.length)
    : 0;

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans">
      <div className="mb-6">
        <Link to="/dashboard/sponsors" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Sponsors
        </Link>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-12 -mt-12 opacity-50 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-24 h-24 bg-white border border-gray-200 rounded-2xl p-1 shadow-sm shrink-0 flex items-center justify-center overflow-hidden">
            {sponsor.logo_url ? (
                <img src={sponsor.logo_url} alt={sponsor.name} className="w-full h-full object-contain rounded-xl" />
            ) : (
                <span className="text-2xl font-bold text-gray-300">{sponsor.name.charAt(0)}</span>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">{sponsor.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><Building2 size={14} /> {sponsor.industry || 'Industry N/A'}</span>
                  {sponsor.website_url && (
                      <>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <a href={sponsor.website_url} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 flex items-center gap-1">
                            <Globe size={14} /> Website
                        </a>
                      </>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="white" 
                  size="sm" 
                  onClick={handleGeneratePitch}
                  disabled={generatingPitch}
                  className="text-purple-600 border-purple-100 hover:bg-purple-50"
                >
                  {generatingPitch ? <Loader2 size={14} className="animate-spin mr-2" /> : <Sparkles size={14} className="mr-2" />}
                  {generatingPitch ? 'Drafting...' : 'Draft Pitch'}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowEditForm(true)}>Edit Profile</Button>
                <Link to="/dashboard/sponsors/new-deal"><Button variant="primary" size="sm">New Deal</Button></Link>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-100">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Total Investment</p>
                <p className="text-xl font-bold text-gray-900">${totalSpent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Active Deals</p>
                <p className="text-xl font-bold text-gray-900">{activeDealsCount}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Latest Status</p>
                {lastDeal ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {lastDeal.status}
                    </span>
                ) : (
                    <span className="text-sm text-gray-400">No deals yet</span>
                )}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Activations</p>
                <p className="text-sm font-bold text-gray-900">{activations.length} Planned</p>
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
            <div className="bg-white p-4 rounded-xl border border-purple-100 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {pitchDraft}
            </div>
          </div>
        </FadeIn>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-1 bg-white p-1.5 rounded-xl border border-gray-200 w-fit">
            {['overview', 'deliverables', 'activations'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <FadeIn key={activeTab} className="bg-white rounded-3xl border border-gray-100 shadow-sm min-h-[400px] p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* ROI KPI Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <Eye size={16} className="text-purple-600" />
                      <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Total Impressions</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{totalImpressions > 0 ? `${(totalImpressions / 1000).toFixed(1)}k` : '--'}</p>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <MousePointerClick size={16} className="text-pink-600" />
                      <span className="text-xs font-bold text-pink-700 uppercase tracking-wider">Avg Engagement</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{avgEngagement > 0 ? `${avgEngagement.toFixed(1)}%` : '--'}</p>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <Target size={16} className="text-green-600" />
                      <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Leads Generated</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{totalLeads > 0 ? totalLeads : '--'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xl mb-4">History</h3>
                  {deals.length > 0 ? (
                      <div className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
                        {deals.map((deal) => (
                        <div key={deal.id} className="relative flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 z-10">
                            <History size={14} className="text-gray-400" />
                            </div>
                            <div className="pt-1">
                            <p className="text-sm font-bold text-gray-900">Deal Status: {deal.status}</p>
                            <p className="text-xs text-gray-500">{(deal.event as any)?.title || 'Unknown Event'}</p>
                            <span className="text-[10px] text-gray-400 mt-1 block">{new Date(deal.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                        ))}
                    </div>
                  ) : (
                      <div className="text-center text-gray-400 py-8">No activity recorded.</div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'deliverables' && (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif font-bold text-xl">Required Assets</h3>
                        <Button size="sm" variant="outline">Add Item</Button>
                    </div>
                    <div className="space-y-4">
                        {deliverables.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                                        <p className="text-xs text-gray-500">For: {(item.event_sponsor as any)?.event?.title}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                                        item.status === 'approved' ? 'bg-green-100 text-green-700' :
                                        item.status === 'uploaded' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-200 text-gray-600'
                                    }`}>
                                        {item.status}
                                    </span>
                                    {item.status !== 'approved' && (
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                id={`upload-${item.id}`}
                                                onChange={(e) => e.target.files?.[0] && handleFileUpload(item.id, e.target.files[0])}
                                                disabled={!!uploadingId}
                                            />
                                            <label htmlFor={`upload-${item.id}`}>
                                                <Button as="span" size="sm" variant="white" className="cursor-pointer">
                                                    {uploadingId === item.id ? <Loader2 className="animate-spin" size={14}/> : <Upload size={14}/>}
                                                </Button>
                                            </label>
                                        </div>
                                    )}
                                    {item.status === 'uploaded' && (
                                        <Button size="sm" variant="primary" onClick={() => handleUpdateStatus(item.id, 'approved')}>
                                            Approve
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {deliverables.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                <FileText size={32} className="mx-auto mb-2 opacity-20" />
                                <p>No deliverables required yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'activations' && (
                <div>
                    <h3 className="font-serif font-bold text-xl mb-6">Activations</h3>
                    {activations.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {activations.map(act => (
                                <div key={act.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                    <div className="flex justify-between mb-2">
                                        <h4 className="font-bold text-gray-900">{act.title}</h4>
                                        <span className="text-xs font-bold uppercase bg-white px-2 py-1 rounded border border-gray-100">{act.status}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{act.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <MapPin size={12} /> {act.location_in_venue || 'TBD'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-400">No activations found.</div>
                    )}
                </div>
            )}
          </FadeIn>
        </div>

        {/* Right Column: Contact & Access */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif font-bold text-lg">Portal Access</h3>
              {sponsor.owner_id ? (
                  <span className="text-xs font-bold bg-green-50 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                      <Lock size={10} /> Active
                  </span>
              ) : (
                  <span className="text-xs font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded-full flex items-center gap-1">
                      Inactive
                  </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-bold text-lg">
                {(sponsor.contact_name || sponsor.name).charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-900">{sponsor.contact_name || 'No Contact'}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Primary Contact</p>
              </div>
            </div>

            <div className="space-y-4">
              {sponsor.contact_email && (
                <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-gray-50 rounded-xl">
                    <Mail size={16} /> {sponsor.contact_email}
                </div>
              )}
              {sponsor.contact_phone && (
                <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-gray-50 rounded-xl">
                    <Phone size={16} /> {sponsor.contact_phone}
                </div>
              )}
              
              {/* Invite Flow */}
              {!sponsor.owner_id && (
                  <div className="pt-2">
                      {!showInvite ? (
                          <Button variant="primary" size="sm" fullWidth onClick={() => setShowInvite(true)}>
                              <Send size={14} className="mr-2" /> Invite to Portal
                          </Button>
                      ) : (
                          <div className="space-y-2 bg-purple-50 p-3 rounded-xl animate-in fade-in">
                              <p className="text-xs font-bold text-purple-700 mb-1">Send Invite To:</p>
                              <Input 
                                value={inviteEmail} 
                                onChange={(e) => setInviteEmail(e.target.value)} 
                                className="bg-white text-xs"
                                placeholder="Enter email"
                              />
                              <div className="flex gap-2 mt-2">
                                  <Button size="sm" variant="primary" fullWidth onClick={handleInvite} disabled={inviting}>
                                      {inviting ? 'Sending...' : 'Send'}
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => setShowInvite(false)}>Cancel</Button>
                              </div>
                          </div>
                      )}
                  </div>
              )}
            </div>
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
