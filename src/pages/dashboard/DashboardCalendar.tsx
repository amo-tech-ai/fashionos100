
import React, { useState, useMemo } from 'react';
import { CalendarCheck, Users, Box, AlertCircle, Plus, X, Mic, Loader2, Clock, Camera } from 'lucide-react';
import { Button } from '../../components/Button';
import { DashboardKPI } from '../../types';
import { useEvents } from '../../hooks/useEvents';
import { useShoots } from '../../hooks/useShoots';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

interface CalendarEvent {
  id: string;
  day: number;
  month: number;
  year: number;
  title: string;
  time: string;
  type: 'Event' | 'Shoot' | 'Meeting';
  color: string;
  rawDate: Date;
}

export const DashboardCalendar = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'Month' | 'Week' | 'Content'>('Month');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const { user } = useAuth();
  const { events, loading: eventsLoading } = useEvents({ organizerId: user?.id });
  const { shoots, loading: shootsLoading } = useShoots();
  const [showNewMenu, setShowNewMenu] = useState(false);

  const loading = eventsLoading || shootsLoading;

  // Process real data into calendar events
  const calendarEvents = useMemo<CalendarEvent[]>(() => {
    const items: CalendarEvent[] = [];

    // Map Events
    events.forEach(e => {
        const date = new Date(e.start_time);
        items.push({
            id: `evt-${e.id}`,
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            title: e.title,
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'Event',
            color: 'bg-orange-100 text-orange-700',
            rawDate: date
        });
    });

    // Map Shoots
    shoots.forEach(s => {
        if (s.scheduled_date) {
            const date = new Date(s.scheduled_date); 
            if (!isNaN(date.getTime())) {
                 items.push({
                    id: `sht-${s.id}`,
                    day: date.getUTCDate(), 
                    month: date.getUTCMonth(),
                    year: date.getUTCFullYear(),
                    title: `${s.shoot_type} - ${s.fashion_category}`,
                    time: s.scheduled_time || 'TBD',
                    type: 'Shoot',
                    color: 'bg-purple-100 text-purple-700',
                    rawDate: date
                });
            }
        }
    });

    return items;
  }, [events, shoots]);
  
  const kpis: DashboardKPI[] = [
    { label: 'All Schedules', val: calendarEvents.length.toString(), sub: 'Total Items', icon: CalendarCheck, color: 'bg-purple-50 text-purple-600' },
    { label: 'Event', val: events.length.toString(), sub: 'Fashion shows', icon: Mic, color: 'bg-pink-50 text-pink-600' },
    { label: 'Shoots', val: shoots.filter(s => ['confirmed', 'shooting'].includes(s.status)).length.toString(), sub: 'Active Productions', icon: Box, color: 'bg-amber-50 text-amber-600' },
    { label: 'Meeting', val: '0', sub: 'Team syncs', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Deadlines', val: '0', sub: 'Due this week', icon: AlertCircle, color: 'bg-red-50 text-red-600' },
  ];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getEventsForDay = (day: number) => {
      return calendarEvents.filter(e => e.day === day && e.month === currentMonth && e.year === currentYear);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-32">
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Calendar</h1>
        <div className="relative">
            <Button variant="accent" size="sm" className="gap-2" onClick={() => setShowNewMenu(!showNewMenu)}>
                <Plus size={14} /> New Agenda
            </Button>
            {showNewMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-1 z-50 animate-in fade-in zoom-in-95">
                    <Link to="/dashboard/events/new" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 rounded-lg">
                        <Mic size={14} className="text-pink-500" /> Create Event
                    </Link>
                    <Link to="/start-project" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 rounded-lg">
                        <Camera size={14} className="text-purple-500" /> Book Shoot
                    </Link>
                </div>
            )}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white p-4 lg:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-3">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center ${k.color} group-hover:scale-110 transition-transform`}>
                  <k.icon size={20} />
               </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{k.val}</h3>
            <p className="text-gray-900 font-bold text-xs mb-1">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm sticky top-[72px] z-30">
         <h2 className="text-xl font-serif font-bold w-40 shrink-0">
            {currentDate.toLocaleString('default', { month: 'long' })} {currentYear}
         </h2>
         <div className="flex gap-2 overflow-x-auto hide-scrollbar w-full">
            {['All Schedules', 'Event', 'Shoot', 'Meeting'].map((f, i) => (
               <button key={i} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${i === 0 ? 'bg-black text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>{f}</button>
            ))}
         </div>
         <div className="flex items-center gap-2 w-full xl:w-auto justify-end">
            <div className="flex bg-gray-50 p-1 rounded-lg">
               {['Month', 'Week', 'Content'].map((m) => (
                  <button key={m} onClick={() => setViewMode(m as any)} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === m ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>{m}</button>
               ))}
            </div>
         </div>
      </div>

      {viewMode === 'Month' && (
         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
                 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="py-3 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400">{d}</div>)}
              </div>
              
              {loading ? (
                   <div className="min-h-[600px] flex items-center justify-center">
                       <Loader2 className="animate-spin text-gray-300" size={48} />
                   </div>
              ) : (
                  <div className="grid grid-cols-7 grid-rows-5 min-h-[600px] divide-x divide-gray-100 divide-y">
                      {/* Offset for start of month - simplified for mock logic */}
                      <div className="bg-gray-50/30"></div><div className="bg-gray-50/30"></div>
                      
                      {days.map(day => (
                          <div key={day} className="relative p-2 h-full hover:bg-gray-50/50 transition-colors group min-h-[100px]">
                              <span className="text-xs font-medium mb-2 block">{day}</span>
                              <div className="space-y-1.5">
                                  {getEventsForDay(day).map((ev, i) => (
                                  <button key={i} onClick={() => setSelectedEvent(ev)} className={`w-full text-left p-2 rounded-lg text-[10px] ${ev.color} hover:brightness-95 transition-all`}>
                                      <div className="font-bold truncate">{ev.title}</div>
                                      <div className="text-[9px] opacity-80">{ev.time}</div>
                                  </button>
                                  ))}
                              </div>
                          </div>
                      ))}
                  </div>
              )}
            </div>
         </div>
      )}

      {selectedEvent && (
         <>
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setSelectedEvent(null)}></div>
            <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50 p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
               <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
               <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full mb-4 inline-block ${selectedEvent.color}`}>
                   {selectedEvent.type}
               </span>
               <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
               <p className="text-gray-500 mb-6 flex items-center gap-2">
                   <Clock size={16} /> {selectedEvent.rawDate.toDateString()} at {selectedEvent.time}
               </p>
               <Button fullWidth variant="primary" className="mt-8">View Full Details</Button>
            </div>
         </>
      )}
    </div>
  );
};
