
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { RetouchingType } from '../../../lib/pricing';

const OPTIONS: { id: RetouchingType; title: string; desc: string; features: string[] }[] = [
  {
    id: 'basic',
    title: 'Standard',
    desc: 'Perfect for e-commerce listings.',
    features: ['Color Correction', 'Exposure Balancing', 'Basic Cleanup', 'Web Resolution']
  },
  {
    id: 'high-end',
    title: 'High-End',
    desc: 'Editorial quality for campaigns.',
    features: ['Skin Retouching', 'Garment Reshaping', 'Background Extension', 'Print Resolution', 'Advanced Color Grading']
  }
];

export const StepRetouching: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  const handleSelect = (retouching: RetouchingType) => {
    updateState({ retouching });
    navigate('/start-project/review');
  };

  return (
    <FadeIn>
      <div className="max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-4">Retouching Level</h1>
        <p className="text-gray-500 text-lg mb-10">
          Choose the level of post-production required.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {OPTIONS.map((opt) => {
            const isSelected = state.retouching === opt.id;
            return (
              <div 
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  isSelected 
                    ? 'border-purple-600 bg-purple-50 shadow-xl' 
                    : 'border-gray-100 bg-white hover:border-purple-200'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-wider">
                    Selected
                  </div>
                )}
                
                <h3 className="text-2xl font-serif font-bold mb-2">{opt.title}</h3>
                <p className="text-gray-500 mb-6">{opt.desc}</p>
                
                <ul className="space-y-3">
                  {opt.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-purple-200 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className={isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}>{feat}</span>
                    </li>
                  ))}
                </ul>

                {opt.id === 'high-end' && (
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-wider">
                    <Sparkles size={14} /> Recommended for Campaigns
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
};
