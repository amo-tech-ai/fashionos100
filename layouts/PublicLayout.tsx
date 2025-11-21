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