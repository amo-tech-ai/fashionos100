
import React, { useState, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';

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

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    if (isOpen) {
      if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
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
          {/* Overlay / Backdrop */}
          <div 
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:z-40" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Desktop Dropdown Menu */}
          <div className="hidden md:flex absolute top-full mt-2 left-0 bg-white border border-gray-100 rounded-xl shadow-xl p-2 min-w-[180px] z-50 flex-col gap-1 animate-in fade-in zoom-in-95 origin-top-left">
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

          {/* Mobile Bottom Sheet */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-[2rem] p-6 z-[70] animate-in slide-in-from-bottom duration-300 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-gray-100 pb-8">
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif font-bold text-xl text-gray-900">{label}</h3>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
              {options.map(opt => (
                <button 
                  key={opt}
                  onClick={() => { onChange(opt); setIsOpen(false); }}
                  className={`flex items-center justify-between w-full px-5 py-4 text-sm font-bold rounded-xl transition-all active:scale-[0.98] ${
                    value === opt 
                      ? 'bg-black text-white shadow-md' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {opt}
                  {value === opt && <Check size={18} />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
