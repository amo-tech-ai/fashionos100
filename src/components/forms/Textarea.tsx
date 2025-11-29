
import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">{label}</label>}
        <textarea 
          ref={ref}
          className={`w-full p-4 bg-gray-50 border rounded-xl text-sm font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400 resize-none ${
            error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200'
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 ml-1 font-medium animate-in fade-in slide-in-from-top-1">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
