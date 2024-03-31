import { auth } from "@/src/auth/auth"
import axios from "axios"

async function Dashboard() {
  const session = await auth()
  const users = await axios.get("http://localhost:3000/api/user", {
    headers: {
      Authorization: `Bearer ${session?.user.token}`
    }
  })

  return (
    <>
      <h1>DASHBOARD</h1>
      <p>{JSON.stringify( session?.user )}</p>
      <p>test</p>
      {/* <p>Welcome, {user.username}</p>
      <p>Email, {user.email}</p> */}
      <ul>
        {users.data.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </>
  )
}
export default Dashboard


