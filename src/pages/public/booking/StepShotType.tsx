
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { WIZARD_DATA } from '../../../data/wizardData';
import { CheckCircle2 } from 'lucide-react';

export const StepShotType: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    updateState({ shotType: id });
    navigate('/start-project/sub-category');
  };

  return (
    <FadeIn>
      <div className="max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-4">Shot Type</h1>
        <p className="text-gray-500 text-lg mb-10">
          What is the primary focus of these images?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WIZARD_DATA.shotTypes.map((type) => {
            const isSelected = state.shotType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => handleSelect(type.id)}
                className={`group p-6 rounded-2xl border-2 text-left transition-all duration-300 h-full flex flex-col ${
                  isSelected 
                    ? 'border-black bg-gray-50 ring-1 ring-black/5' 
                    : 'border-gray-100 bg-white hover:border-purple-200 hover:shadow-xl'
                }`}
              >
                <div className="flex justify-between items-start w-full mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-black text-white' : 'bg-gray-50 text-gray-500 group-hover:bg-purple-50 group-hover:text-purple-600'
                    }`}>
                      <type.icon size={24} />
                    </div>
                    {isSelected && <CheckCircle2 size={20} className="text-black" />}
                </div>
                
                <h3 className="text-lg font-serif font-bold mb-2 group-hover:text-purple-700 transition-colors">{type.label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{type.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
};
