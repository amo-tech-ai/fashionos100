
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ 
  label, 
  options, 
  value, 
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${value !== options[0] ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
      >
        {value !== options[0] ? value : label} <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-2 left-0 bg-white border border-gray-100 rounded-xl shadow-xl p-2 min-w-[180px] z-50 flex flex-col gap-1 animate-in fade-in zoom-in-95 origin-top-left">
            {options.map(opt => (
              <button 
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`text-left px-3 py-2 text-xs font-bold rounded-lg transition-colors ${value === opt ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
