
import React, { useState } from 'react';
import { 
  MapPin, Grid, List, Star, Search, Filter, Heart, MessageCircle, 
  ChevronDown, ArrowRight, SlidersHorizontal, CheckCircle2, Camera, 
  Palette, Scissors, Mic2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { SectionTag } from '../../components/SectionTag';
import { CategoryType } from '../../types';
import { AICopilotWidget } from '../../components/dashboard/Widgets';

// --- Mock Data ---
const DIRECTORY_ITEMS = [
  { 
    id: 1,
    name: 'Elena Rodriguez', 
    role: 'Photographer', 
    loc: 'Barcelona, Spain', 
    specialty: 'Editorial & Campaign', 
    rating: 4.9, 
    reviews: 124, 
    image: 'https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    tags: ['Editorial', 'Film']
  },
  { 
    id: 2,
    name: 'Marcus Chen', 
    role: 'Fashion Designer', 
    loc: 'New York, USA', 
    specialty: 'Avant-Garde Runway', 
    rating: 4.8, 
    reviews: 89, 
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    tags: ['Sustainable', 'Couture']
  },
  { 
    id: 3,
    name: 'Studio 54', 
    role: 'Venue', 
    loc: 'Los Angeles, USA', 
    specialty: 'Industrial Loft', 
    rating: 4.6, 
    reviews: 210, 
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    tags: ['Daylight', 'Cyclorama']
  },
  { 
    id: 4,
    name: 'Coco & Eve', 
    role: 'Brand', 
    loc: 'Sydney, AU', 
    specialty: 'Swimwear', 
    rating: 4.8, 
    reviews: 300, 
    image: 'https://images.unsplash.com/photo-1529139574466-a302d2052505?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    tags: ['DTC', 'Luxury']
  },
  { 
    id: 5,
    name: 'Sarah Jenkins', 
    role: 'Model', 
    loc: 'London, UK', 
    specialty: 'High Fashion', 
    rating: 5.0, 
    reviews: 42, 
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    tags: ['Runway', 'Print']
  },
  { 
    id: 6,
    name: 'David Kim', 
    role: 'Videographer', 
    loc: 'Seoul, KR', 
    specialty: 'Documentary', 
    rating: 4.9, 
    reviews: 15, 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    tags: ['BTS', 'Drone']
  },
  { 
    id: 7,
    name: 'Lila Vossen', 
    role: 'Stylist', 
    loc: 'Berlin, DE', 
    specialty: 'Commercial', 
    rating: 4.7, 
    reviews: 67, 
    image: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    tags: ['Prop', 'Wardrobe']
  },
  { 
    id: 8,
    name: 'The Warehouse', 
    role: 'Venue', 
    loc: 'Brooklyn, USA', 
    specialty: 'Event Space', 
    rating: 4.5, 
    reviews: 110, 
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    tags: ['Event', 'Large Capacity']
  }
];

// --- Sub-Components ---

const CategoryPill = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
      active 
        ? 'bg-black text-white border-black shadow-md' 
        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-black'
    }`}
  >
    {label}
  </button>
);

const FilterDropdown = ({ label }: { label: string }) => (
  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:border-gray-400 transition-colors">
    {label} <ChevronDown size={12} />
  </button>
);

const FeaturedCard = ({ item }: { item: typeof DIRECTORY_ITEMS[0] }) => (
  <div className="min-w-[280px] md:min-w-[320px] relative group cursor-pointer rounded-xl overflow-hidden aspect-[3/4]">
    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
    
    <div className="absolute top-3 left-3">
       <span className="bg-fashion-purple text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">Featured</span>
    </div>

    <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
      <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-1">{item.role}</p>
      <h3 className="font-serif font-bold text-2xl mb-2">{item.name}</h3>
      <div className="flex items-center gap-2 mb-4">
        <Star size={14} className="text-yellow-400 fill-yellow-400" />
        <span className="text-sm font-medium">{item.rating}</span>
        <span className="text-xs text-gray-400">({item.reviews} reviews)</span>
      </div>
      <Button variant="white" size="sm" className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">View Profile</Button>
    </div>
  </div>
);

const ProfileCard = ({ item, viewMode }: { item: typeof DIRECTORY_ITEMS[0], viewMode: 'grid' | 'list' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-6 group">
        <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 relative">
           <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
           <div className="flex justify-between items-start">
              <div>
                 <h3 className="font-serif font-bold text-xl truncate">{item.name}</h3>
                 <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">{item.role}</p>
              </div>
              <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                 <Star size={12} className="text-yellow-500 fill-yellow-500" />
                 <span className="text-xs font-bold">{item.rating}</span>
              </div>
           </div>
           <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={12} /> {item.loc}</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">{item.specialty}</span>
           </div>
        </div>
        <div className="hidden md:flex gap-2">
           <Button variant="outline" size="sm">Message</Button>
           <Button variant="primary" size="sm">View</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full text-gray-400 hover:text-red-500 transition-colors">
           <Heart size={16} />
        </button>
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
           {item.tags.map(t => (
             <span key={t} className="bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-full">{t}</span>
           ))}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
           <div>
              <h3 className="font-serif font-bold text-xl text-gray-900 leading-tight group-hover:text-fashion-purple transition-colors">{item.name}</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.role}</p>
           </div>
           <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-bold">{item.rating}</span>
           </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
           <MapPin size={12} /> {item.loc}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex gap-2">
           <Button variant="outline" fullWidth size="sm" className="text-[10px]">Message</Button>
           <Button variant="primary" fullWidth size="sm" className="text-[10px]">View Profile</Button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---

export const DirectoryPage: React.FC = () => {
  const [activeCat, setActiveCat] = useState<CategoryType>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredItems = DIRECTORY_ITEMS.filter(item => {
    if (activeCat === 'All') return true;
    // Simple partial match for demo
    return item.role.includes(activeCat.slice(0, -1)) || item.role === activeCat;
  });

  const featuredItems = DIRECTORY_ITEMS.filter(i => i.featured);

  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
               {/* Text Content */}
               <div className="lg:w-1/2 z-10">
                  <FadeIn>
                     <SectionTag>The Fashion Network</SectionTag>
                     <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-[1.1]">
                        Discover the People <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fashion-purple to-pink-500">Behind the Style.</span>
                     </h1>
                     <p className="text-xl text-gray-500 mb-8 max-w-lg leading-relaxed">
                        Explore designers, photographers, models, stylists, brands, and venues — all in one place.
                     </p>
                     
                     {/* Search Bar */}
                     <div className="bg-white p-2 rounded-full shadow-xl border border-gray-100 flex items-center max-w-lg">
                        <Search className="ml-4 text-gray-400" size={20} />
                        <input 
                          type="text" 
                          placeholder="Search by name, city, or category..." 
                          className="flex-1 p-3 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400" 
                        />
                        <Button size="sm" className="rounded-full px-6">Search</Button>
                     </div>
                     <div className="mt-6 flex gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <span>Popular:</span>
                        <span className="text-black cursor-pointer hover:underline">Photographers in Paris</span>
                        <span className="text-black cursor-pointer hover:underline">Runway Models</span>
                     </div>
                  </FadeIn>
               </div>

               {/* Hero Collage */}
               <div className="lg:w-1/2 relative">
                  <FadeIn direction="left" delay={200}>
                     <div className="grid grid-cols-3 gap-4 h-[500px]">
                        <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative">
                           <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800" className="absolute inset-0 w-full h-full object-cover" alt="Main" />
                        </div>
                        <div className="rounded-2xl overflow-hidden relative">
                           <img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=400" className="absolute inset-0 w-full h-full object-cover" alt="Small 1" />
                        </div>
                        <div className="rounded-2xl overflow-hidden relative">
                           <img src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=400" className="absolute inset-0 w-full h-full object-cover" alt="Small 2" />
                        </div>
                     </div>
                  </FadeIn>
               </div>
            </div>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-1/3 h-full bg-purple-50/50 -z-10 blur-3xl rounded-l-full"></div>
      </section>

      {/* 2. Featured Creatives */}
      <section className="py-16 border-t border-gray-100 bg-gray-50/30">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex justify-between items-end mb-8">
               <div>
                  <h2 className="text-2xl font-serif font-bold">Featured Creatives</h2>
                  <p className="text-sm text-gray-500">A curated collection of standout talent.</p>
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full"><ArrowRight size={14}/></Button>
               </div>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar">
               {featuredItems.map((item, i) => (
                  <FeaturedCard key={i} item={item} />
               ))}
            </div>
         </div>
      </section>

      {/* 3. Filters & Grid */}
      <section className="py-12 min-h-screen">
         <div className="container mx-auto px-6 md:px-12">
            
            <div className="flex flex-col lg:flex-row gap-8 items-start">
               
               {/* LEFT SIDEBAR (AI WIDGET) */}
               <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 z-20 space-y-8">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 overflow-hidden">
                     <AICopilotWidget 
                        title="Talent Scout AI"
                        context="You are an expert fashion talent scout. User is looking for talent. Suggest roles, specialties, or search terms based on their query. Keep it brief."
                        placeholder="Find a photographer in Milan..."
                     />
                  </div>
                  <div className="hidden lg:block p-6 bg-gray-50 rounded-2xl border border-gray-100">
                     <h3 className="font-bold mb-4">Trending Searches</h3>
                     <div className="flex flex-wrap gap-2">
                        {['Videographers', 'Stylists NY', 'Makeup Artists', 'Studio Rental'].map(tag => (
                           <span key={tag} className="text-xs bg-white px-3 py-1 rounded-full border border-gray-200 text-gray-600 cursor-pointer hover:border-purple-400">{tag}</span>
                        ))}
                     </div>
                  </div>
               </aside>

               {/* RIGHT MAIN CONTENT */}
               <div className="w-full lg:w-3/4">
                  {/* Sticky Filter Bar */}
                  <div className="sticky top-20 z-30 bg-white/90 backdrop-blur-md py-4 mb-8 border-b border-gray-100 rounded-xl px-2">
                     <div className="flex flex-col xl:flex-row justify-between items-center gap-4">
                        {/* Category Tabs */}
                        <div className="flex gap-2 overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 hide-scrollbar">
                           {['All', 'Designers', 'Photographers', 'Stylists', 'Models', 'Brands', 'Venues'].map(cat => (
                              <CategoryPill 
                                 key={cat} 
                                 label={cat} 
                                 active={activeCat === cat} 
                                 onClick={() => setActiveCat(cat as any)} 
                              />
                           ))}
                        </div>

                        {/* Advanced Filters */}
                        <div className="flex items-center gap-3 w-full xl:w-auto justify-between xl:justify-end">
                           <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
                              <FilterDropdown label="Location" />
                              <FilterDropdown label="Rate" />
                           </div>
                           <div className="flex bg-gray-100 p-1 rounded-lg shrink-0">
                              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-black' : 'text-gray-400 hover:text-gray-600'}`}><Grid size={16} /></button>
                              <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-black' : 'text-gray-400 hover:text-gray-600'}`}><List size={16} /></button>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Results Grid */}
                  <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'flex flex-col space-y-4'}`}>
                     {filteredItems.length > 0 ? (
                        filteredItems.map((item, i) => (
                           <FadeIn key={item.id} delay={i * 50}>
                              <ProfileCard item={item} viewMode={viewMode} />
                           </FadeIn>
                        ))
                     ) : (
                        <div className="col-span-full text-center py-20">
                           <p className="text-gray-400">No creatives found in this category.</p>
                        </div>
                     )}
                  </div>

                  <div className="mt-16 text-center">
                     <Button variant="outline" size="lg">Load More Profiles</Button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-24 bg-black text-white">
         <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
               <SectionTag color="text-gray-400">Process</SectionTag>
               <h2 className="text-4xl md:text-5xl font-serif font-bold">How it Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
               <FadeIn delay={0} direction="up">
                  <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                     <div className="w-16 h-16 bg-fashion-purple rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                        <Search size={32} />
                     </div>
                     <h3 className="text-xl font-bold mb-4">1. Search</h3>
                     <p className="text-gray-400 leading-relaxed">Browse thousands of vetted fashion professionals by specialty, location, and rate.</p>
                  </div>
               </FadeIn>
               <FadeIn delay={100} direction="up">
                  <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                     <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                        <MessageCircle size={32} />
                     </div>
                     <h3 className="text-xl font-bold mb-4">2. Connect</h3>
                     <p className="text-gray-400 leading-relaxed">Send messages, request quotes, and view detailed portfolios directly on the platform.</p>
                  </div>
               </FadeIn>
               <FadeIn delay={200} direction="up">
                  <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                     <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                        <CheckCircle2 size={32} />
                     </div>
                     <h3 className="text-xl font-bold mb-4">3. Collaborate</h3>
                     <p className="text-gray-400 leading-relaxed">Book projects, manage contracts, and produce amazing work seamlessly.</p>
                  </div>
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 5. Why Join */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
               <div className="lg:w-1/2">
                   <SectionTag>For Creatives</SectionTag>
                   <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Why Join FashionOS?</h2>
                   <div className="space-y-6">
                      {[
                        { icon: Camera, title: 'Global Visibility', desc: 'Be found by top agencies and brands worldwide.' },
                        { icon: Palette, title: 'Portfolio Tools', desc: 'Showcase your high-res work in a premium layout.' },
                        { icon: Mic2, title: 'Exclusive Events', desc: 'Get priority access to fashion weeks and networking.' }
                      ].map((feat, i) => (
                        <div key={i} className="flex gap-4">
                           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                              <feat.icon size={20} className="text-fashion-purple" />
                           </div>
                           <div>
                              <h3 className="font-bold text-lg">{feat.title}</h3>
                              <p className="text-gray-500">{feat.desc}</p>
                           </div>
                        </div>
                      ))}
                   </div>
               </div>
               <div className="lg:w-1/2">
                   <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800" alt="Creative" className="w-full" />
                      <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur p-6 rounded-xl">
                         <p className="font-serif text-xl italic text-gray-800 mb-4">"FashionOS transformed how I find clients. It's the LinkedIn for high fashion."</p>
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                               <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" alt="Avatar"/>
                            </div>
                            <div>
                               <p className="text-xs font-bold uppercase tracking-wider">Sarah J.</p>
                               <p className="text-[10px] text-gray-500">Model, London</p>
                            </div>
                         </div>
                      </div>
                   </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="py-20 px-6">
         <div className="container mx-auto bg-gradient-to-r from-fashion-purple to-indigo-600 rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
               <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Become Part of the Network.</h2>
               <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">Join a curated platform where fashion meets opportunity. Create your free profile today.</p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/dashboard"><Button variant="white" size="lg">Join Directory</Button></Link>
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-purple-600">Explore Creators</Button>
               </div>
             </div>
             {/* Decorative circles */}
             <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
         </div>
      </section>

    </div>
  );
};
