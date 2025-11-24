import React, { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { CalendarPicker } from '../../CalendarPicker';
import { WizardState } from './types';

interface WizardVenueProps {
  data: WizardState;
  updateData: (updates: Partial<WizardState>) => void;
}

export const WizardVenue: React.FC<WizardVenueProps> = ({ data, updateData }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-serif font-bold mb-6">Time & Location</h2>
      <div className="space-y-6">
        
        <div className="space-y-2 relative">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Date & Time</label>
          <div 
            className="w-full p-3 border border-gray-200 rounded-xl flex items-center gap-3 cursor-pointer hover:border-purple-400 transition-colors bg-gray-50/50"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <Calendar className="text-purple-600" size={20} />
            <span className="text-gray-700 font-medium">
              {data.startDate ? data.startDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select Date'}
            </span>
          </div>
          {showCalendar && (
            <div className="absolute top-full left-0 z-50 mt-2">
              <CalendarPicker 
                initialStart={data.startDate} 
                initialEnd={data.endDate}
                onClose={() => setShowCalendar(false)}
                onApply={(start, end) => {
                  updateData({ startDate: start, endDate: end });
                  setShowCalendar(false);
                }}
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Venue / Location</label>
          <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-purple-100 focus-within:border-purple-400 transition-all">
            <MapPin className="text-gray-400" size={20} />
            <input 
              type="text" 
              value={data.location}
              onChange={(e) => updateData({ location: e.target.value })}
              className="flex-1 outline-none bg-transparent"
              placeholder="e.g. 123 Fashion Ave, NYC"
            />
          </div>
        </div>

      </div>
    </div>
  );
};