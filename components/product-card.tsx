import Image from 'next/image';

import React, { FC } from 'react';
import { HeartIcon, PlusIcon } from 'lucide-react';

import { ICartItem } from '@/app/models/cart';
import { IProduct } from '@/app/models/products';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cart-store';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import StarRating from './star-rating';

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
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    const id = data?._id ?? 0;

    const cartItem = {
      id,
      action: 'add',
      quantity: 1,
      item: {
        _id: data._id,
        name: data.name,
        description: data.description,
        details: data.details,
        brand: data.brand,
        version: data.version,
        price: data.price,
        image: data.image,
        categories: data.categories,
      },
    };

    addToCart(cartItem as ICartItem);
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
              data?.image?.absUrl ||
              'https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6604.jpg?w=826'
            }
            width={300}
            height={500}
            alt={data?.image?.alt || 'Product image'}
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
                {data?.categories
                  ?.map((category) => category.name)
                  .join(', ') ?? 'Category'}
              </p>
              <CardTitle className="text-xl font-noto font-semibold">
                {(data?.name ?? '').length > 30
                  ? `${(data?.name ?? '').substring(0, 30)}...`
                  : data?.name}
              </CardTitle>
            </div>
            <div className="flex flex-col justify-center items-baseline gap-1 pt-3">
              <p className="text-xl font-semibold font-noto">
                $ {data?.price?.totalAmount?.value ?? 0}{' '}
                {data?.price?.totalAmount?.unit ?? 'USD'}
              </p>
            </div>
            <div className="flex gap-3 py-2">
              <StarRating reviews={data?.review ?? []} />
              <p className="text-base font-medium text-muted-foreground font-noto">
                ({data?.review?.length ?? 0} reviews)
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
