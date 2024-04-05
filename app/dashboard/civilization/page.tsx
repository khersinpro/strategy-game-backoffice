import { DataTable } from "@/components/data-table/data-table"
import { Card } from "@/components/ui/card"
import { auth } from "@/src/auth/auth"
import { columns } from "./columns"
import { CivilizationList } from "@/src/types/civilization"
import axios from "axios"

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user
  const civilizations: CivilizationList = await axios.get(`${process.env.API_URL}/civilization`, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  }).then(res => res.data)

  return (
    <>
      <DataTable columns={columns} data={civilizations} filteredField={{accessorKey: 'name', label: 'nom'}} />
    </>
  )
}
