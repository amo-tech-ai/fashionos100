
import React from 'react';
import { cn } from '../lib/utils';
import { CheckCircle2, Clock, AlertCircle, XCircle, Loader2 } from 'lucide-react';

export type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'purple';

interface StatusBadgeProps {
  status: string;
  className?: string;
  showIcon?: boolean;
}

const STATUS_MAP: Record<string, StatusVariant> = {
  // Success
  'completed': 'success',
  'paid': 'success',
  'approved': 'success',
  'active': 'success',
  'signed': 'success',
  'succeeded': 'success',
  'confirmed': 'success',
  'published': 'success',
  'final': 'success',
  'ready': 'success',

  // Warning
  'pending': 'warning',
  'requested': 'warning',
  'negotiating': 'warning',
  'in_progress': 'warning',
  'revision': 'warning',
  'revision_requested': 'warning',
  'retouch': 'warning',
  'draft': 'neutral',

  // Info
  'review': 'info',
  'contacted': 'info',
  'uploaded': 'info',
  'sent': 'info',

  // Purple (Active/Processing)
  'production': 'purple',
  'post_production': 'purple',
  'activation_ready': 'purple',

  // Error
  'cancelled': 'error',
  'failed': 'error',
  'rejected': 'error',
  'churned': 'error',
  'sold_out': 'error',
};

const VARIANT_STYLES: Record<StatusVariant, string> = {
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  error: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  neutral: 'bg-gray-100 text-gray-600 border-gray-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
};

const ICONS: Record<StatusVariant, React.ElementType> = {
  success: CheckCircle2,
  warning: Clock,
  error: XCircle,
  info: AlertCircle,
  neutral:  AlertCircle, // Placeholder
  purple: Loader2,
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className, showIcon = false }) => {
  const normalizedStatus = status?.toLowerCase().replace(/ /g, '_') || 'draft';
  
  // Find variant based on keyword matching if exact match fails
  let variant: StatusVariant = STATUS_MAP[normalizedStatus] || 'neutral';
  
  if (!STATUS_MAP[normalizedStatus]) {
    if (normalizedStatus.includes('pending') || normalizedStatus.includes('wait')) variant = 'warning';
    else if (normalizedStatus.includes('success') || normalizedStatus.includes('complete')) variant = 'success';
    else if (normalizedStatus.includes('fail') || normalizedStatus.includes('error')) variant = 'error';
  }

  const Icon = ICONS[variant];
  const label = status.replace(/_/g, ' ');

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border flex items-center gap-1.5 w-fit",
      VARIANT_STYLES[variant],
      className
    )}>
      {showIcon && <Icon size={10} className={variant === 'purple' ? 'animate-spin' : ''} />}
      {label}
    </span>
  );
};
