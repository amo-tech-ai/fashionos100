
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BookingSidebar } from '../components/booking/BookingSidebar';
import { WizardProgressBar } from '../components/booking/ui/WizardProgressBar';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { useBooking } from '../context/BookingContext';

const STEPS = [
  { path: '/start-project/category', label: 'Category' },
  { path: '/start-project/style', label: 'Style' },
  { path: '/start-project/size', label: 'Size' },
  { path: '/start-project/scenes', label: 'Scenes' },
  { path: '/start-project/shot-type', label: 'Type' },
  { path: '/start-project/sub-category', label: 'Sub-Cat' },
  { path: '/start-project/shot-list', label: 'Count' },
  { path: '/start-project/references', label: 'Refs' },
  { path: '/start-project/shot-builder', label: 'List' },
  { path: '/start-project/retouching', label: 'Retouch' },
  { path: '/start-project/review', label: 'Review' },
];

export const BookingLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totals } = useBooking();
  
  const currentStepIndex = STEPS.findIndex(s => s.path === location.pathname);
  const safeStepIndex = currentStepIndex === -1 ? 0 : currentStepIndex;

  const isCheckout = location.pathname.includes('checkout');
  const isSuccess = location.pathname.includes('success');

  if (isSuccess) return <Outlet />;

  return (
    <div className="min-h-screen bg-[#FBF8F5] pt-20 pb-24">
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-200 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-serif font-bold text-xl hidden md:block">
              Plan Your Shoot
            </span>
          </div>
          
          {/* Progress Bar */}
          {!isCheckout && (
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <WizardProgressBar 
                currentStep={safeStepIndex + 1} 
                totalSteps={STEPS.length} 
              />
            </div>
          )}

          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            Save & Exit
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-12 pt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>

          {/* Sidebar (Desktop) - Hide on checkout */}
          {!isCheckout && (
            <div className="hidden lg:block w-96 shrink-0">
              <BookingSidebar />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Sheet Trigger */}
      {!isCheckout && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 flex items-center justify-between pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total</p>
            <p className="font-serif font-bold text-xl">${totals.total.toLocaleString()}</p>
          </div>
          {currentStepIndex < STEPS.length - 1 && currentStepIndex !== -1 && (
            <Button variant="primary" onClick={() => navigate(STEPS[currentStepIndex + 1].path)}>
              Next Step
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
