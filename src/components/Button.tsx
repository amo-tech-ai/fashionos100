
import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'pill' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  as?: React.ElementType;
  isLoading?: boolean;
  [key: string]: any;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  isLoading = false,
  disabled,
  className = '', 
  as: Component = 'button',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 border border-black rounded-xl uppercase tracking-widest font-bold shadow-sm hover:shadow-md",
    secondary: "bg-gray-100 text-black hover:bg-gray-200 border border-transparent rounded-xl uppercase tracking-widest font-bold",
    outline: "border border-gray-300 text-black hover:border-black hover:bg-transparent rounded-xl uppercase tracking-widest font-bold",
    ghost: "text-black hover:bg-gray-100 rounded-xl uppercase tracking-widest font-bold",
    white: "bg-white text-black hover:bg-gray-50 border border-white shadow-sm rounded-xl uppercase tracking-widest font-bold hover:shadow-md",
    pill: "bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-black rounded-full font-medium",
    accent: "bg-[#c084fc] hover:bg-[#a855f7] text-white border border-transparent rounded-full font-bold shadow-md hover:shadow-lg",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-[10px]",
    md: "px-8 py-3.5 text-xs",
    lg: "px-10 py-4 text-sm",
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <Component 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin -ml-1 mr-2" size={size === 'lg' ? 18 : 14} />
          {typeof children === 'string' ? 'Loading...' : children}
        </>
      ) : (
        children
      )}
    </Component>
  );
};
