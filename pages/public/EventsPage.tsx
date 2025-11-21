import React, { useState } from 'react';
import { 
  Search, Sparkles, Calendar, Ticket, ChevronDown, MapPin, 
  Clock, Filter, ArrowRight, Mic2, Camera, ShoppingBag, 
  Users, Info, Map, Car, Star, Plus, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { CalendarPicker } from '../../components/CalendarPicker';
import { SectionTag } from '../../components/SectionTag';

// --- Mock Data ---

const FEATURED_EVENT = {
  id: 0,
  title: "Milan Fashion Week: Spring/Summer Finale",
  desc: "Experience the culmination of global fashion as top designers showcase their SS26 collections. Featuring exclusive runway access and backstage passes.",
  image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1000&auto=format&fit=crop",
  date: "Sept 24-28, 2025",
  location: "Milan, Italy",
  tags: ["Runway", "High Fashion", "Exclusive"],
  price: "From $450"
};

const EVENTS_DATA = [
  {
    id: 1,
    title: "Sustainable Fashion Week 2025",
    category: "Runway Show",
    date: "March 15, 2025",
    time: "19:00 PM",
    location: "Centro Cultural, Medellín",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800&auto=format&fit=crop",
    tags: ["AI", "Sustainable", "Designer"],
    price: "From $50",
    capacity: "85% Sold"
  },
  {
    id: 2,
    title: "Editorial Photography Workshop",
    category: "Workshop",
    date: "March 18, 2025",
    time: "10:00 AM",
    location: "Studio Loft, Bogotá",
    image: "https://images.unsplash.com/photo-1520986606214-8b456906c813?q=80&w=800&auto=format&fit=crop",
    tags: ["Photography", "Education"],
    price: "Free",
    capacity: "Open"
  },
  {
    id: 3,
    title: "Emerging Designers Showcase",
    category: "Exhibition",
    date: "March 22, 2025",
    time: "14:00 PM",
    location: "Galería Arte, Cali",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
    tags: ["Emerging", "Designer"],
    price: "From $30",
    capacity: "Limited"
  },
  {
    id: 4,
    title: "Street Style Pop-Up Market",
    category: "Pop-up",
    date: "March 25, 2025",
    time: "11:00 AM",
    location: "Plaza Central, Cartagena",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    tags: ["Streetwear", "Market"],
    price: "Free Entry",
    capacity: "Open"
  },
  {
    id: 5,
    title: "Haute Couture Gala Evening",
    category: "Runway Show",
    date: "April 1, 2025",
    time: "20:00 PM",
    location: "Grand Hotel, Medellín",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop",
    tags: ["Couture", "VIP", "Gala"],
    price: "From $200",
    capacity: "Sold Out"
  },
  {
    id: 6,
    title: "Fashion Tech Summit",
    category: "Conference",
    date: "April 5, 2025",
    time: "09:00 AM",
    location: "Innovation Hub, Bogotá",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop",
    tags: ["AI", "Technology", "Future"],
    price: "From $75",
    capacity: "Selling Fast"
  }
];

const CATEGORIES = [
  { icon: Mic2, label: "Runway Shows", desc: "Live collections" },
  { icon: Camera, label: "Workshops", desc: "Learn skills" },
  { icon: ShoppingBag, label: "Pop-ups", desc: "Shop local" },
  { icon: Map, label: "Exhibitions", desc: "Art & Style" },
  { icon: Users, label: "Meetups", desc: "Network" },
];

// --- Sub-Components ---

const FilterPill = ({ label, active = false }: { label: string, active?: boolean }) => (
  <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${active ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
    {label} <ChevronDown size={12} />
  </button>
);

const EventCard = ({ event }: { event: typeof EVENTS_DATA[0] }) => (
  <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col h-full cursor-pointer">
    <div className="aspect-[4/3] relative overflow-hidden">
      <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute top-3 right-3">
         <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${event.category === 'Runway Show' ? 'bg-purple-500/90 text-white' : 'bg-white/90 text-black'}`}>
            {event.category}
         </span>
      </div>
      <div className="absolute bottom-3 left-3">
        {event.price === "Free" || event.price === "Free Entry" ? (
           <span className="bg-green-400/90 backdrop-blur text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">Free</span>
        ) : (
           <span className="bg-black/70 backdrop-blur text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">{event.price}</span>
        )}
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-3">
        <Calendar size={14} /> {event.date}
      </div>
      <h3 className="text-xl font-serif font-bold mb-2 leading-tight group-hover:text-purple-600 transition-colors">{event.title}</h3>
      <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
        <MapPin size={14} /> {event.location}
      </div>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {event.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-500 rounded-md text-[10px] font-bold uppercase">{tag}</span>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
         <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">{event.capacity}</span>
         <Button variant="primary" size="sm" className="rounded-full px-6">Get Tickets</Button>
      </div>
    </div>
  </div>
);

// --- Main Page ---

export const EventsPage: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<{start: Date | null, end: Date | null}>({ start: null, end: null });
  
  const handleApplyDate = (start: Date | null, end: Date | null) => {
    setDateRange({ start, end });
    setShowCalendar(false);
  };

  return (
    <div className="bg-white pt-20 min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-purple-50/50 via-white to-white">
         <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
            <FadeIn>
               <SectionTag>Curated Experiences</SectionTag>
               <h1 className="text-5xl md:text-7xl font-serif font-bold text-fashion-black mb-6">
                  Discover Fashion Events <br/> Near You
               </h1>
               <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
                  AI-curated shows, exhibitions, workshops, and industry meetups — all in one place.
               </p>

               {/* Enhanced Search Bar */}
               <div className="max-w-2xl mx-auto relative mb-8">
                  <div className="flex items-center bg-white rounded-full shadow-xl p-2 border border-gray-100 transition-shadow hover:shadow-2xl">
                     <Search className="ml-4 text-gray-400 shrink-0" size={20} />
                     <input 
                        type="text" 
                        placeholder="Find fashion shows in Medellín this weekend..." 
                        className="flex-1 p-3 outline-none text-sm bg-transparent text-gray-700 placeholder:text-gray-400" 
                     />
                     <div className="hidden md:flex items-center gap-2 border-l border-gray-100 pl-3 pr-3">
                        <span className="text-[10px] font-bold text-purple-500 flex items-center gap-1"><Sparkles size={10} /> Powered by AI Copilot</span>
                     </div>
                     <button className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors">
                        <ArrowRight size={18} />
                     </button>
                  </div>
               </div>

               <div className="flex justify-center gap-4">
                  <Button variant="accent" size="sm" className="rounded-full">Browse All Events</Button>
                  <Link to="/dashboard"><Button variant="outline" size="sm" className="rounded-full">Create Event</Button></Link>
               </div>
            </FadeIn>
         </div>
         
         {/* Background Elements */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-200 rounded-full blur-[100px]"></div>
         </div>
      </section>

      {/* 2. Smart Filter Bar */}
      <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-y border-gray-100 py-4">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
               <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 hide-scrollbar">
                  <FilterPill label="Category" />
                  
                  <div className="relative">
                     <button 
                        onClick={() => setShowCalendar(!showCalendar)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${showCalendar ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                     >
                        <Calendar size={14} /> Date Range <ChevronDown size={12} />
                     </button>
                     {showCalendar && (
                        <div className="absolute top-12 left-0 z-50">
                           <CalendarPicker onClose={() => setShowCalendar(false)} onApply={handleApplyDate} initialStart={dateRange.start} initialEnd={dateRange.end} />
                        </div>
                     )}
                  </div>

                  <FilterPill label="City" />
                  <FilterPill label="Status" />
               </div>

               <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                  <button className="text-xs font-bold text-gray-400 hover:text-black transition-colors">Reset Filters</button>
                  <div className="h-4 w-px bg-gray-200 hidden lg:block"></div>
                  <span className="text-xs text-gray-400"><strong className="text-black">124</strong> events found</span>
               </div>
            </div>
         </div>
      </div>

      {/* 3. Featured Event */}
      <section className="py-16">
         <div className="container mx-auto px-6 md:px-12">
            <FadeIn>
               <div className="flex items-center gap-2 mb-6">
                  <Star size={16} className="text-purple-600 fill-purple-600" />
                  <h2 className="text-sm font-bold uppercase tracking-widest">Featured This Week</h2>
               </div>
               <div className="group relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] shadow-2xl cursor-pointer">
                  <img src={FEATURED_EVENT.image} alt="Featured" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-2xl text-white">
                     <div className="flex flex-wrap gap-2 mb-4">
                        {FEATURED_EVENT.tags.map(t => (
                           <span key={t} className="bg-white/20 backdrop-blur border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{t}</span>
                        ))}
                     </div>
                     <h3 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">{FEATURED_EVENT.title}</h3>
                     <p className="text-gray-200 text-lg mb-8 line-clamp-2 md:line-clamp-none">{FEATURED_EVENT.desc}</p>
                     <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <Button variant="white" size="lg">Get Tickets</Button>
                        <div className="flex items-center gap-4 text-sm font-medium">
                           <span className="flex items-center gap-2"><Calendar size={16} /> {FEATURED_EVENT.date}</span>
                           <span className="flex items-center gap-2"><MapPin size={16} /> {FEATURED_EVENT.location}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </FadeIn>
         </div>
      </section>

      {/* 4. Event Grid */}
      <section className="py-12">
         <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {EVENTS_DATA.map((event, i) => (
                  <FadeIn key={event.id} delay={i * 50}>
                     <EventCard event={event} />
                  </FadeIn>
               ))}
            </div>
            <div className="mt-16 text-center">
               <Button variant="outline" size="lg">Load More Events</Button>
            </div>
         </div>
      </section>

      {/* 5. Categories Carousel */}
      <section className="py-20 bg-gray-50 overflow-hidden">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex justify-between items-end mb-10">
               <div>
                  <h2 className="text-3xl font-serif font-bold mb-2">Browse by Category</h2>
                  <p className="text-gray-500">Find the perfect event for your interests.</p>
               </div>
               <div className="hidden md:flex gap-2">
                   <button className="p-2 rounded-full border border-gray-200 hover:bg-white transition-colors"><ArrowRight className="rotate-180" size={20} /></button>
                   <button className="p-2 rounded-full border border-gray-200 hover:bg-white transition-colors"><ArrowRight size={20} /></button>
               </div>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar">
               {CATEGORIES.map((cat, i) => (
                  <div key={i} className="min-w-[200px] bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
                     <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <cat.icon size={24} />
                     </div>
                     <h3 className="font-serif font-bold text-lg mb-1">{cat.label}</h3>
                     <p className="text-xs text-gray-500">{cat.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. Plan Your Visit */}
      <section className="py-20 container mx-auto px-6 md:px-12">
         <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionTag>Concierge</SectionTag>
            <h2 className="text-4xl font-serif font-bold mb-4">Plan Your Visit.</h2>
            <p className="text-gray-500">Everything you need to make the most of your fashion experience.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
               { icon: Ticket, title: 'Tickets & Pricing', desc: 'Early bird rates and VIP packages.' },
               { icon: Map, title: 'Venue Maps', desc: 'Navigate sprawling event spaces easily.' },
               { icon: Car, title: 'Transport', desc: 'Valet parking and shuttle services.' },
               { icon: Info, title: 'FAQ', desc: 'Dress codes, entry requirements, and more.' }
            ].map((item, i) => (
               <div key={i} className="p-6 rounded-2xl border border-gray-100 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <item.icon className="mx-auto mb-4 text-gray-400" size={24} />
                  <h4 className="font-bold text-sm mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* 7. Host CTA */}
      <section className="py-20 bg-black text-white">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center gap-16">
               <div className="md:w-1/2">
                  <div className="inline-block bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider mb-6">Creator Tools</div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Host an Event with FashionOS.</h2>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                     Runway shows, pop-ups, conferences, workshops — publish your event in minutes using our creator tools. 
                     Manage ticketing, guest lists, and marketing all in one place.
                  </p>
                  <div className="flex gap-4">
                     <Link to="/dashboard"><Button variant="white">Create Event</Button></Link>
                     <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">View Creator Tools</Button>
                  </div>
               </div>
               <div className="md:w-1/2 relative">
                  <div className="aspect-video rounded-2xl overflow-hidden opacity-80">
                     <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000" alt="Backstage" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  {/* Decoration */}
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 border-l-2 border-b-2 border-purple-500"></div>
                  <div className="absolute -top-6 -right-6 w-24 h-24 border-r-2 border-t-2 border-purple-500"></div>
               </div>
            </div>
         </div>
      </section>

      {/* 8. Final CTA */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white text-center">
         <div className="container mx-auto px-6">
            <FadeIn>
               <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">See What’s Happening <br/> in Fashion.</h2>
               <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
                  From runway shows to creative workshops — explore the best fashion events curated just for you.
               </p>
               <div className="flex justify-center gap-4">
                  <Button variant="primary" size="lg">Browse Events</Button>
                  <Link to="/dashboard"><Button variant="outline" size="lg">Create Event</Button></Link>
               </div>
            </FadeIn>
         </div>
      </section>

    </div>
  );
};