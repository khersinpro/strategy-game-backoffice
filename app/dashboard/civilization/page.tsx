import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { columns } from "./_components/columns"
import { CivilizationList } from "@/src/types/civilization"
import axios from "axios"
import AuthHeader from "@/components/layouts/auth-header"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import CreateCivilizationForm from "./_components/create-civilization-form"

export async function getAllCivilizations(token: string): Promise<CivilizationList> {
  try {
    return await axios.get(`${process.env.API_URL}/civilization`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.data)
  }
  catch (error) {
    throw error
  }
}

export default async function Dashboard() {
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
