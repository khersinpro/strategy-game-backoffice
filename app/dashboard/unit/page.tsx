import { DataTable } from "@/components/data-table/data-table"
import { auth } from "@/src/auth/auth"
import { UnitList, UnitListResponse } from "@/src/types/unit"
import axios from "axios"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AuthHeader from "@/components/layouts/auth-header"
import { SearchParams } from "@/src/types/search-params"
import CustomPagination from "@/components/pagination/custom-pagination"

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
      <AuthHeader>
        <Button className="w-fit">
          Unité
          <Plus className="ml-2" />
        </Button>
      </AuthHeader>
      <DataTable columns={columns} data={rows} filteredField={{ accessorKey: 'name', label: 'nom' }} />
      <CustomPagination page={page} limit={limit} total={count} />
    </>
  )
}
