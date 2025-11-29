import React from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { BookingSidebar } from '../components/booking/BookingSidebar';
import { WizardProgressBar } from '../components/booking/ui/WizardProgressBar';
import { ChevronLeft, LayoutDashboard, Target, Users, Package, FileText, Mic2, Image, BarChart3, Camera } from 'lucide-react';
import { Button } from '../components/Button';
import { useBooking } from '../context/BookingContext';

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
  
  const currentStepIndex = STEPS.findIndex(s => s.path === location.pathname);
  const safeStepIndex = currentStepIndex === -1 ? 0 : currentStepIndex;

  const isCheckout = location.pathname.includes('checkout');
  const isSuccess = location.pathname.includes('success');

  if (isSuccess) return <Outlet />;

  const handleBack = () => {
    if (currentStepIndex > 0) {
      navigate(STEPS[currentStepIndex - 1].path);
    } else {
      navigate('/');
    }
  };

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      navigate(STEPS[currentStepIndex + 1].path);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F5] pt-20 pb-32 lg:pb-24">
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-200 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 lg:hidden"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hidden lg:block"
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

          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            Save & Exit
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-12 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar (Navigation Context) */}
          <div className="hidden xl:block w-64 shrink-0">
            <div className="sticky top-24">
                <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">FashionOS</p>
                <nav className="space-y-1">
                    {[
                        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
                        { icon: Camera, label: 'Studio', path: '/dashboard/studio', active: true },
                        { icon: Target, label: 'Leads', path: '/dashboard/leads' },
                        { icon: Users, label: 'Sponsors', path: '/dashboard/sponsors' },
                    ].map((item, i) => (
                        <Link 
                            key={i} 
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${item.active ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:bg-white/50 hover:text-black'}`}
                        >
                            <item.icon size={18} /> {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>

          {/* Right Sidebar (Summary) - Hide on checkout */}
          {!isCheckout && (
            <div className="hidden lg:block w-80 xl:w-96 shrink-0">
              <BookingSidebar />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      {!isCheckout && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          {/* Price Context */}
          <div className="flex justify-between items-center mb-3 px-1">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Est. Total</span>
             <span className="font-serif font-bold text-lg text-gray-900">${totals.total.toLocaleString()}</span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleBack}
            >
              Back
            </Button>
            
            {currentStepIndex < STEPS.length - 1 && (
              <Button 
                variant="primary" 
                className="flex-[2]" 
                onClick={handleNext}
              >
                Next Step
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};