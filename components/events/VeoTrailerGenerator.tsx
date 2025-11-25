
import React, { useState } from 'react';
import { Film, Sparkles, Play, Download, Share2, RefreshCw } from 'lucide-react';
import { Button } from '../Button';
import { FadeIn } from '../FadeIn';
import { FeaturedEvent } from '../../data/mockEvents';
import { supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { LoadingSpinner } from '../LoadingSpinner';

interface VeoTrailerGeneratorProps {
  featuredEvent: FeaturedEvent;
  brandColors?: string;
}

export const VeoTrailerGenerator: React.FC<VeoTrailerGeneratorProps> = ({ featuredEvent, brandColors }) => {
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

        // 2. Start Generation (Call Edge Function)
        setStatusStep('Consulting Veo 3.1 Director...');
        
        const promptText = `
          Cinematic fashion event trailer for "${featuredEvent.title}".
          Vibe: ${featuredEvent.desc}.
          ${brandColors ? `Color Palette: ${brandColors} and matching tones.` : ''}
          Style: High fashion runway, slow motion, 4k, highly detailed, atmospheric lighting, cinematic depth of field.
          Camera: Smooth tracking shot.
        `.trim();

        const startResp = await fetch(`${supabaseUrl}/functions/v1/generate-media`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${supabaseAnonKey}` },
          body: JSON.stringify({
            action: 'start',
            prompt: promptText,
            imageBase64: base64Data,
            imageType: imageBlob.type
          })
        });

        if (!startResp.ok) throw new Error('Failed to start video generation');
        const { operationName } = await startResp.json();

        // 3. Poll for Completion
        setStatusStep('Generating video frames (Veo 3.1)...');
        let isDone = false;
        let downloadUri = null;

        // Polling loop (max 2 minutes)
        const startTime = Date.now();
        while (!isDone && Date.now() - startTime < 120000) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            const pollResp = await fetch(`${supabaseUrl}/functions/v1/generate-media`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${supabaseAnonKey}` },
              body: JSON.stringify({
                action: 'poll',
                operationName
              })
            });
            
            const pollData = await pollResp.json();
            isDone = pollData.done;
            downloadUri = pollData.uri;
            
            if (!isDone) setStatusStep('Rendering final cut...');
        }

        // 4. Secure Download Proxy
        if (downloadUri) {
            setStatusStep('Downloading trailer...');
            const downloadResp = await fetch(`${supabaseUrl}/functions/v1/generate-media`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${supabaseAnonKey}` },
              body: JSON.stringify({
                action: 'download',
                downloadUri
              })
            });

            if (!downloadResp.ok) throw new Error('Download failed');
            const videoBlob = await downloadResp.blob();
            const localUrl = URL.createObjectURL(videoBlob);
            setVideoUrl(localUrl);
        } else {
            throw new Error("Video generation timed out or failed.");
        }

    } catch (e) {
        console.error("Veo generation failed", e);
        alert(`Failed to generate trailer: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
        setLoading(false);
        setStatusStep('');
    }
  };

  const handleDownload = () => {
    if (!videoUrl) return;
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `trailer-${featuredEvent.title.toLowerCase().replace(/\s+/g, '-')}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShare = () => {
    if (navigator.share && videoUrl) {
      // Note: sharing blob URLs might not work on all browsers, usually requires a file object
      alert("Share dialog opened (Mock).");
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  return (
    <section className="py-12 bg-black text-white overflow-hidden rounded-b-3xl">
       <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
             {/* Left: Context */}
             <div className="lg:w-1/2">
                <FadeIn>
                   <div className="inline-flex items-center gap-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6">
                      <Film size={12} /> Powered by Veo 3.1
                   </div>
                   <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 leading-tight">
                      Generate Event Trailers <br/> in Seconds.
                   </h2>
                   <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
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
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/20 bg-gray-800">
                               <img src={featuredEvent.image} className="w-full h-full object-cover" alt="Asset" />
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block">Visual Source</span>
                                <span className="text-xs text-gray-500">Brand Imagery</span>
                            </div>
                         </div>
                         {brandColors && (
                             <div>
                                 <span className="block text-xs text-gray-500 font-bold uppercase">Color Palette</span>
                                 <p className="text-sm text-gray-300">{brandColors}</p>
                             </div>
                         )}
                      </div>
                   </div>

                   {!videoUrl ? (
                       <Button 
                          variant="white" 
                          size="lg" 
                          className="gap-3 w-full md:w-auto"
                          onClick={handleGenerate}
                          disabled={loading}
                       >
                          {loading ? <LoadingSpinner size={20} /> : <Sparkles size={20} />}
                          {loading ? "Generating..." : "Generate 8s Trailer"}
                       </Button>
                   ) : (
                       <Button 
                          variant="outline" 
                          size="lg" 
                          className="gap-3 w-full md:w-auto text-white border-white hover:bg-white hover:text-black"
                          onClick={handleGenerate}
                       >
                          <RefreshCw size={20} /> Regenerate
                       </Button>
                   )}
                   <p className="text-xs text-gray-500 mt-4 ml-1">* Approx 1-2 min generation time.</p>
                </FadeIn>
             </div>

             {/* Right: Video Player */}
             <div className="lg:w-1/2 w-full">
                <FadeIn direction="left">
                   <div className="flex flex-col gap-4">
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
                                      <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                                         <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                                         <LoadingSpinner size={80} className="text-purple-500 absolute inset-0" />
                                         <Sparkles className="relative text-white animate-pulse" size={24} />
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

                       {/* Action Buttons */}
                       {videoUrl && (
                           <div className="flex gap-3 animate-in fade-in slide-in-from-top-4">
                               <Button fullWidth variant="primary" onClick={handleDownload} className="bg-purple-600 border-purple-600 hover:bg-purple-700 text-white">
                                   <Download size={16} className="mr-2" /> Download MP4
                               </Button>
                               <Button fullWidth variant="outline" onClick={handleShare} className="text-white border-white/30 hover:bg-white/10">
                                   <Share2 size={16} className="mr-2" /> Share
                               </Button>
                           </div>
                       )}
                   </div>
                </FadeIn>
             </div>
          </div>
       </div>
    </section>
  );
};
