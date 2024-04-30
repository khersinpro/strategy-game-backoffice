"use client"

import { ErrorAlert } from "@/components/alert/alert"
import { CustomFormField, CustomSelectFormField } from "@/components/form/form-inputs"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ServerUpdateSchema } from "@/src/schemas/server"
import { getAllCivilizations } from "@/src/service/civilization"
import { getAllMilitaryBuildings } from "@/src/service/military-building"
import { updateUnit } from "@/src/service/unit"
import { getAllUnitTypes } from "@/src/service/unit-type"
import { CivilizationList } from "@/src/types/civilization"
import { ObjectKeyValueString } from "@/src/types/common"
import { MilitaryBuildingList } from "@/src/types/military-building"
import { Unit } from "@/src/types/unit"
import { UnitTypeList } from "@/src/types/unit-type"
import { handleZodError } from "@/src/utils/zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { z } from "zod"

export default function UnitEditModal({ unit }: { unit: Unit }) {
    const { data: session } = useSession()
    const token = session?.user.token ? session.user.token : ''
    const [open, setOpen] = useState<boolean>(false)
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const [civilizations, setCivilizations] = useState<CivilizationList>([])
    const [militaryBuildings, setMilitaryBuildings] = useState<MilitaryBuildingList>([])
    const [unitTypes, setUnitTypes] = useState<UnitTypeList>([])
    const router = useRouter()

    // From fields
    const [name, setName] = useState<string>(unit.name)
    const [attack, setAttack] = useState<number>(unit.attack)
    const [carryingCapacity, setCarryingCapacity] = useState<number>(unit.carrying_capacity)
    const [movementSpeed, setMovementSpeed] = useState<number>(unit.movement_speed)
    const [populationCost, setPopulationCost] = useState<number>(unit.population_cost)
    const [trainingTime, setTrainingTime] = useState<number>(unit.training_time)
    const [unitType, setUnitType] = useState<string>(unit.unit_type)
    const [civilizationName, setCivilizationName] = useState<string>(unit.civilization_name)
    const [militaryBuildingName, setMilitaryBuildingName] = useState<string>(unit.military_building)

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
        if (token && token !== "") {
            fetchDatas()
        }
    }, [token])

    const submitUpdates = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setErrors({ name: '', general: '' })
            ServerUpdateSchema.parse({ name })
            await updateUnit(token, unit.name, {
                name,
                attack,
                carrying_capacity: carryingCapacity,
                movement_speed: movementSpeed,
                population_cost: populationCost,
                training_time: trainingTime,
                unit_type: unitType,
                civilization_name: civilizationName,
                military_building: militaryBuildingName
            })
            setOpen(false)
            router.push(`/dashboard/unit/${name}`)
        }
        catch (error: any) {
            if (error instanceof z.ZodError) {
                setErrors({ ...errors, ...handleZodError(error) })
            }
            else {
                setErrors({ ...errors, general: error.message ? error.message : 'Une erreur est survenue' })
            }
        }
    }, [name, attack, carryingCapacity, movementSpeed, populationCost, trainingTime, unitType, civilizationName, militaryBuildingName, token, errors, router, unit.name])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Modifier</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modification du serveur</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 pt-4" onSubmit={submitUpdates}>
                    <ErrorAlert
                        isError={!!errors.general}
                        title="Une erreur est survenue"
                        message={errors.general}
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
                    <Button type="submit">Sauvegarder les modifications</Button>
                </form>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
