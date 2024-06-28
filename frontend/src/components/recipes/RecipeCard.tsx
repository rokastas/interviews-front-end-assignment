import Image from "next/image";
import { Recipe } from "../../utils/types";
import DifficultyIcon from "../DifficultyIcon";
import RatingAverage from "../rating/RatingAverage";
import { useAppSelector } from "../../store/hooks";

interface RecipeCardProps {
  recipe: Recipe;
  onRecipeClick: (recipe: Recipe) => void;
}

const imageStyle: React.CSSProperties = {
  objectFit: "cover",
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onRecipeClick }) => {
  const cuisines = useAppSelector((state) => state.cuisines.data);
  const cuisine = cuisines.find((cuisine) => cuisine.id === recipe.cuisineId);

  return (
    <div className="bg-yellow h-full flex flex-col">
      <div
        className="bg-white flex flex-col justify-between h-full
                    transform hover:translate-x-[-8px] hover:translate-y-[-8px] transition-transform duration-100
                    hover:cursor-pointer"
        onClick={() => onRecipeClick(recipe)}
      >
        <div className="h-40 md:h-80 lg:h-80 relative">
          <Image
            src={recipe.image ? `http://localhost:8080${recipe.image}` : "/no-image.png"}
            alt={recipe.name}
            style={imageStyle}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            priority
          />
        </div>
        <div className="p-2 md:p-4 lg:p-4 flex-grow flex flex-col justify-between">
          <h2 className="font-serif font-light text-2xl md:text-4xl lg:text-4xl pb-1 md:pb-2 lg:pb-2">
            {recipe.name}
          </h2>
          <p className="text-lg text-gray-500 pb-6 md:pb-10 lg:pb-10">{cuisine?.name}</p>
          <div className="flex flex-row justify-between">
            <DifficultyIcon difficultyId={recipe.difficultyId} />
            <div className="invisible md:visible lg:visible flex">
              <RatingAverage recipe={recipe} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
