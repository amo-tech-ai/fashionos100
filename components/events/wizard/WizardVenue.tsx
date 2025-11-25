
import React, { useState } from 'react';
import { Calendar, MapPin, Loader2, CheckCircle2, ExternalLink, AlertCircle } from 'lucide-react';
import { CalendarPicker } from '../../CalendarPicker';
import { WizardState } from './types';
import { Button } from '../../Button';

interface WizardVenueProps {
  data: WizardState;
  updateData: (updates: Partial<WizardState>) => void;
}

export const WizardVenue: React.FC<WizardVenueProps> = ({ data, updateData }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const handleVerifyLocation = async () => {
    if (!data.location.trim()) return;
    setIsVerifying(true);
    setVerifyError(null);

    try {
      // Call the Supabase Edge Function
      // Ensure you have deployed the 'resolve-venue' function
      const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
      const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

      const response = await fetch(`${supabaseUrl}/functions/v1/resolve-venue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({ venueText: data.location })
      });

      const result = await response.json();

      if (result.success && result.data) {
        updateData({
          location: result.data.location, // Use the official Maps name
          mapsUri: result.data.googleMapsUri,
          mapsSources: result.data.sources
        });
      } else {
        setVerifyError("Could not verify location. Please try a more specific address.");
      }
    } catch (error) {
      console.error("Verification failed", error);
      // Fallback for demo purposes if backend is not connected
      setVerifyError("Verification service unavailable (Backend not connected).");
    } finally {
      setIsVerifying(false);
    }
  };

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
                  {isVerifying ? <Loader2 className="animate-spin" size={14} /> : 'Verify'}
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
};
