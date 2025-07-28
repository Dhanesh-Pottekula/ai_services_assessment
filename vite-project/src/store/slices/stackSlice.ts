import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';

// Types
export interface Stack {
  id?: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStackRequest {
  name: string;
  description: string;
}

export interface StackState {
  stacks: Stack[];
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  createError: string | null;
}

// Initial state
const initialState: StackState = {
  stacks: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
};

// Async thunk for creating a stack
export const createStack = createAsyncThunk(
  'stack/createStack',
  async (stackData: CreateStackRequest, { rejectWithValue }) => {
    try {
      // Replace with your actual API endpoint
      const response = await api.post('/api/stacks', stackData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create stack'
      );
    }
  }
);

// Async thunk for fetching stacks
export const fetchStacks = createAsyncThunk(
  'stack/fetchStacks',
  async (_, { rejectWithValue }) => {
    try {
      // Replace with your actual API endpoint
      const response = await api.get('/api/stacks');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch stacks'
      );
    }
  }
);

// Stack slice
const stackSlice = createSlice({
  name: 'stack',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.createError = null;
    },
    clearCreateError: (state) => {
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    // Create stack cases
    builder
      .addCase(createStack.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createStack.fulfilled, (state, action: PayloadAction<Stack>) => {
        state.createLoading = false;
        state.stacks.push(action.payload);
        state.createError = null;
      })
      .addCase(createStack.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload as string;
      });

    // Fetch stacks cases
    builder
      .addCase(fetchStacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStacks.fulfilled, (state, action: PayloadAction<Stack[]>) => {
        state.loading = false;
        state.stacks = action.payload;
        state.error = null;
      })
      .addCase(fetchStacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearErrors, clearCreateError } = stackSlice.actions;

// Export selectors
export const selectStacks = (state: { stack: StackState }) => state.stack.stacks;
export const selectStackLoading = (state: { stack: StackState }) => state.stack.loading;
export const selectStackError = (state: { stack: StackState }) => state.stack.error;
export const selectCreateStackLoading = (state: { stack: StackState }) => state.stack.createLoading;
export const selectCreateStackError = (state: { stack: StackState }) => state.stack.createError;

// Export reducer
export default stackSlice.reducer; 