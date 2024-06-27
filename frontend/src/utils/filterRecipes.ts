// import { Recipe, Cuisine, Difficulty, Diet } from "./types";

// export const filterRecipes = (
//   recipes: Recipe[],
//   query: string,
//   cuisineId: Cuisine["id"],
//   difficultyId: Difficulty["id"],
//   dietId: Diet["id"]
// ): Recipe[] => {
//   if (!recipes) return [];

//   return recipes.filter((recipe) => {
//     const matchesQuery =
//       recipe.name.toLowerCase().includes(query.toLowerCase()) ||
//       recipe.ingredients.some((ingredient) =>
//         ingredient.toLowerCase().includes(query.toLowerCase())
//       ) ||
//       recipe.instructions.toLowerCase().includes(query.toLowerCase());
//     const matchesCuisine = cuisineId === "" || recipe.cuisineId === cuisineId;
//     const matchesDifficulty =
//       difficultyId === "" || recipe.difficultyId === difficultyId;
//     const matchesDiet = dietId === "" || recipe.dietId === dietId;

//     return matchesQuery && matchesCuisine && matchesDifficulty && matchesDiet;
//   });
// };
