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
  
  // AI Input State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiUrl, setAiUrl] = useState('');
  const [aiFile, setAiFile] = useState<File | null>(null);
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

  // Helper to convert file to base64 for Gemini
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
      // Initialize Gemini Client
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || process.env.API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
      }

      const ai = new GoogleGenAI({ apiKey });

      // Define Strict Output Schema using Type
      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          eventTitle: { type: Type.STRING },
          eventTitleSuggestions: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          descriptionShort: { type: Type.STRING },
          descriptionLong: { type: Type.STRING },
          category: { type: Type.STRING },
          location: { type: Type.STRING },
          date: { type: Type.STRING, description: "YYYY-MM-DD format" },
          ticketTiers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                price: { type: Type.NUMBER },
                quantity: { type: Type.NUMBER }
              }
            }
          },
          scheduleItems: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                activity: { type: Type.STRING }
              }
            }
          }
        },
        required: ["eventTitle", "category", "descriptionLong", "ticketTiers", "scheduleItems"]
      };

      // Build Multimodal Content
      const parts: any[] = [];
      
      if (aiPrompt.trim()) {
        parts.push({ text: aiPrompt });
      }

      if (aiUrl.trim()) {
        parts.push({ text: `\n\nContext URL to analyze: ${aiUrl}` });
      }

      if (aiFile) {
        const base64Data = await fileToBase64(aiFile);
        parts.push({
          inlineData: {
            mimeType: aiFile.type,
            data: base64Data
          }
        });
      }

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: 'user', parts: parts }],
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
          systemInstruction: `You are the AI Event Architect for FashionOS. 
        Task: Convert user input into a complete, structured fashion event plan.
        
        Context:
        - Year: 2025.
        - Event Types: Runway, Party, Workshop, Exhibition, Pop-up, Conference.
        
        Reasoning Steps:
        1. Analyze the input for explicit details (Date, Location, Theme).
        2. If details are missing, INFER reasonable defaults based on the event type (e.g., Runways usually happen in the evening, Workshops in the morning).
        3. Generate a professional description and catchy title suggestions.
        4. Structure ticket tiers (e.g., VIP vs General) and a realistic schedule (Doors -> Main Event -> End).
        
        Output:
        - Return ONLY valid JSON matching the schema.`
        }
      });

      const responseText = result.text;
      
      if (!responseText) throw new Error("No response from AI");
      
      const data = JSON.parse(responseText);
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

  const handlePublish = () => {
    console.log("Publishing Event:", state);
    // Ideally call supabase.from('events').insert(...)
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