import axios from "axios"
import { auth } from "@/src/auth/auth"
import { columns } from "./columns"
import { DataTable } from "../../../components/data-table/data-table"
import { UnitTypeList } from "@/src/types/unit-type"
import { CirclePlus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import AuthHeader from "@/components/layouts/auth-header"

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user

  const unitTypes: UnitTypeList = await axios.get(`${process.env.API_URL}/unit-type`, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  }).then(res => res.data)

  return (
    <>
    <AuthHeader>
      <Button className="w-fit">
        {"Type d'unité"}
        <Plus className="ml-2" />
      </Button>
    </AuthHeader>
      <DataTable columns={columns} data={unitTypes} filteredField={{ accessorKey: 'type', label: 'type' }} />
    </>
  )
}
