import React from 'react'
import Navbar from './Navbar'
import BottomNavbar from './BottomNavbar'
import Hero from '../Tabs/Hero'

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0f1419]" >
        <Navbar/>
        <Hero/>
        <BottomNavbar/>
    </div>
  )
}

export default Home