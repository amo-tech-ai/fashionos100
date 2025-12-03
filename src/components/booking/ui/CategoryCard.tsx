
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
      className={`
        group relative flex flex-col bg-white rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-300 ease-out h-full
        ${isSelected 
          ? 'ring-4 ring-fashion-purple shadow-2xl scale-[1.02] z-10' 
          : 'border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1'
        }
      `}
      role="radio"
      aria-checked={isSelected}
    >
      {/* Image Area (2:1 Ratio) */}
      <div className="relative w-full h-40 overflow-hidden bg-gray-50">
         <img 
            src={image} 
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`}
            loading="lazy"
         />
         
         {/* AI Recommended Badge */}
         {isRecommended && (
           <div className="absolute top-3 right-3 z-10">
              <span className="bg-white/95 backdrop-blur text-purple-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm border border-purple-100">
                 <Sparkles size={10} className="fill-purple-200" /> AI Match
              </span>
           </div>
         )}

         {/* Selection Overlay */}
         <div className={`absolute inset-0 bg-purple-900/10 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
         <div className="flex justify-between items-start mb-2">
             <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300
                ${isSelected ? 'bg-fashion-purple text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600'}
             `}>
                <Icon size={20} strokeWidth={1.5} />
             </div>
             
             {/* Check Circle */}
             <div className={`
                transition-all duration-300 
                ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
             `}>
                <CheckCircle2 size={22} className="text-fashion-purple fill-purple-50" />
             </div>
         </div>

         <h3 className={`font-serif text-lg font-bold mb-1 transition-colors ${isSelected ? 'text-fashion-purple' : 'text-gray-900'}`}>
            {title}
         </h3>
         
         <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            {description}
         </p>
      </div>
    </div>
  );
};
