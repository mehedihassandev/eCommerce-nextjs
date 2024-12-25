import { IReview } from '../models/products';

export const calculateAverageRatingAndStars = (reviews: IReview[]) => {
  if (reviews.length === 0)
    return { averageRating: 0, fullStars: 0, halfStar: false, emptyStars: 5 };

  const totalRating = reviews.reduce(
    (sum, review) => sum + (review?.rating ?? 0),
    0,
  );
  const averageRating = totalRating / reviews.length;

  const fullStars = Math.floor(averageRating);
  const halfStar = averageRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return { averageRating, fullStars, halfStar, emptyStars };
};
