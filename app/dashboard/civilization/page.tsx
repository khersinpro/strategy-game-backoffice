import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { columns } from "./columns"
import { CivilizationList } from "@/src/types/civilization"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AuthHeader from "@/components/layouts/auth-header"

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
    <AuthHeader>
      <Button className="w-fit">
        Civilisation
        <Plus className="ml-2" />
      </Button>
    </AuthHeader>
      <DataTable columns={columns} data={civilizations} filteredField={{accessorKey: 'name', label: 'nom'}} />
    </>
  )
}
