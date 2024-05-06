"use client"

import { ErrorAlert } from "@/components/alert/alert"
import { CustomFormField } from "@/components/form/form-inputs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { createBuildingLevel } from "@/src/service/building_level"
import { ObjectKeyValueString } from "@/src/types/common"
import { handleZodError } from "@/src/utils/zod"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { ZodError } from "zod"

export default function BuildingLevelCreateModal({ buildingName, token }: { buildingName: string, token: string }) {
    const [open, setOpen] = useState<boolean>(false)
    const [time, setTime] = useState<number>(0)
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const router = useRouter()

    const submitUpdates = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setErrors({})
            await createBuildingLevel(token, {
                building_name: buildingName,
                time: time
            })
            setOpen(false)
            router.refresh()
        }
        catch (error: any) {
            if (error instanceof ZodError) {
                setErrors(handleZodError(error))
            }
            else {
                setErrors({ general: error.message ? error.message : 'Une erreur est survenue' })
            }
        }
    }, [time, token, errors, buildingName, router])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Ajouter un niveau</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Création du niveau supplémentaire</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4" onSubmit={submitUpdates}>
                    <ErrorAlert
                        isError={!!errors.general}
                        title="Une erreur est survenue"
                        message={errors.general}
                    />
                    <CustomFormField
                        type="text"
                        id="time"
                        label="Temps de construction en seconde"
                        value={time}
                        onChange={(e) => setTime(Number(e.target.value))}
                        error={errors.time}
                    />
                    <Button type="submit">Créer le niveau supplémentaire</Button>
                </form>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
