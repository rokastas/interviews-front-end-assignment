import { Comment as CommentType } from '../utils/types';
import Rating from './rating/Rating';

const Comment = ({ comment }: { comment: CommentType }) => {
  return (
    <div className="flex items-center gap-4 pb-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200"></div>
      <div>
        <div>{comment.comment}</div>
        <Rating rating={comment.rating}/>
      </div>
    </div>
  );
}

export default Comment;
