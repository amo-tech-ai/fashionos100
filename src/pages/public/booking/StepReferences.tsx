
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight, Plus, Link as LinkIcon, Trash2, Sparkles, Loader2, Image as ImageIcon, Check } from 'lucide-react';
import { Input } from '../../../components/forms/Input';
import { Textarea } from '../../../components/forms/Textarea';
import { supabaseUrl, supabaseAnonKey } from '../../../lib/supabase';
import { uploadEventImage } from '../../../lib/storage';

export const StepReferences: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();
  
  // Tab State
  const [activeTab, setActiveTab] = useState<'link' | 'ai'>('link');

  // Link Input State
  const [urlInput, setUrlInput] = useState('');

  // AI Generation State
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const addUrl = () => {
    if (urlInput && !state.references.includes(urlInput)) {
      updateState({ references: [...state.references, urlInput] });
      setUrlInput('');
    }
  };

  const removeUrl = (url: string) => {
    updateState({ references: state.references.filter(r => r !== url) });
  };

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    setGeneratedImages([]);

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/generate-moodboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({ 
          prompt: aiPrompt,
          style: state.style // Use the selected style from previous step context
        })
      });

      const data = await response.json();
      if (data.images) {
        // Store as base64 data URIs for preview
        const imageUrls = data.images.map((img: any) => `data:${img.mimeType};base64,${img.base64}`);
        setGeneratedImages(imageUrls);
      }
    } catch (error) {
      console.error("Generation failed", error);
      alert("Failed to generate moodboard. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectImage = async (base64Url: string, index: number) => {
    setUploadingIndex(index);
    try {
      // Upload to storage to get a permanent URL
      // Strip the prefix for the upload function if it expects raw base64, 
      // but our uploadEventImage utility handles stripping.
      const publicUrl = await uploadEventImage(base64Url, `moodboard-${Date.now()}-${index}`);
      
      if (publicUrl) {
        updateState({ references: [...state.references, publicUrl] });
        // Optional: remove from generated list or mark as selected? 
        // For now we keep them visible but maybe clear the list if desired.
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <FadeIn>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-serif font-bold mb-4">Moodboard</h1>
        <p className="text-gray-500 text-lg mb-10">
          Share links or generate AI visuals to communicate your vision.
        </p>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
          
          {/* Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-6 w-fit">
            <button
              onClick={() => setActiveTab('link')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'link' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LinkIcon size={14} /> Add Link
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'ai' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-purple-600'
              }`}
            >
              <Sparkles size={14} /> AI Generator
            </button>
          </div>

          {/* LINK MODE */}
          {activeTab === 'link' && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input 
                    placeholder="https://pinterest.com/board..." 
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addUrl()}
                    className="bg-white"
                  />
                </div>
                <Button onClick={addUrl} disabled={!urlInput} className="mt-1.5 h-[46px] w-[46px] p-0 flex items-center justify-center">
                  <Plus size={24} />
                </Button>
              </div>
            </div>
          )}

          {/* AI MODE */}
          {activeTab === 'ai' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 mb-8">
               <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <Textarea 
                        placeholder="Describe your mood... e.g. 'Futuristic neon city with rain, high contrast, cinematic lighting'"
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        className="bg-white min-h-[80px]"
                    />
                  </div>
                  <Button 
                    onClick={handleGenerate} 
                    disabled={!aiPrompt || isGenerating} 
                    className="mt-1.5 h-[80px] px-6 flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-purple-600 to-indigo-600 border-none"
                  >
                    {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
                    <span className="text-[10px] uppercase font-bold">Generate</span>
                  </Button>
               </div>

               {/* Results Grid */}
               {generatedImages.length > 0 && (
                  <div className="mt-6 grid grid-cols-3 gap-4">
                      {generatedImages.map((img, i) => (
                          <div key={i} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-purple-500 transition-all" onClick={() => handleSelectImage(img, i)}>
                              <img src={img} alt="Generated" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  {uploadingIndex === i ? (
                                      <Loader2 className="text-white animate-spin" />
                                  ) : (
                                      <div className="bg-white text-black px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                                          <Plus size={12} /> Add
                                      </div>
                                  )}
                              </div>
                          </div>
                      ))}
                  </div>
               )}
            </div>
          )}

          {/* Reference List */}
          <div className="space-y-3 border-t border-gray-100 pt-6 mt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Your References ({state.references.length})</h3>
            
            {state.references.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-gray-100 rounded-xl">
                <ImageIcon className="mx-auto text-gray-200 mb-2" size={24} />
                <p className="text-gray-400 text-sm">No references added yet.</p>
              </div>
            )}

            {state.references.map((ref, i) => {
              const isImage = ref.match(/\.(jpeg|jpg|gif|png)$/) != null || ref.includes('supabase') || ref.includes('data:image');
              return (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 shrink-0 overflow-hidden">
                      {isImage ? (
                          <img src={ref} alt="Ref" className="w-full h-full object-cover" />
                      ) : (
                          <LinkIcon size={16} className="text-purple-600" />
                      )}
                    </div>
                    <a href={ref} target="_blank" rel="noreferrer" className="text-sm font-medium text-gray-700 truncate hover:text-purple-600 hover:underline max-w-[200px] md:max-w-md">
                        {ref}
                    </a>
                  </div>
                  <button onClick={() => removeUrl(ref)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="primary" size="lg" onClick={() => navigate('/start-project/brief')}>
            Next: Creative Brief <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};
