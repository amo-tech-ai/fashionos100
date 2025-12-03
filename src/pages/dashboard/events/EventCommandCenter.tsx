
import React from 'react';
import { Activity, Clock, Users, DollarSign } from 'lucide-react';
import { PageHeader, StatCard } from '../../../components/dashboard/Shared';
import { FadeIn } from '../../../components/FadeIn';

export const EventCommandCenter: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader 
        title="Event Command Center" 
        subtitle="Real-time oversight of production, logistics, and sales."
        breadcrumbs={['Dashboard', 'Events', 'Runway 2025']}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Days to Show" value="14" icon={Clock} color="bg-blue-50 text-blue-600" />
        <StatCard label="Tickets Sold" value="342/500" icon={Users} color="bg-green-50 text-green-600" />
        <StatCard label="Budget Spent" value="$45k" icon={DollarSign} color="bg-purple-50 text-purple-600" />
        <StatCard label="Readiness" value="85%" icon={Activity} color="bg-amber-50 text-amber-600" />
      </div>

      <FadeIn>
        <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
          <h2 className="text-2xl font-serif font-bold text-gray-300 mb-2">Timeline & Critical Path</h2>
          <p className="text-gray-400">Gantt chart and milestone tracker coming soon.</p>
        </div>
      </FadeIn>
    </div>
  );
};
