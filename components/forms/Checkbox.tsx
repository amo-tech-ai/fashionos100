
import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
  return (
    <label className={`inline-flex items-start gap-3 cursor-pointer group ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative flex items-center">
        <input 
          type="checkbox" 
          className="peer sr-only" 
          {...props} 
        />
        <div className="w-5 h-5 border border-gray-300 rounded-sm bg-white peer-checked:bg-black peer-checked:border-black transition-all duration-200 flex items-center justify-center group-hover:border-gray-400">
          <Check size={14} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" strokeWidth={3} />
        </div>
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-700 select-none pt-0.5 group-hover:text-black transition-colors">
          {label}
        </span>
      )}
    </label>
  );
};
