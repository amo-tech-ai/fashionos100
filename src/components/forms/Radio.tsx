
import React from 'react';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio: React.FC<RadioProps> = ({ label, className = '', ...props }) => {
  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer group ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative flex items-center justify-center">
        <input 
          type="radio" 
          className="peer sr-only" 
          {...props} 
        />
        <div className="w-5 h-5 border border-gray-300 rounded-full bg-white peer-checked:border-black peer-checked:border-2 transition-all duration-200 group-hover:border-gray-400"></div>
        <div className="absolute w-2.5 h-2.5 bg-black rounded-full opacity-0 peer-checked:opacity-100 transition-all duration-200 scale-0 peer-checked:scale-100"></div>
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-700 select-none group-hover:text-black transition-colors">
          {label}
        </span>
      )}
    </label>
  );
};
