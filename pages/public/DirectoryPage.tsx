import React, { useState } from 'react';
import { MapPin, Grid, List, Star } from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';
import { CategoryType, DirectoryItem } from '../../types';

export const DirectoryPage: React.FC = () => {
  const [activeCat, setActiveCat] = useState<CategoryType>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCountry, setFilterCountry] = useState('All Countries');

  const items: DirectoryItem[] = [
    { name: 'Elena Rodriguez', role: 'Photographer', loc: 'Barcelona', country: 'Spain', specialty: 'Editorial', rating: 4.9, reviews: 124, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    { name: 'Marcus Chen', role: 'Fashion Designer', loc: 'New York', country: 'USA', specialty: 'Runway', rating: 4.8, reviews: 89, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
    { name: 'Studio 54', role: 'Venue', loc: 'Los Angeles', country: 'USA', specialty: 'Events', rating: 4.6, reviews: 210, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400' },
    { name: 'Coco & Eve', role: 'Brand', loc: 'Sydney', country: 'Australia', specialty: 'Swimwear', rating: 4.8, reviews: 300, image: 'https://images.unsplash.com/photo-1529139574466-a302d2052505?w=400' },
  ];

  const filteredItems = items.filter(item => {
    const roleMatch = activeCat === 'All' ? true : item.role.includes(activeCat.slice(0, -1));
    const countryMatch = filterCountry === 'All Countries' || item.country === filterCountry;
    return roleMatch && countryMatch;
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