import AuthHeader from "@/components/layouts/auth-header"
import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { columns } from "./_components/columns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllResources } from "@/src/service/resource"
import dynamic from "next/dynamic"
const CreateResourceForm = dynamic(() => import("./_components/create-resource-form"), { ssr: false })

export default async function ResourceListPage() {
  const session = await auth()
  const token = session?.user ? session.user.token : ''
  const resources = await getAllResources(token)

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
