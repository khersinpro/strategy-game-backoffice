"use client"

import { ErrorAlert, SuccessAlert } from "@/components/alert/alert"
import { CustomFormField, CustomSelectFormField } from "@/components/form/form-inputs"
import { Button } from "@/components/ui/button"
import { getAllCivilizations } from "@/src/service/civilization"
import { createWallBuilding } from "@/src/service/wall-building"
import { CivilizationList } from "@/src/types/civilization"
import { ObjectKeyValueString } from "@/src/types/common"
import { handleZodError } from "@/src/utils/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { ZodError } from "zod"

export default function CreateWallBuildingForm ({ isSelected = true, token } : { isSelected: boolean, token: string}) {
    const [name, setName] = useState<string>('')
    const [selectCivilization, setSelectCivilization] = useState<string>('')
    const [civilizations, setCivilizations] = useState<CivilizationList>([])
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        async function fetchData() {
            const data = await getAllCivilizations(token)
            setCivilizations(data)
        }
        fetchData()
    }, [])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault()
            setErrors({})
            setLoading(true)
            setSuccess(false)
            await createWallBuilding(token, { name, civilization_name: selectCivilization })
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
                label="Type de civilisation" 
                placeholder="Selection du type de civilisation du mur" 
                data={civilizations.map(data => data.name)} 
                currentValue={selectCivilization} 
                onValueChange={setSelectCivilization} 
                error={errors.civilization_name}
            />
            <SuccessAlert 
                isSuccess={success}         
                title="Création du bâtiment" 
                message="Le mur de défense a été créé avec succès" 
            />
            <ErrorAlert 
                isError={!!errors.general} 
                title="Erreur de création" 
                message={errors.general} 
            />
            <Button type="submit" disabled={loading}>
                {loading && <ReloadIcon className="animate-spin mr-2" />}
                Créer le mur défense
            </Button>
        </form>
    )
}