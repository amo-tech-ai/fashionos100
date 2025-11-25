
import React from 'react';
import { Sparkles, Clock } from 'lucide-react';
import { Button } from '../../Button';
import { EventCard } from '../EventCard';
import { WizardState, transformToEventCard } from './types';

interface WizardReviewProps {
  data: WizardState;
  onEdit: () => void;
  onPublish: () => void;
}

export const WizardReview: React.FC<WizardReviewProps> = ({ data, onEdit, onPublish }) => {
  const potentialRevenue = data.tickets.reduce((acc, t) => acc + (t.price * t.quantity), 0);

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-serif font-bold mb-8 text-center">Review & Publish</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Visual Preview */}
        <div>
          <div className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
            <Sparkles size={14} className="text-purple-500" /> Live Preview
          </div>
          <div className="max-w-md mx-auto lg:mx-0 sticky top-24">
            <EventCard event={transformToEventCard(data)} />
            <p className="text-xs text-center text-gray-400 mt-4">
              This is how your event will appear in the directory.
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Data Breakdown */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
          {/* Basic Info */}
          <div className="border-b border-gray-100 pb-6">
            <h3 className="font-serif font-bold text-2xl mb-2 text-gray-900">{data.title || "Untitled Event"}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{data.description || "No description provided."}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">{data.startDate?.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) || "TBD"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Time</span>
                <span className="font-medium">
                  {data.startDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {data.endDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Location</span>
                <span className="font-medium text-right">{data.location || "TBD"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Target Audience</span>
                <span className="font-medium text-right">{data.targetAudience || "General"}</span>
              </div>
            </div>
          </div>

          {/* Ticket Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Ticket Configuration</h4>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              {data.tickets.map((t, i) => (
                <div key={i} className="flex justify-between text-sm mb-2 last:mb-0">
                  <span className="font-medium">{t.name}</span>
                  <span className="text-gray-600">{t.quantity} x <span className="font-bold text-gray-900">${t.price}</span></span>
                </div>
              ))}
              <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between text-sm font-bold text-green-600">
                <span>Potential Revenue</span>
                <span>${potentialRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Schedule Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Run of Show</h4>
            <div className="space-y-3">
              {data.schedule.length > 0 ? (
                data.schedule.map((item, idx) => (
                  <div key={idx} className="flex gap-4 text-sm">
                    <span className="font-mono font-bold text-purple-600 w-16 text-right">{item.time}</span>
                    <span className="text-gray-700 font-medium">{item.activity}</span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400 italic">No schedule items added.</div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" fullWidth onClick={onEdit}>Edit Details</Button>
            <Button variant="primary" fullWidth onClick={onPublish}>Publish Event</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
