
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight, Sparkles, MapPin, Monitor, Calendar as CalendarIcon, Clock, Sun, Zap } from 'lucide-react';
import { CalendarPicker } from '../../../components/CalendarPicker';

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

export const StepSchedule: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);

  // AI Logic Mock
  const getBestTimeBadge = (time: string) => {
    if (time === "10:00 AM") return { label: "Best Lighting", icon: Sun, color: "text-amber-600 bg-amber-50" };
    if (time === "02:00 PM") return { label: "Fastest Turnaround", icon: Zap, color: "text-purple-600 bg-purple-50" };
    return null;
  };

  return (
    <FadeIn>
      <div className="max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-4">Schedule Shoot</h1>
        <p className="text-gray-500 text-lg mb-10">
          Choose a time for your production. AI suggests slots based on studio lighting and crew availability.
        </p>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 2. Date Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 block">Select Date</label>
              <div 
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-3 h-64 ${
                  state.date ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-purple-200'
                }`}
                onClick={() => setShowCalendar(true)}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <CalendarIcon size={24} className={state.date ? "text-black" : "text-gray-400"} />
                </div>
                {state.date ? (
                  <div>
                    <p className="text-2xl font-serif font-bold">{state.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                    <p className="text-sm text-gray-500">{state.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric' })}</p>
                  </div>
                ) : (
                  <p className="font-bold text-gray-500">Choose a Date</p>
                )}
              </div>
              
              {/* Popover Calendar */}
              {showCalendar && (
                <div className="absolute z-20 mt-2 shadow-2xl rounded-2xl">
                  <CalendarPicker 
                    initialStart={state.date} 
                    initialEnd={null}
                    minDate={new Date()}
                    onClose={() => setShowCalendar(false)}
                    onApply={(d) => {
                      updateState({ date: d });
                      setShowCalendar(false);
                    }}
                  />
                </div>
              )}
            </div>

            {/* 3. Time Slot Selection */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Available Slots</label>
                <div className="flex items-center gap-1 text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                  <Sparkles size={10} /> AI Recommendations Active
                </div>
              </div>
              
              <div className="space-y-3 h-64 overflow-y-auto pr-2 custom-scrollbar">
                {TIME_SLOTS.map((time) => {
                  const aiRec = getBestTimeBadge(time);
                  const isSelected = state.time === time;
                  
                  return (
                    <button
                      key={time}
                      onClick={() => updateState({ time })}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex justify-between items-center group ${
                        isSelected 
                          ? 'border-black bg-black text-white shadow-md' 
                          : 'border-gray-100 bg-white hover:border-purple-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Clock size={16} className={isSelected ? "text-gray-400" : "text-gray-300"} />
                        <span className={`font-bold ${isSelected ? 'text-white' : 'text-gray-700'}`}>{time}</span>
                      </div>
                      
                      {aiRec && !isSelected && (
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full flex items-center gap-1 ${aiRec.color}`}>
                          <aiRec.icon size={10} /> {aiRec.label}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Summary Card */}
        {state.date && state.time && (
          <FadeIn>
             <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex justify-between items-center mb-8">
                <div className="flex gap-4 items-center">
                   <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <CalendarIcon size={20} />
                   </div>
                   <div>
                      <p className="font-bold text-sm text-gray-900">Slot Reserved</p>
                      <p className="text-xs text-gray-500">{state.date.toLocaleDateString()} at {state.time}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-xs font-bold uppercase text-gray-400">Duration</p>
                   <p className="font-bold text-sm text-gray-900">~4 Hours</p>
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
          >
            Next: Review <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};
