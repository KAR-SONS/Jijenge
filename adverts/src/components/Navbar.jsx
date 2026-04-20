import React from 'react'
import { Zap } from 'lucide-react'

const Navbar = () => {

  return (
<header className="border-b border-[#2d3748] bg-[#1a1f2e]/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#06b6d4] flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#0f1419]" />
            </div>
            <span className="text-xl font-bold text-[#06b6d4]">Jijenge</span>
          </div>

        </div>
      </div>
    </header>

  )
}

export default Navbar