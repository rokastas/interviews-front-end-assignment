import { Cuisine } from '../../utils/types';
import fetchData from '../../utils/fetchData';

const fetchCuisinesFromAPI = async (): Promise<Cuisine[]> => {
  const resource = `cuisines`;
  const recipes = await fetchData<Cuisine[]>(resource);
  return recipes;
};

export default fetchCuisinesFromAPI;
