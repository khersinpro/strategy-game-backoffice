import { DataTable } from "@/components/data-table/data-table"
import { Card } from "@/components/ui/card"
import { auth } from "@/src/auth/auth"
import { columns } from "./columns"
import { CivilizationList } from "@/src/types/civilization"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { CirclePlus } from "lucide-react"

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
      <Button className="w-fit">
        <CirclePlus className="h-5 w-5 mr-2"/>
        Créer une civilisation
      </Button>
      <DataTable columns={columns} data={civilizations} filteredField={{accessorKey: 'name', label: 'nom'}} />
    </>
  )
}
