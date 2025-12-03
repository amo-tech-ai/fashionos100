
import React, { useState, useEffect } from 'react';
import { MapPin, Users, Plus, Search, Filter, Building, Star, ExternalLink } from 'lucide-react';
import { PageHeader } from '../../components/dashboard/Shared';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { supabase } from '../../lib/supabase';
import { EmptyState } from '../../components/EmptyState';

interface Venue {
  id: string;
  name: string;
  city: string;
  address?: string;
  capacity?: number;
  geo_lat?: number;
  geo_lng?: number;
  features?: string[];
  type?: string;
}

export const VenueDirectory: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        // Using supabase client directly for now, can move to service later
        // Mocking fetch if table doesn't exist or is empty for MVP demo
        const { data, error } = await supabase
          .from('venues')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setVenues(data || []);
      } catch (error) {
        console.error('Error fetching venues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const filteredVenues = venues.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Venue Directory" 
        subtitle="Manage event locations, floorplans, and logistics."
        breadcrumbs={['Dashboard', 'Logistics', 'Venues']}
        actionLabel="Add Venue"
      />

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
           <div className="relative w-full md:w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input 
               type="text" 
               placeholder="Search venues by name or city..." 
               className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-100"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <div className="flex gap-2">
              <Button variant="white" size="sm" className="gap-2">
                 <Filter size={14} /> Filter
              </Button>
           </div>
        </div>

        <div className="p-6">
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                 {[1,2,3].map(i => <div key={i} className="h-64 bg-gray-100 rounded-2xl" />)}
             </div>
          ) : filteredVenues.length === 0 ? (
             <EmptyState
               icon={Building}
               title="No venues found"
               description="Add your first venue to start planning event logistics."
               actionLabel="Add Venue"
               className="border-none py-20"
             />
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVenues.map((venue) => (
                   <FadeIn key={venue.id}>
                      <div className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-purple-200 transition-all cursor-pointer h-full flex flex-col">
                         <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                               <Building size={24} />
                            </div>
                            <button className="text-gray-400 hover:text-purple-600">
                               <ExternalLink size={18} />
                            </button>
                         </div>
                         
                         <h3 className="font-serif font-bold text-xl text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">{venue.name}</h3>
                         <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                            <MapPin size={14} /> {venue.address || venue.city}
                         </p>
                         
                         <div className="flex flex-wrap gap-2 mb-6 flex-grow content-start">
                            {venue.capacity && (
                               <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                                  <Users size={12} /> {venue.capacity} Cap
                               </span>
                            )}
                            {venue.city && (
                               <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-bold">
                                  {venue.city}
                               </span>
                            )}
                         </div>

                         <div className="pt-4 border-t border-gray-50 flex gap-2 mt-auto">
                             <Button variant="outline" size="sm" fullWidth>View Details</Button>
                             <Button variant="primary" size="sm" fullWidth>Floorplan</Button>
                         </div>
                      </div>
                   </FadeIn>
                ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
