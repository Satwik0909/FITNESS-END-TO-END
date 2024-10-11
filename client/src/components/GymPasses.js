import axios from 'axios';
import React, { useEffect, useState } from 'react';

function GymPasses() {
  const [gymPasses, setGymPasses] = useState([]);

  useEffect(() => {
    const fetchGymPasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gym-passes');
        setGymPasses(response.data);
      } catch (error) {
        console.error('Error fetching gym passes:', error);
      }
    };

    fetchGymPasses();
  }, []);

  return (
    <div>
      <h2>Gym Passes</h2>
      <ul>
        {gymPasses.map((pass) => (
          <li key={pass._id}>
            {pass.name} - ${pass.price} ({pass.duration})
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from 'react';
  const [gymPasses, setGymPasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGymPasses = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:5000/api/gym-passes')
        setGymPasses(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching gym passes:', error)
        setError('Failed to fetch gym passes. Please try again later.')
        setLoading(false)
      }
    }

    fetchGymPasses()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Choose the right plan for you
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
            {gymPasses.map((pass) => (
              <div key={pass._id} className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{pass.name}</h3>
                  <p className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-5xl font-extrabold tracking-tight">${pass.price}</span>
                    <span className="ml-1 text-xl font-semibold">/{pass.duration}</span>
                  </p>
                  <p className="mt-6 text-gray-500">The perfect plan if you're just getting started with our gym.</p>
                </div>
                <button
                  className="mt-8 block w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 text-center font-medium text-white hover:bg-blue-700"
                >
                  Buy {pass.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
S
export default GymPasses;