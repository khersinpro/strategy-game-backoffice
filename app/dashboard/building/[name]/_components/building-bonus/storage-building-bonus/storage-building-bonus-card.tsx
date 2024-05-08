import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllStorageCapacityByBuildingName } from "@/src/service/storage-capacity";
import { Building } from "@/src/types/building";
import { BarChart4 } from "lucide-react";
import { StorageBuildingBonusEditRow } from "./storage-building-bonus-edit-row";

export default async function StorageBuildingBonusCard({ token, building } : { token: string, building: Building }) {
    const storageCapacitiesLevels = await getAllStorageCapacityByBuildingName(token, building.name);
    return (
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center">
                <BarChart4 className="w-4 h-4 mr-2" />
                <span>Capacité de stockage par niveau</span>
            </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-2 py-4">
            {storageCapacitiesLevels.map((storageCapacityLevel, index) => (
                <StorageBuildingBonusEditRow key={index} storageCapacityLevel={storageCapacityLevel} token={token} />
            ))}
        </CardContent>
    </Card>
    )
}