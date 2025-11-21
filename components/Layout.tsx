import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Button } from './Button';
import { ViewState } from '../types';

interface LayoutProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export const Navbar: React.FC<LayoutProps> = ({ currentView, onViewChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; view: ViewState }[] = [
    { name: 'Home', view: 'home' },
    { name: 'Services', view: 'services' },
    { name: 'Social', view: 'social' },
    { name: 'Directory', view: 'directory' },
    { name: 'Events', view: 'events' },
  ];

  if (currentView === 'dashboard') return null;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-white/0 py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <button onClick={() => onViewChange('home')} className="text-2xl font-serif font-bold tracking-tighter">FashionOS</button>
        
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => {
                onViewChange(link.view);
                window.scrollTo(0,0);
              }}
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${currentView === link.view ? 'text-fashion-purpleDark' : 'text-fashion-black hover:text-gray-500'}`}
            >
              {link.name}
            </button>
          ))}
          <Button variant="primary" size="sm" onClick={() => onViewChange('dashboard')}>Dashboard</Button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b p-6 md:hidden flex flex-col space-y-4 animate-in slide-in-from-top-5 shadow-xl">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => {
                onViewChange(link.view);
                setIsOpen(false);
              }} 
              className="text-lg font-medium text-left"
            >
              {link.name}
            </button>
          ))}
          <Button className="w-full" onClick={() => { onViewChange('dashboard'); setIsOpen(false); }}>Dashboard</Button>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC<LayoutProps> = ({ onViewChange }) => (
  <footer className="bg-gray-50 py-16 border-t border-gray-200">
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <button onClick={() => onViewChange('home')} className="text-2xl font-serif font-bold tracking-tighter mb-6 block">FashionOS</button>
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
            <li><button onClick={() => onViewChange('home')} className="hover:text-black transition-colors">Home</button></li>
            <li><button onClick={() => onViewChange('services')} className="hover:text-black transition-colors">Services</button></li>
            <li><button onClick={() => onViewChange('directory')} className="hover:text-black transition-colors">Directory</button></li>
            <li><button onClick={() => onViewChange('events')} className="hover:text-black transition-colors">Events</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Services</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><a href="#" className="hover:text-black transition-colors">Photography</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Video Production</a></li>
            <li><button onClick={() => onViewChange('social')} className="hover:text-black transition-colors">Social Media</button></li>
            <li><a href="#" className="hover:text-black transition-colors">Web Design</a></li>
            <li><a href="#" className="hover:text-black transition-colors">WhatsApp Marketing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">For Creators</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><a href="#" className="hover:text-black transition-colors">Create Event</a></li>
            <li><button onClick={() => onViewChange('dashboard')} className="hover:text-black transition-colors">Dashboard</button></li>
            <li><a href="#" className="hover:text-black transition-colors">Financials</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Join Directory</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-200 mt-16 pt-8 text-center text-xs text-gray-400">
        <p>&copy; 2025 FashionOS. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
