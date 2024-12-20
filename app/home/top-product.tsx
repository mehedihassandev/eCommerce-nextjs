'use client';

import React from 'react';
import { IProduct } from '@/app/models/products';
import { topProducts } from '../data/products';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LINK } from '../navigation/router';
import { ProductCard } from '../../components/product-card';
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';

export const TopProduct = () => {
  const navigate = useRouter();

  const handleAddToWhitelist = (product: IProduct) => {
    console.log('Added to whitelist:', product);
  };

  const handleNavigateToProduct = (product: IProduct) => {
    navigate.push(`/${LINK.PRODUCT}/${product.id}`);
  };

  return (
    <ContentWrapper>
      <div className="flex justify-between mb-6">
        <h2 className="text-4xl font-bold font-playfair">Top Products</h2>
        <Button
          className="w-44 font-poppins "
          onClick={() => {
            navigate.push(`/${LINK.PRODUCT}`);
          }}
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
        {topProducts.map((product, index) => (
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
