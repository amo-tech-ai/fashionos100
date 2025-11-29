
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, MapPin, Upload, Download, FileText, CheckCircle, 
  Loader2, User, Eye, Heart, Share2, TrendingUp, Plus, Sparkles, DollarSign, CreditCard, Filter
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { supabase, supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { SponsorProfile, EventSponsor, SponsorActivation, SponsorDeliverable, SponsorRoiMetric } from '../../types/sponsorship';
import { SocialPlanWidget } from '../../components/sponsors/SocialPlanWidget';
import { ResponsiveLineChart, ResponsiveBarChart } from '../../components/charts/DynamicCharts';
import { useToast } from '../../components/Toast';

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
      }

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (deliverableId: string, eventSponsorId: string, file: File) => {
    if (!sponsorProfile) return;
    
    setUploadingId(deliverableId);
    setAnalyzing(false); 
    
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
        // Get all deliverables for this specific deal
        const dealDeliverables = deliverables.filter(d => d.event_sponsor_id === eventSponsorId);
        // Check if others are pending (excluding current one which is now uploaded)
        const othersPending = dealDeliverables.filter(d => d.id !== deliverableId && d.status !== 'uploaded' && d.status !== 'approved');

        if (othersPending.length === 0) {
            // All done! Update Deal Status
            await supabase
                .from('event_sponsors')
                .update({ status: 'Activation Ready' })
                .eq('id', eventSponsorId);
            
            success("All deliverables uploaded! Contract status updated to Activation Ready.");
        } else {
             success("File uploaded successfully");
        }

        // 4. AI Analysis (Optional/Async)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64 = (reader.result as string).split(',')[1];
            fetch(`${supabaseUrl}/functions/v1/sponsor-ai`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${supabaseAnonKey}` },
                body: JSON.stringify({ action: 'analyze-media', mediaBase64: base64 })
            }).catch(err => console.warn("AI Analysis error", err));
        };

        fetchSponsorData();
    } catch (e: any) {
        console.error("Upload failed", e);
        error("Failed to upload file.");
    } finally {
        setUploadingId(null);
    }
  };

  const handlePayment = async (dealId: string, amount: number) => {
    setProcessingPayment(true);
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          amount,
          title: `Sponsorship Payment: ${dealId}`
        })
      });
      
      const data = await response.json();
      
      if (data.url) {
        alert("Redirecting to Secure Payment Gateway...");
        // Simulate success
        await supabase.from('event_sponsors').update({ status: 'Paid' }).eq('id', dealId);
        fetchSponsorData();
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
    // Find deal IDs associated with selected event
    const matchingDeals = deals.filter(d => d.event_id === selectedEventId).map(d => d.id);
    return metrics.filter(m => matchingDeals.includes(m.event_sponsor_id));
  }, [metrics, selectedEventId, deals]);

  // --- Chart Data Prep ---
  const impressionData = useMemo(() => {
    // Aggregate impressions over time
    const impMetrics = filteredMetrics.filter(m => m.metric_name.includes('Impression') || m.metric_name.includes('Views'));
    
    // If no metrics, return mock data for visualization
    if (impMetrics.length === 0) return [{label: 'Day 1', value: 500}, {label: 'Day 2', value: 1200}, {label: 'Day 3', value: 3500}];

    return impMetrics.map((m, i) => ({
        label: new Date(m.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        value: m.metric_value
    })).slice(-7); 
  }, [filteredMetrics]);

  const conversionData = useMemo(() => {
    const leadMetrics = filteredMetrics.filter(m => m.metric_name.includes('Lead') || m.metric_name.includes('Click') || m.metric_name.includes('Engagement'));
    
    if (leadMetrics.length === 0) return [{label: 'Clicks', value: 120}, {label: 'Leads', value: 45}, {label: 'Sales', value: 12}];

    return leadMetrics.map(m => ({
        label: m.metric_name.replace('Generated', '').trim(),
        value: m.metric_value
    }));
  }, [filteredMetrics]);

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
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold border ${activeDeal.status === 'Activation Ready' ? 'bg-green-500/20 border-green-500/40 text-green-100' : 'bg-white/10 border-white/20 text-white'}`}>
                           {activeDeal.status}
                        </span>
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

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                         <ResponsiveLineChart 
                            title="Impressions Over Time"
                            data={impressionData} 
                            color="#8b5cf6"
                            height={200}
                         />
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                         <ResponsiveBarChart 
                            title="Conversion Metrics"
                            data={conversionData}
                            color="#ec4899"
                            height={200}
                         />
                      </div>
                   </div>
                </div>

                {/* Deliverables */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-serif font-bold mb-6 text-gray-900">Required Deliverables</h2>
                    <div className="space-y-4">
                        {deliverables.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                        {item.status === 'uploaded' ? <CheckCircle className="text-green-500" size={20}/> : <Upload className="text-purple-500" size={20}/>}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-xs text-gray-500">Due: {new Date(item.due_date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div>
                                    {item.status === 'uploaded' ? (
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">Uploaded</span>
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
                                                    className="cursor-pointer"
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
                        {deliverables.length === 0 && <p className="text-gray-400 text-center py-4">No pending deliverables.</p>}
                    </div>
                </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-8">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                    <h3 className="font-serif font-bold text-xl mb-6">Live Impact</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-purple-50 p-4 rounded-xl text-center">
                            <Eye className="mx-auto text-purple-600 mb-2" size={20}/>
                            <p className="text-2xl font-bold text-gray-900">
                                {metrics.reduce((acc, m) => m.metric_name.includes('Impression') ? acc + m.metric_value : acc, 0).toLocaleString()}
                            </p>
                            <p className="text-[10px] font-bold uppercase text-gray-400">Impressions</p>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-xl text-center">
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
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">{act.status}</span>
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
