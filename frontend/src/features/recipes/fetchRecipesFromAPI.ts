import { Recipe } from '../../utils/types';
import fetchData from '../../utils/fetchData';

const fetchRecipesFromAPI = async (
  page: number,
  limit: number,
  query?: string,
  cuisineId?: string,
  difficultyId?: string,
  dietId?: string
): Promise<Recipe[]> => {
  let resource = `recipes?_page=${page}&_limit=${limit}`;
  if (query) resource += `&q=${query}`;
  if (cuisineId) resource += `&cuisineId=${cuisineId}`;
  if (difficultyId) resource += `&difficultyId=${difficultyId}`;
  if (dietId) resource += `&dietId=${dietId}`;

  const recipes = await fetchData<Recipe[]>(resource);
  return recipes;
};

export default fetchRecipesFromAPI;
