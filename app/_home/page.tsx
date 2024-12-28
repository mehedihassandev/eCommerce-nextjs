'use client';

import { useRouter } from 'next/navigation';

import React from 'react';
import { LucideIcon } from 'lucide-react';

import { BannerCard } from '@/components/cards/banner-card';
import { FeatureCard } from '@/components/cards/feature-card';
import { Loader } from '@/components/loaders/loader';
import { useProductsQuery } from '@/hooks/useProductsQuery/useProductsQuery';

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

  const { data, isLoading } = useProductsQuery('');

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
      <div className="grid grid-cols-2 gap-8 max-w-screen-2xl mx-auto px-8 py-2 mt-8">
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

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 max-w-screen-2xl mx-auto px-8 py-2 mt-8">
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
