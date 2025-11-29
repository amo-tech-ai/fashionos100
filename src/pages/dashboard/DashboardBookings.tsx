import React from 'react';
import { Calendar, CheckCircle, Clock, Star, X, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '../../components/Button';
import { DashboardKPI } from '../../types';

export const DashboardBookings = () => {
  const kpis: DashboardKPI[] = [
    { label: 'Total Bookings', val: '55,000', sub: 'All-time bookings', icon: Calendar, color: 'bg-indigo-50 text-indigo-600', trend: 'up' },
    { label: 'Tickets Sold', val: '45,000', sub: 'Confirmed tickets', icon: CheckCircle, color: 'bg-pink-50 text-pink-600', trend: 'up' },
    { label: 'Total Earnings', val: '$275,450', sub: 'Gross Revenue', icon: Clock, color: 'bg-blue-50 text-blue-600', trend: 'up' },
    { label: 'Upcoming', val: '124', sub: 'Next 7 days', icon: Star, color: 'bg-amber-50 text-amber-600', trend: 'up' },
    { label: 'Cancelled', val: '12', sub: 'This month', icon: X, color: 'bg-red-50 text-red-600', trend: 'down' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Bookings</h1>
        <div className="flex items-center gap-3">
           <Button variant="accent" size="sm" className="gap-2"><Plus size={14} /> Add Booking</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((k, i) => (
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
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold mb-4">Recent Bookings Table</h2>
          <p className="text-sm text-gray-500">Full booking ledger and transaction history.</p>
      </div>
    </div>
  );
};