
export type SponsorStatus = 'Lead' | 'Qualified' | 'Proposal' | 'Negotiating' | 'Signed' | 'Paid' | 'Churned' | 'Activation Ready' | 'Contacted';

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
  website_url?: string;
  logo_url?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  owner_id?: string;
  lead_score?: number;
  lead_category?: LeadCategory;
  brand_story?: string;
  social_links?: string[];
  next_action?: string;
  last_interaction_date?: string;
  created_at: string;
}

export interface EventSponsor {
  id: string;
  event_id: string;
  sponsor_id: string;
  status: SponsorStatus;
  level?: string;
  cash_value: number;
  in_kind_value?: number;
  contract_url?: string;
  created_at: string;
  
  // Joined fields
  sponsor?: SponsorProfile;
  event?: {
    title: string;
    start_time: string;
    organizer_id?: string;
  };
  active_events_count?: number;
}

export interface SponsorInteraction {
  id: string;
  sponsor_id: string;
  type: 'email' | 'call' | 'meeting' | 'note';
  summary: string;
  details?: string;
  date?: string;
  created_at: string;
  created_by?: string;
  author_name?: string;
}

export type ActivationStatus = 'planning' | 'approved' | 'in-progress' | 'ready' | 'completed';

export interface SponsorActivation {
  id: string;
  event_sponsor_id: string;
  title: string;
  type: string;
  status: ActivationStatus;
  location_in_venue?: string;
  description?: string;
  created_at?: string;
  
  // Joined fields
  event_sponsor?: EventSponsor;
}

export type DeliverableStatus = 'not_started' | 'pending' | 'in_progress' | 'pending_review' | 'approved' | 'blocked' | 'uploaded';

export interface SponsorDeliverable {
  id: string;
  event_sponsor_id: string;
  title: string;
  type: string; // 'logo' | 'image' | 'video' | 'doc' | 'generic'
  status: DeliverableStatus;
  due_date: string;
  asset_url?: string;
  created_at?: string;
  
  // Joined fields
  event_sponsor?: EventSponsor;
}

export interface SponsorRoiMetric {
  id: string;
  event_sponsor_id: string;
  metric_name: string;
  metric_value: number;
  unit: string;
  source?: string;
  created_at: string;
}

export interface SocialPostPlan {
  day: string;
  platform: string;
  content_type: string;
  caption: string;
  visual_idea: string;
}

export interface SponsorContact {
  id: string;
  sponsor_id: string;
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  is_primary: boolean;
  created_at?: string;
}

export interface SponsorshipPackage {
  id: string;
  name: string;
  description?: string;
  default_price: number;
  default_slots?: number;
  deliverables_template?: any[]; // JSON
  created_at?: string;
}