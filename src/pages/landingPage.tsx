import React from 'react'
import Navbar from '../components/landingComponoent/navbar'
import Footer from '../components/landingComponoent/footer'
import Hero from '../components/landingComponoent/hero'

import Analytics from '../components/landingComponoent/analytics'
import NewsLetters from '../components/landingComponoent/newsLetters'
const LandingPage = () => {
  return (
     <div className='bg-[#000300]'>
      <Navbar />
      <Hero />
      <Analytics />
      <NewsLetters />
      <Footer />
    </div>
  )
}

export default LandingPage