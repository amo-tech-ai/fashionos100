
import React from 'react';
import { Users, DollarSign, Star, Briefcase, Zap, Award, Target, Clock } from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader, StatCard, ContentCard } from '../../components/dashboard/Shared';

// --- MOCK DATA ---
const LEADS_DATA = [
  { id: 1, company: "Sephora", industry: "Beauty", budget: "$50k - $75k", contact: "Sarah J.", status: "Pending" as const },
  { id: 2, company: "Samsung", industry: "Tech", budget: "$100k+", contact: "Mike R.", status: "Active" as const },
  { id: 3, company: "Evian", industry: "Beverage", budget: "$25k", contact: "Lila V.", status: "Draft" as const },
  { id: 4, company: "Nike", industry: "Apparel", budget: "$200k", contact: "Tom H.", status: "Active" as const },
];

const SPONSORS_DATA = [
  { id: 1, name: "LVMH Group", tier: "Platinum", spent: "$450,000", events: "4", image: "https://images.unsplash.com/photo-1559692976-9572467942a6?w=400", status: "Active" as const },
  { id: 2, name: "Mercedes Benz", tier: "Gold", spent: "$125,000", events: "2", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400", status: "Active" as const },
  { id: 3, name: "Vogue", tier: "Media Partner", spent: "$0 (In-Kind)", events: "All", image: "https://images.unsplash.com/photo-1542038784424-48dd95131591?w=400", status: "Active" as const },
];

const PACKAGES_DATA = [
  { id: 1, name: "Title Sponsor", price: "$150,000", description: "Headline branding on runway and all media assets.", slots: "1/1 Sold" },
  { id: 2, name: "Gold Tier", price: "$75,000", description: "VIP Lounge access and backstage branding.", slots: "2/4 Sold" },
  { id: 3, name: "Digital Partner", price: "$25,000", description: "Social media takeover and livestream logo.", slots: "5/10 Sold" },
];

// --- 1. LEADS PAGE ---
export const DashboardLeads: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Sponsor Leads" 
        subtitle="Track potential partnerships and deal flow." 
        breadcrumbs={['Dashboard', 'Leads']}
        actionLabel="Add Lead"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Pipeline Value" value="$1.2M" icon={DollarSign} trend="+15%" trendUp />
        <StatCard label="New Leads" value="24" icon={Users} color="bg-blue-50 text-blue-600" />
        <StatCard label="Conversion Rate" value="18%" icon={Target} color="bg-green-50 text-green-600" />
        <StatCard label="Avg Deal Time" value="14 Days" icon={Clock} color="bg-amber-50 text-amber-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {LEADS_DATA.map((lead, i) => (
          <FadeIn key={lead.id} delay={i * 50}>
            <ContentCard 
              title={lead.company}
              subtitle={lead.industry}
              status={lead.status}
              metrics={[
                { label: 'Est. Budget', value: lead.budget },
                { label: 'Contact', value: lead.contact }
              ]}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

// --- 2. SPONSORS PAGE ---
export const DashboardSponsorsList: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Active Sponsors" 
        subtitle="Manage relationships with your brand partners." 
        breadcrumbs={['Dashboard', 'Sponsors']}
        actionLabel="Add Sponsor"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SPONSORS_DATA.map((sponsor, i) => (
          <FadeIn key={sponsor.id} delay={i * 50}>
            <ContentCard 
              title={sponsor.name}
              image={sponsor.image}
              badge={sponsor.tier}
              status={sponsor.status}
              metrics={[
                { label: 'Total Value', value: sponsor.spent },
                { label: 'Active Events', value: sponsor.events }
              ]}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

// --- 3. PACKAGES PAGE ---
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
