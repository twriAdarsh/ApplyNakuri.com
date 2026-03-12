import React from 'react'
import { OurCompanies } from './OurCompanies'
import { Link } from 'react-router-dom'

export const Hero = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className='relative -mx-4 xl:-mx-24 overflow-hidden'>
        {/* Background Image */}
        <div className='absolute inset-0 -z-10'>
          <img src={require('../../assets/img/banner_1.png')} alt='hero' className='w-full h-full object-cover' />
          <div className='absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent'></div>
        </div>

        <div className='max-w-screen-xl mx-auto px-6 md:px-12 py-20 md:py-32'>
          <div className='max-w-xl'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight'>Find your dream job today!</h1>
            <p className='text-base md:text-lg text-gray-700 mb-8 leading-relaxed'>Explore thousands of job opportunities with all the information you need. Manage your applications and find your dream career on ApplyNaukri.com</p>
            <div className='flex gap-4'>
              <Link to='/all-posted-jobs' className='bg-secondary hover:bg-green-800 transition-colors text-white py-3 px-10 rounded-lg font-semibold shadow-lg'>Browse Jobs</Link>
              <Link to='/signup' className='border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors py-3 px-10 rounded-lg font-semibold'>Sign Up Free</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Partners */}
      <OurCompanies />
    </div>
  )
}
