import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Recipe } from '../../utils/types';
import { recipesAPI } from './recipesAPI';

interface RecipesState {
  data: Recipe[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  hasMore: boolean;
}

const initialState: RecipesState = {
  data: [],
  status: 'idle',
  error: null,
  page: 1,
  hasMore: true,
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async ({ page, limit }: { page: number; limit: number }, { getState }) => {
    const currentState = getState() as { recipes: RecipesState };
    const { data } = currentState.recipes;
    const response = await recipesAPI(page, limit);
    console.log("recipes fetched:", response)
    return {
      recipes: [...data, ...response],
      hasMore: response.length === limit,
    };
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<{ recipes: Recipe[]; hasMore: boolean }>) => {
        state.status = 'succeeded';
        state.data = action.payload.recipes;
        state.hasMore = action.payload.hasMore;
        state.error = null;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch recipes';
      });
  },
});

export default recipesSlice.reducer;
