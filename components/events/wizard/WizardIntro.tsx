
import React, { useRef, useState } from 'react';
import { 
  Sparkles, Link as LinkIcon, FileText, Upload, X, 
  ArrowRight, Calendar, MapPin, ChevronLeft, Check,
  Instagram, DollarSign, LayoutTemplate
} from 'lucide-react';
import { Button } from '../../Button';
import { LoadingSpinner } from '../../LoadingSpinner';
import { Input } from '../../forms/Input';

interface WizardIntroProps {
  aiPrompt: string;
  setAiPrompt: (val: string) => void;
  aiUrl: string;
  setAiUrl: (val: string) => void;
  aiFiles: File[];
  setAiFiles: (val: File[]) => void;
  aiMoods: string[];
  setAiMoods: (vals: string[]) => void;
  aiAudiences: string[];
  setAiAudiences: (vals: string[]) => void;
  onGenerate: () => void;
  onSkip: () => void;
  isLoading: boolean;
}

const MOOD_OPTIONS = ["Luxurious", "Sustainable", "Edgy", "Minimalist", "High Energy", "Professional", "Exclusive"];
const AUDIENCE_OPTIONS = ["Gen Z", "VIPs", "Industry", "Press", "Public", "Buyers"];

export const WizardIntro: React.FC<WizardIntroProps> = ({ 
  aiPrompt, setAiPrompt, 
  aiUrl, setAiUrl, 
  aiFiles, setAiFiles, 
  aiMoods, setAiMoods,
  aiAudiences, setAiAudiences,
  onGenerate, onSkip, isLoading 
}) => {
  // Internal state for the 3-step flow
  const [introStep, setIntroStep] = useState<0 | 1 | 2>(0);
  
  // Local state for extra fields before merging into prompt
  const [dateInput, setDateInput] = useState('');
  const [locInput, setLocInput] = useState('');
  
  // Toggles for Screen 3
  const [askForSponsors, setAskForSponsors] = useState(false);
  const [askForSocial, setAskForSocial] = useState(false);
  const [askForLayout, setAskForLayout] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
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

  // Combine all inputs into the final prompt trigger
  const handleFinalGenerate = () => {
    let augmentedPrompt = aiPrompt;
    
    // Append basics if not present in text
    if (dateInput) augmentedPrompt += `\nDate Context: ${dateInput}`;
    if (locInput) augmentedPrompt += `\nLocation Context: ${locInput}`;
    
    // Append Add-on requests
    if (askForSponsors) augmentedPrompt += `\n[REQUEST]: Please suggest 3 potential sponsor categories and a pitch angle.`;
    if (askForSocial) augmentedPrompt += `\n[REQUEST]: Draft 3 catchy Instagram captions for the announcement.`;
    if (askForLayout) augmentedPrompt += `\n[REQUEST]: Suggest a venue layout concept (e.g. runway shape, seating).`;

    // Update the parent state just before sending
    setAiPrompt(augmentedPrompt);
    
    // Fire
    onGenerate();
  };

  const next = () => setIntroStep(prev => (prev < 2 ? prev + 1 : prev) as any);
  const back = () => setIntroStep(prev => (prev > 0 ? prev - 1 : prev) as any);

  // --- SCREEN 1: BASICS ---
  if (introStep === 0) {
    return (
      <div className="max-w-xl mx-auto pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 border border-purple-100">
            <Sparkles size={12} /> Step 1 of 3
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">The Vision</h1>
          <p className="text-gray-500">Start with the big idea. We'll refine it next.</p>
        </div>

        <div className="bg-white p-1 rounded-[2rem] border-2 border-purple-100 shadow-xl focus-within:border-purple-400 focus-within:ring-4 focus-within:ring-purple-50 transition-all">
          <textarea 
            className="w-full h-48 p-6 resize-none outline-none text-lg text-gray-800 placeholder:text-gray-300 bg-transparent rounded-[2rem]"
            placeholder="e.g. Hosting a sustainable fashion runway in Brooklyn. We need VIP tickets for $150 and general admission for $50..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm focus-within:border-purple-300 transition-all">
            <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-400 mb-2">
              <Calendar size={12} /> Tentative Date
            </label>
            <input 
              type="text" 
              placeholder="e.g. Next Friday" 
              className="w-full outline-none text-sm font-medium text-gray-700 placeholder:text-gray-300"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm focus-within:border-purple-300 transition-all">
            <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-400 mb-2">
              <MapPin size={12} /> Location City
            </label>
            <input 
              type="text" 
              placeholder="e.g. NYC" 
              className="w-full outline-none text-sm font-medium text-gray-700 placeholder:text-gray-300"
              value={locInput}
              onChange={(e) => setLocInput(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            size="lg" 
            variant="primary" 
            onClick={next} 
            disabled={!aiPrompt.trim()} 
            className="rounded-full px-8 shadow-lg shadow-purple-500/20"
          >
            Next: Add Context <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  // --- SCREEN 2: CONTEXT ---
  if (introStep === 1) {
    return (
      <div className="max-w-xl mx-auto pt-6 animate-in fade-in slide-in-from-right-8 duration-500">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 border border-purple-100">
            <Sparkles size={12} /> Step 2 of 3
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Guide the AI</h1>
          <p className="text-gray-500">Add files and style tags to improve accuracy.</p>
        </div>

        {/* Section A: Style & Vibe */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> Vibe & Audience
          </h3>
          
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Mood</p>
            <div className="flex flex-wrap gap-2">
              {MOOD_OPTIONS.map(mood => (
                <button
                  key={mood}
                  onClick={() => toggleSelection(aiMoods, setAiMoods, mood)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    aiMoods.includes(mood) 
                      ? 'bg-black text-white border-black shadow-md scale-105' 
                      : 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-white hover:border-gray-300'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Target Audience</p>
            <div className="flex flex-wrap gap-2">
              {AUDIENCE_OPTIONS.map(aud => (
                <button
                  key={aud}
                  onClick={() => toggleSelection(aiAudiences, setAiAudiences, aud)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    aiAudiences.includes(aud) 
                      ? 'bg-black text-white border-black shadow-md scale-105' 
                      : 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-white hover:border-gray-300'
                  }`}
                >
                  {aud}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section B: Reference Material */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-8">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Reference Material
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus-within:border-blue-300 focus-within:bg-white transition-all">
              <LinkIcon size={16} className="text-gray-400 shrink-0" />
              <input 
                type="url" 
                placeholder="Paste a URL (e.g. Venue website, Pinterest)" 
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                value={aiUrl}
                onChange={(e) => setAiUrl(e.target.value)}
              />
            </div>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-xl px-4 py-6 cursor-pointer transition-all text-gray-400 hover:text-blue-600 group"
            >
              <Upload size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Upload PDF, Docs, or Images</span>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                multiple
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png" 
                onChange={handleFileChange}
              />
            </div>

            {/* File List */}
            {aiFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {aiFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1.5">
                    <FileText size={12} className="text-blue-600" />
                    <span className="text-xs text-blue-700 font-bold truncate max-w-[120px]">{file.name}</span>
                    <button onClick={() => removeFile(idx)} className="text-blue-400 hover:text-blue-700"><X size={12}/></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={back} className="text-gray-500">Back</Button>
          <Button size="lg" variant="primary" onClick={next} className="rounded-full px-8">
            Review <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  // --- SCREEN 3: REVIEW & GENERATE ---
  return (
    <div className="max-w-xl mx-auto pt-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 border border-purple-100">
          <Sparkles size={12} /> Step 3 of 3
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Ready to Build?</h1>
        <p className="text-gray-500">Review your inputs and add optional AI tasks.</p>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden mb-6">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Event Summary</span>
          <button onClick={() => setIntroStep(0)} className="text-xs font-bold text-purple-600 hover:underline">Edit</button>
        </div>
        <div className="p-6">
          <p className="text-lg font-serif font-bold text-gray-900 mb-4 line-clamp-3">
            "{aiPrompt}"
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {dateInput && <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gray-400" /> {dateInput}</span>}
            {locInput && <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400" /> {locInput}</span>}
            {(aiFiles.length > 0 || aiUrl) && <span className="flex items-center gap-1.5"><LinkIcon size={14} className="text-gray-400" /> {aiFiles.length} Files, {aiUrl ? '1 URL' : '0 URLs'}</span>}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 flex flex-wrap gap-2">
            {[...aiMoods, ...aiAudiences].map(tag => (
              <span key={tag} className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Power-Ups */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-8">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Optional AI Power-Ups</h3>
        <div className="space-y-4">
          {[
            { label: 'Suggest Sponsor Categories', state: askForSponsors, set: setAskForSponsors, icon: DollarSign, color: 'bg-green-100 text-green-600' },
            { label: 'Draft Social Captions', state: askForSocial, set: setAskForSocial, icon: Instagram, color: 'bg-pink-100 text-pink-600' },
            { label: 'Propose Venue Layout', state: askForLayout, set: setAskForLayout, icon: LayoutTemplate, color: 'bg-blue-100 text-blue-600' },
          ].map((opt, i) => (
            <div key={i} className="flex items-center justify-between group cursor-pointer" onClick={() => opt.set(!opt.state)}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${opt.color}`}>
                  <opt.icon size={14} />
                </div>
                <span className={`text-sm font-medium transition-colors ${opt.state ? 'text-gray-900' : 'text-gray-500'}`}>{opt.label}</span>
              </div>
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${opt.state ? 'bg-purple-600' : 'bg-gray-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${opt.state ? 'translate-x-4' : ''}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button 
          size="lg" 
          variant="primary" 
          fullWidth 
          className="rounded-full h-14 shadow-xl shadow-purple-500/20 text-base"
          onClick={handleFinalGenerate}
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : <Sparkles size={18} className="mr-2" />}
          {isLoading ? 'AI is Architecting...' : 'Generate Event Draft'}
        </Button>
        <button onClick={onSkip} className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-gray-600 py-2">
          Skip AI & Build Manually
        </button>
      </div>
    </div>
  );
};
