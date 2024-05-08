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
import { ResourceProductionWithLevel } from "@/src/types/resource-production"
import { updateResourceProduction } from "@/src/service/resource-production"

export function ResourceBuildingBonusEditRow({ resourceProductionLevel, token } : { resourceProductionLevel: ResourceProductionWithLevel , token: string }) {
    return (
        <>
            {
                    <div className="flex items-center justify-between">
                        <TextCardRow 
                            label={`Niveau ${resourceProductionLevel.building_level.level} :`} 
                            value={`${resourceProductionLevel.production}/h`} 
                            Icon={TrendingUp} 
                        />
                        <ResourceBuildingBonusEditForm resourceProductionLevel={resourceProductionLevel} token={token} />
                    </div>
            }
        </>
    );
}


export function ResourceBuildingBonusEditForm({ resourceProductionLevel, token } : { resourceProductionLevel: ResourceProductionWithLevel, token: string }) {
    const router = useRouter()
    const [production, setProduction] = useState(resourceProductionLevel.production)
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault()
            setLoading(true)
            setSuccess(false)
            setErrors({})
            await updateResourceProduction(token, resourceProductionLevel.id, {
                production: production
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
                        Bonus de production de resource actuel: &nbsp; {resourceProductionLevel.production + "/h"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <SuccessAlert 
                        isSuccess={success} 
                        title={`Modification de la vitesse de production pour le niveau ${resourceProductionLevel.building_level.level}`} 
                        message="Modification réussi !" 
                    />
                    <ErrorAlert 
                        isError={!!errors.general} 
                        title={`Modification de la vitesse de production pour le niveau ${resourceProductionLevel.building_level.level}`} 
                        message={errors.general} 
                    />
                    <CustomFormField
                        id="production"
                        label="Production par heure"
                        type="number"
                        value={production}
                        onChange={(e) => setProduction(Number(e.target.value))}
                        error={errors.production}
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