
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight, Sparkles, MapPin, Monitor, Calendar as CalendarIcon, Clock, Sun, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { CalendarPicker } from '../../../components/CalendarPicker';

// Mock Logic to generate availability based on date
const getAvailabilityForDate = (date: Date) => {
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
  
  // Base slots
  const allSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", 
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"
  ];

  // Simulate varying availability
  // Weekends have sparse availability, weekdays are fuller
  const availabilityChance = isWeekend ? 0.4 : 0.9;
  
  return allSlots.filter(() => Math.random() < availabilityChance);
};

// AI Logic to recommend slots
const getAIRecommendations = (slots: string[]) => {
  const recs: Record<string, { label: string; icon: any; color: string }> = {};
  
  slots.forEach(time => {
    const hour = parseInt(time.split(':')[0]);
    const isPM = time.includes('PM');
    const actualHour = (hour === 12 ? 0 : hour) + (isPM ? 12 : 0);

    // Morning Golden Hour (9-11 AM)
    if (actualHour >= 9 && actualHour <= 11) {
      if (Math.random() > 0.5) {
        recs[time] = { label: "Best Natural Light", icon: Sun, color: "text-amber-600 bg-amber-50 border-amber-100" };
      }
    }
    
    // Early Afternoon (1-3 PM) - Efficient
    if (actualHour >= 13 && actualHour <= 15) {
      if (Math.random() > 0.7) {
        recs[time] = { label: "Fastest Turnaround", icon: Zap, color: "text-purple-600 bg-purple-50 border-purple-100" };
      }
    }

    // Late Afternoon (3-4 PM) - Quiet
    if (actualHour >= 15) {
      if (Math.random() > 0.6) {
        recs[time] = { label: "Quiet Studio", icon: Sparkles, color: "text-blue-600 bg-blue-50 border-blue-100" };
      }
    }
  });

  return recs;
};

