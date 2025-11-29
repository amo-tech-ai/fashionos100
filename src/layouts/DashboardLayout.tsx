
import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, Ticket, Wallet, Settings, LogOut, Menu, Search, 
  FileText, Image, MessageSquare, Heart, Target, Users, TrendingUp, Package, 
  Mic2, BarChart3, Globe, Camera, Truck, Plus, BookOpen, Activity, X
} from 'lucide-react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { NotificationsMenu } from '../components/dashboard/NotificationsMenu';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { usePermissions } from '../hooks/usePermissions';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut, user } = useAuth();
  const { role, isAdmin, isSponsor, canAccessStudio, canAccessEvents, canAccessFinance, canAccessSponsors } = usePermissions();

  // Define all possible menu items
  const allMenuItems = [
    // Core Dashboard
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['admin', 'designer', 'creative'] },
    
    // Studio Module
    { icon: BookOpen, label: 'Brand Profile', path: '/dashboard/brand-profile', roles: ['admin', 'designer'] },
    { icon: Camera, label: 'Studio Command', path: '/dashboard/studio', roles: ['admin', 'creative'] },
    { icon: Truck, label: 'Delivery Portal', path: '/dashboard/delivery', roles: ['admin', 'designer', 'creative'] },
    { icon: Calendar, label: 'Bookings', path: '/dashboard/bookings', roles: ['admin', 'designer'] },
    
    // Event Module
    { icon: Ticket, label: 'Events', path: '/dashboard/events', roles: ['admin', 'organizer'] },
    
    // Sponsor Module (Admin View)
    { icon: Target, label: 'Leads', path: '/dashboard/leads', roles: ['admin'] },
    { icon: Users, label: 'Sponsors', path: '/dashboard/sponsors', roles: ['admin'] }, 
    { icon: TrendingUp, label: 'Opportunities', path: '/dashboard/opportunities', roles: ['admin'] },
    { icon: Package, label: 'Packages', path: '/dashboard/packages', roles: ['admin'] },
    
    // Operations
    { icon: FileText, label: 'Contracts', path: '/dashboard/contracts', roles: ['admin', 'organizer'] },
    { icon: Mic2, label: 'Activations', path: '/dashboard/activations', roles: ['admin', 'organizer'] },
    { icon: Image, label: 'Media & Assets', path: '/dashboard/media', roles: ['admin', 'organizer', 'creative'] },
    
    // Finance & Analytics
    { icon: Wallet, label: 'Financials', path: '/dashboard/financials', roles: ['admin'] },
    { icon: FileText, label: 'Invoices', path: '/dashboard/invoices', roles: ['admin', 'designer'] },
    { icon: BarChart3, label: 'ROI & Reports', path: '/dashboard/roi', roles: ['admin', 'sponsor'] },
    
    // Sponsor Portal (Specific)
    { icon: Globe, label: 'Sponsor Portal', path: '/dashboard/portal', roles: ['sponsor', 'admin'] },
    
    // Communication
    { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages', roles: ['admin', 'designer', 'sponsor', 'creative'] },
    
    // Settings
    { icon: Settings, label: 'Settings', path: '/dashboard/settings', roles: ['all'] },
    { icon: Activity, label: 'System Health', path: '/dashboard/system', roles: ['admin'] },
  ];

  // Filter items based on role
  const menuItems = allMenuItems.filter(item => {
    if (item.roles.includes('all')) return true;
    if (isAdmin) return true; // Admins see everything
    return item.roles.includes(role);
  });

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  // Get Initials
  const initials = user?.email ? user.email.substring(0, 2).toUpperCase() : 'U';

  return (
    // h-[100dvh] locks the layout to the dynamic viewport height on mobile
    <div className="flex h-[100dvh] w-full bg-[#F8F9FB] font-sans overflow-hidden">
       
       {/* Desktop Sidebar */}
       <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col fixed h-full z-30 top-0 left-0 shadow-sm">
          <div className="p-8 flex-shrink-0">
             <Link to="/" className="text-2xl font-serif font-bold tracking-tighter text-black no-underline">FashionOS</Link>
             <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
                {isSponsor ? 'Partner Portal' : 'Command Center'}
             </span>
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
          <div className="p-6 border-t border-gray-50 flex-shrink-0">
             <button onClick={handleSignOut} className="flex items-center gap-2 text-gray-400 hover:text-red-500 text-xs font-bold uppercase tracking-wider transition-colors w-full">
               <LogOut size={14} /> Sign Out
             </button>
          </div>
       </aside>

       {/* Mobile Sidebar Overlay */}
       {isMobileMenuOpen && (
         <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
       )}
       
       {/* Mobile Sidebar Drawer */}
       <aside className={`fixed inset-y-0 left-0 w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 flex justify-between items-center border-b border-gray-50 bg-gray-50/50">
            <span className="text-xl font-serif font-bold">FashionOS</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={20} /></button>
          </div>
          <nav className="px-4 py-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
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
             <div className="pt-4 mt-4 border-t border-gray-100">
                <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50">
                  <LogOut size={18} /> Sign Out
                </button>
             </div>
          </nav>
       </aside>

       {/* Main Content Wrapper */}
       <div className="flex-1 lg:ml-64 flex flex-col min-w-0 h-full relative">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4 flex justify-between items-center flex-shrink-0 z-20 sticky top-0">
             <div className="flex items-center gap-4 flex-1">
                <button className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu size={24} />
                </button>
                <div className="relative w-full max-w-md hidden md:block">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                   <input type="text" placeholder="Search..." className="w-full bg-gray-50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-purple-100 transition-all" />
                </div>
                {!isSponsor && (
                    <Link to="/start-project" className="hidden md:block">
                    <Button variant="accent" size="sm" className="gap-2 rounded-full">
                        <Plus size={16} /> Add Booking
                    </Button>
                    </Link>
                )}
             </div>
             <div className="flex items-center gap-4">
                <NotificationsMenu />
                <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                   <div className="text-right hidden sm:block">
                       <p className="text-sm font-bold leading-none truncate max-w-[120px]">{user?.email || 'User'}</p>
                       <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{role}</p>
                   </div>
                   <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 overflow-hidden border-2 border-white shadow-sm">
                      {initials}
                   </div>
                </div>
             </div>
          </header>

          {/* Main Content Scroll Area */}
          <main className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden custom-scrollbar relative">
             <div className="max-w-[1600px] mx-auto pb-12">
                <Outlet />
             </div>
          </main>
       </div>
    </div>
  );
};
