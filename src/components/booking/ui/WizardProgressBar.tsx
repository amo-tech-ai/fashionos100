
import React from 'react';

interface WizardProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const WizardProgressBar: React.FC<WizardProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-black transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
