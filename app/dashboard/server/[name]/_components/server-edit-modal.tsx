"use client"

import { ErrorAlert } from "@/components/alert/alert"
import { CustomFormField } from "@/components/form/form-inputs"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ServerUpdateSchema } from "@/src/schemas/server"
import { updateServer } from "@/src/service/server"
import { Server, ServerEditFormErrors } from "@/src/types/server"
import { handleZodError } from "@/src/utils/zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { z } from "zod"



export default function ServerEditModal({ server }: { server: Server }) {
    const { data: session } = useSession()
    const token = session?.user.token ? session.user.token : ''
    const [open, setOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>(server.name)
    const [errors, setErrors] = useState<ServerEditFormErrors>({ name: '', general: '' })
    const router = useRouter()

    const submitUpdates = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setErrors({ name: '', general: '' })
            ServerUpdateSchema.parse({ name })
            await updateServer(token, server.name, name)
            setOpen(false)
            router.push(`/dashboard/server/${name}`)
        }
        catch (error: any) {
            if (error instanceof z.ZodError) {
                setErrors({ ...errors, ...handleZodError(error) })
            }
            else {
                setErrors({ ...errors, general: error.message ? error.message : 'Une erreur est survenue' })
            }
        }
    }, [name, token, errors, server.name, router])

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
                    <ErrorAlert
                        isError={!!errors.general}
                        title="Une erreur est survenue"
                        message={errors.general}
                    />
                    <CustomFormField
                        type="text"
                        id="name"
                        placeholder="Nom du serveur"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={errors.name}
                    />
                    <Button type="submit">Sauvegarder les modifications</Button>
                </form>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
