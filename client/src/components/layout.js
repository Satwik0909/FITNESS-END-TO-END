import React from 'react'
import { Link } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <span className="font-bold text-xl">FitZone Gym</span>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">Home</Link>
                  <Link to="/gym-passes" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">Gym Passes</Link>
                  <Link to="/classes" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">Classes</Link>
                  <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500">Contact</Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">FitZone Gym</h3>
              <p className="text-sm">Stay fit, stay healthy</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">Facebook</a>
              <a href="#" className="hover:text-blue-400">Twitter</a>
              <a href="#" className="hover:text-blue-400">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}