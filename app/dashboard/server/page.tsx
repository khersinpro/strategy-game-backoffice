import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { ServerList } from "@/src/types/server"
import axios from "axios"
import { columns } from "./_components/columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AuthHeader from "@/components/layouts/auth-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CreateServerForm from "./_components/create-server-form"

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
      <AuthHeader />
      <Tabs defaultValue="overview" className="grid">
          <TabsList className="self-center mx-auto">
              <TabsTrigger value="overview">Afficher la liste</TabsTrigger>
              <TabsTrigger value="form">Créer un serveur</TabsTrigger>
          </TabsList>
          {/* TABLE DATA */}
          <TabsContent value="overview" className="grid gap-4">
            <DataTable columns={columns} data={servers} filteredField={{ accessorKey: 'name', label: 'nom' }} />
          </TabsContent>
          {/* CREATE FORM */}
          <TabsContent value="form">
            <CreateServerForm />
          </TabsContent>
      </Tabs>
    </>
  )
}
