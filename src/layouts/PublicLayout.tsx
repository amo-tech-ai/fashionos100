
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';

export const PublicLayout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Directory', path: '/directory' },
    { name: 'Events', path: '/events' },
    { name: 'Marketplace', path: '/shop' },
    { name: 'Social Media', path: '/services/social' },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans text-fashion-black bg-[#FBF8F5]">
      {/* Navbar */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 
        ${isScrolled || isOpen 
          ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-gray-100' 
          : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif font-bold tracking-tighter z-50 relative">
            FashionOS <span className="text-fashion-purple">.</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path}
                className={({ isActive }) => 
                  `text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${isActive ? 'text-fashion-purpleDark' : 'text-fashion-black hover:text-gray-500'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="flex items-center gap-4 ml-6 border-l border-gray-200 pl-6">
              <Link to="/dashboard" className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-black">Log In</Link>
              <Link to="/start-project">
                <Button variant="primary" size="sm" className="px-6">Book a Shoot</Button>
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 relative p-2 -mr-2 text-black" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle Menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay & Panel */}
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-500 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white z-40 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) md:hidden flex flex-col pt-24 px-8 pb-8 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
         <div className="flex flex-col space-y-6 h-full overflow-y-auto">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  `text-2xl font-serif font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-fashion-purpleDark' : 'text-black hover:text-gray-600'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-8 border-t border-gray-100 flex flex-col gap-4 mt-auto">
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-500 hover:text-black transition-colors">Log In</Link>
              <Link to="/start-project" onClick={() => setIsOpen(false)}><Button size="lg" className="w-full text-base">Book a Shoot</Button></Link>
            </div>
         </div>
      </div>

      <main className="flex-grow w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
