
import React from 'react';
import { SkeletonLoader } from '../SkeletonLoader';

export const EventCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 h-full flex flex-col">
      <div className="aspect-[4/3] w-full">
        <SkeletonLoader className="w-full h-full rounded-none" />
      </div>
      <div className="p-6 flex flex-col flex-grow space-y-4">
        <div className="flex justify-between">
           <SkeletonLoader className="w-24 h-4" />
           <SkeletonLoader className="w-12 h-4" />
        </div>
        <SkeletonLoader className="w-3/4 h-8" />
        <SkeletonLoader className="w-1/2 h-4" />
        <div className="flex gap-2 mt-auto pt-4">
           <SkeletonLoader className="w-16 h-6" />
           <SkeletonLoader className="w-16 h-6" />
        </div>
        <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
           <SkeletonLoader className="w-20 h-4" />
           <SkeletonLoader className="w-28 h-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};
