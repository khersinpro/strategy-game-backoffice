import { auth } from "@/src/auth/auth"
import { columns } from "./_components/columns"
import { DataTable } from "../../../components/data-table/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllUnitTypes } from "@/src/service/unit-type"
import AuthHeader from "@/components/layouts/auth-header"
import CreateUnitTypeForm from "./_components/create-unit-type-form"

export default async function Dashboard() {
  const session = await auth()
  const token = session?.user ? session.user.token : ''
  const unitTypes = await getAllUnitTypes(token)

  return (
    <>
      <AuthHeader />
      <Tabs defaultValue="overview" className="grid">
          <TabsList className="self-center mx-auto">
              <TabsTrigger value="overview">Afficher la liste</TabsTrigger>
              <TabsTrigger value="form">{"Créer un type d'unité"}</TabsTrigger>
          </TabsList>
          {/* TABLE DATA */}
          <TabsContent value="overview" className="grid gap-4">
            <DataTable columns={columns} data={unitTypes} filteredField={{ accessorKey: 'type', label: 'type' }} />
          </TabsContent>
          {/* CREATE FORM */}
          <TabsContent value="form">
            <CreateUnitTypeForm />
          </TabsContent>
      </Tabs>
    </>
  )
}
