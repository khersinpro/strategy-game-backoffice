"use client"

import TextCardRow from "@/components/card/text-card-row"
import { ErrorAlert, SuccessAlert } from "@/components/alert/alert"
import { CustomFormField } from "@/components/form/form-inputs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { updateUnitCost } from "@/src/service/unit-cost"
import { ObjectKeyValueString } from "@/src/types/common"
import { UnitCost, UnitCostList } from "@/src/types/unit-cost"
import { handleZodError } from "@/src/utils/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ZodError } from "zod"
import { Boxes } from "lucide-react"

export function UnitCostEditRows({ unitCosts, token } : { unitCosts: UnitCostList, token: string }) {
    return (
        <>
            {
                unitCosts.map((unitCost, index) => (
                    <div className="flex items-center justify-between">
                        <TextCardRow label={unitCost.resource_name} value={unitCost.quantity} Icon={Boxes} />
                        <UnitCostEditForm unitCost={unitCost} token={token} />
                    </div>
                ))
            }
        </>
    );
}


export function UnitCostEditForm({ unitCost, token } : { unitCost: UnitCost, token: string }) {
    const router = useRouter()
    const [quantity, setQuantity] = useState(unitCost.quantity)
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault()
            setLoading(true)
            setSuccess(false)
            setErrors({})
            await updateUnitCost(token, unitCost.id, {
                unit_name: unitCost.unit_name,
                resource_name: unitCost.resource_name,
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
                        Type de resource: {unitCost.resource_name}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <SuccessAlert isSuccess={success} title={`Modification du coup en ${unitCost.resource_name}`} message="Modification réussi !" />
                    <ErrorAlert isError={!!errors.general} title={`Modification du coup en ${unitCost.resource_name}`} message={errors.general} />
                    <CustomFormField
                        id="quantity"
                        label="Coup en ressource"
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