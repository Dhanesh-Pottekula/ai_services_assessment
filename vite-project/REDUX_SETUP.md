# Redux Setup Documentation

This project has been configured with Redux Toolkit for state management. Here's what has been set up:

## Dependencies Installed

- `@reduxjs/toolkit` - Redux Toolkit for simplified Redux development
- `react-redux` - React bindings for Redux
- `axios` - HTTP client for API calls

## File Structure

```
src/
├── store/
│   ├── index.ts          # Main store configuration
│   ├── hooks.ts          # Typed Redux hooks
│   └── slices/
│       └── stackSlice.ts # Stack management slice
├── services/
│   └── api.ts           # Centralized API configuration
└── components/
    ├── CreateStackModal.tsx # Updated to use Redux
    └── StackList.tsx        # New component to display stacks
```

## Redux Store Configuration

### Store Setup (`src/store/index.ts`)
- Configured with Redux Toolkit's `configureStore`
- Includes stack reducer
- Exports typed `RootState` and `AppDispatch`

### Typed Hooks (`src/store/hooks.ts`)
- `useAppDispatch` - Typed dispatch hook
- `useAppSelector` - Typed selector hook

## Stack Slice (`src/store/slices/stackSlice.ts`)

### State Interface
```typescript
interface StackState {
  stacks: Stack[];
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  createError: string | null;
}
```

### Actions
- `createStack` - Async thunk for creating a new stack
- `fetchStacks` - Async thunk for fetching all stacks
- `clearErrors` - Clear all errors
- `clearCreateError` - Clear create error only

### Selectors
- `selectStacks` - Get all stacks
- `selectStackLoading` - Get loading state for fetch
- `selectStackError` - Get error state for fetch
- `selectCreateStackLoading` - Get loading state for create
- `selectCreateStackError` - Get error state for create

## API Service (`src/services/api.ts`)

Centralized axios configuration with:
- Base URL configuration
- Request interceptors for auth tokens
- Response interceptors for error handling
- Timeout configuration

## Usage Examples

### In Components
```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createStack, selectStacks } from '@/store/slices/stackSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const stacks = useAppSelector(selectStacks);

  const handleCreate = async () => {
    const result = await dispatch(createStack({ name: 'Test', description: 'Test desc' }));
    if (createStack.fulfilled.match(result)) {
      // Success
    }
  };
}
```

## API Endpoints

The Redux actions are configured to work with these endpoints:
- `POST /api/stacks` - Create a new stack
- `GET /api/stacks` - Fetch all stacks

## Environment Configuration

Create a `.env` file in the project root:
```
VITE_API_BASE_URL=http://localhost:3000
```

## Next Steps

1. Replace the API endpoints in `stackSlice.ts` with your actual backend URLs
2. Add authentication if required
3. Add more slices for other features
4. Consider adding Redux Persist for state persistence 