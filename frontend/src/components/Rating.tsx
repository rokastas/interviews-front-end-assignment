import React from 'react';
import { FullStar, HalfStar, EmptyStar } from './RatingStars';

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-400">
      {Array.from({ length: fullStars }).map((_, index) => (
        <FullStar key={index} index={index} />
      ))}
      {halfStar && <HalfStar key="half" />}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <EmptyStar key={index + fullStars + 1} index={index + fullStars + 1} />
      ))}
    </div>
  );
};

export default Rating;
