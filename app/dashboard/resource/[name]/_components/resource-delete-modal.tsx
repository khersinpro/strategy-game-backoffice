'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { deleteResource } from "@/src/service/resource"
import { Resource } from "@/src/types/resource"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ResourceDeleteModal({ resource }: { resource: Resource }) {
  const { data: session } = useSession()
  const token = session?.user.token ? session.user.token : ''
  const [stateMessage, setStateMessage] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleDeleteResource = async () => {
    try {
      await deleteResource(token, resource.name)
      setStateMessage("La ressource a été supprimée avec succès.")
      setTimeout(() => { router.push('/dashboard/resource') }, 2000)
    }
    catch (error) {
      setStateMessage("Une erreur est survenue lors de la suppression de la ressource. Redirection en cours...")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Supprimer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Supprimer la ressource ?</DialogTitle>
          <DialogDescription>
            Cette action est irréversible et supprimera définitivement la ressource.
          </DialogDescription>
        </DialogHeader>
        {stateMessage && <p>{stateMessage}</p>}
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
          <Button variant="destructive" onClick={handleDeleteResource}>Continuer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
