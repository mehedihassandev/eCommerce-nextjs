'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HeartIcon, PlusIcon } from 'lucide-react';
import { IProduct } from '@/app/modals/products';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

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
  const { name, image, price, offerPrice, category, description, rating } =
    data;

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center mt-2">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i} className="text-yellow-500" />
        ))}
      </div>
    );
  };

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
          {renderRating(rating)}
        </div>
        <div className="flex justify-center items-baseline gap-3">
          <p className="text-sm font-semibold text-gray-700 line-through">
            $ {price}
          </p>
          <p className="text-lg font-semibold">${offerPrice}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{description}</p>
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
