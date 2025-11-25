
import React, { useEffect, useState } from 'react';
import { 
  FileText, CheckCircle, Image as ImageIcon, MapPin, Calendar, AlertCircle, 
  Upload, Download, Clock, DollarSign, Zap, Armchair, Sparkles, Store, Monitor, PartyPopper, Users, ChevronRight,
  Video, Plus, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { supabase } from '../../lib/supabase';
import { EventSponsor, SponsorActivation, SponsorDeliverable } from '../../types/sponsorship';

// --- HELPER COMPONENTS ---

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    active: "bg-green-100 text-green-700 border-green-200",
    completed: "bg-green-100 text-green-700 border-green-200",
    paid: "bg-green-100 text-green-700 border-green-200",
    signed: "bg-purple-50 text-purple-700 border-purple-200",
    "pending signature": "bg-amber-100 text-amber-700 border-amber-200",
    pending: "bg-blue-50 text-blue-600 border-blue-100",
    "in_progress": "bg-amber-50 text-amber-600 border-amber-100",
    partial: "bg-amber-100 text-amber-700 border-amber-200",
    draft: "bg-gray-100 text-gray-600 border-gray-200",
    uploaded: "bg-blue-50 text-blue-600 border-blue-100",
    approved: "bg-green-100 text-green-700 border-green-200",
  };

  const baseClass = "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border";
  const normalized = status?.toLowerCase().replace(' ', '_') || 'draft';
  const specificClass = styles[normalized] || styles.draft;

  return <span className={`${baseClass} ${specificClass}`}>{status}</span>;
};

