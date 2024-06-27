/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Recipe, Cuisine, Difficulty, Diet } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRecipes, resetRecipes } from "../features/recipes/recipesSlice";
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
  const status = useAppSelector((state) => state.recipes.status);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCuisineId, setSelectedCuisineId] = useState<Cuisine["id"]>("");
  const [selectedDifficultyId, setSelectedDifficultyId] = useState<Difficulty["id"]>("");
  const [selectedDietId, setSelectedDietId] = useState<Diet["id"]>("");
  const [toggleAddRecipeModal, setToggleAddRecipeModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const PAGELIMIT = 9;

  useEffect(() => {
    dispatch(fetchDiets());
    dispatch(fetchDifficulties());
    dispatch(fetchCuisines());
    dispatch(fetchComments());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery || selectedCuisineId || selectedDifficultyId || selectedDietId) {
      fetchFilteredRecipes(true);
    } else {
      dispatch(fetchRecipes({ page: 1, limit: PAGELIMIT }));
      setPage(1);
    }
  }, [searchQuery, selectedCuisineId, selectedDifficultyId, selectedDietId]);

  const fetchFilteredRecipes = (resetPage: boolean = false) => {
    const newPage = resetPage ? 1 : page + 1;
    dispatch(fetchRecipes({
      page: newPage,
      limit: PAGELIMIT,
      query: searchQuery,
      cuisineId: selectedCuisineId,
      difficultyId: selectedDifficultyId,
      dietId: selectedDietId,
    }));
    if (resetPage) {
      setPage(1);
    } else {
      setPage(newPage);
    }
  };

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
    if (hasMore) {
      fetchFilteredRecipes();
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      status !== 'loading' &&
      hasMore
    ) {
      fetchFilteredRecipes();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [status, hasMore]);

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
