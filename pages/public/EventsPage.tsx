
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
      <section className="relative py-12 md:py-24 overflow-hidden bg-gradient-to-b from-purple-50/40 via-white to-white">
         <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center relative z-10">
            <FadeIn>
               <SectionTag>Curated Experiences</SectionTag>
               <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-fashion-black mb-4 sm:mb-6 tracking-tight leading-tight">
                  Discover Fashion Events <br className="hidden md:block"/> Near You
               </h1>
               <p className="text-lg sm:text-xl text-gray-500 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
                  AI-curated shows, exhibitions, workshops, and industry meetups.
               </p>

               {/* AI Search Bar */}
               <div className="max-w-2xl mx-auto relative mb-8 px-4 sm:px-0">
                  <div className={`flex flex-wrap sm:flex-nowrap items-center bg-white rounded-2xl sm:rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-2 border transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] ${isAiLoading ? 'border-purple-400 ring-4 ring-purple-50' : 'border-gray-100'}`}>
                     <Search className={`ml-2 sm:ml-4 shrink-0 transition-colors ${isAiLoading ? 'text-purple-500' : 'text-gray-400'}`} size={20} />
                     <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
                        placeholder="Try 'sustainable events in March'..." 
                        className="flex-1 w-full sm:w-auto p-3 outline-none text-sm bg-transparent text-gray-700 placeholder:text-gray-400 font-medium min-w-0 order-2 sm:order-1" 
                     />
                     <div className="hidden sm:flex items-center gap-2 border-l border-gray-100 pl-4 pr-3 h-8 shrink-0 order-3 sm:order-2">
                        <span className={`text-[10px] font-bold flex items-center gap-1.5 transition-colors uppercase tracking-wider ${isAiLoading ? 'text-purple-600' : 'text-purple-500'}`}>
                           {isAiLoading ? <LoadingSpinner size={12} /> : <Sparkles size={12} />} 
                           {isAiLoading ? "Thinking..." : "AI Copilot"}
                        </span>
                     </div>
                     {searchQuery && (
                        <button onClick={() => { setSearchQuery(''); setAiMatches(null); }} className="p-2 text-gray-400 hover:text-gray-600 order-3 sm:order-3">
                           <X size={16} />
                        </button>
                     )}
                     <div className="w-full sm:w-auto mt-2 sm:mt-0 order-5 sm:order-4 flex justify-end sm:block">
                       <button 
                          onClick={handleAISearch}
                          disabled={isAiLoading}
                          className="bg-black text-white w-full sm:w-auto px-6 py-3 sm:p-3.5 rounded-xl sm:rounded-full hover:bg-gray-800 transition-all disabled:bg-gray-400 shadow-md flex items-center justify-center hover:scale-105"
                       >
                          <span className="sm:hidden mr-2 text-xs font-bold uppercase">Search</span> <ArrowRight size={18} />
                       </button>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-6">
                  <Button variant="accent" size="sm" className="rounded-full px-6 w-full sm:w-auto order-2 sm:order-1" onClick={resetFilters}>Browse All Events</Button>
                  <Link to="/dashboard/events/new" className="w-full sm:w-auto order-1 sm:order-2">
                    <Button variant="outline" size="sm" className="rounded-full px-6 w-full sm:w-auto">Create Event</Button>
                  </Link>
               </div>
            </FadeIn>
         </div>
         
         {/* Background Elements */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-100 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-100 rounded-full blur-[100px]"></div>
         </div>
      </section>

      {/* 2. Filter Bar - Sticky */}
      <div className="sticky top-[64px] md:top-[72px] z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3 transition-all">
         <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
               
               {/* Filter Scroll Container */}
               <div className="w-full lg:w-auto overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-max">
                    <div className="flex items-center gap-2 pr-4 border-r border-gray-200 shrink-0">
                      <SlidersHorizontal size={16} className="text-gray-400" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">Filters</span>
                    </div>

                    {aiMatches !== null && (
                       <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 border border-purple-100 rounded-full text-xs font-bold text-purple-700 whitespace-nowrap animate-in fade-in slide-in-from-left-4 shrink-0">
                          <Sparkles size={12} /> AI Results
                          <button onClick={() => setAiMatches(null)} className="ml-1 hover:bg-purple-200 rounded-full p-0.5"><X size={12} /></button>
                       </div>
                    )}

                    <FilterDropdown 
                      label="Type" 
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
                    
                    <div className="relative shrink-0">
                       <button 
                          onClick={() => setShowCalendar(!showCalendar)}
                          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${showCalendar || dateRange.start ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                       >
                          <Calendar size={14} /> {getDateLabel()} <ChevronDown size={12} />
                       </button>
                       {showCalendar && (
                          <div className="absolute top-12 left-0 z-50 shadow-xl rounded-2xl">
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
               </div>

               {/* Right Controls */}
               <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-gray-100 pt-3 lg:pt-0">
                  <button 
                    onClick={resetFilters}
                    className="text-xs font-bold text-gray-400 hover:text-black transition-colors whitespace-nowrap"
                  >
                    Reset
                  </button>
                  <div className="h-4 w-px bg-gray-200 hidden lg:block"></div>
                  <span className="text-xs text-gray-400 whitespace-nowrap"><strong className="text-black">{filteredEvents.length}</strong> events</span>
                  <Link to="/dashboard/events/new" className="flex-1 lg:flex-none">
                     <Button variant="accent" size="sm" className="whitespace-nowrap w-full lg:w-auto justify-center">Start Event Wizard</Button>
                  </Link>
               </div>
            </div>
         </div>
      </div>

      {/* 3. Featured Event */}
      <section className="py-8 md:py-16">
         <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <FadeIn>
               <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Star size={16} className="text-purple-600 fill-purple-600" />
                  <h2 className="text-sm font-bold uppercase tracking-widest">Featured This Week</h2>
               </div>
               <div className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden aspect-[4/5] sm:aspect-video md:aspect-[21/9] shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-500">
                  <img src={FEATURED_EVENT.image} alt="Featured" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 md:p-16 max-w-3xl text-white w-full">
                     <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                        {FEATURED_EVENT.tags.map(t => (
                           <span key={t} className="bg-white/20 backdrop-blur-md border border-white/20 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{t}</span>
                        ))}
                     </div>
                     <h3 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-4 md:mb-6 leading-tight">{FEATURED_EVENT.title}</h3>
                     <p className="text-gray-200 text-sm md:text-lg mb-6 md:mb-10 line-clamp-2 md:line-clamp-none max-w-2xl">{FEATURED_EVENT.desc}</p>
                     <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                        <Button variant="white" size="lg" className="px-8 w-full sm:w-auto">Get Tickets</Button>
                        <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm font-medium text-gray-200">
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
      <section className="py-12 md:py-16 bg-gray-50/50">
         <div className="container mx-auto px-4 sm:px-6 md:px-12">
            {isLoading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                     <EventCardSkeleton key={i} />
                  ))}
               </div>
            ) : filteredEvents.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredEvents.map((event, i) => (
                     <FadeIn key={event.id} delay={i * 50}>
                        <EventCard event={event} />
                     </FadeIn>
                  ))}
               </div>
            ) : (
               <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-200 border-dashed">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <Search size={24} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">No events found.</h3>
                  <p className="text-gray-500 mb-8">Try adjusting your filters or AI search query to see more results.</p>
                  <Button variant="outline" onClick={resetFilters}>Clear All Filters</Button>
               </div>
            )}
            
            {filteredEvents.length > 0 && !isLoading && (
              <div className="mt-12 md:mt-20 text-center">
                 <Button variant="outline" size="lg" className="px-10">Load More Events</Button>
              </div>
            )}
         </div>
      </section>

      {/* 6. Categories Carousel */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
         <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="flex justify-between items-end mb-8 md:mb-12">
               <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Browse by Category</h2>
                  <p className="text-sm md:text-base text-gray-500">Find the perfect event for your interests.</p>
               </div>
               <div className="hidden md:flex gap-2">
                   <button className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"><ArrowRight className="rotate-180" size={20} /></button>
                   <button className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"><ArrowRight size={20} /></button>
               </div>
            </div>
            
            <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 hide-scrollbar">
               {CATEGORIES.map((cat, i) => (
                  <div key={i} className="min-w-[200px] md:min-w-[220px] bg-gray-50 p-6 md:p-8 rounded-[2rem] border border-gray-100 hover:shadow-lg transition-all cursor-pointer group hover:bg-white hover:border-purple-100">
                     <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-gray-400 shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <cat.icon size={24} />
                     </div>
                     <h3 className="font-serif font-bold text-lg mb-1 group-hover:text-purple-600 transition-colors">{cat.label}</h3>
                     <p className="text-xs text-gray-500">{cat.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. Plan Your Visit */}
      <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6 md:px-12">
         <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <SectionTag>Concierge</SectionTag>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Plan Your Visit.</h2>
            <p className="text-gray-500 text-base md:text-lg">Everything you need to make the most of your fashion experience.</p>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
               { icon: Ticket, title: 'Tickets & Pricing', desc: 'Early bird rates and VIP packages.' },
               { icon: MapPin, title: 'Venue Maps', desc: 'Navigate sprawling event spaces easily.' },
               { icon: Ticket, title: 'Transport', desc: 'Valet parking and shuttle services.' },
               { icon: ArrowRight, title: 'FAQ', desc: 'Dress codes, entry requirements, and more.' }
            ].map((item, i) => (
               <div key={i} className="p-6 md:p-8 rounded-2xl border border-gray-100 text-center hover:bg-gray-50 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="w-12 h-12 mx-auto mb-6 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                     <item.icon size={24} />
                  </div>
                  <h4 className="font-bold text-base mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* 8. Host CTA */}
      <section className="py-16 md:py-24 bg-black text-white">
         <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
               <div className="md:w-1/2">
                  <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 md:mb-8">
                     <Sparkles size={12} /> Creator Tools
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif font-bold mb-6 leading-tight">Want to host your own event?</h2>
                  <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed max-w-md">
                     Runway shows, pop-ups, conferences, workshops — publish your event in minutes using our creator tools. 
                     Manage ticketing, guest lists, and marketing all in one place.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                     <Link to="/dashboard/events/new" className="w-full sm:w-auto"><Button variant="white" size="lg" className="w-full sm:w-auto">Start Event Wizard</Button></Link>
                     <Button variant="outline" size="lg" className="text-white border-gray-700 hover:bg-white hover:text-black hover:border-white w-full sm:w-auto">View Creator Tools</Button>
                  </div>
               </div>
               <div className="md:w-1/2 relative w-full">
                  <div className="aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden opacity-90 rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl">
                     <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000" alt="Backstage" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" loading="lazy" />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 md:w-32 md:h-32 border-l-2 border-b-2 border-purple-500/50 -z-10"></div>
                  <div className="absolute -top-8 -right-8 w-24 h-24 md:w-32 md:h-32 border-r-2 border-t-2 border-purple-500/50 -z-10"></div>
               </div>
            </div>
         </div>
      </section>

      {/* 9. Final CTA */}
      <section className="py-24 md:py-32 bg-white text-center">
         <div className="container mx-auto px-6">
            <FadeIn>
               <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-fashion-black">
                  See What’s Happening <br/> in Fashion.
               </h2>
               <p className="text-gray-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
                  From runway shows to creative workshops — explore the best fashion events curated just for you.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="primary" size="lg" className="px-10 w-full sm:w-auto" onClick={resetFilters}>Browse Events</Button>
                  <Link to="/dashboard/events/new" className="w-full sm:w-auto"><Button variant="outline" size="lg" className="px-10 w-full sm:w-auto">Create Event</Button></Link>
               </div>
            </FadeIn>
         </div>
      </section>

    </div>
  );
};
