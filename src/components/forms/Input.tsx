
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, className = '', containerClassName = '', ...props }, ref) => {
    return (
      <div className={`space-y-1.5 w-full ${containerClassName}`}>
        {label && <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">{label}</label>}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input 
            ref={ref}
            // text-base on mobile prevents iOS zoom (must be 16px)
            // md:text-sm scales it back down for desktop elegance
            className={`w-full p-4 ${icon ? 'pl-11' : ''} bg-gray-50 border rounded-xl text-base md:text-sm font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400 ${
              error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200'
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-red-500 ml-1 font-medium animate-in fade-in slide-in-from-top-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
