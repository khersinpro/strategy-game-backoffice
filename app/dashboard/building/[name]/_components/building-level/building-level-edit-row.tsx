"use client"

import TextCardRow from "@/components/card/text-card-row"
import { ErrorAlert, SuccessAlert } from "@/components/alert/alert"
import { CustomFormField } from "@/components/form/form-inputs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ObjectKeyValueString } from "@/src/types/common"
import { handleZodError } from "@/src/utils/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ZodError } from "zod"
import { Clock } from "lucide-react"
import { BuildingLevel } from "@/src/types/building_level"
import { getMinutesAndSeconds } from "@/src/utils/time"
import { updateBuildingLevel } from "@/src/service/building_level"

export function BuildingLevelEditRow({ buildingLevel, token } : { buildingLevel: BuildingLevel, token: string }) {
    return (
        <>
            {
                    <div className="flex items-center justify-between">
                        <TextCardRow label={'Temps:'} value={getMinutesAndSeconds(buildingLevel.time)} Icon={Clock} />
                        <BuildingLevelEditForm buildingLevel={buildingLevel} token={token} />
                    </div>
            }
        </>
    );
}


export function BuildingLevelEditForm({ buildingLevel, token } : { buildingLevel: BuildingLevel, token: string }) {
    const router = useRouter()
    const [time, setTime] = useState(buildingLevel.time)
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault()
            setLoading(true)
            setSuccess(false)
            setErrors({})
            await updateBuildingLevel(token, buildingLevel.id, {
                time: time
            })
            setSuccess(true)
            router.refresh()
        }
        catch (error: any) {
            if (error instanceof ZodError) {
                setErrors(handleZodError(error))
            } else {
                setErrors({ general: error?.message ? error.message : error.response.data })
            }
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Modifier</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Temps de construction actuel: {getMinutesAndSeconds(buildingLevel.time)}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <SuccessAlert isSuccess={success} title={`Modification du temps de construction pour le bâtiment ${buildingLevel.building_name}`} message="Modification réussi !" />
                    <ErrorAlert isError={!!errors.general} title={`Modification du temps de construction pour le bâtiment ${buildingLevel.building_name}`} message={errors.general} />
                    <CustomFormField
                        id="time"
                        label="Temps de construction"
                        type="number"
                        value={time}
                        onChange={(e) => setTime(parseInt(e.target.value))}
                        error={errors.time}
                    />
                    <Button type="submit" disabled={loading} className="w-[200px] block mx-auto mt-4">
                        {loading && <ReloadIcon className="animate-spin mr-2" />}
                        Modifier
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}