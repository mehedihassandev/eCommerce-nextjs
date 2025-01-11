'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart } from 'lucide-react';

import { ProductCard } from '@/components/cards/product-card';
import CustomBreadcrumb from '@/components/custom-breadcrumb';
import { ProductCardSkeleton } from '@/components/skeleton/product-card-skeleton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCartStore } from '@/stores/cart-store';
import { useWhitelistStore } from '@/stores/whitelist-store';
import { axios, getProducts } from '@/utils';

import { ICartItem } from '../models/cart';
import { IProduct } from '../models/products';
import { LINK } from '../navigation/router';

export default function Whitelist() {
  const navigate = useRouter();

  const [limit, setLimit] = useState(4);
  const [offset, setOffset] = useState(0);
  const { whitelistItems, removeFromWhitelist } = useWhitelistStore();
  const { addToCart, cartItems } = useCartStore();

  const { data, isLoading } = useQuery({
    queryKey: ['products', limit, offset],
    queryFn: () => {
      const params = new URLSearchParams();

      params.append('limit', limit.toString());
      params.append('offset', offset.toString());

      return getProducts({
        api: axios,
        url: params as unknown as string,
      });
    },
    select: (data) => data.data.products,
  });

  const handleNavigateToProduct = (product: IProduct) => {
    navigate.push(`/${LINK.PRODUCT}/${product._id}`);
  };

  const handleAddToCart = (product: IProduct) => {
    console.log(product);
    const id = product?._id ?? 0;

    const cartItem = {
      id,
      action: 'add',
      quantity: 1,
      item: {
        _id: product._id,
        name: product.name,
        description: product.description,
        details: product.details,
        brand: product.brand,
        version: product.version,
        price: product.price,
        image: product.image,
        categories: product.categories,
      },
    };

    addToCart(cartItem as ICartItem);
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-2xl px-6 pt-8">
        <CustomBreadcrumb />
        <h2 className="text-4xl font-bold font-playfair text-gray-900 dark:text-white mt-6">
          Favorite Products
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="space-y-6 w-full">
            {whitelistItems.map((product) => (
              <Card
                key={product?.item?._id}
                className="relative rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 flex"
              >
                <Button
                  variant="ghost"
                  className="absolute top-4 right-4"
                  onClick={() => {
                    removeFromWhitelist(product?.item?._id);
                  }}
                >
                  <CiCircleRemove className="dark:text-white text-red-600 text-lg" />
                </Button>
                <CardHeader>
                  <Image
                    className="h-32 w-44 dark:hidden object-cover rounded-lg"
                    src={
                      product?.item?.image?.absUrl ||
                      'https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6604.jpg?w=826'
                    }
                    alt={product?.item.name || 'Product Image'}
                    width={300}
                    height={300}
                  />
                </CardHeader>
                <CardContent className="mt-5">
                  <CardTitle className="text-2xl font-medium text-gray-900 dark:text-white font-playfair pb-2">
                    {product?.item?.name}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-500 dark:text-gray-400 font-noto pb-2">
                    Category:{' '}
                    {product?.item?.categories?.map(
                      (category) => category.name,
                    ) ?? 'N/A'}
                  </CardDescription>
                  <CardDescription className="text-base text-gray-500 dark:text-gray-400 font-noto">
                    Color: {product?.item?.specifications?.color ?? 'N/A'}
                  </CardDescription>
                  <Button
                    variant="default"
                    className="font-poppins text-base font-medium text-white mt-5"
                    onClick={() => handleAddToCart(product?.item)}
                    disabled={cartItems.some(
                      (item) => item.id === product?.item?._id,
                    )}
                  >
                    <ShoppingCart className="size-4 me-1" /> Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="hidden xl:mt-16 xl:block">
          <h3 className="text-4xl font-bold font-playfair text-gray-900 dark:text-white">
            May you also like
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8 mt-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              : data &&
                data.map((product: IProduct, index: number) => (
                  <ProductCard
                    key={index}
                    data={product}
                    handleNavigateToProduct={() =>
                      handleNavigateToProduct(product)
                    }
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
