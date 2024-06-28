import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { Cuisine, Difficulty, Diet } from "../../utils/types";

interface RecipeModalProps {
  onClose: () => void;
}

const AddRecipeModal: React.FC<RecipeModalProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cuisineId, setCuisineId] = useState("");
  const [dietId, setDietId] = useState("");
  const [difficultyId, setDifficultyId] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const cuisines = useAppSelector((state) => state.cuisines.data);
  const difficulties = useAppSelector((state) => state.difficulties.data);
  const diets = useAppSelector((state) => state.diets.data);

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("cuisineId", cuisineId);
    formData.append("dietId", dietId);
    formData.append("difficultyId", difficultyId);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("http://localhost:8080/recipes", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }

      const newRecipe = await response.json();
      console.log("New recipe added:", newRecipe);
      onClose();
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        id="recipe-modal-content"
        className="bg-white mx-4 my-8 p-6 md:p-10 max-h-full overflow-y-auto"
        style={{ maxWidth: "calc(100vw - 32px)", maxHeight: "calc(100vh - 32px)" }}
      >
        <form className="w-full" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Recipe Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="ingredients"
              className="block text-sm font-medium text-gray-700"
            >
              Ingredients (comma-separated)
            </label>
            <textarea
              id="ingredients"
              className="resize-none mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows={4}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="instructions"
              className="block text-sm font-medium text-gray-700"
            >
              Instructions
            </label>
            <textarea
              id="instructions"
              className="resize-none mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={6}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="cuisineId"
                className="block text-sm font-medium text-gray-700"
              >
                Cuisine Type
              </label>
              <select
                id="cuisineId"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={cuisineId}
                onChange={(e) => setCuisineId(e.target.value)}
                required
              >
                <option value="">-- Select Cuisine --</option>
                {cuisines.map((cuisine) => (
                  <option key={cuisine.id} value={cuisine.id}>
                    {cuisine.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="dietId"
                className="block text-sm font-medium text-gray-700"
              >
                Dietary Preference
              </label>
              <select
                id="dietId"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={dietId}
                onChange={(e) => setDietId(e.target.value)}
                required
              >
                <option value="">-- Select Diet --</option>
                {diets.map((diet) => (
                  <option key={diet.id} value={diet.id}>
                    {diet.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="difficultyId"
                className="block text-sm font-medium text-gray-700"
              >
                Difficulty Level
              </label>
              <select
                id="difficultyId"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={difficultyId}
                onChange={(e) => setDifficultyId(e.target.value)}
                required
              >
                <option value="">-- Select Difficulty --</option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="recipeImage"
              className="block text-sm font-medium text-gray-700"
            >
              Recipe Image
            </label>
            <input
              type="file"
              id="recipeImage"
              accept="image/*"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Recipe
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeModal;
