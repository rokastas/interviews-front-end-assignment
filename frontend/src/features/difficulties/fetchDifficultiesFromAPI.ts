import { Difficulty } from '../../utils/types';
import fetchData from '../../utils/fetchData';

const fetchDifficultiesFromAPI = async (): Promise<Difficulty[]> => {
  const resource = `difficulties`;
  const recipes = await fetchData<Difficulty[]>(resource);
  return recipes;
};

export default fetchDifficultiesFromAPI;
