export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  cuisineId: string;
  dietId: string;
  difficultyId: string;
  image: string;
}

export interface Cuisine {
  id: string;
  name: string;
}

export interface Difficulty {
  id: string;
  name: string;
}

export interface Diet {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  recipeId: string;
  comment: string;
  rating: number;
  date: string;
}
