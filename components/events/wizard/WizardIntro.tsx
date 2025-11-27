
import React, { useRef, useState, useEffect } from 'react';
import { 
  Sparkles, Link as LinkIcon, FileText, Upload, X, 
  ArrowRight, Calendar, MapPin, ChevronLeft, Check,
  Instagram, DollarSign, LayoutTemplate, Plus, Globe, Loader2
} from 'lucide-react';
import { Button } from '../../Button';
import { LoadingSpinner } from '../../LoadingSpinner';
import { Input } from '../../forms/Input';
import { CalendarPicker } from '../../CalendarPicker';

interface WizardIntroProps {
  aiPrompt: string;
  setAiPrompt: (val: string) => void;
  aiUrls: string[];
  setAiUrls: (val: string[]) => void;
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

const MOOD_OPTIONS = ["Luxurious", "Sustainable", "Edgy", "Minimalist", "High Energy", "Professional", "Exclusive", "Avant-Garde"];
const AUDIENCE_OPTIONS = ["Gen Z", "VIPs", "Industry", "Press", "Public", "Buyers", "Influencers"];

export const WizardIntro: React.FC<WizardIntroProps> = ({ 
  aiPrompt, setAiPrompt, 
  aiUrls, setAiUrls, 
  aiFiles, setAiFiles, 
  aiMoods, setAiMoods,
  aiAudiences, setAiAudiences,
  onGenerate, onSkip, isLoading 
}) => {
  // Internal state for the 3-step flow
  const [introStep, setIntroStep] = useState<0 | 1 | 2>(0);
  
  // Local state for extra fields (Screen 1)
  const [dateInput, setDateInput] = useState('');
  const [locInput, setLocInput] = useState('');
  
  // Local state for URL input (Screen 2)
  const [currentUrlInput, setCurrentUrlInput] = useState('');
  
  // Calendar State
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Toggles for Screen 3 (Power Ups)
  const [askForSponsors, setAskForSponsors] = useState(false);
  const [askForSocial, setAskForSocial] = useState(false);
  const [askForLayout, setAskForLayout] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- HANDLERS ---

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef]);

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

  const handleAddUrl = () => {
    if (!currentUrlInput.trim()) return;
    try {
      // Simple loose validation
      if (!currentUrlInput.includes('.')) throw new Error("Invalid URL");
      if (!aiUrls.includes(currentUrlInput)) {
        setAiUrls([...aiUrls, currentUrlInput]);
      }
      setCurrentUrlInput('');
    } catch (e) {
      alert("Please enter a valid URL (e.g., fashionweek.com)");
    }
  };

  const removeUrl = (urlToRemove: string) => {
    setAiUrls(aiUrls.filter(url => url !== urlToRemove));
  };

  const toggleSelection = (list: string[], setList: (vals: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleDateShortcut = (type: 'next_friday' | 'next_week' | 'next_month') => {
    const d = new Date();
    if (type === 'next_friday') {
      d.setDate(d.getDate() + (5 + 7 - d.getDay()) % 7 || 7);
    } else if (type === 'next_week') {
      d.setDate(d.getDate() + 7);
    } else if (type === 'next_month') {
      d.setMonth(d.getMonth() + 1);
    }
    
    setDateInput(d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    setShowCalendar(false);
  };

  const handleDateApply = (start: Date | null, end: Date | null) => {
    if (start) {
      let dateStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (end && end.getTime() !== start.getTime()) {
        dateStr += ` - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      }
      setDateInput(dateStr);
    }
    setShowCalendar(false);
  };

  const handleFinalGenerate = () => {
    let augmentedPrompt = aiPrompt;
    if (dateInput) augmentedPrompt += `\nDate Context: ${dateInput}`;
    if (locInput) augmentedPrompt += `\nLocation Context: ${locInput}`;
    if (askForSponsors) augmentedPrompt += `\n[REQUEST]: Suggest 3 potential sponsor categories.`;
    if (askForSocial) augmentedPrompt += `\n[REQUEST]: Draft 3 Instagram captions.`;
    if (askForLayout) augmentedPrompt += `\n[REQUEST]: Suggest a venue layout concept.`;

    setAiPrompt(augmentedPrompt);
    onGenerate();
  };

  const next = () => setIntroStep(prev => (prev < 2 ? prev + 1 : prev) as any);
  const back = () => setIntroStep(prev => (prev > 0 ? prev - 1 : prev) as any);

  // --- SCREEN 1: BASICS (THE HOOK) ---
  if (introStep === 0) {
    return (
      <div className="max-w-md mx-auto pt-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">Describe Your Event</h1>
          <p className="text-gray-500 text-sm">Start with a rough idea. AI will structure it.</p>
        </div>

        {/* Main Text Area */}
        <div className="mb-6">
          <div className="relative bg-white rounded-3xl shadow-lg border border-gray-100 transition-all focus-within:ring-4 focus-within:ring-purple-50 focus-within:border-purple-200">
            <textarea 
              className="w-full h-40 p-6 bg-transparent outline-none text-lg text-gray-800 placeholder:text-gray-300 resize-none rounded-3xl"
              placeholder="e.g. Sustainable runway show in Brooklyn next month for 300 VIP guests..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              autoFocus
            />
            <div className="absolute bottom-4 right-6">
              <span className={`text-xs font-bold ${aiPrompt.length > 10 ? 'text-green-500' : 'text-gray-300'}`}>
                {aiPrompt.length} chars
              </span>
            </div>
          </div>
        </div>

        {/* Quick Inputs */}
        <div className="space-y-3 mb-8">
          {/* Date Input */}
          <div className="relative" ref={calendarRef}>
            <div 
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mr-4">
                <Calendar size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">When</p>
                <input 
                  type="text" 
                  readOnly
                  placeholder="Date or Season..." 
                  className="w-full outline-none font-medium text-gray-800 placeholder:text-gray-300 bg-transparent cursor-pointer"
                  value={dateInput}
                />
              </div>
            </div>
            {/* Calendar Dropdown */}
            {showCalendar && (
              <div className="absolute top-full left-0 mt-2 z-50 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 animate-in fade-in zoom-in-95">
                <div className="flex gap-2 p-2 mb-2 overflow-x-auto border-b border-gray-100 pb-3 hide-scrollbar">
                  {[{l:'Next Fri',t:'next_friday'},{l:'Next Week',t:'next_week'},{l:'Next Month',t:'next_month'}].map((s: any, i) => (
                    <button key={i} onClick={(e)=>{e.stopPropagation();handleDateShortcut(s.t)}} className="px-3 py-2 text-[10px] font-bold bg-gray-50 rounded-lg whitespace-nowrap hover:bg-purple-50">{s.l}</button>
                  ))}
                </div>
                <div className="p-2 flex justify-center"><CalendarPicker initialStart={null} initialEnd={null} onClose={()=>setShowCalendar(false)} onApply={handleDateApply} minDate={new Date()} /></div>
              </div>
            )}
          </div>

          {/* Location Input */}
          <div className="flex items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm focus-within:ring-2 focus-within:ring-purple-50 transition-all">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mr-4">
              <MapPin size={20} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Where</p>
              <input 
                type="text" 
                placeholder="City or Venue..." 
                className="w-full outline-none font-medium text-gray-800 placeholder:text-gray-300 bg-transparent"
                value={locInput}
                onChange={(e) => setLocInput(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button 
          size="lg" 
          variant="primary" 
          fullWidth
          onClick={next} 
          disabled={!aiPrompt.trim()} 
          className="rounded-full h-14 text-base shadow-xl shadow-purple-500/20"
        >
          Next: Guide the AI <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>
    );
  }

  // --- SCREEN 2: GUIDE THE AI (CONTEXT) ---
  if (introStep === 1) {
    return (
      <div className="max-w-md mx-auto pt-8 px-4 animate-in fade-in slide-in-from-right-8 duration-500">
        <div className="flex items-center mb-8">
          <button onClick={back} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft /></button>
          <h1 className="text-2xl font-serif font-bold text-gray-900 ml-2">Add Context</h1>
        </div>

        {/* Mood Tags */}
        <div className="mb-8">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 block ml-1">Vibe & Style</label>
          <div className="flex flex-wrap gap-2">
            {MOOD_OPTIONS.map(mood => (
              <button
                key={mood}
                onClick={() => toggleSelection(aiMoods, setAiMoods, mood)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  aiMoods.includes(mood) 
                    ? 'bg-black text-white border-black shadow-lg' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Audience Tags */}
        <div className="mb-8">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 block ml-1">Target Audience</label>
          <div className="flex flex-wrap gap-2">
            {AUDIENCE_OPTIONS.map(aud => (
              <button
                key={aud}
                onClick={() => toggleSelection(aiAudiences, setAiAudiences, aud)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  aiAudiences.includes(aud) 
                    ? 'bg-black text-white border-black shadow-lg' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {aud}
              </button>
            ))}
          </div>
        </div>

        {/* URLs & Files */}
        <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 mb-8">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 block">Reference Material</label>
          
          {/* URL Input */}
          <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-200 focus-within:border-purple-400 transition-colors mb-3">
            <LinkIcon size={16} className="text-gray-400" />
            <input 
              type="url" 
              placeholder="Paste website or social URL..." 
              className="flex-1 bg-transparent outline-none text-sm"
              value={currentUrlInput}
              onChange={(e) => setCurrentUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
            />
            <button onClick={handleAddUrl} disabled={!currentUrlInput} className="text-purple-600 font-bold text-xs uppercase">Add</button>
          </div>

          {/* Active URLs */}
          {aiUrls.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {aiUrls.map((url, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded-lg text-[10px] font-bold text-gray-600">
                  <Globe size={10} /> {url.replace('https://','').substring(0,15)}...
                  <button onClick={() => removeUrl(url)}><X size={10} /></button>
                </span>
              ))}
            </div>
          )}

          {/* File Upload */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:bg-white transition-colors"
          >
            <div className="flex flex-col items-center gap-1">
              <Upload size={20} className="text-gray-400" />
              <span className="text-xs font-bold text-gray-500">Upload Docs or Images</span>
            </div>
            <input type="file" ref={fileInputRef} className="hidden" multiple accept=".pdf,.doc,.docx,.txt,.jpg,.png" onChange={handleFileChange} />
          </div>
          
          {/* Active Files */}
          {aiFiles.length > 0 && (
            <div className="mt-3 space-y-1">
              {aiFiles.map((f, i) => (
                <div key={i} className="flex justify-between items-center text-xs bg-white p-2 rounded-lg border border-gray-100">
                  <span className="truncate max-w-[200px]">{f.name}</span>
                  <button onClick={() => removeFile(i)}><X size={12} className="text-gray-400"/></button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button size="lg" variant="primary" fullWidth onClick={next} className="rounded-full h-14 text-base">
          Review & Generate <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>
    );
  }

  // --- SCREEN 3: CONFIRMATION (PRE-FLIGHT) ---
  return (
    <div className="max-w-md mx-auto pt-8 px-4 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex items-center mb-6">
        <button onClick={back} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft /></button>
        <h1 className="text-2xl font-serif font-bold text-gray-900 ml-2">Summary</h1>
      </div>

      {/* The Input Card */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Inputs</span>
          <button onClick={() => setIntroStep(0)} className="text-xs font-bold text-purple-600">Edit</button>
        </div>
        <div className="p-6">
          <p className="text-lg font-medium text-gray-900 mb-4 line-clamp-4">"{aiPrompt}"</p>
          <div className="flex flex-wrap gap-2">
            {dateInput && <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><Calendar size={10}/> {dateInput}</span>}
            {locInput && <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><MapPin size={10}/> {locInput}</span>}
            {[...aiMoods, ...aiAudiences].map((t, i) => (
              <span key={i} className="bg-black text-white px-2 py-1 rounded text-xs font-bold uppercase">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Power Ups */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 ml-1">AI Power-Ups</p>
        <div className="space-y-3">
          {[
            { label: 'Suggest Sponsors', state: askForSponsors, set: setAskForSponsors, icon: DollarSign, color: 'text-green-600 bg-green-50' },
            { label: 'Draft Social Captions', state: askForSocial, set: setAskForSocial, icon: Instagram, color: 'text-pink-600 bg-pink-50' },
            { label: 'Suggest Layout', state: askForLayout, set: setAskForLayout, icon: LayoutTemplate, color: 'text-blue-600 bg-blue-50' },
          ].map((opt, i) => (
            <div 
              key={i} 
              onClick={() => opt.set(!opt.state)}
              className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${opt.state ? 'bg-white border-purple-500 shadow-md ring-1 ring-purple-100' : 'bg-white border-gray-100 hover:border-gray-300'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${opt.color}`}>
                  <opt.icon size={16} />
                </div>
                <span className={`text-sm font-bold ${opt.state ? 'text-gray-900' : 'text-gray-500'}`}>{opt.label}</span>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${opt.state ? 'bg-purple-600 border-purple-600' : 'border-gray-300'}`}>
                {opt.state && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button 
        size="lg" 
        variant="primary" 
        fullWidth
        onClick={handleFinalGenerate}
        disabled={isLoading}
        className="rounded-full h-14 text-base shadow-xl shadow-purple-500/20"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} className="mr-2" />}
        {isLoading ? 'Architecting Event...' : 'Generate Draft Blueprint'}
      </Button>
      
      <div className="text-center mt-4">
        <button onClick={onSkip} className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider">Skip AI & Build Manually</button>
      </div>
    </div>
  );
};
