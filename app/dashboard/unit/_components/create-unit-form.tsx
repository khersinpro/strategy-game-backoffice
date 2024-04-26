'use client'

import { ErrorAlert, SuccessAlert } from "@/components/alert/alert"
import { CustomFormField, CustomSelectFormField } from "@/components/form/form-inputs"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { CreateUnitShema } from "@/src/schemas/unit"
import { CivilizationList } from "@/src/types/civilization"
import { ObjectKeyValueString } from "@/src/types/common"
import { UnitTypeList } from "@/src/types/unit-type"
import { handleZodError } from "@/src/utils/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { ZodError } from "zod"
import { getAllCivilizations } from "../../civilization/page"
import { getAllUnitTypes } from "../../unit-type/page"
import { MilitaryBuildingList } from "@/src/types/military-building"

export async function getAllMilitaryBuildings(token: string): Promise<MilitaryBuildingList> {
    try {
        return await axios.get(`${process.env.API_URL}/military-building`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data)
    }
    catch (error) {
        throw error
    }
}

export default function CreateUnitForm() {
    const { data: session } = useSession()
    const token = session?.user.token ? session.user.token : ''
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const [success, setSuccess] = useState<boolean>(false)
    const [civilizations, setCivilizations] = useState<CivilizationList>([])
    const [militaryBuildings, setMilitaryBuildings] = useState<MilitaryBuildingList>([])
    const [unitTypes, setUnitTypes] = useState<UnitTypeList>([])

    // From fields
    const [name, setName] = useState<string>('')
    const [attack, setAttack] = useState<number>(0)
    const [carryingCapacity, setCarryingCapacity] = useState<number>(0)
    const [movementSpeed, setMovementSpeed] = useState<number>(0)
    const [populationCost, setPopulationCost] = useState<number>(0)
    const [trainingTime, setTrainingTime] =useState<number>(0)
    const [unitType, setUnitType] = useState<string>('')
    const [civilizationName, setCivilizationName] = useState<string>('')
    const [militaryBuildingName, setMilitaryBuildingName] = useState<string>('')

    useEffect(() => {
        const fetchDatas = async () => {
            const [civilizations, militaryBuildings, unitTypes] = await Promise.all([
                getAllCivilizations(token),
                getAllMilitaryBuildings(token),
                getAllUnitTypes(token)
            ])
            setCivilizations(civilizations)
            setMilitaryBuildings(militaryBuildings)
            setUnitTypes(unitTypes)
        }
        if (token &&  token !== "") {
            fetchDatas()
        }
    }, [token])

    const handleSubmit = useCallback( async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setLoading(true)
            CreateUnitShema.parse({ 
                name, 
                attack, 
                carrying_capacity: carryingCapacity, 
                movement_speed: movementSpeed, 
                population_cost: populationCost, 
                training_time: trainingTime, 
                unit_type: unitType, 
                civilization_name: civilizationName, 
                military_building_name: militaryBuildingName
             })
            setErrors({})
            setSuccess(false)
            await axios.post(`${process.env.API_URL}/unit`, 
                {
                    name, 
                    attack, 
                    carrying_capacity: carryingCapacity, 
                    movement_speed: movementSpeed, 
                    population_cost: populationCost, 
                    training_time: trainingTime, 
                    unit_type: unitType, 
                    civilization_name: civilizationName, 
                    military_building: militaryBuildingName

                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setSuccess(true)
            setLoading(false)
        } 
        catch (error: any) {
            setLoading(false)
            if (error instanceof ZodError) {
                setErrors(handleZodError(error))
            }
            else {
                setErrors({ general: error.message ? error.message : 'Une erreur est survenue' })
            }
        }
    }, [name, attack, carryingCapacity, movementSpeed, populationCost, trainingTime, unitType, civilizationName, militaryBuildingName, token])
    
    return (
        <div className="flex justify-center px-4">
            <Card className="w-full max-w-[1000px] grid gap-6 p-6">
                <CardTitle className="text-center">Créer un serveur</CardTitle>
                <form onSubmit={handleSubmit} className="grid gap-4 md:gap-6 md:grid-cols-2">
                    <SuccessAlert 
                        isSuccess={success} 
                        title="Opération réussie" 
                        message="L'unité a été créée avec succès" 
                        className="col-span-1 md:col-span-2"
                    /> 
                    <ErrorAlert 
                        isError={!!errors.general}  
                        title="Une erreur est survenue" 
                        message={errors.general} 
                        className="col-span-1 md:col-span-2"
                    />
                    <CustomFormField 
                        type="text" 
                        id="name" 
                        placeholder="Nom de l'unité" 
                        label="Nom de l'unité"
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        error={errors.name} 
                    />
                    <CustomFormField 
                        type="number" 
                        id="attack" 
                        label="Attaque" 
                        value={attack} 
                        onChange={(e) => setAttack(Number(e.target.value))} 
                        error={errors.attack}
                    />
                    <CustomFormField 
                        type="number" 
                        id="carryingCapacity" 
                        label="Capacité de portage" 
                        value={carryingCapacity} 
                        onChange={(e) => setCarryingCapacity(Number(e.target.value))} 
                        error={errors.carrying_capacity}
                    />
                    <CustomFormField 
                        type="number" 
                        id="movementSpeed" 
                        label="Vitesse de déplacement" 
                        value={movementSpeed} 
                        onChange={(e) => setMovementSpeed(Number(e.target.value))} 
                        error={errors.movement_speed}
                    />
                    <CustomFormField 
                        type="number" 
                        id="populationCost" 
                        label="Coût en population" 
                        value={populationCost} 
                        onChange={(e) => setPopulationCost(Number(e.target.value))} 
                        error={errors.population_cost}
                    />
                    <CustomFormField 
                        type="number" 
                        id="trainingTime" 
                        label="Temps d'entraînement en secondes" 
                        value={trainingTime} 
                        onChange={(e) => setTrainingTime(Number(e.target.value))} 
                        error={errors.training_time}
                    />
                    <CustomSelectFormField 
                        data={unitTypes.map(unitType => unitType.type)} 
                        currentValue={unitType} 
                        onValueChange={setUnitType} 
                        error={errors.unit_type} 
                        label="Type d'unité"
                        placeholder="Selection du type d'unité"
                    />
                    <CustomSelectFormField 
                        data={civilizations.map(civilization => civilization.name)} 
                        currentValue={civilizationName} 
                        onValueChange={setCivilizationName} 
                        error={errors.civilization_name} 
                        label="Civilisation"
                        placeholder="Selection de la civilisation"
                    />
                    <CustomSelectFormField 
                        data={militaryBuildings.map(militaryBuilding => militaryBuilding.name)} 
                        currentValue={militaryBuildingName} 
                        onValueChange={setMilitaryBuildingName} 
                        error={errors.military_building_name} 
                        label="Bâtiment militaire"
                        placeholder="Selection du bâtiment militaire"
                    />
                    <div className="col-span-1 md:col-span-2">
                        <Button type="submit" disabled={loading} className="w-[200px] block mx-auto">
                            {loading && <ReloadIcon className="animate-spin mr-2" />}
                            Créer
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}