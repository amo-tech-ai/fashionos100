
import { supabaseUrl, supabaseAnonKey } from './supabase';

export interface AiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export const aiService = {
  /**
   * Generic wrapper for Edge Function calls
   */
  async callEdgeFunction<T>(functionName: string, body: any): Promise<AiResponse<T>> {
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`AI Service Error (${response.status}): ${errText}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error: any) {
      console.error(`Failed to call ${functionName}:`, error);
      return { success: false, error: error.message || 'Unknown error occurred' };
    }
  },

  /**
   * Sponsor AI Agent: Generates activation ideas, lead scores, social plans, etc.
   */
  async sponsorAgent(action: 'activation-ideas' | 'score-lead' | 'generate-social-plan' | 'generate-roi-report' | 'generate-pitch' | 'analyze-media', params: any) {
    return this.callEdgeFunction('sponsor-ai', { action, ...params });
  },

  /**
   * Event AI Agent: Generates event drafts from text/url
   */
  async eventArchitect(params: { prompt?: string; urls?: string[]; files?: any[] }) {
    return this.callEdgeFunction('generate-event-draft', params);
  },

  /**
   * Logistics AI: Optimizes schedules
   */
  async scheduleOptimizer(params: { eventDetails: any; venueConstraints: string; talentSchedules: string }) {
    return this.callEdgeFunction('schedule-optimizer', params);
  }
};
