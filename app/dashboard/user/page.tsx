import { auth } from "@/src/auth/auth.config"
import axios from "axios"

async function Dashboard() {
  const { user } = await auth()


  return (
    <>
      <h1>DASHBOARD</h1>
      <p>{JSON.stringify( user )}</p>
      {/* <p>Welcome, {user.username}</p>
      <p>Email, {user.email}</p> */}
      <ul>

      </ul>
    </>
  )
}
export default Dashboard