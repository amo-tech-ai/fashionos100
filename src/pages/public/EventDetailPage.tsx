
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, Share2, ArrowLeft, 
  Ticket, CheckCircle2, Info, Lock, Loader2, ExternalLink, Mail 
} from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { eventService, Event } from '../../lib/event-service';
import { supabaseUrl, supabaseAnonKey, supabase } from '../../lib/supabase';
import { useToast } from '../../components/Toast';
import { usePermissions } from '../../hooks/usePermissions';
import { EventSponsor } from '../../types/sponsorship';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [sponsors, setSponsors] = useState<EventSponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();
  const { canAccessSponsors } = usePermissions();

  useEffect(() => {
    if (id) fetchEvent(id);
  }, [id]);

  const fetchEvent = async (eventId: string) => {
    try {
      const data = await eventService.getEventById(eventId);
      setEvent(data);
      if (data.ticket_tiers && data.ticket_tiers.length > 0) {
        setSelectedTicketId(data.ticket_tiers[0].id);
      }

      // Fetch Sponsors for this event
      const { data: sponsorsData } = await supabase
        .from('event_sponsors')
        .select('*, sponsor:sponsor_profiles(*)')
        .eq('event_id', eventId)
        .in('status', ['Signed', 'Paid', 'Activation Ready']); // Only show active/confirmed sponsors
      
      setSponsors(sponsorsData || []);

    } catch (error) {
      console.error('Failed to load event', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!event || !selectedTicketId) return;
    setIsCheckingOut(true);

    const ticket = event.ticket_tiers?.find(t => t.id === selectedTicketId);
    if (!ticket) return;

    try {
      // Call Create Checkout Edge Function
      const response = await fetch(`${supabaseUrl}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
            amount: ticket.price,
            title: `${event.title} - ${ticket.name}`,
            successUrl: window.location.href + '?success=true',
            cancelUrl: window.location.href
        })
      });

      const result = await response.json();
      
      if (result.url) {
        window.location.href = result.url;
      } else {
        toast("Ticket reserved! (Mock Payment)", "success");
      }
    } catch (error) {
      console.error(error);
      toast("Checkout failed", "error");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-600" size={32} />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold mb-2">Event Not Found</h2>
        <p className="text-gray-500 mb-6">The event you are looking for may have been removed.</p>
        <Link to="/events"><Button variant="outline">Browse Events</Button></Link>
      </div>
    );
  }

  const startDate = new Date(event.start_time);
  const heroImage = event.featured_image_url || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000";

  return (
    <div className="bg-white min-h-screen pt-20 font-sans">
      
      {/* 1. Hero Header */}
      <div className="relative h-[50vh] md:h-[60vh] bg-black overflow-hidden">
        <img 
          src={heroImage} 
          alt={event.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white z-10">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-white/20 backdrop-blur border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {event.status === 'published' ? 'Upcoming' : event.status}
                    </span>
                    {event.ticket_tiers?.some(t => t.price === 0) && (
                        <span className="bg-green-500/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Free Options
                        </span>
                    )}
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 leading-tight max-w-4xl">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-6 text-sm md:text-base font-medium text-gray-200">
                  <span className="flex items-center gap-2">
                    <Calendar size={18} /> 
                    {startDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={18} /> 
                    {startDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={18} /> 
                    {event.venue?.name}, {event.venue?.city}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Content Grid */}
      <div className="container mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Description & Agenda */}
          <div className="lg:col-span-7 space-y-12">
            <FadeIn>
              <div className="mb-6">
                 <Link to="/events" className="text-xs font-bold uppercase text-gray-400 hover:text-black flex items-center gap-2">
                    <ArrowLeft size={14} /> Back to Events
                 </Link>
              </div>
              <h2 className="text-2xl font-serif font-bold mb-6">About the Event</h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
                {event.description || event.short_description}
              </div>
            </FadeIn>

            {event.event_schedules && event.event_schedules.length > 0 && (
              <FadeIn delay={100}>
                <h2 className="text-2xl font-serif font-bold mb-6">Agenda</h2>
                <div className="space-y-4">
                  {event.event_schedules.map((item) => (
                    <div key={item.id} className="flex gap-6 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="w-24 shrink-0 pt-1">
                        <p className="font-bold text-gray-900">
                            {new Date(item.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                        {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
                        {item.location_in_venue && (
                            <span className="inline-block mt-2 text-xs font-bold bg-white px-2 py-1 rounded border border-gray-200 text-gray-500">
                                📍 {item.location_in_venue}
                            </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* Partners & Sponsors */}
            {sponsors.length > 0 && (
              <FadeIn delay={150}>
                <h2 className="text-2xl font-serif font-bold mb-6">Partners & Sponsors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sponsors.map((s, i) => (
                    <div key={s.id} className="border border-gray-100 p-4 rounded-2xl flex items-center justify-between hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                           {s.sponsor?.logo_url ? (
                              <img src={s.sponsor.logo_url} alt={s.sponsor.name} className="w-full h-full object-contain" />
                           ) : (
                              <span className="text-xl font-bold text-gray-300">{s.sponsor?.name.charAt(0)}</span>
                           )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{s.sponsor?.name}</p>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">{s.level || 'Partner'}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {canAccessSponsors && (
                           <Link to={`/dashboard/sponsors/${s.sponsor_id}`} title="View in CRM">
                              <Button variant="ghost" size="sm" className="text-purple-600 bg-purple-50 hover:bg-purple-100"><ExternalLink size={14}/></Button>
                           </Link>
                        )}
                        {s.sponsor?.website_url ? (
                           <a href={s.sponsor.website_url} target="_blank" rel="noreferrer">
                              <Button variant="outline" size="sm">Visit</Button>
                           </a>
                        ) : (
                           <Button variant="outline" size="sm" disabled>Visit</Button>
                        )}
                        {canAccessSponsors && s.sponsor?.contact_email && (
                            <a href={`mailto:${s.sponsor.contact_email}`}>
                                <Button variant="outline" size="sm"><Mail size={14}/></Button>
                            </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* Map / Venue Info */}
            <FadeIn delay={200}>
              <h2 className="text-2xl font-serif font-bold mb-6">The Venue</h2>
              <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2">{event.venue?.name}</h3>
                  <p className="text-gray-500 mb-6 flex items-center gap-2">
                    <MapPin size={16} /> {event.venue?.address || event.venue?.city}
                  </p>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue?.name + ' ' + event.venue?.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">Get Directions</Button>
                  </a>
                </div>
                {/* If we had map coords, we'd embed a map here */}
              </div>
            </FadeIn>
          </div>

          {/* Right: Sticky Ticket Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <FadeIn delay={100}>
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden">
                   <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
                   
                   <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                     <Ticket className="text-purple-600" /> Select Tickets
                   </h3>

                   <div className="space-y-4 mb-8">
                      {event.ticket_tiers?.map((tier) => {
                          const isSelected = selectedTicketId === tier.id;
                          const isSoldOut = tier.quantity_sold >= tier.quantity_total;

                          return (
                              <div 
                                key={tier.id}
                                onClick={() => !isSoldOut && setSelectedTicketId(tier.id)}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${
                                    isSoldOut ? 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed' :
                                    isSelected ? 'bg-purple-50 border-purple-500 ring-1 ring-purple-500' : 'bg-white border-gray-100 hover:border-purple-200'
                                }`}
                              >
                                  <div className="flex justify-between items-center mb-1">
                                      <h4 className="font-bold text-gray-900">{tier.name}</h4>
                                      <div className="flex items-center gap-3">
                                        <span className="font-serif font-bold text-lg">
                                            {tier.price === 0 ? 'Free' : `$${tier.price}`}
                                        </span>
                                        {isSelected && !isSoldOut && <CheckCircle2 size={20} className="text-purple-600 fill-purple-100" />}
                                      </div>
                                  </div>
                                  <p className="text-xs text-gray-500">{tier.description || 'General Admission'}</p>
                                  {isSoldOut && (
                                      <span className="absolute top-4 right-4 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Sold Out</span>
                                  )}
                              </div>
                          );
                      })}
                   </div>

                   <div className="space-y-4">
                      <Button 
                        fullWidth 
                        size="lg" 
                        variant="primary"
                        className="h-14 text-base shadow-lg shadow-purple-500/20"
                        onClick={handleCheckout}
                        disabled={isCheckingOut || !selectedTicketId}
                      >
                        {isCheckingOut ? <Loader2 className="animate-spin" /> : 'Secure Spot'}
                      </Button>
                      
                      <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                        <Lock size={10} /> Secure checkout powered by Stripe
                      </p>
                   </div>

                   <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Hosted By</span>
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 bg-gray-200 rounded-full" />
                         <span className="text-sm font-bold text-gray-900">FashionOS</span>
                      </div>
                   </div>
                </div>

                <div className="mt-6 flex justify-center gap-4">
                   <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors">
                      <Share2 size={16} /> Share Event
                   </button>
                   <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors">
                      <Info size={16} /> Policy
                   </button>
                </div>
              </FadeIn>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
