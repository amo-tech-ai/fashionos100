
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { WIZARD_DATA } from '../../../data/wizardData';
import { StyleCard } from '../../../components/booking/ui/StyleCard';
import { Button } from '../../../components/Button';
import { ArrowRight } from 'lucide-react';

export const StepStyle: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  // Try to match fuzzy recommendation
  // E.g. if AI suggested "Streetwear", we check if "street" style contains that key
  // For now, we rely on exact ID match from the initial AI set in StartProjectPage
  const recommendedStyleId = state.style;

  const handleSelect = (styleId: string) => {
    updateState({ style: styleId });
  };

  return (
    <FadeIn>
      <div className="max-w-[1400px] mx-auto px-4 md:px-0">
        <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900">Select Style</h1>
            <p className="text-gray-500 text-lg font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Choose the aesthetic direction for your content. This determines the lighting and art direction.
            </p>
        </div>
        
        {/* Popular Choices */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center lg:justify-start">
           <span className="text-xs font-bold uppercase tracking-widest text-gray-400 self-center mr-2">Trending:</span>
           {['Catalog', 'Editorial', 'On-Model'].map(tag => (
             <button 
                key={tag}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-wider hover:border-black hover:text-black transition-all shadow-sm"
                onClick={() => {
                   const match = WIZARD_DATA.styles.find(s => s.label.includes(tag));
                   if (match) handleSelect(match.id);
                }}
             >
                {tag}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {WIZARD_DATA.styles.map((style) => (
             <StyleCard
               key={style.id}
               id={style.id}
               title={style.label}
               price={style.price}
               imageUrl={style.image}
               isSelected={state.style === style.id}
               isRecommended={recommendedStyleId === style.id}
               onClick={() => handleSelect(style.id)}
             />
          ))}
        </div>

        {/* Secondary CTA */}
        <div className="flex justify-center pb-10">
           <Button 
             size="lg" 
             variant="outline" 
             disabled={!state.style}
             onClick={() => navigate('/start-project/size')}
             className="px-12 h-14 text-sm border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all shadow-sm"
           >
             Next Step <ArrowRight size={16} className="ml-2" />
           </Button>
        </div>
      </div>
    </FadeIn>
  );
};
