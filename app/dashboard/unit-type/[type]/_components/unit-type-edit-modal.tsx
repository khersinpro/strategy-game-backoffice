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
import { UnitTypeUpdateSchema } from "@/src/schemas/unit-type"
import { UnitType, UnitTypeEditFormErrors } from "@/src/types/unit-type"
import { handleZodError } from "@/src/utils/zod"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { z } from "zod"



export default function UnitTypeEditModal({ unitType }: { unitType: UnitType }) {
    const { data: session } = useSession()
    const token = session?.user.token ? session.user.token : ''
    const [open, setOpen] = useState<boolean>(false)
    const [type, setType] = useState<string>(unitType.type)
    const [errors, setErrors] = useState<UnitTypeEditFormErrors>({type: '', general: ''})
    const router = useRouter()

    const submitUpdates = useCallback( async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setErrors({type: '', general: ''})
            UnitTypeUpdateSchema.parse({ type })
            await axios.put(`${process.env.API_URL}/unit-type/${unitType.type}`, 
            {
                type
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            setOpen(false)
            router.push(`/dashboard/unit-type/${type}`)
        }
        catch (error: any) {
            if (error instanceof z.ZodError) {
                setErrors({...errors, ...handleZodError(error)})
            }
            else {
                
                setErrors({...errors, general: error.message ? error.message : 'Une erreur est survenue' })
            }
        }
    }, [type, token, errors, unitType.type, router])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Modifier</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{"Modification du type d'unité"}</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 pt-4" onSubmit={submitUpdates}>
                    <ErrorAlert 
                        isError={!!errors.general} 
                        title="Une erreur est survenue" 
                        message={errors.general} 
                    />
                    <CustomFormField 
                        type="text" 
                        id="unit-type" 
                        placeholder="Type d'unité" 
                        value={type} 
                        onChange={(e) => setType(e.target.value)} 
                        error={errors.type} 
                    />
                    <Button type="submit">Sauvegarder les modifications</Button>
                </form>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
