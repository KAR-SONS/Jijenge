import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const TaskView = () => {
  const { id } = useParams()
  const API_URL = import.meta.env.VITE_API_URL

  const [task, setTask] = useState(null)
  const [timeLeft, setTimeLeft] = useState(60)
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

      const res = await fetch(`${API_URL}/api/tasks/claim/`, {
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

    if (!videoId) return url

    const params = new URLSearchParams({
      controls: '0',
      modestbranding: '1',
      rel: '0',
      iv_load_policy: '3',
      disablekb: '1'
    })

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
  }

  if (!task) return <div className="text-white p-6">Loading...</div>

  return (
    <div className="min-h-screen bg-[#0f1419] text-white p-6">

      <h1 className="text-2xl mb-4">{task.title}</h1>

      {/* VIDEO */}
      <div className="mb-6 p-2">
       <iframe
        width="100%"
        height="350"
        src={getEmbedUrl(task.url)}
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="rounded-lg border border-[#06b6d4]"
      />
      </div>

      {/* TIMER */}
      {!canClaim ? (
        <p className="text-yellow-400">
          Click the red button to Watch the video for <span className="font-bold text-red-700">60 seconds</span> and claim reward
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