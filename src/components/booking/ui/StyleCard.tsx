
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface StyleCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  isSelected: boolean;
  onClick: () => void;
}

export const StyleCard: React.FC<StyleCardProps> = ({
  title,
  price,
  imageUrl,
  isSelected,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'ring-4 ring-black ring-offset-2 shadow-xl' 
          : 'hover:shadow-2xl hover:-translate-y-1'
      }`}
      role="radio"
      aria-checked={isSelected}
    >
      <img 
        src={imageUrl} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        alt={title} 
        loading="lazy"
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-opacity duration-300 ${
        isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'
      }`} />
      
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-white font-serif font-bold text-2xl mb-1">{title}</p>
            <p className="text-gray-300 text-sm font-medium">Starting at ${price}/shot</p>
          </div>
          {isSelected && (
            <div className="bg-white text-black p-2 rounded-full shadow-lg animate-in zoom-in duration-300">
              <CheckCircle2 size={24} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
