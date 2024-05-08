import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllResourceProductionsByBuildingName } from "@/src/service/resource-production";
import { Building } from "@/src/types/building";
import { BarChart4 } from "lucide-react";
import { ResourceBuildingBonusEditRow } from "./resource-building-bonus-edit-row";

export default async function ResourceBuildingBonusCard({ token, building } : { token: string, building: Building }) {
    const resourceProductionsLevels = await getAllResourceProductionsByBuildingName(token, building.name);
        return (
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center">
                <BarChart4 className="w-4 h-4 mr-2" />
                <span>Production de resource par niveau et par heure</span>
            </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-2 py-4">
            {resourceProductionsLevels.map((resourceProductionLevel, index) => (
                <ResourceBuildingBonusEditRow key={index} resourceProductionLevel={resourceProductionLevel} token={token} />
            ))}
        </CardContent>
    </Card>
    )
}