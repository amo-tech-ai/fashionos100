
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Activity, Clock, Users, DollarSign, Calendar, AlertCircle, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { PageHeader, StatCard } from '../../../components/dashboard/Shared';
import { FadeIn } from '../../../components/FadeIn';
import { supabase } from '../../../lib/supabase';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { Button } from '../../../components/Button';

export const EventCommandCenter: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<any>(null);
  const [stats, setStats] = useState({
    daysToGo: 0,
    ticketsSold: 0,
    totalCapacity: 0,
    revenue: 0,
    budgetSpent: 0, // Placeholder until expenses module is live
    readiness: 0,
    phasesCompleted: 0,
    totalPhases: 0
  });

  useEffect(() => {
    if (id) fetchEventData();
  }, [id]);

  const fetchEventData = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch Event Details
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
      
      if (eventError) throw eventError;
      setEvent(eventData);

      // 2. Fetch Tickets (Revenue & Sales)
      const { data: tickets, error: ticketError } = await supabase
        .from('ticket_tiers')
        .select('price, quantity_total, quantity_sold')
        .eq('event_id', id);

      if (ticketError) throw ticketError;

      const ticketsSold = tickets?.reduce((sum, t) => sum + (t.quantity_sold || 0), 0) || 0;
      const totalCapacity = tickets?.reduce((sum, t) => sum + (t.quantity_total || 0), 0) || 0;
      const revenue = tickets?.reduce((sum, t) => sum + ((t.price || 0) * (t.quantity_sold || 0)), 0) || 0;

      // 3. Fetch Timeline Progress
      const { data: phases, error: phasesError } = await supabase
        .from('event_phases')
        .select('status')
        .eq('event_id', id);
        
      if (phasesError) throw phasesError;

      const totalPhases = phases?.length || 14; // Default if not initialized
      const completedPhases = phases?.filter(p => p.status === 'completed').length || 0;
      const readiness = Math.round((completedPhases / totalPhases) * 100) || 0;

      // Calculate Days to Go
      const start = new Date(eventData.start_time);
      const now = new Date();
      const diffTime = start.getTime() - now.getTime();
      const daysToGo = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      setStats({
        daysToGo: daysToGo > 0 ? daysToGo : 0,
        ticketsSold,
        totalCapacity,
        revenue,
        budgetSpent: 0, // Mock for now
        readiness,
        phasesCompleted: completedPhases,
        totalPhases
      });

    } catch (err) {
      console.error("Error loading command center:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner /></div>;
  if (!event) return <div className="p-10 text-center">Event not found</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Event Command Center" 
        subtitle={`Real-time oversight for ${event.title}`}
        breadcrumbs={['Dashboard', 'Events', event.title]}
        actionLabel="View Public Page"
        onAction={() => window.open(`/events/${id}`, '_blank')}
      />

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          label="Days to Show" 
          value={stats.daysToGo.toString()} 
          icon={Clock} 
          color="bg-blue-50 text-blue-600" 
        />
        <StatCard 
          label="Tickets Sold" 
          value={`${stats.ticketsSold}/${stats.totalCapacity > 0 ? stats.totalCapacity : '∞'}`} 
          icon={Users} 
          color="bg-green-50 text-green-600" 
        />
        <StatCard 
          label="Gross Revenue" 
          value={`$${stats.revenue.toLocaleString()}`} 
          icon={DollarSign} 
          color="bg-purple-50 text-purple-600" 
        />
        <StatCard 
          label="Readiness" 
          value={`${stats.readiness}%`} 
          icon={Activity} 
          color={stats.readiness < 50 ? "bg-amber-50 text-amber-600" : "bg-indigo-50 text-indigo-600"} 
          trend={stats.readiness < 100 ? `${stats.totalPhases - stats.phasesCompleted} phases left` : 'Ready'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Timeline Snapshot */}
        <FadeIn className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-serif font-bold text-gray-900">Production Timeline</h3>
            <Link to={`/dashboard/events/${id}/timeline`}>
              <Button variant="outline" size="sm" className="gap-2">
                 Manage Timeline <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-1000 ease-out" 
                  style={{ width: `${stats.readiness}%` }} 
                />
              </div>
              <span className="font-bold text-gray-900 text-sm w-12 text-right">{stats.readiness}%</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {/* Quick Status Cards */}
               <div className="p-4 bg-green-50 border border-green-100 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1 text-green-700 font-bold text-xs uppercase tracking-wider">
                     <CheckCircle2 size={14} /> Venue
                  </div>
                  <p className="font-medium text-gray-900">{event.venue_id ? 'Confirmed' : 'Pending Selection'}</p>
               </div>
               <div className={`p-4 border rounded-2xl ${stats.ticketsSold > 0 ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-200'}`}>
                  <div className={`flex items-center gap-2 mb-1 font-bold text-xs uppercase tracking-wider ${stats.ticketsSold > 0 ? 'text-blue-700' : 'text-gray-500'}`}>
                     <Users size={14} /> Ticketing
                  </div>
                  <p className="font-medium text-gray-900">{stats.ticketsSold > 0 ? 'Live & Selling' : 'Setup Required'}</p>
               </div>
               <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1 text-purple-700 font-bold text-xs uppercase tracking-wider">
                     <Calendar size={14} /> Date
                  </div>
                  <p className="font-medium text-gray-900">{new Date(event.start_time).toLocaleDateString()}</p>
               </div>
            </div>
          </div>
        </FadeIn>

        {/* Right: AI Recommended Actions */}
        <FadeIn delay={100} className="bg-gray-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 pointer-events-none" />
           <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-yellow-400" /> Recommended Actions
              </h3>
              
              <div className="space-y-3">
                 {stats.ticketsSold === 0 && (
                    <div className="flex gap-3 items-start p-3 bg-white/10 rounded-xl border border-white/10">
                       <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                       <div>
                          <p className="text-sm font-bold">Launch Tickets</p>
                          <p className="text-xs text-gray-400 mt-1">Revenue is $0. Configure tiers to start selling.</p>
                          <Link to={`/dashboard/events/${id}/tickets`} className="text-xs font-bold text-purple-300 hover:text-white mt-2 block">Go to Tickets &rarr;</Link>
                       </div>
                    </div>
                 )}
                 {!event.featured_image_url && (
                    <div className="flex gap-3 items-start p-3 bg-white/10 rounded-xl border border-white/10">
                       <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                       <div>
                          <p className="text-sm font-bold">Add Event Imagery</p>
                          <p className="text-xs text-gray-400 mt-1">Events with banners get 40% more clicks.</p>
                       </div>
                    </div>
                 )}
                 <div className="flex gap-3 items-start p-3 bg-white/10 rounded-xl border border-white/10">
                     <Users size={16} className="text-green-400 shrink-0 mt-0.5" />
                     <div>
                        <p className="text-sm font-bold">Review Guest List</p>
                        <p className="text-xs text-gray-400 mt-1">Check VIP RSVPs for the front row.</p>
                        <Link to={`/dashboard/events/${id}/guests`} className="text-xs font-bold text-purple-300 hover:text-white mt-2 block">Manage Guests &rarr;</Link>
                     </div>
                 </div>
              </div>
           </div>
        </FadeIn>
      </div>
    </div>
  );
};