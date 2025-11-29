
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => (
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
            <li><Link to="/portfolio" className="hover:text-black transition-colors">Portfolio</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Services</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><Link to="/start-project" className="hover:text-black transition-colors font-medium text-fashion-purple">Book a Shoot</Link></li>
            <li><Link to="/services/photography" className="hover:text-black transition-colors">Photography</Link></li>
            <li><Link to="/services/video-production" className="hover:text-black transition-colors">Video Production</Link></li>
            <li><Link to="/services/web-design" className="hover:text-black transition-colors">Web Design</Link></li>
            <li><Link to="/services/ecommerce" className="hover:text-black transition-colors">Ecommerce</Link></li>
            <li><Link to="/services/social" className="hover:text-black transition-colors">Social Media</Link></li>
            <li><Link to="/services/instagram" className="hover:text-black transition-colors">Instagram</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">For Creators</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><Link to="/dashboard" className="hover:text-black transition-colors">Create Event</Link></li>
            <li><Link to="/dashboard" className="hover:text-black transition-colors">Dashboard</Link></li>
            <li><Link to="/dashboard" className="hover:text-black transition-colors">Join Directory</Link></li>
            <li><Link to="/contact" className="hover:text-black transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-200 mt-16 pt-8 text-center text-xs text-gray-400">
        <p>&copy; 2025 FashionOS. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
