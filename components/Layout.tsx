import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Button } from './Button';

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
    { name: 'Events', path: '/events' },
    { name: 'Social', path: '/social' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-white/0 py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif font-bold tracking-tighter">FashionOS</Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path}
                className={({ isActive }) => 
                  `text-xs font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-fashion-purpleDark' : 'text-fashion-black hover:text-gray-500'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="flex items-center gap-4 ml-4 border-l border-gray-200 pl-4">
              <Link to="/dashboard" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black">Log In</Link>
              <Link to="/dashboard">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </div>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b p-6 md:hidden flex flex-col space-y-4 animate-in slide-in-from-top-5 shadow-xl">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path}
                className={({ isActive }) => 
                  `text-lg font-medium text-left ${isActive ? 'text-fashion-purpleDark' : 'text-black'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <Link to="/dashboard" className="text-center font-bold">Log In</Link>
              <Link to="/dashboard"><Button className="w-full">Get Started</Button></Link>
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

const Footer: React.FC = () => (
  <footer className="bg-gray-50 py-16 border-t border-gray-200">
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <Link to="/" className="text-2xl font-serif font-bold tracking-tighter mb-6 block">FashionOS</Link>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
            Connecting the fashion industry through AI-powered creativity and storytelling.
          </p>
          <div className="flex space-x-4 text-gray-400">
             <Instagram size={18} className="hover:text-black transition-colors cursor-pointer" />
             <Twitter size={18} className="hover:text-black transition-colors cursor-pointer" />
             <Facebook size={18} className="hover:text-black transition-colors cursor-pointer" />
             <Linkedin size={18} className="hover:text-black transition-colors cursor-pointer" />
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Explore</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-black transition-colors">Services</Link></li>
            <li><Link to="/directory" className="hover:text-black transition-colors">Directory</Link></li>
            <li><Link to="/events" className="hover:text-black transition-colors">Events</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Services</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><a href="#" className="hover:text-black transition-colors">Photography</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Video Production</a></li>
            <li><Link to="/social" className="hover:text-black transition-colors">Social Media</Link></li>
            <li><a href="#" className="hover:text-black transition-colors">Web Design</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">For Creators</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><Link to="/dashboard" className="hover:text-black transition-colors">Create Event</Link></li>
            <li><Link to="/dashboard" className="hover:text-black transition-colors">Dashboard</Link></li>
            <li><Link to="/dashboard/financials" className="hover:text-black transition-colors">Financials</Link></li>
            <li><Link to="/dashboard" className="hover:text-black transition-colors">Join Directory</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-200 mt-16 pt-8 text-center text-xs text-gray-400">
        <p>&copy; 2025 FashionOS. All rights reserved.</p>
      </div>
    </div>
  </footer>
);