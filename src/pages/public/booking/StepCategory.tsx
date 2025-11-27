
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { CategoryCard } from '../../../components/booking/ui/CategoryCard';
import { WIZARD_DATA } from '../../../data/wizardData';

export const StepCategory: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  const handleSelect = (categoryId: string) => {
    updateState({ category: categoryId });
    navigate('/start-project/style');
  };

  return (
    <FadeIn>
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Choose a Category</h1>
        <p className="text-gray-500 text-lg mb-10">
          What type of product are we shooting today?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WIZARD_DATA.categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              title={cat.label}
              description={cat.desc}
              icon={cat.icon}
              isSelected={state.category === cat.id}
              onClick={() => handleSelect(cat.id)}
            />
          ))}
        </div>
      </div>
    </FadeIn>
  );
};
