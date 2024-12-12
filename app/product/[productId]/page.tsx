'use client';

import { topProducts } from '@/app/data/products';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { IProduct } from '@/app/modals/products';
import { LINK } from '@/app/navigation/router';
import { calculateRatingStars } from '@/app/helper/product';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { PlusIcon } from 'lucide-react';
import { ProductCard } from '@/components/home';

export const ProductInfo = () => {
  const params = useParams();
  const navigate = useRouter();
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

  console.log(params);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-12 lg:pt-28 flex flex-col justify-between">
      <div className="container grid md:grid-cols-2 gap-16">
        <div className="flex flex-col items-start gap-6">
          <Image
            src={product.image}
            alt="Product Image"
            width={600}
            height={600}
            className="rounded-lg w-full h-[700px] aspect-square object-cover"
          />
        </div>
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {product.name}
          </h1>
          <p className="text-muted-foreground text-lg">{product.description}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center mt-2">
              {[...Array(fullStars)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
              {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
              {[...Array(emptyStars)].map((_, i) => (
                <FaRegStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <p className="text-lg font-semibold">
              {product.rating} (120 reviews)
            </p>
          </div>
          <div className="flex gap-14">
            <div className="flex justify-center items-baseline gap-3 w-full">
              <p className="text-sm font-semibold text-gray-700 line-through">
                $ {product.price}
              </p>
              <p className="text-lg font-semibold">${product.offerPrice}</p>
            </div>
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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Product Details
          </h2>
          <div className="grid gap-4 text-muted-foreground">
            <p>{product.description}</p>
          </div>
        </div>
        <div className="grid gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Product Specifications
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <h3 className="text-lg font-semibold">Material</h3>
              <p className="text-muted-foreground">
                60% combed ringspun cotton, 40% polyester jersey
              </p>
            </div>
            <div className="grid gap-2">
              <h3 className="text-lg font-semibold">Fit</h3>
              <p className="text-muted-foreground">Regular fit, true to size</p>
            </div>
            <div className="grid gap-2">
              <h3 className="text-lg font-semibold">Care Instructions</h3>
              <p className="text-muted-foreground">
                Machine wash cold, tumble dry low
              </p>
            </div>
            <div className="grid gap-2">
              <h3 className="text-lg font-semibold">Origin</h3>
              <p className="text-muted-foreground">Made in USA</p>
            </div>
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

export default ProductInfo;
