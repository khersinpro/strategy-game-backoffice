import AuthHeader from "@/components/layouts/auth-header"
import CreateMapForm from "./_components/create-map-form"
import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { columns } from "./_components/columns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllMaps } from "@/src/service/map"

export default async function MapListPage() {
  const session = await auth()
  const token = session?.user ? session.user.token : ''
  const maps = await getAllMaps(token)

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
          <CreateMapForm />
        </TabsContent>
      </Tabs>
    </>
  )
}
