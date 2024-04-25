import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { ServerList } from "@/src/types/server"
import axios from "axios"
import { columns } from "./_components/columns"
import AuthHeader from "@/components/layouts/auth-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CreateServerForm from "./_components/create-server-form"

export async function getAllServers(token: string): Promise<ServerList> {
    try {
        return await axios.get(`${process.env.API_URL}/server`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data);
    }
    catch (error) {
        throw error;
    }
}

export default async function Server() {
  const session = await auth()
  const token = session?.user.token ? session.user.token : ''
  const servers: ServerList = await getAllServers(token)

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