export const StepSchedule: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Record<string, any>>({});

  // Simulate AI Analysis when date changes
  useEffect(() => {
    if (state.date) {
      setIsAnalyzing(true);
      setAvailableSlots([]); // Clear previous
      
      // Fake network/processing delay
      const timer = setTimeout(() => {
        const slots = getAvailabilityForDate(state.date!);
        const recs = getAIRecommendations(slots);
        
        setAvailableSlots(slots);
        setRecommendations(recs);
        setIsAnalyzing(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [state.date]);

  return (
    <FadeIn>
      <div className="max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-4">Schedule Shoot</h1>
          <p className="text-gray-500 text-lg">
            Choose a time for your production. AI analyzes studio traffic and lighting to suggest optimal slots.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
          
          {/* 1. Fulfillment Type Tabs */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-8 w-fit">
            <button
              onClick={() => updateState({ fulfillmentType: 'virtual' })}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                state.fulfillmentType === 'virtual' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Monitor size={16} /> Virtual Studio
            </button>
            <button
              onClick={() => updateState({ fulfillmentType: 'location' })}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                state.fulfillmentType === 'location' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <MapPin size={16} /> On-Location
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 2. Date Selection */}
            <div className="lg:col-span-5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 block">Select Date</label>
              <div 
                className={`relative p-8 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-4 h-80 group ${
                  state.date ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-purple-200 hover:bg-purple-50/30'
                }`}
                onClick={() => setShowCalendar(true)}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-sm transition-colors ${
                   state.date ? 'bg-black text-white' : 'bg-white text-gray-400 group-hover:text-purple-500'
                }`}>
                  <CalendarIcon size={28} />
                </div>
                {state.date ? (
                  <div className="animate-in fade-in zoom-in duration-300">
                    <p className="text-3xl font-serif font-bold text-gray-900">{state.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                    <p className="text-sm text-gray-500 font-medium mt-1">{state.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric' })}</p>
                    <p className="text-xs text-purple-600 font-bold mt-4 uppercase tracking-wider">Change Date</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Choose a Date</p>
                    <p className="text-sm text-gray-500 mt-1">Click to view availability</p>
                  </div>
                )}

                {/* Popover Calendar */}
                {showCalendar && (
                  <div className="absolute top-0 left-0 z-30 mt-2 shadow-2xl rounded-2xl animate-in fade-in zoom-in-95 origin-top-left" onClick={(e) => e.stopPropagation()}>
                    <CalendarPicker 
                      initialStart={state.date} 
                      initialEnd={null}
                      minDate={new Date()}
                      onClose={() => setShowCalendar(false)}
                      onApply={(d) => {
                        updateState({ date: d, time: '' }); // Reset time on date change
                        setShowCalendar(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 3. Time Slot Selection */}
            <div className="lg:col-span-7">
              <div className="flex justify-between items-center mb-4 h-6">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Available Slots</label>
                {state.date && !isAnalyzing && availableSlots.length > 0 && (
                   <div className="flex items-center gap-1.5 text-[10px] font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full animate-in fade-in">
                      <Sparkles size={12} /> AI Optimized
                   </div>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-2 h-80 overflow-y-auto custom-scrollbar relative">
                 {!state.date ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
                       <Clock size={32} className="opacity-20" />
                       <p className="text-sm">Please select a date first</p>
                    </div>
                 ) : isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-purple-600">
                       <Loader2 size={32} className="animate-spin" />
                       <div className="text-center">
                          <p className="text-sm font-bold">Analyzing Studio Schedule...</p>
                          <p className="text-xs text-purple-400 mt-1">Checking lighting conditions & crew availability</p>
                       </div>
                    </div>
                 ) : availableSlots.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
                       <p className="text-sm font-medium">No slots available on this date.</p>
                       <Button size="sm" variant="outline" onClick={() => setShowCalendar(true)}>Pick another date</Button>
                    </div>
                 ) : (
                    <div className="space-y-2 p-2">
                       {availableSlots.map((time, idx) => {
                          const rec = recommendations[time];
                          const isSelected = state.time === time;
                          return (
                            <button
                              key={time}
                              onClick={() => updateState({ time })}
                              className={`w-full p-4 rounded-xl border text-left transition-all flex justify-between items-center group animate-in slide-in-from-bottom-2 ${
                                isSelected 
                                  ? 'border-black bg-black text-white shadow-lg transform scale-[1.02]' 
                                  : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                              }`}
                              style={{ animationDelay: `${idx * 50}ms` }}
                            >
                              <div className="flex items-center gap-3">
                                {isSelected ? <CheckCircle2 size={18} className="text-white" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-300 group-hover:border-purple-400" />}
                                <span className={`font-bold ${isSelected ? 'text-white' : 'text-gray-700'}`}>{time}</span>
                              </div>
                              
                              {rec && !isSelected && (
                                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full flex items-center gap-1.5 border ${rec.color}`}>
                                  <rec.icon size={10} /> {rec.label}
                                </span>
                              )}
                            </button>
                          );
                       })}
                    </div>
                 )}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Summary Card */}
        {state.date && state.time && (
          <FadeIn>
             <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center mb-8 shadow-xl">
                <div className="flex gap-5 items-center mb-4 sm:mb-0">
                   <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                      <CheckCircle2 size={24} className="text-green-400" />
                   </div>
                   <div>
                      <p className="font-bold text-lg">Slot Reserved</p>
                      <p className="text-sm text-gray-400">
                         {state.date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })} at {state.time}
                      </p>
                   </div>
                </div>
                <div className="text-right flex items-center gap-6">
                   <div>
                       <p className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Duration</p>
                       <p className="font-bold text-lg">~4 Hours</p>
                   </div>
                   <div className="h-8 w-px bg-white/10"></div>
                   <div>
                       <p className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Location</p>
                       <p className="font-bold text-lg capitalize">{state.fulfillmentType}</p>
                   </div>
                </div>
             </div>
          </FadeIn>
        )}

        <div className="flex justify-end">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/start-project/review')}
            disabled={!state.date || !state.time}
            className="shadow-xl shadow-purple-500/20"
          >
            Next: Review <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};
