export interface Stack {
  id: string
  name: string
  description: string
  createdAt?: string
  updatedAt?: string
}

export interface Template {
  id: string
  name: string
  description: string
  category: string
  rating: number
  downloads: number
  tags: string[]
  imageUrl?: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Settings {
  notifications: boolean
  emailUpdates: boolean
  darkMode: boolean
  autoSave: boolean
  theme: 'light' | 'dark' | 'auto'
} 