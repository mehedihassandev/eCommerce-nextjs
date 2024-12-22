import Image from 'next/image';

import React, { FC } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { HeartIcon, PlusIcon } from 'lucide-react';

import { IProduct } from '@/app/models/products';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cart-store';

import { calculateRatingStars } from '../app/helper/product';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

interface IProductCard {
  data: IProduct;
  handleAddToWhitelist: () => void;
  handleNavigateToProduct: () => void;
  isLoading: boolean;
}

export const ProductCard: FC<IProductCard> = ({
  data,
  handleAddToWhitelist,
  handleNavigateToProduct,
  isLoading,
}) => {
  const { fullStars, halfStar, emptyStars } = calculateRatingStars(
    Number(data.review?.rating) || 0,
  );
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
        {isLoading ? (
          <Skeleton className="w-full h-56" />
        ) : (
          <Image
            className="w-full rounded-lg aspect-square object-cover cursor-pointer"
            src={
              data?.attachment?.imageUrl ||
              'https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6604.jpg?w=826'
            }
            width={300}
            height={500}
            alt={data?.name || 'Product image'}
          />
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
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
                {data?.category?.name ?? 'Category'}
              </p>
              <CardTitle className="text-xl font-noto font-semibold">
                {(data?.name ?? '').length > 30
                  ? `${(data?.name ?? '').substring(0, 30)}...`
                  : data?.name}
              </CardTitle>
            </div>
            <div className="flex flex-col justify-center items-baseline gap-1 pt-3">
              <p className="text-xl font-semibold font-noto">
                ${' '}
                {data?.productOfferingPrice?.price?.dutyFreeAmount?.value ?? 0}{' '}
                {data?.productOfferingPrice?.price?.dutyFreeAmount?.unit ??
                  'USD'}
              </p>
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
                ({data?.review?.numberOfReview ?? 0} reviews)
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
