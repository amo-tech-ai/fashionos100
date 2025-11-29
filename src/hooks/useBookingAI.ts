
import { useState } from 'react';
import { supabaseUrl, supabaseAnonKey } from '../lib/supabase';
import { AiRequestPayload, PolishedBrief, ShotRecommendation } from '../types/ai-booking';
import { FullBrandProfile } from '../types/brand';

export const useBookingAI = () => {
  const [loading, setLoading] = useState(false);

  const callAI = async (payload: AiRequestPayload) => {
    setLoading(true);
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/booking-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error('AI Request Failed');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const polishBrief = async (rawText: string, brandProfile?: FullBrandProfile): Promise<PolishedBrief | null> => {
    return await callAI({
      action: 'polish-brief',
      context: { 
        rawText,
        // Pass brand context for tone matching
        brandContext: brandProfile ? {
             mood: brandProfile.visuals?.moods,
             voice: brandProfile.identity?.tone_of_voice
        } : undefined
      }
    });
  };

  const recommendShots = async (category: string, style: string, brandProfile?: FullBrandProfile): Promise<ShotRecommendation | null> => {
    return await callAI({
      action: 'recommend-shots',
      context: { 
        category, 
        style,
        // Pass detailed brand context for smarter shot selection
        brandContext: brandProfile ? {
            description: brandProfile.identity?.core_description,
            colors: brandProfile.visuals?.colors,
            mood: brandProfile.visuals?.moods,
            target_audience: brandProfile.identity?.target_audience
        } : undefined
      }
    });
  };

  return {
    loading,
    polishBrief,
    recommendShots
  };
};
