
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { WIZARD_DATA } from '../../../data/wizardData';
import { CheckCircle2 } from 'lucide-react';

export const StepStyle: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  const handleSelect = (styleId: string) => {
    updateState({ style: styleId });
    navigate('/start-project/size');
  };

  return (
    <FadeIn>
      <div className="max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-4">Select Style</h1>
        <p className="text-gray-500 text-lg mb-10">
          Choose the visual direction for your shoot.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WIZARD_DATA.styles.map((style) => {
             const isSelected = state.style === style.id;
             return (
                <div 
                  key={style.id}
                  onClick={() => handleSelect(style.id)}
                  className={`group p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative ${
                    isSelected 
                      ? 'border-black bg-gray-50 shadow-md' 
                      : 'border-gray-100 bg-white hover:border-purple-200 hover:shadow-lg'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                     <h3 className="text-2xl font-serif font-bold group-hover:text-purple-700 transition-colors">{style.label}</h3>
                     {isSelected && <CheckCircle2 className="text-black" size={24} />}
                  </div>
                  <p className="text-gray-500 mb-6 text-sm leading-relaxed">{style.desc}</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Starting at ${style.price}/shot</p>
                </div>
             );
          })}
        </div>
      </div>
    </FadeIn>
  );
};
