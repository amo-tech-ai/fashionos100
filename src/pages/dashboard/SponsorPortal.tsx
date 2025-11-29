
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, MapPin, Upload, Download, FileText, CheckCircle, 
  Loader2, Eye, Heart, Share2, TrendingUp, Sparkles, DollarSign, CreditCard, Filter, CheckSquare, X
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { supabase, supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { SponsorProfile, EventSponsor, SponsorActivation, SponsorDeliverable, SponsorRoiMetric } from '../../types/sponsorship';
import { SocialPlanWidget } from '../../components/sponsors/SocialPlanWidget';
import { ResponsiveLineChart, ResponsiveBarChart } from '../../components/charts/DynamicCharts';
import { useToast } from '../../components/Toast';
import { aiService } from '../../lib/ai-service';
import { StatusBadge } from '../../components/StatusBadge';

export const SponsorPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'activations' | 'marketing'>('dashboard');
  const [loading, setLoading] = useState(true);
  const [sponsorProfile, setSponsorProfile] = useState<SponsorProfile | null>(null);
  const [deals, setDeals] = useState<EventSponsor[]>([]);
  const [activations, setActivations] = useState<SponsorActivation[]>([]);
  const [deliverables, setDeliverables] = useState<SponsorDeliverable[]>([]);
  const [metrics, setMetrics] = useState<SponsorRoiMetric[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // AI Ideas State
  const [activationIdeas, setActivationIdeas] = useState<any[] | null>(null);
  const [showIdeas, setShowIdeas] = useState(true);
  const [ideasLoading, setIdeasLoading] = useState(false);

  // Filtering
  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  const { success, error } = useToast();

  useEffect(() => {
    fetchSponsorData();
  }, []);

  const fetchSponsorData = async () => {
    try {
      const { data: { user } } = await (supabase.auth as any).getUser();
      if (!user) return;

      const { data: profile, error: profileError } = await supabase
        .from('sponsor_profiles')
        .select('*')
        .eq('owner_id', user.id)
        .single();

      if (profileError || !profile) {
        console.error("No sponsor profile found for user");
        setLoading(false);
        return;
      }
      setSponsorProfile(profile);

      const { data: dealsData } = await supabase
        .from('event_sponsors')
        .select('*, event:events(id, title, start_time)')
        .eq('sponsor_id', profile.id);
      setDeals(dealsData || []);

      const dealIds = dealsData?.map(d => d.id) || [];
      if (dealIds.length > 0) {
        const { data: actData } = await supabase
          .from('sponsor_activations')
          .select('*, event_sponsor:event_sponsors(event:events(title))')
          .in('event_sponsor_id', dealIds);
        setActivations(actData || []);

        const { data: delData } = await supabase
          .from('sponsor_deliverables')
          .select('*, event_sponsor:event_sponsors(event:events(title))')
          .in('event_sponsor_id', dealIds);
        setDeliverables(delData || []);

        const { data: metricsData } = await supabase
          .from('sponsor_roi_metrics')
          .select('*')
          .in('event_sponsor_id', dealIds)
          .order('created_at', { ascending: true });
        setMetrics(metricsData || []);

        // Trigger AI suggestions if we have active deals
        if (showIdeas && dealsData && dealsData.length > 0) {
           generateIdeas(profile, dealsData[0]);
        }
      }

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const generateIdeas = async (profile: SponsorProfile, deal?: EventSponsor) => {
      if (ideasLoading) return;
      setIdeasLoading(true);
      try {
          const result = await aiService.sponsorAgent('activation-ideas', {
              sponsorName: profile.name,
              sponsorIndustry: profile.industry || 'Luxury',
              eventDetails: (deal?.event as any)?.title || 'Fashion Event'
          });

          if (result.success && result.data?.ideas) {
              setActivationIdeas(result.data.ideas);
          }
      } catch (e) {
          console.error("AI Ideas failed", e);
      } finally {
          setIdeasLoading(false);
      }
  };

  const handleFileUpload = async (deliverableId: string, eventSponsorId: string, file: File) => {
    if (!sponsorProfile) return;
    
    setUploadingId(deliverableId);
    setAnalyzing(true); 
    
    try {
        const filePath = `sponsor-assets/${sponsorProfile.id}/${deliverableId}/${file.name}`;
        
        // 1. Upload
        const { error: uploadError } = await supabase.storage
            .from('documents') 
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('documents')
            .getPublicUrl(filePath);

        // 2. Update DB Status
        await supabase
            .from('sponsor_deliverables')
            .update({ status: 'uploaded', asset_url: publicUrl })
            .eq('id', deliverableId);

        // 3. Check if all deliverables for this deal are complete
        const dealDeliverables = deliverables.filter(d => d.event_sponsor_id === eventSponsorId);
        const othersPending = dealDeliverables.filter(d => d.id !== deliverableId && (d.status === 'pending' || d.status === 'rejected'));

        if (othersPending.length === 0) {
            await supabase
                .from('event_sponsors')
                .update({ status: 'Activation Ready' })
                .eq('id', eventSponsorId);
            
            success("All deliverables uploaded! Contract status updated.");
            setDeals(prev => prev.map(d => d.id === eventSponsorId ? { ...d, status: 'Activation Ready' } : d));
        } else {
             success("File uploaded successfully");
        }

        // Refresh locally
        setDeliverables(prev => prev.map(d => d.id === deliverableId ? { ...d, status: 'uploaded', asset_url: publicUrl } : d));

        // 4. AI Analysis
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64 = (reader.result as string).split(',')[1];
            // Use aiService instead of direct fetch
            aiService.sponsorAgent('analyze-media', { mediaBase64: base64 })
              .catch(err => console.warn("AI Analysis error", err));
        };
    } catch (e: any) {
        console.error("Upload failed", e);
        error("Failed to upload file.");
    } finally {
        setUploadingId(null);
        setAnalyzing(false);
    }
  };

  const handlePayment = async (dealId: string, amount: number) => {
    setProcessingPayment(true);
    try {
      const result = await aiService.createCheckout({
          amount,
          title: `Sponsorship Payment: ${dealId}`
      });
      
      if (result.success && result.data?.url) {
        alert("Redirecting to Secure Payment Gateway...");
        // Simulate success for demo
        await supabase.from('event_sponsors').update({ status: 'Paid' }).eq('id', dealId);
        setDeals(prev => prev.map(d => d.id === dealId ? { ...d, status: 'Paid' } : d));
      } else {
        throw new Error(result.error || 'Payment initialization failed');
      }
    } catch (error) {
      console.error("Payment error", error);
      alert("Payment initialization failed.");
    } finally {
      setProcessingPayment(false);
    }
  };

  const exportMetricsCSV = () => {
    if (metrics.length === 0) {
        error("No metrics to export.");
        return;
    }
    
    const headers = ['Date', 'Metric', 'Value', 'Unit', 'Source'];
    const rows = filteredMetrics.map(m => [
        new Date(m.created_at).toLocaleDateString(),
        m.metric_name,
        m.metric_value,
        m.unit,
        'Platform Sensor'
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
        + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sponsor_metrics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success("Metrics exported successfully.");
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
    if (impMetrics.length === 0) return [];
    
    return impMetrics.map((m) => ({
        label: new Date(m.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        value: m.metric_value
    })).slice(-7); 
  }, [filteredMetrics]);

  const conversionData = useMemo(() => {
    const leadMetrics = filteredMetrics.filter(m => m.metric_name.includes('Lead') || m.metric_name.includes('Click') || m.metric_name.includes('Engagement'));
    if (leadMetrics.length === 0) return [];

    return leadMetrics.map(m => ({
        label: m.metric_name.replace('Generated', '').trim(),
        value: m.metric_value
    }));
  }, [filteredMetrics]);

  // --- Progress Calculation ---
  const activeDeliverables = useMemo(() => {
      if (selectedEventId === 'all') return deliverables;
      const matchingDeals = deals.filter(d => d.event_id === selectedEventId).map(d => d.id);
      return deliverables.filter(d => matchingDeals.includes(d.event_sponsor_id));
  }, [deliverables, selectedEventId, deals]);

  const completedDeliverablesCount = activeDeliverables.filter(d => d.status === 'uploaded' || d.status === 'approved').length;
  const progressPercent = activeDeliverables.length > 0 ? Math.round((completedDeliverablesCount / activeDeliverables.length) * 100) : 0;

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-purple-600" size={48}/></div>;
  if (!sponsorProfile) return <div className="p-12 text-center"><h3>Access Denied</h3><p>No sponsor profile linked to your account.</p></div>;

  const activeDeal = deals[0];
  const eventOptions = Array.from(new Set(deals.map(d => d.event))).filter(Boolean);

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl mb-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
                    {sponsorProfile.logo_url ? <img src={sponsorProfile.logo_url} className="w-full h-full object-contain"/> : <span className="text-2xl font-bold text-gray-400">{sponsorProfile.name[0]}</span>}
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">Sponsor Portal</h1>
                    <p className="text-purple-100 text-lg">Welcome back, <span className="font-bold text-white">{sponsorProfile.name}</span></p>
                </div>
            </div>
            {activeDeal && (
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-right">
                    <p className="text-sm font-bold uppercase tracking-widest mb-1">{(activeDeal.event as any)?.title}</p>
                    <p className="text-xs text-purple-100 mb-3">{activeDeal.level} Partner</p>
                    <div className="flex justify-end gap-2">
                        <StatusBadge status={activeDeal.status} className={activeDeal.status === 'Activation Ready' ? 'bg-green-500/20 border-green-500/40 text-green-100' : 'bg-white/10 border-white/20 text-white'} />
                        {activeDeal.status !== 'Paid' && activeDeal.status !== 'Activation Ready' && (
                            <Button 
                                size="sm" 
                                variant="white" 
                                onClick={() => handlePayment(activeDeal.id, activeDeal.cash_value)}
                                disabled={processingPayment}
                                className="gap-2 text-xs h-7"
                            >
                                {processingPayment ? <Loader2 size={12} className="animate-spin" /> : <CreditCard size={12} />}
                                Pay
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* AI Suggestions (Dismissible) */}
      {showIdeas && (activationIdeas?.length > 0 || ideasLoading) && (
          <FadeIn className="mb-8">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-[2rem] border border-indigo-100 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4 relative z-10">
                      <div className="flex items-center gap-2">
                          <Sparkles className="text-indigo-600" size={20} />
                          <h3 className="font-serif font-bold text-xl text-indigo-900">AI Activation Suggestions</h3>
                      </div>
                      <button onClick={() => setShowIdeas(false)} className="p-1 hover:bg-white/50 rounded-full text-indigo-400 hover:text-indigo-700 transition-colors">
                          <X size={20} />
                      </button>
                  </div>
                  
                  {ideasLoading ? (
                      <div className="flex items-center gap-3 text-indigo-600 animate-pulse">
                          <Loader2 size={18} className="animate-spin" />
                          <span className="text-sm font-medium">Generating bespoke ideas for {sponsorProfile.name}...</span>
                      </div>
                  ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                          {activationIdeas?.map((idea, i) => (
                              <div key={i} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-indigo-50 cursor-default">
                                  <h4 className="font-bold text-indigo-900 text-sm mb-2">{idea.title}</h4>
                                  <p className="text-xs text-gray-600 leading-relaxed mb-3">{idea.description}</p>
                                  <span className="text-[10px] font-bold uppercase bg-indigo-50 text-indigo-600 px-2 py-1 rounded">{idea.estimated_cost || 'Custom'}</span>
                              </div>
                          ))}
                      </div>
                  )}
                  {/* Decor */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
              </div>
          </FadeIn>
      )}

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200 pb-1 overflow-x-auto">
        {['dashboard', 'activations', 'marketing'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-3 px-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                
                {/* Performance Charts Section */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                   <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-serif font-bold text-gray-900">ROI Performance</h2>
                      
                      {/* Event Filter */}
                      <div className="flex items-center gap-2">
                         <Button variant="ghost" size="sm" onClick={exportMetricsCSV} className="text-purple-600 hover:bg-purple-50 mr-2">
                             <Download size={14} className="mr-1" /> CSV
                         </Button>
                         <div className="h-4 w-px bg-gray-200 mr-2"></div>
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
                              data={impressionData.length > 0 ? impressionData : [{label: 'Start', value: 0}, {label: 'Today', value: 0}]} 
                              color="#8b5cf6"
                              height={200}
                           />
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                           <ResponsiveBarChart 
                              title="Conversion Metrics"
                              data={conversionData.length > 0 ? conversionData : [{label: 'Interactions', value: 0}]}
                              color="#ec4899"
                              height={200}
                           />
                        </div>
                     </div>
                   ) : (
                     <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <TrendingUp className="mx-auto mb-2 opacity-20" size={32} />
                        <p>No performance data available yet.</p>
                        <p className="text-xs mt-2">Metrics will appear once the event goes live.</p>
                     </div>
                   )}
                </div>

                {/* Deliverables */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-serif font-bold text-gray-900">Required Deliverables</h2>
                        <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Completion</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                            </div>
                            <span className="text-xs font-bold text-green-600">{progressPercent}%</span>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {activeDeliverables.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50 transition-all hover:bg-white hover:shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${item.status === 'uploaded' || item.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-white text-purple-500'}`}>
                                        {item.status === 'uploaded' || item.status === 'approved' ? <CheckCircle size={20}/> : <Upload size={20}/>}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-xs text-gray-500">Due: {new Date(item.due_date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div>
                                    {item.status === 'uploaded' || item.status === 'approved' ? (
                                        <StatusBadge status={item.status} />
                                    ) : (
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                id={`file-${item.id}`} 
                                                className="hidden" 
                                                onChange={(e) => e.target.files?.[0] && handleFileUpload(item.id, item.event_sponsor_id, e.target.files[0])}
                                                disabled={!!uploadingId}
                                            />
                                            <label htmlFor={`file-${item.id}`}>
                                                <Button 
                                                    size="sm" 
                                                    variant="primary" 
                                                    className="cursor-pointer shadow-lg shadow-purple-500/10"
                                                    as="span"
                                                    disabled={!!uploadingId}
                                                >
                                                    {uploadingId === item.id ? (
                                                        <span className="flex items-center gap-2">
                                                            <Loader2 size={12} className="animate-spin" /> 
                                                            {analyzing ? 'AI Analyzing...' : 'Uploading...'}
                                                        </span>
                                                    ) : 'Upload'}
                                                </Button>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {activeDeliverables.length === 0 && <p className="text-gray-400 text-center py-4">No pending deliverables for this event.</p>}
                    </div>
                </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-8">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                    <h3 className="font-serif font-bold text-xl mb-6">Live Impact</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-purple-50 p-4 rounded-xl text-center border border-purple-100">
                            <Eye className="mx-auto text-purple-600 mb-2" size={20}/>
                            <p className="text-2xl font-bold text-gray-900">
                                {metrics.reduce((acc, m) => m.metric_name.includes('Impression') ? acc + m.metric_value : acc, 0).toLocaleString()}
                            </p>
                            <p className="text-[10px] font-bold uppercase text-gray-400">Impressions</p>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-xl text-center border border-pink-100">
                            <Heart className="mx-auto text-pink-600 mb-2" size={20}/>
                            <p className="text-2xl font-bold text-gray-900">
                                {metrics.reduce((acc, m) => m.metric_name.includes('Engagement') ? acc + m.metric_value : acc, 0).toLocaleString()}
                            </p>
                            <p className="text-[10px] font-bold uppercase text-gray-400">Engagements</p>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-100">
                       <p className="text-xs text-gray-500 text-center">Data updated in real-time from event sensors.</p>
                    </div>
                </div>
            </div>
        </div>
      )}

      {activeTab === 'activations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activations.map(act => (
                  <FadeIn key={act.id}>
                      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                          <div className="flex justify-between items-start mb-4">
                              <h3 className="font-serif font-bold text-xl">{act.title}</h3>
                              <StatusBadge status={act.status} />
                          </div>
                          <div className="space-y-2 text-sm text-gray-600">
                              <p className="flex items-center gap-2"><Calendar size={16}/> {(act as any).event_sponsor?.event?.title}</p>
                              <p className="flex items-center gap-2"><MapPin size={16}/> {act.location_in_venue || 'Location TBD'}</p>
                          </div>
                          <p className="mt-4 text-gray-500 text-sm">{act.description}</p>
                      </div>
                  </FadeIn>
              ))}
              {activations.length === 0 && <div className="col-span-full text-center py-12 text-gray-400">No activations found.</div>}
          </div>
      )}

      {activeTab === 'marketing' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SocialPlanWidget 
            sponsorName={sponsorProfile.name} 
            sponsorIndustry={sponsorProfile.industry || 'General'}
            eventName={activeDeal ? (activeDeal.event as any)?.title : 'Fashion Event'}
          />
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
             <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-500">
                <Share2 size={32} />
             </div>
             <h3 className="text-2xl font-serif font-bold mb-2">Asset Library</h3>
             <p className="text-gray-500 mb-6">Access all your approved brand assets and event photos here.</p>
             <Button variant="outline">Open Library</Button>
          </div>
        </div>
      )}
    </div>
  );
};
