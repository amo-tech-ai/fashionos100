
import React from 'react';
import { FileText, CheckCircle, Image as ImageIcon, MapPin, Calendar, AlertCircle } from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader, ContentCard } from '../../components/dashboard/Shared';

// --- MOCK DATA ---
const CONTRACTS = [
  { id: 1, title: "Luxe Beauty Sponsorship Agreement", partner: "Luxe Beauty", date: "Oct 12, 2025", status: "Active" as const, value: "$25,000" },
  { id: 2, title: "Venue Rental - Brooklyn Loft", partner: "The Industrial Co.", date: "Pending Sign", status: "Pending" as const, value: "$8,000" },
  { id: 3, title: "Model Agency Booking", partner: "Elite Models", date: "Signed", status: "Completed" as const, value: "$15,000" },
];

const ACTIVATIONS = [
  { id: 1, name: "VIP Beauty Lounge", sponsor: "Luxe Beauty", location: "Mezzanine", status: "Active" as const, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400" },
  { id: 2, name: "Hydration Station", sponsor: "Hydra Water", location: "Entry Hall", status: "Pending" as const, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400" },
  { id: 3, name: "Interactive Photo Booth", sponsor: "TechFlow", location: "Main Floor", status: "Active" as const, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" },
];

const MEDIA_ASSETS = [
  { id: 1, title: "Runway Finale Video", type: "Video", date: "2h ago", size: "245 MB", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400" },
  { id: 2, title: "Backstage Highlights", type: "Image Set", date: "1d ago", size: "1.2 GB", image: "https://images.unsplash.com/photo-1529139574466-a302d2052505?w=400" },
  { id: 3, title: "Sponsor Logo Pack", type: "Graphics", date: "3d ago", size: "45 MB", image: "https://images.unsplash.com/photo-1626785774573-4b7993125651?w=400" },
];

// --- 1. CONTRACTS PAGE ---
export const DashboardContracts: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Contracts & Legal" 
        subtitle="Manage agreements, riders, and compliance." 
        breadcrumbs={['Dashboard', 'Contracts']}
        actionLabel="Upload Contract"
      />

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Document Name</th>
              <th className="px-6 py-4">Partner</th>
              <th className="px-6 py-4">Value</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {CONTRACTS.map((contract) => (
              <tr key={contract.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText size={16} /></div>
                  {contract.title}
                </td>
                <td className="px-6 py-4 text-gray-600">{contract.partner}</td>
                <td className="px-6 py-4 font-medium">{contract.value}</td>
                <td className="px-6 py-4 text-gray-500">{contract.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${contract.status === 'Active' || contract.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                    {contract.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-purple-600 hover:text-purple-800 font-bold text-xs">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- 2. ACTIVATIONS PAGE ---
export const DashboardActivations: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Floorplan & Activations" 
        subtitle="Coordinate sponsor booths and event zones." 
        breadcrumbs={['Dashboard', 'Activations']}
        actionLabel="New Activation"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACTIVATIONS.map((act, i) => (
          <FadeIn key={act.id} delay={i * 50}>
            <ContentCard 
              title={act.name}
              image={act.image}
              status={act.status}
              metrics={[
                { label: 'Sponsor', value: act.sponsor },
                { label: 'Zone', value: act.location }
              ]}
            >
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-gray-50 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <MapPin size={14} /> View on Map
                </button>
              </div>
            </ContentCard>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

// --- 3. MEDIA PAGE ---
export const DashboardMedia: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Media & Assets" 
        subtitle="Central repository for campaign content." 
        breadcrumbs={['Dashboard', 'Media']}
        actionLabel="Upload Media"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MEDIA_ASSETS.map((asset, i) => (
          <FadeIn key={asset.id} delay={i * 50}>
            <div className="group cursor-pointer">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative mb-3">
                <img src={asset.image} alt={asset.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold">Download</button>
                </div>
                <div className="absolute top-3 right-3 bg-black/50 text-white p-1 rounded-md backdrop-blur-sm">
                  {asset.type === 'Video' ? <AlertCircle size={14} /> : <ImageIcon size={14} />}
                </div>
              </div>
              <h4 className="font-bold text-gray-900 truncate">{asset.title}</h4>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{asset.type}</span>
                <span>{asset.size}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};
