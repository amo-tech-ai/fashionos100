export interface AiRequestPayload {
  action: 'polish-brief' | 'recommend-shots' | 'suggest-bundle';
  context: {
    category?: string;
    style?: string;
    rawText?: string;
    currentCount?: number;
  };
}

export interface PolishedBrief {
  title: string;
  concept: string;
  mood: string;
  lighting: string;
  styling: string;
  tags: string[];
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
