import { Comment } from '../../utils/types';

export const commentsAPI = async (): Promise<Comment[]> => {
  const response = await fetch(`http://localhost:8080/comments`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  const data = await response.json();
  return data;
}
