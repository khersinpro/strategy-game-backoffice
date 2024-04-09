import axios from "axios"
import { auth } from "@/src/auth/auth"
import { columns } from "./columns"
import { DataTable } from "../../../components/data-table/data-table"
import { UnitTypeList } from "@/src/types/unit-type"
import { CirclePlus } from "lucide-react"
import { Button } from "@/components/ui/button"

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
      <Button className="w-fit">
        <CirclePlus className="h-5 w-5 mr-2" />
        {"Créer un type d'unité"}
      </Button>
      <DataTable columns={columns} data={unitTypes} filteredField={{ accessorKey: 'type', label: 'type' }} />
    </>
  )
}
