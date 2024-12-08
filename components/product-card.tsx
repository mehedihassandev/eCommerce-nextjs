'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HeartIcon, PlusIcon } from 'lucide-react';
import { IProduct } from '@/app/modals/products';

interface IProductCard {
  data: IProduct;
  handleAddToCart: () => void;
  handleAddToWhitelist: () => void;
}

const ProductCard: FC<IProductCard> = ({
  data,
  handleAddToCart,
  handleAddToWhitelist,
}) => {
  const { name, image, price, category } = data;

  return (
    <div className="w-full group relative space-y-4">
      <figure className="group-hover:opacity-90">
        <Image
          className="w-full rounded-lg aspect-square object-center"
          src={image}
          width={300}
          height={500}
          alt={name}
        />
      </figure>
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{category}</p>
        </div>
        <p className="text-lg font-semibold">{price}</p>
      </div>
      <div className="flex gap-4">
        <Button
          variant="outline"
          size="icon"
          className="flex-shrink-0"
          onClick={handleAddToWhitelist}
        >
          <HeartIcon className="size-4" />
        </Button>
        <Button variant="outline" className="w-full" onClick={handleAddToCart}>
          <PlusIcon className="size-4 me-1" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
