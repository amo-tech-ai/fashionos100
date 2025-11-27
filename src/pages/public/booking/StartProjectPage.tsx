
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Video, Layers } from 'lucide-react';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { ServiceType } from '../../../lib/pricing';

const SERVICES: { id: ServiceType; title: string; desc: string; icon: any }[] = [
  { 
    id: 'photography', 
    title: 'Photography', 
    desc: 'High-end still life and on-model photography for e-commerce and campaigns.',
    icon: Camera
  },
  { 
    id: 'video', 
    title: 'Video Production', 
    desc: 'Cinematic 4K video content, social reels, and brand storytelling.',
    icon: Video
  },
  { 
    id: 'hybrid', 
    title: 'Photo + Video', 
    desc: 'Complete package. Get both assets shot simultaneously for maximum consistency.',
    icon: Layers
  }
];

export const StartProjectPage: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  const handleSelect = (service: ServiceType) => {
    updateState({ service });
    navigate('/start-project/quantity');
  };

  return (
    <FadeIn>
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Select a Service</h1>
        <p className="text-gray-500 text-lg mb-10">
          Start by choosing the type of content you need. We'll customize the details in the next steps.
        </p>

        <div className="grid gap-6">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelect(s.id)}
              className={`group flex items-start gap-6 p-8 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-xl ${
                state.service === s.id 
                  ? 'border-black bg-gray-50' 
                  : 'border-gray-100 bg-white hover:border-purple-200'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                state.service === s.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-purple-50 group-hover:text-purple-600'
              }`}>
                <s.icon size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-purple-700 transition-colors">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </FadeIn>
  );
};
