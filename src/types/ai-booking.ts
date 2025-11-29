export interface AiRequestPayload {
  action: 'polish-brief' | 'recommend-shots' | 'suggest-bundle';
  context: {
    category?: string;
    style?: string;
    rawText?: string;
    currentCount?: number;
    brandContext?: {
      mood?: string[] | null;
      voice?: string[] | null;
      description?: string | null;
      colors?: string[] | null;
      target_audience?: string[] | null;
    };
  };
}

export interface PolishedBrief {
  polished_text: string;
  keywords: string[];
  mood: string;
  visual_style: string;
}

export interface ShotRecommendation {
  min: number;
  optimal: number;
  reasoning: string;
  suggestedAngles: string[];
}

export interface BundleSuggestion {
  name: string;
  description: string;
  priceEstimate: number;
  items: string[];
}

export interface AiResponse<T> {
  data?: T;
  error?: string;
}