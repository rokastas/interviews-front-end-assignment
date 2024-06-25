import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Recipe, Comment as CommentType } from '../utils/types';

import RatingAverage from './RatingAverage';
import DifficultyIcon from './DifficultyIcon';
import Comment from './Comment';
import AddCommentField from './AddCommentField';

interface RecipeModalProps {
  recipe: Recipe | null;
  comments: CommentType[] | null;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, comments, onClose }) => {
  const [currentComments, setCurrentComments] = useState<CommentType[] | null>(comments);

  useEffect(() => {
    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
      document.body.style.overflow = 'visible';
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById('recipe-modal-content');
      if (modal && !modal.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    disableScroll();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      enableScroll();
    };
  }, [onClose]);

  useEffect(() => {
    setCurrentComments(comments);
  }, [comments]);

  if (!recipe) return null;

  const recipeComments = currentComments?.filter((comment) => comment.recipeId === recipe.id);

  const handleAddComment = (newComment: CommentType) => {
    setCurrentComments((prevComments) => prevComments ? [...prevComments, newComment] : [newComment]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-40 py-20">
      <div id="recipe-modal-content" className="relative flex bg-white min-w-full max-h-full">
        <button onClick={onClose} className="absolute text-4xl top-4 right-7 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <div className="w-full relative">
          <Image
            src={recipe.image ? `http://localhost:8080${recipe.image}` : "/no-image.png"  }
            alt={recipe.name}
            layout="fill"
            objectFit="cover"
            className="max-w-full h-full"
          />
        </div>
        <div className="m-16 relative w-full overflow-auto">
          <h2 className="h-100 font-serif text-7xl pb-6">{recipe.name}</h2>
          <div className="flex flex-row gap-4">
            <DifficultyIcon difficultyId={recipe.difficultyId} />
            <RatingAverage recipe={recipe}/>
          </div>
          <h3 className="pt-16 text-2xl font-serif mb-6">Ingredients</h3>
          <ul className="list-disc pl-5 mb-10">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <h3 className="text-2xl font-serif mb-6">Instructions</h3>
          <p className="mb-10">{recipe.instructions}</p>
          <h3 className="text-2xl font-serif mb-6">Comments</h3>
          <ul className="list-disc">
            {recipeComments?.map((comment) => (
              <Comment key={comment.id} comment={comment}/>
            ))}
          </ul>
          <AddCommentField recipe={recipe} onAddComment={handleAddComment}/>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
