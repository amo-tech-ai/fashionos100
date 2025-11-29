
import React from 'react';
import { ChevronRight, Plus, Search, Filter, Download } from 'lucide-react';
import { Button } from '../Button';
import { FadeIn } from '../FadeIn';

// --- 1. Page Header ---
interface PageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumbs?: string[];
  actionLabel?: string;
  onAction?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumbs, actionLabel, onAction }) => (
  <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
    <div>
      {breadcrumbs && (
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              <span>{crumb}</span>
              {i < breadcrumbs.length - 1 && <ChevronRight size={12} />}
            </React.Fragment>
          ))}
        </div>
      )}
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-500">{subtitle}</p>
    </div>
    <div className="flex items-center gap-3">
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input 
          type="text" 
          placeholder="Search..." 
          className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 w-48 shadow-sm"
        />
      </div>
      <Button variant="white" size="sm" className="gap-2 rounded-full text-gray-600 border-gray-200">
        <Filter size={16} /> Filter
      </Button>
      {actionLabel && (
        <Button variant="primary" size="sm" className="gap-2 rounded-full shadow-lg shadow-purple-500/20" onClick={onAction}>
          <Plus size={16} /> {actionLabel}
        </Button>
      )}
    </div>
  </div>
);

// --- 2. Stat Card ---
interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: any;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, trend, trendUp, icon: Icon, color = "text-purple-600 bg-purple-50" }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
  </div>
);

// --- 3. Standard Content Card ---
interface ContentCardProps {
  image?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  metrics?: { label: string; value: string }[];
  status?: 'Active' | 'Pending' | 'Completed' | 'Draft';
  onClick?: () => void;
  children?: React.ReactNode;
}

export const ContentCard: React.FC<ContentCardProps> = ({ image, badge, title, subtitle, metrics, status, onClick, children }) => {
  const statusColors = {
    'Active': 'bg-green-50 text-green-600',
    'Pending': 'bg-amber-50 text-amber-600',
    'Completed': 'bg-blue-50 text-blue-600',
    'Draft': 'bg-gray-100 text-gray-500',
  };

  return (
    <div onClick={onClick} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-purple-100 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full">
      {image && (
        <div className="relative h-40 bg-gray-50 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {badge && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
              {badge}
            </div>
          )}
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif font-bold text-xl text-gray-900 group-hover:text-purple-600 transition-colors">{title}</h3>
          {status && (
            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${statusColors[status]}`}>
              {status}
            </span>
          )}
        </div>
        
        {subtitle && <p className="text-sm text-gray-500 mb-6 line-clamp-2">{subtitle}</p>}
        
        {metrics && (
          <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-50 mb-4">
            {metrics.map((m, i) => (
              <div key={i}>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{m.label}</p>
                <p className="font-bold text-gray-900">{m.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2">
           {children || (
             <Button variant="white" size="sm" fullWidth className="group-hover:bg-gray-50">View Details</Button>
           )}
        </div>
      </div>
    </div>
  );
};
