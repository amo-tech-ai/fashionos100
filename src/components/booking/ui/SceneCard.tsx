
import React from 'react';
import { Check } from 'lucide-react';

interface SceneCardProps {
  id: string;
  label: string;
  image: string;
  badge?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  subtitle?: string;
}

export const SceneCard: React.FC<SceneCardProps> = ({
  label,
  image,
  badge,
  selected = false,
  disabled = false,
  onClick,
  subtitle
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative w-full aspect-[4/5] md:aspect-[4/3] 
        rounded-2xl overflow-hidden text-left transition-all duration-500 ease-out
        ${disabled ? 'opacity-60 cursor-not-allowed grayscale' : 'cursor-pointer'}
        ${selected 
          ? 'ring-2 ring-white ring-offset-4 ring-offset-[#FBF8F5] shadow-[0_20px_40px_-15px_rgba(192,132,252,0.4)] transform scale-[1.02]' 
          : 'hover:-translate-y-1 hover:shadow-2xl border border-transparent'
        }
      `}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={label}
        className={`
          absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out
          ${selected ? 'scale-110' : 'group-hover:scale-110'}
        `}
        loading="lazy"
      />

      {/* Overlay Gradient */}
      <div className={`
        absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent 
        transition-opacity duration-500
        ${selected ? 'opacity-80' : 'opacity-50 group-hover:opacity-80'}
      `} />

      {/* Selection Checkmark */}
      <div className={`
        absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center
        backdrop-blur-md border border-white/20 transition-all duration-500
        ${selected 
          ? 'bg-fashion-purple text-white scale-100 opacity-100 shadow-lg' 
          : 'bg-black/20 text-white/0 scale-75 opacity-0'
        }
      `}>
        <Check size={16} strokeWidth={3} />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-500 translate-y-1 group-hover:translate-y-0">
        {badge && (
          <span className="inline-block px-2.5 py-1 mb-3 text-[10px] font-bold uppercase tracking-widest text-white bg-white/20 backdrop-blur-md rounded-md border border-white/10 shadow-sm">
            {badge}
          </span>
        )}
        <h3 className={`
          font-serif text-2xl md:text-3xl font-bold text-white leading-none mb-2 transition-all duration-300
          ${selected ? 'text-fashion-purple drop-shadow-sm' : 'group-hover:text-white'}
        `}>
          {label}
        </h3>
        {subtitle && (
          <p className="text-xs text-gray-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 line-clamp-1">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Disabled Overlay */}
      {disabled && <div className="absolute inset-0 bg-gray-900/20 backdrop-grayscale" />}
    </button>
  );
};
