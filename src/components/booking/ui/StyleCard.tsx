
import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface StyleCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  isSelected: boolean;
  isRecommended?: boolean;
  onClick: () => void;
}

export const StyleCard: React.FC<StyleCardProps> = ({
  title,
  price,
  imageUrl,
  isSelected,
  isRecommended,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isSelected 
          ? 'ring-4 ring-fashion-purple ring-offset-4 shadow-2xl scale-[1.02]' 
          : isRecommended
            ? 'ring-2 ring-purple-200 hover:shadow-xl'
            : 'hover:shadow-2xl hover:-translate-y-2'
      }`}
      role="radio"
      aria-checked={isSelected}
    >
      <img 
        src={imageUrl} 
        className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}
        alt={title} 
        loading="lazy"
      />
      
      {/* Dimming Overlay */}
      <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${isSelected ? 'opacity-0' : 'group-hover:opacity-0'}`} />

      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 ${
        isSelected ? 'opacity-100' : 'opacity-80 group-hover:opacity-90'
      }`} />
      
      {/* AI Recommended Badge */}
      {isRecommended && !isSelected && (
        <div className="absolute top-4 right-4 z-20">
           <span className="bg-white/90 backdrop-blur text-purple-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
              <Sparkles size={10} /> AI Match
           </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 p-8 w-full">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-white font-serif font-bold text-3xl mb-3 tracking-wide">{title}</p>
            <span className="inline-block bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full">
               Starting at ${price}/shot
            </span>
          </div>
          {isSelected && (
            <div className="bg-fashion-purple text-white p-2 rounded-full shadow-lg animate-in zoom-in duration-300 mb-1">
              <CheckCircle2 size={24} />
            </div>
          )}
        </div>
      </div>

      {/* Selection Border Overlay */}
      {isSelected && (
         <div className="absolute inset-0 border-4 border-white/10 rounded-2xl pointer-events-none" />
      )}
    </div>
  );
};
