
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { WIZARD_DATA } from '../../../data/wizardData';
import { CheckCircle2 } from 'lucide-react';

export const StepSize: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    updateState({ productSize: id });
    navigate('/start-project/scenes');
  };

  return (
    <FadeIn>
      <div className="max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-4">Product Size</h1>
        <p className="text-gray-500 text-lg mb-10">
          Size impacts handling and studio space requirements.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WIZARD_DATA.sizes.map((size) => {
            const isSelected = state.productSize === size.id;
            return (
              <button
                key={size.id}
                onClick={() => handleSelect(size.id)}
                className={`group flex items-center gap-6 p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                  isSelected 
                    ? 'border-black bg-gray-50' 
                    : 'border-gray-100 bg-white hover:border-purple-200'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'bg-black text-white' : 'bg-gray-50 text-gray-500 group-hover:bg-purple-50 group-hover:text-purple-600'
                }`}>
                  <size.icon size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-serif font-bold mb-1 group-hover:text-purple-700 transition-colors">{size.label}</h3>
                    {isSelected && <CheckCircle2 size={20} className="text-black" />}
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{size.desc}</p>
                  {size.price > 0 && <span className="text-xs font-bold text-gray-400">+${size.price}/item</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
};
