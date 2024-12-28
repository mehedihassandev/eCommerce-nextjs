import Image from 'next/image';

import React, { FC } from 'react';
import { HeartIcon, ShoppingCart } from 'lucide-react';

import { ICartItem } from '@/app/models/cart';
import { IProduct } from '@/app/models/products';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cart-store';

import { Card, CardContent } from './ui/card';
import StarRating from './star-rating';

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
  const { addToCart, cartItems } = useCartStore();

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
      <CardContent className="p-0">
        <Image
          className="w-full rounded-t-md aspect-square object-cover cursor-pointer"
          src={
            data?.image?.absUrl ||
            'https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6604.jpg?w=826'
          }
          width={400}
          height={600}
          alt={data?.image?.alt || 'Product image'}
          onClick={handleNavigateToProduct}
        />
        <div className="p-4">
          <div className="flex flex-col justify-between items-baseline">
            <p className="text-lg text-muted-foreground font-playfair font-medium text-primary">
              {data?.categories?.map((category) => category.name).join(', ') ??
                'Category'}
            </p>
            <h3 className="text-xl font-noto font-semibold">
              {(data?.name ?? '').length > 30
                ? `${(data?.name ?? '').substring(0, 30)}...`
                : data?.name}
            </h3>
            <p className="text-sm text-muted-foreground font-noto pt-2">
              {(data?.description ?? '').length > 75
                ? `${(data?.description ?? '').substring(0, 75)}...`
                : data?.description}
            </p>
          </div>

          <div className="flex gap-3 py-2">
            <StarRating reviews={data?.review ?? []} />
            <p className="text-base font-medium text-muted-foreground font-noto text-primary">
              ({data?.review?.length ?? 0} reviews)
            </p>
          </div>
          <div className="flex gap-4 pt-4 w-full justify-between items-center">
            <p className="text-sm font-semibold font-noto text-gray-600">
              <span className="text-primary text-lg font-bold">
                $ {data?.price?.totalAmount?.value.toFixed(2) ?? 0}{' '}
              </span>
              {/* {data?.price?.totalAmount?.unit ?? 'USD'} */}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0 font-poppins"
                onClick={handleAddToWhitelist}
              >
                <HeartIcon className="size-4 text-red-600" />
              </Button>
              <Button
                variant="default"
                className="font-poppins text-base font-medium text-white"
                onClick={handleAddToCart}
                disabled={cartItems.some((item) => item.id === data._id)}
              >
                <ShoppingCart className="size-4 me-1" /> Add
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
