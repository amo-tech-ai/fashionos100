
export type SponsorStatus = 'Lead' | 'Contacted' | 'Negotiating' | 'Signed' | 'Paid' | 'Churned' | 'Activation Ready';
export type ActivationStatus = 'planning' | 'approved' | 'in_progress' | 'ready' | 'completed';
export type DeliverableStatus = 'pending' | 'uploaded' | 'reviewing' | 'approved' | 'rejected';

export type SponsorType = 
  | 'Luxury Brand' 
  | 'Beauty & Cosmetics' 
  | 'Retailer' 
  | 'Media Outlet' 
  | 'Lifestyle & Wellness' 
  | 'Technology Partner' 
  | 'Beverage & Spirits' 
  | 'Automotive Partner' 
  | 'Local Business' 
  | 'Other';

export type LeadCategory = 'High' | 'Medium' | 'Low';

export interface SponsorProfile {
  id: string;
  name: string;
  industry?: string;
  sponsor_type?: SponsorType;
  lead_category?: LeadCategory;
  lead_score?: number;
  website_url?: string;
  logo_url?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  owner_id?: string;
  created_at: string;
}

export interface SponsorshipPackage {
  id: string;
  name: string;
  description?: string;
  default_price: number;
  default_slots?: number;
  deliverables_template?: any[];
}

export interface EventSponsor {
  id: string;
  event_id: string;
  sponsor_id: string;
  opportunity_id?: string;
  status: SponsorStatus;
  level?: string; // e.g. "Gold"
  cash_value: number;
  in_kind_value?: number;
  contract_url?: string;
  created_at: string;
  
  // Joined fields
  sponsor?: SponsorProfile;
  event?: {
    title: string;
    start_time: string;
  };
  active_events_count?: number;
}

export interface SponsorActivation {
  id: string;
  event_sponsor_id: string;
  title: string;
  type: string;
  status: ActivationStatus;
  location_in_venue?: string;
  description?: string;
  
  // Joined fields
  event_sponsor?: EventSponsor;
}

export interface SponsorDeliverable {
  id: string;
  event_sponsor_id: string;
  title: string;
  type: 'logo' | 'image' | 'video' | 'doc';
  status: DeliverableStatus;
  due_date: string;
  asset_url?: string;
  
  // Joined fields
  event_sponsor?: {
    sponsor: { name: string };
    event: { title: string };
  };
}

export interface SponsorRoiMetric {
  id: string;
  event_sponsor_id: string;
  metric_name: string;
  metric_value: number;
  unit: string;
  created_at: string;
}

export interface SocialPostPlan {
  day: string;
  platform: 'Instagram' | 'TikTok' | 'LinkedIn' | 'Twitter';
  content_type: string;
  caption: string;
  visual_idea: string;
}
