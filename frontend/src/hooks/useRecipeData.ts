/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRecipes, resetRecipes } from "../features/recipes/recipesSlice";
import { fetchCuisines } from "../features/cuisines/cuisinesSlice";
import { fetchDifficulties } from "../features/difficulties/difficultiesSlice";
import { fetchDiets } from "../features/diets/dietsSlice";
import { fetchComments } from "../features/comments/commentsSlice";
import { Cuisine, Difficulty, Diet } from "../utils/types";

const PAGELIMIT = 9;

const useRecipeData = (
  searchQuery: string,
  selectedCuisineId: Cuisine["id"],
  selectedDifficultyId: Difficulty["id"],
  selectedDietId: Diet["id"]
) => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state) => state.recipes.data);
  const cuisines = useAppSelector((state) => state.cuisines.data);
  const difficulties = useAppSelector((state) => state.difficulties.data);
  const diets = useAppSelector((state) => state.diets.data);
  const comments = useAppSelector((state) => state.comments.data);
  const hasMore = useAppSelector((state) => state.recipes.hasMore);
  const status = useAppSelector((state) => state.recipes.status);

  const [page, setPage] = useState<number>(1);

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
  }, [searchQuery, selectedCuisineId, selectedDifficultyId, selectedDietId, dispatch]);

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
  }, [status, hasMore, page]);

  return {
    recipes,
    cuisines,
    difficulties,
    diets,
    comments,
    status
  };
};

export default useRecipeData;
