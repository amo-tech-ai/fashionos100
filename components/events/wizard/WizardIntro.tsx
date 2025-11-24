import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../../Button';

interface WizardIntroProps {
  aiPrompt: string;
  setAiPrompt: (val: string) => void;
  onGenerate: () => void;
  onSkip: () => void;
  isLoading: boolean;
}

export const WizardIntro: React.FC<WizardIntroProps> = ({ aiPrompt, setAiPrompt, onGenerate, onSkip, isLoading }) => {
  return (
    <div className="max-w-2xl mx-auto text-center pt-12">
      <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-purple-100">
        <Sparkles size={14} /> AI Event Creator
      </div>
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900">
        Describe your event. <br />
        <span className="text-gray-400">We'll handle the details.</span>
      </h1>
      <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
        Paste a URL, upload a PDF, or just type your ideas. Our AI will structure your venue, tickets, and schedule automatically.
      </p>

      <div className="bg-white p-4 rounded-3xl border-2 border-purple-100 shadow-xl relative transition-all focus-within:border-purple-400 focus-within:ring-4 focus-within:ring-purple-50">
        <textarea 
          className="w-full h-32 p-2 resize-none outline-none text-lg text-gray-700 placeholder:text-gray-300"
          placeholder="e.g. Hosting a sustainable fashion runway in Brooklyn next Friday at 7pm. We need VIP tickets for $150 and general admission for $50. Expecting 200 people."
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onGenerate(); } }}
        />
        <div className="flex justify-between items-center pt-2 border-t border-gray-50">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-2">Or skip to manual entry</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onSkip}>Skip</Button>
            <Button 
              variant="primary" 
              size="sm" 
              className="rounded-full px-6"
              onClick={onGenerate}
              disabled={isLoading || !aiPrompt.trim()}
            >
              {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
              {isLoading ? 'Analyzing...' : 'Generate Draft'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};