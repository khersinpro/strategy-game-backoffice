import AuthHeader from "@/components/layouts/auth-header";
import axios from "axios";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { UserListResponse } from "@/src/types/user";
import AdvancedSearch from "./advanced-search";
import { auth } from "@/src/auth/auth";
import CustomPagination from "@/components/pagination/custom-pagination";
import { SearchParams } from "@/src/types/search-params";

const fetchUserList = async (token: string, page: number = 1, limit: number = 10 ,searchParams: SearchParams) : Promise<UserListResponse> => {
  try {
    const urlParams = new URLSearchParams(searchParams as any);
    urlParams.set('page', page.toString());
    urlParams.set('limit', limit.toString());
    
    return await axios.get(`${process.env.API_URL}/user?${urlParams}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.data)
  }
  catch (error) {
    throw error;
  }
}

export default async function Dashboard({ searchParams }: { searchParams: SearchParams }) {
  const session = await auth();
  const token = session?.user ? session.user.token : '';
  const limit = searchParams.limit ? parseInt(searchParams.limit as string) : 10;
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const { rows, count }= await fetchUserList(token, page, limit, searchParams);
  return (
    <>
      <AuthHeader />
      <AdvancedSearch />
      <DataTable columns={columns} data={rows} filteredField={{accessorKey: 'email', label: 'email'}} />
      <CustomPagination page={page} limit={limit} total={count} />
    </>
  )
}
