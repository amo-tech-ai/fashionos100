
import React from 'react';
import { Users, DollarSign, Target, Clock } from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader, StatCard } from '../../components/dashboard/Shared';
import { SponsorDirectory } from '../../components/sponsors/SponsorDirectory';

export const DashboardLeads: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Sponsor Database" 
        subtitle="Manage your global directory of brand partners and leads." 
        breadcrumbs={['Dashboard', 'Database']}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Profiles" value="48" icon={Users} color="bg-blue-50 text-blue-600" />
        <StatCard label="Industries" value="12" icon={Target} color="bg-purple-50 text-purple-600" />
        <StatCard label="Active Deals" value="18" icon={DollarSign} color="bg-green-50 text-green-600" />
        <StatCard label="Avg Response" value="2 Days" icon={Clock} color="bg-amber-50 text-amber-600" />
      </div>

      {/* Real Data Directory */}
      <SponsorDirectory />
    </div>
  );
};
