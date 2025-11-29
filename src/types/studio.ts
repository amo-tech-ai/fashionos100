
export type ShootStatus = 'draft' | 'requested' | 'confirmed' | 'production' | 'post_production' | 'review' | 'completed' | 'cancelled';
export type AssetStatus = 'raw' | 'processing' | 'retouch_pending' | 'review' | 'approved' | 'revision_requested' | 'final';
export type QAGrade = 'A' | 'B' | 'C' | 'F';

export interface Shoot {
  id: string;
  designer_id: string;
  shoot_type: string;
  fashion_category: string;
  style_type: string;
  looks_count: number;
  fulfillment_type?: 'virtual' | 'location';
  scheduled_date?: string;
  scheduled_time?: string;
  status: ShootStatus;
  estimated_quote: number;
  created_at: string;
}

export interface ShootAsset {
  id: string;
  shoot_id: string;
  url: string;
  filename: string;
  file_type: string;
  metadata: {
    angle?: string;
    model?: string;
    background?: string;
  };
  status: AssetStatus;
  is_favorite: boolean;
  created_at: string;
  
  // Join
  qa_reviews?: QAReview[];
}

export interface QAReview {
  id: string;
  asset_id: string;
  overall_score: number;
  grade: QAGrade;
  metrics: {
    sharpness: number;
    lighting: number;
    framing: number;
    cleanliness: number;
    color_accuracy: number;
  };
  detected_issues: string[];
  ai_reasoning?: string;
  created_at: string;
}