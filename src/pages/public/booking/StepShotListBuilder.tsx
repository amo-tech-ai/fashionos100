
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight, Plus, Trash2, FileText } from 'lucide-react';
import { Input } from '../../../components/forms/Input';
import { ShotListItem } from '../../../lib/pricing';

export const StepShotListBuilder: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState({ name: '', instructions: '' });

  const addItem = () => {
    if (newItem.name) {
      const item: ShotListItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: newItem.name,
        instructions: newItem.instructions
      };
      updateState({ shotList: [...state.shotList, item] });
      setNewItem({ name: '', instructions: '' });
    }
  };

  const removeItem = (id: string) => {
    updateState({ shotList: state.shotList.filter(i => i.id !== id) });
  };

  return (
    <FadeIn>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-serif font-bold mb-4">Build Shot List</h1>
        <p className="text-gray-500 text-lg mb-10">
          Itemize your products or looks to ensure we don't miss anything.
        </p>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
            <div className="grid gap-4 mb-6">
                <Input 
                    placeholder="Item Name (e.g. Red Silk Dress)" 
                    value={newItem.name}
                    onChange={e => setNewItem({...newItem, name: e.target.value})}
                />
                <div className="flex gap-2">
                    <Input 
                        placeholder="Specific Instructions (e.g. Focus on embroidery)" 
                        value={newItem.instructions}
                        onChange={e => setNewItem({...newItem, instructions: e.target.value})}
                        className="flex-1"
                        onKeyDown={e => e.key === 'Enter' && addItem()}
                    />
                    <Button onClick={addItem} disabled={!newItem.name} className="mt-1.5">
                        <Plus size={20} />
                    </Button>
                </div>
            </div>

            <div className="space-y-3">
                {state.shotList.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                        <FileText className="mx-auto text-gray-300 mb-2" size={24} />
                        <p className="text-gray-400 text-sm">No items added. You can skip this if you prefer to upload a CSV later.</p>
                    </div>
                )}
                {state.shotList.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 group">
                        <div>
                            <p className="font-bold text-sm text-gray-900">{item.name}</p>
                            {item.instructions && <p className="text-xs text-gray-500">{item.instructions}</p>}
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>

        <div className="flex justify-between items-center">
            <Button variant="ghost" className="text-gray-400">Upload CSV Instead</Button>
            <Button variant="primary" size="lg" onClick={() => navigate('/start-project/retouching')}>
                Next: Retouching <ArrowRight size={18} className="ml-2" />
            </Button>
        </div>
      </div>
    </FadeIn>
  );
};
