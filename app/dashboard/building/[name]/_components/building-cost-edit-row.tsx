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
import { Boxes } from "lucide-react"
import { BuildingCost, BuildingCostList } from "@/src/types/building_cost"
import { updateBuildingCost } from "@/src/service/building_cost"

export function BuildingCostEditRows({ buildingCosts, token }: { buildingCosts: BuildingCostList, token: string }) {
    return (
        <>
            {
                buildingCosts.map((buildingCost, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <TextCardRow label={buildingCost.resource_name} value={buildingCost.quantity} Icon={Boxes} />
                        <BuildingCostEditForm buildingCost={buildingCost} token={token} />
                    </div>
                ))
            }
        </>
    );
}

export function BuildingCostEditForm({ buildingCost, token }: { buildingCost: BuildingCost, token: string }) {
    const router = useRouter()
    const [quantity, setQuantity] = useState(buildingCost.quantity)
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault()
            setLoading(true)
            setSuccess(false)
            setErrors({})
            await updateBuildingCost(token, buildingCost.id, {
                quantity: quantity
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
                        Type de resource: {buildingCost.resource_name}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <SuccessAlert isSuccess={success} title={`Modification du coup en ${buildingCost.resource_name}`} message="Modification réussi !" />
                    <ErrorAlert isError={!!errors.general} title={`Modification du coût en ${buildingCost.resource_name}`} message={errors.general} />
                    <CustomFormField
                        id="quantity"
                        label="Coût en ressource"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        error={errors.quantity}
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