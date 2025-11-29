
import React from 'react';
import { CheckCircle2, Share2, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../../Button';
import { WizardState } from './types';
import { VeoTrailerGenerator } from '../VeoTrailerGenerator';
import { FeaturedEvent } from '../../../data/mockEvents';

interface WizardSuccessProps {
  data: WizardState;
  onClose: () => void;
}

export const WizardSuccess: React.FC<WizardSuccessProps> = ({ data, onClose }) => {
  // Determine Brand Colors based on Category or default
  let brandColors = "Gold and Black";
  if (data.category === 'Runway') brandColors = "Black, White, and Silver";
  if (data.category === 'Party') brandColors = "Neon Purple, Pink, and Dark Blue";
  if (data.category === 'Workshop') brandColors = "Earthy Tones, Beige, and Green";
  if (data.category === 'Pop-up') brandColors = "Vibrant Red, Orange, and White";

  // Convert WizardState to FeaturedEvent shape for the Veo generator
  const featuredEvent: FeaturedEvent = {
    id: 999, // Temp ID
    title: data.title,
    desc: data.description || `Join us for ${data.title}, a premier ${data.category} event.`,
    image: data.image,
    date: data.startDate?.toLocaleDateString() || 'TBD',
    location: data.location,
    tags: [data.category, 'New'],
    price: 'Tickets Available'
  };

  return (
    <div className="max-w-4xl mx-auto text-center pb-20">
      <div className="mb-8 flex justify-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
          <CheckCircle2 size={48} />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gray-900">Event Published!</h1>
      <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">
        "{data.title}" is now live. You can manage tickets and details from your dashboard.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-16">
        <Button variant="outline" className="gap-2" onClick={onClose}>
          <Calendar size={16} /> View in Dashboard
        </Button>
        <Button variant="primary" className="gap-2">
          <Share2 size={16} /> Share Event Link
        </Button>
      </div>

      {/* Post-Publish Action: Veo Trailer */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl text-left">
        <div className="bg-black p-8 md:p-10 text-white border-b border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">AI Studio</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">New Feature</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold">Create a Cinematic Trailer</h2>
            </div>
            <div className="text-right hidden md:block">
                <p className="text-gray-400 text-sm max-w-xs">
                    Use Google's Veo 3.1 model to instantly generate a high-fashion teaser video for your social media.
                </p>
            </div>
          </div>
        </div>
        
        {/* Reusing the Veo Component */}
        <VeoTrailerGenerator featuredEvent={featuredEvent} brandColors={brandColors} />
      </div>
    </div>
  );
};
