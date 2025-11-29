
import React, { useState, useEffect } from 'react';
import { 
  Calendar, Camera, CheckCircle, Clock, MoreHorizontal, 
  Filter, Search, Download, Eye, AlertCircle, Loader2, Plus 
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader, StatCard } from '../../components/dashboard/Shared';
import { Button } from '../../components/Button';
import { AICopilotWidget } from '../../components/dashboard/Widgets';
import { supabase } from '../../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { useRealtime } from '../../hooks/useRealtime';
import { useToast } from '../../components/Toast';

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    requested: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-blue-50 text-blue-700 border-blue-200",
    production: "bg-purple-50 text-purple-700 border-purple-200 animate-pulse",
    post_production: "bg-pink-50 text-pink-700 border-pink-200",
    review: "bg-indigo-50 text-indigo-700 border-indigo-200",
    completed: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
    draft: "bg-gray-100 text-gray-600 border-gray-200"
  };
  const normalized = status?.toLowerCase() || 'draft';
  
  // Map for display labels if needed, otherwise just capitalize
  const label = normalized.replace('_', ' ');

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${styles[normalized] || 'bg-gray-100'}`}>
      {label}
    </span>
  );
};

export const DashboardStudio: React.FC = () => {
  const navigate = useNavigate();
  const { error: toastError } = useToast();
  const [filter, setFilter] = useState('All');
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('shoots')
        .select('*')
        .neq('status', 'draft') // Typically studio doesn't see drafts until requested
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      toastError('Failed to load studio bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Realtime updates
  useRealtime('shoots', () => {
    fetchBookings();
  });

  // KPI Calculations
  const pendingCount = bookings.filter(b => b.status === 'requested').length;
  const activeCount = bookings.filter(b => ['confirmed', 'production', 'post_production', 'review'].includes(b.status)).length;
  const weeklyRevenue = bookings
    .filter(b => {
      const date = new Date(b.created_at);
      const now = new Date();
      const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
      return date > oneWeekAgo;
    })
    .reduce((acc, curr) => acc + (curr.estimated_quote || 0), 0);

  const filteredBookings = bookings.filter(b => {
    if (filter === 'All') return true;
    if (filter === 'Requested') return b.status === 'requested';
    if (filter === 'Production') return ['confirmed', 'production', 'post_production', 'review'].includes(b.status);
    if (filter === 'Completed') return b.status === 'completed';
    return true;
  });

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Studio Command" 
        subtitle="Manage incoming shoot requests and production pipeline."
        breadcrumbs={['Dashboard', 'Studio']}
        actionLabel="New Booking"
        onAction={() => navigate('/start-project')}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Pending Requests" value={pendingCount.toString()} icon={AlertCircle} color="bg-amber-50 text-amber-600" />
        <StatCard label="Active Shoots" value={activeCount.toString()} icon={Camera} color="bg-purple-50 text-purple-600" />
        <StatCard label="This Week" value={`$${(weeklyRevenue / 1000).toFixed(1)}k`} icon={CheckCircle} color="bg-green-50 text-green-600" trend="+12%" trendUp />
        <StatCard label="Avg Turnaround" value="4 Days" icon={Clock} color="bg-blue-50 text-blue-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Booking Table */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden min-h-[400px]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {['All', 'Requested', 'Production', 'Completed'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filter === f ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 pl-2">
                <button className="p-2 text-gray-400 hover:text-black"><Search size={16} /></button>
                <button className="p-2 text-gray-400 hover:text-black"><Filter size={16} /></button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-gray-300" size={32} />
              </div>
            ) : bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Camera size={48} className="mb-4 opacity-20" />
                <p>No bookings found.</p>
                <Link to="/start-project" className="mt-4">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Plus size={14} /> Create Manual Booking
                    </Button>
                </Link>
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-white text-gray-400 text-[10px] font-bold uppercase tracking-wider border-b border-gray-50">
                  <tr>
                    <th className="px-6 py-4">Client / ID</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredBookings.map((booking) => {
                    // Fallback for client name
                    const clientName = booking.brief_data?.contact?.company || 
                                      (booking.brief_data?.contact?.firstName ? `${booking.brief_data.contact.firstName} ${booking.brief_data.contact.lastName}` : 'Guest Client');
                    
                    return (
                      <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{clientName}</div>
                          <div className="text-xs text-gray-500 font-mono uppercase">#{booking.id.substring(0, 8)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900 font-medium capitalize">{booking.shoot_type}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="capitalize">{booking.fashion_category}</span> • {booking.looks_count} Looks
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={booking.status} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500" title="View Details"><Eye size={16} /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500"><MoreHorizontal size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            
            {!loading && bookings.length > 0 && (
              <div className="p-6 border-t border-gray-100 text-center">
                <Button variant="ghost" size="sm">View Full Ledger</Button>
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Assistant & Tools */}
        <div className="space-y-6">
          <div className="h-[400px]">
            <AICopilotWidget 
              title="Studio AI Assistant"
              context="You are a helpful studio manager AI. Assist with scheduling, shoot concepts, and equipment checklists for fashion photography."
              placeholder="Draft a call sheet for tomorrow..."
            />
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-serif font-bold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" fullWidth className="justify-start h-12">Create Call Sheet</Button>
              <Button variant="outline" fullWidth className="justify-start h-12">Equipment Check</Button>
              <Button variant="outline" fullWidth className="justify-start h-12">Send Invoices</Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
