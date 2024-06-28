import { Recipe } from "../../utils/types";
import RecipeCard from "./RecipeCard";

interface RecipeListProps {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onRecipeClick }) => {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map((recipe) => (
        <li key={recipe.id} className="h-full">
          <RecipeCard recipe={recipe} onRecipeClick={onRecipeClick} />
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
