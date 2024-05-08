import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllPopulationCapacitiesByBuildingName } from "@/src/service/population-capacity";
import { Building } from "@/src/types/building";
import { BarChart4 } from "lucide-react";

export default async function TownAllBuildingBonusCard({ token, building } : { token: string, building: Building }) {
    const populationCapacitiesLevels = await getAllPopulationCapacitiesByBuildingName(token, building.name);
    return (
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center">
                <BarChart4 className="w-4 h-4 mr-2" />
                <span>Population maximal par niveau</span>
            </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="py-4">
            <ul className="grid gap-4">
                <li>
                    <p className="font-semibold">Niveau 1: 100</p>
                </li>
                <li>
                    <p className="font-semibold">Niveau 2: 200</p>
                </li>
                <li>
                    <p className="font-semibold">Niveau 3: 300</p>
                </li>
            </ul>
        </CardContent>
    </Card>
    )
}