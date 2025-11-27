
import React from 'react';

export const SponsorCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3 w-full">
          <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
          <div className="space-y-2 w-full max-w-[140px]">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 p-2 rounded-lg h-12"></div>
        <div className="bg-gray-50 p-2 rounded-lg h-12"></div>
      </div>

      <div className="pt-3 border-t border-gray-50 flex justify-between items-center mt-auto">
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export const KPICardSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-32 animate-pulse flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="h-10 w-10 bg-gray-200 rounded-xl"></div>
        <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
      </div>
      <div className="space-y-2">
        <div className="h-8 w-24 bg-gray-200 rounded"></div>
        <div className="h-3 w-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};
