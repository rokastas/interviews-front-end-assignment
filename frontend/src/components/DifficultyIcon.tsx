import { Difficulty } from "../utils/types";
import { useAppSelector } from "../store/hooks";

const DifficultyIcon = ({ difficultyId }: { difficultyId: Difficulty["id"] }) => {
  const difficulties = useAppSelector((state) => state.difficulties.data);

  const getDifficulty = (difficultyId: Difficulty["id"]) => {
    return difficulties.find((difficulty) => difficulty.id === difficultyId);
  }

  const difficulty = getDifficulty(difficultyId);

  const getDifficultyClass = (difficultyName: string | undefined) => {
    switch (difficultyName) {
      case "Easy":
        return "inline-block py-1 px-4 rounded-full bg-green-500 text-white opacity-75";
      case "Medium":
        return "inline-block py-1 px-4 rounded-full bg-yellow text-white opacity-75";
      case "Hard":
        return "inline-block py-1 px-4 rounded-full bg-red-500 text-white opacity-75";
      default:
        return "inline-block py-1 px-4 rounded-full bg-gray-500 text-white opacity-75";
    }
  };

  return (
    <div className={getDifficultyClass(difficulty?.name)}>
      {difficulty?.name || "Unknown"}
    </div>
  );
};

export default DifficultyIcon;
