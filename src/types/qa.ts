
export type QAGrade = 'A' | 'B' | 'C';
export type QAStatus = 'pending' | 'approved' | 'retouch' | 'reshoot';

export interface QAMetrics {
  sharpness: number;
  lighting: number;
  framing: number;
  cleanliness: number;
  color_accuracy: number;
}

export interface QAImage {
  id: string;
  url: string;
  name: string;
  overall_score: number;
  grade: QAGrade;
  metrics: QAMetrics;
  detected_issues: string[];
  status: QAStatus;
  ai_reasoning?: string;
}
