import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllWallDefenseByBuildingName } from "@/src/service/wall-defense";
import { Building } from "@/src/types/building";
import { BarChart4 } from "lucide-react";
import { WallBuildingBonusEditRow } from "./wall-building-bonus-edit-row";

export default async function WallBuildingBonusCard({ token, building } : { token: string, building: Building }) {
    const wallDefensesLevels = await getAllWallDefenseByBuildingName(token, building.name);
    return (
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center">
                <BarChart4 className="w-4 h-4 mr-2" />
                <span>Bonus de défense par niveau</span>
            </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-2 py-4">
            {wallDefensesLevels.map((wallDefenseLevel, index) => (
                <WallBuildingBonusEditRow key={index} wallDefenseLevel={wallDefenseLevel} token={token} />
            ))}
        </CardContent>
    </Card>
    )
}