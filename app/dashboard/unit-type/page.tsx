import axios from "axios"
import { auth } from "@/src/auth/auth"
import { columns } from "./_components/columns"
import { DataTable } from "../../../components/data-table/data-table"
import { UnitTypeList } from "@/src/types/unit-type"
import AuthHeader from "@/components/layouts/auth-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateUnitTypeForm from "./_components/create-unit-type-form"

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user

  const unitTypes: UnitTypeList = await axios.get(`${process.env.API_URL}/unit-type`, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  }).then(res => res.data)

  return (
    <>
    <AuthHeader />
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
    </>
  )
}
