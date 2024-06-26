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
import { StorageCapacityWithLevel } from "@/src/types/storage_capacity"
import { updateStorageCapacity } from "@/src/service/storage-capacity"

export function StorageBuildingBonusEditRow({ storageCapacityLevel, token } : { storageCapacityLevel: StorageCapacityWithLevel , token: string }) {
    return (
        <>
            {
                    <div className="flex items-center justify-between">
                        <TextCardRow 
                            label={`Niveau ${storageCapacityLevel.building_level.level} :`} 
                            value={`${storageCapacityLevel.capacity}`} 
                            Icon={TrendingUp} 
                        />
                        <StorageBuildingBonusEditForm storageCapacityLevel={storageCapacityLevel} token={token} />
                    </div>
            }
        </>
    );
}

export function StorageBuildingBonusEditForm({ storageCapacityLevel, token } : { storageCapacityLevel: StorageCapacityWithLevel, token: string }) {
    const router = useRouter()
    const [capacity, setCapacity] = useState(storageCapacityLevel.capacity)
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault()
            setLoading(true)
            setSuccess(false)
            setErrors({})
            await updateStorageCapacity(token, storageCapacityLevel.id, {
                capacity: capacity
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
                        Stockage total de ressources pour le niveau actuel: &nbsp; {storageCapacityLevel.capacity}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <SuccessAlert 
                        isSuccess={success} 
                        title={`Modification de la capacité de stockage pour le niveau ${storageCapacityLevel.building_level.level}`} 
                        message="Modification réussi !" 
                    />
                    <ErrorAlert 
                        isError={!!errors.general} 
                        title={`Modification de la capacité de stockage pour le niveau ${storageCapacityLevel.building_level.level}`} 
                        message={errors.general} 
                    />
                    <CustomFormField
                        id="capacity"
                        label="Capacité de population"
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(Number(e.target.value))}
                        error={errors.capacity}
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