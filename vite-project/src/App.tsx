import { useState } from 'react'
import { CreateStackModal } from './components/CreateStackModal'
import './App.css'

interface Stack {
  id: string
  name: string
  description: string
}

function App() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">ai</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">GenAI Stack</h1>
          </div>
          <div className="flex items-center space-x-4">
            <CreateStackModal onStackCreate={handleStackCreate} />
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">S</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">My Stacks</h2>
        
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
              <div key={stack.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{stack.name}</h3>
                <p className="text-gray-600">{stack.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
