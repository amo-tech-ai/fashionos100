
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight } from 'lucide-react';
import { WIZARD_DATA } from '../../../data/wizardData';
import { SceneCard } from '../../../components/booking/ui/SceneCard';

export const StepScenes: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  const toggleScene = (id: string) => {
    const current = state.scenes;
    const updated = current.includes(id) 
      ? current.filter(s => s !== id)
      : [...current, id];
    
    // Soft limit to 3, hard limit handled by logic if needed, but UX allows selecting/deselecting
    updateState({ scenes: updated });
  };

  return (
    <FadeIn>
      <div className="max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 text-gray-900">Set the Scene</h1>
            <p className="text-gray-500 text-lg max-w-xl">
              Select the environments that best match your brand's aesthetic. You can mix studio backdrops with lifestyle settings.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Selected</span>
            <p className="text-2xl font-serif font-bold text-fashion-purple">{state.scenes.length} <span className="text-sm text-gray-300 font-sans font-medium">/ Unlimited</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {WIZARD_DATA.scenes.map((scene) => {
            const isSelected = state.scenes.includes(scene.id);
            return (
              <SceneCard
                key={scene.id}
                id={scene.id}
                label={scene.label}
                image={scene.image}
                badge={scene.badge}
                selected={isSelected}
                onClick={() => toggleScene(scene.id)}
                subtitle={isSelected ? "Selected for shoot" : "Click to select"}
              />
            );
          })}
        </div>

        <div className="flex justify-between items-center border-t border-gray-100 pt-8">
          <div className="text-sm text-gray-500">
            <strong className="text-black">{state.scenes.length}</strong> scenes added to quote
          </div>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/start-project/shot-type')}
            disabled={state.scenes.length === 0}
            className="shadow-lg shadow-purple-500/20"
          >
            Next: Shot Type <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};
