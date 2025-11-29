
import React, { useState } from 'react';
import { Plus, X, Link as LinkIcon, Sparkles, Loader2, CheckCircle2, Palette } from 'lucide-react';
import { Input } from '../../../forms/Input';
import { Button } from '../../../Button';

export interface BrandStylePanelProps {
  urls: string[];
  onUpdateUrls: (urls: string[]) => void;
  moods: string[];
  onUpdateMoods: (moods: string[]) => void;
  extractionStatus: 'idle' | 'scanning' | 'success' | 'error';
  extractedAnalysis?: string;
}

const PRESET_MOODS = ["Minimalist", "Cyberpunk", "Ethereal", "Grunge", "Luxury", "Sustainable", "Neon"];

export const BrandStylePanel: React.FC<BrandStylePanelProps> = ({ 
  urls, 
  onUpdateUrls, 
  moods, 
  onUpdateMoods,
  extractionStatus = 'idle',
  extractedAnalysis
}) => {
  const [urlInput, setUrlInput] = useState('');

  const addUrl = () => {
    if (urlInput && !urls.includes(urlInput)) {
      onUpdateUrls([...urls, urlInput]);
      setUrlInput('');
    }
  };

  const removeUrl = (idx: number) => {
    onUpdateUrls(urls.filter((_, i) => i !== idx));
  };

  const toggleMood = (mood: string) => {
    if (moods.includes(mood)) {
      onUpdateMoods(moods.filter(m => m !== mood));
    } else {
      onUpdateMoods([...moods, mood]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
      <div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <LinkIcon size={14} className="text-purple-500" /> Brand DNA Sources
          </h3>
          {extractionStatus === 'scanning' && (
            <span className="text-[10px] font-bold text-purple-600 animate-pulse flex items-center gap-1">
              <Loader2 size={10} className="animate-spin"/> Scanning Website...
            </span>
          )}
          {extractionStatus === 'success' && (
            <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 size={10} /> Palette Extracted
            </span>
          )}
          {extractionStatus === 'error' && (
            <span className="text-[10px] font-bold text-red-500 flex items-center gap-1 animate-in fade-in">
              <X size={10} /> Extraction Failed
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mb-3">Add website or Instagram URLs. AI will extract your palette and style.</p>
        
        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <Input 
              placeholder="https://instagram.com/brand" 
              value={urlInput} 
              onChange={(e) => setUrlInput(e.target.value)}
              className="h-10 text-xs"
            />
          </div>
          <Button size="sm" variant="outline" onClick={addUrl} disabled={!urlInput}>
            <Plus size={14} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {urls.map((url, i) => (
            <span key={i} className="inline-flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1 rounded-lg text-[10px] text-gray-600 max-w-full">
              <span className="truncate max-w-[180px]">{url}</span>
              <button onClick={() => removeUrl(i)} className="hover:text-red-500"><X size={10}/></button>
            </span>
          ))}
        </div>

        {extractedAnalysis && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100 animate-in fade-in slide-in-from-top-2">
             <h4 className="font-bold text-purple-900 mb-2 text-xs flex items-center gap-2">
               <Palette size={12} /> AI Visual Analysis
             </h4>
             <p className="text-xs text-purple-800 leading-relaxed opacity-90">
               {extractedAnalysis}
             </p>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Sparkles size={14} className="text-pink-500" /> Vibe Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {PRESET_MOODS.map(mood => (
            <button
              key={mood}
              onClick={() => toggleMood(mood)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                moods.includes(mood) 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
