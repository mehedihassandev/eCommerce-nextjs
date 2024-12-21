'use client';

import { Button } from '@/components/ui/button';
import { MinusIcon, MoveRight, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { MdFavoriteBorder } from 'react-icons/md';
import { CiCircleRemove } from 'react-icons/ci';
import { ProductCard } from '@/app/home';
import { ChangeEvent, useState } from 'react';
import { IProduct } from '../models/products';
import { LINK } from '../navigation/router';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/stores/cart-store';
import { useProductsQuery } from '@/hooks/useProductsQuery/useProductsQuery';

export default function Checkout() {
  const navigate = useRouter();

  const [quantity, setQuantity] = useState(1);

  const { cartItems } = useCartStore();

  const { data } = useProductsQuery('');

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
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
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cartItems.map((product) => (
                <div
                  key={product._id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                >
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <Image
                      className="h-32 w-32 dark:hidden object-cover rounded-lg"
                      src={product.image || '/path/to/default/image.jpg'}
                      alt={product.name || 'Product Image'}
                      width={300}
                      height={300}
                    />

                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        <Button variant="ghost" onClick={handleDecrease}>
                          <MinusIcon className="h-2.5 w-2.5 text-gray-900 dark:text-white" />
                        </Button>
                        <Input
                          type="text"
                          className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                          value={quantity}
                          onChange={handleQuantityChange}
                          readOnly
                        />
                        <Button variant="ghost" onClick={handleIncrease}>
                          <PlusIcon className="h-2.5 w-2.5 text-gray-900 dark:text-white" />
                        </Button>
                      </div>
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-1">
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </p>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        Category: {product.category}
                      </p>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        Color: {product.specifications?.color ?? 'N/A'}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-6">
                      <Button
                        type="button"
                        variant="ghost"
                        className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white gap-2"
                      >
                        <MdFavoriteBorder className="h-4 w-4" /> Add to
                        Favorites
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        className="flex gap-2 items-center text-sm font-medium text-red-600 dark:text-red-500"
                      >
                        <CiCircleRemove className="h-4 w-4" /> Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden xl:mt-16 xl:block">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                People also bought
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8 mt-6">
                {data &&
                  data
                    .slice(0, 4)
                    .map((product: IProduct, index: number) => (
                      <ProductCard
                        key={index}
                        data={product}
                        handleAddToWhitelist={() =>
                          handleAddToWhitelist(product)
                        }
                        handleNavigateToProduct={() =>
                          handleNavigateToProduct(product)
                        }
                      />
                    ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $7,592.00
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Delivery Charges
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $99
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tax
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $799
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total Price
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    $8,191.00
                  </dd>
                </dl>
              </div>

              <div className="flex items-center justify-between gap-6 pt-8">
                <Button variant="ghost" className="w-full">
                  Continue Shopping
                  <MoveRight className="h-4 w-4" />
                </Button>

                <Button variant="outline" className="w-full ">
                  Proceed to Checkout
                </Button>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <form className="flex gap-6">
                <Input
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Apply coupon code"
                  required
                />
                <Button type="submit" variant="default" className="w-48">
                  Apply
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
