
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight, Minus, Plus } from 'lucide-react';

const MODELS = [
  { id: 'hand', name: 'Hand Model', price: 250, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400' },
  { id: 'full', name: 'Full Body', price: 450, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400' },
  { id: 'pair', name: 'Couple/Pair', price: 800, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400' },
];

export const StepModels: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();

  const updateModelCount = (id: string, delta: number) => {
    const current = state.models.find(m => m.type === id) || { type: id, count: 0 };
    const newCount = Math.max(0, current.count + delta);
    
    const others = state.models.filter(m => m.type !== id);
    if (newCount > 0) {
      updateState({ models: [...others, { type: id, count: newCount }] });
    } else {
      updateState({ models: others });
    }
  };

  const getCount = (id: string) => state.models.find(m => m.type === id)?.count || 0;

  return (
    <FadeIn>
      <div className="max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-4">Add Talent</h1>
        <p className="text-gray-500 text-lg mb-10">Select models for your shoot. Prices include usage rights.</p>

        <div className="grid gap-6 mb-10">
          {MODELS.map((model) => {
            const count = getCount(model.id);
            return (
              <div key={model.id} className={`flex items-center p-4 rounded-2xl border-2 transition-all ${count > 0 ? 'border-black bg-gray-50' : 'border-gray-100 bg-white'}`}>
                <div className="w-20 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-200">
                  <img src={model.image} className="w-full h-full object-cover" alt={model.name} />
                </div>
                <div className="flex-1 px-6">
                  <h3 className="font-serif font-bold text-xl">{model.name}</h3>
                  <p className="text-gray-500 text-sm">${model.price} / day</p>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => updateModelCount(model.id, -1)}
                    className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30`}
                    disabled={count === 0}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-bold w-6 text-center">{count}</span>
                  <button 
                    onClick={() => updateModelCount(model.id, 1)}
                    className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end">
          <Button variant="primary" size="lg" onClick={() => navigate('/start-project/checkout')}>
            Next: Review <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};
