'use client';

import { useRouter } from 'next/navigation';

import React from 'react';

import { IProduct } from '@/app/models/products';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { useProductsQuery } from '@/hooks/useProductsQuery/useProductsQuery';

import { LINK } from '../navigation/router';

const Product = () => {
  const navigate = useRouter();

  const { data, isLoading } = useProductsQuery('');

  const handleAddToWhitelist = (product: IProduct) => {
    console.log('Added to whitelist:', product);
  };

  const handleNavigateToProduct = (product: IProduct) => {
    navigate.push(`/${LINK.PRODUCT}/${product._id}`);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-12 lg:pt-28 flex flex-col justify-between">
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">Products</h2>
        <Button>View All</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
        {data &&
          data.map((product: IProduct, index: number) => (
            <ProductCard
              key={index}
              data={product}
              handleAddToWhitelist={() => handleAddToWhitelist(product)}
              handleNavigateToProduct={() => handleNavigateToProduct(product)}
              isLoading={isLoading}
            />
          ))}
      </div>
    </div>
  );
};

export default Product;
