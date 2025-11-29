
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { BookingSidebar } from '../components/booking/BookingSidebar';
import { WizardProgressBar } from '../components/booking/ui/WizardProgressBar';
import { ChevronLeft, LayoutDashboard, Target, Users, Camera, PanelRightClose, PanelRightOpen, ChevronUp, X } from 'lucide-react';
import { Button } from '../components/Button';
import { useBooking } from '../context/BookingContext';
import { formatCurrency } from '../utils/format';

const STEPS = [
  { path: '/start-project/category', label: 'Category' },
  { path: '/start-project/style', label: 'Style' },
  { path: '/start-project/size', label: 'Size' },
  { path: '/start-project/scenes', label: 'Scenes' },
  { path: '/start-project/shot-type', label: 'Type' },
  { path: '/start-project/sub-category', label: 'Sub-Cat' },
  { path: '/start-project/models', label: 'Talent' },
  { path: '/start-project/shot-list', label: 'Count' },
  { path: '/start-project/references', label: 'Refs' },
  { path: '/start-project/brief', label: 'Brief' },
  { path: '/start-project/shot-builder', label: 'List' },
  { path: '/start-project/retouching', label: 'Retouch' },
  { path: '/start-project/schedule', label: 'Schedule' }, 
  { path: '/start-project/review', label: 'Review' },
];

export const BookingLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totals } = useBooking();
  const [isSummaryOpen, setIsSummaryOpen] = useState(false); // Mobile Drawer
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Desktop Collapse
  
  const currentStepIndex = STEPS.findIndex(s => s.path === location.pathname);
  const safeStepIndex = currentStepIndex === -1 ? 0 : currentStepIndex;

  const isCheckout = location.pathname.includes('checkout');
  const isSuccess = location.pathname.includes('success');

  if (isSuccess) return <Outlet />;

  return (
    <div className="min-h-screen bg-[#FBF8F5] pt-20 pb-32 lg:pb-0 font-sans text-fashion-black">
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 border-b border-gray-200 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="hidden md:block">
                <span className="font-serif font-bold text-xl block leading-none">Start New Project</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">FashionOS Studio</span>
            </div>
          </div>
          
          {/* Progress Bar - Desktop Only */}
          {!isCheckout && (
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <WizardProgressBar 
                currentStep={safeStepIndex + 1} 
                totalSteps={STEPS.length} 
              />
            </div>
          )}

          <div className="flex items-center gap-4">
             {/* Desktop Sidebar Toggle */}
             {!isCheckout && (
               <button 
                 onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                 className="hidden lg:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-black transition-colors"
               >
                 {isSidebarCollapsed ? <PanelRightOpen size={18} /> : <PanelRightClose size={18} />}
                 {isSidebarCollapsed ? 'Show Summary' : 'Hide Summary'}
               </button>
             )}
             <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
               Save & Exit
             </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 pt-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Main Content */}
          <div className={`flex-1 min-w-0 transition-all duration-500 ease-out ${isSidebarCollapsed ? 'max-w-5xl mx-auto' : ''}`}>
            <Outlet />
          </div>

          {/* Right Sidebar (Summary) - Collapsible Desktop */}
          {!isCheckout && (
            <div 
              className={`hidden lg:block shrink-0 transition-all duration-500 ease-in-out sticky top-24 ${
                isSidebarCollapsed 
                  ? 'w-0 opacity-0 translate-x-10 pointer-events-none' 
                  : 'w-80 xl:w-96 opacity-100 translate-x-0'
              }`}
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                 <BookingSidebar />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Floating Summary Button */}
      {!isCheckout && (
        <>
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden animate-in slide-in-from-bottom-10 duration-500">
             <button 
                onClick={() => setIsSummaryOpen(true)}
                className="flex items-center gap-3 bg-black text-white px-6 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-transform active:scale-95 border border-white/10"
             >
                <span className="font-serif font-bold text-lg">Summary</span>
                <div className="w-px h-4 bg-white/30" />
                <span className="text-sm font-medium">{formatCurrency(totals.total)}</span>
                <ChevronUp size={16} className="text-white/60" />
             </button>
          </div>

          {/* Mobile Summary Drawer */}
          <div 
            className={`fixed inset-x-0 bottom-0 z-[60] bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] transition-transform duration-500 ease-in-out lg:hidden flex flex-col max-h-[90vh] ${
              isSummaryOpen ? 'translate-y-0' : 'translate-y-[100%]'
            }`}
          >
             <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-[2rem]">
                <div>
                   <h3 className="font-serif font-bold text-xl">Project Summary</h3>
                   <p className="text-xs text-gray-500 uppercase tracking-wider">Step {safeStepIndex + 1} of {STEPS.length}</p>
                </div>
                <button onClick={() => setIsSummaryOpen(false)} className="p-2 bg-white hover:bg-gray-100 rounded-full transition-colors border border-gray-200">
                   <X size={20} />
                </button>
             </div>
             <div className="flex-1 overflow-y-auto p-4 pb- safe">
                <BookingSidebar />
             </div>
          </div>

          {/* Overlay */}
          {isSummaryOpen && (
             <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] lg:hidden transition-opacity duration-300" onClick={() => setIsSummaryOpen(false)} />
          )}
        </>
      )}
    </div>
  );
};
