'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { deleteBuilding } from "@/src/service/building"
import { Building } from "@/src/types/building"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function BuildingDeleteModal({ building, token }: { building: Building, token: string }) {
    const [stateMessage, setStateMessage] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter()

    const handleDeleteBuilding = async () => {
        try {
            await deleteBuilding(token, building.name)
            setStateMessage('Le bâtiment a été supprimé avec succès. Redirection en cours...')
            setTimeout(() => { router.push('/dashboard/building') }, 2000)
        }
        catch (error) {
            setStateMessage("Une erreur est survenue lors de la suppression du bâtiment.")
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">Supprimer</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Supprimer le bâtiment ?</DialogTitle>
                    <DialogDescription>
                        Cette action est irréversible et supprimera définitivement le bâtiment.
                    </DialogDescription>
                </DialogHeader>
                {stateMessage && <p>{stateMessage}</p>}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
                    <Button variant="destructive" onClick={handleDeleteBuilding}>Continuer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
