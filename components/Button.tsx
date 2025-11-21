import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'pill' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 border border-black rounded-sm uppercase tracking-widest font-bold",
    secondary: "bg-gray-100 text-black hover:bg-gray-200 border border-transparent rounded-sm uppercase tracking-widest font-bold",
    outline: "border border-gray-300 text-black hover:border-black hover:bg-transparent rounded-sm uppercase tracking-widest font-bold",
    ghost: "text-black hover:bg-gray-50 rounded-sm uppercase tracking-widest font-bold",
    white: "bg-white text-black hover:bg-gray-100 border border-white shadow-sm rounded-sm uppercase tracking-widest font-bold",
    pill: "bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-black rounded-full font-medium",
    accent: "bg-[#c084fc] hover:bg-[#a855f7] text-white border border-transparent rounded-full font-bold shadow-md hover:shadow-lg",
  };

  const sizes = {
    sm: "px-5 py-2 text-[10px]",
    md: "px-8 py-3 text-xs",
    lg: "px-10 py-4 text-sm",
  };

  const widthClass = fullWidth ? 'w-full' : '';

  // Override for pill variant sizing if needed, but standard usually works
  if (variant === 'pill' || variant === 'accent') {
     // accent and pill look better with slightly more horizontal padding usually
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};