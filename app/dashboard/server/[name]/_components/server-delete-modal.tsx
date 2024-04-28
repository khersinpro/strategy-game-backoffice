'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { deleteServer } from "@/src/service/server"
import { Server } from "@/src/types/server"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ServerDeleteModal({ server }: { server: Server }) {
  const { data: session } = useSession()
  const token = session?.user.token ? session.user.token : ''
  const [stateMessage, setStateMessage] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleDeleteServer = async () => {
    try {
      await deleteServer(token, server.name)
      setStateMessage("Le serveur a été supprimé avec succès.")
      setTimeout(() => { router.push('/dashboard/server') }, 2000)
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
          <DialogTitle>Supprimer le serveur ?</DialogTitle>
          <DialogDescription>
            Cette action est irréversible et supprimera définitivement le serveur.
          </DialogDescription>
        </DialogHeader>
        {stateMessage && <p>{stateMessage}</p>}
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
          <Button variant="destructive" onClick={handleDeleteServer}>Continuer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
