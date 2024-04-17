import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { UnitList } from "@/src/types/unit"
import axios from "axios"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AuthHeader from "@/components/layouts/auth-header"

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user

  const units: UnitList = await axios.get(`${process.env.API_URL}/unit`, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  }).then(res => res.data)

  return (
    <>
    <AuthHeader>
      <Button className="w-fit">
        Unité
        <Plus className="ml-2" />
      </Button>
    </AuthHeader>
      <DataTable columns={columns} data={units} filteredField={{ accessorKey: 'name', label: 'nom' }} />
    </>
  )
}
