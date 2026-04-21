import React,{useState,useEffect} from 'react'
import { Award, Target, TrendingUp,DollarSign } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'



const Dashboard = () => {
   const { user } = useAuth()
   const API_URL = import.meta.env.VITE_API_URL

  const [profile, setProfile] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    rejected: 0
  })

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    // 1. Fetch user profile
    const { data: profileData } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    setProfile(profileData)

    // 2. Fetch transactions
    const { data: txData } = await supabase
      .from('points_transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)

    setTransactions(txData || [])

    // 3. Fetch submissions stats
    const { data: submissions } = await supabase
      .from('task_submissions')
      .select('status')
      .eq('user_id', user.id)

    const completed = submissions.filter(s => s.status === 'approved').length
    const pending = submissions.filter(s => s.status === 'pending').length
    const rejected = submissions.filter(s => s.status === 'rejected').length

    setStats({ completed, pending, rejected })
  }
  const balance = profile?.points_balance * 0.3 // Assuming 1 point = Kes 0.3

  const handleWithdraw = async () => {
  try {
    // get current user
    const { data: sessionData } = await supabase.auth.getSession()
    const user = sessionData.session.user

    // get user points
    const { data: userData } = await supabase
      .from('users')
      .select('points_balance')
      .eq('id', user.id)
      .single()

    if (userData.points_balance < 500) {
      alert("❌ Not enough points to withdraw")
      return
    }

    // send request to backend
    const token = sessionData.session.access_token

    const res = await fetch(`${API_URL}/api/withdraw/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    const result = await res.json()

    if (!res.ok) throw new Error(result.error)

    alert("✅ Withdrawal request sent approval takes upto 2 hours")
    window.location.reload()

  } catch (err) {
    alert(`❌ ${err.message}`)
  }
}

  return (
    <div className="min-h-screen bg-[#0f1419] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#e5e7eb] mb-2">Welcome back, {profile?.name || 'User'}</h1>
          <p className="text-[#9ca3af]">Here&apos;s your performance overview</p>
        </div>

        {/* Start Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
           <div className="p-6 rounded-2xl bg-[#1a1f2e] border border-[#2d3748] hover:border-[#06b6d4]/50 transition-all group cursor-pointer">
               <div className='w-12 h-12 rounded-xl bg-gradient-to-br p-2 mb-4 text-white from-cyan-500 to-blue-600'>
                <TrendingUp className='w-6 h-6' />
              </div>
              <p className="text-sm text-[#9ca3af] mb-2">Total Points</p>
              <p className="text-3xl font-bold text-[#e5e7eb] mb-2"> {profile?.points_balance || 0}</p>
              <p className="text-xs text-[#9ca3af]">All time earned</p>
           </div>

            <div className="p-6 rounded-2xl bg-[#1a1f2e] border border-[#2d3748] hover:border-[#06b6d4]/50 transition-all group cursor-pointer">
               <div className='w-12 h-12 rounded-xl bg-gradient-to-br p-2 mb-4 text-white from-green-500 to-emerald-600'>
                <Award className='w-6 h-6' />
              </div>
              <p className="text-sm text-[#9ca3af] mb-2">Completed Tasks</p>
              <p className="text-3xl font-bold text-[#e5e7eb] mb-2">{stats.completed}</p>
              <p className="text-xs text-[#9ca3af]">All time earned</p>
           </div>

            <div className="p-6 rounded-2xl bg-[#1a1f2e] border border-[#2d3748] hover:border-[#06b6d4]/50 transition-all group cursor-pointer">
               <div className='w-12 h-12 rounded-xl bg-gradient-to-br p-2 mb-4 text-white from-purple-500 to-pink-600'>
                <Target className='w-6 h-6' />
              </div>
              <p className="text-sm text-[#9ca3af] mb-2">Available to Withdraw</p>
              <p className="text-3xl font-bold text-[#e5e7eb] mb-2">Kes {balance.toFixed(2)}</p>
              <p className="text-xs text-[#9ca3af]">Ready to cash out at 500 pts</p>
           </div>

        </div>
        {/* End Cards */}
        <div className=' pb-10'>
            <h1 className="text-4xl font-bold text-[#e5e7eb] mb-2">Withdraw Your Points</h1>
            <p className="text-[#9ca3af]">Convert your earned points into real money</p>
           </div>

         <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Withdrawal Form */}
          <div className="lg:col-span-2 space-y-8">

        {/* Available Balance */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#06b6d4]/20 to-[#06b6d4]/10 border border-[#06b6d4]/30">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-sm text-[#9ca3af] mb-2">Available Balance</p>
                  <p className="text-4xl font-bold text-[#06b6d4]">Kes {balance.toFixed(2)}</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-[#06b6d4]/30 flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-[#06b6d4]" />
                </div>
              </div>
              <p className="text-xs text-[#9ca3af]">
                {profile?.points_balance || 0} points available
              </p>
            </div>

              {/* Withdrawal Button */}
              <div className="p-6 rounded-2xl bg-[#1a1f2e] border border-[#2d3748] hover:border-[#06b6d4]/50 transition-all group cursor-pointer">
                <p className="text-sm text-[#9ca3af] mb-2">Withdraw Your Earnings</p>
                <button onClick={handleWithdraw} className="w-full py-3 bg-gradient-to-br from-[#06b6d4] to-[#0ea5e9] text-white rounded-lg font-semibold hover:from-[#0ea5e9] hover:to-[#06b6d4] transition-colors">
                  Withdraw 500 Points (Kes 150)
                </button>
              </div>
                </div>
            </div>

      </div>
    </div>
  )
}

export default Dashboard