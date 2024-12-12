'use client';

import React from 'react';
import { IProduct } from '@/app/modals/products';
import { topProducts } from '../data/products';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ProductCard } from '../_components';
import { useRouter } from 'next/navigation';
import { LINK } from '../navigation/router';

export const Product = () => {
  const navigate = useRouter();

  const handleAddToCart = (product: IProduct) => {
    console.log('Added to cart:', product);
  };

  const handleAddToWhitelist = (product: IProduct) => {
    console.log('Added to whitelist:', product);
  };

  const handleNavigateToProduct = (product: IProduct) => {
    navigate.push(`/${LINK.PRODUCT}/${product.id}`);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-12 lg:pt-28 flex flex-col justify-between">
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">Products</h2>
        <Button>View All</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
        {topProducts.map((product, index) => (
          <Link href={`/product/${product.id}`} key={index}>
            <ProductCard
              data={product}
              handleAddToCart={() => handleAddToCart(product)}
              handleAddToWhitelist={() => handleAddToWhitelist(product)}
              handleNavigateToProduct={() => handleNavigateToProduct(product)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Product;
