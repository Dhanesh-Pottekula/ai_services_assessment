import { configureStore } from '@reduxjs/toolkit';
import stackReducer from './slices/stackSlice';
import configReducer from './slices/configSlice';

export const store = configureStore({
  reducer: {
    stack: stackReducer,
    config: configReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 