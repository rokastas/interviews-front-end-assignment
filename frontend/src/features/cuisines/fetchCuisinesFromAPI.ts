import { Cuisine } from '../../utils/types';
import fetchData from '../../utils/fetchData';

const cuisinesAPI = async (): Promise<Cuisine[]> => {
  const resource = `cuisines`;
  const recipes = await fetchData<Cuisine[]>(resource);
  return recipes;
};

export default cuisinesAPI;
