import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Template } from '@/types'

export function TemplatesPage() {
  const navigate = useNavigate();
  const [templates] = useState<Template[]>([
    {
      id: '1',
      name: 'ChatGPT Clone',
      description: 'A complete chat application with OpenAI integration, real-time messaging, and user authentication.',
      category: 'Chat',
      rating: 4.8,
      downloads: 1250,
      tags: ['OpenAI', 'React', 'Node.js', 'Socket.io']
    },
    {
      id: '2',
      name: 'Image Generator',
      description: 'AI-powered image generation app using DALL-E or Stable Diffusion with image editing capabilities.',
      category: 'Image',
      rating: 4.6,
      downloads: 890,
      tags: ['DALL-E', 'Python', 'Flask', 'React']
    },
    {
      id: '3',
      name: 'Code Assistant',
      description: 'Intelligent code completion and debugging tool with GitHub integration and IDE plugins.',
      category: 'Development',
      rating: 4.9,
      downloads: 2100,
      tags: ['GitHub', 'VSCode', 'TypeScript', 'OpenAI']
    },
    {
      id: '4',
      name: 'Content Writer',
      description: 'AI-powered content creation tool with SEO optimization and multiple content formats.',
      category: 'Content',
      rating: 4.5,
      downloads: 750,
      tags: ['SEO', 'WordPress', 'Python', 'GPT-4']
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', 'Chat', 'Image', 'Development', 'Content']

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Stack Templates</h2>
        <p className="text-gray-600 mb-6">
          Choose from our curated collection of pre-built AI application templates
        </p>
        
        {/* Category Filter */}
        <div className="flex space-x-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium text-sm capitalize ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{template.description}</p>
            
            <div className="mt-auto">
              <button 
                onClick={() => navigate('/flow-editor')}
                className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium py-2 px-4 border border-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Edit Stack
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 