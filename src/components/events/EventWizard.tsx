
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, X, ImageIcon, AlertTriangle } from 'lucide-react';
import { Button } from '../Button';
import { FadeIn } from '../FadeIn';
import { supabase, supabaseUrl, supabaseAnonKey, isConfigured } from '../../lib/supabase';
import { slugify } from '../../lib/utils';
import { LoadingSpinner } from '../LoadingSpinner';

// Sub-components
import { WizardIntro } from './wizard/WizardIntro';
import { WizardDraftPreview } from './wizard/WizardDraftPreview'; // New Component
import { WizardBasics } from './wizard/WizardBasics';
import { WizardVisuals } from './wizard/WizardVisuals';
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
  const [aiUrls, setAiUrls] = useState<string[]>([]); 
  const [aiFiles, setAiFiles] = useState<File[]>([]);
  const [aiMoods, setAiMoods] = useState<string[]>([]);
  const [aiAudiences, setAiAudiences] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [state, setState] = useState<WizardState>({
    title: '',
    description: '',
    category: 'Runway',
    targetAudience: '',
    location: '',
    venueAddress: '',
    venueCapacity: '',
    venueContactName: '',
    venueContactEmail: '',
    venueContactPhone: '',
    startDate: null,
    endDate: null,
    tickets: [
      { name: 'Standard Entry', price: 45, quantity: 150 },
      { name: 'VIP Access', price: 125, quantity: 50 }
    ],
    schedule: [{ time: '19:00', activity: 'Doors Open' }],
    image: MOCK_PREVIEW_IMAGE,
    brandUrls: [],
    brandMoods: [],
    generatedPreviews: []
  });

  const updateData = (updates: Partial<WizardState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Helper to convert file to base64 with mimeType
  const processFile = (file: File): Promise<{ data: string, mimeType: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data prefix e.g., data:application/pdf;base64,
        const base64Data = result.split(',')[1];
        resolve({ data: base64Data, mimeType: file.type });
      };
      reader.onerror = error => reject(error);
    });
  };

  // --- AI Integration ---

  const handleAIGenerate = async () => {
    if (!isConfigured) {
      console.warn("Skipping AI generation: App not configured.");
      // Just move to next step if config is missing, don't crash
      setCurrentStep(Step.BASICS);
      return;
    }

    if (!aiPrompt.trim() && aiUrls.length === 0 && aiFiles.length === 0 && aiMoods.length === 0 && aiAudiences.length === 0) return;
    setIsAiLoading(true);

    try {
      const processedFiles = await Promise.all(aiFiles.map(processFile));

      // Construct enhanced prompt with selected tags
      const enhancedPrompt = `
        ${aiPrompt}
        ${aiMoods.length > 0 ? `\nDesired Mood/Vibe: ${aiMoods.join(', ')}.` : ''}
        ${aiAudiences.length > 0 ? `\nTarget Audience: ${aiAudiences.join(', ')}.` : ''}
      `.trim();

      // Get Session Token for Auth
      const { data: { session } } = await (supabase.auth as any).getSession();
      const token = session?.access_token || supabaseAnonKey;

      // Call the backend Edge Function
      const response = await fetch(`${supabaseUrl}/functions/v1/generate-event-draft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt: enhancedPrompt,
          urls: aiUrls, 
          files: processedFiles
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `AI Request failed: ${response.statusText}`);
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
          targetAudience: data.targetAudience || (aiAudiences.length > 0 ? aiAudiences.join(', ') : prev.targetAudience),
          location: data.location || prev.location,
          startDate: newStartDate,
          endDate: newEndDate,
          tickets: data.ticketTiers && data.ticketTiers.length > 0 
            ? data.ticketTiers 
            : prev.tickets,
          schedule: data.scheduleItems && data.scheduleItems.length > 0 
            ? data.scheduleItems 
            : prev.schedule,
          // Pass these forward for Visuals step
          brandUrls: aiUrls,
          brandMoods: aiMoods,
        };
      });

      // Redirect to the Draft Preview screen (Screen 4) instead of BASICS
      setCurrentStep(Step.DRAFT_PREVIEW);

    } catch (error) {
      console.error("AI Generation failed", error);
      alert(`AI Generation failed. Please try again or fill manually.\n\n${error instanceof Error ? error.message : ''}`);
      // Fallback to manual entry so user isn't stuck
      setCurrentStep(Step.BASICS);
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- Navigation & Validation ---

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case Step.BASICS:
        if (!state.title.trim()) {
          alert("Please enter an Event Title.");
          return false;
        }
        return true;
      case Step.VENUE:
        if (!state.startDate) {
          alert("Please select a Start Date.");
          return false;
        }
        if (!state.endDate) {
          alert("Please select an End Date.");
          return false;
        }
        if (state.endDate < state.startDate) {
          alert("End Date must be after Start Date.");
          return false;
        }
        if (!state.location.trim()) {
          alert("Please enter a Location.");
          return false;
        }
        return true;
      case Step.TICKETS:
        if (state.tickets.length === 0) {
          alert("Please add at least one Ticket Tier.");
          return false;
        }
        const invalidTicket = state.tickets.find(t => !t.name.trim());
        if (invalidTicket) {
          alert("All ticket tiers must have a name.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < Step.REVIEW) setCurrentStep(s => s + 1);
  };

  const prevStep = () => {
    if (currentStep > Step.INTRO) setCurrentStep(s => s - 1);
    else navigate('/dashboard/events');
  };

  const handlePublish = async () => {
    if (!isConfigured) {
      alert("Cannot publish: App is not connected to Supabase. Please check your configuration.");
      return;
    }
    if (isPublishing) return;

    // Final Validation Checks
    if (!validateStep(Step.BASICS)) return;
    if (!validateStep(Step.VENUE)) return;
    if (!validateStep(Step.TICKETS)) return;

    setIsPublishing(true);

    try {
      const { data: { user } } = await (supabase.auth as any).getUser();
      // Fallback ID for development if auth is bypassed/mocked
      const organizerId = user?.id || '00000000-0000-0000-0000-000000000000'; 

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
          status: 'published', 
          is_public: true,
          start_time: state.startDate,
          end_time: state.endDate,
          capacity_limit: capacity,
          ai_summary: aiSummary,
          // Use the AI generated image or fallback
          featured_image_url: state.image 
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
          let scheduleStart = new Date(state.startDate || new Date());
          const [hours, minutes] = s.time.split(':').map(Number);
          if (!isNaN(hours) && !isNaN(minutes)) {
             scheduleStart.setHours(hours, minutes, 0, 0);
          }
          
          return {
            event_id: event.id,
            title: s.activity,
            start_time: scheduleStart,
            end_time: new Date(scheduleStart.getTime() + 60 * 60 * 1000)
          };
        });

        const { error: scheduleError } = await supabase
          .from('event_schedules')
          .insert(schedulePayload);

        if (scheduleError) throw scheduleError;
      }

      setCurrentStep(Step.SUCCESS);

    } catch (error) {
      console.error("Publishing failed", error);
      alert(`Failed to publish event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsPublishing(false);
    }
  };

  // Helper for the step progress
  const totalSteps = 7; // Adjusted for Draft Preview step

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-24">
      {/* Config Warning Banner */}
      {!isConfigured && (
        <div className="bg-amber-50 border-b border-amber-200 p-3 text-center text-amber-800 text-sm font-medium flex items-center justify-center gap-2">
          <AlertTriangle size={16} />
          Demo Mode: Supabase is not configured. AI generation and saving will be simulated or disabled.
        </div>
      )}

      {/* Top Progress Bar (Hide on Intro and Draft Preview for cleaner look) */}
      {currentStep !== Step.SUCCESS && currentStep !== Step.INTRO && currentStep !== Step.DRAFT_PREVIEW && (
        <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <button 
                onClick={prevStep} 
                className="p-2 hover:bg-gray-50 rounded-full text-gray-500 transition-colors disabled:opacity-50"
              >
                <ArrowLeft size={20} />
              </button>
              
              <div className="flex-1 mx-8">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                  <span>Step {currentStep} of {totalSteps}</span>
                  <span className="hidden sm:inline">{currentStep === Step.REVIEW ? 'Final Review' : 'Drafting'}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-fashion-purple transition-all duration-500 ease-out" 
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
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
              aiUrls={aiUrls}
              setAiUrls={setAiUrls}
              aiFiles={aiFiles}
              setAiFiles={setAiFiles}
              aiMoods={aiMoods}
              setAiMoods={setAiMoods}
              aiAudiences={aiAudiences}
              setAiAudiences={setAiAudiences}
              onGenerate={handleAIGenerate}
              onSkip={() => setCurrentStep(Step.BASICS)}
              isLoading={isAiLoading}
            />
          )}
          {currentStep === Step.DRAFT_PREVIEW && (
            <WizardDraftPreview 
              data={state}
              onContinue={() => setCurrentStep(Step.BASICS)}
              onRegenerate={handleAIGenerate}
              onEdit={() => setCurrentStep(Step.BASICS)}
            />
          )}
          {currentStep === Step.BASICS && (
            <WizardBasics data={state} updateData={updateData} />
          )}
          {currentStep === Step.VISUALS && (
            <WizardVisuals 
              data={state} 
              updateData={updateData} 
              onNext={nextStep}
              onBack={prevStep}
            />
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

      {/* Bottom Action Bar (Conditionally rendered) */}
      {currentStep > Step.DRAFT_PREVIEW && currentStep !== Step.SUCCESS && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-40 lg:pl-64">
          <div className="container mx-auto px-6 max-w-4xl flex justify-between items-center">
            <Button variant="ghost" onClick={prevStep}>Back</Button>
            
            {currentStep === Step.REVIEW ? (
              <Button variant="primary" className="px-8 gap-2" onClick={handlePublish} disabled={isPublishing}>
                {isPublishing ? <LoadingSpinner size={16} /> : null}
                {isPublishing ? 'Publishing...' : 'Publish Event'} 
                {!isPublishing && <CheckCircle2 size={16} />}
              </Button>
            ) : (
              <Button variant="primary" className="px-8 gap-2" onClick={nextStep}>
                {currentStep === Step.BASICS ? (
                    <>Visuals & Media <ImageIcon size={16} /></>
                ) : (
                    <>Next Step <ArrowRight size={16} /></>
                )}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
