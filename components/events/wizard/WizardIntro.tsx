
import React, { useRef } from 'react';
import { Sparkles, Loader2, Link as LinkIcon, FileText, Upload, X } from 'lucide-react';
import { Button } from '../../Button';

interface WizardIntroProps {
  aiPrompt: string;
  setAiPrompt: (val: string) => void;
  aiUrl: string;
  setAiUrl: (val: string) => void;
  aiFile: File | null;
  setAiFile: (val: File | null) => void;
  onGenerate: () => void;
  onSkip: () => void;
  isLoading: boolean;
}

export const WizardIntro: React.FC<WizardIntroProps> = ({ 
  aiPrompt, setAiPrompt, 
  aiUrl, setAiUrl, 
  aiFile, setAiFile, 
  onGenerate, onSkip, isLoading 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAiFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center pt-8">
      <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-purple-100">
        <Sparkles size={14} /> AI Event Creator
      </div>
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900">
        Describe your event. <br />
        <span className="text-gray-400">We'll handle the details.</span>
      </h1>
      <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
        Paste a URL, upload a PDF, or just type your ideas. Our AI will structure your venue, tickets, and schedule automatically.
      </p>

      <div className="bg-white p-1 rounded-3xl border-2 border-purple-100 shadow-xl relative transition-all focus-within:border-purple-400 focus-within:ring-4 focus-within:ring-purple-50 text-left">
        
        {/* Text Area */}
        <textarea 
          className="w-full h-32 p-4 resize-none outline-none text-lg text-gray-700 placeholder:text-gray-300 bg-transparent rounded-t-3xl"
          placeholder="e.g. Hosting a sustainable fashion runway in Brooklyn next Friday at 7pm. We need VIP tickets for $150 and general admission for $50. Expecting 200 people."
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onGenerate(); } }}
        />

        {/* Attachments Area */}
        <div className="px-4 pb-2 flex flex-col gap-3">
          
          {/* URL Input */}
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100 focus-within:border-purple-300 transition-colors">
            <LinkIcon size={16} className="text-gray-400 shrink-0" />
            <input 
              type="url" 
              placeholder="Paste event URL (optional)..." 
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
              value={aiUrl}
              onChange={(e) => setAiUrl(e.target.value)}
            />
          </div>

          {/* File Upload */}
          {aiFile ? (
            <div className="flex items-center justify-between bg-purple-50 border border-purple-100 rounded-xl px-3 py-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileText size={16} className="text-purple-600 shrink-0" />
                <span className="text-sm text-purple-700 font-medium truncate">{aiFile.name}</span>
              </div>
              <button 
                onClick={() => { setAiFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }} 
                className="p-1 hover:bg-purple-100 rounded-full text-purple-400 hover:text-purple-700 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 border border-dashed border-gray-200 hover:border-purple-300 hover:bg-gray-50 rounded-xl px-3 py-2 cursor-pointer transition-all text-gray-400 hover:text-purple-600 group"
            >
              <Upload size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Upload PDF / Doc (optional)</span>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".pdf,.doc,.docx,.txt" 
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center p-4 border-t border-gray-50 mt-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-2 hidden sm:inline">Or skip to manual entry</span>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <Button variant="ghost" size="sm" onClick={onSkip}>Skip</Button>
            <Button 
              variant="primary" 
              size="sm" 
              className="rounded-full px-6"
              onClick={onGenerate}
              disabled={isLoading || (!aiPrompt.trim() && !aiUrl && !aiFile)}
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
