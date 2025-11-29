
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
   * Generic blob wrapper for binary responses (PDFs, Videos)
   */
  async callEdgeFunctionBlob(functionName: string, body: any): Promise<{ success: boolean; data?: Blob; error?: string }> {
    try {
      // We use the raw invoke but need to handle response type manually if the SDK doesn't support blob inference well
      // The Supabase JS SDK invoke method returns parsed JSON by default. 
      // For binary, we often need to use the global fetch with the session token, 
      // OR rely on the function returning a signed URL (preferred for large files).
      // However, for PDF generation which is small, we can try to use the raw response if supported, 
      // or simply fallback to fetch if SDK limits us.
      
      // Let's use standard fetch with Supabase Auth headers for Blob support
      const { data: { session } } = await supabase.auth.getSession();
      // @ts-ignore
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${functionName}`;
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }

      const blob = await response.blob();
      return { success: true, data: blob };

    } catch (error: any) {
      console.error(`Failed to call ${functionName} (Blob):`, error);
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
    if (params.action === 'download') {
       return this.callEdgeFunctionBlob('generate-media', params);
    }
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
  },

  /**
   * Legal: Generate PDF Contract
   */
  async generateContract(params: { sponsorName: string; terms: string; value: number; date: string; eventName: string }) {
    return this.callEdgeFunctionBlob('generate-contract', params);
  },

  /**
   * Email: Send transactional emails
   */
  async sendEmail(params: { to: string; template: 'booking_confirmation' | 'welcome' | 'alert'; data: any }) {
    return this.callEdgeFunction('send-transactional-email', params);
  }
};
