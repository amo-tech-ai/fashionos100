
import React from 'react';
import { Calendar, CheckCircle, Clock, Star, X, Plus, ArrowUpRight, ArrowDownRight, Loader2, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { DashboardKPI } from '../../types';
import { FadeIn } from '../../components/FadeIn';
import { useShoots } from '../../hooks/useShoots';
import { useRealtime } from '../../hooks/useRealtime';

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    requested: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-blue-50 text-blue-700 border-blue-200",
    shooting: "bg-purple-50 text-purple-700 border-purple-200",
    completed: "bg-green-50 text-green-700 border-green-200",
  };
  const normalized = status?.toLowerCase() || 'requested';
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${styles[normalized] || 'bg-gray-100'}`}>
      {status}
    </span>
  );
};

export const DashboardBookings = () => {
  const { shoots, loading, kpis, refetch } = useShoots();

  // Realtime updates for bookings
  useRealtime('shoots', () => {
    refetch();
  });

  const kpiList: DashboardKPI[] = [
    { label: 'Total Bookings', val: kpis.totalBookings.toString(), sub: 'All-time', icon: Calendar, color: 'bg-indigo-50 text-indigo-600', trend: 'up' },
    { label: 'In Production', val: kpis.active.toString(), sub: 'Active shoots', icon: Camera, color: 'bg-pink-50 text-pink-600', trend: 'up' },
    { label: 'Total Spend', val: `$${kpis.totalSpend.toLocaleString()}`, sub: 'Lifetime', icon: Clock, color: 'bg-blue-50 text-blue-600', trend: 'up' },
    { label: 'Completed', val: kpis.completed.toString(), sub: 'Assets delivered', icon: CheckCircle, color: 'bg-green-50 text-green-600', trend: 'up' },
    { label: 'Drafts', val: '0', sub: 'Saved projects', icon: Star, color: 'bg-amber-50 text-amber-600', trend: 'up' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-end">
        <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-500">Track your photoshoots and download assets.</p>
        </div>
        <div className="flex items-center gap-3">
           <Link to="/start-project">
             <Button variant="accent" size="sm" className="gap-2"><Plus size={14} /> Book New Shoot</Button>
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiList.map((k, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-3">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center ${k.color} group-hover:scale-110 transition-transform`}>
                  <k.icon size={20} />
               </div>
               {k.trend === 'up' ? <ArrowUpRight size={16} className="text-green-500" /> : <ArrowDownRight size={16} className="text-red-500" />}
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">{k.label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{k.val}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[300px]">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-bold text-xl">Recent Projects</h2>
          </div>
          
          {loading ? (
             <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-gray-300" size={32} />
             </div>
          ) : shoots.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-64 text-center p-8">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Camera className="text-gray-400" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-500 mb-6 max-w-xs">Start your first project to see it tracked here.</p>
                <Link to="/start-project"><Button variant="outline">Start Project</Button></Link>
             </div>
          ) : (
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 text-gray-400 text-[10px] font-bold uppercase tracking-wider border-b border-gray-50">
                   <tr>
                      <th className="px-6 py-4">Project ID</th>
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {shoots.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                         <td className="px-6 py-4 font-mono text-xs text-gray-500 uppercase">#{booking.id.substring(0, 8)}</td>
                         <td className="px-6 py-4">
                            <p className="font-bold text-gray-900 capitalize">{booking.shoot_type}</p>
                            <p className="text-xs text-gray-500 capitalize">{booking.fashion_category}</p>
                         </td>
                         <td className="px-6 py-4 text-gray-600">
                            {new Date(booking.created_at).toLocaleDateString()}
                         </td>
                         <td className="px-6 py-4 font-medium">
                            ${(booking.estimated_quote || 0).toLocaleString()}
                         </td>
                         <td className="px-6 py-4">
                            <StatusBadge status={booking.status} />
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          )}
      </div>
    </div>
  );
};
