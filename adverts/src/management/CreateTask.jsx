import { useState } from 'react'
import { supabase } from '../lib/supabase'

const CreateTask = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    reward_points: '',
    total_slots: '',
    task_type: 'youtube',
    proof_type: 'text',
    url: '',
    instructions: ''
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // 🔐 Get Supabase token
      const { data } = await supabase.auth.getSession()
      const token = data.session.access_token

      const res = await fetch('https://jijenge-server-production.up.railway.app/api/tasks/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          reward_points: Number(form.reward_points),
          total_slots: Number(form.total_slots)
        })
      })

      const result = await res.json()

      if (!res.ok) throw new Error(result.error || 'Error creating task')

      setMessage('✅ Task created successfully')

      // reset form
      setForm({
        title: '',
        description: '',
        reward_points: '',
        total_slots: '',
        task_type: 'youtube',
        proof_type: 'text',
        url: '',
        instructions: ''
      })

    } catch (err) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1419] p-6 text-white">
      <div className="max-w-2xl mx-auto bg-[#1a1f2e] p-6 rounded-xl">

        <h2 className="text-2xl mb-6">Create Task</h2>

        {message && (
          <div className="mb-4 text-sm">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            placeholder="Task Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 bg-[#2d3748]"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 bg-[#2d3748]"
          />

          <input
            name="url"
            placeholder="Task URL (YouTube etc)"
            value={form.url}
            onChange={handleChange}
            className="w-full p-3 bg-[#2d3748]"
          />

          <textarea
            name="instructions"
            placeholder="Instructions"
            value={form.instructions}
            onChange={handleChange}
            className="w-full p-3 bg-[#2d3748]"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="reward_points"
              type="number"
              placeholder="Reward Points"
              value={form.reward_points}
              onChange={handleChange}
              className="p-3 bg-[#2d3748]"
              required
            />

            <input
              name="total_slots"
              type="number"
              placeholder="Total Slots"
              value={form.total_slots}
              onChange={handleChange}
              className="p-3 bg-[#2d3748]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="task_type"
              value={form.task_type}
              onChange={handleChange}
              className="p-3 bg-[#2d3748]"
            >
              <option value="youtube">YouTube</option>
              <option value="signup">Signup</option>
              <option value="download">Download</option>
            </select>

            <select
              name="proof_type"
              value={form.proof_type}
              onChange={handleChange}
              className="p-3 bg-[#2d3748]"
            >
              <option value="text">Text</option>
              <option value="screenshot">Screenshot</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-cyan-500 rounded"
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default CreateTask