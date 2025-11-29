
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
      <div className="max-w-5xl">
        <h1 className="text-4xl font-serif font-bold mb-4">Select Style</h1>
        <p className="text-gray-500 text-lg mb-10">
          Choose the visual direction for your shoot.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WIZARD_DATA.styles.map((style) => {
             const isSelected = state.style === style.id;
             return (
                <button 
                  key={style.id}
                  onClick={() => handleSelect(style.id)}
                  className={`group relative flex flex-col h-96 rounded-2xl overflow-hidden border-2 text-left transition-all duration-500 w-full ${
                    isSelected 
                      ? 'border-black ring-2 ring-black ring-offset-2 shadow-2xl scale-[1.02]' 
                      : 'border-gray-100 hover:border-purple-200 hover:shadow-xl'
                  }`}
                >
                  <img 
                    src={style.image} 
                    alt={style.label} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 ${isSelected ? 'opacity-95' : 'opacity-70 group-hover:opacity-80'}`} />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <div className="flex justify-between items-end mb-3">
                       <h3 className="text-3xl font-serif font-bold">{style.label}</h3>
                       {isSelected && (
                         <div className="bg-white text-black rounded-full p-1.5 shadow-lg animate-in zoom-in duration-300">
                           <CheckCircle2 size={20} />
                         </div>
                       )}
                    </div>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed font-medium">{style.desc}</p>
                    
                    <div className="flex items-center justify-between border-t border-white/20 pt-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Starting at</span>
                      <span className="font-bold text-xl">${style.price}<span className="text-xs font-normal text-gray-400">/shot</span></span>
                    </div>
                  </div>
                </button>
             );
          })}
        </div>
      </div>
    </FadeIn>
  );
};
