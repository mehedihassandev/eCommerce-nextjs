import { FC } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

import { calculateAverageRatingAndStars } from '@/app/helper/product';
import { IReview } from '@/app/models/products';

interface IStarRatingProps {
  reviews: IReview[];
}

export const StarRating: FC<IStarRatingProps> = ({ reviews }) => {
  const { fullStars, halfStar, emptyStars } =
    calculateAverageRatingAndStars(reviews);

  return (
    <div className="flex items-center mt-1">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} className="text-yellow-500 text-sm" />
      ))}
      {halfStar && <FaStarHalfAlt className="text-yellow-500 text-sm" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={i} className="text-yellow-500 text-sm" />
      ))}
    </div>
  );
};

export default StarRating;
