import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { MapList } from "@/src/types/map"
import axios from "axios"
import { columns } from "./columns"
import { CirclePlus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import AuthHeader from "@/components/layouts/auth-header"

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user
  const maps: MapList = await axios.get(`${process.env.API_URL}/map`, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  }).then(res => res.data)

  return (
    <>
    <AuthHeader>
      <Button className="w-fit">
        Carte
        <Plus className="ml-2" />
      </Button>
    </AuthHeader>
      <DataTable columns={columns} data={maps} filteredField={{ accessorKey: 'server_name', label: 'serveur' }} />
    </>
  )
}
