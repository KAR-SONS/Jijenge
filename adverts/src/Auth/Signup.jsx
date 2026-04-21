import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. Sign up user
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            data: {
            name: formData.name,
            phone: formData.phone
            }
        }
        })

      if (error) throw error

      alert('Signup successful!')
      navigate('/login')

    } catch (err) {
      console.error(err)
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1419] py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h3 className="text-4xl text-white mb-4">Welcome to Jijenge</h3>

        <div className="bg-[#1a1f2e] p-8 rounded-2xl">
          <h1 className="text-3xl text-white mb-8">Sign Up</h1>

          <form onSubmit={handleSignup}>
            <input
              id="name"
              placeholder="Name"
              onChange={handleChange}
              className="text-white font-semibold w-full mb-4 p-3 bg-[#2d3748] rounded-md"
            />

            <input
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="text-white font-semibold w-full mb-4 p-3 bg-[#2d3748] rounded-md"
            />

            <div className="relative mb-4">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                onChange={handleChange}
                className="text-white font-semibold w-full p-3 bg-[#2d3748] rounded-md pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <input
              id="phone"
              placeholder="Phone (M-pesa number)"
              onChange={handleChange}
              className="text-white font-semibold w-full mb-6 p-3 bg-[#2d3748] rounded-md"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan-500 text-white rounded"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
             <div className="mt-4 text-center">
            <a href="/login" className="text-cyan-500 hover:underline">
              Already have an account? Login
            </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup