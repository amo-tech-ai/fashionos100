
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { WIZARD_DATA } from '../../../data/wizardData';

export const StepScenes: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  const toggleScene = (id: string) => {
    const current = state.scenes;
    const updated = current.includes(id) 
      ? current.filter(s => s !== id)
      : [...current, id];
    // Limit selection to 2
    if (updated.length <= 2) {
        updateState({ scenes: updated });
    }
  };

  return (
    <FadeIn>
      <div className="max-w-5xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">Choose Scenes</h1>
            <p className="text-gray-500">Select up to 2 environments (Backgrounds) for your shoot.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {WIZARD_DATA.scenes.map((scene) => {
            const isSelected = state.scenes.includes(scene.id);
            return (
              <div 
                key={scene.id}
                onClick={() => toggleScene(scene.id)}
                className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isSelected ? 'ring-4 ring-black ring-offset-2' : 'hover:shadow-xl'
                }`}
              >
                <img src={scene.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={scene.label} />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'}`} />
                
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-bold text-lg">{scene.label}</p>
                  {scene.badge && <span className="text-[10px] font-bold bg-white/20 backdrop-blur px-2 py-0.5 rounded uppercase">{scene.badge}</span>}
                </div>

                {isSelected && (
                  <div className="absolute top-4 right-4 bg-white text-black p-1.5 rounded-full shadow-lg">
                    <CheckCircle2 size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end">
          <Button variant="primary" size="lg" onClick={() => navigate('/start-project/shot-type')}>
            Next: Shot Type <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};
