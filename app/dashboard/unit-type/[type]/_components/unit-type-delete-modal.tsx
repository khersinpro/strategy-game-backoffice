'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UnitType } from "@/src/types/unit-type"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function UnitTypeDeleteModal({ unitType }: { unitType: UnitType }) {
  const { data: session } = useSession()
  const token = session?.user.token ? session.user.token : ''
  const [stateMessage, setStateMessage] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const deleteUnitType = async () => {
    try {
      await axios.delete(`${process.env.API_URL}/unit-type/${unitType.type}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setStateMessage("Le type d'unité a été supprimé avec succès.")
      setTimeout(() => {
        router.push('/dashboard/unit-type')
      }, 2000)
    }
    catch (error) {
      setStateMessage("Une erreur est survenue lors de la suppression du type d'unité.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Supprimer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"Supprimer le type d'unité ?"}</DialogTitle>
          <DialogDescription>
            {"Cette action est irréversible et supprimera définitivement le type d'unité."}
          </DialogDescription>
        </DialogHeader>
        {stateMessage && <p>{stateMessage}</p>}
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
          <Button variant="destructive" onClick={deleteUnitType}>Continuer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
