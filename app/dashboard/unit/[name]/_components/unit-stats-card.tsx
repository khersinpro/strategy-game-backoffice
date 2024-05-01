
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/src/auth/auth";
import { getAllDefenseTypeByUnitName } from "@/src/service/defense-type";
import { Unit } from "@/src/types/unit";
import { BarChart4, Boxes, Shield } from "lucide-react";
import { getAllUnitCostsByUnitName } from "@/src/service/unit-cost";
import { DefenseTypeEditRows } from "./defense-type-edit-row";
import { UnitCostEditRows } from "./unit-cost-edit-row";

export default async function UnitStatsCard({ unit }: { unit: Unit }) {
    const session = await auth()
    const token = session?.user ? session.user.token : ""
    const defenseTypes = await getAllDefenseTypeByUnitName(token, unit.name)
    const unitCosts = await getAllUnitCostsByUnitName(token, unit.name)

    return (
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <BarChart4 className="w-4 h-4 mr-2" />
                    <span>Statistiques de l'unité</span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="grid py-4 gap-4">
                {/* Defense types edit rows */}
                <Separator />
                <h2 className="font-semibold">Défenses :</h2>
                <Separator />
                <DefenseTypeEditRows defenseTypes={defenseTypes} token={token} />
                {/* Unit costs edit rows */}
                <Separator />
                <h2 className="font-semibold">Coûts en ressources</h2>
                <Separator />
                <UnitCostEditRows unitCosts={unitCosts} token={token} />
            </CardContent>
        </Card>
    )
}