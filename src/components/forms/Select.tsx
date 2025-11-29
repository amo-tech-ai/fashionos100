
import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: (string | SelectOption)[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">{label}</label>}
        <div className="relative">
          <select 
            ref={ref}
            className={`w-full p-4 bg-gray-50 border rounded-xl text-sm font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer text-gray-700 ${
              error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200'
            } ${className}`}
            {...props}
          >
            <option value="" disabled>Select an option</option>
            {options.map((opt, i) => {
              if (typeof opt === 'object' && opt !== null) {
                return <option key={i} value={opt.value}>{opt.label}</option>;
              }
              return <option key={i} value={opt as string}>{opt as string}</option>;
            })}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
        {error && (
          <p className="text-xs text-red-500 ml-1 font-medium animate-in fade-in slide-in-from-top-1">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
