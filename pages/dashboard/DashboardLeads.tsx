
import React from 'react';
import { Users, DollarSign, Target, Clock } from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader, StatCard, ContentCard } from '../../components/dashboard/Shared';

const LEADS_DATA = [
  { id: 1, company: "Sephora", industry: "Beauty", budget: "$50k - $75k", contact: "Sarah J.", status: "Pending" as const },
  { id: 2, company: "Samsung", industry: "Tech", budget: "$100k+", contact: "Mike R.", status: "Active" as const },
  { id: 3, company: "Evian", industry: "Beverage", budget: "$25k", contact: "Lila V.", status: "Draft" as const },
  { id: 4, company: "Nike", industry: "Apparel", budget: "$200k", contact: "Tom H.", status: "Active" as const },
];

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
