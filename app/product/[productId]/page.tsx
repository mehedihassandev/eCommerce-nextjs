'use client';

import { topProducts } from '@/app/data/products';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { StarIcon } from 'lucide-react';

export const ProductInfo = () => {
  const params = useParams();

  const product = topProducts.find(
    (product) => product.id === Number(params.productId),
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  console.log(params);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-12 lg:pt-28 flex flex-col justify-between">
      <section className="bg-muted py-12 md:py-24 lg:py-32">
        <div className="container grid md:grid-cols-2 gap-8 px-4 md:px-6">
          <div className="flex flex-col items-start gap-6">
            <Image
              src="/placeholder.svg"
              alt="Product Image"
              width={600}
              height={600}
              className="rounded-lg w-full aspect-square object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Acme Prism T-Shirt
            </h1>
            <p className="text-muted-foreground text-lg">
              Crafted with a meticulous composition of 60% combed ringspun
              cotton and 40% polyester jersey, this tee is soft, breathable, and
              stylish.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
              <p className="text-lg font-semibold">4.3 (120 reviews)</p>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-bold">$49.99</h2>
              <Button size="lg">Add to Cart</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container grid gap-12 px-4 md:px-6">
          <div className="grid gap-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Product Details
            </h2>
            <div className="grid gap-4 text-muted-foreground">
              <p>
                The Acme Prism T-Shirt is a stylish and comfortable addition to
                your wardrobe. Crafted with a unique prism-inspired pattern,
                this tee adds a modern touch to your everyday look.
              </p>
              <p>
                Made with a blend of 60% combed ringspun cotton and 40%
                polyester jersey, the Acme Prism T-Shirt is soft, breathable,
                and durable. The fabric is designed to keep you cool and
                comfortable throughout the day.
              </p>
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
                <p className="text-muted-foreground">
                  Regular fit, true to size
                </p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent>
                  <Image
                    src="/placeholder.svg"
                    alt="Related Product 1"
                    width={300}
                    height={300}
                    className="rounded-lg w-full aspect-square object-cover"
                  />
                  <div className="grid gap-2 mt-4">
                    <h3 className="text-lg font-semibold">
                      Acme Circles Hoodie
                    </h3>
                    <p className="text-muted-foreground">$59.99</p>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Image
                    src="/placeholder.svg"
                    alt="Related Product 2"
                    width={300}
                    height={300}
                    className="rounded-lg w-full aspect-square object-cover"
                  />
                  <div className="grid gap-2 mt-4">
                    <h3 className="text-lg font-semibold">
                      Acme Prism Sweatshirt
                    </h3>
                    <p className="text-muted-foreground">$69.99</p>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Image
                    src="/placeholder.svg"
                    alt="Related Product 3"
                    width={300}
                    height={300}
                    className="rounded-lg w-full aspect-square object-cover"
                  />
                  <div className="grid gap-2 mt-4">
                    <h3 className="text-lg font-semibold">
                      Acme Prism Joggers
                    </h3>
                    <p className="text-muted-foreground">$49.99</p>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductInfo;
