import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const TaskView = () => {
  const { id } = useParams()

  const [task, setTask] = useState(null)
  const [timeLeft, setTimeLeft] = useState(30)
  const [canClaim, setCanClaim] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetchTask()
  }, [])

  const fetchTask = async () => {
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single()

    setTask(data)
  }

  // ⏱️ timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanClaim(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // 💰 CLAIM REWARD
  const claimReward = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const { data } = await supabase.auth.getSession()
      const token = data.session.access_token

      const res = await fetch('http://localhost:8000/api/tasks/claim/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          task_id: id
        })
      })

      const result = await res.json()

      if (!res.ok) throw new Error(result.error)

      setMessage("✅ Reward claimed successfully!")

    } catch (err) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const getEmbedUrl = (url) => {
    if (!url) return ''

    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/
    )

    const videoId = match?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  if (!task) return <div className="text-white p-6">Loading...</div>

  return (
    <div className="min-h-screen bg-[#0f1419] text-white p-6">

      <h1 className="text-2xl mb-4">{task.title}</h1>

      {/* VIDEO */}
      <div className="mb-6">
       <iframe
        width="100%"
        height="400"
        src={getEmbedUrl(task.url)}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      </div>

      {/* TIMER */}
      {!canClaim ? (
        <p className="text-yellow-400">
          Watch for {timeLeft} seconds...
        </p>
      ) : (
        <button
          onClick={claimReward}
          disabled={loading}
          className="bg-green-500 px-4 py-2 rounded"
        >
          {loading ? "Claiming..." : "Claim Reward"}
        </button>
      )}

      {message && (
        <p className="mt-4 text-sm">{message}</p>
      )}

    </div>
  )
}

export default TaskView