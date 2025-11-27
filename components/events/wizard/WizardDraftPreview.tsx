
import React from 'react';
import { 
  Calendar, MapPin, Users, ArrowRight, Edit3, Sparkles, 
  CheckCircle2, RefreshCw, Clock, Ticket
} from 'lucide-react';
import { Button } from '../../Button';
import { FadeIn } from '../../FadeIn';
import { WizardState } from './types';

interface WizardDraftPreviewProps {
  data: WizardState;
  onContinue: () => void;
  onRegenerate: () => void;
  onEdit: () => void;
}

export const WizardDraftPreview: React.FC<WizardDraftPreviewProps> = ({ 
  data, onContinue, onRegenerate, onEdit 
}) => {
  
  const totalTickets = data.tickets.reduce((acc, t) => acc + t.quantity, 0);
  const minPrice = data.tickets.length > 0 ? Math.min(...data.tickets.map(t => t.price)) : 0;

  return (
    <div className="max-w-3xl mx-auto pt-6 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-green-100 shadow-sm">
          <Sparkles size={12} className="fill-green-200" /> AI Blueprint Ready
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
          Your Event Draft
        </h1>
        <p className="text-gray-500 max-w-md mx-auto text-lg">
          Gemini has structured your vision. Review the blueprint below before we finalize the details.
        </p>
      </div>

      {/* Main Blueprint Card */}
      <div className="bg-white rounded-[2rem] border border-gray-200 shadow-xl overflow-hidden relative mb-8 group">
        {/* Decorative gradient top bar */}
        <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
        
        <div className="p-8 md:p-10">
          {/* Title & Category */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 border-b border-gray-100 pb-8">
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2 block">
                {data.category || 'Event'}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
                {data.title}
              </h2>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                  <Calendar size={14} className="text-gray-400" /> 
                  {data.startDate ? data.startDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Date TBD'}
                </span>
                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                  <MapPin size={14} className="text-gray-400" /> 
                  {data.location || 'Location TBD'}
                </span>
              </div>
            </div>
            <div className="text-right">
               {/* Style Tags Pilled */}
               <div className="flex flex-wrap gap-2 justify-end max-w-xs">
                  {data.brandMoods.slice(0, 3).map((mood, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase bg-black text-white px-2 py-1 rounded-md">
                      {mood}
                    </span>
                  ))}
               </div>
            </div>
          </div>

          {/* Description Accordion (Always open) */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
              Concept Summary
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              {data.description}
            </p>
          </div>

          {/* Grid of Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Schedule Preview */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Clock size={14} /> Suggested Schedule
              </h4>
              <div className="space-y-3">
                {data.schedule.length > 0 ? data.schedule.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="font-mono font-bold text-gray-900 w-12 text-right">{item.time}</span>
                    <span className="text-gray-600 truncate">{item.activity}</span>
                  </div>
                )) : <span className="text-gray-400 text-xs italic">No schedule generated</span>}
              </div>
            </div>

            {/* Ticket Preview */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Ticket size={14} /> Ticket Structure
              </h4>
              <div className="space-y-3">
                {data.tickets.length > 0 ? data.tickets.map((t, i) => (
                  <div key={i} className="flex justify-between text-sm items-center">
                    <span className="text-gray-700 font-medium">{t.name}</span>
                    <span className="text-gray-900 font-bold bg-white px-2 py-0.5 rounded shadow-sm border border-gray-100">
                      ${t.price.toLocaleString()}
                    </span>
                  </div>
                )) : <span className="text-gray-400 text-xs italic">No tickets configured</span>}
                <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between text-xs text-gray-500">
                  <span>Total Cap: {totalTickets}</span>
                  <span>Starts at ${minPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

          </div>

          {/* AI Reasoning Footnote */}
          <div className="bg-blue-50 rounded-xl p-3 flex gap-3 items-start text-xs text-blue-700 border border-blue-100">
            <Sparkles size={14} className="mt-0.5 shrink-0" />
            <p>
              <strong>AI Insight:</strong> Based on your description of "{data.category}", I've suggested a {data.targetAudience || 'General'} audience structure. The schedule includes standard run-of-show blocks.
            </p>
          </div>

        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <Button 
          variant="ghost" 
          className="text-gray-500 hover:text-gray-900"
          onClick={onRegenerate}
        >
          <RefreshCw size={16} className="mr-2" /> Regenerate
        </Button>
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="outline" 
            size="lg"
            className="flex-1 md:flex-none"
            onClick={onEdit}
          >
            <Edit3 size={16} className="mr-2" /> Tweaks
          </Button>
          <Button 
            variant="primary" 
            size="lg" 
            className="flex-1 md:flex-none shadow-xl shadow-purple-500/20"
            onClick={onContinue}
          >
            Continue to Editor <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>

    </div>
  );
};
