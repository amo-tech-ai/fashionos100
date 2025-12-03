
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Building, Navigation, Loader2 } from 'lucide-react';
import { PageHeader } from '../../../components/dashboard/Shared';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { eventService, Event } from '../../../lib/event-service';

export const EventLogistics: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await eventService.getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error("Failed to load event logistics", error);
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-600" size={32}/></div>;
  if (!event) return <div className="p-10 text-center">Event not found</div>;

  const venueName = event.venue?.name || 'TBD';
  const venueAddress = event.venue?.address || event.venue?.city || 'Address pending';
  const mapQuery = encodeURIComponent(`${venueName} ${venueAddress}`);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Venue & Logistics" 
        subtitle={`Logistics management for ${event.title}`}
        breadcrumbs={['Dashboard', 'Events', event.title, 'Logistics']}
        actionLabel="Edit Logistics"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Column: Venue Details */}
         <div className="lg:col-span-2 space-y-8">
            <FadeIn>
               <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                  {/* Map Placeholder */}
                  <div className="h-64 bg-gray-100 relative group">
                     <iframe 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        loading="lazy" 
                        allowFullScreen 
                        src={`https://www.google.com/maps/embed/v1/place?key=${(import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY || ''}&q=${mapQuery}`}
                        className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                     />
                     {!(import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50 text-gray-500 font-medium">
                           Map API Key Missing
                        </div>
                     )}
                  </div>

                  <div className="p-8">
                     <div className="flex justify-between items-start mb-6">
                        <div>
                           <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">{venueName}</h2>
                           <p className="text-gray-500 flex items-center gap-2">
                              <MapPin size={18} /> {venueAddress}
                           </p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${mapQuery}`, '_blank')}>
                           <Navigation size={16} /> Get Directions
                        </Button>
                     </div>

                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-100 pt-6">
                        <div>
                           <p className="text-xs font-bold uppercase text-gray-400 mb-1">Capacity</p>
                           <p className="text-lg font-bold text-gray-900">{event.capacity_limit || event.venue?.capacity || 'N/A'}</p>
                        </div>
                        <div>
                           <p className="text-xs font-bold uppercase text-gray-400 mb-1">Type</p>
                           <p className="text-lg font-bold text-gray-900 capitalize">Indoor</p>
                        </div>
                        <div>
                           <p className="text-xs font-bold uppercase text-gray-400 mb-1">Access</p>
                           <p className="text-lg font-bold text-gray-900">Public</p>
                        </div>
                        <div>
                           <p className="text-xs font-bold uppercase text-gray-400 mb-1">Status</p>
                           <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Confirmed
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <FadeIn delay={100}>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
                     <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Users size={18} className="text-purple-600" /> Key Contacts
                     </h3>
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-gray-500 border border-gray-200">VM</div>
                           <div>
                              <p className="text-sm font-bold text-gray-900">Venue Manager</p>
                              <p className="text-xs text-gray-500">manager@venue.com</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-gray-500 border border-gray-200">Sec</div>
                           <div>
                              <p className="text-sm font-bold text-gray-900">Security Head</p>
                              <p className="text-xs text-gray-500">+1 555 0123</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </FadeIn>

               <FadeIn delay={200}>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
                     <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Calendar size={18} className="text-blue-600" /> Load-In Schedule
                     </h3>
                     <div className="space-y-3 border-l-2 border-gray-100 pl-4 ml-2">
                        {[
                           { time: "08:00 AM", task: "Production Team Arrival" },
                           { time: "10:00 AM", task: "Lighting & Sound Setup" },
                           { time: "02:00 PM", task: "Vendor Load-In" }
                        ].map((item, i) => (
                           <div key={i} className="relative">
                              <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white" />
                              <p className="text-xs font-bold text-gray-500">{item.time}</p>
                              <p className="text-sm font-medium text-gray-900">{item.task}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </FadeIn>
            </div>
         </div>

         {/* Right Column: Floorplan & Files */}
         <div className="space-y-8">
            <FadeIn delay={300}>
               <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600 rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="relative z-10">
                     <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md">
                        <Building size={24} />
                     </div>
                     <h3 className="text-xl font-bold mb-2">Floorplan Editor</h3>
                     <p className="text-sm text-gray-400 mb-6">Design your runway layout, seating charts, and booth placements.</p>
                     <Button variant="white" size="sm" fullWidth>Launch Editor</Button>
                  </div>
               </div>
            </FadeIn>

            <FadeIn delay={400}>
               <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-lg mb-4">Venue Documents</h3>
                  <div className="space-y-2">
                     {['Venue Contract.pdf', 'Tech Rider.pdf', 'Fire Safety Plan.pdf', 'Parking Map.png'].map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold uppercase">
                                 {file.split('.').pop()}
                              </div>
                              <span className="text-sm text-gray-700 font-medium">{file}</span>
                           </div>
                           <span className="text-xs text-gray-400 group-hover:text-purple-600">Download</span>
                        </div>
                     ))}
                  </div>
                  <Button variant="outline" size="sm" fullWidth className="mt-4">Upload Document</Button>
               </div>
            </FadeIn>
         </div>
      </div>
    </div>
  );
};