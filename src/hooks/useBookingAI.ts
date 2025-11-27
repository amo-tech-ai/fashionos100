
import { useState } from 'react';
import { supabaseUrl, supabaseAnonKey } from '../lib/supabase';
import { AiRequestPayload, PolishedBrief, ShotRecommendation } from '../types/ai-booking';

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

  const polishBrief = async (rawText: string): Promise<PolishedBrief | null> => {
    return await callAI({
      action: 'polish-brief',
      context: { rawText }
    });
  };

  const recommendShots = async (category: string, style: string): Promise<ShotRecommendation | null> => {
    return await callAI({
      action: 'recommend-shots',
      context: { category, style }
    });
  };

  return {
    loading,
    polishBrief,
    recommendShots
  };
};
