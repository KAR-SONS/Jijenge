import React from 'react'
import { Home, List, LayoutDashboard } from 'lucide-react'

const BottomNavbar = ({ activeTab, setActiveTab }) => {
    const NavButton = ({ label, Icon, active, onClick }) => (
        <button
          className={`flex flex-col items-center justify-center gap-1 ${
            active ? 'text-[#06b6d4]' : 'text-[#9ca3af]'
          }`}
          onClick={onClick}
        >
          <Icon size={24} className={active ? 'text-[#06b6d4]' : 'text-[#9ca3af]'} />
          <span>{label}</span>
        </button>
      )
  return (
     <div className="fixed bottom-0 left-0 right-0 bg-[#1a1f2e] border-t border-[#2d3748] z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        
        <NavButton
          label="Home"
          Icon={Home}
          active={activeTab === 'home'}
          onClick={() => setActiveTab('home')}
        />
        
        <NavButton
          label="Tasks"
          Icon={List}
          active={activeTab === 'tasks'}
          onClick={() => setActiveTab('tasks')}
        />

        <NavButton
          label="Dashboard"
          Icon={LayoutDashboard}
          active={activeTab === 'dashboard'}
          onClick={() => setActiveTab('dashboard')}
        />

      </div>
    </div>
  )
}

export default BottomNavbar