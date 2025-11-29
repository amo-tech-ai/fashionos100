import { LucideIcon } from 'lucide-react';

export type ViewState = 'home' | 'directory' | 'services' | 'events' | 'social' | 'dashboard';
export type CategoryType = 'All' | 'Designers' | 'Photographers' | 'Stylists' | 'Models' | 'Brands' | 'Venues';

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface DirectoryItem {
  image: string;
  name: string;
  role: string;
  loc: string;
  country: string;
  specialty: string;
  rating: number;
  reviews: number;
}

export interface DashboardKPI {
  label: string;
  val: string;
  sub: string;
  icon: LucideIcon;
  color: string;
  trend?: 'up' | 'down';
}
