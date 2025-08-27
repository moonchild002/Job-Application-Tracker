import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import EditJob from './pages/EditJob.jsx'
import Contact from './pages/Contact.jsx'


export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-indigo-50 via-white to-sky-50 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-600"><path d="M8.25 7.5V6.108a3 3 0 0 1 1.286-2.487l.428-.286a3 3 0 0 1 3.072 0l.428.286A3 3 0 0 1 14.75 6.108V7.5m2.25 0V6.108a5.25 5.25 0 0 0-2.25-4.353l-.428-.286a5.25 5.25 0 0 0-5.444 0l-.428.286A5.25 5.25 0 0 0 7 6.108V7.5M3.375 9.75c-.621 0-1.125.504-1.125 1.125v9.75c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-9.75c0-.621-.504-1.125-1.125-1.125H3.375z"/></svg>
            Job Application Tracker
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
            >
              Contact
            </NavLink>
            <a
              className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              href="https://example.com"
              target="_blank"
              rel="noreferrer"
            >
              MERN Demo
            </a>
            <NavLink
              to="/contact"
              className="ml-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm"
            >
              Get in touch
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditJob />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="container py-8 text-center text-sm text-gray-500">
        Built with React + Vite
      </footer>
    </div>
  )
}
