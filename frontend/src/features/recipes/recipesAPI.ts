import { Recipe } from '../../utils/types';

export const recipesAPI = async (page: number, limit: number): Promise<Recipe[]> => {
  const response = await fetch(`http://localhost:8080/recipes?_page=${page}&_limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  const data: Recipe[] = await response.json();
  return data;
};
