
import React from 'react';
import { CheckCircle2, Share2, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../../Button';
import { WizardState, transformToEventCard } from './types';
import { VeoTrailerGenerator } from '../VeoTrailerGenerator';
import { FeaturedEvent } from '../../../data/mockEvents';

interface WizardSuccessProps {
  data: WizardState;
  onClose: () => void;
}

export const WizardSuccess: React.FC<WizardSuccessProps> = ({ data, onClose }) => {
  // Convert WizardState to FeaturedEvent shape for the Veo generator
  const featuredEvent: FeaturedEvent = {
    id: 999, // Temp ID
    title: data.title,
    desc: data.description,
    image: data.image,
    date: data.startDate?.toLocaleDateString() || 'TBD',
    location: data.location,
    tags: [data.category, 'New'],
    price: 'Tickets Available'
  };

  return (
    <div className="max-w-3xl mx-auto text-center pb-20">
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
        <div className="bg-black p-8 md:p-12 text-white">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">New Feature</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">AI Studio</span>
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">Create a Cinematic Trailer</h2>
          <p className="text-gray-400 max-w-xl mb-8">
            Use Google's Veo 3.1 model to instantly generate a high-fashion teaser video for your social media.
          </p>
        </div>
        
        {/* Reusing the Veo Component */}
        <VeoTrailerGenerator featuredEvent={featuredEvent} />
      </div>
    </div>
  );
};
