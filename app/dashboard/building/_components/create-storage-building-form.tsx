"use client"

import { ErrorAlert, SuccessAlert } from "@/components/alert/alert"
import { CustomFormField, CustomSelectFormField } from "@/components/form/form-inputs"
import { Button } from "@/components/ui/button"
import { getAllResources } from "@/src/service/resource"
import { createStorageBuilding } from "@/src/service/storage-building"
import { ObjectKeyValueString } from "@/src/types/common"
import { ResourceList } from "@/src/types/resource"
import { handleZodError } from "@/src/utils/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { ZodError } from "zod"

export default function CreateStorageBuildingForm({ isSelected = true, token }: { isSelected: boolean, token: string }) {
    const [name, setName] = useState<string>('')
    const [selectResource, setSelectResource] = useState<string>('')
    const [resources, setResources] = useState<ResourceList>([])
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        async function fetchData() {
            const data = await getAllResources(token)
            setResources(data)
        }
        fetchData()
    }, [])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault()
            setErrors({})
            setLoading(true)
            setSuccess(false)
            await createStorageBuilding(token, { name, resource_name: selectResource })
            setSuccess(true)
        }
        catch (error: any) {
            if (error instanceof ZodError) {
                setErrors(handleZodError(error))
            }
            else {
                setErrors({ general: error.message ? error.message : 'Une erreur est survenue' })
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        isSelected &&
        <form onSubmit={handleSubmit} className="grid gap-4 md:gap-6">
            <CustomFormField 
                placeholder='Nom du bâtiment' 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                error={errors.name}
            />
            <CustomSelectFormField
                label="Type de ressource stockée"
                placeholder="Selection du type de ressource stockée"
                data={resources.map(data => data.name)}
                currentValue={selectResource}
                onValueChange={setSelectResource}
                error={errors.resource_name}
            />
            <SuccessAlert 
                isSuccess={success} 
                title="Création du bâtiment" 
                message="Le bâtiment de stockage a été créé avec succès" 
            />
            <ErrorAlert 
                isError={!!errors.general} 
                title="Erreur de création" 
                message={errors.general} 
            />
            <Button type="submit" disabled={loading}>
                {loading && <ReloadIcon className="animate-spin mr-2" />}
                Créer le bâtiment de stockage
            </Button>
        </form>
    )
}