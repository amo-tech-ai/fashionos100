import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle2, ExternalLink, AlertCircle, Sparkles, Clock } from 'lucide-react';
import { CalendarPicker } from '../../CalendarPicker';
import { WizardState } from './types';
import { Button } from '../../Button';
import { supabaseUrl, supabaseAnonKey } from '../../../lib/supabase';
import { LoadingSpinner } from '../../LoadingSpinner';
import { Input } from '../../forms/Input';

interface WizardVenueProps {
  data: WizardState;
  updateData: (updates: Partial<WizardState>) => void;
}

interface OptimizationResult {
  thought_process: string;
  suggested_slots: {
    date: string;
    start_time: string;
    end_time: string;
    confidence_score: number;
    reason: string;
  }[];
}

export const WizardVenue: React.FC<WizardVenueProps> = ({ data, updateData }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  
  // Scheduler State
  const [showScheduler, setShowScheduler] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [venueConstraints, setVenueConstraints] = useState('');
  const [talentSchedules, setTalentSchedules] = useState('');
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);

  const handleVerifyLocation = async () => {
    if (!data.location.trim()) return;
    setIsVerifying(true);
    setVerifyError(null);

    try {
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Missing Supabase configuration");
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/resolve-venue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({ venueText: data.location })
      });

      const result = await response.json();

      if (result.success && result.data) {
        updateData({
          location: result.data.location,
          mapsUri: result.data.googleMapsUri,
          mapsSources: result.data.sources
        });
      } else {
        setVerifyError("Could not verify location. Please try a more specific address.");
      }
    } catch (error) {
      console.error("Verification failed", error);
      setVerifyError("Verification service unavailable (Backend not connected).");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOptimizeSchedule = async () => {
    if (!venueConstraints && !talentSchedules) return;
    setIsOptimizing(true);
    setOptimizationResult(null);

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/schedule-optimizer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          eventDetails: {
            title: data.title,
            category: data.category,
            targetAudience: data.targetAudience
          },
          venueConstraints,
          talentSchedules,
          deadline: "2025-12-31" // Default or add input for deadline
        })
      });

      const result = await response.json();
      if (result.error) throw new Error(result.error);
      setOptimizationResult(result);

    } catch (error) {
      console.error("Optimization failed", error);
      alert("Failed to optimize schedule. Please try again.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const applySlot = (slot: { date: string, start_time: string, end_time: string }) => {
    // Parse date string YYYY-MM-DD
    const dateParts = slot.date.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed
    const day = parseInt(dateParts[2]);

    const startDate = new Date(year, month, day);
    const endDate = new Date(year, month, day);

    updateData({ 
      startDate: startDate,
      endDate: endDate
    });
    
    setShowScheduler(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-serif font-bold mb-6">Time & Location</h2>
      <div className="space-y-6">
        
        <div className="space-y-2 relative">
          <div className="flex justify-between items-end">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Date & Time</label>
            <button 
              onClick={() => setShowScheduler(!showScheduler)}
              className="text-[10px] font-bold uppercase tracking-widest text-purple-600 flex items-center gap-1 hover:text-purple-800 transition-colors"
            >
              <Sparkles size={12} />
              {showScheduler ? 'Hide Assistant' : 'AI Scheduler'}
            </button>
          </div>

          {/* AI Scheduler Panel */}
          {showScheduler && (
            <div className="mb-4 bg-purple-50 border border-purple-100 rounded-xl p-4 animate-in slide-in-from-top-2">
              <h3 className="text-sm font-bold text-purple-800 mb-2 flex items-center gap-2">
                <Clock size={16} /> Smart Schedule Optimizer
              </h3>
              <p className="text-xs text-purple-600 mb-4">
                Paste availability emails or notes. Gemini will reason through conflicts to find the best slots.
              </p>
              
              <div className="grid grid-cols-1 gap-3 mb-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-purple-400 mb-1 block">Venue Constraints</label>
                  <textarea 
                    value={venueConstraints}
                    onChange={(e) => setVenueConstraints(e.target.value)}
                    placeholder="e.g. Available Mon-Fri after 6pm, Weekends all day..."
                    className="w-full p-2 text-xs border border-purple-200 rounded-lg focus:outline-none focus:border-purple-400 bg-white h-16 resize-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-purple-400 mb-1 block">Model/Talent Schedules</label>
                  <textarea 
                    value={talentSchedules}
                    onChange={(e) => setTalentSchedules(e.target.value)}
                    placeholder="e.g. Lead model traveling June 10-15. Photographer only free Tuesdays..."
                    className="w-full p-2 text-xs border border-purple-200 rounded-lg focus:outline-none focus:border-purple-400 bg-white h-16 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  variant="accent" 
                  onClick={handleOptimizeSchedule}
                  disabled={isOptimizing || (!venueConstraints && !talentSchedules)}
                  className="text-xs h-8 px-4"
                >
                  {isOptimizing ? <LoadingSpinner size={12} /> : <Sparkles size={12} className="mr-1" />}
                  Find Best Slots
                </Button>
              </div>

              {/* AI Reasoning Output */}
              {optimizationResult && (
                <div className="mt-4 pt-4 border-t border-purple-200/50">
                  <div className="bg-white rounded-lg p-3 mb-3 border border-purple-100">
                    <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">AI Reasoning</p>
                    <p className="text-xs text-gray-600 italic leading-relaxed">"{optimizationResult.thought_process}"</p>
                  </div>

                  <p className="text-[10px] font-bold uppercase text-gray-400 mb-2">Suggested Options</p>
                  <div className="space-y-2">
                    {optimizationResult.suggested_slots.map((slot, i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center hover:border-purple-300 transition-colors group cursor-pointer" onClick={() => applySlot(slot)}>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-gray-800">{slot.date}</span>
                            <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">{slot.confidence_score}% Match</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{slot.start_time} - {slot.end_time} • {slot.reason}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          Apply
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

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
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-purple-100 focus-within:border-purple-400 transition-all">
              <MapPin className={data.mapsUri ? "text-green-500" : "text-gray-400"} size={20} />
              <input 
                type="text" 
                value={data.location}
                onChange={(e) => {
                  // Reset verification if user types
                  updateData({ 
                    location: e.target.value, 
                    mapsUri: undefined, 
                    mapsSources: undefined 
                  });
                  setVerifyError(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleVerifyLocation()}
                className="flex-1 outline-none bg-transparent"
                placeholder="e.g. 123 Fashion Ave, NYC"
              />
              {data.mapsUri ? (
                <CheckCircle2 size={20} className="text-green-500 animate-in zoom-in" />
              ) : (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-purple-600 hover:bg-purple-50 h-8 px-3"
                  onClick={handleVerifyLocation}
                  disabled={isVerifying || !data.location}
                >
                  {isVerifying ? <LoadingSpinner size={14} /> : 'Verify'}
                </Button>
              )}
            </div>

            {/* Verification Status & Attribution */}
            {data.mapsUri && (
              <div className="bg-green-50 border border-green-100 rounded-xl p-3 animate-in slide-in-from-top-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-green-700 flex items-center gap-1 mb-1">
                      <CheckCircle2 size={12} /> Verified Location
                    </p>
                    <a 
                      href={data.mapsUri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-green-600 underline hover:text-green-800 flex items-center gap-1"
                    >
                      Open in Google Maps <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
                
                {/* Mandatory Attribution */}
                {data.mapsSources && data.mapsSources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-green-200/50">
                    <p className="text-[10px] text-gray-500 mb-1">Data from Google Maps:</p>
                    <ul className="space-y-0.5">
                      {data.mapsSources.map((source, i) => (
                        <li key={i} className="text-[10px]">
                          <a 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-700 underline"
                          >
                            {source.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Error State */}
            {verifyError && (
              <div className="flex items-center gap-2 text-xs text-red-500 bg-red-50 p-2 rounded-lg animate-in fade-in">
                <AlertCircle size={14} />
                {verifyError}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}