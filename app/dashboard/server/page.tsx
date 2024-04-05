import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { ServerList } from "@/src/types/server"
import axios from "axios"
import { columns } from "./columns"

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user

  const servers: ServerList = await axios.get(process.env.API_URL + '/server', {
    headers: {
      Authorization: `Bearer ${user?.token}`
    } 
  }).then(res => res.data)

  return (
    <>
      <DataTable columns={columns} data={servers} filteredField={{accessorKey: 'name', label: 'nom' }} />
    </>
  )
}
