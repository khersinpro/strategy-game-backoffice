'use client'
import { useAuth } from '@/src/auth/AuthContext'
import { ProtectedRoute } from '@/src/auth/ProtectedRoute'

function Dashboard() {
  const { user, isAuthenticated } = useAuth()
  console.log(user)
  return (
    <>
      <h1>DASHBOARD</h1>
      <p>Welcome, {user.username}</p>
      <p>Email, {user.email}</p>
    </>
  )
}

export default ProtectedRoute(Dashboard)


