import { Play } from 'lucide-react'
import React from 'react'

const Tasks = () => {
  return (
    <div className="min-h-screen bg-[#0f1419] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#e5e7eb] mb-4">Available Tasks</h1>
          <p className="text-[#9ca3af] text-lg mb-8">
            Complete any task to earn points. No limits, no catches—just pure rewards.
          </p>
          </div>

          {/* Task List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             <div className='group p-6 rounded-2xl border transition-all duration-300 cursor-pointer bg-[#1a1f2e] border-[#2d3748]'>
                 <div className='w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors bg-[#06b6d4]/20 text-[#06b6d4]'>
                 <Play />
                 </div>
                 {/* Content */}
                <h3 className="font-semibold text-[#e5e7eb] mb-2 line-clamp-2">
                  Music
                </h3>
                <p className="text-sm text-[#9ca3af] mb-4 line-clamp-2">
                  description
                </p>

                {/* Points and Button */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#06b6d4]/20 text-[#06b6d4] text-sm font-bold">
                    + points
                  </span>
                  <span className="text-xs text-[#9ca3af] capitalize">
                    type
                  </span>
                </div>
                <button className='h-9 px-4 py-2 w-full transition-all rounded-md bg-[#06b6d4] text-[#0f1419] hover:bg-cyan-500'>
                    Run Task
                </button>
             </div>
          </div>
      </div>
    </div>
  )
}

export default Tasks