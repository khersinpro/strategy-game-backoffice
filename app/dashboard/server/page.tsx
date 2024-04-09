import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { ServerList } from "@/src/types/server"
import axios from "axios"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { CirclePlus } from "lucide-react"

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user

  const servers: ServerList = await axios.get(process.env.API_URL + '/server', {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  }).then(res => res.data)

  return (
    <>
      <Button className="w-fit">
        <CirclePlus className="h-5 w-5 mr-2" />
        Créer une civilisation
      </Button>
      <DataTable columns={columns} data={servers} filteredField={{ accessorKey: 'name', label: 'nom' }} />
    </>
  )
}
