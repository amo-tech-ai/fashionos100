
import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { ChevronRight, Crown, Lock, Sparkles, ChevronDown, ChevronUp, Check, Info, Layers, Camera } from 'lucide-react';
import { Button } from '../Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { WIZARD_DATA } from '../../data/wizardData';
import { formatCurrency } from '../../utils/format';
import { BOOKING_STEPS } from '../../lib/booking-steps';

export const BookingSidebar: React.FC = () => {
  const { state, totals } = useBooking();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMembership, setShowMembership] = useState(false);

  // Determine next path dynamically
  const currentIndex = BOOKING_STEPS.findIndex(s => s.path === location.pathname);
  const nextStep = BOOKING_STEPS[currentIndex + 1];
  const nextPath = nextStep ? nextStep.path : '/start-project/checkout';

  // Validation Logic based on current step
  let isNextDisabled = false;
  const currentPath = location.pathname;

  if (currentPath.includes('category')) isNextDisabled = !state.category;
  else if (currentPath.includes('style')) isNextDisabled = !state.style;
  else if (currentPath.includes('size')) isNextDisabled = !state.productSize;
  else if (currentPath.includes('scenes')) isNextDisabled = state.scenes.length === 0;
  else if (currentPath.includes('shot-type')) isNextDisabled = !state.shotType;
  else if (currentPath.includes('models')) isNextDisabled = false; // Optional
  else if (currentPath.includes('shot-list')) isNextDisabled = state.shotCount <= 0;
  else if (currentPath.includes('brief')) isNextDisabled = state.brief.length < 5;
  else if (currentPath.includes('schedule')) isNextDisabled = !state.date || !state.time;
  
  const selectedCategoryLabel = WIZARD_DATA.categories.find(c => c.id === state.category)?.label || '-';
  const selectedStyleLabel = WIZARD_DATA.styles.find(s => s.id === state.style)?.label || '-';

  return (
    <div className="flex flex-col h-full bg-white">
      
      {/* Header */}
      <div className="p-8 pb-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-2">
           <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Quote Preview</span>
           <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> Live
           </span>
        </div>
        <h2 className="font-serif font-bold text-4xl text-gray-900">{formatCurrency(totals.total)}</h2>
        <p className="text-xs text-gray-400 mt-1">Includes estimated taxes</p>
      </div>
      
      {/* Content */}
      <div className="p-8 pt-6 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
        
        {/* Config Summary */}
        <div className="space-y-4">
            <div className="group">
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 flex items-center gap-2"><Layers size={14} /> Project Type</span>
                    <span className="font-bold text-gray-900">{selectedCategoryLabel}</span>
                </div>
                <div className="h-px bg-gray-100 group-hover:bg-purple-100 transition-colors" />
            </div>
            
            <div className="group">
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 flex items-center gap-2"><Camera size={14} /> Visual Style</span>
                    <span className="font-bold text-gray-900">{state.style ? selectedStyleLabel : '-'}</span>
                </div>
                <div className="h-px bg-gray-100 group-hover:bg-purple-100 transition-colors" />
            </div>

            <div className="group">
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 flex items-center gap-2"><Info size={14} /> Volume</span>
                    <span className="font-bold text-gray-900">{state.shotCount || 0} Assets</span>
                </div>
                <div className="h-px bg-gray-100 group-hover:bg-purple-100 transition-colors" />
            </div>
        </div>

        {/* Breakdown Box */}
        <div className="bg-gray-50 rounded-xl p-5 space-y-3 border border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Base Production Fee</span>
              <span>{formatCurrency(totals.baseFee)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Per Look ({state.shotCount}x)</span>
              <span>{formatCurrency(totals.shotFee)}</span>
            </div>
            {totals.retouchingFee > 0 && (
              <div className="flex justify-between text-xs text-purple-600 font-bold">
                <span className="flex items-center gap-1"><Sparkles size={10}/> High-End Retouch</span>
                <span>+{formatCurrency(totals.retouchingFee)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 border-dashed my-2 pt-2 flex justify-between text-xs font-bold text-gray-900">
               <span>Subtotal</span>
               <span>{formatCurrency(totals.subtotal)}</span>
            </div>
        </div>

        {/* Membership Upsell */}
        <div className="border border-purple-100 rounded-xl overflow-hidden bg-gradient-to-b from-purple-50/50 to-white">
          <button 
            onClick={() => setShowMembership(!showMembership)}
            className="w-full flex items-center justify-between p-4 text-xs font-bold uppercase tracking-widest text-purple-900 hover:bg-purple-50 transition-colors"
          >
             <span className="flex items-center gap-2"><Crown size={14} className="text-purple-600" /> Unlock Pro Pricing</span>
             {showMembership ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          
          {showMembership && (
             <div className="p-4 pt-0 animate-in slide-in-from-top-2">
                <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    Save 15% on this order instantly and get free advanced retouching on all future shoots.
                </p>
                <ul className="space-y-2 mb-4">
                    <li className="text-[10px] flex items-center gap-2 text-gray-500 font-medium"><Check size={12} className="text-green-500"/> Free priority delivery</li>
                    <li className="text-[10px] flex items-center gap-2 text-gray-500 font-medium"><Check size={12} className="text-green-500"/> Dedicated creative director</li>
                </ul>
                <button className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-lg">
                    Add Pro Membership (+$49/mo)
                </button>
             </div>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <Button 
              variant="primary" 
              size="lg" 
              fullWidth 
              onClick={() => navigate(nextPath)}
              disabled={isNextDisabled}
              className="shadow-lg shadow-purple-900/10 h-14 text-sm"
          >
              Next Step <ChevronRight size={16} className="ml-1" />
          </Button>
          <div className="flex justify-center items-center gap-2 mt-3 opacity-60">
             <Lock size={10} className="text-gray-400" />
             <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Secure Estimate</p>
          </div>
      </div>
    </div>
  );
};
