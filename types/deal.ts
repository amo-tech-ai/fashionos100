
export enum DealStep {
  QUALIFICATION = 0,
  PACKAGE = 1,
  CONTRACT = 2,
  ACTIVATION = 3,
  ROI_GOALS = 4,
  REVIEW = 5,
  SUCCESS = 6
}

export interface ActivationItem {
  type: string;
  description: string;
  location: string;
}

export interface DealState {
  // Qualification
  sponsorId: string;
  eventId: string;
  leadScore: number;
  leadNotes: string;
  
  // Package
  packageTier: 'Title' | 'Gold' | 'Silver' | 'Bronze' | 'Custom';
  cashValue: number;
  inKindValue: number;
  
  // Contract
  contractStatus: 'Draft' | 'Sent' | 'Signed';
  contractFile: File | null;
  terms: string;

  // Activations
  activations: ActivationItem[];

  // ROI Goals
  targetImpressions: number;
  targetLeads: number;
  
  // Metadata
  aiAnalysis?: string;
}
