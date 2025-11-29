
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, Ticket, MoreHorizontal, MapPin, 
  Users, DollarSign, Search, 
  CheckCircle2, AlertCircle, Plus, ArrowUpRight, Loader2
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { useEvents } from '../../hooks/useEvents';
import { useRealtime } from '../../hooks/useRealtime';
import { useAuth } from '../../context/AuthContext';

// --- Components ---

const DonutChart = () => (
  <div className="relative w-40 h-40 mx-auto">
    <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="10" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="10" strokeDasharray="160 251" strokeLinecap="round" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#ec4899" strokeWidth="10" strokeDasharray="60 251" strokeDashoffset="-165" strokeLinecap="round" />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-2xl font-bold text-gray-900">65%</span>
      <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Capacity</span>
    </div>
  </div>
);

const RevenueChart = () => (
  <div className="flex items-end justify-between h-32 gap-2">
    {[40, 65, 45, 80, 55, 70, 90, 60].map((h, i) => (
      <div key={i} className="w-full bg-indigo-50 rounded-t-sm relative group hover:bg-indigo-100 transition-colors">
        <div 
          className="absolute bottom-0 w-full bg-indigo-500 rounded-t-sm transition-all duration-500" 
          style={{ height: `${h}%` }}
        />
      </div>
    ))}
  </div>
);

export const DashboardEvents = () => {
  const { user } = useAuth();
  const { events, loading, kpis, refetch } = useEvents({ organizerId: user?.id });
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Listen for any changes to events table to refresh the list
  useRealtime('events', () => {
    refetch();
  });

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.venue?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const kpiData = [
    { label: 'Upcoming Events', value: kpis.upcoming.toString(), icon: Calendar, color: 'text-pink-600', bg: 'bg-pink-50', trend: '+2' },
    { label: 'Total Events', value: kpis.totalEvents.toString(), icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+5' },
    { label: 'Registrations', value: '124', icon: Ticket, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50', trend: '+18%' }, // Mock for now until reg table joined
    { label: 'Revenue (Est)', value: '$12.5k', icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+22%' },
  ];

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Events Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage your runway shows, ticket sales, and guest lists.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input 
              type="text" 
              placeholder="Search events..." 
              className="bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-purple-400 w-64" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
             />
          </div>
          <Link to="/dashboard/events/new">
            <Button variant="primary" size="sm" className="rounded-full gap-2 shadow-lg shadow-purple-500/20">
               <Plus size={16} /> Create New Event
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. KPI ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <FadeIn key={i} delay={i * 50} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">{kpi.trend}</span>
            </div>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
          </FadeIn>
        ))}
      </div>

      {/* 3. ANALYTICS & HIGHLIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ticket Sales */}
        <FadeIn delay={100} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-gray-900">Ticket Capacity</h3>
             <select className="bg-gray-50 border-none text-xs font-bold rounded-lg px-2 py-1 text-gray-500"><option>All Events</option></select>
          </div>
          <div className="flex items-center justify-between gap-8">
             <DonutChart />
             <div className="space-y-3 flex-1">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Sold Out</span><span className="font-bold">2</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Selling Fast</span><span className="font-bold">5</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Draft</span><span className="font-bold">3</span></div>
             </div>
          </div>
        </FadeIn>

        {/* Revenue Analysis */}
        <FadeIn delay={200} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-2">
             <h3 className="font-bold text-gray-900">Sales Revenue</h3>
             <select className="bg-gray-50 border-none text-xs font-bold rounded-lg px-2 py-1 text-gray-500"><option>Last 6 Months</option></select>
          </div>
          <div className="mb-6">
             <p className="text-3xl font-bold text-gray-900">$12,540</p>
             <p className="text-xs text-green-500 font-bold flex items-center gap-1"><ArrowUpRight size={12} /> +$2,320 vs last mo</p>
          </div>
          <RevenueChart />
          <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
             <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
          </div>
        </FadeIn>

        {/* Quick Actions / Popular Categories */}
        <FadeIn delay={300} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-gray-900">Event Types</h3>
             <MoreHorizontal className="text-gray-400 cursor-pointer" size={16} />
          </div>
          <div className="space-y-6">
             {[{ name: 'Runway', count: events.filter(e => e.description?.toLowerCase().includes('runway')).length + ' Events' }, { name: 'Party', count: '2 Events' }].map((cat, i) => (
                <div key={i}>
                   <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-gray-700">{cat.name}</span>
                      <span className="text-gray-500 text-xs">{cat.count}</span>
                   </div>
                   <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full bg-purple-500`} style={{ width: `45%` }} />
                   </div>
                </div>
             ))}
          </div>
          <Button variant="outline" fullWidth className="mt-6 text-xs" onClick={() => navigate('/dashboard/events/new')}>Launch New Category</Button>
        </FadeIn>
      </div>

      {/* 5. ALL EVENTS GRID */}
      <section>
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif font-bold text-xl">My Events</h3>
            <Button variant="ghost" size="sm" onClick={refetch}>Refresh List</Button>
         </div>
         
         {loading ? (
            <div className="flex justify-center py-20">
               <Loader2 className="animate-spin text-purple-600" size={32} />
            </div>
         ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredEvents.map((evt, i) => (
                   <FadeIn 
                     key={evt.id} 
                     delay={i * 50} 
                     className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all group cursor-pointer transform hover:-translate-y-1 flex flex-col h-full"
                     onClick={() => navigate(`/dashboard/events`)} // Could go to detail page later
                   >
                      <div className="aspect-[16/9] relative overflow-hidden bg-gray-100">
                         {evt.featured_image_url ? (
                            <img src={evt.featured_image_url} alt={evt.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                               <Calendar size={48} />
                            </div>
                         )}
                         <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                            {evt.status}
                         </div>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                         <h4 className="font-serif font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors line-clamp-1">{evt.title}</h4>
                         <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                            <span className="flex items-center gap-1"><MapPin size={12} /> {evt.venue?.name || 'TBD'}</span>
                            <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(evt.start_time).toLocaleDateString()}</span>
                         </div>
                         <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-auto">
                            <span className="text-xs font-bold text-gray-400">{evt.registrations?.length || 0} / {evt.capacity_limit || '∞'} Guests</span>
                            <span className="text-purple-600 text-xs font-bold hover:underline flex items-center gap-1">Manage <ArrowUpRight size={12}/></span>
                         </div>
                      </div>
                   </FadeIn>
                ))}
            </div>
         ) : (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Calendar size={24} />
               </div>
               <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">No Events Yet</h3>
               <p className="text-gray-500 mb-6">Get started by creating your first event with our AI wizard.</p>
               <Link to="/dashboard/events/new">
                  <Button variant="primary">Create New Event</Button>
               </Link>
            </div>
         )}
      </section>
    </div>
  );
};
