import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { MapList } from "@/src/types/map"
import axios from "axios"
import { columns } from "./columns"
import { CirclePlus } from "lucide-react"
import { Button } from "@/components/ui/button"

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
      <Button className="w-fit">
        <CirclePlus className="h-5 w-5 mr-2" />
        Créer une carte
      </Button>
      <DataTable columns={columns} data={maps} filteredField={{ accessorKey: 'server_name', label: 'serveur' }} />
    </>
  )
}
