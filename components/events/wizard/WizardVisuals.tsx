
import React, { useState } from 'react';
import { ArrowRight, Sparkles, Wand2 } from 'lucide-react';
import { WizardState, GeneratedImage } from './types';
import { Button } from '../../Button';
import { BrandStylePanel } from './visuals/BrandStylePanel';
import { NanoPreviewGrid } from './visuals/NanoPreviewGrid';
import { ProRefinementPanel } from './visuals/ProRefinementPanel';
import { supabase, supabaseUrl, supabaseAnonKey, isConfigured } from '../../../lib/supabase';
import { uploadEventImage } from '../../../lib/storage';

interface WizardVisualsProps {
  data: WizardState;
  updateData: (updates: Partial<WizardState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const IMAGE_TYPES = ["Hero Banner", "Poster", "Ticket Icon", "Moodboard", "Social Graphic"];

const IMAGE_TYPE_MAP: Record<string, string> = {
  'Hero Banner': 'hero_banner',
  'Poster': 'poster',
  'Ticket Icon': 'ticket_icon',
  'Moodboard': 'moodboard',
  'Social Graphic': 'social_square',
};

export const WizardVisuals: React.FC<WizardVisualsProps> = ({ data, updateData, onNext, onBack }) => {
  const [selectedImageType, setSelectedImageType] = useState("Hero Banner");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [extractionStatus, setExtractionStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');

  const [previews, setPreviews] = useState<GeneratedImage[]>(data.generatedPreviews || []);
  const [selectedPreviewId, setSelectedPreviewId] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState<GeneratedImage | null>(data.finalImage || null);

  const handleGeneratePreviews = async () => {
    if (!isConfigured) {
      alert("Application not configured correctly (missing Supabase keys).");
      return;
    }

    setIsGenerating(true);
    setFinalImage(null);
    setSelectedPreviewId(null);

    if (data.brandUrls && data.brandUrls.length > 0) {
        setExtractionStatus('scanning');
    }

    try {
      // 1. Get Auth Token
      const { data: { session } } = await (supabase.auth as any).getSession();
      const token = session?.access_token || supabaseAnonKey;

      // 2. Prepare Payload
      const apiImageType = IMAGE_TYPE_MAP[selectedImageType] || 'hero_banner';
      
      // Fix: Align with backend schema
      // Backend expects: eventDescription, city, moodTags, urlList, imageType, creativePrompt, useBrandStyle, enableSearch
      const payload = {
        eventDescription: data.description,
        city: data.location,
        moodTags: data.brandMoods,
        urlList: data.brandUrls, // Renamed from brandUrls (though local variable is mapped)
        imageType: apiImageType, // Mapped correctly
        creativePrompt: customPrompt, // Renamed from customPrompt
        useBrandStyle: data.brandUrls.length > 0,
        enableSearch: true
      };

      // 3. Call Edge Function
      const response = await fetch(`${supabaseUrl}/functions/v1/generate-image-preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const res = await response.json();
      if (res.error) throw new Error(res.error);

      // 4. Process Response
      const newImages = res.images.map((img: any, i: number) => ({
        id: `${Date.now()}-${i}`,
        base64: img.base64,
        prompt: res.usedPrompt,
        model: 'nano' as const
      }));

      setPreviews(newImages);
      
      updateData({ 
        generatedPreviews: newImages,
        extractedBrandAnalysis: res.styleContext 
      });

      if (data.brandUrls && data.brandUrls.length > 0) {
          setExtractionStatus('success');
      }

    } catch (error) {
      console.error("Generation error", error);
      alert("Failed to generate previews. Please check your network or API limits.");
      if (data.brandUrls && data.brandUrls.length > 0) {
          setExtractionStatus('error');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveAndNext = async () => {
    // Prioritize refined image, then selected nano preview
    const imageToSave = finalImage || previews.find(p => p.id === selectedPreviewId);

    if (imageToSave) {
        setIsUploading(true);
        try {
            const fileName = `event_${Date.now()}_${imageToSave.model}.png`;
            const publicUrl = await uploadEventImage(imageToSave.base64, fileName);
            
            if (publicUrl) {
                updateData({ 
                    image: publicUrl,
                    finalImage: imageToSave
                });
                onNext();
            } else {
                throw new Error("Upload returned no URL");
            }
        } catch (e) {
            console.error("Upload failed", e);
            alert("Failed to save image. Please try again or skip.");
        } finally {
            setIsUploading(false);
        }
    } else {
        // If no image selected, just proceed
        onNext();
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Sidebar: Controls */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">Image Settings</h3>
            
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Asset Type</label>
              <div className="flex flex-wrap gap-2">
                {IMAGE_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedImageType(type)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all border ${
                      selectedImageType === type 
                        ? 'bg-purple-600 text-white border-purple-600' 
                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Creative Prompt (Optional)</label>
              <textarea 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-500 min-h-[80px] resize-none"
                placeholder="e.g. A futuristic runway with neon rain..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
              />
            </div>
          </div>

          <BrandStylePanel 
            urls={data.brandUrls || []}
            onUpdateUrls={(urls) => {
                updateData({ brandUrls: urls });
                setExtractionStatus('idle');
            }}
            moods={data.brandMoods || []}
            onUpdateMoods={(moods) => updateData({ brandMoods: moods })}
            extractionStatus={extractionStatus}
            extractedAnalysis={data.extractedBrandAnalysis}
          />

          <Button 
            fullWidth 
            size="lg" 
            onClick={handleGeneratePreviews} 
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 border-none shadow-lg shadow-purple-500/20"
          >
            {isGenerating ? <Sparkles className="animate-spin mr-2" /> : <Wand2 className="mr-2" />}
            {isGenerating ? 'Dreaming...' : 'Generate Previews'}
          </Button>
        </div>

        {/* Right Content: Gallery & Refinement */}
        <div className="flex-1 w-full space-y-8">
          
          {/* 1. Nano Banana Grid */}
          <NanoPreviewGrid 
            images={previews}
            selectedId={selectedPreviewId}
            onSelect={(img) => {
                setSelectedPreviewId(img.id);
                setFinalImage(null); // Reset if selecting new base
            }}
            isLoading={isGenerating}
            onRegenerate={handleGeneratePreviews}
          />

          {/* 2. Fusion Mode Panel (Only shown if something is selected) */}
          {selectedPreviewId && previews.find(p => p.id === selectedPreviewId) ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-t border-gray-100 pt-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-gray-200 flex-1" />
                <span className="text-xs font-bold uppercase text-gray-400">Step 2: Refine Selection</span>
                <div className="h-px bg-gray-200 flex-1" />
              </div>
              
              <ProRefinementPanel 
                previewImage={previews.find(p => p.id === selectedPreviewId)!}
                onRefined={(img) => setFinalImage(img)}
              />
            </div>
          ) : (
             previews.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 animate-in fade-in">
                    <div className="text-blue-500 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-blue-800">Select a variant above</p>
                        <p className="text-xs text-blue-600">Choose your favorite draft to unlock 4K refinement.</p>
                    </div>
                </div>
             )
          )}

        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-40 lg:pl-64">
        <div className="container mx-auto px-6 max-w-4xl flex justify-between items-center">
          <Button variant="ghost" onClick={onBack}>Back</Button>
          <Button variant="primary" className="px-8 gap-2" onClick={handleSaveAndNext} disabled={isUploading}>
            {isUploading ? 'Saving...' : 'Save & Continue'} <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
