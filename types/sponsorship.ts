
export type SponsorLevel = 'Title' | 'Gold' | 'Silver' | 'Bronze' | 'In-Kind';
export type SponsorStatus = 'Lead' | 'Contacted' | 'Negotiating' | 'Signed' | 'Paid';

export interface SponsorProfile {
  id: string;
  name: string;
  industry: string;
  logo_url?: string;
  website?: string;
  contact_name?: string;
  contact_email?: string;
  notes?: string;
}

export interface EventSponsor {
  id: string;
  event_id: string;
  sponsor_id: string;
  level: SponsorLevel;
  status: SponsorStatus;
  cash_value: number;
  in_kind_value?: number;
  contract_url?: string;
  created_at: string;
  sponsor?: SponsorProfile; // Joined data
}

export interface Activation {
  id: string;
  event_sponsor_id: string;
  title: string;
  type: 'Booth' | 'Lounge' | 'Digital' | 'Runway' | 'GiftBag';
  location?: string;
  description?: string;
  status: 'Planning' | 'Approved' | 'Ready' | 'Completed';
}

export interface Deliverable {
  id: string;
  event_sponsor_id: string;
  title: string;
  type: 'Social' | 'Logo' | 'Video' | 'Ticket';
  due_date: string;
  status: 'Pending' | 'Uploaded' | 'Approved';
  asset_url?: string;
}
