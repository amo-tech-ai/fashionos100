import React from 'react';
import { Sparkles } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif font-bold mb-8 text-center">Review & Publish</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Preview Card */}
        <div>
          <div className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
            <Sparkles size={14} className="text-purple-500" /> Live Preview
          </div>
          <div className="max-w-md mx-auto lg:mx-0">
            <EventCard event={transformToEventCard(data)} />
          </div>
        </div>

        {/* Summary Details */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">{data.title || "Untitled Event"}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{data.description || "No description provided."}</p>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="font-medium">{data.startDate?.toLocaleDateString() || "TBD"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Location</span>
              <span className="font-medium">{data.location || "TBD"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Category</span>
              <span className="font-medium">{data.category}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Ticket Summary</h4>
            {data.tickets.map((t, i) => (
              <div key={i} className="flex justify-between text-sm mb-2 last:mb-0">
                <span>{t.name}</span>
                <span className="font-bold text-gray-900">{t.quantity} x ${t.price}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between text-sm font-bold text-green-600">
              <span>Potential Revenue</span>
              <span>${potentialRevenue.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" fullWidth onClick={onEdit}>Edit Details</Button>
            <Button variant="primary" fullWidth onClick={onPublish}>Publish Event</Button>
          </div>
        </div>
      </div>
    </div>
  );
};