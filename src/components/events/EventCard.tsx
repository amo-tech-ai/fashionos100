
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '../Button';
import { Event } from '../../data/mockEvents';
import { Link } from 'react-router-dom';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <Link to={`/events/${event.id}`} className="block h-full">
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-purple-100 transition-all duration-500 flex flex-col h-full cursor-pointer relative">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute top-3 right-3">
           <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${event.category === 'Runway' ? 'bg-purple-600/90 text-white' : 'bg-white/95 text-black'}`}>
              {event.category}
           </span>
        </div>
        <div className="absolute bottom-3 left-3">
          {event.price.toLowerCase().includes('free') ? (
             <span className="bg-green-500/90 backdrop-blur text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm">Free</span>
          ) : (
             <span className="bg-black/80 backdrop-blur text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm">{event.price}</span>
          )}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider">
            <Calendar size={12} className="text-purple-500" /> {event.date}
          </div>
          {event.timing === 'Live' && (
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wider animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Live
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-serif font-bold mb-2 leading-tight group-hover:text-purple-600 transition-colors line-clamp-2">{event.title}</h3>
        
        <div className="flex items-center gap-2 text-gray-500 text-xs mb-5">
          <MapPin size={14} className="text-gray-400" /> {event.location}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {event.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-500 rounded-md text-[10px] font-bold uppercase tracking-wide">{tag}</span>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
           <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">{event.capacity}</span>
           <Button variant="primary" size="sm" className="rounded-full px-5 h-8 text-xs bg-black group-hover:bg-purple-600 border-transparent transition-colors">Get Tickets</Button>
        </div>
      </div>
    </div>
  </Link>
);
