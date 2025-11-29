
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
      <div className="max-w-5xl">
        <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">What product category are you shooting?</h1>
            <p className="text-gray-500">Choose one category to start. You can add more later.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WIZARD_DATA.categories.map((cat) => {
            const isSelected = state.category === cat.id;
            return (
                <button
                    key={cat.id}
                    onClick={() => handleSelect(cat.id)}
                    className={`group relative flex flex-col rounded-2xl overflow-hidden border-2 text-left transition-all duration-300 w-full aspect-[4/3] ${
                        isSelected
                        ? 'border-black ring-2 ring-black ring-offset-2 shadow-xl'
                        : 'border-gray-100 hover:border-purple-200 hover:shadow-lg'
                    }`}
                    aria-checked={isSelected}
                    role="radio"
                >
                    <img 
                        src={cat.image} 
                        alt={cat.label} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                    
                    <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-2xl font-serif font-bold mb-1">{cat.label}</h3>
                                <p className="text-xs text-gray-300 font-medium opacity-90">{cat.desc}</p>
                            </div>
                            {isSelected && (
                                <div className="bg-white text-black rounded-full p-1 shadow-sm animate-in zoom-in duration-200">
                                    <CheckCircle2 size={20} />
                                </div>
                            )}
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
