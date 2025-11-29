
import React from 'react';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { WIZARD_DATA } from '../../../data/wizardData';
import { CategoryCard } from '../../../components/booking/ui/CategoryCard';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';

export const StepCategory: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  const handleSelect = (categoryId: string) => {
    updateState({ category: categoryId });
  };

  return (
    <FadeIn>
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-gray-900">Select your shoot type</h1>
            <p className="text-gray-500 text-lg font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Choose the category that best fits your product. This helps us assign the right photographers and studio equipment.
            </p>
        </div>

        {/* Popular Choices */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center lg:justify-start">
           <span className="text-xs font-bold uppercase tracking-widest text-gray-400 self-center mr-2">Popular:</span>
           {['Fashion Apparel', 'Beauty & Cosmetics', 'Jewelry'].map(tag => (
             <button 
                key={tag}
                className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-wider hover:border-black hover:text-black transition-all shadow-sm"
                onClick={() => {
                   const match = WIZARD_DATA.categories.find(c => c.label === tag);
                   if (match) handleSelect(match.id);
                }}
             >
                {tag}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mb-16">
          {WIZARD_DATA.categories.map((cat) => (
             <CategoryCard
                key={cat.id}
                id={cat.id}
                title={cat.label}
                description={cat.desc}
                icon={cat.icon}
                image={cat.image}
                isSelected={state.category === cat.id}
                isRecommended={false}
                onClick={() => handleSelect(cat.id)}
             />
          ))}
        </div>

        {/* Continue CTA */}
        <div className="flex justify-center pb-10">
           <Button 
             size="lg" 
             variant="primary" 
             disabled={!state.category}
             onClick={() => navigate('/start-project/style')}
             className="px-12 h-16 text-base shadow-xl shadow-purple-900/10"
           >
             Next Step <ArrowRight size={18} className="ml-2" />
           </Button>
        </div>
      </div>
    </FadeIn>
  );
};
