
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
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center lg:text-left max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Step 1 / Production Scope</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gray-900">
                Select your shoot type
            </h1>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              What type of product are we shooting today? This helps us assign the right creative team and studio equipment.
            </p>
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center lg:justify-start items-center">
           <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mr-2">Trending:</span>
           {['Fashion Apparel', 'Beauty & Cosmetics', 'Jewelry'].map(tag => (
             <button 
                key={tag}
                className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-medium hover:border-purple-300 hover:text-purple-600 transition-all"
                onClick={() => {
                   const match = WIZARD_DATA.categories.find(c => c.label === tag);
                   if (match) handleSelect(match.id);
                }}
             >
                {tag}
             </button>
           ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {WIZARD_DATA.categories.map((cat) => (
             <div key={cat.id} className="h-full">
               <CategoryCard
                  id={cat.id}
                  title={cat.label}
                  description={cat.desc}
                  icon={cat.icon}
                  image={cat.image}
                  isSelected={state.category === cat.id}
                  isRecommended={false}
                  onClick={() => handleSelect(cat.id)}
               />
             </div>
          ))}
        </div>

        {/* Continue CTA */}
        <div className="flex justify-center lg:justify-start pb-10 border-t border-gray-200 pt-8">
           <Button 
             size="lg" 
             variant="primary" 
             disabled={!state.category}
             onClick={() => navigate('/start-project/style')}
             className="px-12 h-14 text-sm shadow-xl shadow-purple-900/10"
           >
             Next Step <ArrowRight size={16} className="ml-2" />
           </Button>
        </div>
      </div>
    </FadeIn>
  );
};
