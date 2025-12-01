
import React, { useState } from 'react';
import { Sparkles, Instagram, Video, Linkedin, Twitter, Copy, Check } from 'lucide-react';
import { Button } from '../Button';
import { LoadingSpinner } from '../LoadingSpinner';
import { supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { SocialPostPlan } from '../../types/sponsorship';
import { FadeIn } from '../FadeIn';
import { useToast } from '../Toast';
import { aiService } from '../../lib/ai-service';

interface Props {
  sponsorName: string;
  sponsorIndustry: string;
  eventName: string;
}

export const SocialPlanWidget: React.FC<Props> = ({ sponsorName, sponsorIndustry, eventName }) => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<SocialPostPlan[] | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast, success, error } = useToast();

  const generatePlan = async () => {
    setLoading(true);
    toast("AI Agent is drafting your social calendar...", "info");
    
    try {
      const result = await aiService.sponsorAgent('generate-social-plan', {
        sponsorName,
        sponsorIndustry,
        eventDetails: eventName
      });
      
      if (result.success && result.data?.posts) {
        setPlan(result.data.posts);
        success("Social plan generated successfully!");
      } else {
        throw new Error(result.error || "Failed to generate plan");
      }
    } catch (e) {
      console.error("Failed to generate plan", e);
      error("AI Agent encountered an issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast("Caption copied to clipboard", "success");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getPlatformIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('instagram')) return <Instagram size={16} className="text-pink-600" />;
    if (p.includes('tiktok')) return <Video size={16} className="text-black" />;
    if (p.includes('linkedin')) return <Linkedin size={16} className="text-blue-700" />;
    return <Twitter size={16} className="text-blue-400" />;
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-serif font-bold text-2xl text-gray-900">Content Planner</h3>
          <p className="text-gray-500 text-sm mt-1">AI-generated schedule for maximum impact.</p>
        </div>
        <Button 
          variant={plan ? "outline" : "primary"} 
          size="sm" 
          onClick={generatePlan} 
          disabled={loading}
          className="gap-2 shadow-lg shadow-purple-500/20"
        >
          {loading ? <LoadingSpinner size={16} /> : <Sparkles size={16} />}
          {plan ? 'Regenerate Plan' : 'Generate Social Plan'}
        </Button>
      </div>

      {!plan && !loading && (
        <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-100">
            <Sparkles className="text-purple-500" size={24} />
          </div>
          <h4 className="font-bold text-gray-900 mb-2">No Plan Generated Yet</h4>
          <p className="text-gray-500 max-w-xs mx-auto text-sm mb-6">
            Click the button above to have our AI Agent create a tailored social media schedule based on your brand and this event.
          </p>
          <Button variant="ghost" size="sm" onClick={generatePlan} className="text-purple-600 hover:bg-purple-50">
            Generate Now
          </Button>
        </div>
      )}

      {loading && (
        <div className="py-20 text-center space-y-4">
          <div className="relative mx-auto w-16 h-16">
            <div className="absolute inset-0 border-4 border-purple-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
            <Sparkles className="absolute inset-0 m-auto text-purple-600 animate-pulse" size={24} />
          </div>
          <p className="text-sm font-bold text-gray-700 animate-pulse">Analyzing trends & drafting captions...</p>
          <p className="text-xs text-gray-400">This may take a few seconds</p>
        </div>
      )}

      {plan && (
        <div className="space-y-6 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-purple-200 before:to-transparent">
          {plan.map((post, idx) => (
            <FadeIn key={idx} delay={idx * 100}>
              <div className="relative pl-10">
                <div className="absolute left-[11px] top-4 w-3 h-3 bg-purple-500 rounded-full border-2 border-white ring-2 ring-purple-100 z-10"></div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 mb-1 block bg-purple-50 px-2 py-0.5 rounded-full w-fit">
                        {post.day}
                      </span>
                      <div className="flex items-center gap-2 mt-2">
                        {getPlatformIcon(post.platform)}
                        <span className="font-bold text-sm text-gray-900">{post.platform} • {post.content_type}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(post.caption, idx)}
                      className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                      title="Copy Caption"
                    >
                      {copiedIndex === idx ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-200/50 mb-3 group-hover:border-purple-100 transition-colors">
                    <p className="text-sm text-gray-600 italic leading-relaxed">"{post.caption}"</p>
                  </div>
                  
                  <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100/50">
                    <Video size={14} className="mt-0.5 text-blue-500 shrink-0" />
                    <span className="leading-snug"><strong className="text-blue-700">Visual Direction:</strong> {post.visual_idea}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
};
