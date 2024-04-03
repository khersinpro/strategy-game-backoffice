import { Card } from "@/components/ui/card"
import { auth } from "@/src/auth/auth"
import { UserList, columns } from "./columns"
import { DataTable } from "../../../components/data-table/data-table"

const userlist: UserList = [
  {
      id: 1,
      username: "Russ0",
      email: "0Leatha.Prosacco@yahoo.com",
      createdAt: "2024-03-24T19:45:42.867Z",
      updatedAt: "2024-03-24T19:45:42.867Z",
      role_name: "ROLE_USER"
  },
  {
      id: 2,
      username: "Katlyn1",
      email: "1Ella.Walter@gmail.com",
      createdAt: "2024-03-24T19:45:43.138Z",
      updatedAt: "2024-03-24T19:45:43.138Z",
      role_name: "ROLE_USER"
  },
  {
      id: 3,
      username: "Earline2",
      email: "2Tomasa52@gmail.com",
      createdAt: "2024-03-24T19:45:43.409Z",
      updatedAt: "2024-03-24T19:45:43.409Z",
      role_name: "ROLE_USER"
  },
  {
      id: 4,
      username: "Loma3",
      email: "3Destinee_McGlynn@hotmail.com",
      createdAt: "2024-03-24T19:45:43.687Z",
      updatedAt: "2024-03-24T19:45:43.687Z",
      role_name: "ROLE_USER"
  },
  {
      id: 5,
      username: "Rocky4",
      email: "4Rachelle87@gmail.com",
      createdAt: "2024-03-24T19:45:43.958Z",
      updatedAt: "2024-03-24T19:45:43.958Z",
      role_name: "ROLE_USER"
  },
  {
      id: 6,
      username: "Horace5",
      email: "5Hardy.Tromp64@yahoo.com",
      createdAt: "2024-03-24T19:45:44.228Z",
      updatedAt: "2024-03-24T19:45:44.228Z",
      role_name: "ROLE_USER"
  },
  {
      id: 7,
      username: "Ebba6",
      email: "6Garnet10@gmail.com",
      createdAt: "2024-03-24T19:45:44.498Z",
      updatedAt: "2024-03-24T19:45:44.498Z",
      role_name: "ROLE_USER"
  },
  {
      id: 8,
      username: "Dianna7",
      email: "7Eladio78@hotmail.com",
      createdAt: "2024-03-24T19:45:44.769Z",
      updatedAt: "2024-03-24T19:45:44.769Z",
      role_name: "ROLE_USER"
  },
  {
      id: 9,
      username: "Omari8",
      email: "8Maye.Gerhold82@yahoo.com",
      createdAt: "2024-03-24T19:45:45.040Z",
      updatedAt: "2024-03-24T19:45:45.040Z",
      role_name: "ROLE_USER"
  },
  {
      id: 10,
      username: "Eric9",
      email: "9Fanny_Luettgen67@yahoo.com",
      createdAt: "2024-03-24T19:45:45.311Z",
      updatedAt: "2024-03-24T19:45:45.311Z",
      role_name: "ROLE_USER"
  },
  {
      id: 11,
      username: "Loyce10",
      email: "10Aracely_Kirlin@yahoo.com",
      createdAt: "2024-03-24T19:45:45.581Z",
      updatedAt: "2024-03-24T19:45:45.581Z",
      role_name: "ROLE_USER"
  },
  {
      id: 12,
      username: "Jon11",
      email: "11Laverne_Stamm2@hotmail.com",
      createdAt: "2024-03-24T19:45:45.852Z",
      updatedAt: "2024-03-24T19:45:45.852Z",
      role_name: "ROLE_USER"
  },
  {
      id: 13,
      username: "Burnice12",
      email: "12Kip_Rempel27@yahoo.com",
      createdAt: "2024-03-24T19:45:46.122Z",
      updatedAt: "2024-03-24T19:45:46.122Z",
      role_name: "ROLE_USER"
  },
  {
      id: 14,
      username: "Nigel13",
      email: "13Herman94@yahoo.com",
      createdAt: "2024-03-24T19:45:46.392Z",
      updatedAt: "2024-03-24T19:45:46.392Z",
      role_name: "ROLE_USER"
  },
  {
      id: 15,
      username: "Cole14",
      email: "14Yvette_Nolan59@hotmail.com",
      createdAt: "2024-03-24T19:45:46.662Z",
      updatedAt: "2024-03-24T19:45:46.662Z",
      role_name: "ROLE_USER"
  },
  {
      id: 16,
      username: "Braden15",
      email: "15Katarina_Wehner40@yahoo.com",
      createdAt: "2024-03-24T19:45:46.931Z",
      updatedAt: "2024-03-24T19:45:46.931Z",
      role_name: "ROLE_USER"
  },
  {
      id: 17,
      username: "Alysa16",
      email: "16Carrie7@hotmail.com",
      createdAt: "2024-03-24T19:45:47.202Z",
      updatedAt: "2024-03-24T19:45:47.202Z",
      role_name: "ROLE_USER"
  },
  {
      id: 18,
      username: "Jessy17",
      email: "17Leon_Kertzmann61@hotmail.com",
      createdAt: "2024-03-24T19:45:47.471Z",
      updatedAt: "2024-03-24T19:45:47.471Z",
      role_name: "ROLE_USER"
  },
  {
      id: 19,
      username: "Ines18",
      email: "18Jevon.Wintheiser74@yahoo.com",
      createdAt: "2024-03-24T19:45:47.742Z",
      updatedAt: "2024-03-24T19:45:47.742Z",
      role_name: "ROLE_USER"
  },
  {
      id: 20,
      username: "Vickie19",
      email: "19Cara95@yahoo.com",
      createdAt: "2024-03-24T19:45:48.011Z",
      updatedAt: "2024-03-24T19:45:48.011Z",
      role_name: "ROLE_USER"
  },
  {
      id: 21,
      username: "admin",
      email: "admin@admin.fr",
      createdAt: "2024-03-24T19:45:48.281Z",
      updatedAt: "2024-03-24T19:45:48.281Z",
      role_name: "ROLE_ADMIN"
  }
]

export default async function Dashboard() {
  const session = await auth()
  const user = session?.user


  return (
    <>
      <DataTable columns={columns} data={userlist} />
    </>
  )
}
