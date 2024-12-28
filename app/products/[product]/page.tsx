'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { HeartIcon, PlusIcon } from 'lucide-react';

import { getSpecifications } from '@/app/constants/product';
import { calculateAverageRatingAndStars } from '@/app/helper/product';
import { ICartItem } from '@/app/models/cart';
import { IProduct } from '@/app/models/products';
import { LINK } from '@/app/navigation/router';
import { ProductCard } from '@/components/product-card';
import { RhfTextField } from '@/components/rhf-textfield/rhf-textfield';
import { ProductCardSkeleton } from '@/components/skeleton/product-card-skeleton';
import { ProductDetailsSkeleton } from '@/components/skeleton/product-details-skeleton';
import { StarRating } from '@/components/star-rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useProductsQuery } from '@/hooks/useProductsQuery/useProductsQuery';
import { useCartStore } from '@/stores/cart-store';

const ProductDetails = () => {
  const params = useParams();
  const navigate = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [product, setProduct] = useState<IProduct | null>(null);

  const { data, isLoading } = useProductsQuery(`/${params?.product}`);

  const { data: allProducts, isLoading: isAllProductLoading } =
    useProductsQuery('');

  const { addToCart } = useCartStore();

  const { averageRating } = calculateAverageRatingAndStars(
    product?.review ?? [],
  );

  const { control } = useForm();

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
    const id = product?._id ?? 0;

    const cartItem = {
      id,
      action: 'add',
      quantity,
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
      {isLoading ? (
        <ProductDetailsSkeleton />
      ) : (
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
                    transform: `scale(1.5) translate(-${
                      mousePosition.x / 2
                    }px, -${mousePosition.y / 2}px)`,
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
              <h4 className="text-lg font-semibold pr-6 font-noto">
                Quantity:
              </h4>

              <Button
                variant="outline"
                className="w-10"
                onClick={handleDecrease}
              >
                -
              </Button>
              <Input
                className="w-12 text-center font-noto"
                value={quantity}
                onChange={handleQuantityChange}
              />

              <Button
                variant="outline"
                className="w-10"
                onClick={handleIncrease}
              >
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
      )}

      <div className="container grid gap-8 mt-14">
        <Tabs defaultValue="detailsSpecifications">
          <TabsList className="flex justify-end w-full h-12 p-3 gap-4">
            <TabsTrigger
              value="detailsSpecifications"
              className="text-xl font-semibold font-playfair shadow-sm"
            >
              Details & Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="text-xl font-semibold font-playfair shadow-sm"
              color="green"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="detailsSpecifications">
            <div className="my-8 flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl font-semibold font-playfair">
                Product Details
              </h2>
              <p className="text-sm md:text-base text-gray-800 font-noto leading-relaxed">
                {product?.details || 'No details available'}
              </p>
            </div>

            <div className="my-8 flex flex-col gap-4">
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
          </TabsContent>

          <TabsContent value="reviews">
            <div className="flex flex-col gap-4 my-8">
              <h2 className="text-4xl font-semibold font-playfair">Reviews</h2>
              <p className="text-gray-800 mb-4 font-noto text-xl font-semibold">
                {(product?.review?.length ?? 0) > 0
                  ? `This product has ${product?.review?.length} ${
                      product?.review?.length === 1 ? 'review' : 'reviews'
                    }.`
                  : 'Be the first to review this product!'}
              </p>

              {product?.review?.map((review, index) => (
                <div className="grid gap-4 my-4" key={index}>
                  <div className="flex gap-6 items-start">
                    <Avatar className="w-14 h-14">
                      <AvatarImage
                        src={`https://randomuser.me/api/portraits/lego/${index}.jpg`}
                        alt="Reviewer Avatar"
                        className="rounded-full"
                      />
                      <AvatarFallback>{review?.reviewerName}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-2">
                      <p className="text-lg font-semibold font-noto">
                        {review?.reviewerName}
                      </p>
                      <p className="text-sm font-noto text-gray-700">
                        {review?.comment}
                      </p>
                      <StarRating reviews={[review]} />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-4">
                {/* Review Textarea */}
                <div>
                  <Label
                    htmlFor="review"
                    className="mb-2 text-sm font-medium font-noto block"
                  >
                    Review *
                  </Label>
                  <Textarea
                    placeholder="Write your review here..."
                    rows={4}
                    className="mb-4"
                  />
                </div>

                {/* Name Input */}
                <RhfTextField
                  control={control}
                  name="name"
                  label="Name *"
                  placeholder="Enter your name"
                />

                {/* Email Input */}
                <RhfTextField
                  control={control}
                  name="email"
                  label="Email *"
                  type="email"
                  placeholder="Enter your email"
                />

                {/* Submit Button */}
                <Button variant="default" className="w-44 mt-8">
                  Submit
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 mt-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-playfair">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
            {isAllProductLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              : allProducts &&
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
                    />
                  ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
