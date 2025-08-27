import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import EditJob from './pages/EditJob.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="container py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">Job Application Tracker</Link>
          <a className="text-sm text-gray-600" href="https://example.com" target="_blank" rel="noreferrer">MERN Demo</a>
        </div>
      </header>
      <main className="container py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditJob />} />
        </Routes>
      </main>
      <footer className="container py-8 text-center text-sm text-gray-500">
        Built with React + Vite
      </footer>
    </div>
  )
}