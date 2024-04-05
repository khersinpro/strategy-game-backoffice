import axios from "axios"
import { auth } from "@/src/auth/auth"
import { columns } from "./columns"
import { DataTable } from "../../../components/data-table/data-table"
import { UnitTypeList } from "@/src/types/unit-type"

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
      <DataTable columns={columns} data={unitTypes} filteredField={{accessorKey: 'type', label: 'type'}} />
    </>
  )
}
