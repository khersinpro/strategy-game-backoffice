import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/src/auth/auth"
import axios from "axios"
import { Castle, UserPlus, UserRoundCheck, Users } from "lucide-react"
import { UserList } from "./unit-type/columns"

async function Dashboard() {
  const session = await auth()
  const user = session?.user

  const response = await axios.get(`${process.env.API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  })

  const users: UserList = response.data

  return (
    <>
      <h1 className="text-lg font-bold">Tableau de bord de {user?.username}</h1>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total des joueurs inscrits
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+45,231</div>
              <p className="text-xs text-muted-foreground">
                +20.1% depuis le mois dernier
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Inscription de la semaine
              </CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% depuis la semaine dernière
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nombre de joueurs en ligne</CardTitle>
              <UserRoundCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 depuis la denière heure
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nombre de villages</CardTitle>
              <Castle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% depuis le mois dernier
              </p>
            </CardContent>
          </Card>
        </div>
    </>
  )
}
export default Dashboard


