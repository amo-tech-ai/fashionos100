
import React from 'react';
import { LucideIcon, Search } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Search,
  title,
  description,
  actionLabel,
  actionLink,
  onAction,
  className
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-16 px-4 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 ${className}`}>
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-gray-100">
        <Icon className="text-gray-400" size={32} />
      </div>
      <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm max-w-xs mb-6 leading-relaxed">{description}</p>
      
      {actionLabel && (
        actionLink ? (
          <Link to={actionLink}>
            <Button variant="primary" size="sm">{actionLabel}</Button>
          </Link>
        ) : (
          <Button variant="primary" size="sm" onClick={onAction}>{actionLabel}</Button>
        )
      )}
    </div>
  );
};
