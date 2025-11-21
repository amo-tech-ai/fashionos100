import { LucideIcon } from 'lucide-react';

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
}
