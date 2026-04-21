import React,{useState} from 'react'
import Navbar from './Navbar'
import BottomNavbar from './BottomNavbar'
import Hero from '../Tabs/Hero'
import Tasks from '../Tabs/Tasks'
import Dashboard from '../Tabs/Dashboard'
import ProtectedRoute from './ProtectedRoute'

const Home = () => {
   const [activeTab, setActiveTab] = useState('home')
   
  return (
    <div className="min-h-screen bg-[#0f1419]" >
        <Navbar />
        <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 pb-16">
          {activeTab === 'home' && <Hero />}
          <ProtectedRoute>
          {activeTab === 'tasks' && <Tasks/>}
          {activeTab === 'dashboard' && <Dashboard/>}
          </ProtectedRoute>
      </main>
    </div>
  )
}

export default Home