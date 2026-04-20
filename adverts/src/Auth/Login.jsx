import React,{useState} from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    navigate('/') // redirect after login
  }

  return (
   <div className="min-h-screen bg-[#0f1419] py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
         <h3 className="text-4xl font-semibold text-[#e5e7eb] mb-4">Welcome Back</h3>
        <div className="bg-[#1a1f2e] border border-[#2d3748] rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-[#e5e7eb] mb-6">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-[#9ca3af] mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                className="bg-[#2d3748] w-full p-3 rounded-md text-[#e5e7eb] placeholder:text-[#9ca3af] border border-[#2d3748] focus:ring-[#06b6d4] focus:border-[#06b6d4]"
                placeholder="you@example.com"
              />
            </div>
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
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-br from-[#06b6d4] to-[#0ea5e9] text-white rounded-lg font-semibold hover:from-[#0ea5e9] hover:to-[#06b6d4] transition-colors"
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="mt-4 text-center">
              <a href="/signup" className="text-[#06b6d4] hover:text-[#0ea5e9] transition-colors">
                Don't have an account? Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login