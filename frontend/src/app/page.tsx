/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useRecipeUIState from "../hooks/useRecipeUIState";
import useRecipeData from "../hooks/useRecipeData";
import RecipeList from "../components/recipes/RecipeList";
import SearchBar from "../components/SearchBar";
import RecipeModal from "../components/modals/RecipeModal";
import Button from "../components/Button";
import AddRecipeModal from "../components/modals/AddRecipeModal";

const Home = () => {
  const {
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
  } = useRecipeUIState();

  const {
    recipes,
    cuisines,
    difficulties,
    diets,
    comments,
    status
  } = useRecipeData(searchQuery, selectedCuisineId, selectedDifficultyId, selectedDietId);

  return (
    <div className="m-auto p-8 max-w-7xl">
      <div className="flex flex-row mb-4">
        <SearchBar
          onSearch={handleSearch}
          onCuisineChange={handleCuisineChange}
          onDifficultyChange={handleDifficultyChange}
          onDietChange={handleDietChange}
          cuisines={cuisines}
          difficulties={difficulties}
          diets={diets}
        />
        <Button onClick={handleAddRecipe}>Add Recipe</Button>
      </div>
      <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          comments={comments}
          onClose={closeRecipeModal}
        />
      )}
      {toggleAddRecipeModal && <AddRecipeModal onClose={closeAddRecipeModal} />}
      {status === 'loading' && <p className="w-full flex justify-center align-middle">Loading...</p>}
    </div>
  );
};

export default Home;
