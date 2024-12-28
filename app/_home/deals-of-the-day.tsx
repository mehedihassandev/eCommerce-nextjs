import React, { FC } from 'react';

import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { OfferCard } from '@/components/offer-product-card';

import { IProduct } from '../models/products';

interface IDealsOfTheDayProps {
  data: IProduct[];
  handleNavigateToProduct: (product: IProduct) => void;
}

export const DealsOfTheDay: FC<IDealsOfTheDayProps> = ({
  data,
  handleNavigateToProduct,
}) => {
  // Shuffle the data array
  const shuffledData = data.sort(() => 0.5 - Math.random());

  // Get the first 4 items
  const randomProducts = shuffledData.slice(0, 4);

  return (
    <ContentWrapper className="lg:py-2">
      <div className="grid grid-cols-1 gap-8">
        <div className="flex flex-col">
          <h2 className="text-4xl font-bold font-playfair">Deals Of The Day</h2>
          <div className="grid grid-cols-4 gap-8 mt-6">
            {randomProducts &&
              randomProducts?.map((product: IProduct) => (
                <OfferCard
                  key={product._id}
                  data={product}
                  handleNavigateToProduct={() =>
                    handleNavigateToProduct(product)
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default DealsOfTheDay;
