import Image from 'next/image';

import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

import { ICartItem } from '@/app/models/cart';
import { IProduct } from '@/app/models/products';
import { useCartStore } from '@/stores/cart-store';

import { Button } from '../ui/button';

interface IProductOfferCardProps {
  data: IProduct;
  handleNavigateToProduct: () => void;
}

export const ProductOfferCard: FC<IProductOfferCardProps> = ({
  data,
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
    <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <Image
          src={
            data?.image?.absUrl ||
            'https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6604.jpg?w=826'
          }
          alt="Egg"
          width={320}
          height={240}
          onClick={handleNavigateToProduct}
          className="w-full rounded-t-md aspect-square object-cover cursor-pointer"
        />
        <div className="absolute -bottom-4 left-5 flex space-x-1">
          {['58 Days', '07 Hours', '07 Mins', '41 Secs'].map((time, index) => (
            <motion.div
              key={index}
              className="bg-white text-green-600 text-xs font-semibold py-2 px-2 rounded shadow-md"
              whileHover={{ y: -2 }}
            >
              {time}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="p-4 mt-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {(data?.name ?? '').length > 30
            ? `${(data?.name ?? '').substring(0, 30)}...`
            : data?.name}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-xl font-bold text-green-600">
              {data?.price?.dutyFreeAmount?.value.toFixed(2)}
            </span>
            <span className="text-sm line-through text-gray-400 ml-2">
              {data?.price?.totalAmount?.value.toFixed(2)}
            </span>
          </div>
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
  );
};

export default ProductOfferCard;
