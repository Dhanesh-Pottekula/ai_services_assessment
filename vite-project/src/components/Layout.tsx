import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CreateStackModal } from './CreateStackModal'

interface LayoutProps {
  children: ReactNode
  onStackCreate?: (stackData: { name: string; description: string }) => void
}

export function Layout({ children, onStackCreate }: LayoutProps) {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'My Stacks' },
    { path: '/templates', label: 'Templates' },
  ]

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
          
          {/* Navigation */}
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  location.pathname === item.path
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {onStackCreate && <CreateStackModal onStackCreate={onStackCreate} />}
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">S</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 bg-white w-full">
        {children}
      </main>
    </div>
  )
} 