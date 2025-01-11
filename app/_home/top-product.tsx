'use client';

import { useRouter } from 'next/navigation';

import React, { FC } from 'react';
import { ChevronRight } from 'lucide-react';

import { IProduct } from '@/app/models/products';
import { ProductCard } from '@/components/cards/product-card';
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { Button } from '@/components/ui/button';

import { LINK } from '../navigation/router';

interface ITopProductProps {
  data: IProduct[] | undefined;
  handleNavigateToProduct: (product: IProduct) => void;
}

export const TopProduct: FC<ITopProductProps> = ({
  data,
  handleNavigateToProduct,
}) => {
  const navigate = useRouter();

  return (
    <ContentWrapper className="lg:py-4">
      <div className="flex justify-between mb-6">
        <h2 className="text-4xl font-bold font-playfair">Top Products</h2>
        <Button
          className="w-44 font-poppins text-primary text-base font-semibold"
          onClick={() => {
            navigate.push(`/${LINK.PRODUCT}`);
          }}
          variant="ghost"
        >
          View All <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
        {data &&
          data.map((product: IProduct, index: number) => (
            <ProductCard
              key={index}
              data={product}
              handleNavigateToProduct={() => handleNavigateToProduct(product)}
            />
          ))}
      </div>
    </ContentWrapper>
  );
};

export default TopProduct;
