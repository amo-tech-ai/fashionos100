
import React, { useState, useEffect } from 'react';
import { 
  Camera, Video, Monitor, ArrowRight, ArrowLeft, Check, 
  ChevronUp, ChevronDown, Info, X, Wand2, Calendar, Clock, MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Input } from '../../components/forms/Input';
import { Select } from '../../components/forms/Select';
import { Textarea } from '../../components/forms/Textarea';
import { CalendarPicker } from '../../components/CalendarPicker';

// --- Types ---
type ServiceType = 'photography' | 'video' | 'web' | null;
type CategoryType = 'ecomm' | 'editorial' | 'campaign' | 'social' | null;

interface BookingState {
  service: ServiceType;
  category: CategoryType;
  quantity: number;
  brief: string;
  date: Date | null;
  time: string;
  location: string;
}

// --- Constants & Mock Data ---
const SERVICE_OPTIONS = [
  { id: 'photography', label: 'Photography', icon: Camera, desc: 'Lookbook, E-comm, Editorial' },
  { id: 'video', label: 'Video Production', icon: Video, desc: 'Campaigns, Reels, TikTok' },
  { id: 'web', label: 'Web Design', icon: Monitor, desc: 'Shopify, Headless, Landing' },
];

const CATEGORY_OPTIONS = {
  photography: [
    { id: 'ecomm', label: 'E-Commerce', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300', desc: 'Clean white background' },
    { id: 'editorial', label: 'Editorial', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300', desc: 'On-location lifestyle' },
    { id: 'campaign', label: 'Campaign', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=300', desc: 'High concept creative' },
  ],
  video: [
    { id: 'social', label: 'Social Reels', image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=300', desc: '9:16 Vertical Content' },
    { id: 'campaign', label: 'Brand Film', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=300', desc: 'Cinematic storytelling' },
  ],
  web: [
    { id: 'ecomm', label: 'Shopify Store', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=300', desc: 'Full featured store' },
    { id: 'editorial', label: 'Portfolio', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=300', desc: 'Showcase your work' },
  ]
};

// --- Helper: Price Calculation ---
const calculateTotal = (state: BookingState) => {
  let base = 0;
  if (state.service === 'photography') base = 500;
  if (state.service === 'video') base = 1500;
  if (state.service === 'web') base = 3000;

  // Multiplier logic
  const perUnit = state.service === 'web' ? 0 : (state.service === 'video' ? 200 : 50);
  const total = base + (state.quantity * perUnit);
  
  return total;
};

export const StartProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Booking State
  const [booking, setBooking] = useState<BookingState>({
    service: null,
    category: null,
    quantity: 10, // default looks/seconds/pages
    brief: '',
    date: null,
    time: '',
    location: ''
  });

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Navigation Handlers
  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(curr => curr + 1);
    else {
      // Submit Logic
      console.log('Booking submitted:', booking);
      navigate('/dashboard/bookings');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(curr => curr - 1);
    else navigate(-1);
  };

  const canProceed = () => {
    if (currentStep === 0) return !!booking.service;
    if (currentStep === 1) return !!booking.category;
    // Step 2 is Quantity (always valid due to default)
    if (currentStep === 3) return !!booking.date && !!booking.time && !!booking.location;
    if (currentStep === 4) return booking.brief.length > 10;
    return true;
  };

  // AI Brief Polish (Secure)
  const handlePolishBrief = async () => {
    if (!booking.brief) return;
    setLoadingAI(true);
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/polish-brief`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({ brief: booking.brief })
      });

      if (!response.ok) throw new Error('AI service unavailable');
      
      const data = await response.json();
      if (data.text) {
        setBooking(prev => ({ ...prev, brief: data.text }));
      }
    } catch (e) {
      console.error("AI Polish failed", e);
      alert("Could not connect to AI service. Please try again.");
    } finally {
      setLoadingAI(false);
    }
  };

  // Steps Components
  const renderServiceStep = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {SERVICE_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setBooking(prev => ({ ...prev, service: opt.id as ServiceType, category: null }))}
          className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 group relative overflow-hidden ${
            booking.service === opt.id 
              ? 'border-fashion-purple bg-purple-50 ring-1 ring-fashion-purple' 
              : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg'
          }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${
            booking.service === opt.id ? 'bg-fashion-purple text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-fashion-black group-hover:text-white'
          }`}>
            <opt.icon size={24} />
          </div>
          <h3 className="font-serif font-bold text-lg mb-1">{opt.label}</h3>
          <p className="text-sm text-gray-500">{opt.desc}</p>
          {booking.service === opt.id && (
            <div className="absolute top-4 right-4 text-fashion-purple">
              <CheckCircle size={20} />
            </div>
          )}
        </button>
      ))}
    </div>
  );

  const renderCategoryStep = () => {
    const options = booking.service ? CATEGORY_OPTIONS[booking.service as keyof typeof CATEGORY_OPTIONS] : [];
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {options?.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setBooking(prev => ({ ...prev, category: opt.id as CategoryType }))}
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all duration-300 group text-left ${
              booking.category === opt.id 
                ? 'border-fashion-purple ring-2 ring-fashion-purple ring-offset-2' 
                : 'border-transparent hover:shadow-xl'
            }`}
          >
            <img src={opt.image} alt={opt.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="font-serif font-bold text-2xl mb-1">{opt.label}</h3>
              <p className="text-sm text-gray-300">{opt.desc}</p>
            </div>
            {booking.category === opt.id && (
              <div className="absolute top-4 right-4 bg-fashion-purple text-white p-1.5 rounded-full">
                <Check size={16} />
              </div>
            )}
          </button>
        ))}
      </div>
    );
  };

  const renderScopeStep = () => (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h3 className="font-serif font-bold text-2xl mb-6">
        {booking.service === 'web' ? 'Number of Pages' : (booking.service === 'video' ? 'Video Duration (Seconds)' : 'Number of Looks/Products')}
      </h3>
      
      <div className="flex items-center gap-6 mb-8">
        <button 
          onClick={() => setBooking(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
          className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all"
        >
          <span className="text-2xl font-bold text-gray-500">-</span>
        </button>
        <div className="flex-1 text-center">
          <span className="text-5xl font-bold text-fashion-black">{booking.quantity}</span>
          <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-bold">
            {booking.service === 'web' ? 'Pages' : (booking.service === 'video' ? 'Seconds' : 'Looks')}
          </p>
        </div>
        <button 
          onClick={() => setBooking(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
          className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 active:scale-95 transition-all shadow-lg"
        >
          <span className="text-2xl font-bold">+</span>
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl flex items-start gap-3 text-sm text-gray-600">
        <Info size={18} className="shrink-0 mt-0.5 text-fashion-purple" />
        <p>
          {booking.service === 'photography' && "Includes steaming, basic styling, shooting, and standard retouching per look."}
          {booking.service === 'video' && "Includes editing, color grading, and 1 round of revisions."}
          {booking.service === 'web' && "Includes design, development, and basic SEO setup per page."}
        </p>
      </div>
    </div>
  );

  const renderLogisticsStep = () => (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h3 className="font-serif font-bold text-2xl mb-6">When & Where</h3>
      
      {/* Date Picker */}
      <div className="mb-8 relative">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Date</label>
        <button 
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-full p-4 border border-gray-200 rounded-xl flex items-center justify-between hover:border-fashion-purple transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <Calendar className="text-fashion-purple" size={20} />
            <span className={booking.date ? "text-fashion-black font-medium" : "text-gray-400"}>
              {booking.date ? booking.date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Select a date"}
            </span>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </button>
        
        {showCalendar && (
          <div className="absolute top-full left-0 z-20 mt-2">
             <CalendarPicker 
               onClose={() => setShowCalendar(false)}
               onApply={(start) => {
                 setBooking(prev => ({ ...prev, date: start }));
                 setShowCalendar(false);
               }}
               initialStart={booking.date}
               initialEnd={null}
             />
          </div>
        )}
      </div>

      {/* Time Slots */}
      <div className="mb-8">
         <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Start Time</label>
         <div className="grid grid-cols-3 gap-3">
            {["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"].map(time => (
               <button
                 key={time}
                 onClick={() => setBooking(prev => ({ ...prev, time }))}
                 className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all ${booking.time === time ? 'bg-fashion-black text-white border-fashion-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
               >
                 {time}
               </button>
            ))}
         </div>
      </div>

      {/* Location */}
      <div>
         <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Location</label>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Studio A (Brooklyn)', 'Studio B (Manhattan)'].map(loc => (
               <button
                  key={loc}
                  onClick={() => setBooking(prev => ({ ...prev, location: loc }))}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${booking.location === loc ? 'border-fashion-purple bg-purple-50 ring-1 ring-fashion-purple' : 'border-gray-200 hover:border-gray-300'}`}
               >
                  <MapPin className={booking.location === loc ? "text-fashion-purple" : "text-gray-400"} size={20} />
                  <span className={`text-sm font-medium ${booking.location === loc ? 'text-fashion-purple' : 'text-gray-600'}`}>{loc}</span>
               </button>
            ))}
         </div>
      </div>
    </div>
  );

  const renderBriefStep = () => (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-serif font-bold text-xl md:text-2xl">Creative Brief</h3>
        <button 
          onClick={handlePolishBrief}
          disabled={loadingAI || !booking.brief}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fashion-purple hover:text-purple-700 disabled:opacity-50 transition-colors"
        >
          {loadingAI ? <LoadingSpinner size={14} /> : <Wand2 size={14} />}
          {loadingAI ? "Polishing..." : "AI Polish"}
        </button>
      </div>
      <Textarea
        value={booking.brief}
        onChange={(e) => setBooking(prev => ({ ...prev, brief: e.target.value }))}
        placeholder="Describe your vision... e.g. 'Minimalist aesthetic, harsh lighting, focus on textures. Reference Balenciaga SS24 campaign.'"
        className="h-64"
      />
      <div className="mt-4 flex justify-between items-center">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Minimum 10 characters</p>
        <span className="text-xs text-gray-400">{booking.brief.length} chars</span>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} />
        </div>
        <h2 className="font-serif font-bold text-3xl">Ready to Book?</h2>
        <p className="text-gray-500">Review your details before confirming.</p>
      </div>

      <div className="space-y-4 border-t border-b border-gray-100 py-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Service</span>
          <span className="font-bold text-lg capitalize">{booking.service}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Category</span>
          <span className="font-bold text-lg capitalize">{booking.category}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Scope</span>
          <span className="font-bold text-lg">{booking.quantity} {booking.service === 'web' ? 'Pages' : (booking.service === 'video' ? 'Seconds' : 'Looks')}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Date</span>
          <span className="font-bold text-lg">{booking.date?.toLocaleDateString() || 'Not selected'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Location</span>
          <span className="font-bold text-lg">{booking.location}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-500 text-sm">Estimated Total</span>
          <span className="font-serif font-bold text-3xl text-fashion-purple">${calculateTotal(booking).toLocaleString()}</span>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-2">Brief Preview</h4>
        <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl italic">"{booking.brief}"</p>
      </div>
    </div>
  );

  // Render Helper
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderServiceStep();
      case 1: return renderCategoryStep();
      case 2: return renderScopeStep();
      case 3: return renderLogisticsStep();
      case 4: return renderBriefStep();
      case 5: return renderReviewStep();
      default: return null;
    }
  };

  // Step Titles
  const TITLES = [
    { title: "Select Service", sub: "What type of content do you need?" },
    { title: "Choose Style", sub: "Pick a category that matches your vision." },
    { title: "Define Scope", sub: "How much content do you need?" },
    { title: "Logistics", sub: "When and where should we shoot?" },
    { title: "Creative Brief", sub: "Tell us about your vision." },
    { title: "Review", sub: "Confirm your booking details." },
  ];

  return (
    <div className="bg-[#FBF8F5] min-h-screen pb-32 md:pb-24 pt-20">
      
      {/* Progress Header */}
      <div className="fixed top-20 left-0 right-0 z-30 bg-[#FBF8F5]/95 backdrop-blur-sm border-b border-gray-200/50 transition-all">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            <span>Step {currentStep + 1} of 6</span>
            <span>{Math.round(((currentStep + 1) / 6) * 100)}% Complete</span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-fashion-black transition-all duration-500 ease-out" 
              style={{ width: `${((currentStep + 1) / 6) * 100}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 pt-20 max-w-4xl">
        {/* Header Text */}
        <div className="text-center mb-10 md:mb-12">
          <FadeIn key={`title-${currentStep}`}>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">{TITLES[currentStep].title}</h1>
            <p className="text-gray-500 text-lg">{TITLES[currentStep].sub}</p>
          </FadeIn>
        </div>

        {/* Layout Grid: Main + Summary Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <FadeIn key={`step-${currentStep}`}>
              {renderStepContent()}
            </FadeIn>
          </div>

          {/* Desktop Sidebar Summary */}
          <div className="hidden lg:block sticky top-40">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-serif font-bold text-xl mb-6">Booking Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Service</span>
                  <span className="text-sm font-bold capitalize">{booking.service || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Category</span>
                  <span className="text-sm font-bold capitalize">{booking.category || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Quantity</span>
                  <span className="text-sm font-bold">{booking.quantity}</span>
                </div>
                {booking.date && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Date</span>
                    <span className="text-sm font-bold">{booking.date.toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Est. Total</span>
                  <span className="font-serif font-bold text-2xl">${calculateTotal(booking).toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-2">*Final quote may vary based on brief.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Sticky Footer / Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 lg:hidden pb-safe">
        
        {/* Collapsible Summary Drawer */}
        {isSummaryOpen && (
          <div className="absolute bottom-full left-0 right-0 bg-white border-t border-gray-200 p-6 rounded-t-2xl shadow-2xl animate-in slide-in-from-bottom-10 mb-[-1px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif font-bold text-xl">Summary</h3>
              <button onClick={() => setIsSummaryOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={16} /></button>
            </div>
            <div className="space-y-3 mb-4 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-bold capitalize">{booking.service || '-'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Category</span><span className="font-bold capitalize">{booking.category || '-'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Quantity</span><span className="font-bold">{booking.quantity}</span></div>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="font-bold text-gray-400 uppercase tracking-wider text-xs">Total</span>
              <span className="font-serif font-bold text-2xl">${calculateTotal(booking).toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="p-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50">
            <ArrowLeft size={20} />
          </button>
          
          <button 
            onClick={() => setIsSummaryOpen(!isSummaryOpen)}
            className="flex-1 flex flex-col items-start justify-center px-4 py-1.5 bg-gray-50 rounded-xl border border-gray-200"
          >
            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Total</span>
            <div className="flex items-center gap-1">
              <span className="font-serif font-bold text-lg leading-none">${calculateTotal(booking).toLocaleString()}</span>
              {isSummaryOpen ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronUp size={14} className="text-gray-400" />}
            </div>
          </button>

          <Button 
            onClick={handleNext} 
            disabled={!canProceed()} 
            variant="primary" 
            className="flex-1 h-[52px] text-sm" // Large touch target
          >
            {currentStep === 5 ? 'Confirm' : 'Next'} <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Desktop Sticky Footer (Back/Next only) */}
      <div className="hidden lg:block fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 py-4 z-40">
        <div className="container mx-auto px-6 flex justify-between items-center max-w-4xl">
          <Button onClick={handleBack} variant="ghost" className="text-gray-500 hover:text-black">
            <ArrowLeft size={16} className="mr-2" /> Back
          </Button>
          <Button onClick={handleNext} disabled={!canProceed()} variant="primary" className="px-12">
            {currentStep === 5 ? 'Confirm Booking' : 'Next Step'} <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>

    </div>
  );
};

// Helper Icon
function CheckCircle({ size = 24, className = "" }: { size?: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
