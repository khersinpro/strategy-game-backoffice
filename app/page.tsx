'use client'
import { useAuth } from '@/src/auth/AuthContext'

export default function LoginForm() {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <p>Loading...</p>
  }
  
  console.log(user, isAuthenticated)
  return (
    <>
      <h1>DASHBOARD</h1>
      <p>Welcome, {user.username}</p>
      <p>Email, {user.email}</p>
    </>
  )
}
