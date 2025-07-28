import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';

// LLM Types
export interface LLMDetails {
  id?: string;
  name: string;
  model: string;
  provider: string;
  apiKey?: string;
  baseUrl?: string;
  temperature: number;
  maxTokens: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateLLMRequest {
  name?: string;
  model?: string;
  provider?: string;
  apiKey?: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
}

// Knowledge Base Types
export interface KnowledgeBaseDetails {
  id?: string;
  name: string;
  description: string;
  type: 'vector' | 'document' | 'database';
  source: string;
  connectionString?: string;
  apiKey?: string;
  indexName?: string;
  embeddingModel?: string;
  chunkSize: number;
  chunkOverlap: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateKnowledgeBaseRequest {
  name?: string;
  description?: string;
  type?: 'vector' | 'document' | 'database';
  source?: string;
  connectionString?: string;
  apiKey?: string;
  indexName?: string;
  embeddingModel?: string;
  chunkSize?: number;
  chunkOverlap?: number;
}

// Combined State
export interface ConfigState {
  // LLM State
  llmDetails: LLMDetails | null;
  llmLoading: boolean;
  llmError: string | null;
  llmUpdateLoading: boolean;
  llmUpdateError: string | null;
  
  // Knowledge Base State
  knowledgeBaseDetails: KnowledgeBaseDetails | null;
  knowledgeBaseLoading: boolean;
  knowledgeBaseError: string | null;
  knowledgeBaseUpdateLoading: boolean;
  knowledgeBaseUpdateError: string | null;
}

// Initial state
const initialState: ConfigState = {
  // LLM State
  llmDetails: null,
  llmLoading: false,
  llmError: null,
  llmUpdateLoading: false,
  llmUpdateError: null,
  
  // Knowledge Base State
  knowledgeBaseDetails: null,
  knowledgeBaseLoading: false,
  knowledgeBaseError: null,
  knowledgeBaseUpdateLoading: false,
  knowledgeBaseUpdateError: null,
};

// LLM Async thunks
export const fetchStackDetails = createAsyncThunk(
  'config/fetchStackDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/stack/details');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch Stack details'
      );
    }
  }
);

export const updateLLMDetails = createAsyncThunk(
  'config/updateLLMDetails',
  async (llmData: UpdateLLMRequest, { rejectWithValue }) => {
    try {
      const response = await api.put('/api/llm/details', llmData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update LLM details'
      );
    }
  }
);


export const updateKnowledgeBaseDetails = createAsyncThunk(
  'config/updateKnowledgeBaseDetails',
  async (kbData: UpdateKnowledgeBaseRequest, { rejectWithValue }) => {
    try {
      const response = await api.put('/api/knowledge-base/details', kbData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update Knowledge Base details'
      );
    }
  }
);

// Combined Config slice
const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    clearLLMErrors: (state) => {
      state.llmError = null;
      state.llmUpdateError = null;
    },
    clearLLMUpdateError: (state) => {
      state.llmUpdateError = null;
    },
    clearKnowledgeBaseErrors: (state) => {
      state.knowledgeBaseError = null;
      state.knowledgeBaseUpdateError = null;
    },
    clearKnowledgeBaseUpdateError: (state) => {
      state.knowledgeBaseUpdateError = null;
    },
    clearAllErrors: (state) => {
      state.llmError = null;
      state.llmUpdateError = null;
      state.knowledgeBaseError = null;
      state.knowledgeBaseUpdateError = null;
    },
  },
  extraReducers: (builder) => {
    // LLM cases
    builder
      .addCase(fetchStackDetails.pending, (state) => {
        state.llmLoading = true;
        state.llmError = null;
      })
      .addCase(fetchStackDetails.fulfilled, (state, action: PayloadAction<LLMDetails>) => {
        state.llmLoading = false;
        state.llmDetails = action.payload;
        state.llmError = null;
      })
      .addCase(fetchStackDetails.rejected, (state, action) => {
        state.llmLoading = false;
        state.llmError = action.payload as string;
      })
      .addCase(updateLLMDetails.pending, (state) => {
        state.llmUpdateLoading = true;
        state.llmUpdateError = null;
      })
      .addCase(updateLLMDetails.fulfilled, (state, action: PayloadAction<LLMDetails>) => {
        state.llmUpdateLoading = false;
        state.llmDetails = action.payload;
        state.llmUpdateError = null;
      })
      .addCase(updateLLMDetails.rejected, (state, action) => {
        state.llmUpdateLoading = false;
        state.llmUpdateError = action.payload as string;
      });
builder
      .addCase(updateKnowledgeBaseDetails.pending, (state) => {
        state.knowledgeBaseUpdateLoading = true;
        state.knowledgeBaseUpdateError = null;
      })
      .addCase(updateKnowledgeBaseDetails.fulfilled, (state, action: PayloadAction<KnowledgeBaseDetails>) => {
        state.knowledgeBaseUpdateLoading = false;
        state.knowledgeBaseDetails = action.payload;
        state.knowledgeBaseUpdateError = null;
      })
      .addCase(updateKnowledgeBaseDetails.rejected, (state, action) => {
        state.knowledgeBaseUpdateLoading = false;
        state.knowledgeBaseUpdateError = action.payload as string;
      });
  },
});

// Export actions
export const { 
  clearLLMErrors, 
  clearLLMUpdateError, 
  clearKnowledgeBaseErrors, 
  clearKnowledgeBaseUpdateError,
  clearAllErrors 
} = configSlice.actions;

// Export LLM selectors
export const selectLLMDetails = (state: { config: ConfigState }) => state.config.llmDetails;
export const selectLLMLoading = (state: { config: ConfigState }) => state.config.llmLoading;
export const selectLLMError = (state: { config: ConfigState }) => state.config.llmError;
export const selectUpdateLLMLoading = (state: { config: ConfigState }) => state.config.llmUpdateLoading;
export const selectUpdateLLMError = (state: { config: ConfigState }) => state.config.llmUpdateError;

// Export Knowledge Base selectors
export const selectKnowledgeBaseDetails = (state: { config: ConfigState }) => state.config.knowledgeBaseDetails;
export const selectKnowledgeBaseLoading = (state: { config: ConfigState }) => state.config.knowledgeBaseLoading;
export const selectKnowledgeBaseError = (state: { config: ConfigState }) => state.config.knowledgeBaseError;
export const selectUpdateKnowledgeBaseLoading = (state: { config: ConfigState }) => state.config.knowledgeBaseUpdateLoading;
export const selectUpdateKnowledgeBaseError = (state: { config: ConfigState }) => state.config.knowledgeBaseUpdateError;

// Export reducer
export default configSlice.reducer; 