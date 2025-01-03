'use client';

import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { DefaultShopFilterValues } from '@/app/constants/shop-constant';
import { ICategory, IProduct } from '@/app/models/products';
import { FilterParamsType } from '@/app/models/shop';
import { LINK } from '@/app/navigation/router';
import { ProductCard } from '@/components/cards/product-card';
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { RhfAutocomplete } from '@/components/rhf-autocomplete/rhf-autocomplete';
import { ProductCardSkeleton } from '@/components/skeleton/product-card-skeleton';
import { Button } from '@/components/ui/button';
import { axios, getProducts } from '@/utils';
import { getCategories } from '@/utils/lib/data-access/categories';

export const MobileStore = () => {
  const navigate = useRouter();

  const [filterParams, setFilterParams] = useState<FilterParamsType>(
    DefaultShopFilterValues,
  );

  const { control, handleSubmit } = useForm<FilterParamsType>({
    defaultValues: DefaultShopFilterValues,
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return getCategories({
        api: axios,
        url: '',
      });
    },
    select: (data) => data.data,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['products', filterParams],
    queryFn: () => {
      const params = new URLSearchParams();

      if (filterParams.category) {
        params.append('categoryName', filterParams.category);
      }

      return getProducts({
        api: axios,
        url: params as unknown as string,
      });
    },
    select: (data) => data.data,
  });

  const handleAddToWhitelist = (product: IProduct) => {
    console.log('Added to whitelist:', product);
  };

  const handleNavigateToProduct = (product: IProduct) => {
    navigate.push(`/${LINK.PRODUCT}/${product._id}`);
  };

  const onSubmit: SubmitHandler<FilterParamsType> = (formData) => {
    setFilterParams((prevState) => ({
      ...prevState,
      category: formData.category,
    }));
  };

  const categoriesOptions = categories?.map((category: ICategory) => ({
    label: category.name,
    value: category.name,
  }));

  return (
    <ContentWrapper>
      <div className="flex flex-col justify-start h-full mt-14 mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold font-playfair mb-4">
          Mobile Store
        </h1>

        <div className="flex gap-x-5 gap-y-8 my-6">
          <RhfAutocomplete
            control={control}
            name="category"
            options={categoriesOptions}
            label="Category"
          />

          <div className="flex justify-between items-center space-x-4 mt-6">
            <Button variant="default" onClick={handleSubmit(onSubmit)}>
              Filter
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setFilterParams(DefaultShopFilterValues);
              }}
            >
              Reset
            </Button>
          </div>
        </div>
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
