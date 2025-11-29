
import React, { useState, useRef, useEffect } from 'react';
import { Calendar, MapPin, CheckCircle2, ExternalLink, AlertCircle, Sparkles, Clock, Search, X, Users, Mail, Phone, User } from 'lucide-react';
import { CalendarPicker } from '../../CalendarPicker';
import { WizardState } from './types';
import { Button } from '../../Button';
import { LoadingSpinner } from '../../LoadingSpinner';
import { Input } from '../../forms/Input';
import { aiService } from '../../../lib/ai-service';

interface WizardVenueProps {
  data: WizardState;
  updateData: (updates: Partial<WizardState>) => void;
}

interface VenueCandidate {
  name: string;
  address: string;
  place_id?: string;
  type?: string;
  estimated_capacity?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_name?: string;
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
  
  // Search State
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<VenueCandidate[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Scheduler State
  const [showScheduler, setShowScheduler] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [venueConstraints, setVenueConstraints] = useState('');
  const [talentSchedules, setTalentSchedules] = useState('');
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleVenueSearch = async () => {
    if (!data.location.trim()) return;
    setIsSearching(true);
    setSearchError(null);
    setCandidates([]);
    setShowSuggestions(true);

    try {
      const result = await aiService.resolveVenue(data.location);

      if (result.success && result.data?.candidates && result.data.candidates.length > 0) {
        setCandidates(result.data.candidates);
      } else {
        setSearchError("No venues found. Try a different search term.");
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Search failed", error);
      setSearchError("Search service unavailable.");
      setShowSuggestions(false);
    } finally {
      setIsSearching(false);
    }
  };

  const selectVenue = (candidate: VenueCandidate) => {
    updateData({
      location: candidate.name,
      venueAddress: candidate.address,
      venueCapacity: candidate.estimated_capacity,
      venueContactName: candidate.contact_name,
      venueContactEmail: candidate.contact_email,
      venueContactPhone: candidate.contact_phone,
      mapsPlaceId: candidate.place_id,
      mapsUri: candidate.place_id 
        ? `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${candidate.place_id}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(candidate.name + ' ' + candidate.address)}`
    });
    setShowSuggestions(false);
    setSearchError(null);
  };

  const handleOptimizeSchedule = async () => {
    if (!venueConstraints && !talentSchedules) return;
    setIsOptimizing(true);
    setOptimizationResult(null);

    try {
      const result = await aiService.scheduleOptimizer({
        eventDetails: {
          title: data.title,
          category: data.category,
          targetAudience: data.targetAudience
        },
        venueConstraints,
        talentSchedules
      });

      if (result.success && result.data) {
        setOptimizationResult(result.data);
      } else {
        throw new Error(result.error || "Optimization failed");
      }

    } catch (error) {
      console.error("Optimization failed", error);
      alert("Failed to optimize schedule. Please try again.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const applySlot = (slot: { date: string, start_time: string, end_time: string }) => {
    const dateParts = slot.date.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; 
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
        
        {/* Date Picker Section */}
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

        {/* Venue Search Section */}
        <div className="space-y-2" ref={wrapperRef}>
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Venue / Location</label>
          
          <div className="relative">
            <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-purple-100 focus-within:border-purple-400 transition-all">
              <MapPin className={data.mapsUri ? "text-green-500" : "text-gray-400"} size={20} />
              <input 
                type="text" 
                value={data.location}
                onChange={(e) => {
                  updateData({ location: e.target.value });
                  setSearchError(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleVenueSearch()}
                className="flex-1 outline-none bg-transparent"
                placeholder="Search venue (e.g. 'Rooftop in Brooklyn')"
              />
              
              {/* Action Button: Clear if Verified, Search otherwise */}
              {data.mapsUri ? (
                <button 
                  onClick={() => updateData({ location: '', mapsUri: undefined, venueAddress: '', venueCapacity: '', venueContactName: '', venueContactEmail: '', venueContactPhone: '', mapsPlaceId: undefined })}
                  className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
                >
                  <X size={16} />
                </button>
              ) : (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-purple-600 hover:bg-purple-50 h-8 px-3 gap-2"
                  onClick={handleVenueSearch}
                  disabled={isSearching || !data.location}
                >
                  {isSearching ? <LoadingSpinner size={14} /> : <Search size={14} />}
                  Search
                </Button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && candidates.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto animate-in fade-in zoom-in-95">
                <div className="p-2">
                  <p className="text-[10px] font-bold uppercase text-gray-400 px-2 py-1">Suggestions (AI Enhanced)</p>
                  {candidates.map((venue, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectVenue(venue)}
                      className="w-full text-left px-3 py-2.5 hover:bg-purple-50 rounded-lg transition-colors group"
                    >
                      <p className="font-bold text-sm text-gray-800 group-hover:text-purple-700">{venue.name}</p>
                      <p className="text-xs text-gray-500 truncate">{venue.address}</p>
                      <div className="flex gap-2 mt-1">
                        {venue.estimated_capacity && <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{venue.estimated_capacity} cap</span>}
                        {venue.type && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">{venue.type}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Verified State */}
            {data.mapsUri && (
              <div className="mt-3 bg-green-50 border border-green-100 rounded-xl p-3 animate-in slide-in-from-top-2">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-green-700 flex items-center gap-1">
                    <CheckCircle2 size={14} /> Verified Location {data.mapsPlaceId && '(Place ID Stored)'}
                  </p>
                  <a 
                    href={data.mapsUri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-green-600 underline hover:text-green-800 flex items-center gap-1"
                  >
                    View Map <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            )}

            {/* Error State */}
            {searchError && (
              <div className="mt-2 flex items-center gap-2 text-xs text-red-500 bg-red-50 p-2 rounded-lg animate-in fade-in">
                <AlertCircle size={14} />
                {searchError}
              </div>
            )}
          </div>
        </div>

        {/* Expanded Venue Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-50">
            <Input 
              label="Full Address"
              value={data.venueAddress || ''}
              onChange={(e) => updateData({ venueAddress: e.target.value })}
              placeholder="123 Fashion Ave, NY"
              className="md:col-span-2"
            />
            <Input 
              label="Capacity"
              value={data.venueCapacity || ''}
              onChange={(e) => updateData({ venueCapacity: e.target.value })}
              placeholder="e.g. 500 standing"
              icon={<Users size={14} />}
            />
            <Input 
              label="Contact Name"
              value={data.venueContactName || ''}
              onChange={(e) => updateData({ venueContactName: e.target.value })}
              placeholder="Manager Name"
              icon={<User size={14} />}
            />
            <Input 
              label="Contact Email"
              value={data.venueContactEmail || ''}
              onChange={(e) => updateData({ venueContactEmail: e.target.value })}
              placeholder="events@venue.com"
              icon={<Mail size={14} />}
            />
            <Input 
              label="Contact Phone"
              value={data.venueContactPhone || ''}
              onChange={(e) => updateData({ venueContactPhone: e.target.value })}
              placeholder="+1 234 567 890"
              icon={<Phone size={14} />}
            />
        </div>

      </div>
    </div>
  );
};
