
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { Button } from '../Button';
import { FadeIn } from '../FadeIn';
import { supabase, supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { slugify } from '../../lib/utils';

// Sub-components
import { WizardIntro } from './wizard/WizardIntro';
import { WizardBasics } from './wizard/WizardBasics';
import { WizardVenue } from './wizard/WizardVenue';
import { WizardTickets } from './wizard/WizardTickets';
import { WizardSchedule } from './wizard/WizardSchedule';
import { WizardReview } from './wizard/WizardReview';
import { WizardState, Step, MOCK_PREVIEW_IMAGE, CATEGORIES } from './wizard/types';
import { WizardSuccess } from './wizard/WizardSuccess';

export const EventWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(Step.INTRO);
  
  // AI Input State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiUrl, setAiUrl] = useState('');
  const [aiFile, setAiFile] = useState<File | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [state, setState] = useState<WizardState>({
    title: '',
    description: '',
    category: 'Runway',
    targetAudience: '',
    location: '',
    startDate: null,
    endDate: null,
    tickets: [{ name: 'General Admission', price: 50, quantity: 100 }],
    schedule: [{ time: '19:00', activity: 'Doors Open' }],
    image: MOCK_PREVIEW_IMAGE
  });

  const updateData = (updates: Partial<WizardState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Helper to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data:application/pdf;base64, prefix
        resolve(result.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });
  };

  // --- AI Integration ---

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim() && !aiUrl && !aiFile) return;
    setIsAiLoading(true);

    try {
      let fileBase64 = null;
      let fileType = null;

      if (aiFile) {
        fileBase64 = await fileToBase64(aiFile);
        fileType = aiFile.type;
      }

      // Call the backend Edge Function instead of client-side SDK
      const response = await fetch(`${supabaseUrl}/functions/v1/generate-event-draft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          prompt: aiPrompt,
          url: aiUrl,
          fileBase64,
          fileType
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate event draft');
      }

      const data = await response.json();
      console.log("AI Result:", data);

      // Merge AI data into state
      setState(prev => {
        let newStartDate = new Date();
        if (data.date) {
           const parsedDate = new Date(data.date);
           if (!isNaN(parsedDate.getTime())) {
             newStartDate = parsedDate;
           }
        } else {
           // Default to 3 months from now if AI didn't return a date
           newStartDate.setMonth(newStartDate.getMonth() + 3);
        }
        
        const newEndDate = new Date(newStartDate);
        newEndDate.setHours(newEndDate.getHours() + 3);

        return {
          ...prev,
          title: data.eventTitle || prev.title,
          titleSuggestions: data.eventTitleSuggestions || [],
          description: data.descriptionLong || data.descriptionShort || prev.description,
          category: (CATEGORIES.includes(data.category) ? data.category : 'Runway'),
          targetAudience: data.targetAudience || prev.targetAudience,
          location: data.location || prev.location,
          startDate: newStartDate,
          endDate: newEndDate,
          tickets: data.ticketTiers && data.ticketTiers.length > 0 
            ? data.ticketTiers 
            : prev.tickets,
          schedule: data.scheduleItems && data.scheduleItems.length > 0 
            ? data.scheduleItems 
            : prev.schedule,
        };
      });

      setCurrentStep(Step.BASICS);

    } catch (error) {
      console.error("AI Generation failed", error);
      alert(`AI Generation failed. Please try again or fill manually.\n\n${error instanceof Error ? error.message : ''}`);
      // Fallback to manual entry so user isn't stuck
      setCurrentStep(Step.BASICS);
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- Navigation ---

  const nextStep = () => {
    if (currentStep < Step.REVIEW) setCurrentStep(s => s + 1);
  };

  const prevStep = () => {
    if (currentStep > Step.INTRO) setCurrentStep(s => s - 1);
    else navigate('/dashboard/events');
  };

  const handlePublish = async () => {
    if (isPublishing) return;

    // Validation Checks
    if (!state.title.trim()) {
      alert("Please enter an event title.");
      return;
    }
    if (!state.startDate) {
      alert("Please select a start date and time.");
      return;
    }
    if (!state.endDate) {
      alert("Please select an end date and time.");
      return;
    }
    if (state.endDate < state.startDate) {
      alert("End date cannot be before start date.");
      return;
    }
    if (!state.location.trim()) {
      alert("Please enter a location.");
      return;
    }

    setIsPublishing(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // For MVP/Demo purposes if auth is not fully set up, allow proceed or throw
        // throw new Error("You must be logged in to publish an event.");
        console.warn("User not logged in, proceeding with mock user ID for demo.");
      }

      const organizerId = user?.id || '00000000-0000-0000-0000-000000000000'; // Fallback for demo

      const slug = `${slugify(state.title)}-${Math.random().toString(36).substring(2, 7)}`;
      const capacity = state.tickets.reduce((sum, t) => sum + t.quantity, 0);
      const aiSummary = state.description.substring(0, 280) + (state.description.length > 280 ? '...' : '');

      // 1. Insert Event
      const { data: event, error: eventError } = await supabase
        .from('events')
        .insert({
          organizer_id: organizerId,
          title: state.title,
          slug: slug,
          description: state.description,
          short_description: aiSummary,
          status: 'published', // Auto-publish for MVP
          is_public: true,
          start_time: state.startDate,
          end_time: state.endDate,
          capacity_limit: capacity,
          ai_summary: aiSummary,
          // If we had venue_id from lookup, we'd add it here
          // For now we just have location text, usually managed via venues table
        })
        .select()
        .single();

      if (eventError) throw eventError;

      // 2. Insert Tickets
      if (state.tickets.length > 0) {
        const ticketsPayload = state.tickets.map(t => ({
          event_id: event.id,
          name: t.name,
          price: t.price,
          quantity_total: t.quantity,
          type: t.price > 0 ? 'paid' : 'free'
        }));
        
        const { error: ticketError } = await supabase
          .from('ticket_tiers')
          .insert(ticketsPayload);
          
        if (ticketError) throw ticketError;
      }

      // 3. Insert Schedule
      if (state.schedule.length > 0) {
        const schedulePayload = state.schedule.map(s => {
          // Parse time string "19:00" into date object relative to event start
          let scheduleStart = new Date(state.startDate || new Date());
          const [hours, minutes] = s.time.split(':').map(Number);
          scheduleStart.setHours(hours || 0, minutes || 0, 0, 0);
          
          return {
            event_id: event.id,
            title: s.activity,
            start_time: scheduleStart,
            // Default duration 1 hour if not specified
            end_time: new Date(scheduleStart.getTime() + 60 * 60 * 1000)
          };
        });

        const { error: scheduleError } = await supabase
          .from('event_schedules')
          .insert(schedulePayload);

        if (scheduleError) throw scheduleError;
      }

      // Transition to Success Step
      setCurrentStep(Step.SUCCESS);

    } catch (error) {
      console.error("Publishing failed", error);
      alert(`Failed to publish event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsPublishing(false);
    }
  };

  // --- Render ---

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-24">
      {/* Top Progress Bar */}
      {currentStep !== Step.SUCCESS && (
        <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <button 
                onClick={prevStep} 
                className="p-2 hover:bg-gray-50 rounded-full text-gray-500 transition-colors disabled:opacity-50"
                disabled={currentStep === Step.INTRO}
              >
                <ArrowLeft size={20} />
              </button>
              
              <div className="flex-1 mx-8">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                  <span>{currentStep === Step.INTRO ? 'AI Setup' : `Step ${currentStep} of 5`}</span>
                  <span className="hidden sm:inline">{currentStep === Step.REVIEW ? 'Final Review' : 'Drafting'}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-fashion-purple transition-all duration-500 ease-out" 
                    style={{ width: `${(currentStep / 5) * 100}%` }}
                  />
                </div>
              </div>

              <button onClick={() => navigate('/dashboard/events')} className="p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="container mx-auto px-6 pt-12">
        <FadeIn key={currentStep}>
          {currentStep === Step.INTRO && (
            <WizardIntro 
              aiPrompt={aiPrompt}
              setAiPrompt={setAiPrompt}
              aiUrl={aiUrl}
              setAiUrl={setAiUrl}
              aiFile={aiFile}
              setAiFile={setAiFile}
              onGenerate={handleAIGenerate}
              onSkip={() => setCurrentStep(Step.BASICS)}
              isLoading={isAiLoading}
            />
          )}
          {currentStep === Step.BASICS && (
            <WizardBasics data={state} updateData={updateData} />
          )}
          {currentStep === Step.VENUE && (
            <WizardVenue data={state} updateData={updateData} />
          )}
          {currentStep === Step.TICKETS && (
            <WizardTickets data={state} updateData={updateData} />
          )}
          {currentStep === Step.SCHEDULE && (
            <WizardSchedule data={state} updateData={updateData} />
          )}
          {currentStep === Step.REVIEW && (
            <WizardReview 
              data={state} 
              onEdit={() => setCurrentStep(Step.BASICS)}
              onPublish={handlePublish} 
            />
          )}
          {currentStep === Step.SUCCESS && (
            <WizardSuccess 
              data={state}
              onClose={() => navigate('/dashboard/events')}
            />
          )}
        </FadeIn>
      </div>

      {/* Bottom Action Bar (Not for Intro or Success) */}
      {currentStep !== Step.INTRO && currentStep !== Step.SUCCESS && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-40 lg:pl-64">
          <div className="container mx-auto px-6 max-w-4xl flex justify-between items-center">
            <Button variant="ghost" onClick={prevStep}>Back</Button>
            
            {currentStep === Step.REVIEW ? (
              <Button variant="primary" className="px-8 gap-2" onClick={handlePublish} disabled={isPublishing}>
                {isPublishing ? 'Publishing...' : 'Publish Event'} <CheckCircle2 size={16} />
              </Button>
            ) : (
              <Button variant="primary" className="px-8 gap-2" onClick={nextStep}>
                Next Step <ArrowRight size={16} />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
