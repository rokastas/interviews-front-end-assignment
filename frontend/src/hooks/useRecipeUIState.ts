import { useState } from "react";
import { Recipe, Cuisine, Difficulty, Diet } from "../utils/types";

const useRecipeUIState = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCuisineId, setSelectedCuisineId] = useState<Cuisine["id"]>("");
  const [selectedDifficultyId, setSelectedDifficultyId] = useState<Difficulty["id"]>("");
  const [selectedDietId, setSelectedDietId] = useState<Diet["id"]>("");
  const [toggleAddRecipeModal, setToggleAddRecipeModal] = useState<boolean>(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCuisineChange = (cuisineId: Cuisine["id"]) => {
    setSelectedCuisineId(cuisineId);
  };

  const handleDifficultyChange = (difficultyId: Difficulty["id"]) => {
    setSelectedDifficultyId(difficultyId);
  };

  const handleDietChange = (dietId: Diet["id"]) => {
    setSelectedDietId(dietId);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
  };

  const handleAddRecipe = () => {
    setToggleAddRecipeModal(true);
  };

  const closeAddRecipeModal = () => {
    setToggleAddRecipeModal(false);
  };

  return {
    searchQuery,
    selectedRecipe,
    selectedCuisineId,
    selectedDifficultyId,
    selectedDietId,
    toggleAddRecipeModal,
    handleSearch,
    handleCuisineChange,
    handleDifficultyChange,
    handleDietChange,
    handleRecipeClick,
    closeRecipeModal,
    handleAddRecipe,
    closeAddRecipeModal,
  };
};

export default useRecipeUIState;
