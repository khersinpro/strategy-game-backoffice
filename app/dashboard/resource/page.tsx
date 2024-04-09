import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { ResourceList } from "@/src/types/resource"
import axios from "axios"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { CirclePlus } from "lucide-react"

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user
  const resources: ResourceList = await axios.get(`${process.env.API_URL}/resource`, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  }).then(res => res.data)


  return (
    <>
      <Button className="w-fit">
        <CirclePlus className="h-5 w-5 mr-2" />
        Créer un type de ressource
      </Button>
      <DataTable columns={columns} data={resources} filteredField={{ accessorKey: 'name', label: 'nom' }} />
    </>
  )
}
