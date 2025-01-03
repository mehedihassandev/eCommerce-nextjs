'use client';

import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { IProduct } from '@/app/models/products';
import { ProductCard } from '@/components/cards/product-card';
import CustomPagination from '@/components/custom-pagination';
import RhfSelect from '@/components/rhf-select/rhf-select';
import { ProductCardSkeleton } from '@/components/skeleton/product-card-skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { axios, getProducts } from '@/utils';

import { sortFilterOptions } from '../constants/product';
import { LINK } from '../navigation/router';

const Product = () => {
  const navigate = useRouter();

  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [sortOption, setSortOption] = useState('old');

  const { control } = useForm<{ sort: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['products', limit, offset, sortOption],
    queryFn: () => {
      const params = new URLSearchParams();

      params.append('limit', limit.toString());
      params.append('offset', offset.toString());

      if (sortOption === 'latest') {
        params.append('isLatestFirst', 'true');
      } else if (sortOption === 'old') {
        params.append('isLatestFirst', 'false');
      } else if (sortOption === 'priceLowToHigh') {
        params.append('sort', 'priceAsc');
      } else if (sortOption === 'priceHighToLow') {
        params.append('sort', 'priceDesc');
      }

      return getProducts({
        api: axios,
        url: params as unknown as string,
      }).then((res) => {
        setCount(res.data.totalCount);

        return res.data.products;
      });
    },
    select: (data) => data,
  });

  const handleAddToWhitelist = (product: IProduct) => {
    console.log('Added to whitelist:', product);
  };

  const handleNavigateToProduct = (product: IProduct) => {
    navigate.push(`/${LINK.PRODUCT}/${product._id}`);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  console.log(count);

  const handleNext = () => {
    if (offset + limit < count) {
      setOffset((prev) => prev + limit);
    }
  };

  const handlePrev = () => {
    if (offset > 0) {
      setOffset((prev) => prev - limit);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-12 lg:pt-28 flex flex-col justify-between">
      <div className="flex justify-between my-6">
        <h2 className="text-3xl font-bold">All Products</h2>

        <div className="flex items-center space-x-4">
          <span className="text-sm font-noto font-semibold">Sort by:</span>
          <RhfSelect
            control={control}
            name="sort"
            options={sortFilterOptions}
            onChange={(e) => handleSortChange(e)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8 mb-8">
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

      <CustomPagination
        count={count}
        limit={limit}
        offset={offset}
        handlePrev={handlePrev}
        handleNext={handleNext}
        setOffset={setOffset}
      />
    </div>
  );
};

export default Product;
