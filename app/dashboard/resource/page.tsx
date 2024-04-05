import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { ResourceList } from "@/src/types/resource"
import axios from "axios"
import { columns } from "./columns"

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user
  const resources: ResourceList = await axios.get(`${process.env.API_URL}/resource`, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  }).then(res => res.data)


  return (
    <>
      <DataTable columns={columns} data={resources} filteredField={{accessorKey: 'name', label: 'nom'}} />
    </>
  )
}
