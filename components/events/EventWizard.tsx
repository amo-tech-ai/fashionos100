
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI, Type } from "@google/genai";
import { ArrowLeft, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { Button } from '../Button';
import { FadeIn } from '../FadeIn';

// Sub-components
import { WizardIntro } from './wizard/WizardIntro';
import { WizardBasics } from './wizard/WizardBasics';
import { WizardVenue } from './wizard/WizardVenue';
import { WizardTickets } from './wizard/WizardTickets';
import { WizardReview } from './wizard/WizardReview';
import { WizardState, Step, MOCK_PREVIEW_IMAGE, CATEGORIES } from './wizard/types';

export const EventWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(Step.INTRO);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [state, setState] = useState<WizardState>({
    title: '',
    description: '',
    category: 'Runway',
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

  // --- AI Integration ---

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        You are the AI Event Creator for a fashion runway platform.

        Your job:
        1. Read the user’s initial event description from the first screen.
        2. Extract key details: theme, location, date, audience size, designers, ticket structure, extras, goals.
        3. Auto-generate:
           - Event Title (3 variations)
           - Event Description (short 1-sentence + longer 3-sentence)
        4. Return the data in a clean structured format for the UI to prefill the next screen.

        User Input: "${aiPrompt}"

        Rules:
        - The event title must be catchy and fashion-forward.
        - The description should clearly explain what the guest can expect.
        - If the user did not give key details (date, ticket price, designers), infer reasonable defaults and NOTE them in the long description.
        - Keep everything professional, elegant, and runway-ready.
        - Always fill every field. Never return empty values.
        - For 'date', return an ISO date string (YYYY-MM-DD) in the future.
        - For 'category', choose one of: ${CATEGORIES.join(', ')}.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              autoFilled: {
                type: Type.OBJECT,
                properties: {
                  eventTitleSuggestions: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING } 
                  },
                  eventDescriptionShort: { type: Type.STRING },
                  eventDescriptionLong: { type: Type.STRING },
                  category: { type: Type.STRING },
                  location: { type: Type.STRING },
                  date: { type: Type.STRING },
                  ticket_price_estimate: { type: Type.NUMBER },
                  ticket_name_estimate: { type: Type.STRING },
                  ticket_quantity_estimate: { type: Type.NUMBER },
                  schedule: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING },
                        activity: { type: Type.STRING }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });

      const result = JSON.parse(response.text || "{}");
      const data = result.autoFilled || {};

      // Merge AI data into state
      setState(prev => ({
        ...prev,
        title: data.eventTitleSuggestions?.[0] || prev.title,
        titleSuggestions: data.eventTitleSuggestions || [],
        description: data.eventDescriptionLong || prev.description,
        category: data.category || prev.category,
        location: data.location || prev.location,
        startDate: data.date ? new Date(data.date) : prev.startDate,
        tickets: data.ticket_price_estimate ? [{
          name: data.ticket_name_estimate || 'General Admission',
          price: data.ticket_price_estimate,
          quantity: data.ticket_quantity_estimate || 100
        }] : prev.tickets,
        schedule: data.schedule && data.schedule.length > 0 ? data.schedule : prev.schedule,
      }));

      setCurrentStep(Step.BASICS);

    } catch (error) {
      console.error("AI Generation failed", error);
      // Graceful fallback - just move to manual entry
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

  const handlePublish = () => {
    console.log("Publishing Event:", state);
    navigate('/dashboard/events');
  };

  // --- Render ---

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-24">
      {/* Top Progress Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <button onClick={prevStep} className="p-2 hover:bg-gray-50 rounded-full text-gray-500 transition-colors">
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex-1 mx-8">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                <span>{currentStep === Step.INTRO ? 'AI Setup' : `Step ${currentStep} of 4`}</span>
                <span className="hidden sm:inline">{currentStep === Step.REVIEW ? 'Final Review' : 'Drafting'}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-fashion-purple transition-all duration-500 ease-out" 
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            <button onClick={() => navigate('/dashboard/events')} className="p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-6 pt-12">
        <FadeIn key={currentStep}>
          {currentStep === Step.INTRO && (
            <WizardIntro 
              aiPrompt={aiPrompt}
              setAiPrompt={setAiPrompt}
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
          {currentStep === Step.REVIEW && (
            <WizardReview 
              data={state} 
              onEdit={() => setCurrentStep(Step.BASICS)}
              onPublish={handlePublish} 
            />
          )}
        </FadeIn>
      </div>

      {/* Bottom Action Bar (Not for Intro) */}
      {currentStep !== Step.INTRO && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-40 lg:pl-64">
          <div className="container mx-auto px-6 max-w-4xl flex justify-between items-center">
            <Button variant="ghost" onClick={prevStep}>Back</Button>
            
            {currentStep === Step.REVIEW ? (
              <Button variant="primary" className="px-8 gap-2" onClick={handlePublish}>
                Publish Event <CheckCircle2 size={16} />
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
