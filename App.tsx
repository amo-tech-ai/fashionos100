import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar, Ticket, Wallet, Users, MapPin, Search, Sparkles, 
  Clock, ArrowUpRight, Star, Grid, List, ChevronDown, Instagram
} from 'lucide-react';
import { Button } from './components/Button';
import { FadeIn } from './components/FadeIn';
import { Navbar, Footer } from './components/Layout';
import { CalendarPicker } from './components/CalendarPicker';
import { DashboardPage } from './pages/DashboardPage';
import { ViewState, CategoryType, DirectoryItem } from './types';

// --- Shared Sections ---
const SectionTag: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = "text-gray-400" }) => (
  <span className={`inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.2em] ${color}`}>{children}</span>
);

const FeatureSection: React.FC<{
  title: string;
  description: string;
  image: string;
  align?: 'left' | 'right';
}> = ({ title, description, image, align = 'left' }) => (
  <section className="py-12 md:py-24">
    <div className="container mx-auto px-6 md:px-12">
      <div className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
        <div className="w-full md:w-1/2">
          <FadeIn direction={align === 'left' ? 'right' : 'left'}>
            <div className="relative aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden bg-gray-100 group shadow-lg">
              <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
          </FadeIn>
        </div>
        <div className="w-full md:w-1/2">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-6">{title}</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">{description}</p>
            <Button variant="primary">Learn More</Button>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
);

// --- Pages ---
const HomePage: React.FC = () => (
  <div className="pt-20">
    <section className="container mx-auto px-6 py-20 md:py-32 text-center">
      <FadeIn>
        <SectionTag>The Operating System for Fashion</SectionTag>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 tracking-tight text-gray-900">Elevate Your <br /> Creative Business.</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">Manage events, bookings, finances, and social media in one unified platform designed for the fashion industry.</p>
        <div className="flex justify-center gap-4">
          <Button variant="primary" size="lg">Get Started</Button>
          <Button variant="outline" size="lg">View Demo</Button>
        </div>
      </FadeIn>
    </section>
    <FeatureSection 
      title="Unified Dashboard" 
      description="Track your entire fashion business at a glance. From ticket sales to model bookings, everything is one click away."
      image="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000"
      align="left"
    />
    <FeatureSection 
      title="Global Directory" 
      description="Connect with top tier photographers, models, stylists and venues. Our AI-powered search helps you find the perfect match."
      image="https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&q=80&w=1000"
      align="right"
    />
  </div>
);

