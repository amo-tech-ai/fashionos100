
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight, Minus, Plus } from 'lucide-react';

export const StepShotList: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  const updateCount = (delta: number) => {
    updateState({ shotCount: Math.max(1, state.shotCount + delta) });
  };

  return (
    <FadeIn>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-serif font-bold mb-4">Shot Count</h1>
        <p className="text-gray-500 text-lg mb-12">
          How many final images do you need?
        </p>

        <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center mb-8">
          <div className="flex items-center justify-center gap-8 mb-8">
            <button 
              onClick={() => updateCount(-1)}
              className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all text-gray-400 hover:text-black"
            >
              <Minus size={32} />
            </button>
            <div className="text-center w-40">
              <div className="text-8xl font-bold text-black font-sans leading-none">
                {state.shotCount}
              </div>
              <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mt-4">
                Photos
              </div>
            </div>
            <button 
              onClick={() => updateCount(1)}
              className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 active:scale-95 transition-all shadow-xl"
            >
              <Plus size={32} />
            </button>
          </div>

          <input 
            type="range" 
            min="1" 
            max="100" 
            value={state.shotCount}
            onChange={(e) => updateState({ shotCount: parseInt(e.target.value) })}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black hover:accent-purple-600 transition-all max-w-lg mx-auto block"
          />
          
          <div className="mt-6 inline-block bg-purple-50 text-purple-700 px-4 py-1 rounded-full text-xs font-bold">
             Current Package: {state.shotCount > 20 ? 'Enterprise' : (state.shotCount > 10 ? 'Professional' : 'Starter')}
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="primary" size="lg" onClick={() => navigate('/start-project/references')}>
            Next: References <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};
