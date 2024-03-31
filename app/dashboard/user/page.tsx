import { auth } from "@/src/auth/auth"
import axios from "axios"

async function Dashboard() {
  const session = await auth()


  return (
    <>
      <h1>DASHBOARD</h1>
      <p>{JSON.stringify( session )}</p>
      {/* <p>Welcome, {user.username}</p>
      <p>Email, {user.email}</p> */}
      <ul>

      </ul>
    </>
  )
}
export default Dashboard