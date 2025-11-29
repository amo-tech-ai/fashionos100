
import React from 'react';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { WIZARD_DATA } from '../../../data/wizardData';
import { CheckCircle2 } from 'lucide-react';

export const StepCategory: React.FC = () => {
  const { state, updateState } = useBooking();

  const handleSelect = (categoryId: string) => {
    // Just update state, let the Sidebar "Next" button handle navigation
    updateState({ category: categoryId });
  };

  return (
    <FadeIn>
      <div className="max-w-6xl">
        <div className="mb-10">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-gray-900">Choose a Category</h1>
            <p className="text-gray-500 text-lg font-light">What type of product are we shooting today?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WIZARD_DATA.categories.map((cat, index) => {
            const isSelected = state.category === cat.id;
            return (
                <button
                    key={cat.id}
                    onClick={() => handleSelect(cat.id)}
                    className={`group relative flex flex-col rounded-[1.5rem] overflow-hidden transition-all duration-500 w-full h-[280px] md:h-[320px] ${
                        isSelected
                        ? 'ring-4 ring-fashion-black ring-offset-2 shadow-2xl scale-[1.02]'
                        : 'hover:shadow-xl hover:-translate-y-1'
                    }`}
                    aria-checked={isSelected}
                    role="radio"
                >
                    {/* Background Image */}
                    <img 
                        src={cat.image} 
                        alt={cat.label} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        loading="lazy"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-500 ${isSelected ? 'opacity-90' : 'opacity-60 group-hover:opacity-80'}`} />
                    
                    {/* Icon (Top Left) */}
                    <div className="absolute top-5 left-5">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 ${isSelected ? 'bg-white text-black' : 'bg-white/10 text-white group-hover:bg-white/20'}`}>
                            <cat.icon size={20} />
                        </div>
                    </div>

                    {/* Selection Check (Top Right) */}
                    {isSelected && (
                        <div className="absolute top-5 right-5 text-white animate-in zoom-in duration-300">
                            <CheckCircle2 size={28} className="fill-green-500 text-white" />
                        </div>
                    )}
                    
                    {/* Content (Bottom Left) */}
                    <div className="absolute bottom-0 left-0 p-6 w-full text-left">
                        <div className="transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-1 leading-tight">{cat.label}</h3>
                            <p className="text-sm text-gray-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">{cat.desc}</p>
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
