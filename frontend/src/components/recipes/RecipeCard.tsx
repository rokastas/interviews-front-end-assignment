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
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onRecipeClick }) => {
  const cuisines = useAppSelector((state) => state.cuisines.data);
  const cuisine = cuisines.find((cuisine) => cuisine.id === recipe.cuisineId);

  return (
    <div className="bg-yellow">
      <div
        className="bg-white
                    transform hover:translate-x-[-8px] hover:translate-y-[-8px] transition-transform duration-200
                    hover:cursor-pointer"
        onClick={() => onRecipeClick(recipe)}
      >
        <div className="h-80 relative">
          <Image
            src={recipe.image ? `http://localhost:8080${recipe.image}` : "/no-image.png"  }
            alt={recipe.name}
            style={imageStyle}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            priority
          />
        </div>
        <div className="p-4">
          <h2 className="h-100 font-serif font-light text-4xl pb-1">
            {recipe.name}
          </h2>
          <p className="text-lg text-gray-500 pb-20">{cuisine?.name}</p>
          <div className="flex flex-row justify-between">
            <DifficultyIcon difficultyId={recipe.difficultyId} />
            <RatingAverage recipe={recipe}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
