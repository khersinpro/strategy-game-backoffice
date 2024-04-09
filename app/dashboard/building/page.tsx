import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { BuildingList } from "@/src/types/building"
import axios from "axios"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AdvancedSearch from "./components/advanced-search"

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
      <AdvancedSearch />
      <Button className="w-fit">
        <Plus className="h-4 w-4 mr-2" />
        Créer un batiment
      </Button>
      <DataTable columns={columns} data={buildings} filteredField={{ accessorKey: 'name', label: 'nom' }} />
    </>
  )
}
