
import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, Mail, Plus, Calendar, User, Send, Loader2 } from 'lucide-react';
import { Button } from '../Button';
import { Textarea } from '../forms/Textarea';
import { Select } from '../forms/Select';
import { SponsorInteraction } from '../../types/sponsorship';
import { sponsorService } from '../../lib/sponsor-service';
import { useToast } from '../Toast';
import { FadeIn } from '../FadeIn';

interface SponsorInteractionFeedProps {
  sponsorId: string;
}

export const SponsorInteractionFeed: React.FC<SponsorInteractionFeedProps> = ({ sponsorId }) => {
  const [interactions, setInteractions] = useState<SponsorInteraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error } = useToast();

  // New Interaction Form State
  const [newType, setNewType] = useState<string>('note');
  const [newSummary, setNewSummary] = useState('');
  const [newDetails, setNewDetails] = useState('');

  useEffect(() => {
    loadInteractions();
  }, [sponsorId]);

  const loadInteractions = async () => {
    setLoading(true);
    try {
      const data = await sponsorService.getInteractions(sponsorId);
      setInteractions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSummary.trim()) return;

    setIsSubmitting(true);
    try {
      await sponsorService.addInteraction({
        sponsor_id: sponsorId,
        type: newType as any,
        summary: newSummary,
        details: newDetails
      });
      success("Activity logged");
      setNewSummary('');
      setNewDetails('');
      loadInteractions();
    } catch (e) {
      console.error(e);
      error("Failed to log activity");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail size={16} />;
      case 'call': return <Phone size={16} />;
      case 'meeting': return <Calendar size={16} />;
      default: return <MessageSquare size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-50 text-blue-600';
      case 'call': return 'bg-green-50 text-green-600';
      case 'meeting': return 'bg-purple-50 text-purple-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Add Activity Form */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Log Activity</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
             <div className="w-40">
                <Select 
                   options={[
                     { label: 'Note', value: 'note' },
                     { label: 'Email', value: 'email' },
                     { label: 'Call', value: 'call' },
                     { label: 'Meeting', value: 'meeting' }
                   ]}
                   value={newType}
                   onChange={(e) => setNewType(e.target.value)}
                   className="bg-gray-50"
                />
             </div>
             <div className="flex-1">
                <input 
                  placeholder="Summary (e.g. Discussed Q4 budget)"
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-500 transition-all"
                />
             </div>
          </div>
          
          <Textarea 
             placeholder="Additional details..."
             value={newDetails}
             onChange={(e) => setNewDetails(e.target.value)}
             className="bg-gray-50 h-24"
          />

          <div className="flex justify-end">
            <Button type="submit" size="sm" variant="primary" disabled={isSubmitting || !newSummary} className="gap-2">
               {isSubmitting ? <Loader2 size={14} className="animate-spin"/> : <Send size={14}/>} Log Activity
            </Button>
          </div>
        </form>
      </div>

      {/* Timeline */}
      <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
         {loading ? (
             <div className="text-center py-8 text-gray-400 text-sm">Loading history...</div>
         ) : interactions.length === 0 ? (
             <div className="text-center py-8 text-gray-400 text-sm">No interactions recorded yet.</div>
         ) : (
             interactions.map((item) => (
                 <FadeIn key={item.id}>
                    <div className="relative flex gap-4">
                        <div className={`w-10 h-10 rounded-full border border-white shadow-sm flex items-center justify-center shrink-0 z-10 ${getTypeColor(item.type)}`}>
                            {getTypeIcon(item.type)}
                        </div>
                        <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-gray-900 text-sm">{item.author_name}</span>
                                <span className="text-xs text-gray-400">{new Date(item.created_at).toLocaleString()}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-800 mb-1">{item.summary}</p>
                            {item.details && <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-wrap">{item.details}</p>}
                        </div>
                    </div>
                 </FadeIn>
             ))
         )}
      </div>
    </div>
  );
};
