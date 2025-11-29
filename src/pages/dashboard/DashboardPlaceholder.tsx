
import React from 'react';

interface DashboardPlaceholderProps {
  title: string;
}

export const DashboardPlaceholder: React.FC<DashboardPlaceholderProps> = ({ title }) => (
  <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
    <h2 className="text-2xl font-serif font-bold text-gray-300 mb-2">{title} Module</h2>
    <p className="text-gray-400">This dashboard view is under development.</p>
  </div>
);
