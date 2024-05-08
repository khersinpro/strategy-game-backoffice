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
import { TrendingUp } from "lucide-react"
import { PopulationCapaticyWithLevel } from "@/src/types/population_capacity"
import { updatePopulationCapacity } from "@/src/service/population-capacity"
import { WallDefenseWithLevel } from "@/src/types/wall-defense"
import { updateWallDefense } from "@/src/service/wall-defense"

export function WallBuildingBonusEditRow({ wallDefenseLevel, token } : { wallDefenseLevel: WallDefenseWithLevel , token: string }) {
    return (
        <>
            {
                    <div className="flex items-center justify-between">
                        <TextCardRow 
                            label={`Niveau ${wallDefenseLevel.building_level.level} :`} 
                            value={`${wallDefenseLevel.defense_percent}%`} 
                            Icon={TrendingUp} 
                        />
                        <WallBuildingBonusEditForm wallDefenseLevel={wallDefenseLevel} token={token} />
                    </div>
            }
        </>
    );
}


export function WallBuildingBonusEditForm({ wallDefenseLevel, token } : { wallDefenseLevel: WallDefenseWithLevel, token: string }) {
    const router = useRouter()
    const [defensePercent, setDefensePercent] = useState(wallDefenseLevel.defense_percent)
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault()
            setLoading(true)
            setSuccess(false)
            setErrors({})
            await updateWallDefense(token, wallDefenseLevel.id, {
                defense_percent: defensePercent
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
                        Pourcentage de bonus en défense pour le niveau actuel: &nbsp; {wallDefenseLevel.defense_percent + "%"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <SuccessAlert 
                        isSuccess={success} 
                        title={`Modification du pourcentage de défense le niveau ${wallDefenseLevel.building_level.level}`} 
                        message="Modification réussi !" 
                    />
                    <ErrorAlert 
                        isError={!!errors.general} 
                        title={`Modification du pourcentage de défense le niveau ${wallDefenseLevel.building_level.level}`} 
                        message={errors.general} 
                    />
                    <CustomFormField
                        id="defense-percent"
                        label="Pourcentage de bonus en défense"
                        type="number"
                        value={defensePercent}
                        onChange={(e) => setDefensePercent(Number(e.target.value))}
                        error={errors.defense_percent}
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