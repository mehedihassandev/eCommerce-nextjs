'use client';

import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { ICategory, IProduct } from '@/app/models/products';
import { ProductCard } from '@/components/cards/product-card';
import { CustomPagination } from '@/components/custom-pagination';
import { ProductCardSkeleton } from '@/components/skeleton/product-card-skeleton';
import { Button } from '@/components/ui/button';
import { axios, getProducts } from '@/utils';
import { getCategories } from '@/utils/lib/data-access/categories';

import { FORM_INPUT_TYPE } from '../constants/from-input-type';
import {
  DefaultShopFilterValues,
  filterParamsFields,
} from '../constants/shop-constant';
import { FilterParamsType } from '../models/shop';
import { LINK } from '../navigation/router';

const Shop = () => {
  const navigate = useRouter();

  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  const [filterParams, setFilterParams] = useState<FilterParamsType>(
    DefaultShopFilterValues,
  );

  const { control, handleSubmit, reset } = useForm<FilterParamsType>({
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
    queryKey: ['products', limit, offset, filterParams],
    queryFn: () => {
      const params = new URLSearchParams();

      params.append('limit', limit.toString());
      params.append('offset', offset.toString());

      if (filterParams.name) {
        params.append('name', filterParams.name);
      }

      if (filterParams.brand) {
        params.append('brand', filterParams.brand);
      }

      if (filterParams.category) {
        params.append('categoryId', filterParams.category);
      }

      if (filterParams.minPrice) {
        params.append('minPrice', filterParams.minPrice.toString());
      }

      if (filterParams.maxPrice) {
        params.append('maxPrice', filterParams.maxPrice.toString());
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

  const categoriesOptions = categories?.map((category: ICategory) => ({
    label: category.name,
    value: category._id,
  }));

  const onSubmit: SubmitHandler<FilterParamsType> = (formData) => {
    setFilterParams((prevState) => ({
      ...prevState,
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      minPrice: formData.minPrice,
      maxPrice: formData.maxPrice,
    }));
    setOffset(0);
  };

  const handleClear = () => {
    setFilterParams(DefaultShopFilterValues);
    setOffset(0);
    reset(DefaultShopFilterValues);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-12 lg:pt-28 flex flex-col justify-between">
      <div className="flex justify-between my-6">
        <div className="flex items-center space-x-4 w-full">
          {filterParamsFields.map((field: any) => {
            const { name, label, inputType } = field;

            const FormInputField =
              FORM_INPUT_TYPE[inputType as keyof typeof FORM_INPUT_TYPE];

            return (
              (FormInputField && (
                <div key={name} className="w-full">
                  <FormInputField
                    key={name}
                    control={control}
                    name={name}
                    options={categoriesOptions || []}
                    placeholder={label}
                    className="w-full"
                  />
                </div>
              )) ||
              null
            );
          })}

          <div className="flex items-center space-x-4">
            <Button variant="default" onClick={handleSubmit(onSubmit)}>
              Filter
            </Button>
            <Button variant="secondary" onClick={handleClear}>
              Reset
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8 mb-8 mt-4">
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

export default Shop;
