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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Directory', path: '/directory' },
    { name: 'Marketplace', path: '/shop' }, // New Link
    { name: 'BTS', path: '/social' }, // Mapping BTS to social/content for now
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans text-fashion-black">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-gray-100' : 'bg-white/0 py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif font-bold tracking-tighter z-50 relative">FashionOS <span className="text-fashion-purple">.</span></Link>
          
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
              <Link to="/dashboard">
                <Button variant="primary" size="sm" className="px-6">Book a Shoot</Button>
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden z-50 relative" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col justify-center px-8 animate-in slide-in-from-right-10 duration-300">
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.path}
                  className={({ isActive }) => 
                    `text-3xl font-serif font-bold ${isActive ? 'text-fashion-purpleDark' : 'text-black'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-8 border-t border-gray-100 flex flex-col gap-4">
                <Link to="/dashboard" className="text-lg font-medium text-gray-500">Log In</Link>
                <Link to="/dashboard"><Button size="lg" className="w-full text-base">Book a Shoot</Button></Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};