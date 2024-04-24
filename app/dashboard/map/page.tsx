import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { MapList } from "@/src/types/map"
import axios from "axios"
import { columns } from "./_components/columns"
import AuthHeader from "@/components/layouts/auth-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
      <AuthHeader />
      <Tabs defaultValue="overview" className="grid">
        <TabsList className="self-center mx-auto">
          <TabsTrigger value="overview">Afficher la liste</TabsTrigger>
          <TabsTrigger value="form">Créer une carte</TabsTrigger>
        </TabsList>
        {/* TABLE DATA */}
        <TabsContent value="overview" className="grid gap-4">
          <DataTable columns={columns} data={maps} filteredField={{ accessorKey: 'server_name', label: 'serveur' }} />
        </TabsContent>
        {/* CREATE FORM */}
        <TabsContent value="form">
          <p>form</p>
          {/* <CreateServerForm /> */}
        </TabsContent>
      </Tabs>
    </>
  )
}
