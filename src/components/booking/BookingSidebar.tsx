
import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { ChevronRight, Crown, CreditCard, Lock, Sparkles, ChevronDown, ChevronUp, Check, Info, Layers, Camera } from 'lucide-react';
import { Button } from '../Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { WIZARD_DATA } from '../../data/wizardData';
import { formatCurrency } from '../../utils/format';

export const BookingSidebar: React.FC = () => {
  const { state, totals } = useBooking();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMembership, setShowMembership] = useState(false);

  // Determine current step and next route logic
  const currentPath = location.pathname;
  let nextPath = '/start-project/style';
  let isNextDisabled = !state.category;
  
  // Routing Logic
  if (currentPath.includes('category')) isNextDisabled = !state.category;
  else if (currentPath.includes('style')) { nextPath = '/start-project/size'; isNextDisabled = !state.style; }
  
  const selectedCategoryLabel = WIZARD_DATA.categories.find(c => c.id === state.category)?.label || '-';
  const selectedStyleLabel = WIZARD_DATA.styles.find(s => s.id === state.style)?.label || '-';

  return (
    <div className="flex flex-col h-full">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="flex justify-between items-center mb-1">
           <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Estimated Total</span>
           <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> Live
           </span>
        </div>
        <h2 className="font-serif font-bold text-4xl text-gray-900">{formatCurrency(totals.total)}</h2>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
        
        {/* Summary Rows */}
        <div className="space-y-4">
            <div className="flex justify-between items-start group">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Layers size={16} className="text-gray-300 group-hover:text-purple-400 transition-colors" />
                    <span>Project Type</span>
                </div>
                <span className="font-bold text-gray-900 text-sm text-right">{selectedCategoryLabel}</span>
            </div>
            <div className="w-full h-px bg-gray-50" />
            
            <div className="flex justify-between items-start group">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Camera size={16} className="text-gray-300 group-hover:text-purple-400 transition-colors" />
                    <span>Visual Style</span>
                </div>
                <span className="font-bold text-gray-900 text-sm text-right">{state.style ? selectedStyleLabel : '-'}</span>
            </div>
            <div className="w-full h-px bg-gray-50" />

            <div className="flex justify-between items-start group">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Info size={16} className="text-gray-300 group-hover:text-purple-400 transition-colors" />
                    <span>Total Images</span>
                </div>
                <span className="font-bold text-gray-900 text-sm text-right">{state.shotCount || 0} Assets</span>
            </div>
        </div>

        {/* Breakdown */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Base Production Fee</span>
              <span>{formatCurrency(totals.baseFee)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Per Look ({state.shotCount}x)</span>
              <span>{formatCurrency(totals.shotFee)}</span>
            </div>
            {totals.retouchingFee > 0 && (
              <div className="flex justify-between text-xs text-purple-600 font-medium">
                <span className="flex items-center gap-1"><Sparkles size={10}/> High-End Retouch</span>
                <span>+{formatCurrency(totals.retouchingFee)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 border-dashed my-2 pt-2 flex justify-between text-xs font-bold text-gray-700">
               <span>Subtotal</span>
               <span>{formatCurrency(totals.subtotal)}</span>
            </div>
        </div>

        {/* Membership Upsell (Collapsible) */}
        <div className="border border-purple-100 rounded-xl overflow-hidden bg-purple-50/30">
          <button 
            onClick={() => setShowMembership(!showMembership)}
            className="w-full flex items-center justify-between p-3 text-xs font-bold uppercase tracking-widest text-purple-800 hover:bg-purple-50 transition-colors"
          >
             <span className="flex items-center gap-2"><Crown size={14} className="text-purple-600" /> Unlock Pro Pricing</span>
             {showMembership ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          
          {showMembership && (
             <div className="p-4 pt-0 animate-in slide-in-from-top-2">
                <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    Save 15% on this order instantly and get free advanced retouching on all future shoots.
                </p>
                <ul className="space-y-1 mb-3">
                    <li className="text-[10px] flex items-center gap-2 text-gray-500"><Check size={10} className="text-green-500"/> Free priority delivery</li>
                    <li className="text-[10px] flex items-center gap-2 text-gray-500"><Check size={10} className="text-green-500"/> Dedicated creative director</li>
                </ul>
                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm">
                    Add Pro Membership (+$49/mo)
                </button>
             </div>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-6 border-t border-gray-100">
          <Button 
              variant="primary" 
              size="lg" 
              fullWidth 
              onClick={() => navigate(nextPath)}
              disabled={isNextDisabled}
              className="shadow-xl shadow-purple-900/10 h-12 text-sm"
          >
              Next Step <ChevronRight size={16} className="ml-1" />
          </Button>
          <p className="text-center mt-3 text-[10px] text-gray-400 font-medium flex items-center justify-center gap-1">
             <Lock size={10} /> Secure Estimate
          </p>
      </div>
    </div>
  );
};
