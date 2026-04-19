import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Tasks from './Tabs/Tasks'
import Dashboard from './Tabs/Dashboard'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import Management from './management/Management'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={
          <ProtectedRoute>
          <Tasks/>
          </ProtectedRoute>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/manage' element={<Management/>}/>
      </Routes>
    </Router>
  )
}

export default App