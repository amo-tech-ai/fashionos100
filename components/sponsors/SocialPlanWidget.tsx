
import React, { useState } from 'react';
import { Sparkles, Instagram, Video, Linkedin, Twitter, Copy, Check } from 'lucide-react';
import { Button } from '../Button';
import { LoadingSpinner } from '../LoadingSpinner';
import { supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { SocialPostPlan } from '../../types/sponsorship';
import { FadeIn } from '../FadeIn';

interface Props {
  sponsorName: string;
  sponsorIndustry: string;
  eventName: string;
}

export const SocialPlanWidget: React.FC<Props> = ({ sponsorName, sponsorIndustry, eventName }) => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<SocialPostPlan[] | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/sponsor-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          action: 'generate-social-plan',
          sponsorName,
          sponsorIndustry,
          eventDetails: eventName
        })
      });
      const data = await response.json();
      if (data.posts) {
        setPlan(data.posts);
      }
    } catch (e) {
      console.error("Failed to generate plan", e);
      alert("AI Agent is busy. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
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
          className="gap-2"
        >
          {loading ? <LoadingSpinner size={16} /> : <Sparkles size={16} />}
          {plan ? 'Regenerate' : 'Generate Plan'}
        </Button>
      </div>

      {!plan && !loading && (
        <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="text-purple-400" size={24} />
          </div>
          <p className="text-gray-500 max-w-xs mx-auto text-sm">
            Click generate to create a tailored social media schedule based on your brand and this event.
          </p>
        </div>
      )}

      {loading && (
        <div className="py-12 text-center space-y-4">
          <LoadingSpinner className="mx-auto text-purple-600" size={32} />
          <p className="text-sm text-gray-500 animate-pulse">Analyzing trends & drafting captions...</p>
        </div>
      )}

      {plan && (
        <div className="space-y-4 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-100">
          {plan.map((post, idx) => (
            <FadeIn key={idx} delay={idx * 100}>
              <div className="relative pl-10">
                <div className="absolute left-[11px] top-4 w-3 h-3 bg-purple-200 rounded-full border-2 border-white ring-2 ring-purple-50"></div>
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-purple-200 transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 mb-1 block">{post.day}</span>
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(post.platform)}
                        <span className="font-bold text-sm text-gray-900">{post.platform} • {post.content_type}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(post.caption, idx)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      title="Copy Caption"
                    >
                      {copiedIndex === idx ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                  
                  <div className="bg-white p-3 rounded-xl border border-gray-200 mb-3">
                    <p className="text-sm text-gray-600 italic">"{post.caption}"</p>
                  </div>
                  
                  <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50/50 p-2 rounded-lg">
                    <Video size={14} className="mt-0.5 text-blue-400 shrink-0" />
                    <span><strong className="text-blue-700">Visual:</strong> {post.visual_idea}</span>
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
