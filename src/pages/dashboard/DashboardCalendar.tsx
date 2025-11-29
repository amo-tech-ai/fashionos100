import React, { useState } from 'react';
import { CalendarCheck, Users, Box, AlertCircle, Plus, X, Mic } from 'lucide-react';
import { Button } from '../../components/Button';
import { DashboardKPI } from '../../types';

export const DashboardCalendar = () => {
  const [viewMode, setViewMode] = useState<'Month' | 'Week' | 'Content'>('Month');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  const kpis: DashboardKPI[] = [
    { label: 'All Schedules', val: '15', sub: 'Agenda Items', icon: CalendarCheck, color: 'bg-purple-50 text-purple-600' },
    { label: 'Event', val: '4', sub: 'Fashion shows', icon: Mic, color: 'bg-pink-50 text-pink-600' },
    { label: 'Meeting', val: '5', sub: 'Team syncs', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Setup', val: '3', sub: 'Stage prep', icon: Box, color: 'bg-amber-50 text-amber-600' },
    { label: 'Deadlines', val: '8', sub: 'Due this week', icon: AlertCircle, color: 'bg-red-50 text-red-600' },
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const events = [
    { id: 1, day: 1, title: 'Team Brainstorming...', time: '3:00 PM', type: 'Meeting', color: 'bg-purple-100 text-purple-700', badges: ['T', 'M'] },
    { id: 3, day: 4, title: 'Artistry Unveiled Cl...', time: '5:00 PM', type: 'Event', color: 'bg-orange-100 text-orange-700', badges: [] },
    { id: 8, day: 21, title: 'Symphony Under th...', time: '12:00 PM', type: 'Event', color: 'bg-pink-100 text-pink-700', badges: [] },
  ];

  const getEventsForDay = (day: number) => events.filter(e => e.day === day);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Calendar</h1>
        <Button variant="accent" size="sm" className="gap-2"><Plus size={14} /> New Agenda</Button>
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
         <h2 className="text-xl font-serif font-bold w-32 shrink-0">May 2029</h2>
         <div className="flex gap-2 overflow-x-auto hide-scrollbar w-full">
            {['All Schedules', 'Event', 'Meeting', 'Setup', 'Deadlines'].map((f, i) => (
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
         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
               {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="py-3 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 grid-rows-5 min-h-[600px] divide-x divide-gray-100 divide-y">
               <div className="bg-gray-50/30"></div><div className="bg-gray-50/30"></div>
               {days.map(day => (
                  <div key={day} className="relative p-2 h-full hover:bg-gray-50/50 transition-colors group">
                     <span className="text-xs font-medium mb-2 block">{day}</span>
                     <div className="space-y-1.5">
                        {getEventsForDay(day).map((ev, i) => (
                           <button key={i} onClick={() => setSelectedEvent(ev)} className={`w-full text-left p-2 rounded-lg text-[10px] ${ev.color}`}>
                              <div className="font-bold truncate">{ev.title}</div>
                           </button>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      )}

      {selectedEvent && (
         <>
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setSelectedEvent(null)}></div>
            <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50 p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
               <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
               <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
               <Button fullWidth variant="primary" className="mt-8">Edit Event</Button>
            </div>
         </>
      )}
    </div>
  );
};