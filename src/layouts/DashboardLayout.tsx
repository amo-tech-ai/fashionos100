
import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Calendar, Ticket, Wallet, Settings, LogOut, Menu, Search, 
  FileText, Image, MessageSquare, Heart, Target, Users, TrendingUp, Package, 
  Mic2, BarChart3, Globe, Camera, Truck, Plus, BookOpen, Activity, X, ArrowLeft, 
  MapPin, Star, Clock, ListVideo, Map, Scissors, Shirt, DollarSign, Zap, CheckSquare, Scroll
} from 'lucide-react';
import { NavLink, Link, Outlet, useNavigate, useLocation, matchPath } from 'react-router-dom';
import { NotificationsMenu } from '../components/dashboard/NotificationsMenu';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';

interface MenuItem {
  label: string;
  path: string;
  icon: any;
  end?: boolean;
}

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- 1. Detect Event Context ---
  // We check if the current URL matches /dashboard/events/:id/*
  // We exclude 'new' to keep the Wizard in the global context
  const eventMatch = matchPath({ path: "/dashboard/events/:id/*", end: false }, location.pathname);
  const isEventContext = eventMatch && eventMatch.params.id !== 'new';
  const eventId = eventMatch?.params.id;

  // --- 2. Define Navigation Configs ---
  
  // Global Context Menu
  const globalMenuGroups: { category: string; items: MenuItem[] }[] = [
    {
      category: "Core",
      items: [
        { label: "Overview", path: "/dashboard", icon: LayoutDashboard, end: true },
        { label: "Calendar", path: "/dashboard/calendar", icon: Calendar },
        { label: "Messages", path: "/dashboard/messages", icon: MessageSquare }
      ]
    },
    {
      category: "Commercial",
      items: [
        { label: "Sponsors", path: "/dashboard/sponsors", icon: Users },
        { label: "Pipeline", path: "/dashboard/leads", icon: Target },
        { label: "Packages", path: "/dashboard/packages", icon: Package }
      ]
    },
    {
      category: "Logistics",
      items: [
        { label: "Venue Directory", path: "/dashboard/venues", icon: MapPin },
        { label: "Talent Network", path: "/dashboard/talent", icon: Star }
      ]
    },
    {
      category: "Shoots (Studio)",
      items: [
        { label: "Bookings", path: "/dashboard/bookings", icon: Camera },
        { label: "Gallery", path: "/dashboard/gallery", icon: Image },
        { label: "Delivery", path: "/dashboard/delivery", icon: Truck },
      ]
    },
    {
      category: "Events",
      items: [
        { label: "All Events", path: "/dashboard/events", icon: Ticket },
        { label: "Opportunities", path: "/dashboard/opportunities", icon: TrendingUp },
      ]
    },
    {
      category: "Finance & System",
      items: [
        { label: "Invoices", path: "/dashboard/invoices", icon: FileText },
        { label: "Settings", path: "/dashboard/settings", icon: Settings },
      ]
    }
  ];

  // Event Context Menu
  // Paths are relative to the specific event ID
  const eventMenuGroups: { category: string; items: MenuItem[] }[] = [
    {
      category: "Management",
      items: [
        { label: "Command Center", path: `/dashboard/events/${eventId}`, icon: Activity, end: true },
        { label: "Timeline", path: `/dashboard/events/${eventId}/timeline`, icon: Clock },
        { label: "Run of Show", path: `/dashboard/events/${eventId}/schedule`, icon: ListVideo }
      ]
    },
    {
      category: "Logistics",
      items: [
        { label: "Venue & Map", path: `/dashboard/events/${eventId}/venue`, icon: Map },
        { label: "Guest List", path: `/dashboard/events/${eventId}/guests`, icon: Users }
      ]
    },
    {
      category: "Casting",
      items: [
        { label: "Models", path: `/dashboard/events/${eventId}/models`, icon: Scissors },
        { label: "Designers", path: `/dashboard/events/${eventId}/designers`, icon: Shirt }
      ]
    },
    {
      category: "Commercial",
      items: [
        { label: "Sponsors", path: `/dashboard/events/${eventId}/sponsors`, icon: DollarSign },
        { label: "Tickets", path: `/dashboard/events/${eventId}/tickets`, icon: Ticket },
        { label: "Activations", path: `/dashboard/events/${eventId}/activations`, icon: Zap },
        { label: "Deliverables", path: `/dashboard/events/${eventId}/deliverables`, icon: CheckSquare }
      ]
    }
  ];

  const currentMenuGroups = isEventContext ? eventMenuGroups : globalMenuGroups;

  const handleSignOut = async () => {
    await (supabase.auth as any).signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#F8F9FB] font-sans overflow-hidden">
       {/* Sidebar Desktop */}
       <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col fixed h-full z-20">
          <div className="p-8 flex-shrink-0">
             <Link to="/" className="text-2xl font-serif font-bold tracking-tighter text-black no-underline">FashionOS</Link>
             <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
                {isEventContext ? 'Event Manager' : 'Command Center'}
             </span>
          </div>

          {/* Context Switcher / Back Button */}
          {isEventContext && (
            <div className="px-4 mb-2">
                <button 
                  onClick={() => navigate('/dashboard/events')}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-600 transition-colors border border-gray-200"
                >
                    <ArrowLeft size={14} /> All Events
                </button>
            </div>
          )}

          <nav className="flex-1 px-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 pb-4">
             {currentMenuGroups.map((group, i) => (
               <div key={i}>
                 <h4 className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{group.category}</h4>
                 <div className="space-y-1">
                    {group.items.map((item) => (
                        <NavLink 
                        key={item.label} 
                        to={item.path} 
                        end={item.end}
                        className={({ isActive }) => 
                            `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-fashion-black text-white shadow-lg shadow-gray-200' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`
                        }
                        >
                        <item.icon size={18} />{item.label}
                        </NavLink>
                    ))}
                 </div>
               </div>
             ))}
          </nav>
          <div className="p-6 border-t border-gray-50 flex-shrink-0">
             <button onClick={handleSignOut} className="flex items-center gap-2 text-gray-400 hover:text-red-500 text-xs font-bold uppercase tracking-wider transition-colors w-full">
               <LogOut size={14} /> Sign Out
             </button>
          </div>
       </aside>

       {/* Mobile Sidebar Overlay */}
       {isMobileMenuOpen && (
         <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
       )}
       
       {/* Mobile Sidebar Drawer */}
       <aside className={`fixed inset-y-0 left-0 w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 flex justify-between items-center border-b border-gray-50 bg-gray-50/50">
            <span className="text-xl font-serif font-bold">FashionOS</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={20} /></button>
          </div>
          
          {/* Mobile Context Switcher */}
          {isEventContext && (
            <div className="px-4 mt-4">
                <button 
                  onClick={() => { navigate('/dashboard/events'); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-600 border border-gray-200"
                >
                    <ArrowLeft size={14} /> All Events
                </button>
            </div>
          )}

          <nav className="px-4 py-4 space-y-6 overflow-y-auto h-[calc(100vh-140px)]">
            {currentMenuGroups.map((group, i) => (
               <div key={i}>
                 <h4 className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{group.category}</h4>
                 <div className="space-y-1">
                    {group.items.map((item) => (
                        <NavLink 
                        key={item.label} 
                        to={item.path}
                        end={item.end}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) => 
                            `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${isActive ? 'bg-fashion-black text-white' : 'text-gray-500'}`
                        }
                        >
                        <item.icon size={18} />{item.label}
                        </NavLink>
                    ))}
                 </div>
               </div>
             ))}
          </nav>
       </aside>

       {/* Main Content Wrapper */}
       <div className="flex-1 lg:ml-64 flex flex-col min-w-0 h-full">
          {/* Header (Fixed at top of content area) */}
          <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center flex-shrink-0 z-30 sticky top-0">
             <div className="flex items-center gap-4 flex-1">
                <button className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg" onClick={() => setIsMobileMenuOpen(true)}><Menu className="text-gray-500" /></button>
                <div className="relative w-full max-w-md hidden md:block">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                   <input type="text" placeholder="Search events, clients..." className="w-full bg-gray-50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-purple-100 transition-all" />
                </div>
                {!isEventContext && (
                    <Link to="/start-project" className="hidden md:block">
                    <Button variant="accent" size="sm" className="gap-2 rounded-full">
                        <Plus size={16} /> New Project
                    </Button>
                    </Link>
                )}
             </div>
             <div className="flex items-center gap-4">
                <NotificationsMenu />
                <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                   <div className="text-right hidden sm:block"><p className="text-sm font-bold leading-none">Orlando L.</p><p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Admin</p></div>
                   <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="User" /></div>
                </div>
             </div>
          </header>

          {/* Scrollable Main Content Area */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-200">
             <div className="max-w-7xl mx-auto pb-12">
                <Outlet />
             </div>
          </main>
       </div>
    </div>
  );
};
