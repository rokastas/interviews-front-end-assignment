import { Recipe, Comment as CommentType } from "../utils/types";
import { useState } from "react";
import RatingSelector from "./rating/RatingSelector";

interface AddCommentFieldProps {
  recipe: Recipe;
  onAddComment: (newComment: CommentType) => void;
}

const AddNewComment: React.FC<AddCommentFieldProps> = ({ recipe, onAddComment }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const commentData = {
      recipeId: recipe.id,
      comment: comment,
      rating: rating,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:8080/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const newComment: CommentType = await response.json();
      onAddComment(newComment);
      setComment("");
      setRating(0);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mt-6">
        New Comment
      </label>
      <textarea
        id="comment"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        required
      />
      <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mt-6">
        Rating
      </label>
      <RatingSelector rating={rating} setRating={setRating} />
      <button
        type="submit"
        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default AddNewComment;
