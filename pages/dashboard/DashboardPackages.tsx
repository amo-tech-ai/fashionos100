
import React from 'react';
import { Award } from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader } from '../../components/dashboard/Shared';

const PACKAGES_DATA = [
  { id: 1, name: "Title Sponsor", price: "$150,000", description: "Headline branding on runway and all media assets.", slots: "1/1 Sold" },
  { id: 2, name: "Gold Tier", price: "$75,000", description: "VIP Lounge access and backstage branding.", slots: "2/4 Sold" },
  { id: 3, name: "Digital Partner", price: "$25,000", description: "Social media takeover and livestream logo.", slots: "5/10 Sold" },
];

export const DashboardPackages: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Sponsorship Packages" 
        subtitle="Define tiers and deliverables for your events." 
        breadcrumbs={['Dashboard', 'Packages']}
        actionLabel="Create Package"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {PACKAGES_DATA.map((pkg, i) => (
          <FadeIn key={pkg.id} delay={i * 100}>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[100%] -mr-8 -mt-8 z-0 group-hover:bg-purple-100 transition-colors" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-purple-600">
                  <Award size={24} />
                </div>
                <h3 className="font-serif font-bold text-2xl mb-2">{pkg.name}</h3>
                <p className="text-3xl font-bold text-purple-600 mb-4">{pkg.price}</p>
                <p className="text-gray-500 text-sm mb-8 h-12">{pkg.description}</p>
                
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-400 mb-6 border-t border-gray-100 pt-4">
                  <span>Availability</span>
                  <span className="text-gray-900">{pkg.slots}</span>
                </div>

                <button className="w-full py-3 rounded-xl border border-gray-200 font-bold text-sm hover:bg-black hover:text-white transition-all">
                  Edit Package
                </button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};
