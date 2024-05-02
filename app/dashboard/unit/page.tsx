import AuthHeader from "@/components/layouts/auth-header"
import CreateUnitForm from "./_components/create-unit-form"
import CustomPagination from "@/components/pagination/custom-pagination"
import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { columns } from "./_components/columns"
import { SearchParams } from "@/src/types/search-params"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllPaginatedUnits } from "@/src/service/unit"

export default async function UnitListPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await auth()
  const token = session?.user ? session.user.token : ''
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1
  const limit = searchParams.limit ? parseInt(searchParams.limit as string) : 20
  const { rows, count } = await getAllPaginatedUnits(token, page, limit)

  return (
    <>
      <AuthHeader />
      <Tabs defaultValue="overview" className="flex flex-col">
        <TabsList className="self-center mx-auto">
          <TabsTrigger value="overview">Afficher la liste</TabsTrigger>
          <TabsTrigger value="form">Créer une unité</TabsTrigger>
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
