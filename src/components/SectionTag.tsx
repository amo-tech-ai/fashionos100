import React from 'react';

export const SectionTag: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = "text-gray-400" }) => (
  <span className={`inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.2em] ${color}`}>{children}</span>
);