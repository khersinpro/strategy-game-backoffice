import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { BuildingList } from "@/src/types/building"
import axios from "axios"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AdvancedSearch from "./advanced-search"
import AuthHeader from "@/components/layouts/auth-header"

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
      <AuthHeader>
        <Button className="w-fit">
          Bâtiment
          <Plus className="ml-2" />
        </Button>
      </AuthHeader>
      <AdvancedSearch />
      <DataTable columns={columns} data={buildings} filteredField={{ accessorKey: 'name', label: 'nom' }} />
    </>
  )
}
