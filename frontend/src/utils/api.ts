const BASE_URL = 'http://localhost:8080';

export const fetchRecipes = async () => {
  const response = await fetch(`${BASE_URL}/recipes`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  const data = await response.json();
  return data;
}