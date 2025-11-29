
import React from 'react';
import { LucideIcon, Sparkles, CheckCircle2 } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  isSelected: boolean;
  isRecommended?: boolean;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon: Icon,
  image,
  isSelected,
  isRecommended,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`group relative h-[380px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isSelected 
          ? 'ring-4 ring-fashion-purple ring-offset-4 shadow-2xl scale-[1.02]' 
          : isRecommended
            ? 'ring-2 ring-purple-200 hover:shadow-xl'
            : 'hover:shadow-2xl hover:-translate-y-2'
      }`}
      role="radio"
      aria-checked={isSelected}
    >
      {/* Background Image */}
      <img 
        src={image} 
        className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}
        alt={title} 
        loading="lazy"
      />
      
      {/* Gradient Overlays */}
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 transition-opacity duration-500 ${
        isSelected ? 'opacity-100' : 'opacity-80 group-hover:opacity-90'
      }`} />
      
      <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${isSelected ? 'opacity-0' : 'group-hover:opacity-0'}`} />
      
      {/* AI Recommended Badge */}
      {isRecommended && !isSelected && (
        <div className="absolute top-4 right-4 z-20">
           <span className="bg-white/90 backdrop-blur text-purple-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
              <Sparkles size={10} /> AI Match
           </span>
        </div>
      )}

      {/* Content Layer */}
      <div className="absolute bottom-0 left-0 p-6 w-full z-10">
        <div className="flex justify-between items-end mb-3">
           {/* Icon & Title */}
           <div className="flex flex-col gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors ${
                 isSelected ? 'bg-fashion-purple text-white' : 'bg-white/10 text-white group-hover:bg-white/20'
              }`}>
                 <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-white font-serif font-bold text-2xl tracking-wide leading-none">{title}</h3>
           </div>
           
           {/* Selection Check */}
           {isSelected && (
             <div className="bg-fashion-purple text-white p-2 rounded-full shadow-lg animate-in zoom-in duration-300 mb-1">
               <CheckCircle2 size={20} />
             </div>
           )}
        </div>
        
        <p className={`text-sm font-medium transition-colors duration-300 ${isSelected ? 'text-purple-100' : 'text-gray-300 group-hover:text-white'}`}>
            {description}
        </p>
      </div>

      {/* Active Border (Simulated internal border) */}
      {isSelected && (
         <div className="absolute inset-0 border-[3px] border-white/20 rounded-3xl pointer-events-none" />
      )}
    </div>
  );
};
