
import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Upload, Download, FileText, CheckCircle, 
  Loader2, User, Eye, Heart, Share2, TrendingUp, Plus, Sparkles
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { supabase, supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { SponsorProfile, EventSponsor, SponsorActivation, SponsorDeliverable } from '../../types/sponsorship';

export const SponsorPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'activations'>('dashboard');
  const [loading, setLoading] = useState(true);
  const [sponsorProfile, setSponsorProfile] = useState<SponsorProfile | null>(null);
  const [deals, setDeals] = useState<EventSponsor[]>([]);
  const [activations, setActivations] = useState<SponsorActivation[]>([]);
  const [deliverables, setDeliverables] = useState<SponsorDeliverable[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchSponsorData();
  }, []);

  const fetchSponsorData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
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
        .select('*, event:events(title, start_time)')
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
      }

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (deliverableId: string, file: File) => {
    if (!sponsorProfile) return;
    
    setUploadingId(deliverableId);
    setAnalyzing(true);
    try {
        // 1. Upload to Storage (Secure Path: sponsor-assets/{sponsorId}/{deliverableId}/{filename})
        const filePath = `sponsor-assets/${sponsorProfile.id}/${deliverableId}/${file.name}`;
        
        const { error: uploadError } = await supabase.storage
            .from('documents') // Assuming 'documents' is the general bucket
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('documents')
            .getPublicUrl(filePath);

        // 2. AI Analysis (Media Agent)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64 = (reader.result as string).split(',')[1];
            
            await fetch(`${supabaseUrl}/functions/v1/sponsor-ai`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${supabaseAnonKey}` },
                body: JSON.stringify({
                    action: 'analyze-media',
                    mediaBase64: base64
                })
            });
            
            // 3. Update DB
            await supabase
            .from('sponsor_deliverables')
            .update({ status: 'uploaded', asset_url: publicUrl })
            .eq('id', deliverableId);

            fetchSponsorData();
            setAnalyzing(false);
            setUploadingId(null);
        };
    } catch (e) {
        console.error("Upload failed", e);
        alert("Upload failed. Please try again.");
        setUploadingId(null);
        setAnalyzing(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-purple-600" size={48}/></div>;
  if (!sponsorProfile) return <div className="p-12 text-center"><h3>Access Denied</h3><p>No sponsor profile linked to your account.</p></div>;

  const activeDeal = deals[0];

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
                    <p className="text-sm font-bold uppercase tracking-widest mb-1">{activeDeal.event?.title}</p>
                    <p className="text-xs text-purple-100">{activeDeal.level} Partner</p>
                </div>
            )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200 pb-1">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`pb-3 px-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'dashboard' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('activations')}
          className={`pb-3 px-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'activations' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
        >
          Activations
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Deliverables */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-serif font-bold mb-6">Required Deliverables</h2>
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
                                                onChange={(e) => e.target.files?.[0] && handleFileUpload(item.id, e.target.files[0])}
                                                disabled={!!uploadingId}
                                            />
                                            <label htmlFor={`file-${item.id}`}>
                                                <Button 
                                                    size="sm" 
                                                    variant="primary" 
                                                    className="cursor-pointer"
                                                    as="span"
                                                >
                                                    {uploadingId === item.id ? (analyzing ? 'AI Analyzing...' : 'Uploading...') : 'Upload'}
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

            <div className="space-y-8">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                    <h3 className="font-serif font-bold text-xl mb-6">Live Impact</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-purple-50 p-4 rounded-xl text-center">
                            <Eye className="mx-auto text-purple-600 mb-2" size={20}/>
                            <p className="text-2xl font-bold text-gray-900">--</p>
                            <p className="text-[10px] font-bold uppercase text-gray-400">Impressions</p>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-xl text-center">
                            <Heart className="mx-auto text-pink-600 mb-2" size={20}/>
                            <p className="text-2xl font-bold text-gray-900">--</p>
                            <p className="text-[10px] font-bold uppercase text-gray-400">Engagement</p>
                        </div>
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
    </div>
  );
};
