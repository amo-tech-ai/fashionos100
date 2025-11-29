
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon: Icon,
  isSelected,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col p-8 rounded-2xl border transition-all duration-300 w-full h-full text-left relative overflow-hidden ${
        isSelected
          ? 'border-fashion-purple bg-purple-50/30 shadow-xl ring-2 ring-fashion-purple ring-offset-2'
          : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-xl hover:scale-[1.02]'
      }`}
      aria-checked={isSelected}
      role="radio"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
        isSelected 
          ? 'bg-fashion-purple text-white shadow-lg shadow-purple-500/30' 
          : 'bg-gray-50 text-gray-600 group-hover:bg-black group-hover:text-white'
      }`}>
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <h3 className={`text-2xl font-serif font-bold mb-3 transition-colors ${
        isSelected ? 'text-purple-900' : 'text-gray-900 group-hover:text-black'
      }`}>
        {title}
      </h3>
      <p className={`text-sm font-medium leading-relaxed max-w-[90%] ${
        isSelected ? 'text-purple-700' : 'text-gray-500 group-hover:text-gray-600'
      }`}>
        {description}
      </p>
      
      {isSelected && (
        <div className="absolute top-0 left-0 w-1.5 h-full bg-fashion-purple" />
      )}
    </button>
  );
};
