
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Building2, Mail, Phone, Globe, MapPin, 
  FileText, Zap, Calendar, DollarSign, CheckCircle, Clock, 
  MoreHorizontal, ExternalLink, Plus, History
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { StatCard } from '../../components/dashboard/Shared';

// Mock Data
const SPONSOR_DATA = {
  id: '1',
  name: 'Luxe Beauty',
  industry: 'Cosmetics & Beauty',
  tier: 'Gold Partner',
  total_spent: '$145,000',
  status: 'Active',
  logo: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?w=200',
  contact: {
    name: 'Sarah Jenkins',
    role: 'Head of Partnerships',
    email: 'sarah.j@luxebeauty.com',
    phone: '+1 (555) 012-3456',
    location: 'New York, NY'
  },
  contracts: [
    { id: 101, event: 'Paris Fashion Week SS25', name: 'Gold Sponsorship Agreement', value: '$75,000', status: 'Active', date: 'Oct 15, 2025' },
    { id: 102, event: 'Milan Digital Showcase', name: 'Digital Activation Addendum', value: '$25,000', status: 'Completed', date: 'June 10, 2025' },
  ],
  activations: [
    { id: 201, name: 'VIP Beauty Lounge', event: 'Paris Fashion Week SS25', status: 'In Progress', date: 'Jan 2026' },
    { id: 202, name: 'Goodie Bag Insert', event: 'NY Designer Series', status: 'Planning', date: 'Mar 2026' },
  ],
  history: [
    { id: 1, action: 'Contract Signed', detail: 'Paris Fashion Week SS25', date: '2 days ago' },
    { id: 2, action: 'Meeting', detail: 'Renewal discussion with Sarah', date: '1 week ago' },
    { id: 3, action: 'Payment Received', detail: 'Invoice #INV-2024-001', date: '2 weeks ago' },
  ]
};

export const SponsorDetailPage: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'contracts' | 'activations'>('overview');
  
  // In real app, fetch data by ID
  const sponsor = SPONSOR_DATA; 

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
          <div className="w-24 h-24 bg-white border border-gray-200 rounded-2xl p-1 shadow-sm shrink-0">
            <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-cover rounded-xl" />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">{sponsor.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><Building2 size={14} /> {sponsor.industry}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-md">{sponsor.tier}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">Edit Profile</Button>
                <Button variant="primary" size="sm">New Deal</Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-100">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Total Value</p>
                <p className="text-xl font-bold text-gray-900">{sponsor.total_spent}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Active Deals</p>
                <p className="text-xl font-bold text-gray-900">{sponsor.contracts.filter(c => c.status === 'Active').length}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Status</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {sponsor.status}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Next Renewal</p>
                <p className="text-sm font-bold text-gray-900">Nov 2026</p>
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
                  <h3 className="font-serif font-bold text-xl mb-4">Recent Activity</h3>
                  <div className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
                    {sponsor.history.map((item) => (
                      <div key={item.id} className="relative flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 z-10">
                          <History size={14} className="text-gray-400" />
                        </div>
                        <div className="pt-1">
                          <p className="text-sm font-bold text-gray-900">{item.action}</p>
                          <p className="text-xs text-gray-500">{item.detail}</p>
                          <span className="text-[10px] text-gray-400 mt-1 block">{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contracts' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-serif font-bold text-xl">Agreements</h3>
                  <Button variant="outline" size="sm"><Plus size={14} className="mr-1"/> Add Contract</Button>
                </div>
                {sponsor.contracts.map(contract => (
                  <div key={contract.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-purple-200 hover:shadow-sm transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 group-hover:text-purple-600 transition-colors">{contract.name}</h4>
                        <p className="text-xs text-gray-500">{contract.event} • {contract.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{contract.value}</p>
                      <span className={`text-[10px] uppercase font-bold ${contract.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>{contract.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'activations' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-serif font-bold text-xl">Brand Activations</h3>
                  <Button variant="outline" size="sm"><Plus size={14} className="mr-1"/> Plan Activation</Button>
                </div>
                {sponsor.activations.map(act => (
                  <div key={act.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-pink-200 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center">
                        <Zap size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{act.name}</h4>
                        <p className="text-xs text-gray-500">{act.event} • {act.date}</p>
                      </div>
                    </div>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold uppercase">{act.status}</span>
                  </div>
                ))}
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
                {sponsor.contact.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-900">{sponsor.contact.name}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{sponsor.contact.role}</p>
              </div>
            </div>

            <div className="space-y-4">
              <a href={`mailto:${sponsor.contact.email}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-purple-600 transition-colors p-3 bg-gray-50 rounded-xl hover:bg-purple-50">
                <Mail size={16} /> {sponsor.contact.email}
              </a>
              <a href={`tel:${sponsor.contact.phone}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-purple-600 transition-colors p-3 bg-gray-50 rounded-xl hover:bg-purple-50">
                <Phone size={16} /> {sponsor.contact.phone}
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-600 p-3">
                <MapPin size={16} /> {sponsor.contact.location}
              </div>
            </div>
          </div>

          {/* Quick Notes */}
          <div className="bg-yellow-50/50 p-6 rounded-3xl border border-yellow-100">
            <h3 className="font-serif font-bold text-lg text-yellow-800 mb-3">Internal Notes</h3>
            <p className="text-sm text-yellow-700/80 italic mb-4">
              "Luxe Beauty prioritizes sustainability. Ensure all booth materials are eco-friendly for the SS25 activation."
            </p>
            <div className="flex items-center gap-2 text-xs text-yellow-600 font-bold uppercase tracking-wider">
              <div className="w-5 h-5 rounded-full bg-yellow-200 flex items-center justify-center">O</div>
              Added by Orlando
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
