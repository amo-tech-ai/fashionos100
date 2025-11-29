
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { WIZARD_DATA } from '../../../data/wizardData';
import { SceneCard } from '../../../components/booking/ui/SceneCard';

export const StepShotType: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    updateState({ shotType: id });
    navigate('/start-project/sub-category');
  };

  return (
    <FadeIn>
      <div className="max-w-6xl">
        <div className="mb-12">
           <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-gray-900">Shot Type</h1>
           <p className="text-gray-500 text-lg font-light max-w-2xl">
             Select the primary visual approach for your imagery. We recommend combining Packshots with Lifestyle or Creative shots for a complete campaign.
           </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {WIZARD_DATA.shotTypes.map((type) => {
            const isSelected = state.shotType === type.id;
            // Cast to access the image property safely
            const image = (type as any).image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800';
            
            return (
              <SceneCard
                key={type.id}
                id={type.id}
                label={type.label}
                image={image}
                subtitle={type.desc}
                selected={isSelected}
                onClick={() => handleSelect(type.id)}
              />
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
};
