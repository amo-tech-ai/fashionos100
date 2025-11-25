
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Sparkles, Calendar, Ticket, ChevronDown, MapPin, 
  ArrowRight, Star, Plus, X, SlidersHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { CalendarPicker } from '../../components/CalendarPicker';
import { SectionTag } from '../../components/SectionTag';
import { supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { LoadingSpinner } from '../../components/LoadingSpinner';

// Imported Components & Data
import { FilterDropdown } from '../../components/events/FilterDropdown';
import { EventCard } from '../../components/events/EventCard';
import { EventCardSkeleton } from '../../components/events/EventCardSkeleton';
import { VeoTrailerGenerator } from '../../components/events/VeoTrailerGenerator';
import { EVENTS_DATA, FEATURED_EVENT, CATEGORIES } from '../../data/mockEvents';

export const EventsPage: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<{start: Date | null, end: Date | null}>({ start: null, end: null });
  
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [priceFilter, setPriceFilter] = useState('All Prices');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const [searchQuery, setSearchQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiMatches, setAiMatches] = useState<number[] | null>(null);
  
  // Simulate initial data loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleApplyDate = (start: Date | null, end: Date | null) => {
    setDateRange({ start, end });
    setShowCalendar(false);
  };

  // AI Search Logic (Secure)
  const handleAISearch = async () => {
    if (!searchQuery.trim()) {
      setAiMatches(null);
      return;
    }

    setIsAiLoading(true);
    try {
        const eventsContext = EVENTS_DATA.map(e => ({
            id: e.id, title: e.title, category: e.category, tags: e.tags, location: e.location, date: e.date, price: e.price
        }));

        const response = await fetch(`${supabaseUrl}/functions/v1/search-events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`
          },
          body: JSON.stringify({
            query: searchQuery,
            eventsContext
          })
        });

        if (!response.ok) throw new Error('AI Search failed');

        const result = await response.json();
        setAiMatches(result.matchIds || []);
    } catch (error) {
        console.error("AI Search failed", error);
        alert("Search unavailable at the moment.");
    } finally {
        setIsAiLoading(false);
    }
  };

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter(event => {
      if (aiMatches !== null && !aiMatches.includes(event.id)) return false;
      if (typeFilter !== 'All Types' && event.category !== typeFilter) return false;
      
      if (priceFilter !== 'All Prices') {
        const isFree = event.price.toLowerCase().includes('free');
        const priceNum = parseInt(event.price.replace(/[^0-9]/g, '')) || 0;
        if (priceFilter === 'Free' && !isFree) return false;
        if (priceFilter === 'Under $50' && (isFree || priceNum >= 50)) return false; 
        if (priceFilter === 'Premium' && priceNum < 50) return false;
      }

      if (statusFilter !== 'All Status' && event.timing !== statusFilter) return false;
      return true;
    });
  }, [typeFilter, priceFilter, statusFilter, aiMatches]);

  const resetFilters = () => {
    setTypeFilter('All Types');
    setPriceFilter('All Prices');
    setStatusFilter('All Status');
    setDateRange({ start: null, end: null });
    setSearchQuery('');
    setAiMatches(null);
  };

  const getDateLabel = () => {
    if (dateRange.start && dateRange.end) return `${dateRange.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${dateRange.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    if (dateRange.start) return dateRange.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return "Date";
  };

  return (
    <div className="bg-white pt-20 min-h-screen font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-purple-50/50 via-white to-white">
         <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
            <FadeIn>
               <SectionTag>Curated Experiences</SectionTag>
               <h1 className="text-5xl md:text-7xl font-serif font-bold text-fashion-black mb-6">
                  Discover Fashion Events <br/> Near You
               </h1>
               <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
                  AI-curated shows, exhibitions, workshops, and industry meetups.
               </p>

               {/* AI Search Bar */}
               <div className="max-w-2xl mx-auto relative mb-8">
                  <div className={`flex items-center bg-white rounded-full shadow-xl p-2 border transition-all duration-300 hover:shadow-2xl ${isAiLoading ? 'border-purple-400 ring-2 ring-purple-100' : 'border-gray-100'}`}>
                     <Search className={`ml-4 shrink-0 transition-colors ${isAiLoading ? 'text-purple-500' : 'text-gray-400'}`} size={20} />
                     <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
                        placeholder="Try 'sustainable events in March' or 'workshops for designers'..." 
                        className="flex-1 p-3 outline-none text-sm bg-transparent text-gray-700 placeholder:text-gray-400" 
                     />
                     <div className="hidden md:flex items-center gap-2 border-l border-gray-100 pl-3 pr-3">
                        <span className={`text-[10px] font-bold flex items-center gap-1 transition-colors ${isAiLoading ? 'text-purple-600' : 'text-purple-500'}`}>
                           {isAiLoading ? <LoadingSpinner size={10} /> : <Sparkles size={10} />} 
                           {isAiLoading ? "Thinking..." : "AI Copilot"}
                        </span>
                     </div>
                     {searchQuery && (
                        <button onClick={() => { setSearchQuery(''); setAiMatches(null); }} className="p-2 text-gray-400 hover:text-gray-600 md:hidden">
                           <X size={16} />
                        </button>
                     )}
                     <button 
                        onClick={handleAISearch}
                        disabled={isAiLoading}
                        className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                     >
                        <ArrowRight size={18} />
                     </button>
                  </div>
               </div>

               <div className="flex justify-center gap-4">
                  <Button variant="accent" size="sm" className="rounded-full" onClick={resetFilters}>Browse All Events</Button>
                  <Link to="/dashboard/events/new"><Button variant="outline" size="sm" className="rounded-full">Create Event</Button></Link>
               </div>
            </FadeIn>
         </div>
         
         {/* Background Elements */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-200 rounded-full blur-[100px]"></div>
         </div>
      </section>

      {/* 2. Filter Bar */}
      <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-y border-gray-100 py-4">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
               <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 hide-scrollbar">
                  <div className="flex items-center gap-2 px-2 border-r border-gray-200 mr-2">
                    <SlidersHorizontal size={16} className="text-gray-400" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">Filters</span>
                  </div>

                  {aiMatches !== null && (
                     <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 border border-purple-100 rounded-full text-xs font-bold text-purple-700 whitespace-nowrap animate-in fade-in slide-in-from-left-4">
                        <Sparkles size={12} /> Filtered by AI
                        <button onClick={() => setAiMatches(null)} className="ml-1 hover:bg-purple-200 rounded-full p-0.5"><X size={12} /></button>
                     </div>
                  )}

                  <FilterDropdown 
                    label="Event Type" 
                    options={['All Types', 'Runway', 'Workshop', 'Exhibition', 'Pop-up', 'Conference']}
                    value={typeFilter}
                    onChange={setTypeFilter}
                  />

                  <FilterDropdown 
                    label="Price" 
                    options={['All Prices', 'Free', 'Under $50', 'Premium']}
                    value={priceFilter}
                    onChange={setPriceFilter}
                  />
                  
                  <div className="relative">
                     <button 
                        onClick={() => setShowCalendar(!showCalendar)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${showCalendar || dateRange.start ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                     >
                        <Calendar size={14} /> {getDateLabel()} <ChevronDown size={12} />
                     </button>
                     {showCalendar && (
                        <div className="absolute top-12 left-0 z-50">
                           <CalendarPicker onClose={() => setShowCalendar(false)} onApply={handleApplyDate} initialStart={dateRange.start} initialEnd={dateRange.end} />
                        </div>
                     )}
                  </div>

                  <FilterDropdown 
                    label="Status" 
                    options={['All Status', 'Upcoming', 'Live', 'Past']}
                    value={statusFilter}
                    onChange={setStatusFilter}
                  />
               </div>

               <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                  <button 
                    onClick={resetFilters}
                    className="text-xs font-bold text-gray-400 hover:text-black transition-colors"
                  >
                    Reset Filters
                  </button>
                  <div className="h-4 w-px bg-gray-200 hidden lg:block"></div>
                  <span className="text-xs text-gray-400"><strong className="text-black">{filteredEvents.length}</strong> events found</span>
                  <div className="hidden md:block">
                     <Link to="/dashboard/events/new"><Button variant="accent" size="sm">Start Event Wizard</Button></Link>
                  </div>
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
                  <img src={FEATURED_EVENT.image} alt="Featured" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
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

      {/* 4. AI Veo Generator */}
      <VeoTrailerGenerator featuredEvent={FEATURED_EVENT} />

      {/* 5. Event Grid */}
      <section className="py-12">
         <div className="container mx-auto px-6 md:px-12">
            {isLoading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                     <EventCardSkeleton key={i} />
                  ))}
               </div>
            ) : filteredEvents.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event, i) => (
                     <FadeIn key={event.id} delay={i * 50}>
                        <EventCard event={event} />
                     </FadeIn>
                  ))}
               </div>
            ) : (
               <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Search size={24} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">No events found.</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or AI search query to see more results.</p>
                  <Button variant="outline" onClick={resetFilters}>Clear All Filters</Button>
               </div>
            )}
            
            {filteredEvents.length > 0 && !isLoading && (
              <div className="mt-16 text-center">
                 <Button variant="outline" size="lg">Load More Events</Button>
              </div>
            )}
         </div>
      </section>

      {/* 6. Categories Carousel */}
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

      {/* 7. Plan Your Visit */}
      <section className="py-20 container mx-auto px-6 md:px-12">
         <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionTag>Concierge</SectionTag>
            <h2 className="text-4xl font-serif font-bold mb-4">Plan Your Visit.</h2>
            <p className="text-gray-500">Everything you need to make the most of your fashion experience.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
               { icon: Ticket, title: 'Tickets & Pricing', desc: 'Early bird rates and VIP packages.' },
               { icon: MapPin, title: 'Venue Maps', desc: 'Navigate sprawling event spaces easily.' }, // Fixed Icon usage
               { icon: Ticket, title: 'Transport', desc: 'Valet parking and shuttle services.' }, // Reused icon as placeholder
               { icon: ArrowRight, title: 'FAQ', desc: 'Dress codes, entry requirements, and more.' } // Reused icon as placeholder
            ].map((item, i) => (
               <div key={i} className="p-6 rounded-2xl border border-gray-100 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <item.icon className="mx-auto mb-4 text-gray-400" size={24} />
                  <h4 className="font-bold text-sm mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* 8. Host CTA */}
      <section className="py-20 bg-black text-white">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center gap-16">
               <div className="md:w-1/2">
                  <div className="inline-block bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider mb-6">Creator Tools</div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Want to host your own event?</h2>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                     Runway shows, pop-ups, conferences, workshops — publish your event in minutes using our creator tools. 
                     Manage ticketing, guest lists, and marketing all in one place.
                  </p>
                  <div className="flex gap-4">
                     <Link to="/dashboard/events/new"><Button variant="white">Start Event Wizard</Button></Link>
                     <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">View Creator Tools</Button>
                  </div>
               </div>
               <div className="md:w-1/2 relative">
                  <div className="aspect-video rounded-2xl overflow-hidden opacity-80">
                     <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000" alt="Backstage" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 border-l-2 border-b-2 border-purple-500"></div>
                  <div className="absolute -top-6 -right-6 w-24 h-24 border-r-2 border-t-2 border-purple-500"></div>
               </div>
            </div>
         </div>
      </section>

      {/* 9. Final CTA */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white text-center">
         <div className="container mx-auto px-6">
            <FadeIn>
               <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">See What’s Happening <br/> in Fashion.</h2>
               <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
                  From runway shows to creative workshops — explore the best fashion events curated just for you.
               </p>
               <div className="flex justify-center gap-4">
                  <Button variant="primary" size="lg" onClick={resetFilters}>Browse Events</Button>
                  <Link to="/dashboard/events/new"><Button variant="outline" size="lg">Create Event</Button></Link>
               </div>
            </FadeIn>
         </div>
      </section>

    </div>
  );
}
