'use client';

import { topProducts } from '@/app/data/products';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { IProduct } from '@/app/models/products';
import { LINK } from '@/app/navigation/router';
import { calculateRatingStars } from '@/app/helper/product';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { HeartIcon, PlusIcon } from 'lucide-react';
import { ProductCard } from '@/components/home';
import { getSpecifications } from '@/app/constants/product';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const ProductPage = () => {
  const params = useParams();
  const navigate = useRouter();
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = (product: IProduct) => {
    console.log('Added to cart:', product);
  };

  const handleAddToWhitelist = (product: IProduct) => {
    console.log('Added to whitelist:', product);
  };

  const handleNavigateToProduct = (product: IProduct) => {
    navigate.push(`/${LINK.PRODUCT}/${product.id}`);
  };

  const product = topProducts.find(
    (product) => product.id === Number(params.productId),
  );

  const { fullStars, halfStar, emptyStars } = calculateRatingStars(
    product?.rating || 0,
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const specifications = getSpecifications(product);

  const calculateDiscountPercentage = (
    originalPrice: number,
    offerPrice: number,
  ) => {
    return ((originalPrice - offerPrice) / originalPrice) * 100;
  };

  const discountPercentage = calculateDiscountPercentage(
    product.price,
    product.offerPrice,
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-12 lg:pt-28 flex flex-col justify-between">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="flex flex-col items-start gap-6 col-span-1">
          <Image
            src={product.image}
            alt="Product Image"
            width={600}
            height={600}
            className="rounded-lg w-full aspect-square object-cover"
          />
        </div>
        <div className="flex flex-col items-start gap-6 col-span-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            {product.name}
          </h1>
          <p className="text-muted-foreground text-base">
            {product.description}
          </p>
          <div className="flex gap-4 items-baseline">
            <div className="flex items-center mt-2 gap-1">
              {[...Array(fullStars)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
              {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
              {[...Array(emptyStars)].map((_, i) => (
                <FaRegStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <p className="text-base font-semibold">
              {product.rating} ({product.numberOfReviews} reviews)
            </p>
          </div>
          <div className="flex gap-14">
            <div className="flex flex-col justify-center gap-3 w-full">
              <p className="text-4xl font-semibold">${product.offerPrice}</p>
              <div className="flex gap-4 items-baseline">
                <p className="text-lg font-semibold text-gray-700 line-through">
                  $ {product.price}
                </p>
                <p className="text-[12px] font-semibold text-red-500">
                  {discountPercentage.toFixed(2)}% off
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <h4 className="text-base font-semibold pr-6">Quantity:</h4>

            <Button variant="outline" className="w-10" onClick={handleDecrease}>
              -
            </Button>
            <Input
              type="number"
              className="w-12 text-center"
              value={quantity}
            />

            <Button variant="outline" className="w-10" onClick={handleIncrease}>
              +
            </Button>
          </div>

          <div className="flex gap-8">
            <Button
              variant="default"
              className="w-full"
              onClick={() => handleAddToCart(product)}
            >
              <HeartIcon className="size-4 me-1" /> Add to Wishlist
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleAddToCart(product)}
            >
              <PlusIcon className="size-4 me-1" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="container grid gap-12 mt-24">
        <div className="grid gap-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
            Product Details
          </h2>
          <p className="text-base text-gray-800">{product.details}</p>
        </div>
        <div className="grid gap-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
            Product Specifications
          </h2>
          <div className="grid sm:grid-cols-1 gap-2">
            {specifications.map(
              (spec, index) =>
                spec.value && (
                  <div key={index} className="flex gap-4 items-center">
                    <p className="text-base font-semibold">{spec.label}: </p>
                    <p className="text-base text-gray-800">{spec.value}</p>
                  </div>
                ),
            )}
          </div>
        </div>
        <div className="grid gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
            {topProducts.slice(0, 4).map((product, index) => (
              <ProductCard
                key={index}
                data={product}
                handleAddToCart={() => handleAddToCart(product)}
                handleAddToWhitelist={() => handleAddToWhitelist(product)}
                handleNavigateToProduct={() => handleNavigateToProduct(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
