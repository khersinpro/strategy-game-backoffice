import AuthHeader from "@/components/layouts/auth-header";
import AdvancedSearch from "./_components/advanced-search";
import CustomPagination from "@/components/pagination/custom-pagination";
import { columns } from "./_components/columns";
import { DataTable } from "@/components/data-table/data-table";
import { auth } from "@/src/auth/auth";
import { getAllPaginatedUsers } from "@/src/service/user";
import { SearchParams } from "@/src/types/search-params";

export default async function Dashboard({ searchParams }: { searchParams: SearchParams }) {
  const session = await auth();
  const token = session?.user ? session.user.token : '';
  const limit = searchParams.limit ? parseInt(searchParams.limit as string) : 20;
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const { rows, count } = await getAllPaginatedUsers(token, page, limit, searchParams);
  return (
    <>
      <AuthHeader />
      <AdvancedSearch />
      <DataTable columns={columns} data={rows} filteredField={{accessorKey: 'email', label: 'email'}} />
      <CustomPagination page={page} limit={limit} total={count} />
    </>
  )
}
