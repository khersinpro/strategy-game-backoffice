import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllPopulationCapacitiesByBuildingName } from "@/src/service/population-capacity";
import { Building } from "@/src/types/building";
import { BarChart4 } from "lucide-react";
import { TownAllBuildingBonusEditRow } from "./town-all-building-bonus-edit-row";

export default async function TownAllBuildingBonusCard({ token, building } : { token: string, building: Building }) {
    const populationCapacitiesLevels = await getAllPopulationCapacitiesByBuildingName(token, building.name);
    return (
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center">
                <BarChart4 className="w-4 h-4 mr-2" />
                <span>Population maximale par niveau</span>
            </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-4 py-4">
            {populationCapacitiesLevels.map((populationCapacityLevel, index) => (
                <TownAllBuildingBonusEditRow key={index} populationCapacity={populationCapacityLevel} token={token} />
            ))}
        </CardContent>
    </Card>
    )
}