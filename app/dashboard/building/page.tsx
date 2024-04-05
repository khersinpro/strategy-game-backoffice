import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { BuildingList } from "@/src/types/building"
import axios from "axios"
import { columns } from "./columns"

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user
  const buildings: BuildingList = await axios.get(`${process.env.API_URL}/building`, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  }).then(res => res.data)

  return (
    <>
      <DataTable columns={columns} data={buildings} filteredField={{accessorKey: 'name', label: 'nom'}} />
    </>
  )
}
