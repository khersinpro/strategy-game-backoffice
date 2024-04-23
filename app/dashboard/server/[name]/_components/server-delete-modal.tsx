'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { Server } from "@/src/types/server"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useState } from "react"
  
  export function ServerDeleteModal({ server } : { server: Server}) {
    const { data: session } = useSession()
    const token = session?.user.token ? session.user.token : ''
    const [stateMessage, setStateMessage] = useState<string>("")

    const deleteServer = async () => {
        try {
            await axios.delete(`${process.env.API_URL}/server/${server.name}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setStateMessage("Le serveur a été supprimé avec succès.")
        }
        catch (error) {
            setStateMessage("Une erreur est survenue lors de la suppression du serveur.")
        }
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Supprimer</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Es-tu sûr de vouloir supprimer le serveur ?</AlertDialogTitle>
            <AlertDialogDescription>
                Cette action est irréversible et supprimera définitivement le serveur.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {
            stateMessage && (
                <AlertDialogDescription>
                    {stateMessage}
                </AlertDialogDescription>
            )
          }
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={deleteServer}>Continuer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  