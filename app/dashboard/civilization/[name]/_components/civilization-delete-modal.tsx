'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Civilization } from "@/src/types/civilization"
import { DialogDescription } from "@radix-ui/react-dialog"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function CivilizationDeleteModal({ civilization }: { civilization: Civilization }) {
    const { data: session } = useSession()
    const token = session?.user.token ? session.user.token : ''
    const [stateMessage, setStateMessage] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter()

    const deleteCivilization = async () => {
        try {
            await axios.delete(`${process.env.API_URL}/civilization/${civilization.name}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setStateMessage("La civilisation a été supprimée avec succès.")
            setTimeout(() => {
                router.push('/dashboard/civilization')
            }, 2000)
        }
        catch (error) {
            setStateMessage("Une erreur est survenue lors de la suppression de la civilization.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">Supprimer</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Supprimer la civilisation ?</DialogTitle>
                    <DialogDescription>
                        Cette action est irréversible et supprimera définitivement la civilisation.
                    </DialogDescription>
                </DialogHeader>
                {stateMessage && <p>{stateMessage}</p>}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
                    <Button variant="destructive" onClick={deleteCivilization}>Continuer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
