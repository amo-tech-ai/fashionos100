
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight } from 'lucide-react';

export const StepQuantity: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  const unitName = state.service === 'video' ? 'Videos' : 'Looks';

  return (
    <FadeIn>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-serif font-bold mb-4">Define Scope</h1>
        <p className="text-gray-500 text-lg mb-12">
          How many {unitName.toLowerCase()} do you need? Volume discounts apply for larger shoots.
        </p>

        <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center mb-8">
          <div className="text-8xl font-bold text-black mb-4 font-sans">
            {state.shotCount}
          </div>
          <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-10">
            {unitName} Selected
          </div>

          <input 
            type="range" 
            min="1" 
            max="50" 
            value={state.shotCount}
            onChange={(e) => updateState({ shotCount: parseInt(e.target.value) })}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black hover:accent-purple-600 transition-all"
          />
          
          <div className="flex justify-between text-xs font-bold text-gray-400 mt-4">
            <span>1 {unitName}</span>
            <span>25 {unitName}</span>
            <span>50+ {unitName}</span>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="primary" size="lg" onClick={() => navigate('/start-project/scenes')}>
            Next: Scenes <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};
