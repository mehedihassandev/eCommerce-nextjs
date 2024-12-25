import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => {
  return (
    <div className="space-y-1 mt-3">
      <div className="space-y-1 mb-2">
        <Skeleton className="w-full h-56" />
      </div>
      <div className="space-y-1 mt-3">
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-3/4 h-6" />
        <Skeleton className="w-1/3 h-6" />
      </div>
      <div className="flex gap-4 pt-3">
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-1/2 h-6" />
      </div>
      <div className="flex gap-4 pt-3">
        <Skeleton className="w-1/6 h-6" />
        <Skeleton className="w-10/12 h-6" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
