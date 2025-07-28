import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { StacksPage } from './pages/StacksPage'
import { TemplatesPage } from './pages/TemplatesPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<StacksPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
