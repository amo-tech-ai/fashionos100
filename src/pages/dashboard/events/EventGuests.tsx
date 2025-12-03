
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Users, Search, Filter, Download, Mail, Check, X, Plus } from 'lucide-react';
import { PageHeader, StatCard } from '../../../components/dashboard/Shared';
import { Button } from '../../../components/Button';
import { FadeIn } from '../../../components/FadeIn';
import { supabase } from '../../../lib/supabase';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { useToast } from '../../../components/Toast';

interface Guest {
  id: string;
  attendee_name: string;
  attendee_email: string;
  status: string;
  ticket_tier_id: string;
  ticket_name?: string;
}

export const EventGuests: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { success, error } = useToast();

  useEffect(() => {
    if (id) fetchGuests();
  }, [id]);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      // Join with ticket tiers to get ticket name
      const { data, error: err } = await supabase
        .from('registrations')
        .select('*, ticket:ticket_tiers(name)')
        .eq('event_id', id)
        .order('created_at', { ascending: false });

      if (err) throw err;

      const formatted = data?.map((r: any) => ({
         ...r,
         ticket_name: r.ticket?.name
      })) || [];
      
      setGuests(formatted);
    } catch (err) {
      console.error('Error fetching guests:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredGuests = guests.filter(g => 
    g.attendee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.attendee_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: guests.length,
    confirmed: guests.filter(g => g.status === 'confirmed').length,
    checkedIn: guests.filter(g => g.status === 'checked_in').length,
    pending: guests.filter(g => g.status === 'pending').length,
  };

  const handleCheckIn = async (guestId: string) => {
     try {
        await supabase.from('registrations').update({ status: 'checked_in' }).eq('id', guestId);
        setGuests(prev => prev.map(g => g.id === guestId ? { ...g, status: 'checked_in' } : g));
        success("Guest checked in");
     } catch (e) {
        error("Check-in failed");
     }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Guest List" 
        subtitle="Manage RSVPs, tickets, and check-ins."
        breadcrumbs={['Dashboard', 'Events', 'Guests']}
        actionLabel="Add Guest"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Guests" value={stats.total.toString()} icon={Users} color="bg-blue-50 text-blue-600" />
        <StatCard label="Confirmed" value={stats.confirmed.toString()} icon={Check} color="bg-green-50 text-green-600" />
        <StatCard label="Checked In" value={stats.checkedIn.toString()} icon={MapPin} color="bg-purple-50 text-purple-600" />
        <StatCard label="Pending" value={stats.pending.toString()} icon={Clock} color="bg-amber-50 text-amber-600" />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
         {/* Toolbar */}
         <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
            <div className="relative w-full md:w-96">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
               <input 
                  type="text" 
                  placeholder="Search by name or email..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <div className="flex gap-2">
               <Button variant="white" size="sm" className="gap-2"><Filter size={14}/> Filter</Button>
               <Button variant="white" size="sm" className="gap-2"><Download size={14}/> Export CSV</Button>
            </div>
         </div>

         {/* Table */}
         <div className="overflow-x-auto">
            {loading ? (
               <div className="flex justify-center py-20"><LoadingSpinner /></div>
            ) : filteredGuests.length === 0 ? (
               <div className="text-center py-20 text-gray-400">
                  <Users size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No guests found.</p>
               </div>
            ) : (
               <table className="w-full text-left text-sm">
                  <thead className="bg-white text-gray-400 text-[10px] font-bold uppercase tracking-wider border-b border-gray-50">
                     <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Ticket Type</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {filteredGuests.map((guest) => (
                        <tr key={guest.id} className="hover:bg-gray-50/50 transition-colors">
                           <td className="px-6 py-4">
                              <p className="font-bold text-gray-900">{guest.attendee_name}</p>
                              <p className="text-xs text-gray-500">{guest.attendee_email}</p>
                           </td>
                           <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                                 {guest.ticket_name || 'General'}
                              </span>
                           </td>
                           <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                                 guest.status === 'checked_in' ? 'bg-green-100 text-green-700' : 
                                 guest.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : 
                                 'bg-gray-100 text-gray-600'
                              }`}>
                                 {guest.status.replace('_', ' ')}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                              {guest.status !== 'checked_in' && (
                                 <button 
                                    onClick={() => handleCheckIn(guest.id)}
                                    className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors" 
                                    title="Check In"
                                 >
                                    <Check size={16} />
                                 </button>
                              )}
                              <button className="p-2 bg-gray-50 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" title="Email">
                                 <Mail size={16} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            )}
         </div>
      </div>
    </div>
  );
};
import { MapPin, Clock } from 'lucide-react';
