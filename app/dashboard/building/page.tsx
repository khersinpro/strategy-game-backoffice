import AdvancedSearch from "./_components/advanced-search"
import AuthHeader from "@/components/layouts/auth-header"
import CustomPagination from "@/components/pagination/custom-pagination"
import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { columns } from "./_components/columns"
import { SearchParams } from "@/src/types/search-params"
import { getAllPaginatedBuildings } from "@/src/service/building"
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs"
import CreateBuildingForms from "./_components/create-building-forms"

export default async function BuildingListPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await auth()
  const token = session?.user ? session.user.token : ''
  const limit = searchParams.limit ? parseInt(searchParams.limit as string) : 20
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1
  const { rows, count } = await getAllPaginatedBuildings(token, page, limit)

  return (
    <>
      <AuthHeader />
      <Tabs defaultValue="overview" className="flex flex-col">
        <TabsList className="self-center mx-auto">
          <TabsTrigger value="overview">Afficher la liste</TabsTrigger>
          <TabsTrigger value="form">Créer un bâtiment</TabsTrigger>
        </TabsList>
        {/* TABLE DATA */}
        <TabsContent value="overview" className="flex flex-col gap-4">
          <AdvancedSearch />
          <DataTable columns={columns} data={rows} filteredField={{ accessorKey: 'name', label: 'nom' }} />
          <CustomPagination page={page} limit={limit} total={count} />
        </TabsContent>
        {/* CREATE FORM */}
        <TabsContent value="form">
          <CreateBuildingForms token={token} />
        </TabsContent>
      </Tabs>
    </>
  )
}
