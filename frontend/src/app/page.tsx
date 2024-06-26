/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Recipe, Cuisine, Difficulty, Diet } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRecipes } from "../features/recipes/recipesSlice";
import { fetchCuisines } from "../features/cuisines/cuisinesSlice";
import { fetchDifficulties } from "../features/difficulties/difficultiesSlice";
import { fetchDiets } from "../features/diets/dietsSlice";
import { fetchComments } from "../features/comments/commentsSlice";
import RecipeList from "../components/RecipeList";
import SearchBar from "../components/SearchBar";
import RecipeModal from "../components/RecipeModal";
import Button from "../components/Button";
import AddRecipeModal from "../components/AddRecipeModal";

const Home = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state) => state.recipes.data);
  const cuisines = useAppSelector((state) => state.cuisines.data);
  const difficulties = useAppSelector((state) => state.difficulties.data);
  const diets = useAppSelector((state) => state.diets.data);
  const comments = useAppSelector((state) => state.comments.data);
  const hasMore = useAppSelector((state) => state.recipes.hasMore);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCuisineId, setSelectedCuisineId] = useState<Cuisine["id"]>("");
  const [selectedDifficultyId, setSelectedDifficultyId] = useState<Difficulty["id"]>("");
  const [selectedDietId, setSelectedDietId] = useState<Diet["id"]>("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [toggleAddRecipeModal, setToggleAddRecipeModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const PAGELIMIT = 9;

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes({ page: 0, limit: PAGELIMIT }));
      dispatch(fetchDiets());
      dispatch(fetchDifficulties());
      dispatch(fetchCuisines());
      dispatch(fetchComments());
    }
  }, [dispatch, recipes.length]);

  useEffect(() => {
    filterRecipes(
      searchQuery,
      selectedCuisineId,
      selectedDifficultyId,
      selectedDietId
    );
  }, [searchQuery, selectedCuisineId, selectedDifficultyId, selectedDietId, recipes]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterRecipes(
      query,
      selectedCuisineId,
      selectedDifficultyId,
      selectedDietId
    );
  };

  const handleCuisineChange = (cuisineId: Cuisine["id"]) => {
    setSelectedCuisineId(cuisineId);
    filterRecipes(searchQuery, cuisineId, selectedDifficultyId, selectedDietId);
  };

  const handleDifficultyChange = (difficultyId: Difficulty["id"]) => {
    setSelectedDifficultyId(difficultyId);
    filterRecipes(searchQuery, selectedCuisineId, difficultyId, selectedDietId);
  };

  const handleDietChange = (dietId: Diet["id"]) => {
    setSelectedDietId(dietId);
    filterRecipes(searchQuery, selectedCuisineId, selectedDifficultyId, dietId);
  };

  const filterRecipes = (
    query: string,
    cuisineId: Cuisine["id"],
    difficultyId: Difficulty["id"],
    dietId: Diet["id"]
  ) => {
    if (!recipes) return;

    const filtered = recipes.filter((recipe) => {
      const matchesQuery =
        recipe.name.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(query.toLowerCase())
        ) ||
        recipe.instructions.toLowerCase().includes(query.toLowerCase());
      const matchesCuisine = cuisineId === "" || recipe.cuisineId === cuisineId;
      const matchesDifficulty =
        difficultyId === "" || recipe.difficultyId === difficultyId;
      const matchesDiet = dietId === "" || recipe.dietId === dietId;

      return matchesQuery && matchesCuisine && matchesDifficulty && matchesDiet;
    });

    setFilteredRecipes(filtered);
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
    if (hasMore) {
      dispatch(fetchRecipes({ page: page + 1, limit: PAGELIMIT }));
      setPage(page + 1);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= (document.body.offsetHeight - 500) &&
      !loading &&
      !error &&
      hasMore
    ) {
      setLoading(true);
      dispatch(fetchRecipes({ page: page + 1, limit: PAGELIMIT })).then(() => {
        setLoading(false);
        setPage(page + 1);
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, error, hasMore]);

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
      <RecipeList recipes={filteredRecipes} onRecipeClick={handleRecipeClick} />
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} comments={comments} onClose={closeRecipeModal} />
      )}
      {toggleAddRecipeModal && (
        <AddRecipeModal onClose={closeAddRecipeModal} />
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Home;
