import { useEffect, useState } from "react";
import Image from "next/image";
import { Recipe, Comment as CommentType } from "../../utils/types";

import RatingAverage from "../rating/RatingAverage";
import DifficultyIcon from "../DifficultyIcon";
import Comment from "../Comment";
import AddNewComment from "../AddNewComment";

interface RecipeModalProps {
  recipe: Recipe | null;
  comments: CommentType[] | null;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  comments,
  onClose,
}) => {
  const [currentComments, setCurrentComments] = useState<CommentType[] | null>(
    comments
  );

  useEffect(() => {
    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };

    const enableScroll = () => {
      document.body.style.overflow = "visible";
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById("recipe-modal-content");
      if (modal && !modal.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    disableScroll();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      enableScroll();
    };
  }, [onClose]);

  useEffect(() => {
    setCurrentComments(comments);
  }, [comments]);

  if (!recipe) return null;

  const recipeComments = currentComments?.filter(
    (comment) => comment.recipeId === recipe.id
  );

  const handleAddComment = (newComment: CommentType) => {
    setCurrentComments((prevComments) =>
      prevComments ? [...prevComments, newComment] : [newComment]
    );
  };

  const imageStyle: React.CSSProperties = {
    objectFit: "cover",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4 py-12">
      <div
        id="recipe-modal-content"
        className="relative flex flex-col md:flex-row bg-white w-full max-h-full overflow-hidden md:max-w-7xl"
      >
        <button
          onClick={onClose}
          className="absolute text-4xl top-4 right-7 text-white md:text-black drop-shadow-md hover:text-gray-700 z-10"
        >
          &times;
        </button>
        <div className="relative w-full min-h-64 md:w-2/5 md:h-auto">
          <Image
            src={
              recipe.image
                ? `http://localhost:8080${recipe.image}`
                : "/no-image.png"
            }
            alt={recipe.name}
            style={imageStyle}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            fill
          />
        </div>
        <div className="p-6 bg-white flex flex-col w-full md:w-3/5 overflow-auto md:pl-10">
          <h2 className="font-serif text-4xl md:text-8xl pb-6 md:pt-10 md:pb-14 break-word">
            {recipe.name}
          </h2>
          <div className="flex flex-row gap-4">
            <DifficultyIcon difficultyId={recipe.difficultyId} />
            <RatingAverage recipe={recipe} />
          </div>
          <h3 className="pt-16 text-2xl font-serif mb-6">Ingredients</h3>
          <ul className="list-disc pl-5 mb-10">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3 className="text-2xl font-serif mb-6">Instructions</h3>
          <p className="mb-10">{recipe.instructions}</p>
          <h3 className="text-2xl font-serif mb-6">Comments</h3>
          <ul className="list-disc">
            {recipeComments?.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </ul>
          <AddNewComment recipe={recipe} onAddComment={handleAddComment} />
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
