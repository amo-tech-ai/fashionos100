
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Ticket, TrendingUp, MoreHorizontal, MapPin, Clock, 
  Users, DollarSign, ChevronRight, Filter, Search, Bell, 
  CheckCircle2, AlertCircle, Music, Camera, Zap, Plus, ArrowUpRight,
  MessageSquare, Mail
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';

// --- Mock Data ---

const KPI_DATA = [
  { label: 'Upcoming Events', value: '345', icon: Calendar, color: 'text-pink-600', bg: 'bg-pink-50', trend: '+12%' },
  { label: 'Total Bookings', value: '1,798', icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+5.4%' },
  { label: 'Tickets Sold', value: '12,450', icon: Ticket, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50', trend: '+18%' },
  { label: 'Revenue (MTD)', value: '$348.8k', icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+22%' },
];

const POPULAR_CATEGORIES = [
  { name: 'Fashion Runway', count: '12.5k', percent: 45, color: 'bg-purple-500' },
  { name: 'Music Festivals', count: '8.2k', percent: 30, color: 'bg-pink-500' },
  { name: 'Workshops', count: '4.1k', percent: 15, color: 'bg-indigo-500' },
];

const UPCOMING_EVENTS = [
  { 
    id: 1, 
    title: "Milan Fashion Week Finale", 
    category: "Runway", 
    date: "Apr 20, 2025", 
    location: "Milan, Italy",
    price: "$450",
    status: "Selling Fast",
    image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&q=80&w=600"
  },
  { 
    id: 2, 
    title: "Neon Nights Gala", 
    category: "Gala", 
    date: "May 12, 2025", 
    location: "New York, USA",
    price: "$1,200",
    status: "Sold Out",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600"
  },
  { 
    id: 3, 
    title: "Vogue Summer Party", 
    category: "Social", 
    date: "Jun 01, 2025", 
    location: "Los Angeles, USA",
    price: "$150",
    status: "Open",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=600"
  }
];

const RECENT_BOOKINGS = [
  { id: "INV-001", name: "Jackson Moore", event: "Symphony Under Stars", qty: 2, amount: "$100", status: "Confirmed", date: "Feb 15, 10:30 AM" },
  { id: "INV-002", name: "Alicia Smithson", event: "Runway Revolution", qty: 1, amount: "$120", status: "Pending", date: "Feb 16, 03:45 PM" },
  { id: "INV-003", name: "Marcus Rawless", event: "Global Wellness Summit", qty: 3, amount: "$240", status: "Confirmed", date: "Feb 17, 01:15 PM" },
  { id: "INV-004", name: "Patrick Cooper", event: "Champions League", qty: 4, amount: "$120", status: "Cancelled", date: "Feb 18, 09:00 AM" },
];

const ACTIVITY_FEED = [
  { user: "Admin Stefanus", action: "reviewed refund request", target: "INV-1004", time: "2h ago", icon: AlertCircle, color: "text-amber-500 bg-amber-50" },
  { user: "Wella McGrath", action: "updated ticket prices", target: "Runway 2024", time: "4h ago", icon: Ticket, color: "text-purple-500 bg-purple-50" },
  { user: "Patrick Cooper", action: "canceled booking", target: "INV-10014", time: "1d ago", icon: CheckCircle2, color: "text-red-500 bg-red-50" },
  { user: "Andrew Shaw", action: "created new event", target: "Symphony Stars", time: "2d ago", icon: Plus, color: "text-green-500 bg-green-50" },
];

// --- Components ---

const DonutChart = () => (
  <div className="relative w-40 h-40 mx-auto">
    <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="10" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="10" strokeDasharray="160 251" strokeLinecap="round" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#ec4899" strokeWidth="10" strokeDasharray="60 251" strokeDashoffset="-165" strokeLinecap="round" />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-2xl font-bold text-gray-900">2,780</span>
      <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Tickets</span>
    </div>
  </div>
);

const RevenueChart = () => (
  <div className="flex items-end justify-between h-32 gap-2">
    {[40, 65, 45, 80, 55, 70, 90, 60].map((h, i) => (
      <div key={i} className="w-full bg-indigo-50 rounded-t-sm relative group hover:bg-indigo-100 transition-colors">
        <div 
          className="absolute bottom-0 w-full bg-indigo-500 rounded-t-sm transition-all duration-500" 
          style={{ height: `${h}%` }}
        />
      </div>
    ))}
  </div>
);

export const DashboardEvents = () => {
  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Events Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage your runway shows, ticket sales, and guest lists.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Search events..." className="bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-purple-400 w-64" />
          </div>
          <Link to="/dashboard/events/new">
            <Button variant="primary" size="sm" className="rounded-full gap-2 shadow-lg shadow-purple-500/20">
               <Plus size={16} /> Create New Event
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. KPI ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_DATA.map((kpi, i) => (
          <FadeIn key={i} delay={i * 50} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">{kpi.trend}</span>
            </div>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
          </FadeIn>
        ))}
      </div>

      {/* 3. ANALYTICS & HIGHLIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ticket Sales */}
        <FadeIn delay={100} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-gray-900">Ticket Sales</h3>
             <select className="bg-gray-50 border-none text-xs font-bold rounded-lg px-2 py-1 text-gray-500"><option>This Week</option></select>
          </div>
          <div className="flex items-center justify-between gap-8">
             <DonutChart />
             <div className="space-y-3 flex-1">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Sold Out</span><span className="font-bold">1,251</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Available</span><span className="font-bold">695</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Reserved</span><span className="font-bold">834</span></div>
             </div>
          </div>
        </FadeIn>

        {/* Revenue Analysis */}
        <FadeIn delay={200} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-2">
             <h3 className="font-bold text-gray-900">Sales Revenue</h3>
             <select className="bg-gray-50 border-none text-xs font-bold rounded-lg px-2 py-1 text-gray-500"><option>Last 8 Months</option></select>
          </div>
          <div className="mb-6">
             <p className="text-3xl font-bold text-gray-900">$348,805</p>
             <p className="text-xs text-green-500 font-bold flex items-center gap-1"><ArrowUpRight size={12} /> +$56,320 profit</p>
          </div>
          <RevenueChart />
          <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
             <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
          </div>
        </FadeIn>

        {/* Popular Events / Categories */}
        <FadeIn delay={300} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-gray-900">Popular Categories</h3>
             <MoreHorizontal className="text-gray-400 cursor-pointer" size={16} />
          </div>
          <div className="space-y-6">
             {POPULAR_CATEGORIES.map((cat, i) => (
                <div key={i}>
                   <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-gray-700">{cat.name}</span>
                      <span className="text-gray-500 text-xs">{cat.count} Events</span>
                   </div>
                   <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.percent}%` }} />
                   </div>
                </div>
             ))}
          </div>
          <Button variant="outline" fullWidth className="mt-6 text-xs">View All Analytics</Button>
        </FadeIn>
      </div>

      {/* 4. FEATURED EVENT & CALENDAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <FadeIn delay={400} className="lg:col-span-2 relative rounded-3xl overflow-hidden min-h-[300px] group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1200" alt="Highlight" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white w-full">
               <div className="flex justify-between items-end">
                  <div>
                     <span className="bg-white/20 backdrop-blur border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">Featured Event</span>
                     <h2 className="text-3xl font-serif font-bold mb-2">Rhythm & Beats Music Festival</h2>
                     <p className="text-purple-200 text-sm mb-4 max-w-md">Immerse yourself in electrifying performances by top pop, rock, EDM, and hip-hop artists.</p>
                     <div className="flex items-center gap-4 text-sm font-medium">
                        <span className="flex items-center gap-2"><Calendar size={16} /> Apr 20, 2025</span>
                        <span className="flex items-center gap-2"><MapPin size={16} /> Sunset Park, LA</span>
                     </div>
                  </div>
                  <Button variant="white" className="hidden sm:flex">View Details</Button>
               </div>
            </div>
         </FadeIn>

         <FadeIn delay={500} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900">Calendar</h3>
                <span className="text-xs font-bold text-gray-400">March 2025</span>
             </div>
             
             {/* Mini Calendar UI */}
             <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <span key={d} className="text-[10px] text-gray-400 font-bold uppercase">{d}</span>)}
             </div>
             <div className="grid grid-cols-7 gap-1 text-center flex-1">
                {Array.from({length: 31}, (_, i) => i+1).map(d => {
                   const isActive = d === 14;
                   const hasEvent = [5, 14, 23].includes(d);
                   return (
                      <div key={d} className={`aspect-square flex flex-col items-center justify-center rounded-full text-xs font-medium cursor-pointer hover:bg-gray-50 ${isActive ? 'bg-fashion-black text-white hover:bg-black' : 'text-gray-600'}`}>
                         {d}
                         {hasEvent && <div className={`w-1 h-1 rounded-full mt-0.5 ${isActive ? 'bg-pink-500' : 'bg-purple-500'}`} />}
                      </div>
                   );
                })}
             </div>

             <div className="space-y-3 mt-6 border-t border-gray-50 pt-4">
                <div className="flex gap-3 items-center bg-gray-50 p-3 rounded-xl">
                   <div className="w-10 h-10 bg-fashion-black text-white rounded-lg flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold">MAR</span>
                      <span className="text-sm font-bold">14</span>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-gray-900">Panel Discussion</p>
                      <p className="text-xs text-gray-500">Tech Beyond 2024</p>
                   </div>
                </div>
             </div>
         </FadeIn>
      </div>

      {/* 5. ALL EVENTS GRID */}
      <section>
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif font-bold text-xl">Upcoming Events</h3>
            <Button variant="ghost" size="sm">View All Events</Button>
         </div>
         
         {UPCOMING_EVENTS.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {UPCOMING_EVENTS.map((evt, i) => (
                   <FadeIn key={evt.id} delay={i * 100} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
                      <div className="aspect-[16/9] relative overflow-hidden">
                         <img src={evt.image} alt={evt.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            {evt.category}
                         </div>
                      </div>
                      <div className="p-5">
                         <h4 className="font-serif font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors">{evt.title}</h4>
                         <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                            <span className="flex items-center gap-1"><MapPin size={12} /> {evt.location}</span>
                            <span className="flex items-center gap-1"><Calendar size={12} /> {evt.date}</span>
                         </div>
                         <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                            <span className="font-bold text-lg">{evt.price}</span>
                            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${evt.status === 'Sold Out' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>{evt.status}</span>
                         </div>
                      </div>
                   </FadeIn>
                ))}
            </div>
         ) : (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Calendar size={24} />
               </div>
               <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">No Events Yet</h3>
               <p className="text-gray-500 mb-6">Get started by creating your first event.</p>
               <Link to="/dashboard/events/new">
                  <Button variant="primary">Create New Event</Button>
               </Link>
            </div>
         )}
      </section>

      {/* 6. BOOKINGS TABLE & ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Bookings Table */}
         <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
               <h3 className="font-bold text-gray-900">Recent Bookings</h3>
               <div className="flex gap-2">
                  <div className="relative">
                     <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                     <input type="text" placeholder="Search..." className="bg-gray-50 border-none rounded-full pl-8 pr-3 py-1.5 text-xs focus:ring-1 focus:ring-purple-200" />
                  </div>
                  <button className="bg-gray-50 p-1.5 rounded-full text-gray-500 hover:bg-gray-100"><Filter size={14} /></button>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-wider font-bold">
                     <tr>
                        <th className="px-6 py-3">Invoice ID</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Event</th>
                        <th className="px-6 py-3">Qty</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {RECENT_BOOKINGS.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                           <td className="px-6 py-4 font-medium text-gray-900">{row.id}</td>
                           <td className="px-6 py-4 text-gray-500 text-xs">{row.date}</td>
                           <td className="px-6 py-4 font-bold text-gray-800">{row.name}</td>
                           <td className="px-6 py-4 text-gray-600">{row.event}</td>
                           <td className="px-6 py-4 text-gray-600">{row.qty}</td>
                           <td className="px-6 py-4 font-medium">{row.amount}</td>
                           <td className="px-6 py-4">
                              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                                 row.status === 'Confirmed' ? 'bg-purple-50 text-purple-600' : 
                                 row.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 
                                 'bg-red-50 text-red-500'
                              }`}>
                                 {row.status}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-4 border-t border-gray-50 text-center">
               <button className="text-xs font-bold text-purple-600 hover:underline">View All Transactions</button>
            </div>
         </div>

         {/* Activity Feed */}
         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-gray-900">Recent Activity</h3>
               <MoreHorizontal size={16} className="text-gray-400" />
            </div>
            <div className="space-y-6 relative">
               {/* Timeline Line */}
               <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gray-100" />
               
               {ACTIVITY_FEED.map((item, i) => (
                  <div key={i} className="flex gap-4 relative">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white ${item.color}`}>
                        <item.icon size={16} />
                     </div>
                     <div className="pt-1">
                        <p className="text-sm text-gray-800 leading-snug">
                           <span className="font-bold">{item.user}</span> {item.action} for <span className="font-medium text-gray-900">"{item.target}"</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

    </div>
  );
};
