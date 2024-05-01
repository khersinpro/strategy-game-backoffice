"use client"

import TextCardRow from "@/components/card/text-card-row"
import { ErrorAlert, SuccessAlert } from "@/components/alert/alert"
import { CustomFormField } from "@/components/form/form-inputs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { updateDefenseType } from "@/src/service/defense-type"
import { ObjectKeyValueString } from "@/src/types/common"
import { DefenseType, DefenseTypeList } from "@/src/types/defense-type"
import { handleZodError } from "@/src/utils/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ZodError } from "zod"

export function DefenseTypeEditRows({ defenseTypes, token }: { defenseTypes: DefenseTypeList, token: string }) {
    return (
        <>
            {
                defenseTypes.map((defenseType, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <TextCardRow label={`Défense anti ${defenseType.type}`} value={defenseType.defense_value} Icon={Shield} />
                        <DefenseTypeEditForm defenseType={defenseType} token={token} />
                    </div>
                ))
            }
        </>
    );
}

export function DefenseTypeEditForm({ defenseType, token }: { defenseType: DefenseType, token: string }) {
    const router = useRouter()
    const [defenseValue, setDefenseValue] = useState(defenseType.defense_value)
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault()
            setLoading(true)
            setSuccess(false)
            setErrors({})
            await updateDefenseType(token, {
                unit_name: defenseType.unit_name,
                type: defenseType.type,
                defense_value: defenseValue
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
                        Type de défense: {defenseType.type}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <SuccessAlert isSuccess={success} title="Modification du type de défense" message="Modification réussi !" />
                    <ErrorAlert isError={!!errors.general} title="Modification du type de défense" message={errors.general} />
                    <CustomFormField
                        id="defense-value"
                        label="Valeur de défense"
                        type="number"
                        value={defenseValue}
                        onChange={(e) => setDefenseValue(parseInt(e.target.value))}
                        error={errors.defense_value}
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