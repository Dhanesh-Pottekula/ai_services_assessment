import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchStacks, selectStacks, selectStackLoading, selectStackError } from '@/store/slices/stackSlice';

export function StackList() {
  const dispatch = useAppDispatch();
  const stacks = useAppSelector(selectStacks);
  const loading = useAppSelector(selectStackLoading);
  const error = useAppSelector(selectStackError);

  useEffect(() => {
    dispatch(fetchStacks());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading stacks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (stacks.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-500">No stacks found. Create your first stack!</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Stacks</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stacks.map((stack) => (
          <div
            key={stack.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">{stack.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{stack.description}</p>
            {stack.createdAt && (
              <p className="text-xs text-gray-400">
                Created: {new Date(stack.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 