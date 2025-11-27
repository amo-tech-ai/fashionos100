
import React, { useState } from 'react';
import { Sparkles, Download, Check, Loader2, Maximize2 } from 'lucide-react';
import { Button } from '../../../Button';
import { GeneratedImage } from '../types';
import { supabase, supabaseUrl, supabaseAnonKey, isConfigured } from '../../../../lib/supabase';

export interface ProRefinementPanelProps {
  previewImage: GeneratedImage;
  onRefined: (finalImage: GeneratedImage) => void;
}

export const ProRefinementPanel: React.FC<ProRefinementPanelProps> = ({ previewImage, onRefined }) => {
  const [isRefining, setIsRefining] = useState(false);
  const [refinedImage, setRefinedImage] = useState<GeneratedImage | null>(null);

  const handleRefine = async () => {
    if (!isConfigured) {
      alert("App not configured correctly (Supabase keys missing).");
      return;
    }

    setIsRefining(true);
    try {
      // 1. Get User Session
      const { data: { session } } = await (supabase.auth as any).getSession();
      const token = session?.access_token || supabaseAnonKey;

      // 2. Call Edge Function
      const response = await fetch(`${supabaseUrl}/functions/v1/generate-image-final`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          baseImageBase64: previewImage.base64,
          prompt: previewImage.prompt || "High fashion event",
          size: '2K'
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // 3. Handle Success
      const newImage: GeneratedImage = {
        id: Math.random().toString(36).substring(7),
        base64: data.image,
        prompt: previewImage.prompt,
        model: 'pro'
      };

      setRefinedImage(newImage);
      onRefined(newImage);

    } catch (error) {
      console.error("Refinement failed", error);
      alert("Refinement failed. Ensure you have access to Gemini Pro Image.");
    } finally {
      setIsRefining(false);
    }
  };

  if (refinedImage) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-1 border border-gray-800 shadow-2xl">
        <div className="bg-gray-900 rounded-[22px] overflow-hidden relative">
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-amber-400 text-black text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-lg flex items-center gap-1">
              <Sparkles size={10} /> Gemini Pro Final
            </span>
          </div>
          <img 
            src={`data:image/png;base64,${refinedImage.base64}`} 
            className="w-full h-auto object-cover max-h-[500px]" 
            alt="Final High-Res" 
          />
          <div className="p-6 flex justify-between items-center bg-gray-900/90 backdrop-blur border-t border-gray-800">
            <div className="text-white">
              <h4 className="font-bold text-lg">Production Ready</h4>
              <p className="text-xs text-gray-400">2048x2048 • PNG • Upscaled</p>
            </div>
            <div className="flex gap-3">
                <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    <Download size={14} className="mr-2" /> Save
                </Button>
                <div className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                    <Check size={14} /> Selected
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white rounded-3xl p-8 text-center border border-gray-800 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 group-hover:opacity-100 opacity-50 transition-opacity" />
      
      <div className="relative z-10">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10">
          <Sparkles className="text-amber-400" size={32} />
        </div>
        <h3 className="text-2xl font-serif font-bold mb-2">Fusion Mode</h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">
          Upgrade your selected draft to 4K resolution with realistic lighting, textures, and details using Gemini Pro Vision.
        </p>
        
        <Button 
          size="lg" 
          onClick={handleRefine} 
          disabled={isRefining}
          className="bg-gradient-to-r from-amber-400 to-orange-500 text-black border-none hover:shadow-lg hover:shadow-orange-500/20 font-bold"
        >
          {isRefining ? <Loader2 className="animate-spin" /> : <Maximize2 className="mr-2" size={18} />}
          {isRefining ? 'Refining (30s)...' : 'Refine with Gemini Pro'}
        </Button>
      </div>
    </div>
  );
};
