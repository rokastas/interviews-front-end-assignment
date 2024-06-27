import { useState } from "react";
import { FullStar, EmptyStar } from "./RatingStars";

interface RatingSelectorProps {
  rating: number;
  setRating: (rating: number) => void;
}

const RatingSelector: React.FC<RatingSelectorProps> = ({ rating, setRating }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (index: number) => {
    setRating(index);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
          className="cursor-pointer"
        >
          {hoveredRating >= index || rating >= index ? (
            <FullStar index={index} />
          ) : (
            <EmptyStar index={index} />
          )}
        </div>
      ))}
    </div>
  );
};

export default RatingSelector;
