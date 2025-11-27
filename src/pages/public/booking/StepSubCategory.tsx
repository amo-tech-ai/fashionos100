
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { WIZARD_DATA } from '../../../data/wizardData';
import { Button } from '../../../components/Button';
import { ArrowRight } from 'lucide-react';

export const StepSubCategory: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  const subCats = WIZARD_DATA.subCategories[state.category as keyof typeof WIZARD_DATA.subCategories] || [];

  const handleSelect = (sub: string) => {
    updateState({ subCategory: sub });
    navigate('/start-project/shot-list');
  };

  return (
    <FadeIn>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-serif font-bold mb-4">Specifics</h1>
        <p className="text-gray-500 text-lg mb-10">
          Help us assign the right specialist by refining the category.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subCats.map((sub) => {
            const isSelected = state.subCategory === sub;
            return (
              <button
                key={sub}
                onClick={() => handleSelect(sub)}
                className={`px-6 py-4 rounded-xl text-sm font-bold text-left border-2 transition-all ${
                  isSelected 
                    ? 'border-black bg-black text-white' 
                    : 'border-gray-100 bg-white text-gray-600 hover:border-purple-200 hover:text-purple-700'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>
        
        {subCats.length === 0 && (
            <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                No sub-categories needed for this selection.
                <div className="mt-4">
                    <Button onClick={() => navigate('/start-project/shot-list')}>Continue <ArrowRight size={16} className="ml-2"/></Button>
                </div>
            </div>
        )}
      </div>
    </FadeIn>
  );
};
