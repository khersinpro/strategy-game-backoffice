import AuthHeader from "@/components/layouts/auth-header";
import axios from "axios";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { UserList } from "@/src/types/user";
import AdvancedSearch from "./advanced-search";
import { auth } from "@/src/auth/auth";

const fetchUserList = async (token: string, page: number = 0, limit: number = 10) => {
  try {
    return await axios.get(`${process.env.API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        page,
        limit
      }
    }).then(res => res.data)
  }
  catch (error) {
    throw error;
  }
}

export default async function Dashboard() {
  const session = await auth();
  const token = session?.user ? session.user.token : '';
  const userList: UserList = await fetchUserList(token);
  return (
    <>
      <AuthHeader />
      <AdvancedSearch />
      <DataTable columns={columns} data={userList} filteredField={{accessorKey: 'email', label: 'email'}} />
    </>
  )
}
