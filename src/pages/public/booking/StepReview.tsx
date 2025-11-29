
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight, Edit2 } from 'lucide-react';

export const StepReview: React.FC = () => {
  const { state, totals } = useBooking();
  const navigate = useNavigate();
  
  // Calculate per-shot price for display
  const perShotPrice = state.shotCount > 0 ? (totals.shotFee / state.shotCount) : 0;

  return (
    <FadeIn>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-serif font-bold mb-8">Review Booking</h1>
        
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="p-8 border-b border-gray-100">
            <h3 className="font-bold text-lg mb-6">Project Details</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center group cursor-pointer" onClick={() => navigate('/start-project/category')}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Category</p>
                  <p className="text-lg font-serif font-bold capitalize">{state.category}</p>
                </div>
                <Edit2 size={16} className="text-gray-300 group-hover:text-purple-600" />
              </div>

              <div className="flex justify-between items-center group cursor-pointer" onClick={() => navigate('/start-project/style')}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Style</p>
                  <p className="text-lg font-serif font-bold capitalize">{state.style}</p>
                </div>
                <Edit2 size={16} className="text-gray-300 group-hover:text-purple-600" />
              </div>

              <div className="flex justify-between items-center group cursor-pointer" onClick={() => navigate('/start-project/shot-list')}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Quantity</p>
                  <p className="text-lg font-serif font-bold">{state.shotCount} Photos</p>
                </div>
                <Edit2 size={16} className="text-gray-300 group-hover:text-purple-600" />
              </div>

              <div className="flex justify-between items-start group cursor-pointer" onClick={() => navigate('/start-project/brief')}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Brief</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3 italic max-w-md">{state.brief || "No brief provided"}</p>
                </div>
                <Edit2 size={16} className="text-gray-300 group-hover:text-purple-600" />
              </div>

              <div className="flex justify-between items-center group cursor-pointer" onClick={() => navigate('/start-project/retouching')}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Retouching</p>
                  <p className="text-lg font-serif font-bold capitalize">{state.retouching}</p>
                </div>
                <Edit2 size={16} className="text-gray-300 group-hover:text-purple-600" />
              </div>

              <div className="flex justify-between items-center group cursor-pointer" onClick={() => navigate('/start-project/schedule')}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Schedule</p>
                  <p className="text-lg font-serif font-bold capitalize">
                     {state.date ? state.date.toLocaleDateString() : 'TBD'} @ {state.time || 'TBD'}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">Type: {state.fulfillmentType}</p>
                </div>
                <Edit2 size={16} className="text-gray-300 group-hover:text-purple-600" />
              </div>
            </div>
          </div>

          {/* Detailed Cost Breakdown */}
          <div className="p-8 bg-gray-50/50 border-b border-gray-100">
            <h3 className="font-bold text-lg mb-6">Cost Breakdown</h3>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">Base Fee ({state.category})</span>
                    <span className="font-medium">${totals.baseFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Creative Production ({state.shotCount} shots @ ${perShotPrice}/ea)</span>
                    <span className="font-medium">${totals.shotFee.toLocaleString()}</span>
                </div>
                {totals.retouchingFee > 0 && (
                    <div className="flex justify-between text-purple-700">
                        <span>High-End Retouching Markup (+50%)</span>
                        <span className="font-bold">+${totals.retouchingFee.toLocaleString()}</span>
                    </div>
                )}
                {totals.sizeFee > 0 && (
                    <div className="flex justify-between">
                        <span className="text-gray-500">Product Handling ({state.productSize})</span>
                        <span className="font-medium">+${totals.sizeFee.toLocaleString()}</span>
                    </div>
                )}
                <div className="flex justify-between border-t border-gray-200 pt-3 mt-2">
                    <span className="text-gray-500">Estimated Tax (8.875%)</span>
                    <span className="font-medium">${totals.tax.toFixed(2)}</span>
                </div>
            </div>
          </div>

          <div className="p-8 bg-gray-100">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Total Estimate</span>
              <span className="font-serif font-bold text-4xl text-gray-900">${totals.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="primary" size="lg" onClick={() => navigate('/start-project/checkout')}>
            Proceed to Checkout <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};
