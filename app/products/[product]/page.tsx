'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { ChangeEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, PlusIcon } from 'lucide-react';

import { getSpecifications } from '@/app/constants/product';
import { calculateAverageRatingAndStars } from '@/app/helper/product';
import { IProduct } from '@/app/models/products';
import { LINK } from '@/app/navigation/router';
import { ProductCard } from '@/components/product-card';
import StarRating from '@/components/star-rating';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProductsQuery } from '@/hooks/useProductsQuery/useProductsQuery';
import { useCartStore } from '@/stores/cart-store';

const ProductPage = () => {
  const params = useParams();
  const navigate = useRouter();

  const { data, isLoading } = useProductsQuery(`/${params?.product}`);

  const { data: allProducts, isLoading: isAllProductLoading } =
    useProductsQuery('');

  const { addToCart } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [product, setProduct] = useState<IProduct | null>(null);

  const { averageRating } = calculateAverageRatingAndStars(
    product?.review ?? [],
  );

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

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

  const handleAddToCart = (product: IProduct) => {
    addToCart(product);
  };

  const handleAddToWhitelist = (product: IProduct) => {
    console.log('Added to whitelist:', product);
  };

  const handleNavigateToProduct = (product: IProduct) => {
    navigate.push(`/${LINK.PRODUCT}/${product._id}`);
  };

  if (!product && !isLoading) {
    return (
      <div className="h-screen text-5xl items-center justify-center font-bold font-serif align-middle text-center pt-24">
        Product not found
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen text-5xl items-center justify-center font-bold font-serif align-middle text-center pt-24">
        Loading...
      </div>
    );
  }

  const specifications = product ? getSpecifications(product) : [];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-12 lg:pt-28 flex flex-col justify-between">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-16">
        <div
          className={`flex flex-col items-start gap-6 col-span-1 relative ${
            isHovered ? 'cursor-zoom-in' : ''
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={
              product?.image?.absUrl ||
              'https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6604.jpg?w=826'
            }
            alt="Product Image"
            width={600}
            height={600}
            className="rounded-lg w-full aspect-square object-cover"
          />
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.8 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute w-full h-full left-full top-44 ml-52 p-2 bg-white border border-gray-300 rounded-sm shadow-lg z-10 overflow-hidden hidden md:block"
            >
              <Image
                src={
                  product?.image?.absUrl ||
                  'https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6604.jpg?w=826'
                }
                alt="Zoomed Product Image"
                width={1980}
                height={1440}
                className="rounded-lg w-full aspect-square object-cover"
                style={{
                  transform: `scale(2) translate(-${mousePosition.x / 2}px, -${
                    mousePosition.y / 2
                  }px)`,
                  transformOrigin: 'top left',
                }}
              />
            </motion.div>
          )}
        </div>
        <div className="flex flex-col items-start gap-4 col-span-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight font-playfair">
            {product?.name}
          </h1>
          <p className="text-muted-foreground text-base font-noto">
            {product?.description}
          </p>
          <div className="flex gap-4 items-stretch">
            <StarRating reviews={product?.review ?? []} />
            <p className="text-base font-semibold font-noto text-gray-700">
              {averageRating} ({product?.review?.length} reviews)
            </p>
          </div>
          <div className="flex gap-14">
            <div className="flex flex-col justify-center gap-3 w-full">
              <p className="text-4xl font-semibold font-noto">
                $ {product?.price?.totalAmount?.value ?? 0}{' '}
                {product?.price?.totalAmount?.unit ?? 'USD'}
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <h4 className="text-lg font-semibold pr-6 font-noto">Quantity:</h4>

            <Button variant="outline" className="w-10" onClick={handleDecrease}>
              -
            </Button>
            <Input
              type="number"
              className="w-12 text-center font-noto"
              value={quantity}
              onChange={handleQuantityChange}
            />

            <Button variant="outline" className="w-10" onClick={handleIncrease}>
              +
            </Button>
          </div>

          <div className="flex gap-8 mt-14">
            <Button
              variant="default"
              className="w-full"
              onClick={() => product && handleAddToCart(product)}
            >
              <HeartIcon className="size-4 me-1" /> Add to Wishlist
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => product && handleAddToCart(product)}
            >
              <PlusIcon className="size-4 me-1" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="container grid gap-8 mt-14">
        <div className="grid gap-4">
          <h2 className="text-3xl md:text-4xl font-semibold font-playfair">
            Product Details
          </h2>
          <p className="text-sm md:text-base text-gray-800 font-noto leading-relaxed">
            {product?.details || 'No details available'}
          </p>
        </div>
        <div className="grid gap-4">
          <h2 className="text-3xl md:text-4xl font-semibold font-playfair">
            Product Specifications
          </h2>
          <div className="grid sm:grid-cols-1 gap-2">
            {specifications.map(
              (spec, index) =>
                spec.value &&
                spec.value !== 'N/A' && (
                  <div key={index} className="flex gap-4 items-center">
                    <p className="text-sm md:text-base font-semibold font-noto">
                      {spec.label}:{' '}
                    </p>
                    <p className="text-sm md:text-base text-gray-800 font-noto">
                      {spec.value}
                    </p>
                  </div>
                ),
            )}
          </div>
        </div>
        <div className="grid gap-6 mt-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-playfair">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
            {Array.isArray(allProducts) &&
              allProducts
                .slice(0, 4)
                .map((product: IProduct, index: number) => (
                  <ProductCard
                    key={index}
                    data={product}
                    handleAddToWhitelist={() => handleAddToWhitelist(product)}
                    handleNavigateToProduct={() =>
                      handleNavigateToProduct(product)
                    }
                    isLoading={isAllProductLoading}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
