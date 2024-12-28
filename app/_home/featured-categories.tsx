'use client';

import Image from 'next/image';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MoveLeft, MoveRight } from 'lucide-react';

import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

import { categories } from '../constants/categories';

export const FeaturedCategories = () => {
  const itemsPerPage = 8; // Number of items visible at a time
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalItems = categories.length;

  const handleNext = () => {
    if (currentIndex < totalItems - itemsPerPage) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Get the visible items based on the current index
  const visibleItems = categories.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  return (
    <ContentWrapper>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-4xl font-bold font-playfair">
            Featured Categories
          </h2>

          <div className="flex justify-between items-center w-16">
            <MoveLeft
              size={24}
              onClick={handlePrev}
              className={
                currentIndex === 0
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              }
            />
            <MoveRight
              size={24}
              onClick={handleNext}
              className={
                currentIndex >= totalItems - itemsPerPage
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              }
            />
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="grid grid-cols-8 gap-5">
            <AnimatePresence initial={false} mode="popLayout">
              {visibleItems.map((category) => (
                <motion.div
                  key={category.title}
                  layout
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="cursor-pointer shadow-md border-none rounded-lg"
                >
                  <Card>
                    <CardContent className="text-center p-2 space-y-2">
                      <Image
                        src={category.imageUrl}
                        alt={category.title}
                        width={200}
                        height={200}
                        className="rounded-lg w-full object-cover h-28"
                      />
                      <CardTitle className="text-lg font-playfair">
                        {category.title}
                      </CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default FeaturedCategories;
