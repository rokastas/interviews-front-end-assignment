import { useState } from "react";
import { Cuisine, Difficulty, Diet } from "../utils/types";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCuisineChange: (cuisineId: Cuisine["id"]) => void;
  cuisines: Cuisine[];
  onDifficultyChange: (difficultyId: Difficulty["id"]) => void;
  difficulties: Difficulty[];
  onDietChange: (dietId: Diet["id"]) => void;
  diets: Diet[];
}

const SearchBar = ({
  onSearch,
  onCuisineChange,
  cuisines,
  onDifficultyChange,
  difficulties,
  onDietChange,
  diets,
}: SearchBarProps) => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value.trim().toLowerCase());
  };

  const handleCuisineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onCuisineChange(value);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onDifficultyChange(value);
  };

  const handleDietChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onDietChange(value);
  };

  return (
    <div className="flex flex-wrap w-full sm:flex-nowrap bg-white p-3 rounded-md md:rounded-full">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="pl-4 w-full sm:w-1/2 py-3 md:py-0 focus:outline-none mb-2 sm:mb-0"
        placeholder="Search recipes..."
      />
      <div className="flex flex-col sm:flex-row w-full sm:w-1/2 space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="relative w-full">
          <select
            id="cuisine-picker"
            onChange={handleCuisineChange}
            className="appearance-none w-full px-3 py-2 bg-white rounded-md focus:outline-none text-gray-500"
          >
            <option value="">All Cuisines</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine.id} value={cuisine.id}>
                {cuisine.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.516 7.548A.997.997 0 1 1 6.93 6.934L10 9.999l3.07-3.065a.997.997 0 1 1 1.414 1.414l-3.999 4a.997.997 0 0 1-1.414 0l-3.999-4z"/></svg>
          </div>
        </div>
        <div className="relative w-full">
          <select
            id="difficulty-picker"
            onChange={handleDifficultyChange}
            className="appearance-none w-full px-3 py-2 bg-white rounded-md focus:outline-none text-gray-500"
          >
            <option value="">All Difficulties</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty.id} value={difficulty.id}>
                {difficulty.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.516 7.548A.997.997 0 1 1 6.93 6.934L10 9.999l3.07-3.065a.997.997 0 1 1 1.414 1.414l-3.999 4a.997.997 0 0 1-1.414 0l-3.999-4z"/></svg>
          </div>
        </div>
        <div className="relative w-full">
          <select
            id="diet-picker"
            onChange={handleDietChange}
            className="appearance-none w-full px-3 py-2 bg-white rounded-md focus:outline-none text-gray-500"
          >
            <option value="">All Diets</option>
            {diets.map((diet) => (
              <option key={diet.id} value={diet.id}>
                {diet.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.516 7.548A.997.997 0 1 1 6.93 6.934L10 9.999l3.07-3.065a.997.997 0 1 1 1.414 1.414l-3.999 4a.997.997 0 0 1-1.414 0l-3.999-4z"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
