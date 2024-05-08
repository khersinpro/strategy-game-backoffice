import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllUnitProductionByBuildingName } from "@/src/service/unit-production";
import { Building } from "@/src/types/building";
import { BarChart4 } from "lucide-react";
import { MilitaryBuildingBonusEditRow } from "./military-building-bonus-edit-row";

export default async function MilitaryBuildingBonusCard({ token, building }: { token: string, building: Building }) {
    const unitProductionsLevels = await getAllUnitProductionByBuildingName(token, building.name);
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <BarChart4 className="w-4 h-4 mr-2" />
                    <span>Bonus de vitesse de production d'unité par niveau</span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="grid gap-2 py-4">
                {
                    unitProductionsLevels.map((unitProduction, index) =>
                        <MilitaryBuildingBonusEditRow key={index} unitProductionLevel={unitProduction} token={token} />
                    )
                }
            </CardContent>
        </Card>
    )
}