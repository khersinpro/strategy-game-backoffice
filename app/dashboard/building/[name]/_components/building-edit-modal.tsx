"use client"

import { ErrorAlert } from "@/components/alert/alert"
import { CustomFormField } from "@/components/form/form-inputs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { updateBuilding } from "@/src/service/building"
import { Building } from "@/src/types/building"
import { ObjectKeyValueString } from "@/src/types/common"
import { handleZodError } from "@/src/utils/zod"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { ZodError } from "zod"

export default function BuildingEditModal({ building, token }: { building: Building, token: string }) {
    const [open, setOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>(building.name)
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const router = useRouter()

    const submitUpdates = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setErrors({})
            await updateBuilding(token, building.name, {
                name
            })
            setOpen(false)
            router.push(`/dashboard/building/${name}`)
        }
        catch (error: any) {
            if (error instanceof ZodError) {
                setErrors(handleZodError(error))
            }
            else {
                setErrors({ general: error.message ? error.message : 'Une erreur est survenue' })
            }
        }
    }, [name, token, errors, building.name, router])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Modifier</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modification du bâtiment</DialogTitle>
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
                        placeholder="Nom du bâtiment"
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
