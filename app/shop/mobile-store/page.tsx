'use client';

import { useRouter } from 'next/navigation'; // Correct import for the app directory

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { IProduct } from '@/app/models/products';
import { LINK } from '@/app/navigation/router';
import { ProductCard } from '@/components/cards/product-card';
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import CustomBreadcrumb from '@/components/custom-breadcrumb';
import { ProductCardSkeleton } from '@/components/skeleton/product-card-skeleton';
import { axios, getProducts } from '@/utils';

const MobileStore = () => {
  const navigate = useRouter();

  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['products', limit, offset],
    queryFn: () => {
      const params = new URLSearchParams();
      params.append('limit', limit.toString());
      params.append('offset', offset.toString());
      params.append('categoryName', 'Smartphones');

      return getProducts({
        api: axios,
        url: params as unknown as string,
      });
    },
    select: (data) => data.data.products,
  });

  const handleAddToWhitelist = (product: IProduct) => {
    console.log('Added to whitelist:', product);
  };

  const handleNavigateToProduct = (product: IProduct) => {
    navigate.push(`/${LINK.PRODUCT}/${product._id}`);
  };

  return (
    <ContentWrapper>
      <div className="flex flex-col justify-start h-full mt-8 mb-6 gap-4">
        <CustomBreadcrumb />
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold font-playfair mb-2 mt-4">
          Mobile Store
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : data &&
            data.map((product: IProduct, index: number) => (
              <ProductCard
                key={index}
                data={product}
                handleAddToWhitelist={() => handleAddToWhitelist(product)}
                handleNavigateToProduct={() => handleNavigateToProduct(product)}
              />
            ))}
      </div>
    </ContentWrapper>
  );
};

export default MobileStore;
