
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Film, Sparkles, Loader2, Play } from 'lucide-react';
import { Button } from '../Button';
import { FadeIn } from '../FadeIn';
import { FeaturedEvent } from '../../data/mockEvents';

interface VeoTrailerGeneratorProps {
  featuredEvent: FeaturedEvent;
}

export const VeoTrailerGenerator: React.FC<VeoTrailerGeneratorProps> = ({ featuredEvent }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusStep, setStatusStep] = useState('');

  const handleGenerate = async () => {
    if (loading) return;
    setLoading(true);
    setVideoUrl(null);

    try {
        // 1. Process Image
        setStatusStep('Analyzing brand assets...');
        const imageResp = await fetch(featuredEvent.image);
        const imageBlob = await imageResp.blob();
        const base64Data = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
            reader.readAsDataURL(imageBlob);
        });

        // 2. Initialize Veo Generation
        setStatusStep('Consulting Veo 3.1 Director...');
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: `Cinematic fashion event trailer for "${featuredEvent.title}". 
                     Vibe: ${featuredEvent.desc}. 
                     Style: High fashion runway, slow motion, 4k, highly detailed, atmospheric lighting.`,
            image: {
                imageBytes: base64Data,
                mimeType: imageBlob.type || 'image/jpeg',
            },
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: '16:9'
            }
        });

        // 3. Poll for Completion
        setStatusStep('Generating video frames...');
        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            operation = await ai.operations.getVideosOperation({operation: operation});
            setStatusStep('Rendering final cut...');
        }

        // 4. Fetch Result
        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (downloadLink) {
            const videoResp = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
            const videoBlob = await videoResp.blob();
            const localUrl = URL.createObjectURL(videoBlob);
            setVideoUrl(localUrl);
        }

    } catch (e) {
        console.error("Veo generation failed", e);
        alert(`Failed to generate trailer: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
        setLoading(false);
        setStatusStep('');
    }
  };

  return (
    <section className="py-20 bg-black text-white overflow-hidden">
       <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
             {/* Left: Context */}
             <div className="lg:w-1/2">
                <FadeIn>
                   <div className="inline-flex items-center gap-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6">
                      <Film size={12} /> Powered by Veo 3.1
                   </div>
                   <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                      Generate Event Trailers <br/> in Seconds.
                   </h2>
                   <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                      Turn your event description and brand assets into a cinematic 8-second teaser instantly using Google's Veo 3.1 model.
                   </p>
                   
                   <div className="bg-white/10 rounded-2xl p-6 border border-white/10 mb-8 backdrop-blur-md">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Trailer Context</h4>
                      <div className="space-y-4">
                         <div>
                            <span className="block text-xs text-gray-500 font-bold uppercase">Event</span>
                            <p className="font-serif text-lg">{featuredEvent.title}</p>
                         </div>
                         <div className="flex items-center gap-3 pt-2">
                            <img src={featuredEvent.image} className="w-12 h-12 rounded-lg object-cover border border-white/20" alt="Asset" />
                            <span className="text-xs text-gray-400">Source Asset</span>
                         </div>
                      </div>
                   </div>

                   <Button 
                      variant="white" 
                      size="lg" 
                      className="gap-3 w-full md:w-auto"
                      onClick={handleGenerate}
                      disabled={loading}
                   >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                      {loading ? "Generating..." : "Generate 8s Trailer"}
                   </Button>
                   <p className="text-xs text-gray-500 mt-4 ml-1">* Approx 1-2 min generation time.</p>
                </FadeIn>
             </div>

             {/* Right: Video Player */}
             <div className="lg:w-1/2 w-full">
                <FadeIn direction="left">
                   <div className="relative aspect-video bg-gray-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                      {videoUrl ? (
                         <video 
                            src={videoUrl} 
                            controls 
                            autoPlay 
                            loop 
                            className="w-full h-full object-cover" 
                         />
                      ) : (
                         <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                            {loading ? (
                               <>
                                  <div className="relative w-20 h-20 mb-6">
                                     <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                                     <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin"></div>
                                     <Sparkles className="absolute inset-0 m-auto text-white animate-pulse" size={24} />
                                  </div>
                                  <h3 className="text-xl font-bold mb-2 animate-pulse">{statusStep || "Initializing..."}</h3>
                                  <p className="text-gray-500 text-sm">Creating high-fidelity frames...</p>
                               </>
                            ) : (
                               <>
                                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                     <Play className="ml-2 fill-white text-white opacity-50" size={32} />
                                  </div>
                                  <h3 className="text-xl font-bold mb-2">AI Preview</h3>
                                  <p className="text-gray-500 text-sm max-w-xs">Click generate to see Veo 3.1 transform the event details into video.</p>
                               </>
                            )}
                         </div>
                      )}
                      {!videoUrl && !loading && <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />}
                   </div>
                </FadeIn>
             </div>
          </div>
       </div>
    </section>
  );
};
