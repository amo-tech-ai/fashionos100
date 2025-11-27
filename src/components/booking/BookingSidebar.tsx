
import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { ShoppingBag, Info, HelpCircle, ChevronDown, Save, Camera, User, Sparkles, Eye } from 'lucide-react';
import { WIZARD_DATA } from '../../data/wizardData';
import { Button } from '../Button';
import { AIEstimator } from './AIEstimator';

export const BookingSidebar: React.FC = () => {
  const { state, totals, updateState } = useBooking();
  const [showEstimator, setShowEstimator] = useState(false);

  // Helper to get Scene labels
  const selectedScenes = state.scenes.map(id => {
    const scene = WIZARD_DATA.scenes.find(s => s.id === id);
    return scene ? scene.label : id;
  });

  // Helper to get Model details
  const selectedModels = state.models.map(m => {
    const details = WIZARD_DATA.models.find(d => d.id === m.type);
    return { ...m, details };
  }).filter(m => m.count > 0);

  // Estimate Time: 20 mins per shot + 1h setup base
  const estimatedHours = Math.ceil((state.shotCount * 20) / 60) + 1;

  const removeModel = (type: string) => {
    updateState({ models: state.models.filter(m => m.type !== type) });
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden sticky top-24">
        
        {/* 1. Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div className="inline-block bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 mb-2 rounded-sm">
              Shoot Summary
            </div>
            <button 
              onClick={() => setShowEstimator(true)}
              className="text-[10px] font-bold uppercase tracking-wider text-purple-600 flex items-center gap-1 hover:text-purple-800 transition-colors"
            >
              <Sparkles size={12} /> AI Breakdown
            </button>
          </div>
          <h3 className="text-gray-500 text-xs leading-relaxed">
            Live project estimate — updates as you select photography options
          </h3>
        </div>
        
        <div className="p-6 space-y-6">
          
          {/* 2. Scenes Preview */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Scenes</span>
              <HelpCircle size={12} className="text-gray-300" />
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedScenes.length > 0 ? (
                selectedScenes.slice(0, 2).map((scene, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
                    {scene}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400 italic">None selected</span>
              )}
              {selectedScenes.length > 2 && (
                <span className="px-3 py-1.5 bg-gray-50 text-gray-400 text-xs font-medium rounded-full border border-gray-200">
                  +{selectedScenes.length - 2} more
                </span>
              )}
            </div>
          </div>

          {/* 3. Estimates */}
          <div className="flex justify-between items-start pt-4 border-t border-gray-50">
            <div>
              <p className="text-sm font-bold text-gray-900">Est. Photos Needed</p>
              <p className="text-2xl font-serif font-bold text-gray-900 mt-1">
                {state.shotCount} - {Math.round(state.shotCount * 1.2)}
              </p>
              <p className="text-[10px] text-gray-400 mt-1">Based on selections</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">Shoot Length</p>
              <p className="text-lg font-bold text-purple-600 mt-1">Up to {estimatedHours} hrs</p>
              <HelpCircle size={12} className="text-gray-300 ml-auto mt-1" />
            </div>
          </div>

          {/* 4. Pricing Summary Cards */}
          <div className="space-y-3 pt-4 border-t border-gray-50">
            <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">Pricing Info</p>
            
            {/* Base Production Card */}
            <div className="flex gap-3 items-start">
               <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  <Camera size={20} className="text-gray-400" />
               </div>
               <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                     <p className="text-sm font-bold text-gray-900 truncate">Production Base</p>
                     <p className="text-sm font-bold text-gray-900">${(totals.baseFee + totals.shotFee).toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                     <p className="text-xs text-gray-500">{state.category} • {state.style}</p>
                     <button className="text-[10px] text-gray-400 flex items-center gap-1 hover:text-gray-600">
                        view details <ChevronDown size={10} />
                     </button>
                  </div>
               </div>
            </div>

            {/* Retouching Card (if high-end) */}
            {state.retouching === 'high-end' && (
              <div className="flex gap-3 items-start">
                 <div className="w-12 h-12 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                    <ShoppingBag size={20} className="text-purple-500" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                       <p className="text-sm font-bold text-gray-900">High-End Retouch</p>
                       <p className="text-sm font-bold text-gray-900">${totals.retouchingFee.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                       <p className="text-xs text-gray-500">Advanced editing</p>
                       <button 
                          onClick={() => updateState({ retouching: 'basic' })}
                          className="text-[10px] text-red-400 hover:text-red-600 underline decoration-red-200"
                       >
                          remove
                       </button>
                    </div>
                 </div>
              </div>
            )}

            {/* Models / Services Cards */}
            {selectedModels.map((model, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                 <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                    {model.details?.image ? (
                      <img src={model.details.image} className="w-full h-full object-cover" alt={model.details.name} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400"><User size={20}/></div>
                    )}
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                       <p className="text-sm font-bold text-gray-900 truncate">{model.details?.name || model.type}</p>
                       <p className="text-sm font-bold text-gray-900">${(model.count * (model.details?.price || 0)).toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                       <p className="text-xs text-gray-500">{model.count}x @ ${model.details?.price}</p>
                       <button 
                          onClick={() => removeModel(model.type)}
                          className="text-[10px] text-red-400 hover:text-red-600 underline decoration-red-200"
                       >
                          remove
                       </button>
                    </div>
                 </div>
              </div>
            ))}
          </div>

        </div>
        
        {/* 6. Totals Section */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
           <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Amount Due Today</span>
              <span className="text-3xl font-serif font-bold text-gray-900">${totals.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
           </div>
           
           <div className="space-y-3">
              <Button 
                onClick={() => setShowEstimator(true)}
                variant="ghost" 
                fullWidth 
                size="sm" 
                className="text-purple-600 hover:bg-purple-50 text-xs"
              >
                 <Sparkles size={12} className="mr-2" /> Why this price?
              </Button>
              <Button variant="outline" fullWidth size="sm" className="bg-white text-gray-600 border-gray-200 hover:bg-gray-50">
                 <Save size={14} className="mr-2" /> Save Draft
              </Button>
              <div className="text-center text-[10px] text-gray-400 mt-2">
                 Taxes calculated at checkout
              </div>
           </div>
        </div>
      </div>

      {/* AI Estimator Modal */}
      {showEstimator && <AIEstimator onClose={() => setShowEstimator(false)} />}
    </>
  );
};
