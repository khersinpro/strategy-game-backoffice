import UnitEditModal from "./unit-edit-modal";
import UnitDeleteModal from "./unit-delete-modal";
import { RoundedBox } from "@/components/rounded-box";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, CalendarCheck2, CircleGauge, KeyRound, Landmark, PackagePlus, PersonStanding, Sword, Swords, UserPlus } from "lucide-react";
import { Unit } from "@/src/types/unit";

export default function UnitDescriptionCard({ unit } : { unit: Unit }) {
    return (
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Swords className="w-4 h-4 mr-2" />
                    <span>{"Descritpion de l'unité"}</span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-4 grid gap-4">
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <KeyRound className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Nom: </span> {unit.name}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <Sword className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Attaque: </span> {unit.attack}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <CircleGauge className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Vitesse de déplacement: </span> {unit.movement_speed}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <PackagePlus className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Capacité de transport: </span> {unit.carrying_capacity}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <PersonStanding className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Civilisation: </span> {unit.civilization_name}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <UserPlus className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Coût en population: </span> {unit.population_cost}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <Landmark className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Bâtiment militaire associé: </span> {unit.military_building}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <Calendar className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Crée le: </span>
                        {new Date(unit.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <CalendarCheck2 className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Mis à jour le: </span>
                        {new Date(unit.updatedAt).toLocaleDateString()}
                    </p>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between py-4">
                <UnitEditModal unit={unit} />
                <UnitDeleteModal unit={unit} />
            </CardFooter>
        </Card>
    )
}