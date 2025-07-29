// Dependencies
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
// Context
import { useAuth } from './context/AuthContext'

const ProtectedRoutes = () => {
  const { loading, isAuthenticated } = useAuth()

  if(loading) return <div>Loading...</div>
  if(!loading && !isAuthenticated) return <Navigate to="/login" replace/>

  return (
    <Outlet/>
  )
}

export default ProtectedRoutes