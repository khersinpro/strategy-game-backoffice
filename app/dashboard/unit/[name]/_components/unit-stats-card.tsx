
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/src/auth/auth";
import { getAllDefenseTypeByUnitName } from "@/src/service/defense-type";
import { Unit } from "@/src/types/unit";
import { BarChart4, CircleGauge, Shield } from "lucide-react";
import DefenseTypeEditForm from "./defense-type-edit-form";
import { RoundedBox } from "@/components/rounded-box";
import TextCardRow from "@/components/card/text-card-row";

export default async function UnitStatsCard({ unit }: { unit: Unit }) {
    const session = await auth()
    const token = session?.user ? session.user.token : ""
    const defenseTypes = await getAllDefenseTypeByUnitName(token, unit.name)
    const unitCosts = []
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <BarChart4 className="w-4 h-4 mr-2" />
                    <span>Statistiques de l'unité</span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="grid py-4 gap-4">
                <Separator />
                <h2 className="font-semibold">Défenses :</h2>
                <Separator />
                {
                    defenseTypes.map((defenseType, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <TextCardRow label={`Défense anti ${defenseType.type}`} value={defenseType.defense_value} Icon={Shield} />
                            <DefenseTypeEditForm defenseType={defenseType} token={token} />
                        </div>
                    ))
                }
                <Separator />
                <h2 className="font-semibold">Coûts en ressources</h2>
                <Separator />
            </CardContent>
        </Card>
    )
}