import React, { useState } from 'react';
import { Search, Sparkles, Calendar, Ticket, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { CalendarPicker } from '../../components/CalendarPicker';

export const EventsPage: React.FC = () => {
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
            <div className="hidden md:block">
               <Link to="/dashboard"><Button variant="accent" size="sm">Create Event</Button></Link>
            </div>
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