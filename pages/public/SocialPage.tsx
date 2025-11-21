import React from 'react';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';

export const SocialPage: React.FC = () => (
  <div className="pt-24 pb-20 min-h-screen bg-white">
    <div className="container mx-auto px-6 text-center max-w-4xl">
       <FadeIn>
         <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full text-pink-600 mb-8"><Instagram size={24} /></div>
         <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Social Command Center</h1>
         <p className="text-xl text-gray-500 mb-12">Manage your brand presence across Instagram, TikTok, and LinkedIn from a single dashboard.</p>
         <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden h-80 flex items-center justify-center">
             <div className="relative z-10 text-center">
               <h3 className="text-2xl font-bold mb-4">Analytics Dashboard</h3>
               <Link to="/dashboard/social"><Button variant="white">Launch Command Center</Button></Link>
             </div>
             {/* Abstract decoration */}
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900 to-black opacity-50"></div>
         </div>
       </FadeIn>
    </div>
  </div>
);