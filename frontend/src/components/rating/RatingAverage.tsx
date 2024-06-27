import { Recipe, Comment } from "../../utils/types";
import { useAppSelector } from "../../store/hooks";
import Rating from "./Rating";

interface RatingAverageProps {
  recipe: Recipe;
}

const RatingAverage = ({ recipe }: RatingAverageProps) => {
  const comments = useAppSelector((state) => state.comments.data);

  const recipeComments = comments?.filter((comment: Comment) => comment.recipeId === recipe.id);

  const getAverageRating = (comments: Comment[]) => {
    if (comments.length === 0) return 0;

    const totalRating = comments.reduce((acc, comment) => acc + comment.rating, 0);

    return totalRating / comments.length;
  };

  const averageRating = getAverageRating(recipeComments);

  return (
    <Rating rating={averageRating} />
  );
};

export default RatingAverage;
