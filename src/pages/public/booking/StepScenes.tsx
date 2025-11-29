
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
    
    updateState({ scenes: updated });
  };

  return (
    <FadeIn>
      <div className="max-w-[1400px] mx-auto px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gray-900">Set the scene</h1>
            <p className="text-gray-500 text-lg font-light max-w-xl leading-relaxed">
              Select environments that match your brand aesthetic. Mix studio backdrops with lifestyle settings.
            </p>
          </div>
          <div className="hidden md:block bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Selection</span>
            <p className="text-2xl font-serif font-bold text-purple-600">{state.scenes.length} <span className="text-sm text-gray-400 font-sans font-medium">Scenes</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
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
                subtitle={isSelected ? "Included in package" : "Click to add to shoot"}
              />
            );
          })}
        </div>

        <div className="flex justify-center pb-10">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate('/start-project/shot-type')}
            disabled={state.scenes.length === 0}
            className="px-12 h-14 text-sm border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all shadow-sm"
          >
            Next Step <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};
