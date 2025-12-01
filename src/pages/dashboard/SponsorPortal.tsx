
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Calendar, MapPin, Upload, Download, FileText, CheckCircle, 
  Loader2, User, Eye, Heart, Share2, TrendingUp, Plus, Sparkles, DollarSign, CreditCard, Filter, Building2
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { supabase, supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { SponsorProfile, EventSponsor, SponsorActivation, SponsorDeliverable, SponsorRoiMetric, SponsorType } from '../../types/sponsorship';
import { SocialPlanWidget } from '../../components/sponsors/SocialPlanWidget';
import { ResponsiveLineChart, ResponsiveBarChart } from '../../components/charts/DynamicCharts';
import { useToast } from '../../components/Toast';
import { aiService } from '../../lib/ai-service';
import { StatusBadge } from '../../components/StatusBadge';
import { Input } from '../../components/forms/Input';
import { Textarea } from '../../components/forms/Textarea';
import { notificationService } from '../../lib/notification-service';
import { SponsorFileManager } from '../../components/sponsors/SponsorFileManager';
import { useRealtime } from '../../hooks/useRealtime';
import { mediaService } from '../../lib/media-service';

export const SponsorPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'assets' | 'analytics'>('home');
  const [loading, setLoading] = useState(true);
  const [sponsorProfile, setSponsorProfile] = useState<SponsorProfile | null>(null);
  const [deals, setDeals] = useState<EventSponsor[]>([]);
  const [activations, setActivations] = useState<SponsorActivation[]>([]);
  const [deliverables, setDeliverables] = useState<SponsorDeliverable[]>([]);
  const [metrics, setMetrics] = useState<SponsorRoiMetric[]>([]);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // Onboarding
  const [creatingProfile, setCreatingProfile] = useState(false);
  const [newProfileData, setNewProfileData] = useState({ name: '', website: '', industry: '' });
  
  // Filtering
  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  const { success, error } = useToast();

  const fetchSponsorData = useCallback(async () => {
    // Don't show loading spinner on refetch if profile exists
    if (!sponsorProfile) setLoading(true);
    
    try {
      const { data: { user } } = await (supabase.auth as any).getUser();
      if (!user) return;

      const { data: profile, error: profileError } = await supabase
        .from('sponsor_profiles')
        .select('*')
        .eq('owner_id', user.id)
        .maybeSingle();

      setSponsorProfile(profile);

      if (profile) {
        const { data: dealsData } = await supabase
          .from('event_sponsors')
          .select('*, event:events(id, title, start_time, organizer_id)')
          .eq('sponsor_id', profile.id);
        setDeals(dealsData || []);

        const dealIds = dealsData?.map(d => d.id) || [];
        if (dealIds.length > 0) {
          const { data: actData } = await supabase.from('sponsor_activations').select('*').in('event_sponsor_id', dealIds);
          setActivations(actData || []);

          const { data: delData } = await supabase.from('sponsor_deliverables').select('*').in('event_sponsor_id', dealIds);
          setDeliverables(delData || []);

          const { data: metricsData } = await supabase.from('sponsor_roi_metrics').select('*').in('event_sponsor_id', dealIds);
          setMetrics(metricsData || []);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [sponsorProfile]);

  useEffect(() => {
    fetchSponsorData();
  }, [fetchSponsorData]);

  // Subscribe to updates for this sponsor
  useRealtime('sponsor_deliverables', () => fetchSponsorData());
  useRealtime('event_sponsors', () => fetchSponsorData());
  useRealtime('sponsor_roi_metrics', () => fetchSponsorData());

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingProfile(true);
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Not authenticated");

        const { error: insertError } = await supabase
            .from('sponsor_profiles')
            .insert({
                owner_id: user.id,
                name: newProfileData.name,
                industry: newProfileData.industry,
                website_url: newProfileData.website,
                contact_email: user.email,
                sponsor_type: 'Other' as SponsorType
            });

        if (insertError) throw insertError;
        success("Profile created successfully!");
        fetchSponsorData();
    } catch (e: any) {
        error("Failed to create profile: " + e.message);
    } finally {
        setCreatingProfile(false);
    }
  };

  const handleFileUpload = async (deliverableId: string, eventSponsorId: string, file: File) => {
    if (!sponsorProfile) return;
    setUploadingId(deliverableId);
    
    try {
        const filePath = `sponsor-assets/${sponsorProfile.id}/${deliverableId}/${file.name}`;
        const { error: uploadError } = await supabase.storage.from('documents').upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(filePath);

        await supabase.from('sponsor_deliverables').update({ status: 'pending_review', asset_url: publicUrl }).eq('id', deliverableId);
        
        // Optimistic update
        setDeliverables(prev => prev.map(d => d.id === deliverableId ? { ...d, status: 'pending_review', asset_url: publicUrl } : d));
        success("File uploaded successfully");

        const deal = deals.find(d => d.id === eventSponsorId);
        if (deal && deal.event?.organizer_id) {
            const organizerId = deal.event.organizer_id;
            await notificationService.notifyOwner({
                ownerId: organizerId,
                title: "New Sponsor Asset",
                message: `${sponsorProfile.name} uploaded a file for ${deal.event.title}.`,
                type: 'info'
            });
        }

    } catch (e: any) {
        error("Failed to upload file.");
    } finally {
        setUploadingId(null);
    }
  };

  const handleDownload = async (url: string, title: string) => {
      // If it's a direct link (not supabase storage), open it
      if (!url.includes('supabase')) {
          window.open(url, '_blank');
          return;
      }

      try {
          // Try to download via blob if it's ours
          const response = await fetch(url);
          if (!response.ok) throw new Error('Network response was not ok');
          const blob = await response.blob();
          const blobUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = title || 'download';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(blobUrl);
      } catch (e) {
          console.error('Download failed', e);
          // Fallback
          window.open(url, '_blank');
      }
  };

  const handlePayment = async (dealId: string, amount: number) => {
    setProcessingPayment(true);
    try {
      const response = await aiService.createCheckout({
          amount,
          title: `Sponsorship Payment: ${dealId}`,
          successUrl: window.location.href
      });
      
      if (response.success && response.data?.url) {
          alert("Redirecting to Payment Gateway...");
          window.location.href = response.data.url;
      } else if (response.success && response.data?.mock) {
          await supabase.from('event_sponsors').update({ status: 'Paid' }).eq('id', dealId);
          // The realtime subscription will catch this update
          success("Payment successful (Mock)");
      } else {
          throw new Error("Payment initialization failed");
      }
    } catch (error) {
      console.error("Payment error", error);
      alert("Payment initialization failed.");
    } finally {
      setProcessingPayment(false);
    }
  };

  // --- Filter Logic ---
  const filteredMetrics = useMemo(() => {
    if (selectedEventId === 'all') return metrics;
    const matchingDeals = deals.filter(d => d.event_id === selectedEventId).map(d => d.id);
    return metrics.filter(m => matchingDeals.includes(m.event_sponsor_id));
  }, [metrics, selectedEventId, deals]);

  // --- Chart Data Prep ---
  const impressionData = useMemo(() => {
    const impMetrics = filteredMetrics.filter(m => m.metric_name.includes('Impression') || m.metric_name.includes('Views'));
    return impMetrics.map((m, i) => ({
        label: new Date(m.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        value: m.metric_value
    })).slice(-7);
  }, [filteredMetrics]);

  const conversionData = useMemo(() => {
    const leadMetrics = filteredMetrics.filter(m => m.metric_name.includes('Lead') || m.metric_name.includes('Click'));
    return leadMetrics.map(m => ({
        label: m.metric_name.replace('Generated', '').trim(),
        value: m.metric_value
    }));
  }, [filteredMetrics]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-purple-600" size={48}/></div>;

  if (!sponsorProfile) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center p-4">
        <FadeIn>
          <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-12 w-full max-w-2xl text-center">
            <Building2 className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h1 className="text-3xl font-serif font-bold mb-3">Setup Partner Profile</h1>
            <p className="text-gray-500 mb-8">Welcome to the FashionOS Sponsor Portal.</p>
            <form onSubmit={handleCreateProfile} className="space-y-4 text-left max-w-md mx-auto">
                <Input label="Company Name" value={newProfileData.name} onChange={e => setNewProfileData({...newProfileData, name: e.target.value})} required />
                <Input label="Industry" value={newProfileData.industry} onChange={e => setNewProfileData({...newProfileData, industry: e.target.value})} />
                <Button fullWidth size="lg" variant="primary" disabled={creatingProfile}>
                    {creatingProfile ? 'Creating...' : 'Create Profile'}
                </Button>
            </form>
          </div>
        </FadeIn>
      </div>
    );
  }

  const activeDeal = deals[0];
  const eventOptions = Array.from(new Set(deals.map(d => d.event))).filter(Boolean);
  const totalImpressions = filteredMetrics.filter(m => m.metric_name.includes('Impression')).reduce((a, b) => a + Number(b.metric_value), 0);

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans">
      {/* External Header Style */}
      <div className="bg-black text-white rounded-b-[2rem] md:rounded-b-[3rem] pt-6 pb-20 px-6 md:px-8 mb-[-60px]">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black font-bold text-xl">
                    {sponsorProfile.name[0]}
                </div>
                <div>
                    <h1 className="text-xl md:text-2xl font-bold">{sponsorProfile.name}</h1>
                    <p className="text-white/60 text-sm">Partner Portal</p>
                </div>
            </div>
            <div className="flex gap-4 text-sm font-medium w-full md:w-auto justify-center border-t border-white/10 pt-3 md:border-none md:pt-0">
                <button onClick={() => setActiveTab('home')} className={`opacity-80 hover:opacity-100 ${activeTab === 'home' ? 'text-purple-400 font-bold' : ''}`}>Overview</button>
                <button onClick={() => setActiveTab('assets')} className={`opacity-80 hover:opacity-100 ${activeTab === 'assets' ? 'text-purple-400 font-bold' : ''}`}>Assets</button>
                <button onClick={() => setActiveTab('analytics')} className={`opacity-80 hover:opacity-100 ${activeTab === 'analytics' ? 'text-purple-400 font-bold' : ''}`}>Analytics</button>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
          {activeTab === 'home' && (
              <div className="space-y-8">
                  {/* Hero Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col justify-between h-40 md:h-48">
                          <div className="flex justify-between">
                              <Eye className="text-purple-600" />
                              <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">+12%</span>
                          </div>
                          <div>
                              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{totalImpressions > 0 ? (totalImpressions/1000).toFixed(1) + 'k' : '0'}</p>
                              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Impressions</p>
                          </div>
                      </div>
                      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col justify-between h-40 md:h-48">
                          <div className="flex justify-between">
                              <CheckCircle className="text-pink-600" />
                              <span className="text-gray-400 text-xs font-bold">Tasks</span>
                          </div>
                          <div>
                              <p className="text-3xl md:text-4xl font-bold text-gray-900">{deliverables.filter(d => d.status === 'approved').length}/{deliverables.length}</p>
                              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Deliverables Ready</p>
                          </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 md:p-8 rounded-3xl shadow-lg text-white flex flex-col justify-between h-40 md:h-48 relative overflow-hidden">
                          <div className="relative z-10">
                              <p className="font-serif text-xl mb-2">Upcoming Event</p>
                              <p className="text-2xl md:text-3xl font-bold mb-1 truncate">{activeDeal ? (activeDeal.event as any)?.title : 'No Active Events'}</p>
                              {activeDeal && <p className="opacity-80 text-sm">{new Date((activeDeal.event as any)?.start_time).toLocaleDateString()}</p>}
                          </div>
                          <Sparkles className="absolute bottom-[-20px] right-[-20px] w-32 h-32 text-white/10" />
                      </div>
                  </div>

                  {/* Action Required */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                      <h3 className="font-serif font-bold text-xl mb-6">Action Required</h3>
                      <div className="space-y-4">
                          {deliverables.filter(d => d.status !== 'approved').map(item => (
                              <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors gap-4">
                                  <div className="flex items-center gap-4">
                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.status === 'pending_review' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>
                                          {item.status === 'pending_review' ? <CheckCircle size={20}/> : <Upload size={20}/>}
                                      </div>
                                      <div>
                                          <p className="font-bold text-gray-900">{item.title}</p>
                                          <p className="text-xs text-gray-500">Due {new Date(item.due_date).toLocaleDateString()}</p>
                                      </div>
                                  </div>
                                  <div className="w-full md:w-auto">
                                      {item.status === 'pending_review' ? (
                                          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold block text-center md:inline">Reviewing</span>
                                      ) : (
                                          <div className="relative">
                                              <input type="file" id={`upload-${item.id}`} className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(item.id, item.event_sponsor_id, e.target.files[0])} disabled={!!uploadingId} />
                                              <label htmlFor={`upload-${item.id}`}>
                                                  <Button size="sm" variant="primary" as="span" className="cursor-pointer w-full md:w-auto" disabled={!!uploadingId}>
                                                      {uploadingId === item.id ? (
                                                          <span className="flex items-center gap-2">
                                                              <Loader2 size={12} className="animate-spin" /> 
                                                              Uploading...
                                                          </span>
                                                      ) : 'Upload'}
                                                  </Button>
                                              </label>
                                          </div>
                                      )}
                                  </div>
                              </div>
                          ))}
                          {deliverables.filter(d => d.status !== 'approved').length === 0 && (
                              <p className="text-gray-400 text-center py-4">You're all caught up!</p>
                          )}
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'assets' && (
               <div className="space-y-8">
                   <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                      <h3 className="font-serif font-bold text-xl mb-6">Event Deliverables</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {activeDeal?.contract_url && (
                              <div className="p-4 border border-gray-200 rounded-xl flex items-center justify-between group hover:border-purple-400 transition-all">
                                  <div className="flex items-center gap-3">
                                      <div className="bg-gray-100 p-2 rounded-lg"><FileText size={20} className="text-gray-600"/></div>
                                      <div>
                                          <p className="font-bold text-sm">Sponsorship Agreement</p>
                                          <p className="text-xs text-gray-500">Signed PDF</p>
                                      </div>
                                  </div>
                                  <button onClick={() => handleDownload(activeDeal.contract_url!, 'contract.pdf')} className="text-gray-400 hover:text-purple-600">
                                    <Download size={16} />
                                  </button>
                              </div>
                          )}
                          {deliverables.filter(d => d.asset_url).map(d => (
                               <div key={d.id} className="p-4 border border-gray-200 rounded-xl flex items-center justify-between group hover:border-purple-400 transition-all">
                                  <div className="flex items-center gap-3">
                                      <div className="bg-gray-100 p-2 rounded-lg"><CheckCircle size={20} className="text-green-600"/></div>
                                      <div>
                                          <p className="font-bold text-sm">{d.title}</p>
                                          <p className="text-xs text-gray-500">Uploaded Asset</p>
                                      </div>
                                  </div>
                                  <button onClick={() => handleDownload(d.asset_url!, d.title)} className="text-gray-400 hover:text-purple-600">
                                    <Download size={16} />
                                  </button>
                              </div>
                          ))}
                      </div>
                   </div>
                   
                   {/* Shared Documents Section */}
                   <SponsorFileManager sponsorId={sponsorProfile.id} readOnly />
               </div>
          )}

          {activeTab === 'analytics' && (
             <div className="space-y-8">
                 <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                     <div className="flex justify-between items-center mb-6">
                      <h2 className="font-serif font-bold text-xl text-gray-900">ROI Performance</h2>
                      
                      {/* Event Filter */}
                      <div className="flex items-center gap-2">
                         <Filter size={14} className="text-gray-400" />
                         <select 
                            className="bg-gray-50 border-none text-xs font-bold rounded-lg px-3 py-2 text-gray-600 focus:ring-2 focus:ring-purple-100 cursor-pointer"
                            value={selectedEventId}
                            onChange={(e) => setSelectedEventId(e.target.value)}
                         >
                            <option value="all">All Events</option>
                            {eventOptions.map((e: any) => (
                                <option key={e.id} value={e.id}>{e.title}</option>
                            ))}
                         </select>
                      </div>
                   </div>

                     {metrics.length > 0 ? (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                               <ResponsiveLineChart 
                                  title="Impressions Over Time"
                                  data={impressionData.length > 0 ? impressionData : [{label: 'Start', value: 0}, {label: 'Now', value: 0}]} 
                                  color="#8b5cf6"
                                  height={200}
                               />
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                               <ResponsiveBarChart 
                                  title="Conversion Metrics"
                                  data={conversionData.length > 0 ? conversionData : [{label: 'None', value: 0}]}
                                  color="#ec4899"
                                  height={200}
                               />
                            </div>
                         </div>
                     ) : (
                         <div className="h-64 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                             No performance data available yet.
                         </div>
                     )}
                 </div>
             </div>
          )}
      </div>
    </div>
  );
};
