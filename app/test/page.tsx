'use client'
import { useAuth } from '@/src/auth/AuthContext'
import { ProtectedRoute } from '@/src/auth/ProtectedRoute'

function LoginForm() {
  const { user } = useAuth()

  return (
      <>
        <h1>DASHBOARD</h1>
        <p>Welcome, {user.username}</p>
        <p>Email, {user.email}</p>
      </>
  )
}

export default ProtectedRoute(LoginForm)
