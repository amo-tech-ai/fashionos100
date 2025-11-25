
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { DealStep, DealState } from '../../types/deal';
import { supabase } from '../../lib/supabase';

// Steps
import { StepQualification } from '../../components/sponsors/wizard/StepQualification';
import { StepPackage } from '../../components/sponsors/wizard/StepPackage';
import { StepContract } from '../../components/sponsors/wizard/StepContract';
import { StepActivations } from '../../components/sponsors/wizard/StepActivations';
import { StepROIGoals } from '../../components/sponsors/wizard/StepROIGoals';
import { StepReview } from '../../components/sponsors/wizard/StepReview';

const INITIAL_STATE: DealState = {
  sponsorId: '',
  sponsorName: '',
  sponsorIndustry: '',
  eventId: '',
  eventName: '',
  leadScore: 0,
  leadNotes: '',
  packageTier: 'Gold',
  cashValue: 0,
  inKindValue: 0,
  contractStatus: 'Draft',
  contractFile: null,
  terms: '',
  activations: [],
  targetImpressions: 0,
  targetLeads: 0
};

export const SponsorDealWizard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<DealStep>(DealStep.QUALIFICATION);
  const [data, setData] = useState<DealState>(INITIAL_STATE);
  const [isSaving, setIsSaving] = useState(false);

  const updateData = (updates: Partial<DealState>) => setData(prev => ({ ...prev, ...updates }));

  const handleNext = () => {
    // Basic validation
    if (step === DealStep.QUALIFICATION && (!data.sponsorId || !data.eventId)) {
      alert("Please select a sponsor and an event.");
      return;
    }
    if (step < DealStep.REVIEW) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > DealStep.QUALIFICATION) setStep(step - 1);
    else navigate('/dashboard/sponsors');
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      // 1. Create Deal (Event Sponsor)
      const { data: deal, error: dealError } = await supabase
        .from('event_sponsors')
        .insert({
          sponsor_id: data.sponsorId,
          event_id: data.eventId,
          status: data.contractStatus === 'Signed' ? 'Signed' : 'Negotiating',
          level: data.packageTier,
          cash_value: data.cashValue,
          in_kind_value: data.inKindValue,
          // Store AI/Fit notes in a metadata JSON column if it existed, but standard columns are sufficient for MVP
        })
        .select()
        .single();

      if (dealError) throw dealError;

      // 2. Create Activations
      if (data.activations.length > 0) {
        const activationsPayload = data.activations.map(act => ({
          event_sponsor_id: deal.id,
          title: act.type,
          type: act.type,
          status: 'planning',
          location_in_venue: act.location,
          description: act.description
        }));

        const { error: actError } = await supabase
          .from('sponsor_activations')
          .insert(activationsPayload);
          
        if (actError) throw actError;
      }

      // 3. ROI Goals (Optional - if you had a table for it, insert here)
      // For now, just navigating back.

      navigate('/dashboard/sponsors'); 
    } catch (error: any) {
      console.error("Deal creation failed:", error);
      alert(`Failed to create deal: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case DealStep.QUALIFICATION: return <StepQualification data={data} update={updateData} />;
      case DealStep.PACKAGE: return <StepPackage data={data} update={updateData} />;
      case DealStep.CONTRACT: return <StepContract data={data} update={updateData} />;
      case DealStep.ACTIVATION: return <StepActivations data={data} update={updateData} />;
      case DealStep.ROI_GOALS: return <StepROIGoals data={data} update={updateData} />;
      case DealStep.REVIEW: return <StepReview data={data} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-24 pt-20">
      {/* Progress Bar */}
      <div className="fixed top-20 left-0 right-0 z-30 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Step {step + 1} of 6
            </span>
            <div className="flex-1 mx-8 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-fashion-purple transition-all duration-500 ease-out" 
                style={{ width: `${((step + 1) / 6) * 100}%` }}
              />
            </div>
            <button onClick={() => navigate('/dashboard/sponsors')} className="text-xs font-bold text-gray-400 hover:text-red-500">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-12 max-w-4xl">
        <FadeIn key={step}>
          {renderStep()}
        </FadeIn>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-40 lg:pl-64">
        <div className="container mx-auto px-6 max-w-4xl flex justify-between items-center">
          <Button variant="ghost" onClick={handleBack} className="text-gray-500">
            <ArrowLeft size={16} className="mr-2" /> Back
          </Button>
          
          {step === DealStep.REVIEW ? (
            <Button variant="primary" className="px-8" onClick={handleSubmit} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Create Deal'} <Save size={16} className="ml-2" />
            </Button>
          ) : (
            <Button variant="primary" className="px-8" onClick={handleNext}>
              Next Step <ArrowRight size={16} className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
