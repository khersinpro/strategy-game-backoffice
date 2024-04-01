import { Card } from "@/components/ui/card"
import { auth } from "@/src/auth/auth"

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user


  return (
    <>
      <h1>{'DASHBOARD > Server'}</h1>
      <p>Welcome, {user?.username}</p>
      <p>Email, {user?.email}</p>
      <p>Role, {user?.role_name}</p>
      <p style={{wordBreak: 'break-word'}}>Token, {user?.token}</p>
    </>
  )
}
