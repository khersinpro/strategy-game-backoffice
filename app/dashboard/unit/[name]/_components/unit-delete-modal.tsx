'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { deleteUnit } from "@/src/service/unit"
import { Unit } from "@/src/types/unit"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function UnitDeleteModal({ unit }: { unit: Unit }) {
  const { data: session } = useSession()
  const token = session?.user.token ? session.user.token : ''
  const [stateMessage, setStateMessage] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleDeleteUnit = async () => {
    try {
      await deleteUnit(token, unit.name)
      setStateMessage("L'unité a été supprimée avec succès.")
      setTimeout(() => { router.push('/dashboard/unit') }, 2000)
    }
    catch (error) {
      setStateMessage("Une erreur est survenue lors de la suppression de l'unité.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Supprimer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"Supprimer l'unité ?"}</DialogTitle>
          <DialogDescription>
            {"Cette action est irréversible et supprimera définitivement l'unité."}
          </DialogDescription>
        </DialogHeader>
        {stateMessage && <p>{stateMessage}</p>}
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
          <Button variant="destructive" onClick={handleDeleteUnit}>Continuer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