const DirectoryPage: React.FC = () => {
  const [activeCat, setActiveCat] = useState<CategoryType>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('Highest Rated');
  const [filterCountry, setFilterCountry] = useState('All Countries');
  const [filterSpecialty, setFilterSpecialty] = useState('All Specialties');

  const items: DirectoryItem[] = [
    { name: 'Elena Rodriguez', role: 'Photographer', loc: 'Barcelona', country: 'Spain', specialty: 'Editorial', rating: 4.9, reviews: 124, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    { name: 'Marcus Chen', role: 'Fashion Designer', loc: 'New York', country: 'USA', specialty: 'Runway', rating: 4.8, reviews: 89, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
    { name: 'Studio 54', role: 'Venue', loc: 'Los Angeles', country: 'USA', specialty: 'Events', rating: 4.6, reviews: 210, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400' },
    { name: 'Coco & Eve', role: 'Brand', loc: 'Sydney', country: 'Australia', specialty: 'Swimwear', rating: 4.8, reviews: 300, image: 'https://images.unsplash.com/photo-1529139574466-a302d2052505?w=400' },
  ];

  const filteredItems = items.filter(item => {
    const roleMatch = activeCat === 'All' ? true : item.role.includes(activeCat.slice(0, -1)); // Simple heuristic
    const countryMatch = filterCountry === 'All Countries' || item.country === filterCountry;
    const specialtyMatch = filterSpecialty === 'All Specialties' || item.specialty === filterSpecialty;
    return roleMatch && countryMatch && specialtyMatch;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
           <SectionTag>Talent Network</SectionTag>
           <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Creative Directory</h1>
           <p className="text-gray-500">Find and collaborate with the industry's best talent.</p>
        </div>

        <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-4 hide-scrollbar">
          {['All', 'Designers', 'Photographers', 'Stylists', 'Models', 'Brands', 'Venues'].map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat as any)} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${activeCat === cat ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-transparent hover:border-gray-200'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-gray-100 shadow-sm mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full border border-gray-100">
                 <MapPin size={14} className="text-gray-400 ml-2" />
                 <input type="text" placeholder="City or Region..." className="bg-transparent border-none outline-none text-xs font-medium w-32" />
              </div>
              {/* Simplified Selects for Refactor */}
              <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-500">
                  {['All Countries', 'USA', 'Spain', 'UK', 'Australia'].map(c => <option key={c}>{c}</option>)}
              </select>
           </div>
           <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex bg-gray-100 p-1 rounded-lg">
                 <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-black' : 'text-gray-400 hover:text-gray-600'}`}><Grid size={16} /></button>
                 <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-black' : 'text-gray-400 hover:text-gray-600'}`}><List size={16} /></button>
              </div>
           </div>
        </div>

        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8' : 'flex flex-col space-y-4 max-w-4xl mx-auto'}`}>
          {filteredItems.map((item, i) => (
            <FadeIn key={i} delay={i * 50}>
               {viewMode === 'grid' ? (
                  <div className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-100 h-full flex flex-col">
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute bottom-3 left-3 flex gap-1">
                         <span className="bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"><Star size={10} className="text-yellow-400 fill-yellow-400" /> {item.rating}</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                       <h3 className="font-serif font-bold text-lg leading-tight mb-1">{item.name}</h3>
                       <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-3">{item.role}</p>
                       <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                         <span className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={12} /> {item.loc}</span>
                         <span className="text-[10px] text-gray-400 font-medium">{item.reviews} reviews</span>
                       </div>
                    </div>
                  </div>
               ) : (
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6 group">
                     <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                     <div className="flex-1">
                        <h3 className="font-serif font-bold text-xl">{item.name}</h3>
                        <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">{item.role}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                           <span className="flex items-center gap-1"><MapPin size={12} /> {item.loc}, {item.country}</span>
                        </div>
                     </div>
                  </div>
               )}
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

const EventsPage: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<{start: Date | null, end: Date | null}>({ start: null, end: null });
  
  const handleApplyDate = (start: Date | null, end: Date | null) => {
    setDateRange({ start, end });
    setShowCalendar(false);
  };

  const getDateLabel = () => {
    if (dateRange.start && dateRange.end) return `${dateRange.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${dateRange.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    if (dateRange.start) return dateRange.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return "Date Range";
  };

  return (
    <div className="animate-in fade-in duration-500 pt-24">
      <section className="relative bg-gradient-to-b from-purple-50 to-white pb-24 pt-12 px-6 md:px-12 overflow-hidden">
         <div className="container mx-auto text-center relative z-10">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-serif text-fashion-black mb-6">Discover Fashion Events <br/> Near You</h1>
              <div className="max-w-2xl mx-auto relative mb-4">
                 <div className="flex items-center bg-white rounded-full shadow-lg p-2 border border-gray-100">
                    <Search className="ml-4 text-gray-400" size={20} />
                    <input type="text" placeholder="Find fashion shows in Medellín..." className="flex-1 p-3 outline-none text-sm bg-transparent text-gray-700" />
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2.5 rounded-full hover:shadow-lg transition-shadow"><Sparkles size={18} /></button>
                 </div>
              </div>
            </FadeIn>
         </div>
      </section>

      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4 shadow-sm">
         <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto">
              <Button variant={showCalendar ? 'primary' : 'pill'} size="sm" className="gap-2 text-xs whitespace-nowrap" onClick={() => setShowCalendar(!showCalendar)}>
                  <Calendar size={14} /> {getDateLabel()} <ChevronDown size={12} />
              </Button>
              <Button variant="pill" size="sm" className="gap-2 text-xs whitespace-nowrap"><Ticket size={14} /> Category</Button>
            </div>
            {showCalendar && (
              <div className="absolute top-16 left-6 z-50">
                 <CalendarPicker onClose={() => setShowCalendar(false)} onApply={handleApplyDate} initialStart={dateRange.start} initialEnd={dateRange.end} />
              </div>
            )}
         </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl text-center"><p className="text-gray-500">Event listings would appear here based on the calendar.</p></div>
           </div>
        </div>
      </section>
    </div>
  );
};

const SocialMediaPage: React.FC = () => (
  <div className="pt-24 pb-20 min-h-screen bg-white">
    <div className="container mx-auto px-6 text-center max-w-4xl">
       <FadeIn>
         <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full text-pink-600 mb-8"><Instagram size={24} /></div>
         <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Social Command Center</h1>
         <p className="text-xl text-gray-500 mb-12">Manage your brand presence across Instagram, TikTok, and LinkedIn.</p>
         <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden h-64">
             <div className="relative z-10 flex items-center justify-center h-full"><p>Analytics Dashboard Preview</p></div>
         </div>
       </FadeIn>
    </div>
  </div>
);

const ServicesPage: React.FC = () => (
  <div className="pt-24 pb-20">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto">
         <h1 className="text-5xl font-serif font-bold mb-6">Our Expertise</h1>
         <p className="text-gray-500 text-lg mb-8">We provide the infrastructure so you can focus on the art.</p>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard'); 

  return (
    <div className="min-h-screen font-sans text-fashion-black bg-white selection:bg-fashion-purple selection:text-white">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />
      <main>
        {currentView === 'home' && <HomePage />}
        {currentView === 'directory' && <DirectoryPage />}
        {currentView === 'events' && <EventsPage />}
        {currentView === 'services' && <ServicesPage />}
        {currentView === 'social' && <SocialMediaPage />}
        {currentView === 'dashboard' && <DashboardPage onViewChange={setCurrentView} />}
      </main>
      {currentView !== 'dashboard' && <Footer currentView={currentView} onViewChange={setCurrentView} />}
    </div>
  );
};

export default App;
