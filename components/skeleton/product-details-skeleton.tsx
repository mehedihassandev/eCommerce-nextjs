import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export const ProductDetailsSkeleton = () => {
  return (
    <div className="flex flex-col justify-between mt-8">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="flex flex-col items-start gap-6 col-span-1 relative">
          <Skeleton className="rounded-lg w-full aspect-square object-cover h-96" />
        </div>
        <div className="flex flex-col items-start gap-4 col-span-2">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <div className="flex gap-4 items-stretch">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <Skeleton className="h-10 w-1/2" />
          <div className="flex gap-2 items-center">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-12" />
            <Skeleton className="h-10 w-10" />
          </div>
          <div className="flex gap-8 mt-14">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-10 w-1/3" />
          </div>
        </div>
      </div>
      <div className="grid gap-8 mt-14">
        <div className="grid gap-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="grid gap-4">
          <Skeleton className="h-8 w-full" />
          <div className="grid sm:grid-cols-1 gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex gap-4 items-center">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
