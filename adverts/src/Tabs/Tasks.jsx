import { Play } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import BottomNavbar from '../components/BottomNavbar'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [completedTasks, setCompletedTasks] = useState([])
  const navigate = useNavigate()
  const [tasksDoneToday, setTasksDoneToday] = useState(0)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('status', 'active')
      .gt('remaining_slots', 0)
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setTasks(data)
    }

    setLoading(false)
  }

  const fetchCompletedTasks = async () => {
    const { data: sessionData } = await supabase.auth.getSession()
    const user = sessionData.session.user

    const { data, error } = await supabase
      .from('task_submissions')
      .select('task_id')
      .eq('user_id', user.id)

    if (!error) {
      setCompletedTasks(data.map(item => item.task_id))
    }
  }

  const fetchTodayCount = async () => {
  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData.session.user

  const today = new Date().toISOString().split('T')[0]

  const { data } = await supabase
    .from('task_submissions')
    .select('id')
    .eq('user_id', user.id)
    .gte('created_at', `${today}T00:00:00`)
    .lte('created_at', `${today}T23:59:59`)

  setTasksDoneToday(data.length)
}

  useEffect(() => {
    fetchTasks()
    fetchCompletedTasks()
    fetchTodayCount()
  }, [])

  return (
    <div className="min-h-screen bg-[#0f1419] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#e5e7eb] mb-4">Available Tasks</h1>
          <p className="text-[#9ca3af] text-lg mb-8">
            Complete any task to earn points. No limits, no catches—just pure rewards.
          </p>
          <p className="text-[#06b6d4] font-semibold">
            Tasks today: {tasksDoneToday} / 5
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-white">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-400">No tasks available</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="group p-6 rounded-2xl border transition-all duration-300 cursor-pointer bg-[#1a1f2e] border-[#2d3748]"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#06b6d4]/20 text-[#06b6d4]">
                  <Play />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#e5e7eb] mb-2 line-clamp-2">
                  {task.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#9ca3af] mb-4 line-clamp-2">
                  {task.instructions || 'No description provided.'}
                </p>

                {/* Points */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#06b6d4]/20 text-[#06b6d4] text-sm font-bold">
                    +{task.reward_points} pts
                  </span>

                  <span className="text-xs text-[#9ca3af] capitalize">
                    {task.task_type}
                  </span>
                </div>

                {/* Slots left (nice UX touch) */}
                <p className="text-s font-semibold text-gray-500 mb-3">
                  {task.remaining_slots} slots left / {task.total_slots} total
                </p>

                <button 
                className="h-9 px-4 py-2 w-full rounded-md bg-[#06b6d4] text-[#0f1419] hover:bg-cyan-500"
                 disabled={
                  tasksDoneToday >= 5 ||
                  task.remaining_slots <= 0 ||
                  completedTasks.includes(task.id)
                }
                onClick={() => navigate(`/task/watch/${task.id}`)}
                >
                 {tasksDoneToday >= 5
                  ? "Daily limit reached"
                  : completedTasks.includes(task.id)
                  ? "Completed"
                  : "Run Task"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tasks