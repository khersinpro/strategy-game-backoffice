import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllStorageCapacityByBuildingName } from "@/src/service/storage-capacity";
import { Building } from "@/src/types/building";
import { BarChart4 } from "lucide-react";

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
        <CardContent className="py-4">
            <ul className="grid gap-4">
                <li>
                    <p className="font-semibold">Niveau 1: 1000</p>
                </li>
                <li>
                    <p className="font-semibold">Niveau 2: 2000</p>
                </li>
                <li>
                    <p className="font-semibold">Niveau 3: 3000</p>
                </li>
            </ul>
        </CardContent>
    </Card>
    )
}