'use client';

import Image from 'next/image';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { ProductCard } from '@/components/product-card';
import { ProductCardSkeleton } from '@/components/skeleton/product-card-skeleton';

import { IProduct } from '../models/products';

interface IDailyDealProps {
  data: IProduct[] | undefined;
  handleAddToWhitelist: (product: IProduct) => void;
  handleNavigateToProduct: (product: IProduct) => void;
}

export const DailyDeal: FC<IDailyDealProps> = ({
  data,
  handleAddToWhitelist,
  handleNavigateToProduct,
}) => {
  const itemsPerPage = 3; // Number of items visible at a time
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalItems = data?.length ?? 0;

  const handleNext = () => {
    // Shift the window forward by 1 item if not at the end
    if (currentIndex < totalItems - itemsPerPage) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    // Shift the window backward by 1 item if not at the start
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Get the visible items based on the current index
  const visibleItems: IProduct[] | undefined = data?.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  return (
    <ContentWrapper>
      <div className="grid grid-cols-3 gap-8">
        <div className="flex flex-col space-y-6">
          <h2 className="text-4xl font-bold font-playfair">Daily Best Sells</h2>
          <Image
            src="https://cdn.pixabay.com/photo/2020/12/05/15/55/christmas-tree-5806329_1280.jpg"
            alt="Christmas Sale"
            width={600}
            height={600}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>

        <div className="col-span-2">
          <div className="flex justify-between items-center w-14 mb-10">
            <ArrowLeft
              size={24}
              onClick={handlePrev}
              className={
                currentIndex === 0
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer text-primary'
              }
            />
            <ArrowRight
              size={24}
              onClick={handleNext}
              className={
                currentIndex >= totalItems - itemsPerPage
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer text-primary'
              }
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-8">
            {visibleItems?.map((item) =>
              item ? (
                <motion.div
                  key={item._id}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <ProductCard
                    data={item}
                    handleAddToWhitelist={() => handleAddToWhitelist(item)}
                    handleNavigateToProduct={() =>
                      handleNavigateToProduct(item)
                    }
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={Math.random()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProductCardSkeleton />
                </motion.div>
              ),
            )}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default DailyDeal;
