"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ServerUpdateSchema } from "@/src/schemas/server"
import { Server } from "@/src/types/server"
import { handleZodError } from "@/src/utils/zod"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { z } from "zod"

type ServerFormErrors = {
    name?: string;
    general?: string;
}

export default function ServerEditModal({ server }: { server: Server }) {
    const { data: session } = useSession()
    const token = session?.user.token ? session.user.token : ''
    const [open, setOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>(server.name)
    const [errors, setErrors] = useState<ServerFormErrors>({})

    const submitUpdates = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            ServerUpdateSchema.parse({ name })
            await axios.put(`${process.env.API_URL}/server/${server.name}`, 
            {
                name
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            setOpen(false)
        }
        catch (error: any) {
            if (error instanceof z.ZodError) {
                setErrors(handleZodError(error))
            }
            else {
                setErrors({ general: error.message ? error.message : 'Une erreur est survenue' })
            }
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Modifier</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modification du serveur</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 pt-4" onSubmit={submitUpdates}>
                    {errors.general &&
                        <Alert variant="destructive">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>
                                {errors.general}
                            </AlertDescription>
                        </Alert>
                    }
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email">Nom</Label>
                        <Input type="text" id="name" placeholder="Nom du serveur" value={name} onChange={(e) => setName(e.target.value)} />
                        {errors.name && <p className="text-destructive text-sm ml-2">{errors.name}</p>}
                    </div>
                    <Button type="submit">Sauvegarder les modifications</Button>
                </form>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
