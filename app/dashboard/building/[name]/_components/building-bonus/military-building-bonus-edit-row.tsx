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
import { getMinutesAndSeconds } from "@/src/utils/time"
import { UnitProductionWithLevel } from "@/src/types/unit-production"
import { updateUnitProduction } from "@/src/service/unit-production"

export function MilitaryBuildingBonusEditRow({ unitProductionLevel, token } : { unitProductionLevel: UnitProductionWithLevel , token: string }) {
    return (
        <>
            {
                    <div className="flex items-center justify-between">
                        <TextCardRow 
                            label={`Niveau ${unitProductionLevel.building_level.level}`} 
                            value={`${unitProductionLevel.reduction_percent}%`} 
                            Icon={Clock} 
                        />
                        <MilitaryBuildingBonusEditForm unitProductionLevel={unitProductionLevel} token={token} />
                    </div>
            }
        </>
    );
}


export function MilitaryBuildingBonusEditForm({ unitProductionLevel, token } : { unitProductionLevel: UnitProductionWithLevel, token: string }) {
    const router = useRouter()
    const [reductionPercent, setReductionPercent] = useState(unitProductionLevel.reduction_percent)
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault()
            setLoading(true)
            setSuccess(false)
            setErrors({})
            await updateUnitProduction(token, unitProductionLevel.id, {
                reduction_percent: reductionPercent
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
                        Bonus de production d'unité actuel: &nbsp; {unitProductionLevel.reduction_percent + "%"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <SuccessAlert 
                        isSuccess={success} 
                        title={`Modification de la vitesse de production pour le niveau ${unitProductionLevel.building_level.level}`} 
                        message="Modification réussi !" 
                    />
                    <ErrorAlert 
                        isError={!!errors.general} 
                        title={`Modification de la vitesse de production pour le niveau ${unitProductionLevel.building_level.level}`} 
                        message={errors.general} 
                    />
                    <CustomFormField
                        id="reduction-percent"
                        label="Pourcentage de réduction de temps de production"
                        type="number"
                        value={reductionPercent}
                        onChange={(e) => setReductionPercent(Number(e.target.value))}
                        error={errors.reduction_percent}
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