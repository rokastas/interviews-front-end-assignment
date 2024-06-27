import { Diet } from '../../utils/types';
import fetchData from '../../utils/fetchData';

const fetchDietsFromAPI = async (): Promise<Diet[]> => {
  const resource = `diets`;
  const recipes = await fetchData<Diet[]>(resource);
  return recipes;
};

export default fetchDietsFromAPI;
