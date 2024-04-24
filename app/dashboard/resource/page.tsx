import axios from "axios"
import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { ResourceList } from "@/src/types/resource"
import { columns } from "./_components/columns"
import AuthHeader from "@/components/layouts/auth-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateResourceForm from "./_components/create-resource-form"

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
      <AuthHeader />
      <Tabs defaultValue="overview" className="grid">
        <TabsList className="self-center mx-auto">
          <TabsTrigger value="overview">Afficher la liste</TabsTrigger>
          <TabsTrigger value="form">Créer une ressource</TabsTrigger>
        </TabsList>
        {/* TABLE DATA */}
        <TabsContent value="overview" className="grid gap-4">
          <DataTable columns={columns} data={resources} filteredField={{ accessorKey: 'name', label: 'nom' }} />
        </TabsContent>
        {/* CREATE FORM */}
        <TabsContent value="form">
          <CreateResourceForm />
        </TabsContent>
      </Tabs>
    </>
  )
}
