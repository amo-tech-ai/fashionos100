
export interface Company {
  id: string;
  owner_id: string;
  name: string;
  website_url?: string;
  description?: string;
  created_at: string;
}

export interface BrandIdentity {
  id: string;
  company_id: string;
  core_description: string;
  target_audience: string[];
  brand_pillars: string[];
  tone_of_voice: string[];
}

export interface BrandVisuals {
  id: string;
  company_id: string;
  colors: string[];
  moods: string[];
  lighting_style?: string;
  composition_guide?: string;
}

export interface ProductionRecommendations {
  id: string;
  company_id: string;
  recommended_photography: {
    shot_types: string[];
    scenes: string[];
    framing_guidelines: string[];
  };
  recommended_video: {
    formats: string[];
    style_notes: string[];
    platform_specific_ideas: Record<string, string[]>;
  };
  campaign_ideas: Array<{
    title: string;
    concept: string;
    channel: string;
  }>;
}

export interface FullBrandProfile {
  company: Company;
  identity: BrandIdentity | null;
  visuals: BrandVisuals | null;
  recommendations: ProductionRecommendations | null;
}

export interface BrandGenerationParams {
  companyName: string;
  websiteUrl?: string;
  socialUrls?: string[];
  description?: string;
}