const MediaTypeIcon = ({ type }: { type: string }) => {
  const styles = {
    image: { icon: ImageIcon, color: "bg-purple-50 text-purple-600" },
    video: { icon: Video, color: "bg-blue-50 text-blue-600" },
    doc: { icon: FileText, color: "bg-green-50 text-green-600" },
    logo: { icon: StarIcon, color: "bg-amber-50 text-amber-600" }
  };
  const Config = styles[type as keyof typeof styles] || styles.doc;
  const Icon = Config.icon;
  
  return (
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${Config.color}`}>
      <Icon size={16} />
    </div>
  );
};

const StarIcon = ({size}: {size:number}) => <Sparkles size={size} />;

// --- 1. CONTRACTS PAGE ---
export const DashboardContracts: React.FC = () => {
  const [contracts, setContracts] = useState<EventSponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
      const { data } = await supabase
        .from('event_sponsors')
        .select('*, sponsor:sponsor_profiles(*), event:events(*)')
        .in('status', ['Negotiating', 'Signed', 'Paid'])
        .order('created_at', { ascending: false });
      setContracts(data || []);
      setLoading(false);
    };
    fetchContracts();
  }, []);

  if (loading) return <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="animate-in fade-in duration-700 pb-20 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Contracting & Agreements</h1>
          <p className="text-gray-500">Manage sponsorship contracts and track status</p>
        </div>
      </div>

      <div className="space-y-6">
        {contracts.map((contract) => (
          <FadeIn key={contract.id}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6 md:p-8 border-b border-gray-50 bg-gradient-to-r from-pink-50/30 to-transparent">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm text-xl font-serif font-bold text-gray-300 overflow-hidden">
                      {contract.sponsor?.logo_url ? <img src={contract.sponsor.logo_url} className="w-full h-full object-cover"/> : contract.sponsor?.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl font-serif font-bold text-gray-900">{contract.sponsor?.name}</h3>
                        <StatusBadge status={contract.status} />
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                        <span>{contract.event?.title}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-green-600 font-bold">${contract.cash_value.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    {contract.contract_url ? (
                        <a href={contract.contract_url} target="_blank" rel="noreferrer">
                            <Button size="sm" variant="outline" className="gap-2"><Download size={14}/> Contract</Button>
                        </a>
                    ) : (
                        <span className="text-xs text-amber-500 font-bold flex items-center gap-1"><AlertCircle size={12}/> No Contract PDF</span>
                    )}
                    <Button size="sm" className="bg-[#ec4899] hover:bg-[#db2777] text-white border-none rounded-lg px-6">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
        {contracts.length === 0 && <div className="text-center text-gray-400 py-12">No active contracts found.</div>}
      </div>
    </div>
  );
};

// --- 2. ACTIVATIONS PAGE ---
export const DashboardActivations: React.FC = () => {
  const [activations, setActivations] = useState<SponsorActivation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivations = async () => {
      const { data } = await supabase
        .from('sponsor_activations')
        .select('*, event_sponsor:event_sponsors(sponsor:sponsor_profiles(name), event:events(title))')
        .order('created_at', { ascending: false });
      setActivations(data || []);
      setLoading(false);
    };
    fetchActivations();
  }, []);

  if (loading) return <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="animate-in fade-in duration-700 pb-20 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Brand Activations</h1>
          <p className="text-gray-500">Manage sponsor activations and experiences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activations.map((act, i) => (
          <FadeIn key={act.id} delay={i * 50}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-purple-50 text-purple-600">
                    <Zap size={22} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-gray-900">{act.title}</h3>
                    <p className="text-sm text-gray-500">{act.event_sponsor?.sponsor?.name}</p>
                  </div>
                </div>
                <StatusBadge status={act.status} />
              </div>

              <div className="bg-gray-50/50 rounded-xl p-4 mb-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="font-medium">Event:</span> {act.event_sponsor?.event?.title}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="font-medium">Location:</span> {act.location_in_venue || 'TBD'}
                </div>
              </div>

              <div className="mt-auto">
                <Link to={`/dashboard/activations/${act.id}`} className="w-full py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-black transition-colors flex items-center justify-center gap-2">
                  View Details <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </FadeIn>
        ))}
        {activations.length === 0 && <div className="col-span-full text-center text-gray-400 py-12">No activations planned yet.</div>}
      </div>
    </div>
  );
};

// --- 3. MEDIA DELIVERABLES BOARD ---
export const DashboardMedia: React.FC = () => {
  const [deliverables, setDeliverables] = useState<SponsorDeliverable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliverables = async () => {
      const { data } = await supabase
        .from('sponsor_deliverables')
        .select('*, event_sponsor:event_sponsors(sponsor:sponsor_profiles(name), event:events(title))')
        .order('due_date', { ascending: true });
      setDeliverables(data || []);
      setLoading(false);
    };
    fetchDeliverables();
  }, []);

  const getByStatus = (status: string) => deliverables.filter(d => d.status === status);

  if (loading) return <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  const columns = [
      { title: 'Pending', items: getByStatus('pending') },
      { title: 'Uploaded', items: getByStatus('uploaded') },
      { title: 'Approved', items: getByStatus('approved') },
  ];

  return (
    <div className="animate-in fade-in duration-700 pb-20 font-sans h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Media Deliverables</h1>
          <p className="text-gray-500">Track sponsor assets</p>
        </div>
      </div>

      <div className="flex-grow overflow-x-auto pb-4">
        <div className="flex flex-col md:flex-row gap-6 min-w-full md:min-w-[1000px]">
          {columns.map((col, idx) => (
            <div key={idx} className="flex-1 min-w-[280px]">
                <div className="flex justify-between items-center mb-4 px-1">
                <h3 className="font-serif font-bold text-lg">{col.title}</h3>
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">{col.items.length}</span>
                </div>
                <div className="space-y-4">
                {col.items.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-3">
                            <MediaTypeIcon type={item.type} />
                            <span className="text-xs text-gray-400 font-medium">{new Date(item.due_date).toLocaleDateString()}</span>
                        </div>
                        <h4 className="font-serif font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">{item.title}</h4>
                        <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">{item.event_sponsor?.sponsor?.name}</p>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-1">{item.event_sponsor?.event?.title}</p>
                        
                        {item.asset_url && (
                            <div className="pt-3 border-t border-gray-50">
                                <a href={item.asset_url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                    <Download size={12}/> View Asset
                                </a>
                            </div>
                        )}
                    </div>
                ))}
                {col.items.length === 0 && <div className="text-center text-gray-300 text-sm py-4 border-2 border-dashed border-gray-100 rounded-xl">No items</div>}
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
