import AuthHeader from "@/components/layouts/auth-header";
import CreateServerForm from "./_components/create-server-form"
import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { columns } from "./_components/columns"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getAllServers } from "@/src/service/server";

export default async function Server() {
  const session = await auth()
  const token = session?.user.token ? session.user.token : ''
  const servers = await getAllServers(token)
  
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
