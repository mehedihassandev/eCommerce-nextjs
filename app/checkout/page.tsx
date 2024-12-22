'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { MinusIcon, MoveRight, PlusIcon } from 'lucide-react';

import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useProductsQuery } from '@/hooks/useProductsQuery/useProductsQuery';
import { useCartStore } from '@/stores/cart-store';

import { IProduct } from '../models/products';
import { LINK } from '../navigation/router';

export default function Checkout() {
  const navigate = useRouter();

  const [quantity, setQuantity] = useState(1);

  const { cartItems } = useCartStore();

  const { data, isLoading } = useProductsQuery('');

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToWhitelist = (product: IProduct) => {
    console.log('Added to whitelist:', product);
  };

  const handleNavigateToProduct = (product: IProduct) => {
    navigate.push(`/${LINK.PRODUCT}/${product._id}`);
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-2xl px-6 pt-12">
        <h2 className="text-3xl font-semibold font-playfair text-gray-900 dark:text-white">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cartItems.map((product) => (
                <Card
                  key={product._id}
                  className="relative rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 flex"
                >
                  <Button
                    variant="ghost"
                    className="absolute top-4 right-4"
                    onClick={() => {}}
                  >
                    <CiCircleRemove className="dark:text-white text-red-600 text-lg" />
                  </Button>
                  <CardHeader>
                    <Image
                      className="h-32 w-44 dark:hidden object-cover rounded-lg"
                      src={
                        product?.attachment?.imageUrl ||
                        'https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6604.jpg?w=826'
                      }
                      alt={product.name || 'Product Image'}
                      width={300}
                      height={300}
                    />
                  </CardHeader>
                  <CardContent className="mt-5">
                    <CardTitle className="text-2xl font-medium text-gray-900 dark:text-white font-playfair pb-2">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-base text-gray-500 dark:text-gray-400 font-noto">
                      Category: {product?.category?.name ?? 'N/A'}
                    </CardDescription>
                    <CardDescription className="text-base text-gray-500 dark:text-gray-400 font-noto">
                      Color: {product?.specifications?.color ?? 'N/A'}
                    </CardDescription>
                    <div className="flex items-center">
                      <Button variant="ghost" onClick={handleDecrease}>
                        <MinusIcon className="h-2.5 w-2.5 text-gray-900 dark:text-white" />
                      </Button>
                      <h4 className="text-base font-semibold font-noto text-gray-900 dark:text-white mx-4">
                        {quantity}
                      </h4>
                      <Button variant="ghost" onClick={handleIncrease}>
                        <PlusIcon className="h-2.5 w-2.5 text-gray-900 dark:text-white" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-3xl font-semibold text-gray-900 dark:text-white font-playfair">
                Order summary
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal font-noto text-gray-500 dark:text-gray-400">
                      Price
                    </dt>
                    <dd className="text-base font-medium font-noto text-gray-900 dark:text-white">
                      $7,592.00
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal font-noto text-gray-500 dark:text-gray-400">
                      Delivery Charges
                    </dt>
                    <dd className="text-base font-medium font-noto text-gray-900 dark:text-white">
                      $99
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal font-noto text-gray-500 dark:text-gray-400">
                      Tax
                    </dt>
                    <dd className="text-base font-medium font-noto text-gray-900 dark:text-white">
                      $799
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold font-noto text-gray-900 dark:text-white">
                    Total Price
                  </dt>
                  <dd className="text-base font-bold font-noto text-gray-900 dark:text-white">
                    $8,191.00
                  </dd>
                </dl>
              </div>

              <div className="flex items-center justify-between gap-6 pt-8">
                <Button
                  variant="ghost"
                  className="w-full font-poppins font-medium text-sm"
                  onClick={() => navigate.push(LINK.HOME)}
                >
                  Continue Shopping
                  <MoveRight className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full font-poppins font-medium text-sm"
                  onClick={() =>
                    navigate.push(`${LINK.CHECKOUT}/${LINK.BILLING_DETAILS}`)
                  }
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <form className="flex gap-6">
                <Input
                  type="text"
                  className="block w-full font-noto rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Apply coupon code"
                  required
                />
                <Button
                  type="submit"
                  variant="default"
                  className="w-48 font-poppins text-sm font-medium"
                >
                  Apply
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden xl:mt-16 xl:block">
          <h3 className="text-4xl font-bold font-playfair text-gray-900 dark:text-white">
            May you also like
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8 mt-6">
            {data &&
              data
                .slice(0, 4)
                .map((product: IProduct, index: number) => (
                  <ProductCard
                    key={index}
                    data={product}
                    handleAddToWhitelist={() => handleAddToWhitelist(product)}
                    handleNavigateToProduct={() =>
                      handleNavigateToProduct(product)
                    }
                    isLoading={isLoading}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
