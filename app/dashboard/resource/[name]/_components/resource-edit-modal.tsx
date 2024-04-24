"use client"

import axios from "axios"
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
import { ResourceUpdateSchema } from "@/src/schemas/resource"
import { Resource, ResourceEditFormErrors } from "@/src/types/resource"
import { handleZodError } from "@/src/utils/zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { z } from "zod"

export default function ResourceEditModal({ resource }: { resource: Resource }) {
    const { data: session } = useSession()
    const token = session?.user.token ? session.user.token : ''
    const [open, setOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>(resource.name)
    const [errors, setErrors] = useState<ResourceEditFormErrors>({name: '', general: ''})
    const router = useRouter()

    const submitUpdates = useCallback( async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setErrors({name: '', general: ''})
            ResourceUpdateSchema.parse({ name })
            await axios.put(`${process.env.API_URL}/resource/${resource.name}`, 
            {
                name
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            setOpen(false)
            router.push(`/dashboard/resource/${name}`)
        }
        catch (error: any) {
            if (error instanceof z.ZodError) {
                setErrors({...errors, ...handleZodError(error)})
            }
            else {
                
                setErrors({...errors, general: error.message ? error.message : 'Une erreur est survenue' })
            }
        }
    }, [name, token, errors, resource.name, router])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Modifier</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modification de la ressource</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 pt-4" onSubmit={submitUpdates}>
                    <ErrorAlert 
                        isError={!!errors.general} 
                        title="Une erreur est survenue" 
                        message={errors.general} 
                    />
                    <CustomFormField 
                        type="text" 
                        id="resource" 
                        placeholder="Nom de la ressource" 
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
