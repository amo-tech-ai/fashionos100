
import React from 'react';
import { Loader2 } from 'lucide-react';

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FBF8F5]">
      <div className="flex flex-col items-center gap-4 animate-in fade-in duration-500">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-purple-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Loading</span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-fashion-black">FashionOS</span>
        </div>
      </div>
    </div>
  );
};
