import React from 'react'
import woman from '../assets/woman.jpg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            An Application <br />
            that <span className="text-gray-900">help you</span> <br />
            manage your projects
          </h1>

          <p className="mt-6 text-gray-500 max-w-md">
            Data-driven insights for wealth management advisors and executives.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition">
              <Link to="/register">Get Started</Link>
              <span className="text-lg">→</span>
            </button>

            <div className="text-gray-900">
              <p className="font-semibold">$150.00</p>
              <p className="text-sm text-gray-500">per month</p>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-sm text-gray-400 mb-4">
              We provide our services to many worldwide leading companies
            </p>

            <div className="flex items-center gap-6 text-gray-800 font-semibold">
              <span>Headway</span>
              <span>G&amp;STC</span>
              <span>SteadyMD</span>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="relative flex justify-center">

          {/* Main Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={woman}
              alt="Consultant"
              className="w-[320px] md:w-[360px] object-cover"
            />
          </div>

          {/* Floating Card 1 */}
          <div className="absolute top-10 -left-10 bg-white shadow-lg rounded-xl p-4 w-48">
            <p className="text-xs text-gray-400">+25.5%</p>
            <p className="font-semibold text-gray-900 mt-1">
              Increase of the company’s efficiency
            </p>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute bottom-10 -left-6 bg-black text-white rounded-xl px-4 py-3">
            <p className="text-sm font-semibold">9.8</p>
            <p className="text-xs text-gray-300">Overall clients rate</p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Home