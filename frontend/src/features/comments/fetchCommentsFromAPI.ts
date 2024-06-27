import { Comment } from '../../utils/types';
import fetchData from '../../utils/fetchData';

const fetchCommentsFromAPI = async (): Promise<Comment[]> => {
  const resource = `comments`;
  const recipes = await fetchData<Comment[]>(resource);
  return recipes;
};

export default fetchCommentsFromAPI;
