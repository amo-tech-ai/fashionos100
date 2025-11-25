import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">{label}</label>}
    <input 
      className={`w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400 ${className}`}
      {...props}
    />
  </div>
);