
export type SponsorStatus = 'Lead' | 'Contacted' | 'Negotiating' | 'Signed' | 'Paid' | 'Churned';
export type ActivationStatus = 'planning' | 'approved' | 'in_progress' | 'ready' | 'completed';
export type DeliverableStatus = 'pending' | 'uploaded' | 'reviewing' | 'approved' | 'rejected';

export interface SponsorProfile {
  id: string;
  name: string;
  industry?: string;
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