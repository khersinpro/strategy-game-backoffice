'use client'
import { ExtendedUser } from "@/next-auth";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react"
import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { UserList } from "@/src/types/user";

export default function Dashboard() {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const { data: session } = useSession()
  const [userList, setUserList] = useState<UserList>([])

  const fetchUserList = useCallback(async (page: number = 0, limit: number = 10) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        },
        params: {
          page,
          limit
        }
      })
      const users = response.data
      setUserList(users); 
    }
    catch (error) {
      throw error;
    }
  }, [user]);

  /**
   * UseEffect to fetch current user and
   */
  useEffect(() => {
    if (session && session.user) {
      setUser(session.user)
    }
  }, [session])

  useEffect(() => {
    async function fetchInitialData() {
      await fetchUserList()
    }
    if (user && user.token) {
      fetchInitialData()
    }
  }, [user, fetchUserList])

  return (
    <>
      <DataTable columns={columns} data={userList} filteredField={{accessorKey: 'email', label: 'email'}} />
    </>
  )
}
