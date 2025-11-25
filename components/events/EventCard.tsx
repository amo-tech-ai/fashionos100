
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '../Button';
import { Event } from '../../data/mockEvents';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col h-full cursor-pointer">
    <div className="aspect-[4/3] relative overflow-hidden">
      <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
      <div className="absolute top-3 right-3">
         <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${event.category === 'Runway' ? 'bg-purple-500/90 text-white' : 'bg-white/90 text-black'}`}>
            {event.category}
         </span>
      </div>
      <div className="absolute bottom-3 left-3">
        {event.price.toLowerCase().includes('free') ? (
           <span className="bg-green-400/90 backdrop-blur text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">Free</span>
        ) : (
           <span className="bg-black/70 backdrop-blur text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">{event.price}</span>
        )}
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
          <Calendar size={14} /> {event.date}
        </div>
        {event.timing === 'Live' && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase tracking-wider animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> Live
          </span>
        )}
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
