import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { UnitListResponse } from "@/src/types/unit"
import axios from "axios"
import { columns } from "./_components/columns"
import AuthHeader from "@/components/layouts/auth-header"
import { SearchParams } from "@/src/types/search-params"
import CustomPagination from "@/components/pagination/custom-pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateUnitForm from "./_components/create-unit-form"

const getAllUnits = async (token: string, page = 1, limit = 20): Promise<UnitListResponse> => {
  try {
    return await axios.get(`${process.env.API_URL}/unit?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.data)
  }
  catch (error) {
    throw error
  }
}

export default async function Dashboard({ searchParams }: { searchParams: SearchParams }) {
  const session = await auth()
  const user = session?.user
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1
  const limit = searchParams.limit ? parseInt(searchParams.limit as string) : 20
  const token = user?.token || ''

  const { rows, count } = await getAllUnits(token, page, limit)

  return (
    <>
      <AuthHeader />
      <Tabs defaultValue="overview" className="flex flex-col">
        <TabsList className="self-center mx-auto">
          <TabsTrigger value="overview">Afficher la liste</TabsTrigger>
          <TabsTrigger value="form">{"Créer une unité"}</TabsTrigger>
        </TabsList>
        {/* TABLE DATA */}
        <TabsContent value="overview" className="flex flex-col gap-4">
          <DataTable columns={columns} data={rows} filteredField={{ accessorKey: 'name', label: 'nom' }} />
          <CustomPagination page={page} limit={limit} total={count} />
        </TabsContent>
        {/* CREATE FORM */}
        <TabsContent value="form">
          <CreateUnitForm />
        </TabsContent>
      </Tabs>
    </>
  )
}
