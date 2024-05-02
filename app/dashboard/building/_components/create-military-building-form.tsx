"use client"

import { ErrorAlert, SuccessAlert } from "@/components/alert/alert"
import { CustomFormField, CustomSelectFormField } from "@/components/form/form-inputs"
import { Button } from "@/components/ui/button"
import { createMilitaryBuilding } from "@/src/service/military-building"
import { getAllUnitTypes } from "@/src/service/unit-type"
import { ObjectKeyValueString } from "@/src/types/common"
import { UnitTypeList } from "@/src/types/unit-type"
import { handleZodError } from "@/src/utils/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { ZodError } from "zod"

export default function CreateMilitaryBuildingForm({ isSelected = true, token }: { isSelected: boolean, token: string }) {
    const [name, setName] = useState<string>('')
    const [selectedUnitType, setSelectedUnitType] = useState<string>('')
    const [unitTypes, setUnitTypes] = useState<UnitTypeList>([])
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        async function fetchData() {
            const data = await getAllUnitTypes(token)
            setUnitTypes(data)
        }
        fetchData()
    }, [])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault()
            setErrors({})
            setLoading(true)
            setSuccess(false)
            await createMilitaryBuilding(token, { name, unit_type: selectedUnitType })
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
                label="Type d\'unité produite"
                placeholder="Selection du type d\'unité produite"
                data={unitTypes.map(data => data.type)}
                currentValue={selectedUnitType}
                onValueChange={setSelectedUnitType}
                error={errors.unit_type}
            />
            <SuccessAlert 
                isSuccess={success} 
                title="Création du bâtiment" 
                message="Le bâtiment militaire a été créé avec succès" 
            />
            <ErrorAlert 
                isError={!!errors.general} 
                title="Erreur de création" 
                message={errors.general} 
            />
            <Button type="submit" disabled={loading}>
                {loading && <ReloadIcon className="animate-spin mr-2" />}
                Créer le bâtiment militaire
            </Button>
        </form>
    )
}