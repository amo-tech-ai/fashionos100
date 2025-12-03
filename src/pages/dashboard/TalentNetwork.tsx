
import React, { useState } from 'react';
import { Search, Filter, Star, User, Mail, Phone, MapPin, Globe, MoreHorizontal } from 'lucide-react';
import { PageHeader } from '../../components/dashboard/Shared';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { DIRECTORY_ITEMS } from '../../data/mockDirectory'; // Reusing mock data for MVP

export const TalentNetwork: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');

  const filteredTalent = DIRECTORY_ITEMS.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'All' || item.role.includes(filterRole);
      return matchesSearch && matchesRole;
  });

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Talent Network" 
        subtitle="Global directory of models, photographers, and creatives."
        breadcrumbs={['Dashboard', 'Logistics', 'Talent']}
        actionLabel="Add Talent"
      />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search talent..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="flex gap-2 overflow-x-auto w-full md:w-auto hide-scrollbar">
            {['All', 'Model', 'Photographer', 'Stylist', 'Designer'].map(role => (
                <button 
                   key={role}
                   onClick={() => setFilterRole(role)}
                   className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${filterRole === role ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                   {role}
                </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {filteredTalent.map((item, i) => (
            <FadeIn key={item.id} delay={i * 50}>
               <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group relative">
                  <div className="aspect-square relative">
                     <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     <div className="absolute top-3 right-3">
                        <button className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white shadow-sm text-gray-400 hover:text-purple-600 transition-colors">
                           <MoreHorizontal size={16} />
                        </button>
                     </div>
                     {item.featured && (
                        <div className="absolute bottom-3 left-3">
                           <span className="bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                              <Star size={10} className="text-yellow-400 fill-yellow-400" /> Top Rated
                           </span>
                        </div>
                     )}
                  </div>
                  
                  <div className="p-5">
                     <div className="flex justify-between items-start mb-2">
                        <div>
                           <h3 className="font-serif font-bold text-lg text-gray-900">{item.name}</h3>
                           <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">{item.role}</p>
                        </div>
                     </div>
                     
                     <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                           <MapPin size={12} /> {item.loc}, {item.country}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                           <Globe size={12} /> {item.experience || 'N/A'} Experience
                        </div>
                     </div>

                     <div className="flex gap-2 pt-4 border-t border-gray-50">
                        <Button variant="outline" size="sm" fullWidth className="text-xs h-8">Profile</Button>
                        <Button variant="primary" size="sm" fullWidth className="text-xs h-8">Message</Button>
                     </div>
                  </div>
               </div>
            </FadeIn>
         ))}
      </div>
    </div>
  );
};
