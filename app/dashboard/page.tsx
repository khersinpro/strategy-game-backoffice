import { auth } from "@/src/auth/auth"
import axios from "axios"

async function Dashboard() {
  const session = await auth()
  const user = session?.user

  await new Promise((resolve) => setTimeout(resolve, 2000))
  type User = {
    id: number,
    email: string
  }
  
  type UserList = User[]

  const response = await axios.get("http://localhost:3000/api/user", {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  })

  const users: UserList = response.data

  return (
    <>
      <p>Welcome, {user?.username}</p>
      <p>Email, {user?.email}</p>
      <p>Role, {user?.role_name}</p>
      <p style={{wordBreak: 'break-word'}}>Token, {user?.token}</p>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </>
  )
}
export default Dashboard


