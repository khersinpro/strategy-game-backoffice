import AuthHeader from "@/components/layouts/auth-header"
import CreateCivilizationForm from "./_components/create-civilization-form"
import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { columns } from "./_components/columns"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { getAllCivilizations } from "@/src/service/civilization"



export default async function CivilizationListPage() {
  const session = await auth()
  const token = session?.user ? session.user.token : ''
  const civilizations = await getAllCivilizations(token)
  return (
    <>
      <AuthHeader />
      <Tabs defaultValue="overview" className="grid">
        <TabsList className="self-center mx-auto">
          <TabsTrigger value="overview">Afficher la liste</TabsTrigger>
          <TabsTrigger value="form">Créer une civilisation</TabsTrigger>
        </TabsList>
        {/* TABLE DATA */}
        <TabsContent value="overview" className="grid gap-4">
          <DataTable columns={columns} data={civilizations} filteredField={{ accessorKey: 'name', label: 'nom' }} />
        </TabsContent>
        {/* CREATE FORM */}
        <TabsContent value="form">
          <CreateCivilizationForm />
        </TabsContent>
      </Tabs>
    </>
  )
}
