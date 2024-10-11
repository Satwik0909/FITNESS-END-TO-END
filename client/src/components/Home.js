import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="bg-white">
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/placeholder.svg?height=600&width=1200"
            alt="Gym interior"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Welcome to FitZone Gym</h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">Achieve your fitness goals with our state-of-the-art equipment and expert trainers. Join us today and start your journey to a healthier you.</p>
          <div className="mt-10">
            <Link to="/gym-passes" className="inline-block bg-blue-600 py-3 px-8 rounded-md font-medium text-white hover:bg-blue-500">View Gym Passes</Link>
          </div>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Services</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Everything you need to stay fit</p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  title: 'State-of-the-art Equipment',
                  description: 'Access to a wide range of modern fitness equipment to support your workout routine.'
                },
                {
                  title: 'Expert Trainers',
                  description: 'Our certified trainers are here to guide you and help you achieve your fitness goals.'
                },
                {
                  title: 'Group Classes',
                  description: 'Join our energizing group classes, from yoga to high-intensity interval training.'
                },
                {
                  title: 'Nutrition Guidance',
                  description: 'Get personalized nutrition advice to complement your fitness regimen.'
                }
              ].map((service, index) => (
                <div key={index} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      {/* You can add icons here if needed */}
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{service.title}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{service.description}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}