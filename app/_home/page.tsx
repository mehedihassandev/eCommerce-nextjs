'use client';

import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LucideIcon } from 'lucide-react';

import { BannerCard } from '@/components/cards/banner-card';
import { FeatureCard } from '@/components/cards/feature-card';
import { Loader } from '@/components/loaders/loader';
import { axios, getProducts } from '@/utils';

import { features } from '../constants/feature';
import { IProduct } from '../models/products';
import { LINK } from '../navigation/router';

import { Banner } from './banner';
import { DailyDeal } from './daily-deal';
import { DealsOfTheDay } from './deals-of-the-day';
import { FeaturedCategories } from './featured-categories';
import { TopProduct } from './top-product';

export const HomePage = () => {
  const navigate = useRouter();

  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['products', limit, offset],
    queryFn: () => {
      const params = new URLSearchParams();

      params.append('limit', limit.toString());
      params.append('offset', offset.toString());

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
    <>
      {isLoading && <Loader />}
      <Banner />
      <FeaturedCategories />
      <TopProduct
        data={data ?? []}
        handleAddToWhitelist={handleAddToWhitelist}
        handleNavigateToProduct={handleNavigateToProduct}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-2xl mx-auto px-8 py-2 mt-8">
        <BannerCard
          backgroundImage="https://cdn.pixabay.com/photo/2019/07/14/16/27/pen-4337521_1280.jpg"
          title="Christmas Sale"
          subtitle="Up to 70% Off"
          descriptions='Get the best deals on our products during the Christmas Sale. "Limited Time Offer". Check out our collection now. Offer valid till 25th December. Get the best deals on our products during the Christmas Sale. "Limited Time Offer". Check out our collection now. Offer valid till 25th December.'
          buttonText="Shop Now"
        />
        <BannerCard
          backgroundImage="https://cdn.pixabay.com/photo/2018/01/16/10/18/headphones-3085681_1280.jpg"
          title="Special Offer"
          subtitle="Get 50% Off"
          descriptions='Get the best deals on our products with this Special Offer. "Limited Time Offer". Shop now and enjoy exclusive discounts. Offer valid till 31st December. Get the best deals on our products with this Special Offer. "Limited Time Offer". Shop now and enjoy exclusive discounts. Offer valid till 31st December.'
          buttonText="Shop Now"
        />
      </div>
      <DailyDeal
        data={data ?? []}
        handleAddToWhitelist={handleAddToWhitelist}
        handleNavigateToProduct={handleNavigateToProduct}
      />
      <DealsOfTheDay
        data={data ?? []}
        handleNavigateToProduct={handleNavigateToProduct}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-screen-2xl mx-auto px-8 py-2 mt-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon as LucideIcon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
