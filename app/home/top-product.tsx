'use client';

import React from 'react';
import { IProduct } from '@/app/models/products';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LINK } from '../navigation/router';
import { ProductCard } from '../../components/product-card';
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { useProductsQuery } from '@/hooks/useProductsQuery/useProductsQuery';

export const TopProduct = () => {
  const navigate = useRouter();

  const { data } = useProductsQuery('');

  const handleAddToWhitelist = (product: IProduct) => {
    console.log('Added to whitelist:', product);
  };

  const handleNavigateToProduct = (product: IProduct) => {
    navigate.push(`/${LINK.PRODUCT}/${product._id}`);
  };

  return (
    <ContentWrapper>
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">Top Products</h2>
        <Button>View All</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
        {data?.map((product: IProduct, index: number) => (
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

export default TopProduct;
