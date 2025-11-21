import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, CalendarCheck, Ticket, Wallet, Share2, Users, 
  ShoppingBag, Settings, LogOut, Menu, Search, Bell, FileText, Image, MessageSquare, Heart
} from 'lucide-react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Updated Menu Items based on the requirements
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Bookings', path: '/dashboard/bookings' },
    { icon: FileText, label: 'Invoices', path: '/dashboard/invoices' }, // New
    { icon: MessageSquare, label: 'Inbox', path: '/dashboard/messages' }, // New
    { icon: CalendarCheck, label: 'Calendar', path: '/dashboard/calendar' },
    { icon: Ticket, label: 'Events', path: '/dashboard/events' },
    { icon: Wallet, label: 'Financials', path: '/dashboard/financials' },
    { icon: Image, label: 'Gallery', path: '/dashboard/gallery' }, // New
    { icon: Heart, label: 'Feedback', path: '/dashboard/feedback' }, // New
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FB] font-sans">
       {/* Sidebar Desktop */}
       <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col fixed h-full z-20">
          <div className="p-8">
             <Link to="/" className="text-2xl font-serif font-bold tracking-tighter text-black no-underline">FashionOS</Link>
             <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">Command Center</span>
          </div>
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 pb-4">
             {menuItems.map((item) => (
                <NavLink 
                  key={item.label} 
                  to={item.path} 
                  end={item.path === '/dashboard'}
                  className={({ isActive }) => 
                    `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-fashion-black text-white shadow-lg shadow-gray-200' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`
                  }
                >
                   <item.icon size={18} />{item.label}
                </NavLink>
             ))}
          </nav>
          <div className="p-6 border-t border-gray-50">
             <button onClick={handleSignOut} className="flex items-center gap-2 text-gray-400 hover:text-red-500 text-xs font-bold uppercase tracking-wider transition-colors w-full">
               <LogOut size={14} /> Sign Out
             </button>
          </div>
       </aside>

       {/* Mobile Sidebar Overlay */}
       {isMobileMenuOpen && (
         <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
       )}
       <aside className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 flex justify-between items-center">
            <span className="text-xl font-serif font-bold">FashionOS</span>
            <button onClick={() => setIsMobileMenuOpen(false)}><Menu size={20} /></button>
          </div>
          <nav className="px-4 space-y-1 overflow-y-auto h-[calc(100vh-100px)]">
            {menuItems.map((item) => (
                <NavLink 
                  key={item.label} 
                  to={item.path}
                  end={item.path === '/dashboard'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${isActive ? 'bg-fashion-black text-white' : 'text-gray-500'}`
                  }
                >
                   <item.icon size={18} />{item.label}
                </NavLink>
             ))}
          </nav>
       </aside>

       {/* Main Content Wrapper */}
       <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
          <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
             <div className="flex items-center gap-4 flex-1">
                <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}><Menu className="text-gray-500" /></button>
                <div className="relative w-full max-w-md hidden md:block">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                   <input type="text" placeholder="Search events, clients..." className="w-full bg-gray-50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-purple-100 transition-all" />
                </div>
             </div>
             <div className="flex items-center gap-4">
                <button className="relative p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-500"><Bell size={20} /></button>
                <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                   <div className="text-right hidden sm:block"><p className="text-sm font-bold leading-none">Orlando L.</p><p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Admin</p></div>
                   <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="User" /></div>
                </div>
             </div>
          </header>

          <main className="flex-1 p-6 md:p-8 overflow-y-auto overflow-x-hidden">
             <div className="max-w-7xl mx-auto">
                <Outlet />
             </div>
          </main>
       </div>
    </div>
  );
};
