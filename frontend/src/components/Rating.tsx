import { Recipe, Comment } from "../utils/types";
import { useAppSelector } from "../store/hooks";

interface RatingProps {
  recipe: Recipe;
}

const Rating = ({ recipe }: RatingProps) => {
  const comments = useAppSelector((state) => state.comments.data);

  const recipeComments = comments?.filter((comment: Comment) => comment.recipeId === recipe.id);

  const getAverageRating = (comments: Comment[]) => {
    if (comments.length === 0) return 0;

    const totalRating = comments.reduce((acc, comment) => acc + comment.rating, 0);

    return totalRating / comments.length;
  };

  const averageRating = getAverageRating(recipeComments);
  const fullStars = Math.floor(averageRating);
  const halfStar = averageRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-400">
      {Array.from({ length: fullStars }).map((_, index) => (
        <svg
          key={`full-${index}`}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      ))}
      {halfStar && (
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
        >
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="white" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfGrad)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      )}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <svg
          key={`empty-${index}`}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      ))}
    </div>
  );
};

export default Rating;
