'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Map } from "@/src/types/map"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { deleteMap } from "@/src/service/map"

export default function MapDeleteModal({ map }: { map: Map }) {
  const { data: session } = useSession()
  const token = session?.user.token ? session.user.token : ''
  const [stateMessage, setStateMessage] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleDeleteMap = async () => {
    try {
      await deleteMap(token, map.id)
      setStateMessage("La carte a été supprimée avec succès. Redirection en cours...")
      setTimeout(() => { router.push('/dashboard/map') }, 2000)
    }
    catch (error) {
      setStateMessage("Une erreur est survenue lors de la suppression du serveur.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Supprimer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Supprimer la carte ?</DialogTitle>
          <DialogDescription>
            Cette action est irréversible et supprimera définitivement la carte.
          </DialogDescription>
        </DialogHeader>
        {stateMessage && <p>{stateMessage}</p>}
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
          <Button variant="destructive" onClick={handleDeleteMap}>Continuer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
