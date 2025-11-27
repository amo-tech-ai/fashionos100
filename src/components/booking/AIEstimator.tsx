
import React from 'react';
import { X, Zap, Camera, Clock, User, Box, Sparkles, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../Button';
import { FadeIn } from '../FadeIn';
import { WIZARD_DATA } from '../../data/wizardData';

interface AIEstimatorProps {
  onClose: () => void;
}

export const AIEstimator: React.FC<AIEstimatorProps> = ({ onClose }) => {
  const { state, totals } = useBooking();

  // --- Analysis Logic ---
  
  // 1. Style Impact
  const styleData = WIZARD_DATA.styles.find(s => s.id === state.style);
  const styleComplexity = ['editorial', 'high-fashion', 'runway'].includes(state.style) ? 'High' : 'Standard';
  const styleTimeMod = styleComplexity === 'High' ? '+15 min' : '+5 min';

  // 2. Scene Impact
  const sceneCount = state.scenes.length;
  const sceneImpact = sceneCount > 1 ? `+${(sceneCount - 1) * 45} min setup` : 'Standard setup';
  const lightingComplexity = sceneCount > 1 ? 'Multi-point' : 'Single-point';

  // 3. Size Impact
  const sizeData = WIZARD_DATA.sizes.find(s => s.id === state.productSize);
  const sizeImpact = state.productSize === 'oversized' ? 'Requires Assistant' : 'Standard Handling';
  const sizeCost = sizeData?.price ? `+$${sizeData.price}/item` : 'Included';

  // 4. Service Impact
  const modelCount = state.models.reduce((acc, m) => acc + m.count, 0);
  const serviceImpact = modelCount > 0 ? 'Casting & Coordination' : 'Product Only';
  
  // AI Summary Text
  const generateSummary = () => {
    const parts = [];
    parts.push(`Selecting **${styleData?.label || 'Standard'}** style adds complexity to lighting and composition.`);
    if (sceneCount > 1) parts.push(`Using **${sceneCount} scenes** requires additional setup time for background changes.`);
    if (state.productSize === 'oversized' || state.productSize === 'large') parts.push(`**${sizeData?.label}** items require special handling logistics.`);
    if (modelCount > 0) parts.push(`Involving **${modelCount} talent** adds coordination fees but elevates brand value.`);
    
    return parts.join(' ');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-1.5 rounded-lg">
                <Sparkles size={16} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-600">AI Estimator 3.0</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900">How your estimate was calculated</h2>
            <p className="text-gray-500 mt-1">AI evaluates your selections and predicts shoot requirements.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="p-8 overflow-y-auto">
          
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* 1. Style */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-purple-200 transition-all group">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Camera size={20} />
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Photography Style</h3>
              <p className="text-xs text-gray-500 mb-4 capitalize">{state.style}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Time/Shot</span>
                  <span className="font-medium text-purple-700">{styleTimeMod}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Complexity</span>
                  <span className="font-medium text-gray-900">{styleComplexity}</span>
                </div>
              </div>
            </div>

            {/* 2. Scenes */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-all group">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap size={20} />
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Scene Setup</h3>
              <p className="text-xs text-gray-500 mb-4">{sceneCount} Scenes Selected</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Changeover</span>
                  <span className="font-medium text-blue-700">{sceneImpact}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Lighting</span>
                  <span className="font-medium text-gray-900">{lightingComplexity}</span>
                </div>
              </div>
            </div>

            {/* 3. Product */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-amber-200 transition-all group">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Box size={20} />
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Product Handling</h3>
              <p className="text-xs text-gray-500 mb-4 capitalize">{state.productSize}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Logistics</span>
                  <span className="font-medium text-amber-700">{sizeImpact}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Surcharge</span>
                  <span className="font-medium text-gray-900">{sizeCost}</span>
                </div>
              </div>
            </div>

            {/* 4. Services */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-pink-200 transition-all group">
              <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <User size={20} />
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Pro Services</h3>
              <p className="text-xs text-gray-500 mb-4">{modelCount} Talent Added</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Type</span>
                  <span className="font-medium text-pink-700">{serviceImpact}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Coordination</span>
                  <span className="font-medium text-gray-900">{modelCount > 0 ? 'Included' : 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-gray-900 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-40 pointer-events-none" />
            
            <div className="relative z-10 flex gap-6">
              <div className="hidden md:block">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md">
                  <Sparkles size={24} className="text-yellow-300" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-serif font-bold text-xl mb-2">AI Analysis</h3>
                <p className="text-gray-300 leading-relaxed text-sm mb-6">
                   {generateSummary().split('**').map((part, i) => 
                      i % 2 === 1 ? <span key={i} className="text-white font-bold">{part}</span> : part
                   )}
                </p>
                
                <div className="flex items-center gap-8 pt-6 border-t border-white/10">
                  <div>
                     <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Estimated Total</p>
                     <p className="text-3xl font-serif font-bold text-white">${totals.total.toLocaleString()}</p>
                  </div>
                  <div>
                     <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Shoot Duration</p>
                     <p className="text-3xl font-serif font-bold text-white flex items-baseline gap-1">
                        {Math.ceil((state.shotCount * 20) / 60) + 1} <span className="text-sm font-sans font-medium text-gray-400">Hours</span>
                     </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
           <Button variant="ghost" onClick={onClose}>Close</Button>
           <Button variant="primary" onClick={onClose} className="gap-2">
             Return to Booking <ArrowRight size={16} />
           </Button>
        </div>

      </div>
    </div>
  );
};
