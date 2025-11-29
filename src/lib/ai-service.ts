
import { supabase } from './supabase';

export interface AiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export const aiService = {
  /**
   * Generic wrapper for Supabase Edge Function calls using the SDK.
   * This automatically handles Auth headers (JWT) and error parsing.
   */
  async callEdgeFunction<T>(functionName: string, body: any): Promise<AiResponse<T>> {
    try {
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: body,
      });

      if (error) {
        // Try to parse the error message if it's a stringified JSON
        let errorMessage = error.message;
        try {
          const parsed = JSON.parse(error.message);
          if (parsed.error) errorMessage = parsed.error;
        } catch (e) {
          // ignore
        }
        throw new Error(errorMessage);
      }

      return { success: true, data };
    } catch (error: any) {
      console.error(`Failed to call ${functionName}:`, error);
      return { success: false, error: error.message || 'Unknown error occurred' };
    }
  },

  /**
   * Sponsor AI Agent: Generates activation ideas, lead scores, social plans, etc.
   */
  async sponsorAgent(action: 'activation-ideas' | 'score-lead' | 'generate-social-plan' | 'generate-roi-report' | 'generate-pitch' | 'analyze-media' | 'draft-contract' | 'recommend-packages', params: any) {
    return this.callEdgeFunction('sponsor-ai', { action, ...params });
  },

  /**
   * Event AI Agent: Generates event drafts from text/url
   */
  async eventArchitect(params: { prompt?: string; urls?: string[]; files?: any[]; fileBase64?: string; fileType?: string }) {
    return this.callEdgeFunction('generate-event-draft', params);
  },

  /**
   * Image AI: Generates preview images using Nano/Flash models
   */
  async generateImagePreview(params: { eventDescription: string; city: string; moodTags: string[]; urlList: string[]; imageType: string; creativePrompt: string; useBrandStyle: boolean }) {
    return this.callEdgeFunction('generate-image-preview', params);
  },

  /**
   * Image AI: Refines images using Pro models
   */
  async generateImageFinal(params: { baseImageBase64: string; prompt: string; size: string }) {
    return this.callEdgeFunction('generate-image-final', params);
  },

  /**
   * Logistics AI: Resolves venues using Maps Grounding
   */
  async resolveVenue(venueText: string) {
    return this.callEdgeFunction('resolve-venue', { venueText });
  },

  /**
   * Logistics AI: Optimizes schedules using Reasoning models
   */
  async scheduleOptimizer(params: { eventDetails: any; venueConstraints: string; talentSchedules: string }) {
    return this.callEdgeFunction('schedule-optimizer', params);
  },

  /**
   * Veo AI: Video Generation wrapper
   */
  async generateMedia(params: { action: 'start' | 'poll' | 'download'; prompt?: string; imageBase64?: string; imageType?: string; operationName?: string; downloadUri?: string }) {
    // Note: For download action, we might receive a binary stream. 
    // The invoke method parses JSON by default. 
    // For binary downloads, we might still need raw fetch or handle responseType in invoke if supported.
    // For now, we'll use this for control signals (start/poll).
    return this.callEdgeFunction('generate-media', params);
  },

  /**
   * Creative AI: Polishes text briefs
   */
  async polishBrief(params: { brief: string; type?: 'creative' | 'marketing'; brandContext?: any }) {
    return this.callEdgeFunction('polish-brief', params);
  },
  
  /**
   * Payments: Create Checkout Session
   */
  async createCheckout(params: { amount: number; title: string; successUrl?: string; cancelUrl?: string }) {
    return this.callEdgeFunction('create-checkout', params);
  }
};
