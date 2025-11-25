
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Building2, Mail, Phone, Globe, MapPin, 
  FileText, Zap, Calendar, DollarSign, Plus, History, Loader2
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { supabase } from '../../lib/supabase';
import { SponsorProfile, EventSponsor, SponsorActivation } from '../../types/sponsorship';

export const SponsorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // This is the Sponsor Profile ID
  const [activeTab, setActiveTab] = useState<'overview' | 'contracts' | 'activations'>('overview');
  
  const [sponsor, setSponsor] = useState<SponsorProfile | null>(null);
  const [deals, setDeals] = useState<EventSponsor[]>([]); 
  const [activations, setActivations] = useState<SponsorActivation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
        // 1. Fetch Sponsor Profile
        const { data: profile, error: profileError } = await supabase
            .from('sponsor_profiles')
            .select('*')
            .eq('id', id)
            .single();
        
        if (profileError) throw profileError;
        setSponsor(profile);

        // 2. Fetch Deals (Event Sponsors)
        const { data: eventSponsors, error: dealsError } = await supabase
            .from('event_sponsors')
            .select('*, event:events(title, start_time)')
            .eq('sponsor_id', id)
            .order('created_at', { ascending: false });

        if (dealsError) throw dealsError;
        setDeals(eventSponsors || []);

        // 3. Fetch Activations for these deals
        const dealIds = eventSponsors?.map(d => d.id) || [];
        if (dealIds.length > 0) {
            const { data: acts, error: actsError } = await supabase
                .from('sponsor_activations')
                .select('*, event_sponsor:event_sponsors(event:events(title))')
                .in('event_sponsor_id', dealIds);
            
            if (actsError) throw actsError;
            setActivations(acts || []);
        }

    } catch (error) {
        console.error("Error loading details:", error);
    } finally {
        setLoading(false);
    }
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

  // Derived Stats
  const totalSpent = deals.reduce((acc, deal) => acc + (deal.cash_value || 0), 0);
  const activeDealsCount = deals.filter(d => d.status === 'Signed' || d.status === 'Paid').length;
  const lastDeal = deals[0]; // Most recent

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans">
      {/* Breadcrumb */}
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
            <div className="flex justify-between items-start">
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
                <Button variant="outline" size="sm">Edit Profile</Button>
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

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Tabs & Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tabs */}
          <div className="flex gap-1 bg-white p-1.5 rounded-xl border border-gray-200 w-fit">
            {['overview', 'contracts', 'activations'].map((tab) => (
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

          {/* Tab Content */}
          <FadeIn key={activeTab} className="bg-white rounded-3xl border border-gray-100 shadow-sm min-h-[400px] p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
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
                            <p className="text-sm font-bold text-gray-900">Deal Updated: {deal.status}</p>
                            <p className="text-xs text-gray-500">{deal.event?.title}</p>
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

            {activeTab === 'contracts' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-serif font-bold text-xl">Agreements</h3>
                  <Link to="/dashboard/sponsors/new-deal"><Button variant="outline" size="sm"><Plus size={14} className="mr-1"/> Add Contract</Button></Link>
                </div>
                {deals.map(deal => (
                  <div key={deal.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-purple-200 hover:shadow-sm transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 group-hover:text-purple-600 transition-colors">{deal.level} Package</h4>
                        <p className="text-xs text-gray-500">{deal.event?.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${deal.cash_value.toLocaleString()}</p>
                      <span className={`text-[10px] uppercase font-bold ${deal.status === 'Signed' || deal.status === 'Paid' ? 'text-green-600' : 'text-gray-400'}`}>{deal.status}</span>
                    </div>
                  </div>
                ))}
                {deals.length === 0 && <div className="text-center py-10 text-gray-400">No contracts found.</div>}
              </div>
            )}

            {activeTab === 'activations' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-serif font-bold text-xl">Brand Activations</h3>
                  <Button variant="outline" size="sm"><Plus size={14} className="mr-1"/> Plan Activation</Button>
                </div>
                {activations.map(act => (
                  <div key={act.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-pink-200 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center">
                        <Zap size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{act.title}</h4>
                        <p className="text-xs text-gray-500">{act.type} • {(act as any).event_sponsor?.event?.title}</p>
                      </div>
                    </div>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold uppercase">{act.status}</span>
                  </div>
                ))}
                {activations.length === 0 && <div className="text-center py-10 text-gray-400">No activations planned yet.</div>}
              </div>
            )}
          </FadeIn>
        </div>

        {/* Right Column: Contact Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif font-bold text-lg">Primary Contact</h3>
              <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-bold text-lg">
                {(sponsor.contact_name || sponsor.name).charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-900">{sponsor.contact_name || 'No Contact'}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Representative</p>
              </div>
            </div>

            <div className="space-y-4">
              {sponsor.contact_email && (
                <a href={`mailto:${sponsor.contact_email}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-purple-600 transition-colors p-3 bg-gray-50 rounded-xl hover:bg-purple-50">
                    <Mail size={16} /> {sponsor.contact_email}
                </a>
              )}
              {sponsor.contact_phone && (
                <a href={`tel:${sponsor.contact_phone}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-purple-600 transition-colors p-3 bg-gray-50 rounded-xl hover:bg-purple-50">
                    <Phone size={16} /> {sponsor.contact_phone}
                </a>
              )}
            </div>
          </div>

          {/* Quick Notes */}
          <div className="bg-yellow-50/50 p-6 rounded-3xl border border-yellow-100">
            <h3 className="font-serif font-bold text-lg text-yellow-800 mb-3">Internal Notes</h3>
            <p className="text-sm text-yellow-700/80 italic mb-4">
              "Check latest contract terms regarding social media deliverables."
            </p>
            <div className="flex items-center gap-2 text-xs text-yellow-600 font-bold uppercase tracking-wider">
              <div className="w-5 h-5 rounded-full bg-yellow-200 flex items-center justify-center">S</div>
              System Note
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
