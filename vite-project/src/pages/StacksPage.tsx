import { useState } from 'react'
import { CreateStackModal } from '../components/CreateStackModal'
import type { Stack } from '@/types';


export function StacksPage() {
  const [stacks, setStacks] = useState<Stack[]>([])

  const handleStackCreate = (stackData: { name: string; description: string }) => {
    const newStack: Stack = {
      id: Date.now().toString(),
      name: stackData.name,
      description: stackData.description,
    }
    setStacks([...stacks, newStack])
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">My Stacks</h2>
        <CreateStackModal onStackCreate={handleStackCreate} />
      </div>
      
      {stacks.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Create New Stack</h3>
            <p className="text-gray-600 mb-6">
              Start building your generative AI apps with our essential tools and frameworks
            </p>
            <CreateStackModal onStackCreate={handleStackCreate} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stacks.map((stack) => (
            <div key={stack.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{stack.name}</h3>
              <p className="text-gray-600 mb-4">{stack.description}</p>
              <div className="flex space-x-2">
                <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                  Edit
                </button>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 