
import { RoundedBox } from "@/components/rounded-box";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, CalendarCheck2, Earth, KeyRound } from "lucide-react";
import { UnitTypeDeleteModal } from "./unit-type-delete-modal";
import { UnitType } from "@/src/types/unit-type";
import UnitTypeEditModal from "./unit-type-edit-modal";

export default function UnitTypeDescriptionCard({ unitType } : { unitType: UnitType }) {
    return (
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Earth className="w-4 h-4 mr-2" />
                    <span>{"Descritpion du type d'unité"}</span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-4 grid gap-4">
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <KeyRound className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Type: </span> {unitType.type}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <Calendar className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Crée le: </span>
                        {new Date(unitType.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <CalendarCheck2 className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Mis à jour le: </span>
                        {new Date(unitType.updatedAt).toLocaleDateString()}
                    </p>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between py-4">
                <UnitTypeEditModal unitType={unitType} />
                <UnitTypeDeleteModal unitType={unitType} />
            </CardFooter>
        </Card>
    )
}