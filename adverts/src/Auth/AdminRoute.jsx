import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(null)

  useEffect(() => {
    if (user) {
      checkAdmin()
    }
  }, [user])

  const checkAdmin = async () => {
    const { data } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    setIsAdmin(data?.role === 'admin')
  }

  if (loading || isAdmin === null) return <div>Loading...</div>

  if (!user || !isAdmin) return <Navigate to="/manage" />

  return children
}

export default AdminRoute