
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { WIZARD_DATA } from '../../../data/wizardData';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/Button';

export const StepSize: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    updateState({ productSize: id });
  };

  return (
    <FadeIn>
      <div className="max-w-[1400px] mx-auto px-4 md:px-0">
        <div className="mb-12 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900">Product Dimensions</h1>
            <p className="text-gray-500 text-lg font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Size impacts handling and studio space requirements. Select the option that best fits your largest item.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {WIZARD_DATA.sizes.map((size) => {
            const isSelected = state.productSize === size.id;
            return (
              <button
                key={size.id}
                onClick={() => handleSelect(size.id)}
                className={`group relative flex flex-col p-8 rounded-2xl border transition-all duration-300 text-left h-full ${
                  isSelected 
                    ? 'border-black bg-black shadow-2xl transform scale-[1.02]' 
                    : 'border-gray-100 bg-white hover:border-purple-200 hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  isSelected ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600'
                }`}>
                  <size.icon size={28} strokeWidth={1.5} />
                </div>
                
                <div className="flex justify-between items-center mb-3">
                   <h3 className={`text-2xl font-serif font-bold transition-colors ${isSelected ? 'text-white' : 'text-gray-900'}`}>{size.label}</h3>
                   {isSelected && <CheckCircle2 size={24} className="text-white" />}
                </div>
                
                <p className={`text-sm leading-relaxed mb-6 flex-grow ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>{size.desc}</p>
                
                <div className="mt-auto">
                   {size.price > 0 ? (
                      <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-lg ${isSelected ? 'bg-white text-black' : 'bg-gray-100 text-gray-600'}`}>
                        +${size.price}/item
                      </span>
                   ) : (
                      <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-lg ${isSelected ? 'bg-green-500 text-white' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                        Included
                      </span>
                   )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center pb-10">
           <Button 
             size="lg" 
             variant="outline" 
             disabled={!state.productSize}
             onClick={() => navigate('/start-project/scenes')}
             className="px-12 h-14 text-sm border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all shadow-sm"
           >
             Next Step <ArrowRight size={16} className="ml-2" />
           </Button>
        </div>
      </div>
    </FadeIn>
  );
};
