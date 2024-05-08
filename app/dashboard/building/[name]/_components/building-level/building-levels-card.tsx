import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowBigUpDash } from "lucide-react";
import { getBuildingLevelsAndCostByBuildingName } from "@/src/service/building_level";
import BuildingLevelAccordion from "./building-level-accordion";
import { Building } from "@/src/types/building";
import BuildingLevelCreateModal from "./building-level-create-modal";

export default async function BuildingLevelsCard({ building, token } : { building: Building, token: string}) {
    const buildingLevels = await getBuildingLevelsAndCostByBuildingName(token, building.name);

    return (
        <Card className="flex flex-col row-span-3 h-fit">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <ArrowBigUpDash className="w-4 h-4 mr-2" />
                    <span>Liste des niveaux du bâtiment</span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex-1 py-4">
                <BuildingLevelAccordion token={token} levels={buildingLevels} />
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-end items-center py-4">
                <BuildingLevelCreateModal token={token} buildingName={building.name} />
            </CardFooter>
        </Card>
    )
}