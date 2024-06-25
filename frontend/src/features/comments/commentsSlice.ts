import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../utils/types';
import { commentsAPI } from './commentsAPI';

interface CommentsState {
  data: Comment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CommentsState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
  const response = await commentsAPI();
  return response;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch comments';
      });
  },
});

export default commentsSlice.reducer;
