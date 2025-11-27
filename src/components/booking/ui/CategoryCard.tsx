
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
      className={`group flex flex-col p-8 rounded-2xl border-2 text-left transition-all duration-300 w-full ${
        isSelected
          ? 'border-black bg-gray-50 ring-1 ring-black/5'
          : 'border-gray-100 bg-white hover:border-purple-200 hover:shadow-xl'
      }`}
      aria-checked={isSelected}
      role="radio"
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
        isSelected 
          ? 'bg-black text-white' 
          : 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'
      }`}>
        <Icon size={28} />
      </div>
      <h3 className={`text-2xl font-serif font-bold mb-2 transition-colors ${
        isSelected ? 'text-black' : 'group-hover:text-purple-700'
      }`}>
        {title}
      </h3>
      <p className="text-gray-500 leading-relaxed text-sm">
        {description}
      </p>
    </button>
  );
};
