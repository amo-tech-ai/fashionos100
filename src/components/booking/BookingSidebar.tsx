
import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { ChevronRight, Crown, CreditCard, Lock, Sparkles } from 'lucide-react';
import { Button } from '../Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { WIZARD_DATA } from '../../data/wizardData';

export const BookingSidebar: React.FC = () => {
  const { state, totals } = useBooking();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current step and next route logic
  const currentPath = location.pathname;
  let nextPath = '/start-project/style';
  let isNextDisabled = !state.category;
  
  // Routing logic for the "Next" button based on current page
  if (currentPath.includes('category')) {
     nextPath = '/start-project/style';
     isNextDisabled = !state.category;
  } else if (currentPath.includes('style')) {
     nextPath = '/start-project/size';
     isNextDisabled = !state.style;
  } else if (currentPath.includes('schedule')) {
     nextPath = '/start-project/review';
     isNextDisabled = !state.date || !state.time;
  }

  const selectedCategoryLabel = WIZARD_DATA.categories.find(c => c.id === state.category)?.label || '-';
  const selectedStyleLabel = WIZARD_DATA.styles.find(s => s.id === state.style)?.label || '-';

  return (
    <div className="sticky top-24 w-full">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-serif font-bold text-lg text-gray-900">Summary</h3>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mt-1">Live Estimate</p>
        </div>
        
        {/* Specs List */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Project Type</span>
            <span className="font-bold text-gray-900">{selectedCategoryLabel}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Style</span>
            <span className="font-bold text-gray-900">{state.style ? selectedStyleLabel : '-'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Images</span>
            <span className="font-bold text-gray-900">{state.shotCount || 0} shots</span>
          </div>
          {state.retouching === 'high-end' && (
            <div className="flex justify-between text-sm animate-in fade-in slide-in-from-left-1">
                <span className="text-purple-600 flex items-center gap-1"><Sparkles size={12}/> Retouching</span>
                <span className="font-bold text-purple-700">High-End</span>
            </div>
          )}
          {state.date && (
            <div className="flex justify-between text-sm animate-in fade-in slide-in-from-left-1">
                <span className="text-gray-500">Schedule</span>
                <div className="text-right">
                   <span className="font-bold text-gray-900 block">{state.date.toLocaleDateString()}</span>
                   {state.time && <span className="text-xs text-purple-600 font-bold">{state.time}</span>}
                </div>
            </div>
          )}
          
          <div className="h-px bg-gray-100 my-4" />

          {/* Dynamic Cost Breakdown */}
          <div className="space-y-2">
             <div className="flex justify-between text-xs text-gray-500">
               <span>Base Fee</span>
               <span>${totals.baseFee.toLocaleString()}</span>
             </div>
             <div className="flex justify-between text-xs text-gray-500">
               <span>Production ({state.shotCount}x)</span>
               <span>${totals.shotFee.toLocaleString()}</span>
             </div>
             {totals.retouchingFee > 0 && (
               <div className="flex justify-between text-xs text-purple-600">
                 <span>Retouching (+50%)</span>
                 <span>+${totals.retouchingFee.toLocaleString()}</span>
               </div>
             )}
             {totals.sizeFee > 0 && (
               <div className="flex justify-between text-xs text-gray-500">
                 <span>Handling Fee</span>
                 <span>+${totals.sizeFee.toLocaleString()}</span>
               </div>
             )}
             <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-gray-50">
                <span>Tax (Est.)</span>
                <span>${totals.tax.toFixed(2)}</span>
             </div>
          </div>
        </div>

        {/* Membership Upsell */}
        <div className="px-6 pb-6">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 text-white relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl -mr-4 -mt-4" />
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <Crown size={14} className="text-yellow-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400">Pro Member</span>
                </div>
                <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                    Save 15% and get free advanced retouching on all orders.
                </p>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-bold transition-all">
                    Add Membership (+$49)
                </button>
            </div>
          </div>
        </div>

        {/* Total & CTA */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-between items-end mb-6">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total</span>
                <span className="text-3xl font-serif font-bold text-gray-900">${totals.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            
            <Button 
                variant="primary" 
                size="lg" 
                fullWidth 
                onClick={() => navigate(nextPath)}
                disabled={isNextDisabled}
                className="mb-4 shadow-lg shadow-purple-900/10"
            >
                Next Step <ChevronRight size={16} className="ml-1" />
            </Button>

            <div className="flex justify-center gap-3 text-gray-400 opacity-60">
                <CreditCard size={16} />
                <span className="text-[10px] font-bold flex items-center gap-1"><Lock size={10} /> Secure Payment</span>
            </div>
        </div>
      </div>
    </div>
  );
};
