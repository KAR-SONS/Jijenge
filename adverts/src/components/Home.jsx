import React from 'react'
import Navbar from './Navbar'
import BottomNavbar from './BottomNavbar'

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0f1419]" >
        <Navbar/>
        <BottomNavbar/>
    </div>
  )
}

export default Home