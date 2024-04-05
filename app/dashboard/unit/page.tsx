import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { UnitList } from "@/src/types/unit"
import axios from "axios"
import { columns } from "./columns"

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user

  const units: UnitList = await axios.get(`${process.env.API_URL}/unit`, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  }).then(res => res.data)

  return (
      <DataTable columns={columns} data={units} filteredField={{accessorKey: 'name', label: 'nom'}} />
  )
}
