
import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-3 animate-pulse">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-200 mb-4"></div>
      
      <div className="px-1 pb-2 space-y-3">
        <div className="flex justify-between items-start">
          <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-4 bg-yellow-100 rounded w-8"></div>
        </div>
        <div className="h-3 bg-gray-100 rounded-md w-full"></div>
        
        <div className="flex justify-between items-center pt-2">
          <div className="flex flex-col space-y-1">
            <div className="h-6 bg-blue-100 rounded-md w-16"></div>
          </div>
          <div className="w-10 h-10 bg-gray-100 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export const CJResultSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm animate-pulse space-y-4">
      <div className="flex space-x-6">
        <div className="w-32 aspect-square rounded-2xl bg-gray-200 shrink-0"></div>
        <div className="flex-1 space-y-3">
          <div className="flex justify-between">
            <div className="h-4 bg-blue-50 rounded w-16"></div>
            <div className="h-4 bg-gray-100 rounded w-12"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-100 rounded w-3/4"></div>
          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
        </div>
      </div>
      <div className="h-10 bg-gray-50 rounded-xl w-full"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-4 bg-yellow-50 rounded w-10"></div>
        <div className="h-8 bg-gray-200 rounded-xl w-24"></div>
      </div>
    </div>
  );
};
