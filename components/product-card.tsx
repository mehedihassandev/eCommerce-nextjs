'use client';

import React, { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HeartIcon, PlusIcon } from 'lucide-react';
import { IProduct } from '@/app/models/products';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { calculateRatingStars } from '../app/helper/product';
import { useCartStore } from '@/stores/cart-store';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

interface IProductCard {
  data: IProduct;
  handleAddToWhitelist: () => void;
  handleNavigateToProduct: () => void;
}

export const ProductCard: FC<IProductCard> = ({
  data,
  handleAddToWhitelist,
  handleNavigateToProduct,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const { name, image, price, offerPrice, category, rating, numberOfReviews } =
    data;
  const { fullStars, halfStar, emptyStars } = calculateRatingStars(rating || 0);
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(data);
  };

  return (
    <Card className="w-full group relative space-y-2 border-none shadow-md">
      <CardHeader
        className="group-hover:opacity-90"
        onClick={handleNavigateToProduct}
      >
        {loading ? (
          <Skeleton className="w-full h-56" />
        ) : (
          <Image
            className="w-full rounded-lg aspect-square object-cover cursor-pointer"
            src={image || '/default-image.jpg'}
            width={300}
            height={500}
            alt={name || 'Product image'}
          />
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-1 mt-3">
            <div className="space-y-1 mt-3">
              <Skeleton className="w-1/2 h-6" />
              <Skeleton className="w-3/4 h-6" />
              <Skeleton className="w-1/3 h-6" />
            </div>
            <div className="flex gap-4 pt-3">
              <Skeleton className="w-1/2 h-6" />
              <Skeleton className="w-1/2 h-6" />
            </div>
            <div className="flex gap-4 pt-3">
              <Skeleton className="w-1/6 h-6" />
              <Skeleton className="w-10/12 h-6" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-between items-baseline">
              <p className="text-lg text-muted-foreground font-playfair font-medium">
                {category}
              </p>
              <CardTitle className="text-xl font-noto font-semibold">
                {(name ?? '').length > 30
                  ? `${(name ?? '').substring(0, 30)}...`
                  : name}
              </CardTitle>
            </div>
            <div className="flex flex-col justify-center items-baseline gap-1 pt-3">
              <p className="text-xl font-semibold font-noto">${offerPrice}</p>
              <div className="flex items-baseline gap-3">
                <p className="text-base text-muted-foreground line-through font-noto">
                  ${price}
                </p>
                <p className="text-[12px] text-black font-semibold font-noto">
                  {(
                    (((price ?? 0) - (offerPrice ?? 0)) / (price ?? 0)) *
                    100
                  ).toFixed(2)}
                  % off
                </p>
              </div>
            </div>
            <div className="flex gap-3 py-2">
              <div className="flex items-center mt-1">
                {[...Array(fullStars)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 text-sm" />
                ))}
                {halfStar && (
                  <FaStarHalfAlt className="text-yellow-500 text-sm" />
                )}
                {[...Array(emptyStars)].map((_, i) => (
                  <FaRegStar key={i} className="text-yellow-500 text-sm" />
                ))}
              </div>
              <p className="text-base font-medium text-muted-foreground font-noto">
                ({numberOfReviews} reviews)
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0 font-poppins"
                onClick={handleAddToWhitelist}
              >
                <HeartIcon className="size-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full font-poppins text-base font-medium"
                onClick={handleAddToCart}
              >
                <PlusIcon className="size-4 me-1" /> Add to Cart
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
