
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight, Plus, Link as LinkIcon, Trash2 } from 'lucide-react';
import { Input } from '../../../components/forms/Input';

export const StepReferences: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();
  const [urlInput, setUrlInput] = useState('');

  const addUrl = () => {
    if (urlInput && !state.references.includes(urlInput)) {
      updateState({ references: [...state.references, urlInput] });
      setUrlInput('');
    }
  };

  const removeUrl = (url: string) => {
    updateState({ references: state.references.filter(r => r !== url) });
  };

  return (
    <FadeIn>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-serif font-bold mb-4">Moodboard</h1>
        <p className="text-gray-500 text-lg mb-10">
          Share links to inspiration, brand guidelines, or competitors.
        </p>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input 
                placeholder="https://pinterest.com/board..." 
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addUrl()}
              />
            </div>
            <Button onClick={addUrl} disabled={!urlInput} className="mt-1.5 h-[50px] w-[50px] p-0 flex items-center justify-center">
              <Plus size={24} />
            </Button>
          </div>

          <div className="space-y-3">
            {state.references.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
                <LinkIcon className="mx-auto text-gray-300 mb-2" size={24} />
                <p className="text-gray-400 text-sm">No references added yet.</p>
              </div>
            )}
            {state.references.map((ref, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
                    <LinkIcon size={14} className="text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate">{ref}</span>
                </div>
                <button onClick={() => removeUrl(ref)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="primary" size="lg" onClick={() => navigate('/start-project/brief')}>
            Next: Creative Brief <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};
