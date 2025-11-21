import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  LayoutDashboard, Calendar, CalendarCheck, Ticket, Wallet, Share2, Users, ShoppingBag, Settings,
  LogOut, Zap, Search, Menu, Plus, Bell, RefreshCcw, ArrowUpRight, ArrowDownRight,
  CheckCircle, Star, X, Clock, Filter, Download, Check, Mic, Box, AlertCircle, MoreVertical, ImageIcon,
  Instagram, Video, Linkedin, FileText, LineChart, Book, Sparkles, Send, Loader2, TrendingUp, MapPin
} from 'lucide-react';
import { Button } from '../components/Button';
import { FadeIn } from '../components/FadeIn';
import { DashboardKPI } from '../types';

// --- Dashboard Sub-Components ---

// Donut Chart
const DonutChart = () => (
  <div className="relative w-48 h-48 mx-auto">
    <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="12" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="12" strokeDasharray="113 251" strokeLinecap="round" className="drop-shadow-sm" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#ec4899" strokeWidth="12" strokeDasharray="75 251" strokeDashoffset="-120" strokeLinecap="round" className="drop-shadow-sm" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="55 251" strokeDashoffset="-205" strokeLinecap="round" className="drop-shadow-sm" />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-3xl font-bold text-gray-800">2,780</span>
      <span className="text-[10px] uppercase tracking-wider text-gray-400">Total Tickets</span>
    </div>
  </div>
);

// Custom Bar Chart
const CustomBarChart = () => {
  const data = [35, 55, 40, 70, 50, 60, 85, 45];
  return (
    <div className="flex items-end justify-between h-48 gap-2 pt-4">
       {data.map((h, i) => (
          <div key={i} className="w-full bg-purple-100 rounded-t-sm relative group hover:bg-purple-200 transition-colors cursor-pointer" style={{height: `${h}%`}}>
             <div className="absolute bottom-0 w-full bg-purple-500 rounded-t-sm transition-all duration-500 ease-out" style={{height: `${h * 0.6}%`}}></div>
          </div>
       ))}
    </div>
  );
};

// AI Copilot Widget
const AICopilotWidget = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  
  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a fashion creative director assistant. Keep response concise (max 30 words). Answer: ${query}`,
      });
      setResponse(result.text);
    } catch (e) {
      setResponse("Offline mode. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden h-full">
        <div className="relative z-10">
           <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-yellow-300 animate-pulse" size={20} />
              <h3 className="font-serif font-bold text-lg">AI Copilot</h3>
           </div>
           
           <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4 min-h-[80px] flex items-center justify-center text-center border border-white/10">
              {loading ? <Loader2 className="animate-spin" /> : <p className="text-sm font-medium opacity-90">{response || "Ask me for forecast ideas or booking insights..."}</p>}
           </div>

           <div className="relative">
              <input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                type="text" 
                placeholder="Ask anything..." 
                className="w-full bg-white text-gray-900 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none shadow-lg"
              />
              <button onClick={handleAsk} className="absolute right-1 top-1 bg-indigo-600 p-2 rounded-full hover:bg-indigo-700 transition-colors text-white">
                 <Send size={14} />
              </button>
           </div>
        </div>
        <div className="absolute top-[-50%] right-[-20%] w-64 h-64 bg-pink-500 rounded-full blur-[80px] opacity-40" />
        <div className="absolute bottom-[-20%] left-[-20%] w-40 h-40 bg-blue-500 rounded-full blur-[60px] opacity-40" />
     </div>
  );
};

// --- Exported Views ---

export const DashboardBookings = () => {
  const kpis: DashboardKPI[] = [
    { label: 'Total Bookings', val: '55,000', sub: 'All-time bookings', icon: Calendar, color: 'bg-indigo-50 text-indigo-600', trend: 'up' },
    { label: 'Tickets Sold', val: '45,000', sub: 'Confirmed tickets', icon: CheckCircle, color: 'bg-pink-50 text-pink-600', trend: 'up' },
    { label: 'Total Earnings', val: '$275,450', sub: 'Gross Revenue', icon: Clock, color: 'bg-blue-50 text-blue-600', trend: 'up' },
    { label: 'Upcoming', val: '124', sub: 'Next 7 days', icon: Star, color: 'bg-amber-50 text-amber-600', trend: 'up' },
    { label: 'Cancelled', val: '12', sub: 'This month', icon: X, color: 'bg-red-50 text-red-600', trend: 'down' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Bookings</h1>
        <div className="flex items-center gap-3">
           <Button variant="accent" size="sm" className="gap-2"><Plus size={14} /> Add Booking</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-3">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center ${k.color} group-hover:scale-110 transition-transform`}>
                  <k.icon size={20} />
               </div>
               {k.trend === 'up' ? <ArrowUpRight size={16} className="text-green-500" /> : <ArrowDownRight size={16} className="text-red-500" />}
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">{k.label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{k.val}</h3>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold mb-4">Recent Bookings Table</h2>
          <p className="text-sm text-gray-500">Full booking ledger and transaction history.</p>
      </div>
    </div>
  );
};

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

export const DashboardOverview = () => {
  const kpiCards: DashboardKPI[] = [
    { label: 'Upcoming Events', val: '345', sub: 'This Month', icon: Calendar, color: 'bg-pink-100 text-pink-600' },
    { label: 'Total Bookings', val: '1798', sub: '+12% vs last month', icon: CheckCircle, color: 'bg-purple-100 text-purple-600' },
    { label: 'Revenue', val: '$56,320', sub: 'This Month', icon: Wallet, color: 'bg-green-100 text-green-600' },
    { label: 'Social Growth', val: '+18%', sub: 'New Followers', icon: TrendingUp, color: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <section>
          <div className="flex justify-between items-end mb-6">
             <div><h2 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h2><p className="text-gray-500">Hello Orlando, here's what's happening today.</p></div>
             <div className="text-sm text-gray-400 flex items-center gap-2">Last updated: <span className="font-bold text-gray-600">Just now</span> <RefreshCcw size={14} /></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {kpiCards.map((card, i) => (
                <FadeIn key={i} delay={i * 50} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100/50 group">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${card.color} group-hover:scale-110 transition-transform`}><card.icon size={20} /></div>
                   <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{card.label}</p>
                   <p className="text-2xl font-bold text-gray-900 mb-1">{card.val}</p>
                </FadeIn>
             ))}
          </div>
       </section>
       <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"><DonutChart /></div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"><CustomBarChart /></div>
             </div>
          </div>
          <div className="space-y-8">
             <div className="h-64"><AICopilotWidget /></div>
          </div>
       </section>
    </div>
  );
};

export const DashboardPlaceholder = ({ title }: { title: string }) => (
  <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
    <h2 className="text-2xl font-serif font-bold text-gray-300 mb-2">{title} Module</h2>
    <p className="text-gray-400">This dashboard view is under development.</p>
  </div>
);