
import React, { useRef } from 'react';
import { Sparkles, Link as LinkIcon, FileText, Upload, X, Tag, Image as ImageIcon } from 'lucide-react';
import { Button } from '../../Button';
import { LoadingSpinner } from '../../LoadingSpinner';

interface WizardIntroProps {
  aiPrompt: string;
  setAiPrompt: (val: string) => void;
  aiUrl: string;
  setAiUrl: (val: string) => void;
  aiFiles: File[];
  setAiFiles: (val: File[]) => void;
  // New selection props
  aiMoods: string[];
  setAiMoods: (vals: string[]) => void;
  aiAudiences: string[];
  setAiAudiences: (vals: string[]) => void;
  
  onGenerate: () => void;
  onSkip: () => void;
  isLoading: boolean;
}

const MOOD_OPTIONS = ["Luxurious", "Sustainable", "Edgy", "Minimalist", "High Energy", "Professional", "Exclusive", "Playful"];
const AUDIENCE_OPTIONS = ["Gen Z", "VIPs", "Industry Insiders", "Press/Media", "General Public", "Buyers", "Influencers"];

export const WizardIntro: React.FC<WizardIntroProps> = ({ 
  aiPrompt, setAiPrompt, 
  aiUrl, setAiUrl, 
  aiFiles, setAiFiles, 
  aiMoods, setAiMoods,
  aiAudiences, setAiAudiences,
  onGenerate, onSkip, isLoading 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Append new files to existing ones
      setAiFiles([...aiFiles, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...aiFiles];
    newFiles.splice(index, 1);
    setAiFiles(newFiles);
  };

  const toggleSelection = (list: string[], setList: (vals: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon size={16} className="text-purple-600" />;
    return <FileText size={16} className="text-blue-600" />;
  };

  return (
    <div className="max-w-2xl mx-auto text-center pt-4">
      <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-purple-100">
        <Sparkles size={14} /> AI Event Creator
      </div>
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gray-900">
        Describe your event. <br />
        <span className="text-gray-400">We'll handle the details.</span>
      </h1>
      <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
        Paste a URL, upload contracts/moodboards, or just type your ideas. Our AI will structure your venue, tickets, and schedule automatically.
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

        {/* Guidance Chips */}
        <div className="px-4 pb-4 flex flex-col gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <Tag size={12} /> Guide the AI
            </div>
            
            {/* Moods */}
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {MOOD_OPTIONS.map(mood => (
                <button
                  key={mood}
                  onClick={() => toggleSelection(aiMoods, setAiMoods, mood)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                    aiMoods.includes(mood) 
                      ? 'bg-black text-white border-black shadow-sm' 
                      : 'bg-white text-gray-500 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>

            {/* Audiences */}
            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              {AUDIENCE_OPTIONS.map(aud => (
                <button
                  key={aud}
                  onClick={() => toggleSelection(aiAudiences, setAiAudiences, aud)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                    aiAudiences.includes(aud) 
                      ? 'bg-black text-white border-black shadow-sm' 
                      : 'bg-white text-gray-500 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {aud}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Attachments Area */}
        <div className="px-4 pb-2 flex flex-col gap-3 border-t border-gray-50 pt-3">
          
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

          {/* Files List */}
          {aiFiles.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {aiFiles.map((file, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-lg px-3 py-1.5 max-w-full">
                  {getFileIcon(file.type)}
                  <span className="text-xs text-purple-700 font-medium truncate max-w-[150px]">{file.name}</span>
                  <button 
                    onClick={() => removeFile(idx)} 
                    className="p-0.5 hover:bg-purple-200 rounded-full text-purple-400 hover:text-purple-700 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* File Upload Button */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 border border-dashed border-gray-200 hover:border-purple-300 hover:bg-gray-50 rounded-xl px-3 py-2 cursor-pointer transition-all text-gray-400 hover:text-purple-600 group"
          >
            <Upload size={16} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Add Documents or Images (PDF, JPG, PNG)</span>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png" 
              onChange={handleFileChange}
            />
          </div>
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
              disabled={isLoading || (!aiPrompt.trim() && !aiUrl && aiFiles.length === 0 && aiMoods.length === 0 && aiAudiences.length === 0)}
            >
              {isLoading ? <LoadingSpinner size={16} /> : <Sparkles size={16} />}
              {isLoading ? 'Analyzing...' : 'Generate Draft'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
